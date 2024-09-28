import {prismaClient} from "~/server/utils/prisma.js";

async function pushLog(message) {
    await prismaClient.log.create({
        data: {
            message: message,
            status: 1
        }
    })
}

async function findLog() {
    const data = await prismaClient.log.findMany({
        where: {
            status: 1
        }
    })
    for (const el of data) {
        await prismaClient.log.update({
            where: {
                id: el.id
            },
            data: {
                status: 0
            }
        })
    }
    return data
}

export default {
    pushLog,
    findLog
}