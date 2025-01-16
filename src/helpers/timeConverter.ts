export default function timeConverter(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const seconds = "0" + date.getSeconds();
  return hours + ":" + minutes.slice(-2) + ":" + seconds.slice(-2);
}

// export default function timeConverter(timestamp) {
//   const date = new Date(timestamp * 1000);
//   const options = { hour: "numeric", minute: "numeric" };
//   return date.toLocaleTimeString(undefined, options);
// }
