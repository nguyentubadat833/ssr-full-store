export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {update} = categoryRepo
    await update({
        ...data,
        lastUpdatedAt: new Date(),
        lastUpdatedBy: event.user.email
    })
    setResponseStatus(event, 200)
})