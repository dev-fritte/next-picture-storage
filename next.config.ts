import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    reactCompiler: true,
    images: {
        remotePatterns: [new URL('https://i.imgflip.com/**')],
    }
};

export default nextConfig;
