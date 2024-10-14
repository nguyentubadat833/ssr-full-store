import randomstring from 'randomstring'

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {name} = data
    const {create} = categoryRepo
    const result = await create({
        name: name,
        createdBy: event.user.email,
    })
    setResponseStatus(event, 201)
    return result.code
})