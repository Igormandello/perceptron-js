class Chart {
  constructor(numberOfPoints, fn, offset) {
    this.points = [];
    for (let i = 0; i < numberOfPoints; i++) {
      this.points.push({
        x: Math.random(),
        y: Math.random()
      });
    }
    
    this.offset = offset || 0;
    this.fn = fn;
    this.perceptron = new Perceptron(this.fn.degree + 1);
  }

  update(ctx) {
    this._drawFunctions(ctx);
    this.points.forEach(this._drawPoint.bind(this, ctx));

    this._trainPerceptron();
  }

  _drawFunctions(ctx) {
    let coeficients = this._gatherPredictedCoeficients();
    let predictedFn = new PolynomialFunction(coeficients);

    let step = 0.01;
    this.fn.drawFunction(ctx, '#CCC', step);
    predictedFn.drawFunction(ctx, '#8F8', step);
  }

  _drawPoint(ctx, point) {
    let circle = new OutlinedCircle(point.x, point.y, '#FAFAFA', '#000');
    circle.display(ctx);
  }

  _isPredictionCorrect(predict, actual) {
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

  _gatherPredictedCoeficients() {
    return [];
  }

  _generateInputsArray(point) {
    return [];
  }
}