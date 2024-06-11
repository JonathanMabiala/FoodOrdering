import { FlatList, StyleSheet, Text, ActivityIndicator } from "react-native";
import React from "react";
import OrderListitem from "@/components/orderComponents/OrderListitem";
import { useAdminOrderList } from "@/api/orders";
const OrdersScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Faild to fetch products</Text>;
  }
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
