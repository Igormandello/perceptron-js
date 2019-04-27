class LinearFunction {
  constructor(a, b, c) {
    this._a = a
    this._b = b
    this._c = c
  }

  resolve(x, y) {
    return this._a * x + this._b * y + this._c
  }

  findY(x) {
    return (- this._a * x - this._c) / this._b
  }
}