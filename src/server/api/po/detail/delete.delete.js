export default defineEventHandler(async (event) => {
    const {id} = getQuery(event)
    if (id) {
        await purchaseOrderDetailRepo.del(id)
    }
})