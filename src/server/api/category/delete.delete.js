import categoryRepo from "~/server/utils/repositories/categoryRepo.js";

export default defineEventHandler(async (event) => {
    const {code} = getQuery(event)
    if (code) {
        await categoryRepo.deleteCategory(code)
    }
})