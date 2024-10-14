export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {name, categoryCode, originalPrice, salePercent} = data
    const {create} = productRepo
    const result = await create({
        name,
        categoryCode,
        originalPrice,
        salePercent,
        createdBy: event.user.email,
    })
    setResponseStatus(event, 201)
    return result.code
})