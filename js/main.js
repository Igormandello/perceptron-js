(() => {
  const ge = new GameEngine({ fullScreen: true, fps: 200 })
  const chart = new Chart(
    500, 
    new PolynomialFunction([10, -1.5, -1.5, 0.5]),
    -0.4
  )
  new Input(() => {
    console.log(chart._perceptron.weights)
  })

  let context = ge._context
  context.translate(0, ge.canvas.height)
  context.scale(1, -1)

  ge.addUpdateComponent((ctx) => {
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.fillStyle = "#F00"
    ctx.arc(0, 0, 8, 0, Math.PI * 2)
    ctx.fill()
  }, 'background')

  ge.addUpdateComponent(chart.update.bind(chart), 'chartUpdate');
  ge.start()
})()