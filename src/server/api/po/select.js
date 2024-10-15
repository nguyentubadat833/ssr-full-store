import _ from "lodash";

export default defineEventHandler((event) => {
    const params = getQuery(event)
    const {selectType, purchaseOrderCode} = params
    switch (selectType) {
        case 'selectMany':
            return purchaseOrderRepo.selectManyByStatus()
        case 'selectByCode':
            if (_.isString(purchaseOrderCode)) {
                return purchaseOrderRepo.selectByCode(purchaseOrderCode)
            }
    }
    return []
})