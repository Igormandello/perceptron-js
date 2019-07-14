class PolynomialFunction {
  constructor(coeficients) {
    this._coeficients = coeficients;
    this._degree = this._coeficients.length - 1;
  }

  get degree() {
    return this._degree;
  }

  resolve(x, y) {
    // Finds the value of a0.x^n + a1.x^(n-1) + ... + an - y
    // If the (x, y) pair is in the line, the result will be 0
    return 0;
  }

  findY(x) {
    return 0;
  }

  display(ctx, color, step) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();

    let py = this.findY(this.offset) * ctx.canvas.height;
    ctx.moveTo(-step, py);

    for (let x = 0; x <= 1 + step; x += step) {
      py = this.findY(x + this.offset) * ctx.canvas.height;
      ctx.lineTo(x * ctx.canvas.width, py);
    }   
    ctx.stroke();
  }
}