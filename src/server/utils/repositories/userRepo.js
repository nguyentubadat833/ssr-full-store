import {prismaClient} from "~/server/utils/prisma.js";

async function findUser({email, googleId, facebookId}) {
    if (email){
        return prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
    }
    if (googleId){
        return prismaClient.user.findFirst({
            where: {
                google_id: googleId
            }
        })
    }
    if (facebookId){
        return prismaClient.user.findFirst({
            where: {
                facebook_id: facebookId
            }
        })
    }
    return null
}

async function createUser(data) {
    return prismaClient.user.create({
        data: data
    })
}

export default {
    findUser,
    createUser
}