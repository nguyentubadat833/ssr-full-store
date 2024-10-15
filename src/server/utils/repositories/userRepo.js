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
                googleId: googleId
            }
        })
    }
    if (facebookId){
        return prismaClient.user.findFirst({
            where: {
                facebookId: facebookId
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