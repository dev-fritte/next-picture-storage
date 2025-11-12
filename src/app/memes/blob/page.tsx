import {getBlobList} from 'src/app/memes/data'

export default async function MemesOverview() {

    const response = await getBlobList();

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main
                className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <p>{'Memes Overview'}</p>

                <div className={'flex flex-wrap gap-2'}>
                    {response.blobs.map((blob) => (
                        <a key={blob.pathname} href={blob.url}>
                            (blob.pathname)
                        </a>
                    ))}
                </div>
            </main>
        </div>
    );
}
