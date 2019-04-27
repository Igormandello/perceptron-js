class Plot {
  constructor(numberOfPoints, fn) {
    this._points = []
    for (let i = 0; i < numberOfPoints; i++) {
      this._points.push({
        x: Math.random(),
        y: Math.random()
      })
    }
    
    this._fn = fn
    this._perceptron = new Perceptron()
  }

  update(ctx) {
    let initialPy = this._fn(0),
        endPy = this._fn(ctx.canvas.width)

    ctx.strokeStyle = "#CCC"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, initialPy)
    ctx.lineTo(ctx.canvas.width, endPy)
    ctx.stroke()

    let predictYFn = (x) => (- this._perceptron.weights[0] * x - this._perceptron.weights[2]) / this._perceptron.weights[1]
    initialPy = predictYFn(0) * ctx.canvas.height
    endPy = predictYFn(1) * ctx.canvas.height

    //console.log(initialPy, endPy)

    ctx.strokeStyle = "#888"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, initialPy)
    ctx.lineTo(ctx.canvas.width, endPy)
    ctx.stroke()

    let xs = []
    let ys = []

    this._points.forEach(point => {
      ctx.fillStyle = "#FAFAFA"
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        10, 0, Math.PI * 2
      )
      ctx.fill()

      let pointY = point.y * ctx.canvas.height
      let predictedY = this._perceptron.predict([point.x, point.y]) * ctx.canvas.height
      let actualY = this._fn(point.x * ctx.canvas.width)

      if ((pointY > predictedY && pointY > actualY) || (pointY < predictedY && pointY < actualY))
        ctx.fillStyle = "#0F0"
      else
        ctx.fillStyle = "#F00"

      xs.push([point.x, point.y])
      ys.push(point.x - point.y)
      
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        6, 0, Math.PI * 2
      )
      ctx.fill()
    });

    this._perceptron.train(xs, ys)
  }
}