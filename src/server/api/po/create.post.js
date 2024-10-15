export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {supplierCode} = data
    const {create} = purchaseOrderRepo
    const result = await create({
        supplierCode,
        createdBy: event.user.email,
    })
    setResponseStatus(event, 201)
    return result.code
})