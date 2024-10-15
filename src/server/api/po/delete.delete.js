export default defineEventHandler(async (event) => {
    const {code} = getQuery(event)
    if (code) {
        await purchaseOrderRepo.deletePurchaseOrder(code)
    }
})