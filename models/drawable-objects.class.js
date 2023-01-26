class DrawableObject {
  x = 120;
  y = 280;
  height = 150;
  width = 100;
  img;
  imagecache = {};
  currentImage = 0;
  offset = {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  };

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imagecache[path] = img;
    });
  }

  drawFrame(ctx) {
    if (this instanceof Chicken || this instanceof Character || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      /* ctx.rect(this.x, this.y, this.width, this.height); *///*Offset = Anpassung der Größe. Diese Zeile = Kasten ohne Anpassung der Größe
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.right, this.height - this.offset.top - this.offset.bottom);
      ctx.stroke();
    }
  }
}
