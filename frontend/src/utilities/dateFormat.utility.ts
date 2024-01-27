import { monthNames } from "@/models";

export const dateFormat = (date: string): string => `${date.substring(8, 10)} ${monthNames[parseInt(date.substring(5, 7)) - 1]} ${date.substring(0, 4)}`;