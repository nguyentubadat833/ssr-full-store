export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {createUser, findUser} = userRepo
    const emailReq = body?.email
    if (emailReq && body.password) {
        if (await findUser({email: emailReq})) {
            setResponseStatus(event, 400)
            return errorResponseObject({
                message: messageUtils.userExist()
            })
        } else {
            const user = await createUser({
                email: emailReq,
                passwordHash: await generatePasswordHash(body.password),
                profile: {
                    name: body?.name
                }
            })
            setResponseStatus(event, 201)
            return user.email
        }
    } else {
        setResponseStatus(event, 400)
        return errorResponseObject({
            message: messageUtils.userError({
                detail: {
                    vi: 'Email và mật khẩu là bắt buộc',
                    en: 'Email and password is required'
                }
            })
        })
    }
})