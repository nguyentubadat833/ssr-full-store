import randomstring from 'randomstring'
import slug from "slug";

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {name} = data
    const {create} = categoryRepo
    const result = await create({
        code: 'CTG' + randomstring.generate({
            length: 5,
            charset: 'numeric'
        }),
        name: name,
        alias: slug(name),
        createdBy: event.user.email,
    })
    setResponseStatus(event, 201)
    return result.code
})