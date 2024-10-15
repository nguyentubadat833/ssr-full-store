async function create(data) {
    return prismaClient.purchaseOrderDetail.create({
        data: {
            poCode: data?.poCode,
            productCode: data?.productCode,
            quantity: data?.quantity,
            unitPrice: data?.unitPrice,
            totalAmount: data?.totalAmount
        }
    });
}

async function update(data) {
    return prismaClient.purchaseOrderDetail.update({
        where: {
            id: data.id
        },
        data: {
            poCode: data?.poCode,
            productCode: data?.productCode,
            quantity: data?.quantity,
            unitPrice: data?.unitPrice,
            totalAmount: data?.totalAmount
        }
    });
}

async function del(id) {
    await prismaClient.purchaseOrderDetail.delete({
        where: {
            id: id
        }
    })
}

export default {
    create,
    update,
    del
}