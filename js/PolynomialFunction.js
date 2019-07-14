class PolynomialFunction {
  constructor(coeficients) {
    this._coeficients = coeficients;
    this._degree = this._coeficients.length - 1;
  }

  get degree() {
    return this._degree;
  }

  resolve(x, y) {
    // Finds the value of a0.x^n + a1.x^(n-1) + ... + an - y
    // If the (x, y) pair is in the line, the result will be 0

    let sum = - y;
    this._coeficients.forEach((coeficient, i) => {
      sum += coeficient * Math.pow(x, this._degree - i);
    });

    return sum;
  }

  findY(x) {
    // Find the Y value to the given X

    let sum = 0;
    this._coeficients.forEach((coeficient, i) => {
      sum += coeficient * Math.pow(x, this._degree - i);
    });

    return sum;
  }
}