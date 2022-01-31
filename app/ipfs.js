import { create as ipfsHttpClient } from 'ipfs-http-client';

export const client = ipfsHttpClient({
  url: 'https://ipfs.infura.io:5001/api/v0',
});
