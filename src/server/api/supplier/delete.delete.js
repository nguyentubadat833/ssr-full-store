export default defineEventHandler(async (event) => {
    const {code} = getQuery(event)
    if (code) {
        await supplierRepo.deleteSupplier(code)
    }
})