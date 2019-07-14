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

  update(ctx, ratio, frames) {
    this._drawFunctions(ctx);
    this.points.forEach(this._drawPoint.bind(this, ctx));

    this._trainPerceptron(frames);
  }

  _drawFunctions(ctx) {
    let coeficients = this._gatherPredictedCoeficients();
    let predictedFn = new PolynomialFunction(coeficients);

    let step = 0.01;
    this._drawFunction(ctx, this.fn, '#CCC', step);
    this._drawFunction(ctx, predictedFn, '#8F8', step);
  }

  _drawFunction(ctx, fn, color, step) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();

    let py = fn.findY(this.offset) * ctx.canvas.height;
    ctx.moveTo(-step, py);

    for (let x = 0; x <= 1 + step; x += step) {
      py = fn.findY(x + this.offset) * ctx.canvas.height;
      ctx.lineTo(x * ctx.canvas.width, py);
    }   
    ctx.stroke();
  }

  _drawPoint(ctx, point) {
    let predictedSum = this.perceptron.predict(this._generateInputsArray(point));
    let actualSum = this.fn.resolve(point.x + this.offset, point.y);
    let isPredictionCorrect = this._isPredictionCorrect(predictedSum, actualSum);
    
    let circle = new OutlinedCircle(point.x, point.y, '#FAFAFA', isPredictionCorrect ? '#0F0' : '#F00');
    circle.display(ctx);
  }

  _isPredictionCorrect(predict, actual) {
    return (actual > 0 && predict > 0) || (actual < 0 && predict < 0) || actual === predict;
  }

  _trainPerceptron(frames) {
    let xs = [];
    let ys = [];
    for (let i = 0; i < 500; i++) {
      const point = this.points[(frames + i) % this.points.length];
      xs.push(this._generateInputsArray(point));
      ys.push(this.fn.resolve(point.x + this.offset, point.y));
    }

    this.perceptron.train(xs, ys);
  }

  _gatherPredictedCoeficients() {
    let weights = this.perceptron.weights;
    let yCoefficient = - weights[this.fn.degree];
    
    let coeficients = [];
    for (let i = 0; i < weights.length - 1; i++)
      coeficients.push(weights[i] / yCoefficient);

    coeficients.push(this.perceptron.bias / yCoefficient);
    return coeficients;
  }

  _generateInputsArray(point) {
    let inputs = [];
    for (let i = this.fn.degree; i > 0; i--) {
      inputs.push(Math.pow(point.x + this.offset, i));
    }

    inputs.push(point.y);
    return inputs;
  }
}