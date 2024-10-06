// function getToastObject({
//                             type = 'success',
//                             successTitle = 'Success',
//                             errorTitle = 'Error',
//                             successIcon = 'i-heroicons-check-circle',
//                             errorIcon = 'i-heroicons-x-circle-20-solid',
//                             description,
//                             timeout = 2000,
//                             actions,
//                         } = {}) {
//     let object = {
//         timeout: timeout,
//     }
//     if (type === 'success') {
//         object.title = successTitle
//         object.icon = successIcon
//         object.color = 'green'
//     } else if (type === 'error') {
//         object.title = errorTitle
//         object.icon = errorIcon
//         object.color = 'red'
//     } else {
//         throw new Error('Invalid toast type')
//     }
//     if (Array.isArray(actions)) {
//         object.actions = actions
//     }
//     if (description) {
//         object.description = description
//     }
//     return object
// }
//
// function mapCustomToastObject(originalObject, newObject) {
//     return useAssignWith(originalObject, newObject, (objValue, srcValue, key) => {
//         return originalObject.hasOwnProperty(key) ? srcValue : objValue;
//     })
// }

export default async function ({
                                   endpoint = '',
                                   method = 'GET',
                                   params,
                                   body,
                                   isShowSuccessMessage = true,
                                   isShowErrorMessage = true,
                                   isUseDefaultProcessOnResponse = true,
                                   customProcessOnResponse,
                                   callbackMethodOnSuccess,
                                   callbackMethodOnError,
                                   requestOptionsCustom,
                                   toastSuccessObjectCustom,
                                   toastErrorObjectCustom
                               } = {}) {
    let result
    const toast = useToast()
    const {getToastObject, mapCustomToastObject} = useNotification
    if (!endpoint) {
        throw new Error('Endpoint is required')
    }

    const requestOptions = () => {
        const result = {}
        result.method = method
        // result.headers = headers
        if (isObject(params)) {
            result.params = params
        }
        if (isObject(body)) {
            result.body = body
        }
        return result
    }

    await $fetch(endpoint, {
        ...requestOptions(),
        onRequest({options}) {
            if (isFunction(requestOptionsCustom)) {
                requestOptionsCustom(options)
            }
        },
        onResponse({response, request}) {
            if (isUseDefaultProcessOnResponse) {
                if (response.ok === true) {
                    result = response._data
                    if (isFunction(callbackMethodOnSuccess)) {
                        callbackMethodOnSuccess()
                    }
                    if (isShowSuccessMessage) {
                        let toastObject = getToastObject({
                            type: 'success',
                            description: response?.statusText
                        })
                        if (isObject(toastSuccessObjectCustom)) {
                            toastObject = mapCustomToastObject(toastObject, toastSuccessObjectCustom)
                            console.log(toastObject)
                        }
                        toast.add(toastObject)
                    }
                } else {
                    if (isFunction(callbackMethodOnError)) {
                        callbackMethodOnError()
                    }
                    if (isShowErrorMessage && response?._data?.isError) {
                        let toastObject = getToastObject({
                            type: 'error',
                            description: response?._data?.message
                        })
                        if (isObject(toastErrorObjectCustom)) {
                            toastObject = mapCustomToastObject(toastObject, toastErrorObjectCustom)
                        }
                        toast.add(toastObject)
                    }
                }
            } else {
                if (isFunction(customProcessOnResponse)) {
                    customProcessOnResponse(response)
                }
            }

        }
    })
    return result ? result : null

}