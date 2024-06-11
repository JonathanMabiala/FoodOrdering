import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderItemListItem from "@/components/orderComponents/OrderItemListItem";
import OrderListitem from "@/components/orderComponents/OrderListitem";
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscriptions";

const OrderDetails = () => {
  const { id: idString } = useLocalSearchParams();
  if (!idString) {
    return <Text>No id found</Text>;
  }
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  useUpdateOrderSubscription(id);

  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Faild to fetch products</Text>;
  }

  if (!order) {
    return <Text>ORDER NOT FOUND</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />
      <OrderListitem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
});
