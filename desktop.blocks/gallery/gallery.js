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
                    that.findBlockOutside('content').findBlockInside('album').delMod('current');
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

        console.log( this.fullPhoto );

        this.isPhotoShowed = true;

        BEM.DOM.append(this.photoInner,
            BEMHTML.apply({
                block: 'gallery',
                elem: 'full-photo-image',
                tag: 'img'
            })
        );

        this.fullImage = this.findElem('full-photo-image');

        this.setMod(this.fullPhoto, 'visibility', 'visible');
        this.spinner.setMod('visibility', 'visible');

        this.fullPhoto
            .css({
                '-webkit-transition': 'none',
                left: target.offset().left + 'px',
                top: target.offset().top + 'px',
                height: target.height() + 'px',
                width: target.width() + 'px'
            });
        // анимируем
        this.fullPhoto
            .css({
                width: '100%',
                height: '100%',
                top: 0,
                left: 0,
                'background-color': 'rgba(255,255,255,.8)',
                '-webkit-transform': 'translatez(0)',
                '-webkit-transition': 'all .3s ease-out'
            })
            .one('webkitTransitionEnd', function() {
                that.fullPhoto.css({
                    '-webkit-transition': 'none'
                });

                that._onResize();

                // Выставление картики
                that.fullImage
                    .attr('src', target.attr('data-full-image'))
                    .on('load', function() {
                        setTimeout(function() {
                            that.setMod(that.fullImage, 'visibility', 'visible');
                            that.spinner.setMod('visibility', 'hidden');
                        }, 300);
                    });

            });
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
            console.log( 'gallery' );
            this.setMod('visibility', 'hidden');
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