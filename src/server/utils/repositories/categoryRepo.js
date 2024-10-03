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

export default {
    create,
    update
}