import {NextRequest} from 'next/server'
import {createClient} from 'src/supabase/serverClient'
import {PICTURE_TABLE} from 'src/supabase/tablenames'


export async function GET(request: NextRequest) {

    const data = await request.formData();
    const tagArray = data.getAll('tags') as unknown as string[];
    console.log('/memes/find - find meme with tags: ', tagArray);

    const supabase = await createClient();

    const supabaseResponse = await supabase
        .from(PICTURE_TABLE)
        .select()
        .overlaps('tags', tagArray as unknown as string[])

    return Response.json(supabaseResponse?.data);
}
