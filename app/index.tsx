import PostsList from "@/components/PostList";
import { DataContext, DataProvider } from "@/context/DataContext";
import { Products } from "@/types/types";
import React, { useContext, useEffect } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ApiResponse = {
  products: Products[];
  total: number;
  skip: number;
  limit: number;
};

const AppContent: React.FC = () => {
  const { setProducts, cart, clearCart } = useContext(DataContext);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const data: ApiResponse = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleReload = () => {
    fetchProducts();
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add products to your cart before placing an order.");
      return;
    }
    // Place order logic here (e.g., API call)
    Alert.alert("Order Placed", `Your order of ${cart.length} item(s) has been placed successfully!`);
    clearCart();
  };

  return (
    <SafeAreaView style={styles.container}>
      <PostsList />

      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.customButton} onPress={handleReload}>
          <Text style={styles.buttonText}>Reload Data</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.customButton, styles.placeOrderButton]} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order ({cart.length})</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function Index() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    marginTop: 40, 
    backgroundColor: "#FAFAFA",
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 24,
  },
  customButton: {
    backgroundColor: "#388E3C", 
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#388E3C",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  placeOrderButton: {
    backgroundColor: "#D84315", 
    shadowColor: "#D84315",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});