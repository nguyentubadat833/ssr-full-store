async function data() {
    return await useApiConfig({
        endpoint: '/api/warehouse/select',
        params: {
            selectType: 'selectMany'
        },
        isShowSuccessMessage: false
    })
}

async function findByCode(code) {
    return await useApiConfig({
        endpoint: '/api/warehouse/select',
        params: {
            selectType: 'selectByCode',
            productCode: code
        }
    })
}

async function create(data) {
    return await useApiConfig({
        endpoint: '/api/warehouse/create',
        method: 'POST',
        body: data
    })
}

async function update(data) {
    return await useApiConfig({
        endpoint: '/api/warehouse/update',
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
        endpoint: '/api/warehouse/delete',
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