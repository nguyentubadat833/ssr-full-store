import randomstring from "randomstring";

async function create(data) {
    return prismaClient.customer.create({
        data: {
            code: 'CTM' + randomstring.generate({
                length: 5,
                charset: 'numeric'
            }),
            info: data.info,
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.customer.update({
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
    return prismaClient.customer.findUnique({
        where: {
            code: code
        }
    })
}

async function selectManyByStatus({status = 1} = {}) {
    return prismaClient.customer.findMany({
        where: {
            status: status
        }
    })
}

async function deleteCustomer(code) {
    await prismaClient.customer.delete({
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
    deleteCustomer
}