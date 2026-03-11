import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardapioScreen() {
    const router = useRouter();
  return (
    <ImageBackground source={require('../assets/backgroundImage.png')} style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.bemVindo}>Bem-vindo,</Text>
          <Text style={styles.titulo}>Cardápio</Text>
        </View>

        <TouchableOpacity style={styles.cartContainer}>
          <Ionicons name="cart-outline" size={22} color="#fff" />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Total do pedido */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total do pedido</Text>
        <Text style={styles.totalValor}>R$ 8,99</Text>
      </View>

      {/* Categorias */}
      <View style={styles.menu}>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Salgados</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Bebidas</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Sobremesas</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.divider} />

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 24,
    paddingTop: 60
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  bemVindo: {
    color: "#aaa",
    fontSize: 16
  },

  titulo: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold"
  },

  cartContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#ff005c",
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center"
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold"
  },

  totalBox: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 14,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  totalText: {
    color: "#aaa",
    fontSize: 16
  },

  totalValor: {
    color: "#ff005c",
    fontSize: 18,
    fontWeight: "bold"
  },

  menu: {
    marginTop: 30
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20
  },

  menuText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600"
  },

  divider: {
    height: 1,
    backgroundColor: "#333"
  }

});