BEM.DOM.decl('gallery', {
    onSetMod: {
        js: function() {
            var that = this;

            // для проверки наличия контента и геолокационных данны
            this.hasContent = false;
            this.hasGeoData = false;

            this.on({
                show: this.show,
                hide: this.hide
            });

            $(document).on('keyup', function(e) {
                if (e.keyCode == 27) {
                    that.hide();
                }
            });

            $(window).on('resize', function() {
                that._onResize();
            });
        }
    },

    drawPhoto: function() {

        var content = [],
            that = this;

        this.findElem('title').html(
            'Альбом ' + this.findBlockOutside('content')
                .findBlockInside({ block: 'album', modName: 'current', modVal: 'true'})
                .findElem('cover')
                .attr('data-title')
        );

        console.log( {
            block: 'gallery',
            elem: 'title',
            content: 'Альбом ' + this.findBlockOutside('content')
                .findBlockInside({ block: 'album', modName: 'current', modVal: 'true'})
                .findElem('cover')
                .attr('data-title')
        } );

        console.log( this.entries );

        content = this.entries.map(function(item) {

            var image = that.getSize(item.img),
                geo = item.geo ? item.geo.coordinates : false;

            return {
                block: 'gallery',
                elem: 'photo',
                content: [
                    {
                        elem: 'photo-cover',
                        attrs: {
                            style: 'background-image: url(' + item.img.M.href + ')',
                            'data-full-image': image.href,
                            'data-geo': geo ? geo : '',
                            'data-description': item.title
                        }
                    },
                    {
                        block: 'spinner',
                        mods: { visibility: 'hidden' }
                    },
                    {
                        elem: 'description',
                        content: item.title
                    }
                ]
            };
        });


        BEM.DOM.append(this.domElem,
            BEMHTML.apply(content)
        );

        this.bindPhoto();

        this.hasContent = true;
    },

    getSize: function(img) {
        var sizes = ['XXXS', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'orig'],
            result;

        for (var i = sizes.length - 1; i >= 0; i--) {

            if (img[sizes[i]]) {
                return (result = img[sizes[i]]);
            }

        }
    },

    bindPhoto: function() {

        this.bindTo(this.findElem('photo'), 'click', this.showPhoto);

    },

    unbindPhoto: function() {
        this.unbindFrom(this.findElem('photo'), 'click');
        console.log( 'unbindFrom' );
    },

    showPhoto: function(e) {

        var that = this,
            target = $(e.target),
            geo = target.attr('data-geo') ? target.attr('data-geo') : false ;

        geo && (this.hasGeoData = true);

        this.fullPhoto = this.findElem('full-photo');
        this.spinner = this.findBlockInside('spinner');
        this.photoInner = this.findElem('full-photo-inner');

        this.isPhotoShowed = true;

        BEM.DOM.append(this.photoInner,
            BEMHTML.apply([
                {
                    block: 'gallery',
                    elem: 'full-photo-image',
                    tag: 'img',
                    attrs: {
                        exif: 'true',
                        src: target.attr('data-full-image')
                    }
                },
                geo && {
                    block: 'gallery',
                    elem: 'geo-button',
                    content: 'Показать на карте'
                }
            ])
        );

        this.findElem('geo-button').on('click', function() {

            var params = {
                geo: geo,
                description: target.attr('data-description')
            };

            that.drawMap(params);

        });

        this.fullImage = this.findElem('full-photo-image');

        this.setMod(this.fullPhoto, 'visibility', 'visible');
        this.spinner.setMod('visibility', 'visible');

        this.fullPhoto.css({
            left: target.offset().left + 'px',
            top: target.offset().top + 'px',
            height: target.height() + 'px',
            width: target.width() + 'px'
        });

        // анимируем
        // setTimeout для решения для асинхронности задания свойств
        setTimeout(function() {

            that.fullPhoto.css({
                'background-color': 'rgba(255,255,255,.8)',
                '-webkit-transform': 'translateZ(0)',
                '-webkit-transition': 'height, width, opacity, .3s ease-out'
            });

        }, 0);

        setTimeout(function() {

            that.fullPhoto.css({
                height: window.innerHeight + 'px',
                width: window.innerWidth + 'px',
                top: 0,
                left: 0
            });

        }, 0);

        that.fullPhoto.one('webkitTransitionEnd', function() {

            that.fullPhoto.css({
                '-webkit-transition': 'none',
                width: '100%',
                height: '100%'
            });

            that._onResize();

            // Выставление картики
            that.fullImage[0].complete
                ? that.onImageLoad()
                : that.fullImage.on('load', function() {
                    that.onImageLoad();
                });

        });
    },

    drawMap: function(params) {

        this.findBlockInside('map').trigger('drawMap', params);

    },

    onImageLoad: function() {

        var that = this;
        setTimeout(function() {

            that.hasGeoData && that.setMod(that.findElem('geo-button'), 'visibility', 'visible');
            that.setMod(that.fullImage, 'visibility', 'visible');
            that.spinner.setMod('visibility', 'hidden');

        }, 300);

    },

    clearContent: function() {

        this.hasContent = false;
        this.findElem('photo').remove();

    },

    show: function(e, data) {

        this.hasContent && this.clearContent();
        this.setMod('visibility', 'visible');

        this.entries = data;

        this.drawPhoto();

    },

    hide: function() {

        if (this.isPhotoShowed) {

            this.hasGeoData && this.findElem('geo-button').remove();
            this.setMod(this.fullPhoto, 'visibility', 'hidden');
            this.delMod(this.fullImage, 'visibility');

            this.isPhotoShowed = false;
            this.hasGeoData = false;
            this.fullImage.remove();

        } else {

            this.setMod('visibility', 'hidden');
            this.findBlockOutside('content')
                .findBlockInside({ block: 'album', modName: 'current', modVal: 'true'} )
                .delMod('current');

            this.unbindPhoto();

        }
    },

    _onResize: function() {

        this.findElem('full-photo-inner').css({

            height: window.innerHeight + 'px',
            width: window.innerWidth + 'px'

        });

    }
})