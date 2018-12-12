"use strict";

var SVGCanvas = function (canvas) {//besoin de canvas pour accéder au contexte 2D
    // Composition de la classe Canvas
    this.canvas  = canvas;
    this.context = this.canvas.pixelizedContext;

    //tableau qui va contenir tous les carrés du SVG
    this.contentSVGs = [];
    this.drawSVGCanvas();
    $('#resultCanvas').fadeIn(2000);
};

SVGCanvas.prototype.drawSVGCanvas = function() {
    //on balaye tout le canvas, avec un pas de largeur pixelsize
    for (var x = 0; x < Math.round(this.canvas.getCanvasWidth() / pixelsize) * pixelsize-pixelsize; x += pixelsize) {
        for (var y = 0; y < Math.round(this.canvas.getCanvasHeight()  / pixelsize) * pixelsize; y += pixelsize) {
            this.square = this.drawSquareIntoSVG(x, y, pixelsize, this.meanColorOfSquare(x, y));
            this.contentSVGs.push(this.square);
        }
    }
    // on pousse les carrés dans le svg
    document.getElementById("resultCanvas").innerHTML = this.contentSVGs;
};

// Dessine un carré SVG
SVGCanvas.prototype.drawSquareIntoSVG = function (originX, originY, size, color) {
    return ('<rect   x="' + originX + '"  y="' + originY + '"  width="' + size + '"  height="' + size + '"  fill="' + color + '" stroke-width="0"' + " />");
};

// retourne la valeur moyenne d'un carré de coté donné, aux coordonnées meanSquareX, meanSquareY
SVGCanvas.prototype.meanColorOfSquare = function (currentX, currentY) {
    var pixel;
    var data;
    this.rgba = { //on n'utilise pas le alpha
        red:   0,
        green: 0,
        blue:  0
    };
    for (var offset = 0; offset < pixelsize * pixelsize; ++offset) { //incrément des 4 paramètres de imageData
        pixel = this.canvas.getPixelData(offset + currentX, offset + currentY, 1, 1);
        //datas sommes cumulées des couleurs du point currentX, currentY
        data = pixel.data;
        /*somme couleur du pixel couleur rouge*/
        this.rgba.red   += data[0];
        /*somme couleur du pixel couleur vert*/
        this.rgba.green += data[1];
        /*somme couleur du pixel couleur bleu*/
        this.rgba.blue  += data[2];
    }
    //on calcule les moyennes
    this.rgba.red   /= pixelsize;
    this.rgba.green /= pixelsize;
    this.rgba.blue  /= pixelsize;
    this.rgba.red   = parseInt(this.rgba.red   / pixelsize);
    this.rgba.green = parseInt(this.rgba.green / pixelsize);
    this.rgba.blue  = parseInt(this.rgba.blue  / pixelsize);

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