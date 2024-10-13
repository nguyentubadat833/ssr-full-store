export default defineEventHandler(async (event) => {
    const {code} = getQuery(event)
    if (code) {
        await productRepo.deleteProduct(code)
    }
})