export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {update} = categoryRepo
    await update(data)
    setResponseStatus(event, 200)
})