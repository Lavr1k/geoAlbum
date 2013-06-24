BEM.DOM.decl('content', {
    onSetMod: {
        js: function() {

            this.params.username = 'aig1001';    // Заглушка пока не приходят параметры
            this.params.username && this.getAlbums();

            location.href.split('#')[1] && this.parseParams();

            this.params.access_token && this.getUserInfo();

            this.params.state == 'accessed' && this.findBlockInside('greeting').setMod('visibility','hidden');

            console.log( this.params );

        }
    },

    parseParams: function() {

        var get = location.href.split('#')[1].split('&') ;

        for (var i = get.length - 1; i >= 0; i--) {

            var paramName = get[i].split('=')[0],
                paramVal = get[i].split('=')[1];

            this.params[paramName] = paramVal;

        };

    },

    getUserInfo: function() {
        var url = 'https://login.yandex.ru/info?format=json&oauth_token='
            + this.params.access_token
            + '&callback=?';

        $.getJSON(url,
            function(data) {
                console.log( data );
            }
        );

    },

    getAlbums: function() {
        var that = this,
            url = 'http://api-fotki.yandex.ru/api/users/'
                + this.params.username
                + '/albums/?format=json&callback=?';

        $.getJSON(url, function(data) {
            that.albums = data;
            that.drawAlbums();
        });
    },

    drawAlbums: function() {

        var content = [];

        for(key in this.albums.entries) {
            var album = this.albums.entries[key];

            content.push(
                {
                    block: 'album',
                    js: true,
                    attrs: {
                        photos: album.links.photos
                    },
                    content: {
                        elem: 'inner',
                        content: [
                            {
                                elem: 'cover',
                                tag: 'img',
                                attrs: {
                                    src: album.img.S.href,
                                }
                            },
                            {
                                block: 'spinner',
                                mods: { visibility: 'hidden' }
                            }
                        ]
                    }
                }
            );

        }

        BEM.DOM.append(
            this.findBlockInside('albums').domElem,
            BEMHTML.apply(content)
        );

    }
});