const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2
})

class Utils {
  
  static toCurrency(value) {
    return formatter.format(value);
  }
}

export default Utils