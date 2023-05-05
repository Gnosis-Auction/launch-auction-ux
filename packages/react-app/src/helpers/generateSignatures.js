import { notification } from "antd";
import { utils } from "ethers";

function domain(chainId, verifyingContract) {
  return {
    name: "AccessManager",
    version: "v1",
    chainId,
    verifyingContract,
  };
}

async function generateSignatures(addresses, userSigner, auctionId, allowListContractAddress) {
  if (!addresses?.length) return [];
  const signerAddress = await userSigner.getAddress();
  const chainId = await userSigner.getChainId();

  notification.info({
    message: `Using the account: ${signerAddress} to generate signatures`,
    description: "",
    placement: "topRight",
  });
  const contractDomain = domain(chainId, allowListContractAddress);

  const signatures = [];
  await Promise.all(
    addresses.map(async address => {
      const auctioneerMessage = utils.keccak256(
        utils.defaultAbiCoder.encode(
          ["bytes32", "address", "uint256"],
          [utils._TypedDataEncoder.hashDomain(contractDomain), address, auctionId],
        ),
      );
      const auctioneerSignature = await userSigner.signMessage(utils.arrayify(auctioneerMessage));
      const sig = utils.splitSignature(auctioneerSignature);
      const auctioneerSignatureEncoded = utils.defaultAbiCoder.encode(
        ["uint8", "bytes32", "bytes32"],
        [sig.v, sig.r, sig.s],
      );
      signatures.push({
        user: address,
        signature: auctioneerSignatureEncoded,
      });
    }),
  );

  return signatures;
}

export default generateSignatures;
