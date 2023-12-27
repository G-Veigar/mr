import { format } from "date-fns";

export function dateFormat(date: Date): string {
  // Public Mint Start: 29 Dec 2023 13:00:00 UTC
  return format(date, 'd LLL yyyy HH:mm:ss') + ' UTC'
  // return `${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getUTCSeconds()} `
}
