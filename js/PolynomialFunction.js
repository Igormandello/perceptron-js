//10 * x * x * x - 1.5 * x * x - 1.5 * x - y + 1
class PolynomialFunction {
  constructor(degree, coeficients) {
    this._degree = degree
    this._coeficients = coeficients

    if (this._coeficients.length != this._degree + 1) {
      throw new Error('The coeficients length does not match the function degree')
    }
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