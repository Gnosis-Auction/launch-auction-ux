import { SiweMessage } from "siwe";

export async function generateAuthSig(signer, chainId, auctionId) {
  const address = await signer.getAddress();
  const siweMessage = new SiweMessage({
    domain: "gnosisauction",
    address: address,
    statement: `Sign in to access bidding for auction - ${auctionId}`,
    uri: origin,
    version: "1",
    chainId: chainId,
  });

  const messageToSign = siweMessage.prepareMessage();
  const signature = await signer.signMessage(messageToSign);

  const authSig = {
    sig: signature,
    derivedVia: "web3.eth.personal.sign",
    signedMessage: messageToSign,
    address: address,
  };
  return authSig;
}
