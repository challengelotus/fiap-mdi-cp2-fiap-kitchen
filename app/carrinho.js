import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCarrinho } from '../context/CarrinhoContext'
import { SALGADOS } from '../data/salgados';
import { BEBIDAS } from '../data/bebidas';
import { SOBREMESAS } from '../data/sobremesas';

const TODOS_PRODUTOS = [...SALGADOS, ...BEBIDAS, ...SOBREMESAS];

export default function Carrinho () {
  const router = useRouter();
  const { carrinho, valorTotal, totalItens, alterarQuantidade } = useCarrinho();
  const itensNoCarrinho = TODOS_PRODUTOS.filter(produto => (carrinho[produto.id] || 0) > 0);
  const totalFormatado = valorTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  return(
    <ImageBackground 
      source={require('../assets/backgroundImage.png')} 
      style={styles.container}
    >
      <StatusBar style="light"/>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.canGoBack() ? router.back() : router.replace('/cardapio')}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>Carrinho</Text>
        </View>
      </View>

      {/* MENU */}
      <View style={{flex: 1}}>
        {totalItens === 0 ? (
          <View style={styles.menuContainer}>
            <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
            <TouchableOpacity style={styles.emptyCartButton} onPress={() => router.push('/cardapio')}>
              <Text style={styles.cartButtonText}>Ver Cardápio</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView 
            contentContainerStyle={styles.scrollContent} 
            showsVerticalScrollIndicator={false}
          >
            {itensNoCarrinho.map((produto) => {
              const qtd = carrinho[produto.id] || 0;
              
              return (
                <View key={produto.id} style={styles.card}>
                  <Image source={produto.imagem} style={styles.productImage} resizeMode="cover" />
                  
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>{produto.nome}</Text>
                    <Text style={styles.productPrice}>
                      {(produto.preco * qtd).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </Text>
                  </View>

                  <View style={styles.counterContainer}>
                    <TouchableOpacity 
                      style={styles.counterButton} 
                      onPress={() => alterarQuantidade(produto.id, 'subtrai')}
                    >
                      <Ionicons name="remove" size={18} color="#fff" />
                    </TouchableOpacity>
                    
                    <Text style={styles.counterText}>{qtd}</Text>
                    
                    <TouchableOpacity 
                      style={styles.addButtonSmall} 
                      onPress={() => alterarQuantidade(produto.id, 'soma')}
                    >
                      <Ionicons name="add" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        )}

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
          onPress={() => router.push('/pagamento')}
        >
          <Ionicons 
            name="cart-outline" 
            size={24} 
            color={totalItens === 0 ? "#777" : "#fff"} 
            style={{ marginRight: 8 }} 
          />
          <Text style={[styles.cartButtonText, totalItens === 0 && { color: '#777' }]}>
            Finalizar Pedido
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 60,
    justifyContent: "space-between"
  },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: { 
    backgroundColor: '#151515', 
    padding: 10, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#252525' 
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: { 
    color: '#fff', 
    fontSize: 30, 
    fontWeight: 'bold' 
  },

  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyCartText: {
    color: '#a7a7a7ff',
    fontSize: 20,
    fontWeight: 400,
    marginBottom: 10
  },
  emptyCartButton: {
    backgroundColor: "#D21C56",
    height: 50,
    width: 150,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  
  scrollContent: { 
    paddingHorizontal: 20,
    paddingBottom: 20 
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#151515',
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  productImage: { 
    width: 80, 
    height: 80, 
    borderRadius: 12 
  },
  productInfo: { 
    flex: 1, 
    marginLeft: 12 
  },
  productName: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  productDescription: { 
    color: '#888', 
    fontSize: 11, 
    marginVertical: 4 
  },
  productPrice: { 
    color: '#D21C56', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  addButtonSmall: { 
    backgroundColor: '#D21C56', 
    width: 32, 
    height: 32, 
    borderRadius: 16, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  counterContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#000', 
    borderRadius: 25, 
    padding: 4, 
    borderWidth: 1, 
    borderColor: '#252525' 
  },
  counterButton: { 
    width: 28, 
    height: 28, 
    backgroundColor: '#222', 
    borderRadius: 14, 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  counterText: { 
    color: '#fff', 
    marginHorizontal: 12, 
    fontWeight: 'bold', 
    fontSize: 16 
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