import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Utils from '../utils/utils'

class MenuItem extends React.PureComponent{
  render() {
    console.log(this.props);
    let price = 0.0
    let ingredients = this.props.ingredients.map(function (item) {
      price+= item.price
      return(
        <Text key={item.id}> - {item.name}</Text>
      )
    })
    return(
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.name}</Text>
        <View style={styles.ingredients}>
          {ingredients}
        </View>
        <Text>{Utils.toCurrency(price/100)}</Text>
        <Button style={styles.button}
          onPress={() => {
            this.props.addItem({
              name: this.props.name,
              ingredients: this.props.ingredients,
              price: price,
            })
          }}
          title="Adicionar"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    padding: 4,
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black'
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ingredients: {
    flex: 4,
  },
  button: {
    flex: 1
  }
});

export default MenuItem