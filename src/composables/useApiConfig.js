function getToastObject({
                            type = 'success',
                            successTitle = 'Success',
                            errorTitle = 'Error',
                            successIcon = 'i-heroicons-check-circle',
                            errorIcon = 'i-heroicons-x-circle-20-solid',
                            description,
                            timeout = 2000,
                            actions,
                        } = {}) {
    let object = {
        timeout: timeout,
    }
    if (type === 'success') {
        object.title = successTitle
        object.icon = successIcon
    } else if (type === 'error') {
        object.title = errorTitle
        object.icon = errorIcon
    } else {
        throw new Error('Invalid toast type')
    }
    if (Array.isArray(actions)) {
        object.actions = actions
    }
    if (description) {
        object.description = description
    }
    return object
}

function mapCustomToastObject(originalObject, newObject) {
    return useAssignWith(originalObject, newObject, (objValue, srcValue, key) => {
        return originalObject.hasOwnProperty(key) ? srcValue : objValue;
    })
}

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
    const toast = useToast()
    if (!endpoint) {
        throw new Error('Endpoint is required')
    }
    return await $fetch(endpoint, {
        onRequest({options}) {
            options.method = method
            if (params) {
                options.params = params
            }
            if (isObject(body)) {
                options.body = body
                console.log(options.body)
            }
            if (isFunction(requestOptionsCustom)) {
                requestOptionsCustom(options)
            }
        },
        onResponse({response}) {
            console.log(response)
            if (isUseDefaultProcessOnResponse) {
                if (response.ok === true) {
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
                    if (isShowErrorMessage) {
                        let toastObject = getToastObject({
                            type: 'error',
                            description: response?.statusText
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

}