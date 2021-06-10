import { Message } from "@api";
import Days from "dayjs";
import "dayjs/locale/fr";
import updateLocale from "dayjs/plugin/updateLocale";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";

Days.extend(updateLocale);
Days.extend(calendar);
Days.locale("fr");
Days.updateLocale("fr", {
  calendar: {
    lastDay: "[Hier]",
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

const getEnrichedMessage = (
  message: Message
): Message & {
  titleLeading: string;
  subtitle: string;
  dateFromNowStr: string;
  dateStr: string;
  titleTrailing: string;
  icon: string;
} => {
  const titleLeading = getMessageTitle(message);
  const phone = message?.contact?.phone;
  const titleTrailing =
    titleLeading && phone && titleLeading != phone ? `(${phone})` : "";
  const dateFromNowStr = getDateFromNowString(message);
  const dateStr = getDateString(message);
  const subtitle = message?.subject || "";
  const icon = `mypro-icon mypro-icon-${getMessageIcon(message)}`;
  return {
    ...message,
    titleLeading,
    dateFromNowStr,
    dateStr,
    subtitle,
    titleTrailing,
    icon,
  };
};

export default getEnrichedMessage;
