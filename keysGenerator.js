const NodeRSA = require('node-rsa'),
  fs = require('fs');

const keyPrivacyTypes = {
  public: 'public',
  private: 'private'
}

const keyExtension = '.pem'

async function generateKeys(keysPath) {
  const generateKeyPair = new NodeRSA().generateKeyPair();
  const keys = Object
    .values(keyPrivacyTypes)
    .map(keyPrivacyType => ({[keyPrivacyType]: generateKeyPair.exportKey(keyPrivacyType)}))

  try {
    await fs.mkdir(keysPath, {recursive: true}, () => {
    });
    keys.map(async (key) => {
        const keyPrivacyType = Object.keys(key)[0]
        await fs.writeFile(
          `${keysPath}/${keyPrivacyType}${keyExtension}`,
          key[keyPrivacyType],
          () => keyAddLogger(keyPrivacyType))
      }
    )
  } catch (e) {
    console.log(e)
  }
}

function keyAddLogger(keyPrivacyType) {
  const firstLetter = keyPrivacyType.charAt(0).toUpperCase()
  const restKeyTypePart = keyPrivacyType.slice(1)
  console.log(`${firstLetter}${restKeyTypePart} key is created successfully.`);
}

module.exports = {
  generateKeys
}