BEM.DOM.decl('gallery', {
    onSetMod: {
        js: function() {
            this.hasContent = false;

            this.on({
                show: this.show,
                hide: this.hide
            });

        }
    },

    drawPhoto: function() {
        var content = [],
            that = this;
        console.log( this.entries );

            content = this.entries.map(function(item) {
                return {
                    block: 'gallery',
                    elem: 'photo',
                    content: [
                        {
                            elem: 'photo-cover',
                            tag: 'img',
                            attrs: {
                                src: item.img.S.href,
                                full: that.getSize(item.img).href
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
        var that = this;

        this.bindTo(this.findElem('photo'), 'click', function(e) {
            var target = $(e.target)
            console.log( target.offset() );
            console.log( target.width() );
            console.log( target.height() );
            console.log( target.attr('full') );

            that.findElem('full-photo-image').attr('src', target.attr('full'));
            that.findElem('full-photo').setMod('visibility', 'visible');
        })
    },

    unbindPhoto: function() {
        this.unbindFrom('photo', 'click')
    },

    clearContent: function() {
        this.hasContent = false;
        this.domElem.html('');
    },

    show: function(e, data) {
        this.hasContent && this.clearContent();
        this.setMod('visibility', 'visible');
        this.entries =  data;
        this.drawPhoto();
    },

    hide: function() {
        this.setMod('visibility', 'hidden');
        // this.unbindFrom();
    }
})