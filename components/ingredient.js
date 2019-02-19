import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class Ingredient extends React.Component{
  _filter = (value) => {
    return this.props.id === value.id
  }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.name} :</Text>
        <View style={styles.quantity}>
          <Button style={styles.button}
            onPress={() => this.props.changeIngredient(this.props, false)}
            title=" - "
          />
          <Text style={styles.text}>{this.props.ingredients.filter(this._filter).length}</Text>
          <Button
            onPress={() => this.props.changeIngredient(this.props, true)}
            title=" + "
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    alignSelf: 'center',
  },
  quantity: {
    flexDirection: 'row',
  }
});

export default Ingredient