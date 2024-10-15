async function data() {
    return await useApiConfig({
        endpoint: '/api/po/select',
        params: {
            selectType: 'selectMany'
        },
        isShowSuccessMessage: false
    })
}

async function findByCode(code) {
    return await useApiConfig({
        endpoint: '/api/po/select',
        params: {
            selectType: 'selectByCode',
            purchaseOrderCode: code
        }
    })
}

async function create(data) {
    return await useApiConfig({
        endpoint: '/api/po/create',
        method: 'POST',
        body: data
    })
}

async function update(data) {
    return await useApiConfig({
        endpoint: '/api/po/update',
        method: 'PUT',
        body: data
    })
}

async function save(data) {
    if (data.code) {
        return await update(data)
    } else {
        return await create(data)
    }
}

async function del({code, callback}) {
    await useApiConfig({
        endpoint: '/api/po/delete',
        method: 'DELETE',
        params: {
            code: code
        },
        callbackMethodOnSuccess: () => callback()
    })
}

export default {
    data,
    create,
    update,
    save,
    findByCode,
    del
}