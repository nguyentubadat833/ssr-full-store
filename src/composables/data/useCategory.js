async function data() {
    return await useApiConfig({
        endpoint: '/api/category/select',
        params: {
            selectType: 'selectMany'
        },
        isShowSuccessMessage: false
    })
}

async function findByCode(code) {
    return await useApiConfig({
        endpoint: '/api/category/select',
        params: {
            selectType: 'selectByCode',
            categoryCode: code
        }
    })
}

async function create(data) {
    return await useApiConfig({
        endpoint: '/api/category/create',
        method: 'POST',
        body: data
    })
}

export default {
    data,
    findByCode,
    create
}