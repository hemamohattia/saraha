import EventEmitter from "events";

export const emailEvent = new EventEmitter();

emailEvent.on("sendEmail", (data) => {
  console.log("Sending email async:", data);
});
