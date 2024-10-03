

function mergeMessage(lang, originMessage, detailMessage) {
    console.log('lang', lang)
    console.log('originMessage', originMessage)
    console.log('detailMessage', detailMessage)
    if (typeof detailMessage === 'object') {
        return `${originMessage}: ${detailMessage?.lang}`
    } else {
        return originMessage
    }
}

function created({lang = langVI} = {}) {
    if (isLangVI(lang)) return 'Tạo mới thành công'
}

function updated({lang = langVI} = {}) {
    if (isLangVI(lang)) return 'Cập nhật thành công'
}

function deleted({lang = langVI} = {}) {
    if (isLangVI(lang)) return 'Xóa thành công'
}

function userError({lang = langVI, detail} = {}) {
    if (isLangVI(lang)) return mergeMessage(lang, 'Lỗi thao tác', detail)
}

function passwordsDoMatch({lang = langVI} = {}) {
    if (isLangVI(lang)) return 'Mật khẩu không đúng'
}

function userExist({lang = langVI} = {}) {
    if (isLangVI(lang)) return 'Người dùng đã tồn tại'
}

function invalidSignInInfo({lang = langVI} = {}) {
    if (isLangVI(lang)) return 'Tài khoản hoặc mật khẩu không đúng'
}

function userIsLocked({lang = langVI} = {}) {
    if (isLangVI(lang)) return 'Tài khoản đã bị khóa'
}

function authError({lang = langVI} = {}) {
    if (isLangVI(lang)) return ' Lỗi xác thực'
}

export default {
    created,
    updated,
    deleted,
    userError,
    passwordsDoMatch,
    userExist,
    invalidSignInInfo,
    userIsLocked,
    authError
}
