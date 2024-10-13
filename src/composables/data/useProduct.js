async function data() {
    return await useApiConfig({
        endpoint: '/api/product/select',
        params: {
            selectType: 'selectMany'
        },
        isShowSuccessMessage: false
    })
}

async function findByCode(code) {
    return await useApiConfig({
        endpoint: '/api/product/select',
        params: {
            selectType: 'selectByCode',
            productCode: code
        }
    })
}

async function create(data) {
    return await useApiConfig({
        endpoint: '/api/product/create',
        method: 'POST',
        body: data
    })
}

async function del({code, callback}) {
    await useApiConfig({
        endpoint: '/api/product/delete',
        method: 'DELETE',
        params: {
            code: code
        },
        callbackMethodOnSuccess: () => callback()
    })
}

export default {
    data,
    findByCode,
    create,
    del
}