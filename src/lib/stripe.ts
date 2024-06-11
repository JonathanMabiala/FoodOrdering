import { Alert } from "react-native";
import { supabase } from "./supabase";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
// Payments
const fetchPaymentSheetParams = async (amount: number) => {
  // Create payment session for our customer
  const { data, error } = await supabase.functions.invoke("payment-sheet", {
    body: { amount },
  });

  if (data) {
    return data;
  }
  Alert.alert(`Error: ${error?.message ?? "no data"}`);
  return {};
};

export const initializePaymentSheet = async (amount: number) => {
  console.log("Initialising payment sheet, for:", amount);

  const { paymentIntent, publishableKey, ephemeralKey, customer } =
    await fetchPaymentSheetParams(amount);

  if (!paymentIntent || !publishableKey) return;

  await initPaymentSheet({
    merchantDisplayName: "notJust.dev",
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: { name: "Jane Doe" },
  });
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(error.message);
    return false;
  }
  return true;
};
