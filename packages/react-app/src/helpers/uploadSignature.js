import { PINATA_JWT } from "../constants";
import axios from "axios";

async function uploadSignature(chainId, auctionId, address, signature) {
  const data = JSON.stringify({
    pinataOptions: {
      cidVersion: 1,
    },
    pinataMetadata: {
      name: `${chainId}-${auctionId}-${address}`,
      keyvalues: {
        address,
        auctionId: auctionId,
      },
    },
    pinataContent: {
      signature,
    },
  });

  await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PINATA_JWT}`,
    },
  });
}

export default uploadSignature;
