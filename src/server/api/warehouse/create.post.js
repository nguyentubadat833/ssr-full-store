export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {name, location, maxCapacity, stock} = data
    const {create} = warehouseRepo
    const result = await create({
        name,
        location,
        maxCapacity,
        stock,
        createdBy: event.user.email,
    })
    setResponseStatus(event, 201)
    return result.code
})