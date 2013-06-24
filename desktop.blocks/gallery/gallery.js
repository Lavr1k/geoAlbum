BEM.DOM.decl('gallery', {
    onSetMod: {
        js: function() {
            var that = this;

            this.hasContent = false;

            this.on({
                show: this.show,
                hide: this.hide
            });

            console.log( 'init' );

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
        console.log( this.entries );

            content = this.entries.map(function(item) {
                var image = that.getSize(item.img);
                return {
                    block: 'gallery',
                    elem: 'photo',
                    content: [
                        {
                            elem: 'photo-cover',
                            tag: 'img',
                            attrs: {
                                src: item.img.S.href,
                                'data-full-image': image.href,
                                'data-full-width': image.width,
                                'data-full-height': image.height
                            }
                        },
                        {
                            block: 'spinner',
                            mods: { visibility: 'hidden' }
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
        var sizes = ['L', 'M', 'S', 'XL', 'XS', 'XXL', 'XXS', 'XXXL', 'XXXS', 'orig'],
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
            target = $(e.target);

        this.fullPhoto = this.findElem('full-photo');
        this.spinner = this.findBlockInside('spinner');
        this.photoInner = this.findElem('full-photo-inner');

        console.log( target );

        this.isPhotoShowed = true;

        BEM.DOM.append(this.photoInner,
            BEMHTML.apply({
                block: 'gallery',
                elem: 'full-photo-image',
                tag: 'img',
                attrs: {
                    exif: 'true',
                    src: target.attr('data-full-image')
                }
            })
        );

        this.fullImage = this.findElem('full-photo-image');

        this.setMod(this.fullPhoto, 'visibility', 'visible');
        this.spinner.setMod('visibility', 'visible');

        var cl = {
            left: target.offset().left + 'px',
            top: target.offset().top + 'px',
            height: target.height() + 'px',
            width: target.width() + 'px'
        };

        console.log(cl);

        this.fullPhoto
            .css({
                left: target.offset().left + 'px',
                top: target.offset().top + 'px',
                height: target.height() + 'px',
                width: target.width() + 'px'
            });

        // анимируем
        setTimeout(function() {
            that.fullPhoto.css({
                'background-color': 'rgba(255,255,255,.8)',
                '-webkit-transform': 'translatez(0)',
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
            console.log( 'translatez' );

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

    onImageLoad: function() {
        var that = this;
        setTimeout(function() {
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
        this.entries =  data;
        this.drawPhoto();
    },

    hide: function() {
        console.log( 'hided' );
        if (this.isPhotoShowed) {
            console.log( 'photo ' + this.isPhotoShowed);
            this.setMod(this.fullPhoto, 'visibility', 'hidden');
            this.delMod(this.fullImage, 'visibility');
            this.isPhotoShowed = false;
            this.fullImage.remove();
        } else {
            console.log( this.findBlockOutside('content').findBlockInside('album') );
            this.setMod('visibility', 'hidden');
            this.findBlockOutside('content').findBlockInside({ block: 'album', modName: 'current', modVal: 'true'} ).delMod('current');
            this.unbindPhoto();
        }
    },

    _onResize: function() {
        this.findElem('full-photo-inner').css({
            height: window.innerHeight + 'px',
            width: window.innerWidth + 'px'
        });
        console.log( 'resize' );
    }
})