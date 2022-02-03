import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';
import Web3 from 'web3';

const customNodeOptions = {
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
};

// Create client-side Magic instance
const createMagic = (key) => {
  return (
    typeof window !== 'undefined' &&
    new Magic(key, {
      network: customNodeOptions,
      extensions: [new OAuthExtension()],
    })
  );
};

export const magicLocal = createMagic(
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY
);

export const localWeb3 = (() => {
  if (magicLocal) {
    magicLocal.network = 'local';
  }
  return new Web3(magicLocal.rpcProvider);
})();

export default magicLocal;
