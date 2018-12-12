"use strict";

var PixelizedCanvas = function (canvas) {
    // Composition de la classe Canvas
    this.canvas = canvas;
    this.context = this.canvas.context;

    this.canvasResult = document.getElementById('pixelizedCanvas');
    this.pixelizedContext = this.canvasResult.getContext('2d');

    this.drawPixelizedCanvas();

    //ajout de l'écouteur d'évènement
    document.getElementById('slider').addEventListener('mouseup', function () {
        // $('#slider').on('mouseup', function (){
        //on redessine
        this.drawPixelizedCanvas();
    }.bind(this));

    // this.eventSliderChange();
    this.sliderPixel();
};

//gestion du changement du slider
PixelizedCanvas.prototype.eventSliderChange = function () {
    document.getElementById('slider').addEventListener('mouseup', function () {
        // $('#slider').on('mouseup', function (){
        //on redessine
        this.drawPixelizedCanvas();
    })
};

PixelizedCanvas.prototype.drawSquare = function (xCoord, yCoord, color) { //dessine aux coordonnées x,y un carré de taille pixelsize
    $(this.canvasResult).drawRect({                               // (0 = coin supérieur gauche)
        fillStyle: color,
        x: xCoord, y: yCoord,
        width: pixelsize,
        height: pixelsize,
        fromCenter: false
    });
};

//Copie de la méthode de SVGCanvas TODO: à modifier d'emplacement
PixelizedCanvas.prototype.convertRgbToHex = function (r, g, b) {
    this.rHex = r.toString(16);
    this.gHex = g.toString(16);
    this.bHex = b.toString(16);
    //ajout d'un zero en début de chaine, si <=15
    if (r <= 15)
        this.rHex = '0' + this.rHex;
    if (g <= 15)
        this.gHex = '0' + this.gHex;
    if (b <= 15)
        this.bHex = '0' + this.bHex;
    return '#' + this.rHex + this.gHex + this.bHex;
};

PixelizedCanvas.prototype.drawPixelizedCanvas = function () {
    //on balaye tout le canvas, avec un pas de largeur pixelsize
    var colorObject, color;
    for (var x = 0; x < Math.round(this.canvas.getCanvasWidth() / pixelsize) * pixelsize; x += pixelsize) {
        for (var y = 0; y < Math.round(this.canvas.getCanvasHeight() / pixelsize) * pixelsize; y += pixelsize) {
            // this.square = this.drawSquare(x, y, pixelsize, this.meanColorOfSquare(x, y));
            colorObject = (this.canvas.getPixelData(x, y, 1, 1));
            color = this.convertRgbToHex(colorObject.data[0], colorObject.data[1], colorObject.data[2]);
            this.drawSquare(x, y, color);
        }
    }
};

//installe le slider jQuery UI
PixelizedCanvas.prototype.sliderPixel = function () {
    var handle = $("#custom-handle");
    $("#slider").slider({
        step: 5,
        min: 5,
        max: 20,
        // change: redrawPixelizedCanvas,
        create: function () {
            handle.text($(this).slider("value"));
        },
        // Si changement, on change les valeurs et on redessine
        slide: function (event, ui) {
            handle.text(ui.value);
        },
        stop: function (event, ui) {
            pixelsize = ui.value;
        }
    });
};
