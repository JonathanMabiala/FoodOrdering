import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import products from "@assets/data/products";
import { defaultPizzaImage } from "@/components/ProductListItem";
import { useState } from "react";
import Button from "@components/Button";

const sizes = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState("L");
  const product = products.find((p) => p.id.toString() == id);

  const addToCart = () => {
    console.warn("Adding to cart, size:", selectedSize);
  };

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
      <Text>Select size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => {
              setSelectedSize(size);
            }}
            style={[
              styles.size,
              { backgroundColor: selectedSize == size ? "gainsboro" : "white" },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                { color: selectedSize == size ? "#000" : "gainsboro" },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "auto",
  },
  size: {
    backgroundColor: "gainsboro",
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
  },
});
