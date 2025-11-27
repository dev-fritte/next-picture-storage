import {put} from '@vercel/blob';
import {NextRequest} from 'next/server'
import {createClient} from 'src/supabase/serverClient'
import {PICTURE_TABLE} from 'src/supabase/tablenames'
import {MemeEntry} from 'src/app/memes/_types/meme-entry-types'

export async function POST(request: NextRequest) {
    const data = await request.formData();

    const file = data.get('file') as File;
    const tagArray = data.getAll('tags') as unknown as string[];

    console.log('/memes/new - upload new meme with tags: ', tagArray);

    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true
    });

    const supabase = await createClient();

    const supabaseResponse = await supabase
        .from(PICTURE_TABLE)
        .insert({blob_url: blob.url, tags: tagArray} as MemeEntry)
        .select();

    if (supabaseResponse?.error) {
        console.error(supabaseResponse?.error);
    }

    return Response.json(supabaseResponse?.data);
}
