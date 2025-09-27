import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react'

export const isAuthenticated = cache(async () => {
    const cookieStore = await cookies()
    const access_token = cookieStore.get('access_token')?.value
    const session = await decrypt(access_token)

    if (!session?.userId) {
        return { isAuth: false, userId: null, roles: [] }
    }
    return { isAuth: true, userId: session.userId, roles: session.roles }
})
