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

  static checkMeat(ingredients) {
    var price = 0
    var meats = ingredients.filter((value) => {
      if (value.id === this.HAMBURGER) price = value.price
      return value.id === this.HAMBURGER
    }).length

    return Math.floor(meats/3) * price
  }

  static checkCheese(ingredients) {
    var price = 0
    var cheeses = ingredients.filter((value) => {
      if (value.id === this.CHEESE) price = value.price
      return value.id === this.CHEESE
    }).length

    return Math.floor(cheeses/3) * price
  }
}

export default Promotions