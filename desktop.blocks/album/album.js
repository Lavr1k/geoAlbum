BEM.DOM.decl('album',{

    _getPhotos: function() {

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

                that._getPhotos();

            } else {
                that.spinner.setMod('visibility', 'hidden');
                if (that.entries != 0) {
                    that.gallery.trigger('show', that.entries)
                } else {
                    that.setMod('content', 'empty');
                    that.onEsc();
                }
            }
        });

    },

    onEsc: function() {
        this.gallery.trigger('hide', this.entries);
        this.album.delMod('current');
    },
},
{
    live: function() {
        this.liveBindTo('click', function() {

            var that = this;

            $(document).keyup(function(e) {
                (e = 27) && that.onEsc();
            });

            this.gallery = this.findBlockOutside('content').findBlockInside('gallery')
            this.album = this.findBlockInside('album');
            this.spinner = this.findBlockInside('spinner');
            this._fistRun = true;

            this.url = this.domElem.attr('photos') + '&callback=?&limit=30' ;
            this._getPhotos();
            this.spinner.setMod('visibility', 'visible');
            this.album.setMod('current', 'true');

        });
    }
});