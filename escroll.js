(function ($) {
    $.fn.extend({
        escroll: function (x, y, z) {
            y = (y === undefined || isNaN(parseInt(y))) ? 2000 : y;
            z = (z === undefined || isNaN(parseInt(z)) || parseInt(z) < 50 || z >= y) ? y / 2 : z;
            x = $.extend({
                _v: 0,
                _l: $(this).children()[0].tagName.toLowerCase(),
                _u: (x === undefined || (x.visible === "auto")) ? true : false,
                _t: (x === undefined || isNaN(parseInt(x.marginTop))) ? 5 : x.marginTop,
                _e: (x === undefined || x.easing === undefined) ? null : x.easing,
                _f: (x === undefined || x.effect === undefined) ? null : x.effect,
                _sf: (x === undefined || x.startEffect === undefined) ? null : x.startEffect,
                _ef: (x === undefined || x.endEffect === undefined) ? null : x.endEffect,
                _es: (x === undefined || x.effectSize === undefined || isNaN(parseInt(x.effectSize))) ? null : x.effectSize,
                _ed: (x === undefined || x.effectDirection === undefined) ? null : x.effectDirection,
                _ep: (x === undefined || x.effectPercent === undefined || isNaN(parseInt(x.effectPercent))) ? 80 : x.effectPercent,
            }, x);
            if (x._u) x._v = $(this).children($(this).children()[0].tagName.toLowerCase()).size()
            else if (isNaN(x.visible) || parseInt(x.visible) > ($(this).children(x._l).size())) x._v = $(this).children($(this).children()[0].tagName.toLowerCase()).size()
            else x._v = x.visible
            if (x._f == null) {
                if (x._sf == null) {
                    if (x._ef == null) x._ef = x._sf = "scale";
                    else x._ef = x._sf;
                }
                else if (x._ef == null) x._ef = x._sf;
            }
            else {
                if (x._ef == null) x._ef = x._f;
                if (x._sf == null) x._sf = x._f;
            }
            if (jQuery.easing[x._e] == undefined) x._e = "easeInOutExpo";
            if (x._sf == "drop" || x._sf == "slide") {
                if (!(x._ed == "left" || x._ed == "right" || x._ed == "up" || x._ed == "down")) if (x._f == "drop") x._ed = "down";
                else x._ed = "up";
            }
            else if (x._sf == "clip" || x._sf == "blind") if (!(x._ed == "horizontal" || x._ed == "vertical")) x._ed = "vertical";
            var a = new Array(),
                b = new Array(),
                t = 0,
                _c = "#" + this.attr("id");
            var m = {
                init: function () {
                    $(_c + " > " + x._l).each(function (i, e) {
                        a[i] = $(e).height();
                        b[i] = $(e).width();
                    });
                    $(_c).css({
                        "position": "absolute",
                        "height": Math.max.apply(Math, a) * x._v,
                        "width": Math.max.apply(Math, b),
                        "overflow": "hidden",
                        "padding-bottom": x._t * x._v
                    });
                    $(_c + " > " + x._l).each(function (i, e) {
                        $(this).css({
                            "height": Math.max.apply(Math, a),
                            "overflow": "hidden",
                            "position": "absolute",
                            "width": Math.max.apply(Math, b),
                            "z-index": Math.max.apply(Math, a) * i + x._t * i,
                            "margin-top": Math.max.apply(Math, a) * i + x._t * i,
                        });
                    });
                    t = setInterval(function () {
                        m.show()
                    }, y);
                },
                add: function (a) {
                    window.clearInterval(t)
                    var b = new Array();
                    $(_c + " > " + x._l).each(function (i, e) {
                        $(e).children("div").children(0).removeAttr("style");
                        b[i] = $(e).html();
                        $(e).remove();
                    });
                    if (x._u) x._v += 1;
                    b[b.length] = a;
                    for (i = 0; i < b.length; i++)
                    $(_c).append("<" + x._l + ">" + b[i] + "</" + x._l + ">");
                    m.init()
                },
                show: function () {
                    $(_c + " > " + x._l).each(function (i, e) {
                        a[i] = Math.ceil(parseInt($(e).css("margin-top").replace("px", "")));
                        $(e).css("z-index", a[i]);
                    });
                    b[0] = a[a.length - 1];
                    for (i = 0; i < a.length; i++) b[i + 1] = a[i];
                    for (i = 0; i < a.length; i++) a[i] = b[i];
                    $(_c + " > " + x._l).each(function (i, e) {
                        if ($(e).css("margin-top") == "0px") {

                            $(e).children().hide(x._sf, {
                                percent: x._ep,
                                direction: x._ed,
                                size: x._es
                            }, z / 2).show(x._ef, {
                                percent: 100,
                                direction: x._ed,
                                size: x._es
                            }, z / 2);
                        }

                        $(e).stop(true, true).animate({
                            "margin-top": a[i] + "px",
                        }, z, x._e, function () {})


                    });
                },
            };
            if ($(this)[0].tagName.toLowerCase() == "ul") {
                this.css({
                    "list-style": "none"
                })
            }
            this.fadeIn(500)
            m.init()
            $(_c + " > " + x._l).hover(function () {
                window.clearInterval(t)
            }, function () {
                t = setInterval(function () {
                    m.show()
                }, y);
            });
            $(window).blur(function () {
                window.clearInterval(t)
            });
            $(window).focus(function () {
                window.clearInterval(t)
                t = setInterval(function () {
                    m.show()
                }, y);
            });
            $.fn.escroll = function (method) {
                if (m[method]) {
                    return m[method].apply(this, Array.prototype.slice.call(arguments, 1));
                }
                else if (typeof method === 'object' || !method) {
                    return m.init.apply(this, arguments);
                }
                else {
                    $.error('Method ' + method + ' does not exist on jQuery.escroll');
                }
            };
        }
    });
})(jQuery);