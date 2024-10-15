import _ from "lodash";

export default defineEventHandler((event) => {
    const params = getQuery(event)
    const {selectType, supplierCode} = params
    switch (selectType) {
        case 'selectMany':
            return supplierRepo.selectManyByStatus()
        case 'selectByCode':
            if (_.isString(supplierCode)) {
                return supplierRepo.selectByCode(supplierCode)
            }
    }
    return []
})