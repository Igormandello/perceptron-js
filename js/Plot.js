class Plot {
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

    this._points.forEach(point => {
      ctx.fillStyle = "#FAFAFA"
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        6, 0, Math.PI * 2
      )
      ctx.fill()

      let predictedSum = this._perceptron.predict(this._generateInputsArray(point))
      let actualSum = this._fn.resolve(point.x + this._offset, point.y)

      if ((actualSum > 0 && predictedSum > 0) || (actualSum < 0 && predictedSum < 0))
        ctx.fillStyle = "#0F0"
      else
        ctx.fillStyle = "#F00"
      
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        4, 0, Math.PI * 2
      )
      ctx.fill()
    });

    this._trainPerceptron(frames)
  }

  _drawFunctions(ctx) {
    ctx.strokeStyle = "#CCC"
    ctx.lineWidth = 4
    ctx.beginPath()

    let py = this._fn.findY(this._offset) * ctx.canvas.height
    ctx.moveTo(0, py)

    for (let x = 0.01; x <= 1.01; x += 0.01) {
      py = this._fn.findY(x + this._offset) * ctx.canvas.height
      ctx.lineTo(x * ctx.canvas.width, py)
    }   
    ctx.stroke()

    let coeficients = []
    this._perceptron.weights.forEach((weight, i) => {
      if (i !== this._perceptron.weights.length - 2) {
        coeficients.push(weight / - this._perceptron.weights[this._perceptron.weights.length - 2])
      }
    });

    let predictedFn = new PolynomialFunction(this._fn._degree, coeficients)
    ctx.strokeStyle = "#8F8"
    ctx.lineWidth = 4
    ctx.beginPath()

    py = predictedFn.findY(this._offset) * ctx.canvas.height
    ctx.moveTo(0, py)

    for (let x = 0.01; x <= 1.01; x += 0.01) {
      py = predictedFn.findY(x + this._offset) * ctx.canvas.height
      ctx.lineTo(x * ctx.canvas.width, py)
    }   
    ctx.stroke()
  }

  _trainPerceptron(frames) {
    let xs = []
    let ys = []
    for (let i = 0; i < 100; i++) {
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