class Chart {
  constructor(numberOfPoints, fn, offset) {
    this._points = []
    for (let i = 0; i < numberOfPoints; i++) {
      this._points.push({
        x: Math.random(),
        y: Math.random()
      })
    }
    
    this._offset = offset || 0
    this._fn = fn
    this._perceptron = new Perceptron(this._fn._degree + 1)
  }

  update(ctx, ratio, frames) {
    this._drawFunctions(ctx)
    this._points.forEach(this._drawPoint.bind(this, ctx))

    this._trainPerceptron(frames)
  }

  _drawFunctions(ctx) {
    let coeficients = []
    this._perceptron.weights.forEach((weight, i) => {
      if (i !== this._perceptron.weights.length - 2) {
        coeficients.push(weight / - this._perceptron.weights[this._perceptron.weights.length - 2])
      }
    });

    let predictedFn = new PolynomialFunction(coeficients)

    let step = 0.01
    this._drawFunction(ctx, this._fn, '#CCC', step)
    this._drawFunction(ctx, predictedFn, '#8F8', step)
  }

  _drawFunction(ctx, fn, color, step) {
    ctx.strokeStyle = color
    ctx.lineWidth = 4
    ctx.beginPath()

    let py = fn.findY(this._offset) * ctx.canvas.height
    ctx.moveTo(-step, py)

    for (let x = 0; x <= 1 + step; x += step) {
      py = fn.findY(x + this._offset) * ctx.canvas.height
      ctx.lineTo(x * ctx.canvas.width, py)
    }   
    ctx.stroke()
  }

  _drawPoint(ctx, point) {
    let predictedSum = this._perceptron.predict(this._generateInputsArray(point))
    let actualSum = this._fn.resolve(point.x + this._offset, point.y)
    let isPredictionCorrect = this._isPredictionCorrect(predictedSum, actualSum)
    
    let circle = new OutlinedCircle(point.x, point.y, '#FAFAFA', isPredictionCorrect ? '#0F0' : '#F00')
    circle.display(ctx)
  }

  _isPredictionCorrect(predict, actual) {
    return (actual > 0 && predict > 0) || (actual < 0 && predict < 0) || actual === predict
  }

  _trainPerceptron(frames) {
    let xs = []
    let ys = []
    for (let i = 0; i < 5000; i++) {
      const point = this._points[(frames + i) % this._points.length]
      xs.push(this._generateInputsArray(point))
      ys.push(this._fn.resolve(point.x + this._offset, point.y))
    }

    this._perceptron.train(xs, ys)
  }

  _generateInputsArray(point) {
    let inputs = []
    for (let i = this._fn._degree; i > 0; i--) {
      inputs.push(Math.pow(point.x + this._offset, i))
    }

    inputs.push(point.y)
    return inputs
  }
}