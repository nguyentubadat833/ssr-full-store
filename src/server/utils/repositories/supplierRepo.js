import randomstring from "randomstring";

async function create(data) {
    return prismaClient.supplier.create({
        data: {
            code: 'SPL' + randomstring.generate({
                length: 5,
                charset: 'numeric'
            }),
            info: data.info,
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.supplier.update({
        where: {
            code: data.code
        },
        data: {
            info: data.info,
            lastUpdatedAt: new Date(),
            lastUpdatedBy: data.lastUpdatedBy
        }
    });
}

async function selectByCode(code) {
    return prismaClient.supplier.findUnique({
        where: {
            code: code
        }
    })
}

async function selectManyByStatus({status = 1} = {}) {
    return prismaClient.supplier.findMany({
        where: {
            status: status
        }
    })
}

async function deleteSupplier(code) {
    await prismaClient.supplier.delete({
        where: {
            code: code
        }
    })
}

export default {
    create,
    update,
    selectByCode,
    selectManyByStatus,
    deleteSupplier
}