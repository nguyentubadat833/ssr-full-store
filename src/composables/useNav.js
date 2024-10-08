import site from "~~/site.js";

export default function () {
    const routes = useRouter().getRoutes()
    const {locale, defaultLocale} = useI18n()
    const getLangCodeArray = computed(() => {
        let result = []
        const locales = site?.i18n?.locales
        if (Array.isArray(locales) && locales.length > 0) {
            locales.forEach(el => {
                result.push(el.code)
            })
        }
        return result
    })

    const navLinksFromRouter = routes
        .filter((route) => route.meta.hidden !== true)
        .filter((route) => {
            if (locale.value === defaultLocale) {
                return !getLangCodeArray.value.some(lang => route.path.startsWith(`/${lang}`));
            } else {
                return route.path.startsWith(`/${locale.value}`);
            }
        })
        .filter(
            (route) => route.name && route.name[0] !== route.name[0].toUpperCase(),
        )
        .filter((route) => !route.path.includes(':'))
        .filter((route) => route.meta.title)
        .filter((route) => route.path !== '/try-now')
        .sort((a, b) =>
            a.meta.navOrder && b.meta.navOrder && +a.meta.navOrder > +b.meta.navOrder
                ? 1
                : -1,
        )
        .map((route) => {
            return {
                text: computed(() => route.meta.title[`${locale.value}`]),
                link: route.meta.name || route.path,
                icon: route.meta.icon,
                type: route.meta.type,
            }
        })

    const navLinksFromConfig = site.nav
    const navLinks = computed(() => navLinksFromConfig || navLinksFromRouter)

    const navLinksPrimary = computed(() => {
        return navLinks.value.filter(
            (navLink) => navLink.type === 'primary',
        )
    })

    const navLinksSecondary = computed(() => {
        return navLinks.value.filter((navLink) => navLink.type === 'secondary')
    })

    return {
        navLinksPrimary,
        navLinksSecondary,
    }
}