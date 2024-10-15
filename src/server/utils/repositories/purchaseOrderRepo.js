import randomstring from "randomstring";

async function create(data) {
    return prismaClient.purchaseOrder.create({
        data: {
            code: 'PO' + randomstring.generate({
                length: 7,
                charset: 'numeric'
            }),
            supplierCode: data.supplierCode,
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.purchaseOrder.update({
        where: {
            code: data.code
        },
        data: {
            supplierCode: data.supplierCode,
            lastUpdatedAt: new Date(),
            lastUpdatedBy: data.lastUpdatedBy
        }
    });
}

async function selectByCode(code) {
    return prismaClient.purchaseOrder.findUnique({
        where: {
            code: code
        }
    })
}

async function selectManyByStatus({status = 1} = {}) {
    return prismaClient.purchaseOrder.findMany({
        where: {
            status: status
        }
    })
}

async function deletePurchaseOrder(code) {
    await prismaClient.purchaseOrder.delete({
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
    deletePurchaseOrder
}