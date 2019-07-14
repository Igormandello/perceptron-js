class Perceptron {
  constructor(numberOfWeights) {
    this.weights = [];
    this.lr = 0.01;
    
    for (let n = 0; n < numberOfWeights + 1; n++)
      this.weights.push(Math.random() - 0.5);
  }

  predict(inputs) {
    let sum = 0;
    for (let n = 0; n < this.weights.length - 1; n++)
      sum += inputs[n] * this.weights[n];
    sum += this.weights[this.weights.length - 1];

    return sum
  }

  train(inputDatas, predictDatas) {
    inputDatas.forEach((inputs, i) => {
      let diff = predictDatas[i] - this.predict(inputs);
    
      for (let n = 0; n < this.weights.length - 1; n++)
        this.weights[n] += diff * inputs[n] * this.lr;
      
      this.weights[this.weights.length - 1] += diff * this.lr;
    });
  }
}