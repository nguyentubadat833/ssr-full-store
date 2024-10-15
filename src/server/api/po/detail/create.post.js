export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const result = await purchaseOrderDetailRepo.create(data)
    setResponseStatus(event, 201)
    return result.code
})