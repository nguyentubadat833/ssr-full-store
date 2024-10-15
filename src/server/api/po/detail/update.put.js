export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const result = await purchaseOrderDetailRepo.update(data)
    return result.code
})