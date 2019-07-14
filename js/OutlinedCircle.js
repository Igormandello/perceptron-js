class OutlinedCircle {
  constructor(x, y, innerColor, outlineColor) {
    this._innerColor = innerColor;
    this._outlineColor = outlineColor;
    this._position = { x, y };
  }

  display(ctx) {
    ctx.fillStyle = this._innerColor;
    ctx.beginPath();
    ctx.arc(
      this._position.x * ctx.canvas.width,
      this._position.y * ctx.canvas.height,
      6, 0, Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle = this._outlineColor;
    ctx.beginPath();
    ctx.arc(
      this._position.x * ctx.canvas.width,
      this._position.y * ctx.canvas.height,
      4, 0, Math.PI * 2
    );
    ctx.fill();
  }
}