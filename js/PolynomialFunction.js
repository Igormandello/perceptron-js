class PolynomialFunction {
  constructor(coeficients) {
    this._coeficients = coeficients
    this._degree = this._coeficients.length - 1
  }

  get degree() {
    return this._degree
  }

  resolve(x, y) {
    let sum = - y
    this._coeficients.forEach((coeficient, i) => {
      sum += coeficient * Math.pow(x, this._degree - i)
    });

    return sum
  }

  findY(x) {
    let sum = 0
    this._coeficients.forEach((coeficient, i) => {
      sum += coeficient * Math.pow(x, this._degree - i)
    });

    return sum
  }
}