import { Message } from "@api";

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

const getDateString = (message: Message) => {
    // const parsedTime = new Dayjs(message?.date as string);
    return "date";
};

const getEnrichedMessage = (
    message: Message
): Message & {
    titleLeading: string;
    subtitle: string;
    dateStr: string;
    titleTrailing: string;
    icon: string;
} => {
    const titleLeading = getMessageTitle(message);
    const phone = message?.contact?.phone;
    const titleTrailing =
        titleLeading && phone && titleLeading != phone ? `(${phone})` : "";
    const dateStr = getDateString(message);
    const subtitle = message?.subject || "";
    const icon = `mypro-icon mypro-icon-${getMessageIcon(message)}`;
    return { ...message, titleLeading, dateStr, subtitle, titleTrailing, icon };
};

export default getEnrichedMessage;
