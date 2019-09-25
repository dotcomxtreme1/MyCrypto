import React, { useState, useEffect } from 'react';

import { ITxObject, ISignedTx } from '../../types';
import './Hardware.scss';
import { ExtendedAccount as IExtendedAccount, ITxReceipt } from 'v2/types';
import { WalletFactory } from 'v2/services/WalletService';
import { makeTransaction } from 'libs/transaction/utils/ether';
import { InlineErrorMsg } from 'v2/components/ErrorMessages';

export interface IDestructuredDPath {
  dpath: string;
  index: number;
}

export const splitDPath = (fullDPath: string): IDestructuredDPath => {
  /* 
    m/44'/60'/0'/0 => { dpath: "m/44'/60'/0'/"index: "0"}
  */
  const dpathArray = fullDPath.split('/');
  const length = dpathArray.length;
  let dpathInit = '';
  for (let i = 0; i < length - 1; i++) {
    dpathInit += dpathArray[i];
    if (i < length - 2) {
      dpathInit += '/';
    }
  }
  return { dpath: dpathInit, index: parseInt(dpathArray[length - 1], 10) };
};

export interface IProps {
  walletIcon: any;
  signerDescription: string;
  senderAccount: IExtendedAccount;
  rawTransaction: ITxObject;
  onSuccess(receipt: ITxReceipt | ISignedTx): void;
}

export default function HardwareSignTransaction({
  walletIcon,
  signerDescription,
  senderAccount,
  rawTransaction,
  onSuccess
}: IProps) {
  const [isRequestingWalletUnlock, setIsRequestingWalletUnlock] = useState(false);
  const [isWalletUnlocked, setIsWalletUnlocked] = useState(false);
  const [isRequestingTxSignature, setIsRequestingTxSignature] = useState(false);
  const [isTxSignatureRequestDenied, setIsTxSignatureRequestDenied] = useState(false);
  const [wallet, setWallet] = useState({} as any);
  const SigningWalletService = WalletFactory(senderAccount.wallet);

  useEffect(() => {
    // Unlock Wallet
    const WalletLoginRequest = setInterval(() => {
      if (!isWalletUnlocked && !isRequestingWalletUnlock) {
        setIsRequestingWalletUnlock(true);
        const dpathObject = splitDPath(senderAccount.dPath);
        const walletObject = SigningWalletService.init(
          senderAccount.address,
          dpathObject.dpath,
          dpathObject.index
        );
        try {
          SigningWalletService.getChainCode(dpathObject.dpath)
            .then((_: any) => {
              // User has connected device.
              setIsRequestingWalletUnlock(false);
              setIsWalletUnlocked(true);
              setWallet(walletObject);
            })
            .catch((_: any) => {
              // User hasn't connected device or there was an error. Try again
              setIsRequestingWalletUnlock(false);
            });
        } catch (error) {
          setIsRequestingWalletUnlock(false);
        }
      }
    }, 3000);
    return () => clearInterval(WalletLoginRequest);
  });

  useEffect(() => {
    // Wallet has been unlocked. Attempting to sign tx now.
    if ('signRawTransaction' in wallet && !isRequestingTxSignature) {
      setIsRequestingTxSignature(true);
      const madeTx = makeTransaction(rawTransaction);
      wallet
        .signRawTransaction(madeTx)
        .then((data: any) => {
          // User approves tx.
          setIsTxSignatureRequestDenied(false);
          onSuccess(data);
        })
        .catch((_: any) => {
          // User denies tx, or tx times out.
          setIsTxSignatureRequestDenied(true);
          setIsRequestingTxSignature(false);
        });
    }
  }, [wallet, isRequestingTxSignature]);
  return (
    <div className="SignTransaction-panel">
      <div className="SignTransactionHardware-title">
        Sign the Transaction with your Hardware Wallet
      </div>
      <div className="SignTransactionHardware-instructions">{signerDescription}</div>
      <div className="SignTransactionHardware-content">
        <div className="SignTransactionHardware-img">
          <img src={walletIcon} />
        </div>
        <div className="SignTransactionHardware-description">
          Because we never save, store, or transmit your secret, you need to sign each transaction
          in order to send it. MyCrypto puts YOU in control of your assets.
          {isTxSignatureRequestDenied && (
            <InlineErrorMsg>
              You denied the transaction signature request, or the transaction signature request
              timed out. Please confirm the transaction signature.
            </InlineErrorMsg>
          )}
        </div>
        <div className="SignTransactionHardware-footer">
          <div className="SignTransactionHardware-help">
            Not working? Here's some troubleshooting tips to try.
          </div>
          <div className="SignTransactionHardware-referal">Need a Hardware? Get one now.</div>
        </div>
      </div>
    </div>
  );
}
