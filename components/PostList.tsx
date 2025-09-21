import React, { useContext, useMemo, useState } from "react";
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { DataContext } from "../context/DataContext";
import { Products } from "../types/types";

const screenWidth = Dimensions.get("window").width;

export default function PostsList() {
  const { products, addToCart } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query (case-insensitive)
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const lowerQuery = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery, products]);

  const renderProduct = ({ item, index }: { item: Products; index: number }) => (
    <View style={styles.card}>
      {item.images && item.images.length > 0 && (
        <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      )}

      <Text style={styles.title}>
        {index + 1}. {item.title}
      </Text>
      <Text style={styles.description}>{item.description}</Text>

      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
      <Text style={styles.detailText}>Discount: {item.discountPercentage}%</Text>
      <Text style={styles.detailText}>Rating: {item.rating} ⭐</Text>
      <Text style={styles.detailText}>Stock: {item.stock}</Text>
      <Text style={styles.detailText}>Brand: {item.brand}</Text>
      <Text style={styles.detailText}>Category: {item.category}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          addToCart(item);
          Alert.alert("Added to Cart", `${item.title} has been added to your cart.`);
        }}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Products (Fetch API)</Text>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        clearButtonMode="while-editing"
        autoCorrect={false}
        autoCapitalize="none"
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <Text style={styles.noResultsText}>No products found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#FAFAFA",
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
    alignSelf: "center",
  },
  searchBar: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    // Shadow iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    // Elevation Android
    elevation: 3,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // elevation for Android
    elevation: 4,
  },
  productImage: {
    width: "100%",
    aspectRatio: 1.5, // or use item.aspectRatio if you calculate it dynamically
    borderRadius: 12,
    resizeMode: "contain",
    marginBottom: 12,
    alignSelf: "center",
  
  
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: "#222",
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    lineHeight: 20,
  },
  price: {
    fontWeight: "700",
    fontSize: 18,
    color: "#2E7D32",
  },
  detailText: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#2962FF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#2962FF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  noResultsText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 40,
  },
});