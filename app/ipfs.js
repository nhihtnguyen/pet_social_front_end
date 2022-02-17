import { create as ipfsHttpClient } from 'ipfs-http-client';

export const client = ipfsHttpClient({
  url: process.env.NEXT_PUBLIC_IPFS_API,
});
