export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {info} = data
    const {create} = customerRepo
    const result = await create({
        info,
        createdBy: event.user.email,
    })
    setResponseStatus(event, 201)
    return result.code
})