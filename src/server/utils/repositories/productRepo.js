import slug from "slug";

async function create(data) {
    return prismaClient.product.create({
        data: {
            code: data.code,
            categoryCode: data.categoryCode,
            originalPrice: data.originalPrice,
            salePercent: data.salePercent,
            name: data.name,
            alias: slug(data.name),
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.product.update({
        where: {
            code: data.code
        },
        data: {
            name: data.name,
            categoryCode: data.categoryCode,
            originalPrice: data.originalPrice,
            salePercent: data.salePercent,
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

async function selectManyByStatus({status = 1} = {}) {
    return prismaClient.product.findMany({
        where: {
            status: status
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
    deleteProduct,
    selectManyByStatus
}