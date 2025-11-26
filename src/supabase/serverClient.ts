import {createServerClient} from '@supabase/ssr'
import {cookies} from 'next/headers'

export async function createClient() {
    const cookieStore = await cookies()

    console.log('create supabase client with credentials')
    console.log('public URL', process.env.SUPABASE_URL, process.env.SUPABASE_URL!)
    console.log('key: ', process.env.SUPABASE_PUBLISHABLE_KEY, process.env.SUPABASE_PUBLISHABLE_KEY!)

    return createServerClient(
        process.env.SUPABASE_URL!,
        process.env.PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({name, value}) => cookieStore.set(name, value))
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    )
}
