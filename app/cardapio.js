import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CardapioScreen() {
  return (
    <ImageBackground 
      source={require('../assets/backgroundImage.png')} 
      style={styles.container}
    >

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.bemVindo}>Bem-vindo,</Text>
          <Text style={styles.titulo}>Cardápio</Text>
        </View>

        <TouchableOpacity style={styles.cartIcon}>
          <Ionicons name="cart-outline" size={22} color="#fff" />

          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* MENU */}
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


      {/* FOOTER */}
      <View style={styles.footer}>

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total do pedido</Text>
          <Text style={styles.totalValue}>R$ 0,00</Text>
        </View>

        <TouchableOpacity style={styles.button}>
          <Ionicons name="cart" size={18} color="#fff" />
          <Text style={styles.buttonText}> Ver carrinho</Text>
        </TouchableOpacity>

      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    paddingHorizontal: 24,
    justifyContent: "space-between"
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

  cartIcon: {
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

  menu: {
    marginTop: -360
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
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
    marginHorizontal: -24,
    backgroundColor: "#151414",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },

  totalText: {
    color: "#aaa",
    fontSize: 16
  },

  totalValue: {
    color: "#ff005c",
    fontSize: 18,
    fontWeight: "bold"
  },

  button: {
    backgroundColor: "#e91e63",
    height: 55,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});