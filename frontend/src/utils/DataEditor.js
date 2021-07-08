class DataEditor {
  formatarData(data) {
    return (
      this.adicionaZero(data.getDate().toString()) +
      "/" +
      this.adicionaZero(data.getMonth() + 1).toString() +
      "/" +
      data.getFullYear()
    );
  }

  adicionaZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }
  
}
export default new DataEditor()
