class PolynomialFunction {
  constructor(coefficients, offset) {
    this._coefficients = coefficients;
    this._degree = this._coefficients.length - 1;
    this._offset = offset;
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

    let py = this.findY(this._offset) * ctx.canvas.height;
    ctx.moveTo(-step, py);

    for (let x = 0; x <= 1 + step; x += step) {
      py = this.findY(x + this._offset) * ctx.canvas.height;
      ctx.lineTo(x * ctx.canvas.width, py);
    }   
    ctx.stroke();
  }
}