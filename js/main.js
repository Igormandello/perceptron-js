(() => {
  const ge = new GameEngine({ fullScreen: true, fps: 1 })

  const plot = new Plot(100)

  ge.addUpdateComponent(ctx => {
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, 'background')

  ge.addUpdateComponent(plot.update.bind(plot), 'plotUpdate');
  ge.start()
})()