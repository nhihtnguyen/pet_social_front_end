import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

const BSCOptions = {
  /* Smart Chain Mainnet RPC URL */
  rpcUrl: 'http://localhost:8545',
  chainId: 1337, // Smart Chain Mainnet Chain ID
};
// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window != 'undefined' &&
    new Magic(key, {
      network: BSCOptions,
      extensions: [new OAuthExtension()],
    })
  );
};

export const magic = createMagic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY);
