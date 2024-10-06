import {getServerSession} from "#auth";

export default defineEventHandler(async (event) => {
    const urlRequest = getRequestURL(event)
    const session = await getServerSession(event)
    const reqByEmail = session?.user?.email
    if (reqByEmail) {
        event.user = {
            email: reqByEmail
        }
    }
})