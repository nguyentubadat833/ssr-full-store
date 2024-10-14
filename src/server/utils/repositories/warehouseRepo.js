import randomstring from "randomstring";

async function create(data) {
    return prismaClient.warehouse.create({
        data: {
            code: 'WRH' + randomstring.generate({
                length: 5,
                charset: 'numeric'
            }),
            name: data.name,
            location: data.location,
            maxCapacity: data.maxCapacity,
            // stock: data.stock,
            createdBy: data.createdBy
        }
    });
}

async function update(data) {
    return prismaClient.warehouse.update({
        where: {
            code: data.code
        },
        data: {
            name: data.name,
            location: data.location,
            maxCapacity: data.maxCapacity,
            // stock: data.stock,
            status: data.status,
            lastUpdatedAt: new Date(),
            lastUpdatedBy: data.lastUpdatedBy
        }
    });
}

async function selectByCode(code) {
    return prismaClient.warehouse.findUnique({
        where: {
            code: code
        }
    })
}

async function selectManyByStatus({status = 1} = {}) {
    return prismaClient.warehouse.findMany({
        where: {
            status: status
        }
    })
}

async function deleteWarehouse(code) {
    await prismaClient.warehouse.delete({
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
    deleteWarehouse
}