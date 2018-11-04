"use strict";

var Canvas = function () {
    this.image = document.getElementById('SourceImage');
    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.setCanvasWidth(this.image.width);
    console.log(this.getCanvasWidth());

    this.setCanvasHeight(this.image.height);
    console.log(this.getCanvasHeight());

    this.drawTheImage();
};

Canvas.prototype.drawTheImage = function() {
    // Set the canvas the same width and height of the image
    this.canvas.width = this.image.width;
    this.canvas.height = this.image.height;
    this.context.drawImage(this.image, 0, 0);
    // Get the canvas image data
    this.imageData = this.context.getImageData(0, 0, PIXELSIZE, PIXELSIZE);
};

Canvas.prototype.setCanvasWidth = function (width) {
    this.canvas.width = width;
};

Canvas.prototype.getCanvasWidth = function () {
    return this.canvas.width;
};

Canvas.prototype.setCanvasHeight = function (Height) {
    this.canvas.Height = Height;
};

Canvas.prototype.getCanvasHeight = function () {
    return this.canvas.Height;
};

Canvas.prototype.getPixelData = function (coordX, coordY) {
    return this.context.getImageData(coordX, coordY, PIXELSIZE, PIXELSIZE)
};