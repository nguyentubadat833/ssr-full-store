export function getPageTitle(route) {
    const {locale} = useI18n()
    return route.meta.title[`${locale.value}`]
}