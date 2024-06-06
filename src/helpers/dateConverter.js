export default function dateConverter(timestamp) {
  const date = new Date(timestamp * 1000);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
}
