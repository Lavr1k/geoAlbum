({
    block: 'b-page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
    js: true,
    head: [
        { elem: 'js', url: '_index.bemhtml.js' },
        { elem: 'css', url: '_index.css', ie: false },
        { elem: 'css', url: '_index', ie: true },
        { elem: 'meta', attrs: { name: 'description', content: 'Геоальбом' }},
        { elem: 'meta', attrs: { name: 'keywords', content: 'Геоальбом' }}
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
                            content: 'Web-приложение позволяющее пользователю просматривать альбомы и фотографии, добавленные на сервис Яндекс.Фотки. Фотографии, содержащие геолокационные данные, можно просмотреть на карте.'
                        },
                        {
                            elem: 'link',
                            content: {
                                elem: 'button',
                                url: 'https://oauth.yandex.ru/authorize?response_type=token&client_id=ccf89551e6de48b387b09583cd354453&state=accessed',
                                content: 'Начать'
                            }
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
                    content: [
                        {
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
                                            content: 'Закрыть карту'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            elem: 'title',
                        }
                    ]
                }
            ]
        },
        {
            block: 'footer',
            content: [
                {
                    elem: 'description',
                    content: 'Web-приложение для просмотра фотографий с использованием API.Yandex.Fotki'
                },
                {
                    elem: 'copyright',
                    content: '&copy; Lavrik'
                }
            ]
        },
        { block: 'i-jquery', mods: { version: '1.8.3' } },
        { elem: 'js', url: '_index.js' },
        { elem: 'js', url: '../../desktop.blocks/i-exif/i-exif.js' },
        { elem: 'js', url: 'http://api-maps.yandex.ru/2.0/?load=package.standard&mode=debug&lang=ru-RU' }
    ]
})
