/** function to use as argument for sending email notif */
export const notifMessage = (str) => {
  const msg = {
    to: str, // Change to your recipient
    from: "lesterabao@gmail.com", // Change to your verified sender
    subject: "Reminder for books to be returned",
    text: "There is/are book/s that needs to be returned soon. Check the app BookTrackIt app.",
    html: "<strong>There is/are book/s that needs to be returned soon. Check the app BookTrackIt app.</strong>",
  };
  return msg;
};
