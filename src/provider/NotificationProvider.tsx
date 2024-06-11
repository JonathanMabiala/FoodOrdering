import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { ExpoPushToken } from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken>();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  useEffect(() => {
    console.warn("Provider init");
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ""))
      .catch((error: any) => setExpoPushToken(`${error}`));
  }, []);

  notificationListener.current = Notifications.addNotificationReceivedListener(
    (notification) => {
      setNotification(notification);
    }
  );

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

  console.log("Push token", expoPushToken);
  return <>{children}</>;
};

export default NotificationProvider;
