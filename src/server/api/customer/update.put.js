
export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {update} = customerRepo
    const result = await update({
        ...data,
        lastUpdatedAt: new Date(),
        lastUpdatedBy: event.user.email
    })
    return result.code
})