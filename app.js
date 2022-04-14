const NodeRSA = require('node-rsa'),
      fs = require('fs');

function execute(mode, keyPath) {
  const rsaKey = new NodeRSA();

  const key = fs.readFileSync(keyPath, 'utf8');
  rsaKey.importKey(key);

  const message = fs.readFileSync("./data.txt", "utf8");
  let res;

  switch (+mode) {
    case 2: // Encrypt with public key
      res = rsaKey.encrypt(message, 'base64');
      break;
    case 3: // Encrypt with private key
      res = rsaKey.encryptPrivate(message, 'base64');
      break;
    case 4: // Decrypt with public key
      res = rsaKey.decryptPublic(message, 'utf8');
      break;
    case 5: // Decrypt with private key
      res = rsaKey.decrypt(message, 'utf8');
      break;
    default:
      return;
  }

  const fd = fs.openSync('./data.txt', 'w');
  fs.writeSync(fd, res, 'utf8');

  console.log(res)
}

module.exports = {
  execute
}