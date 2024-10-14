import _ from "lodash";

export default defineEventHandler((event) => {
    const params = getQuery(event)
    const {selectType, warehouseCode} = params
    switch (selectType) {
        case 'selectMany':
            return warehouseRepo.selectManyByStatus()
        case 'selectByCode':
            if (_.isString(warehouseCode)) {
                return warehouseRepo.selectByCode(warehouseCode)
            }
    }
    return []
})