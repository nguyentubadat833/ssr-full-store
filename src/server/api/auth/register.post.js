export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {createUser, findUser} = userRepo
    const emailReq = body?.email
    if (emailReq && body.password) {
        if (await findUser({email: emailReq})) {
            setResponseStatus(event, 400, 'This email has been registered')
        } else {
            const user = await createUser({
                email: emailReq,
                password_hash: await generatePasswordHash(body.password),
                profile: {
                    name: body?.name
                }
            })
            return user.email
        }
    } else {
        setResponseStatus(event, 400, "Invalid info")
    }
})