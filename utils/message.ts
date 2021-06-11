import { Message } from "@api";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";

dayjs.extend(updateLocale);
dayjs.extend(calendar);
dayjs.locale("fr");
dayjs.updateLocale("fr", {
  calendar: {
    lastDay: "D/M/YY",
    nextDay: "D/M/YY",
    lastWeek: "D/M/YY",
    sameDay: "h:mm",
    sameElse: "D/M/YY",
  },
});

const getUserFullName = ({
  firstname,
  lastname,
}: {
  firstname: string;
  lastname: string;
}) => `${firstname} ${lastname}`;

const getMessageTitle = (message: Message) => {
  const { type, contact } = message;
  const { firstname, lastname } = message?.contact ?? {};
  const userFullName =
    firstname && lastname ? getUserFullName({ firstname, lastname }) : "";
  return userFullName
    ? userFullName
    : type === "phone"
    ? contact?.phone ?? ""
    : "";
};

const getMessageIcon = (message: Message) => {
  const { type, read } = message;
  if (type === "phone") return "phone";
  if (read) return "mail";
  return "mail";
};

const getDateFromNowString = (message: Message) => {
  const formattedDate = dayjs().calendar(dayjs(message.date));
  return formattedDate;
};

const getDateString = (message: Message) => {
  return dayjs(message.date).format("d MMM YYYY à h:mm");
};

const getSubtitle = (message: Message) => {
  return message?.type === "phone"
    ? "Message vocal sur votre vitrine Meilleurs Agents"
    : message.subject!;
};

const getBody = (message: Message) => {
  return message?.type === "phone" ? message.subject! : message.body!;
};

const getEnrichedMessage = (
  message: Message
): Message & {
  titleLeading: string;
  subtitle: string;
  dateFromNowStr: string;
  dateStr: string;
  titleTrailing: string;
  icon: string;
  truncatedBody: string;
} => {
  const titleLeading = getMessageTitle(message);
  const phone = message?.contact?.phone;
  const titleTrailing =
    titleLeading && phone && titleLeading != phone ? `(${phone})` : "";
  const dateFromNowStr = getDateFromNowString(message);
  const dateStr = getDateString(message);
  const subtitle = getSubtitle(message);
  const truncatedBody = getBody(message);
  const icon = `mypro-icon mypro-icon-${getMessageIcon(message)}`;
  return {
    ...message,
    titleLeading,
    dateFromNowStr,
    dateStr,
    subtitle,
    titleTrailing,
    icon,
    truncatedBody,
  };
};

export default getEnrichedMessage;
