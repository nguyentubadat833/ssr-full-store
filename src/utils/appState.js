export function getPageTitle(route) {
    const {locale} = useI18n()
    return route.meta.title[`${locale.value}`]
}

// export function getPrefixUrlWithLocale(){
//     const {locale, defaultLocale} = useI18n()
//     if (locale.value === defaultLocale){
//
//     }
// }