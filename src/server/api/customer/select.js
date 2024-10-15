import _ from "lodash";

export default defineEventHandler((event) => {
    const params = getQuery(event)
    const {selectType, customerCode} = params
    switch (selectType) {
        case 'selectMany':
            return customerRepo.selectManyByStatus()
        case 'selectByCode':
            if (_.isString(customerCode)) {
                return customerRepo.selectByCode(customerCode)
            }
    }
    return []
})