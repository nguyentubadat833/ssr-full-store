import slug from "slug";

async function create(data) {
    return prismaClient.product.create({
        data: {
            code: data.code,
            name: data.name,
            alias: slug(data.name),
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.product.create({
        data: {
            name: data.name,
            alias: slug(data.name),
            status: data.status,
            lastUpdatedAt: new Date(),
            lastUpdatedBy: data.lastUpdatedBy
        }
    });
}

async function selectByCode(code) {
    return prismaClient.product.findUnique({
        where: {
            code: code
        }
    })
}

async function deleteProduct(code) {
    await prismaClient.product.delete({
        where: {
            code: code
        }
    })
}

export default {
    create,
    update,
    selectByCode,
    deleteProduct
}