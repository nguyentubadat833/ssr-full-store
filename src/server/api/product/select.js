import _ from "lodash";

export default defineEventHandler((event) => {
    const params = getQuery(event)
    const {selectType, productCode} = params
    switch (selectType) {
        case 'selectMany':
            return productRepo.selectManyByStatus()
        case 'selectByCode':
            if (_.isString(productCode)) {
                return productRepo.selectByCode(productCode)
            }
    }
    return []
})