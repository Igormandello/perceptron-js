(() => {
  const ge = new GameEngine({ ratio: 1, fps: 200 })
  const plot = new Plot(
    500, 
    new LinearFunction(-3, -9, 5)
  )

  const input = new Input(() => console.log(plot._perceptron.weights))
  ge.addUpdateComponent((ctx, ratio, frames) => {
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, 'background')

  ge.addUpdateComponent(plot.update.bind(plot), 'plotUpdate');
  ge.start()
})()