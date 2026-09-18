export function downloadCanvas(canvas: HTMLCanvasElement, name: string, round = false) {
  const size = 512;
  const out = document.createElement("canvas");
  out.width = size;
  out.height = size;
  const ctx = out.getContext("2d");
  if (!ctx) return;
  const side = Math.min(canvas.width, canvas.height);
  const sx = (canvas.width - side) / 2;
  const sy = (canvas.height - side) / 2;
  if (round) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
  }
  ctx.drawImage(canvas, sx, sy, side, side, 0, 0, size, size);
  const a = document.createElement("a");
  a.href = out.toDataURL("image/png");
  a.download = name;
  a.click();
}

export function downloadFull(canvas: HTMLCanvasElement, name: string) {
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = name;
  a.click();
}
