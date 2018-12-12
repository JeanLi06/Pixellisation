"use strict";

var SliderPixel = function () {
    $(function () {
        var handle = $("#custom-handle");
        $("#slider").slider({
            step: 5,
            min: 5,
            max: 30,
            // change: redrawPixelizedCanvas,
            create: function () {
                handle.text($(this).slider("value"));
            },
            slide: function (event, ui) {
                handle.text(ui.value);
                //redrawPixelizedCanvas( ui.value );
            }
        });
    });
};
