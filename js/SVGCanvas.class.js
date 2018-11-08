"use strict";

var SVGCanvas = function (canvas) {//besoin de canvas pour accéder au contexte 2D
    // Composition de la classe Canvas
    this.canvas  = canvas;
    this.context = this.canvas.context;

    //tableau qui va contenir tous les carrés du SVG
    this.contentSVGs = [];
    this.drawSVGCanvas();
    $('#resultCanvas').fadeIn(2000);
};

SVGCanvas.prototype.drawSVGCanvas = function() {
    //on balaye tout le canvas, avec un pas de largeur PIXELSIZE
    for (var x = 0; x < this.canvas.getCanvasWidth(); x = x + PIXELSIZE) {
        for (var y = 0; y < this.canvas.getCanvasHeight(); y = y + PIXELSIZE) {
            this.square = this.drawSquareIntoSVG(x, y, PIXELSIZE, this.meanColorOfSquare(x, y));
            this.contentSVGs.push(this.square);
        }
    }
    // on pousse les carrés dans le svg
    document.getElementById("resultCanvas").innerHTML = this.contentSVGs;
};

// Dessine un carré SVG
SVGCanvas.prototype.drawSquareIntoSVG = function (originX, originY, size, color) {
    return ('<rect   x="' + originX + '"  y="' + originY + '"  width="' + size + '"  height="' + size + '"  fill="' + color + '" border="none"' + " />");
};

// retourne la valeur moyenne d'un carré de coté donné, aux coordonnées meanSquareX, meanSquareY
SVGCanvas.prototype.meanColorOfSquare = function (currentX, currentY) {
    this.PIXELSQUARE = PIXELSIZE * PIXELSIZE;
    var pixel;
    var data;
    this.rgba = { //on n'utilise pas le alpha
        red:   0,
        green: 0,
        blue:  0
    };

    for (var offset = 0; offset < PIXELSIZE * PIXELSIZE; offset++) { //incrément des 4 paramètres de imageData
        pixel = this.canvas.getPixelData(offset + currentX, offset + currentY, 1, 1);

        //datas sommes cumulées des couleurs du point currentX, currentY
        data = pixel.data;
        this.rgba.red   += data[0];
        /*somme couleur du pixel couleur rouge*/
        this.rgba.green += data[1]; //effet spécial en modifiant + => *
        /* somme couleur du pixel couleur rouge*/
        this.rgba.blue  += data[2];
        /* somme couleur du pixel couleur rouge*/
    }
    //on calcule les moyennes
    this.rgba.red   /= PIXELSIZE;
    this.rgba.green /= PIXELSIZE;
    this.rgba.blue  /= PIXELSIZE;

    this.rgba.red   = parseInt(this.rgba.red   / 5);
    this.rgba.green = parseInt(this.rgba.green / 5);
    this.rgba.blue  = parseInt(this.rgba.blue  / 5);

    return (this.convertRgbToHex(this.rgba.red, this.rgba.green, this.rgba.blue));
};

SVGCanvas.prototype.convertRgbToHex = function (r, g, b) {
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