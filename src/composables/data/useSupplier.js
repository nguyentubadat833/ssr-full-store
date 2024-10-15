async function data() {
    return await useApiConfig({
        endpoint: '/api/supplier/select',
        params: {
            selectType: 'selectMany'
        },
        isShowSuccessMessage: false
    })
}

async function findByCode(code) {
    return await useApiConfig({
        endpoint: '/api/supplier/select',
        params: {
            selectType: 'selectByCode',
            supplierCode: code
        },
        isShowSuccessMessage: false
    })
}

async function create(data) {
    return await useApiConfig({
        endpoint: '/api/supplier/create',
        method: 'POST',
        body: data
    })
}

async function update(data) {
    return await useApiConfig({
        endpoint: '/api/supplier/update',
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
        endpoint: '/api/supplier/delete',
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