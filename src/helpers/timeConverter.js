export default function timeConverter(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { hour: "numeric", minute: "numeric" };
  return date.toLocaleTimeString(undefined, options);
}
