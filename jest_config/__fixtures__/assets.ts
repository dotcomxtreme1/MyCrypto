import { bigNumberify } from 'ethers/utils';

import { ExtendedAsset, StoreAsset } from '@types';

export const fAssets = [
  {
    uuid: '356a192b-7913-504c-9457-4d18c28d46e6',
    name: 'Ether',
    networkId: 'Ethereum',
    type: 'base',
    ticker: 'ETH',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: '77de68da-ecd8-53ba-bbb5-8edb1c8e14d7',
    name: 'Ropsten',
    networkId: 'Ropsten',
    type: 'base',
    ticker: 'RopstenETH',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: '92cfceb3-9d57-5914-ad8b-14d0e37643de',
    name: 'KovanETH',
    networkId: 'Kovan',
    type: 'base',
    ticker: 'KovanETH',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: '1b645389-2473-5467-9073-72d45eb05abc',
    name: 'RinkebyETH',
    networkId: 'Rinkeby',
    type: 'base',
    ticker: 'RinkebyETH',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: 'ac3478d6-9a3c-51fa-a2e6-0f5c3696165a',
    name: 'GoerliETH',
    networkId: 'Goerli',
    type: 'base',
    ticker: 'GoerliETH',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: '6c1e671f-9af5-546d-9c1a-52067bdf0e53',
    ticker: 'ETC',
    name: 'Ethereum Classic',
    networkId: 'ETC',
    type: 'base',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: 'fe5dbbce-a5ce-5e29-88b8-c69bcfdfde89',
    ticker: 'UBQ',
    name: 'Ubiq',
    networkId: 'UBQ',
    type: 'base',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: 'da4b9237-bacc-5df1-9c07-60cab7aec4a8',
    ticker: 'EXP',
    name: 'Expanse',
    networkId: 'EXP',
    type: 'base',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: '9a79be61-1e02-57e1-9943-da0737c6c51b',
    ticker: 'POA',
    name: 'POA',
    networkId: 'POA',
    type: 'base',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: 'b37f6ddc-efad-5e86-9783-7d3177f9ef24',
    ticker: 'TOMO',
    name: 'TomoChain',
    networkId: 'TOMO',
    type: 'base',
    decimal: 18,
    mappings: {},
    isCustom: false
  },
  {
    uuid: '2783a9ff-d6f1-5c9e-bbab-3b74be91adb1',
    name: 'RopDAI',
    decimal: 18,
    ticker: 'RopDAI',
    networkId: 'Ropsten',
    contractAddress: '0xad6d458402f60fd3bd25163575031acdce07538d',
    mappings: {},
    isCustom: true,
    type: 'erc20'
  }
] as ExtendedAsset[];

export const fAsset: StoreAsset = Object.assign({}, fAssets[2], {
  balance: bigNumberify('0x1b9ced41465be000'),
  mtime: 1581530607024
});