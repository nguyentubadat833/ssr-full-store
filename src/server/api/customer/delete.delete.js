export default defineEventHandler(async (event) => {
    const {code} = getQuery(event)
    if (code) {
        await customerRepo.deleteCustomer(code)
    }
})