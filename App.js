import React from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import MenuItem from './components/menu_item'
import Ingredient from './components/ingredient'
import Promotions from './utils/promotions'
import Utils from './utils/utils'

import dataFromServer from "./data.json";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: [],
      orderCharge: 0.0,
      customItem: {
        name: 'Lanche customizado',
        ingredients: [],
        price: 0.0,
        fullPrice: 0.0,
      }
    };
  }
  _keyExtractor = (item, index) => item.id;

  _addItem = (item) => {
    console.log('Novo Item:', item);

    var order = this.state.order
    order.push(item)
    this.setState({
      order,
      orderCharge: this.state.orderCharge + item.price
    }) 
  }

  _changeIngredient = (item, add) => {
    var customItem = this.state.customItem
    if (add) {
      customItem.ingredients.push(item)
      customItem.fullPrice += item.price
    } else {
      for (var i = 0; i < this.state.customItem.ingredients.length; i++) {
        var element = this.state.customItem.ingredients[i];
        
        if (element.id === item.id) {
          customItem.ingredients.splice(i, 1)
          customItem.fullPrice -= item.price
          break;
        }
      }
    }
    customItem.price = this._checkPromotions(customItem)
    this.setState({
      customItem
    })
  }

  _checkPromotions = (customItem) => {
    meatDiscount = Promotions.checkMeat(customItem.ingredients)
    cheeseDiscount = Promotions.checkCheese(customItem.ingredients)
    price = customItem.fullPrice - meatDiscount - cheeseDiscount
    if (Promotions.checkLight(customItem.ingredients)) {
      price = price * 0.9
    }
    return price
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.menuOptions}>
          <Text style={styles.tilte}>Cardápio</Text>
          <FlatList
            data={dataFromServer.menu}
            extraData={this.state}
            renderItem={({item}) => <MenuItem{...item}
              addItem={this._addItem}
            />}
            keyExtractor={this._keyExtractor}
            horizontal={true}
          />
        </View>
        <View style={styles.customItem}>
          <Text style={styles.title}>Ou crie um lanche com os ingredientes:</Text>
          <FlatList
            data={dataFromServer.ingredients}
            extraData={this.state}
            renderItem={({item}) => <Ingredient{...item}
              changeIngredient={this._changeIngredient}
              ingredients={this.state.customItem.ingredients}
            />}
            keyExtractor={this._keyExtractor}
          />
          <Text style={styles.title}>Valor do lanche: {Utils.toCurrency(this.state.customItem.price/100)}</Text>
          <Button
            onPress={() => {
              this._addItem(this.state.customItem)
              this.setState({ 
                customItem: {
                  name: 'Lanche customizado',
                  ingredients: [],
                  price: 0.0,
                  fullPrice: 0.0
                }
              })
            }}
            title="Adicionar ao pedido"
          />
        </View>
        <View style={styles.order}>
          <Text>Pedido: </Text>
          <Text>{this.state.order.length} item(s)</Text>
          <Text>Total: {Utils.toCurrency(this.state.orderCharge/100)}</Text>
        </View>
        <Button
            onPress={() => {
              this._addItem(this.state.customItem)
              this.setState({
                order: [],
                orderCharge: 0.0, 
                customItem: {
                  name: 'Lanche customizado',
                  ingredients: [],
                  price: 0.0,
                  fullPrice: 0.0
                }
              })
            }}
            title="Finalizar pedido"
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tilte: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  menuOptions: {
    flex: 3,
    alignItems: 'center',
  },
  customItem: {
    flex: 6,
    alignItems: 'center',
  },
  order: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    margin: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
