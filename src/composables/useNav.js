import site from "~~/site.js";

export default function () {
    const routes = useRouter().getRoutes()

    const navLinksFromRouter = routes
        .filter((route) => route.meta.hidden !== true)
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
                text: route.meta.title,
                link: route.meta.name || route.path,
                icon: route.meta.icon,
                type: route.meta.type,
            }
        })

    const navLinksFromConfig = site.nav
    const navLinks = computed(() => navLinksFromConfig || navLinksFromRouter)

    const navLinksPrimary = computed(() => {
        return navLinks.value.filter(
            (navLink) => !navLink.type || navLink.type === 'primary',
        )
    })

    const navLinksSecondary = computed(() => {
        return navLinks.value.filter((navLink) => navLink.type === 'secondary')
    })

    return{
        navLinksPrimary,
        navLinksSecondary,
    }
}