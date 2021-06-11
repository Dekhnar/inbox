/** @jsxImportSource theme-ui */

import { Realtor, RealtorsService, Message } from "@api";
import InboxView, { InboxViewProps } from "@components/inbox-view";
import { fetchMessageByIds } from "@data/use-message-query";
import { getMessagesByRealtorId } from "@data/use-messages.query";
import { fetchRealtors } from "@data/use-realtors.query";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";

// This function gets called at build time
// Getting path at build time
export async function getStaticPaths() {
  const realtors = (await RealtorsService.getRealtors()) as Realtor[];
  // Get the paths we want to pre-render based on types
  const paths = realtors?.map((realtor) => ({
    params: { id: [realtor?.id?.toString()] },
  }));
  // We'll pre-render only these paths at build time.
  // usefull for not generate all the paths at once and do them at runtime
  // whenever use tries to do a request to the page
  return {
    paths: [{ params: { id: null } }, ...paths],
    fallback: true,
  };
}

// Getting data that matches that path
export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params?.id)
    return {
      props: {},
    };
  const ids = params?.id as string[];
  const queryClient = new QueryClient();
  const paramsSize = ids.length;
  const staleTime = 10 * 1000;
  let currentRealtor, currentMessage;

  if (paramsSize >= 3) {
    return {
      notFound: true,
    };
  } else {
    if (paramsSize > 0) {
      const realtorId = parseInt(ids[0]);
      await queryClient.prefetchQuery<Realtor[], Error>(
        `RealtorsService.getRealtors`,
        fetchRealtors
      );
      currentRealtor = queryClient
        .getQueryData<Realtor[]>(`RealtorsService.getRealtors`)
        ?.find((r) => r.id == realtorId);
      if (paramsSize > 1) {
        const messageId = parseInt(ids[1]);
        await queryClient.prefetchInfiniteQuery(
          [`MessagesService.getMessages`, realtorId],
          getMessagesByRealtorId,
          {
            staleTime,
          }
        );

        await queryClient.prefetchQuery(
          [`MessagesService.getMessageByIds`, { messageId, realtorId }],
          fetchMessageByIds,
          {
            staleTime,
          }
        );
        currentMessage = queryClient.getQueryData<Message>([
          `MessagesService.getMessageByIds`,
          { messageId, realtorId },
        ]);
      }
    }

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        content: {
          ...(currentMessage && {
            currentMessage: JSON.parse(JSON.stringify(currentMessage)),
          }),
          ...(currentRealtor && {
            currentRealtor: JSON.parse(JSON.stringify(currentRealtor)),
          }),
        },
      },
      revalidate: 60,
    };
  }
};

export default function HomePage(props: {
  [key: string]: any;
  content?: InboxViewProps;
}) {
  const router = useRouter();
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) return <p>Loading...</p>;
  return <InboxView {...props.content} />;
}
