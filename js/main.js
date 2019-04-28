var p;
(() => {
  const ge = new GameEngine({ ratio: 1, fps: 200 })
  const plot = new Plot(
    500, 
    new PolynomialFunction(3, [10, -1.5, -1.5, 1]),
    -0.6
  )
  new Input(() => {
    console.log(plot._perceptron.weights)
  })
  
  ge.addUpdateComponent((ctx) => {
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, 'background')

  ge.addUpdateComponent(plot.update.bind(plot), 'plotUpdate');
  ge.start()
})()