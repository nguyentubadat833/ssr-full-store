import * as argon2 from "argon2";

export async function generatePasswordHash(password) {
    try {
        return await argon2.hash(password)
    } catch (err) {
        console.log(err)
        return null
    }
}

export async function verifyPassword(password, passwordHash) {
    try {
        if (await argon2.verify(passwordHash, password)) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err)

    }
}