(() => {
  const ge = new GameEngine({ ratio: 1, fps: 60 })
  const plot = new Plot(100, (x) => x)

  ge.addUpdateComponent(ctx => {
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, 'background')

  ge.addUpdateComponent(plot.update.bind(plot), 'plotUpdate');
  ge.start()
})()