import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const product = products.find((p) => p.id.toString() == id);

  if (!product) {
    return <Text>Product not found</Text>;
  }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {},
  image: {},
  price: {},
});
