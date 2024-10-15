async function create(data) {
    return await useApiConfig({
        endpoint: '/api/po/detail/create',
        method: 'POST',
        body: data
    })
}

async function update(data) {
    return await useApiConfig({
        endpoint: '/api/po/detail/update',
        method: 'PUT',
        body: data
    })
}

async function save(data) {
    if (data.id) {
        return await update(data)
    } else {
        return await create(data)
    }
}

async function del({id, callback}) {
    await useApiConfig({
        endpoint: '/api/po/detail/delete',
        method: 'DELETE',
        params: {
            id: id
        },
        callbackMethodOnSuccess: () => callback()
    })
}

export default {
    create,
    update,
    save,
    del
}