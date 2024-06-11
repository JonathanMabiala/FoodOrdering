import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { supabase } from "@/lib/supabase";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}
const ProfileScreen = () => {
  return (
    <View>
      <Text>ProfileScreen</Text>
      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
