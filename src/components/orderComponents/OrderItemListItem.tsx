import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { OrderItem } from "@/types";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
type OrderItemListItemProps = {
  orderItem: OrderItem;
};
const OrderItemListItem = ({ orderItem }: OrderItemListItemProps) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.imageAndText}>
          <Image
            style={styles.image}
            source={{ uri: orderItem.products.image || defaultPizzaImage }}
          />
          <View>
            <Text style={styles.productName}>{orderItem.products.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.productPrice}>
                ${orderItem.products.price}
              </Text>
              <Text style={styles.productSize}>Size: {orderItem.size}</Text>
            </View>
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.productQuantity}>{orderItem.quantity}</Text>
      </View>
    </View>
  );
};

export default OrderItemListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  imageAndText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  image: {
    width: 90,
    aspectRatio: 1,
    marginRight: 10,
  },
  productName: {
    fontWeight: "bold",
    marginVertical: 5,
  },
  productSize: {
    fontWeight: "500",
  },
  productPrice: {
    fontWeight: "bold",
    color: "teal",
    marginRight: 5,
  },
  productQuantity: {
    fontWeight: "400",
    fontSize: 20,
    marginHorizontal: 10,
  },
});
