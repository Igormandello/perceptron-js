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
    let initialPy = this._fn.findY(0) * ctx.canvas.height,
        endPy = this._fn.findY(1) * ctx.canvas.height
        
    ctx.strokeStyle = "#CCC"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, initialPy )
    ctx.lineTo(ctx.canvas.width, endPy)
    ctx.stroke()

    let predictedFn = new LinearFunction(this._perceptron.weights[0], this._perceptron.weights[1], this._perceptron.weights[2])
    initialPy = predictedFn.findY(0) * ctx.canvas.height
    endPy = predictedFn.findY(1) * ctx.canvas.height

    ctx.strokeStyle = "#8F8"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, initialPy)
    ctx.lineTo(ctx.canvas.width, endPy)
    ctx.stroke()
    this._points.forEach(point => {
      ctx.fillStyle = "#FAFAFA"
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        6, 0, Math.PI * 2
      )
      ctx.fill()

      let predictedSum = this._perceptron.predict([point.x, point.y])
      let actualSum = this._fn.resolve(point.x, point.y)

      let correctCount = 0
      if ((actualSum > 0 && predictedSum > 0) || (actualSum < 0 && predictedSum < 0)) {
        correctCount++
        ctx.fillStyle = "#0F0"
      } else
        ctx.fillStyle = "#F00"
      
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        4, 0, Math.PI * 2
      )
      ctx.fill()
    });

    let xs = []
    let ys = []
    for (let i = 0; i < 50; i++) {
      const point = this._points[(frames + i) % this._points.length]
      xs.push([point.x, point.y])
      ys.push(this._fn.resolve(point.x, point.y))
    }

    this._perceptron.train(xs, ys)
  }
}