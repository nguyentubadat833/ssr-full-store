export default defineNuxtRouteMiddleware((to, from) => {
    const {data: authData} = useAuth()
    if (to?.meta?.requireAuth === true && !authData.value) {
        return abortNavigation('Page not found')
    }
})