export function errorResponseObject({message, redirect} = {}) {
    return {
        isError: true,
        message: message,
        redirect: redirect
    }
}