BEM.DOM.decl('map',{

    onSetMod: {
        js: function() {
            var that = this;

            this.on('drawMap', this.drawMap);

            $(window).on('resize', function() {
                that._onResize();
            });
        }
    },

    drawMap: function(e, params) {
        var that = this,
            myMap;

        this.geo = {
            latitude: params.geo.split(' ')[0],
            longitude: params.geo.split(' ')[1]
        };
        this.description = params.description;

        ymaps.ready(function() {
            myMap = new ymaps.Map('map', {
                // Центр карты
                center: [that.geo.latitude, that.geo.longitude],
                // Коэффициент масштабирования
                zoom: 15,
                // Тип карты
                type: 'yandex#map'
            });
            that.setMod('visibility', 'visible');
            that._onResize();
        });

        myMap.balloon.open(
            // Координаты балуна
            [that.geo.latitude, that.geo.longitude],
            {
                /* Свойства балуна:
                   - контент балуна */
                content: that.description
            }, {
                /* Опции балуна:
                   - балун имеет копку закрытия */
                closeButton: true
            }
        );

        myMap.controls
            .add("mapTools")
            .add("zoomControl")
            .add("typeSelector");

        this.findElem('destruct').on('click', function() {
            that.findBlockInside('ymaps-map').domElem.remove();
            that.delMod('visibility');
        });
    },

    _onResize: function() {
        this.findElem('map-content').css({
            height: window.innerHeight + 'px',
            width: window.innerWidth + 'px'
        });
    }
})