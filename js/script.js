"use strict";

var pixelsize = 4; //pixellisation initiale par carré de PxP

//on attend que le DOM soit chargé avant de lancer le programme
$(function () {
    this.canvas = new Canvas();
    this.pixelizedCanvas = new PixelizedCanvas(this.canvas);
});
