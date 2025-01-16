export default function dateConverter(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString(undefined, options);
}

// This is the old function before switch to TS

// export default function dateConverter(timestamp) {
//   const date = new Date(timestamp * 1000);
//   const options = { month: "long", day: "numeric", year: "numeric" };
//   return date.toLocaleDateString(undefined, options);
// }
