var p;
(() => {
  const ge = new GameEngine({ ratio: 1, fps: 200 })
  const plot = new Plot(
    500, 
    new PolynomialFunction(1, [-0.6, 1])
  )
  new Input(() => {
    let fn = new PolynomialFunction(1, [-0.6, 1])
    console.log(plot._perceptron.predict([1, 0.5]), fn.resolve(1, 0.5))
  })
  
  ge.addUpdateComponent((ctx) => {
    ctx.fillStyle = "#333"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  }, 'background')

  ge.addUpdateComponent(plot.update.bind(plot), 'plotUpdate');
  ge.start()

  /*
  p = new Perceptron(4)
  let phrases = [
    { phrase: "Are you a perceptron?", intent: 1 },
    { phrase: "Are you a potato?", intent: -1 },
    { phrase: "Are you a perceptron?", intent: 1 },
    { phrase: "Are you a banana?", intent: -1 },
    { phrase: "Are you a person?", intent: -1 },
    { phrase: "Are you a perceptron?", intent: 1 },
    { phrase: "Are you a perceptron?", intent: 1 },
    { phrase: "Are you a cup?", intent: -1 },
    { phrase: "Are you a bottle?", intent: -1 },
    { phrase: "Are you a monitor?", intent: -1 },
    { phrase: "Are you a computer?", intent: -1 },
    { phrase: "Are you a radio?", intent: -1 },
    { phrase: "Are you a perceptron?", intent: 1 },
    { phrase: "Are you a podcaster?", intent: -1 },
    { phrase: "Are you a polengui?", intent: -1 },
    { phrase: "Are you a podcaster?", intent: -1 },
    { phrase: "Are you a polengui?", intent: -1 },
    { phrase: "Are you a podcaster?", intent: -1 },
    { phrase: "Are you a polengui?", intent: -1 },
    { phrase: "Are you a perceptron?", intent: 1 },
    { phrase: "Are you a perceptron?", intent: 1 },
  ]

  trainData = []
  intentData = []
  for (let n = 0; n < 10000; n++)
    phrases.forEach(phrase => {
      trainData.push(toWeights(phrase.phrase)) 
      intentData.push(phrase.intent)
    })
  p.train(trainData, intentData)

  const total = phrases.length
  let correct = 0
  let wrong = 0
  phrases.forEach(phrase => {
    const prediction = p.predict(toWeights(phrase.phrase))

    if ((prediction < 0 && phrase.intent < 0) || (prediction > 0 && phrase.intent > 0))
      correct++
    else
      wrong++
  });

  console.log(`Total: ${total}, correct: ${correct}, wrong: ${wrong}`)
  console.log(p)*/
})()

/*
function toWeights(phrase) {
  let weights = []
  phrase.split(' ').forEach(word => {
    let sum = 0
    for (let i = 0; i < word.length; i++)
      sum += word.charCodeAt(i) / 255;

    weights.push(sum)
  })

  return weights
}

function answerMe(question) {
  const prediction = p.predict(toWeights(question))

  if (prediction < 0)
    console.log('Não mano')
  else
    console.log('Sim parça')
}*/