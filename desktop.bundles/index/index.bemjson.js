({
    block: 'b-page',
    title: 'Title of the page',
    favicon: '/favicon.ico',
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
                'header content goes here'
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
                    block: 'albums',
                    js: true
                },
                {
                    block: 'gallery',
                    js: true,
                    mods: { visibility: 'hidden' },
                    content: {
                        elem: 'full-photo',
                        content: {
                            elem: 'full-photo-image',
                            tag: 'img'
                        }
                    }
                }
            ]
        },
        {
            block: 'footer',
            content: [
                'footer content goes here'
            ]
        },
        { block: 'i-jquery', mods: { version: '1.8.3' } },
        { elem: 'js', url: '_index.js' }
    ]
})
