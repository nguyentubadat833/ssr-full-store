async function create(data) {
    return prismaClient.category.create({
        data: {
            code: data.code,
            name: data.name,
            alias: data.alias,
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.category.create({
        data: {
            name: data.name,
            alias: data.alias,
            status: data.status,
            lastUpdatedAt: new Date(),
            lastUpdatedBy: data.lastUpdatedBy
        }
    });
}

async function selectByCode(code) {
    return prismaClient.category.findUnique({
        where: {
            code: code
        }
    })
}

async function selectManyByStatus({status = 1} = {}) {
    return prismaClient.category.findMany({
        where: {
            status: status
        }
    })
}

async function deleteCategory(code) {
    await prismaClient.category.delete({
        where: {
            code: code
        }
    })
}

export default {
    create,
    update,
    deleteCategory,
    selectByCode,
    selectManyByStatus
}