import {getBlobList} from 'src/app/memes/data'

export default async function MemesOverview() {

    const blobs = await getBlobList();

    console.log('number of blobs: ', blobs.length)

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className="flex min-h-screen w-full flex-col gap-4 items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
                <h2>{'Memes Overview'}</h2>

                <div className={'flex flex-wrap gap-2'}>
                    {blobs.map(blob => <a key={blob.pathname} href={blob.url}>
                        {blob.pathname}
                    </a>)}
                </div>
            </main>
        </div>
    );
}
