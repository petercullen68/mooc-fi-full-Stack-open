interface NotificationPayload {
  message: string | null;
  type: "success" | "error";
}

interface Props {
  notification: NotificationPayload | null;
}

const Notification = ({ notification }: Props) => {
  if (notification === null || notification.message === null) {
    return null;
  }

  return (
    <div className={notification.type === "success" ? "success" : "error"}>
      {notification.message}
    </div>
  );
};

export default Notification;
