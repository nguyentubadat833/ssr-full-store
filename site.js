export default {
    name: 'Fun store',
    description: 'This is a store management project',
    author: 'IC Production',
    i18n: {
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                name: 'English',
                language: 'en-US',
                file: 'en.js'
            }, {
                code: 'vi',
                name: 'Tiếng Việt',
                language: 'vi-VN',
                file: 'vi.js'
            }
        ],
        pages: {
            // 'auth-signIn': {
            //     vi: '/dang-nhap',
            //     en: '/signIn'
            // },
            // about: {
            //     vi: '/ve-chung-toi',
            //     en: '/about'
            // },
            // contact: {
            //     vi: '/lien-he',
            //     en: '/contact'
            // }
        }
    },
    // nav: [
    //     {text: 'Home', link: '/'},
    //     {text: 'About', link: '/about'},
    //     {text: 'Products', link: '/products'},
    //     {text: 'Cart', link: '/shopping/cart'},
    //     {text: 'History', link: '/shopping/history'},
    //     {text: 'Payment', link: '/shopping/payment'}
    // ]
}