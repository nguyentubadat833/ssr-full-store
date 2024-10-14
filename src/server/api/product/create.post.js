import randomstring from "randomstring";

export default defineEventHandler(async (event) => {
    const data = await readBody(event)
    const {name, categoryCode, originalPrice, salePercent} = data
    const {create} = productRepo
    const result = await create({
        code: 'PRD' + randomstring.generate({
            length: 5,
            charset: 'numeric'
        }),
        originalPrice: originalPrice,
        salePercent: salePercent,
        categoryCode: categoryCode,
        name: name,
        createdBy: event.user.email,
    })
    setResponseStatus(event, 201)
    return result.code
})