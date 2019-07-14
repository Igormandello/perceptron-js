class Perceptron {
  constructor(numberOfWeights) {
    this.weights = [];
    this.lr = 0.001;
    
    for (let n = 0; n < numberOfWeights; n++)
      this.weights.push(Math.random() - 0.5);

    this.bias = Math.random() - 0.5;
  }

  predict(inputs) {
    let sum = 0;
    for (let n = 0; n < this.weights.length; n++)
      sum += inputs[n] * this.weights[n];

    sum += this.bias;
    return sum;
  }

  train(inputDatas, predictDatas) {
    inputDatas.forEach((inputs, i) => {
      let diff = predictDatas[i] - this.predict(inputs);
    
      for (let n = 0; n < this.weights.length; n++)
        this.weights[n] += diff * inputs[n] * this.lr;
      
      this.bias += diff * this.lr;
    });
  }
}