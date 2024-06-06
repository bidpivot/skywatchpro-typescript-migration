export default function timeStampConvert(timestamp) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(timestamp * 1000).toLocaleString(undefined, options);
}
