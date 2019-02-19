class Promotions {
  static LETTUCE = "0"
  static BACON = "1"
  static HAMBURGER = "2"
  static EGG = "3"
  static CHEESE = "4"

  static checkLight(ingredients) {
    console.log('Ingredients', ingredients)
    return ingredients.filter((value) => {
      return value.id === this.LETTUCE
    }).length > 0 
    &&
    ingredients.filter((value) => {
      return value.id === this.BACON
    }).length === 0;
  }
}

export default Promotions