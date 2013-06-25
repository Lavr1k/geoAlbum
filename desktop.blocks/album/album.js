BEM.DOM.decl('album',{

    onInit: function() {

        var that = this;

        this.gallery = this.findBlockOutside('content').findBlockInside('gallery');
        this.album = this.findBlockInside('album');
        this.spinner = this.findBlockInside('spinner');
        this.url = this.domElem.attr('photos') + '&callback=?&limit=30';

        this._fistRun = true;

        this.getPhotos();

        this.spinner.setMod('visibility', 'visible');
        this.album.setMod('current', 'true');

    },

    getPhotos: function() {

        var that = this;

        $.getJSON(this.url, function(data) {

            if (that._fistRun) {
                that.entries = data.entries;
                that._fistRun = false;
            } else {
                that.entries = $.merge(that.entries, data.entries);
            }

            if(data.links.next) {

                that.url = data.links.next + '&limit=30&callback=?';
                that.getPhotos();

            } else {

                that.spinner.setMod('visibility', 'hidden');

                if (that.entries != 0) {

                    that.gallery.trigger('show', that.entries);

                } else {

                    that.setMod('content', 'empty');
                    that.onEsc();

                }
            }
        });

    },

    onEsc: function() {

        this.gallery.trigger('hide');
        this.album.delMod('current');

    },
},
{
    live: function() {

        this.liveBindTo('click', function() {

            this.onInit();

        });

    }
});