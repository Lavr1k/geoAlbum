({
    block: 'b-page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    js: true,
    head: [
        { elem: 'js', url: '_index.bemhtml.js' },
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'css', url: '_index', ie: true },
        { elem: 'meta', attrs: { name: 'description', content: '' }},
        { elem: 'meta', attrs: { name: 'keywords', content: '' }}
    ],
    content:[
        {
            block: 'header',
            content: [
            ]
        },
        {
            block: 'content',
            js: true,
            content: [
                {
                    block: 'greeting',
                    content: [
                        {
                            elem: 'description',
                            content: 'Web application that uses api Yandex.Maps and Yandex.Fotki. When you add a new photo gives the ability to add geolocation information in the description of the photos and uploads it to a service Yandex.Fotki.'
                        },
                        {
                            elem: 'link',
                            url: 'https://oauth.yandex.ru/authorize?response_type=token&client_id=ccf89551e6de48b387b09583cd354453&state=accessed',
                            content: 'Начать'
                        }
                    ]
                },
                {
                    block: 'albums'
                },
                {
                    block: 'gallery',
                    js: true,
                    mods: { visibility: 'hidden' },
                    content: {
                        elem: 'full-photo',
                        content: [
                            {
                                block: 'spinner',
                                mods: {
                                    visibility: 'hidden',
                                    theme: 'blue'
                                }
                            },
                            {
                                elem: 'full-photo-inner'
                            },
                            {
                                block: 'map',
                                content: [
                                    {
                                        elem: 'inner',
                                        content: {
                                            elem: 'map-content'
                                        }
                                    },
                                    {
                                        elem: 'destruct',
                                        content: 'Удалить карту'
                                    }
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        {
            block: 'footer',
            content: [
            ]
        },
        { block: 'i-jquery', mods: { version: '1.8.3' } },
        { elem: 'js', url: '_index.js' },
        { elem: 'js', url: '../../desktop.blocks/i-exif/i-exif.js' },
        { elem: 'js', url: 'http://api-maps.yandex.ru/2.0/?load=package.standard&mode=debug&lang=ru-RU' }
    ]
})
