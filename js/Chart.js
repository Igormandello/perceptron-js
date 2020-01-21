class Chart {
  constructor(numberOfPoints, fnCoefficients, offset) {
    this.points = [];
    for (let i = 0; i < numberOfPoints; i++) {
      this.points.push({
        x: Math.random(),
        y: Math.random()
      });
    }
    
    this.offset = offset || 0;
    this.fn = new PolynomialFunction(fnCoefficients, offset);
    this.perceptron = new Perceptron(this.fn.degree + 1);
  }

  update(ctx) {
    this._drawFunctions(ctx);
    this.points.forEach(this._drawPoint.bind(this, ctx));

    this._trainPerceptron();
  }

  _drawFunctions(ctx) {
    let coefficients = this._gatherPredictedCoefficients();
    let predictedFn = new PolynomialFunction(coefficients, this.offset);

    let step = 0.01;
    this.fn.display(ctx, '#CCC', step);
    predictedFn.display(ctx, '#8F8', step);
  }

  _drawPoint(ctx, point) {
    let circle = new OutlinedCircle(point.x, point.y, '#FAFAFA', '#000');
    circle.display(ctx);
  }

  _isPredictionCorrect(prediction, actual) {
    return true;
  }

  _trainPerceptron(frames) {
    let xs = [];
    let ys = [];
    for (let i = 0; i < 500; i++) {
      const point = this.points[(frames + i) % this.points.length];
    }

    this.perceptron.train(xs, ys)
  }

  _gatherPredictedCoefficients() {
    return [];
  }

  _generateInputsArray(point) {
    return [];
  }
}