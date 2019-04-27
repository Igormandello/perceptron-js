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

  update(ctx, ratio, frames) {
    let initialPy = this._fn(0),
        endPy = this._fn(ctx.canvas.width)

    ctx.strokeStyle = "#CCC"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, initialPy)
    ctx.lineTo(ctx.canvas.width, endPy)
    ctx.stroke()

    initialPy = this._perceptron.predict(0)
    endPy = this._perceptron.predict(ctx.canvas.width)

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

      let lineY = this._perceptron.predict(point.x * ctx.canvas.width)
      let pointY = point.y * ctx.canvas.height
      if ((pointY < lineY && pointY < this._fn(point.x * ctx.canvas.width)) || (pointY > lineY && pointY > this._fn(point.x * ctx.canvas.width)))
        ctx.fillStyle = "#0F0"
      else {
        xs.push(point.x * ctx.canvas.width)
        ys.push(this._fn(point.x * ctx.canvas.width))
        ctx.fillStyle = "#F00"
      }

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