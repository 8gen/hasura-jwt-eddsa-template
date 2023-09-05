
/*
const main = async() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var crypto = await import("crypto");
    // eslint-disable-next-line no-undef
    globalThis.crypto = crypto;
    var ed = await import("@noble/ed25519");
    const privKey = ed.utils.randomPrivateKey(); // Secure random private key
    const pubKey = await ed.getPublicKeyAsync(privKey);
    console.log(`PRIVATE_KEY=${Buffer.from(privKey).toString("hex")}`);
    console.log(`PUBLIC_KEY=${Buffer.from(pubKey).toString("hex")}`);
};
*/


const main = async() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var crypto = await import("crypto");
    const key = crypto.generateKeyPairSync("ed25519");
    console.log(`PRIVATE_KEY=${key.privateKey.export({type: "pkcs8", format: "der"}).toString("hex")}`);
};


main();

// The purpose of globalThis.crypto is to make the ed25519 library work in the browser.
// In Node.js, it is not necessary.
