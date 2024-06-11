import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { ExpoPushToken } from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthProvider";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const NotificationProvider = ({ children }: PropsWithChildren) => {
  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken>();

  const { profile } = useAuth();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const savePushToken = async (newToken: string | ExpoPushToken) => {
    setExpoPushToken(newToken);
    if (!newToken) {
      return;
    }
    await supabase
      .from("profiles")
      .update({ expo_push_token: newToken })
      .eq("id", profile.id);
  };

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => savePushToken(token ?? ""))
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
