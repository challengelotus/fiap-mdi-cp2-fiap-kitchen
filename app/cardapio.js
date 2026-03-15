import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { useCarrinho } from '../context/CarrinhoContext'

export default function CardapioScreen() {
  const router = useRouter();
  const { totalItens, valorTotal } = useCarrinho();
  const totalFormatado = valorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
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

          {totalItens > 0 && (
            <View style={styles.badge} disabled={totalItens === 0}>
              <Text style={styles.badgeText}>{totalItens}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* MENU */}
      <View style={styles.menu}>

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/salgados')}>
          <Text style={styles.menuText}>Salgados</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/bebidas')}>
          <Text style={styles.menuText}>Bebidas</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/sobremesas')}>
          <Text style={styles.menuText}>Sobremesas</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <View style={styles.divider} />

      </View>


      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total do pedido</Text>
          <Text style={styles.totalValue}>{totalFormatado}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.cartButton, totalItens === 0 && styles.cartButtonDisabled]}
          disabled={totalItens === 0}
          activeOpacity={0.8}
          onPress={() => router.push('/cardapio')}
        >
          <Ionicons 
            name="cart-outline" 
            size={24} 
            color={totalItens === 0 ? "#777" : "#fff"} 
            style={{ marginRight: 8 }} 
          />
          <Text style={[styles.cartButtonText, totalItens === 0 && { color: '#777' }]}>
            Ver carrinho({totalItens})
          </Text>
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
    justifyContent: "space-between"
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
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
    backgroundColor: "#D21C56",
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
    marginTop: -360,
    paddingHorizontal: 24,
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
    backgroundColor: "#151515",
  },

  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14
  },

  totalLabel: {
    color: "#ffffff",
    fontSize: 16
  },

  totalValue: {
    color: "#D21C56",
    fontSize: 22,
    fontWeight: "bold"
  },

  cartButton: {
    backgroundColor: "#D21C56",
    height: 55,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },

  cartButtonDisabled: { 
    backgroundColor: '#222' 
  },

  cartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }

});