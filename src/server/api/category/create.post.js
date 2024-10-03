export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {create} = categoryRepo
    const result = await create(data)
    setResponseStatus(event, 201)
    return result.code
})