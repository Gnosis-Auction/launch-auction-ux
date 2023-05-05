import * as LitJsSdk from "@lit-protocol/lit-node-client";

const client = new LitJsSdk.LitNodeClient({ debug: true });

class Lit {
  litNodeClient = null;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  async encryptString(stringToEncode, accessControlConditions, chain, authSig) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(stringToEncode);

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });

    return { encryptedString, encryptedSymmetricKey };
  }

  async decryptString({ encryptedString, encryptedSymmetricKey }, accessControlConditions, chain, authSig) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const symmetricKey = await this.litNodeClient.getEncryptionKey({
      accessControlConditions,
      toDecrypt: encryptedSymmetricKey,
      chain,
      authSig,
    });

    const decryptedString = await LitJsSdk.decryptString(
      await LitJsSdk.base64StringToBlob(encryptedString),
      symmetricKey,
    );
    console.log({ decryptedString });
    return decryptedString;
  }
}

export default new Lit();
