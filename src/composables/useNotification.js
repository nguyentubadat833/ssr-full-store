const id = ref(0)

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
    const id = ref(0)
    let object = {
        timeout: timeout,
    }
    if (type === 'success') {
        object.id = ++id.value
        object.title = successTitle
        object.icon = successIcon
        object.color = 'green'
    } else if (type === 'error') {
        object.title = errorTitle
        object.icon = errorIcon
        object.color = 'red'
    } else {
        throw new Error('Invalid toast type')
    }
    if (Array.isArray(actions)) {
        object.actions = actions
    }
    if (description) {
        object.description = description
    }
    console.log(object)
    return object
}

function mapCustomToastObject(originalObject, newObject) {
    return useAssignWith(originalObject, newObject, (objValue, srcValue, key) => {
        return originalObject.hasOwnProperty(key) ? srcValue : objValue;
    })
}

export default {
    getToastObject,
    mapCustomToastObject
}