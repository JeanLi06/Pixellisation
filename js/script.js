"use strict";
// Le programme principal
var pixelSize = 4; //pixellisation initiale par carré de PxP

//on attend que le DOM soit chargé avant d'afficher le canvas
$(function () {
    this.canvas = new Canvas();
    this.pixelizedCanvas = new PixelizedCanvas(this.canvas);
});
