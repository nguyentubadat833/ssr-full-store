import slug from "slug";
import randomstring from "randomstring";

async function create(data) {
    return prismaClient.category.create({
        data: {
            code: 'CTG' + randomstring.generate({
                length: 5,
                charset: 'numeric'
            }),
            name: data.name,
            alias: slug(data.name),
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.category.update({
        where: {
            code: data.code
        },
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