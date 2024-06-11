import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderItemListItem from "@/components/orderComponents/OrderItemListItem";
import OrderListitem from "@/components/orderComponents/OrderListitem";
import { OrderStatusList } from "@/types";
import Colors from "@/constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@/api/orders";
import { notifyUserAboutOrderUpdate } from "@/lib/notifications";

const OrderDetails = () => {
  const { id: idString } = useLocalSearchParams();
  const { mutate: updateOrder } = useUpdateOrder();

  const updateSatus = async (status: string) => {
    updateOrder({ id, updatedFields: { status } });

    console.log("Notify:", order?.user_id);
    if (order) {
      await notifyUserAboutOrderUpdate({ ...order, status });
    }
  };
  if (!idString) {
    return <Text>No id found</Text>;
  }
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
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
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updateSatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
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
