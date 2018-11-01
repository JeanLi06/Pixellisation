"use strict";


var Program = function () {

    // this.svgCanvas = new SVGCanvas(this.canvas.ctx);
    this.canvas = new Canvas();
    this.svgCanvas = new SVGCanvas(this.canvas);
    this.svgCanvas.meanColorOfSquare(10,10);
};
