import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import orders from "@assets/data/orders";
import OrderListitem from "@/components/orderComponents/OrderListitem";
const OrdersScreen = () => {
  return (
    <>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListitem order={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
    </>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
