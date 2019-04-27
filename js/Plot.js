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
  }

  update(ctx, ratio, frames) {
    let initialPy = this._fn(0),
        endPy = this._fn(ctx.canvas.width)

    ctx.strokeStyle = "#CCC"
    ctx.lineWidth = 4
    ctx.beginPath()
    ctx.moveTo(0, ctx.canvas.height - initialPy)
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height - endPy)
    ctx.stroke()

    this._points.forEach(point => {
      ctx.fillStyle = "#FAFAFA"
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        10, 0, Math.PI * 2
      )
      ctx.fill()

      ctx.fillStyle = "#0F0"
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        6, 0, Math.PI * 2
      )
      ctx.fill()
    });
  }
}