class Plot {
  constructor(numberOfPoints) {
    this._points = []
    for (let i = 0; i < numberOfPoints; i++) {
      this._points.push({
        x: Math.random(),
        y: Math.random()
      })
    }
  }

  update(ctx, ratio, frames) {
    ctx.fillStyle = "#FAFAFA"
    this._points.forEach(point => {
      ctx.beginPath()
      ctx.arc(
        point.x * ctx.canvas.width,
        point.y * ctx.canvas.height,
        8, 0, Math.PI * 2
      )
      ctx.fill()
    });
  }
}