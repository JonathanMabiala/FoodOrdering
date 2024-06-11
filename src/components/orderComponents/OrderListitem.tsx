import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Order, Tables } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useSegments } from "expo-router";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

type OrderListitemProps = {
  order: Tables<"orders">;
};

const OrderListitem = ({ order }: OrderListitemProps) => {
  const segment = useSegments();
  return (
    <Link href={`/${segment[0]}/orders/${order.id}`} asChild>
      <Pressable style={styles.container}>
        <View>
          <Text style={styles.orderId}>Order #{order.id}</Text>
          <Text style={styles.date}>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text style={styles.orderStatus}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};

export default OrderListitem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 10,
  },
  date: {
    color: "gray",
  },
  orderStatus: {
    fontWeight: "500",
  },
});
