import { call, take, put, all } from 'redux-saga/effects';
import { marketActions as actions } from './marketSlice';
import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';

import { nftaddress, nftmarketaddress } from '../../config';

import NFT from 'contracts/NFT.json';
import Market from 'contracts/NFTMarket.json';

function* handleFetchItems() {
  try {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = yield call(marketContract.fetchMarketItems);
    const items = yield call(toMarketItems, data, tokenContract);
    yield put(actions.fetchSuccess(items));
  } catch (error) {
    yield put(actions.fetchFailed(error.message.toString()));
    console.log(error);
  }
}

function* watchFetchItemsFlow() {
  while (true) {
    const action = yield take(actions.fetchItems.type);
    yield call(handleFetchItems);
  }
}

export default function* userSaga() {
  yield all([watchFetchItemsFlow()]);
}
