class Perceptron {
  constructor() {
    this._weight = Math.random()
    this._bias = Math.random() * 100
  }

  predict(x, y) {
    return this._weight * x + this._bias
  }

  train(xs, ys) {
    xs.forEach((x, i) => {
      let delta = 1 - (1 / (this.predict(x) - ys[i]))
      
      this._weight -= delta * 0.001
      this._bias += delta * 0.001

      console.log(this._weight, this._bias)
    });
  }
}