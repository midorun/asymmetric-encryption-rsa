const prompt = require("prompt"),
      app = require('./app'),
      path = require('path'),
      keysGenerator = require('./keysGenerator');

console.log(`
    1.Generate key pair
    2.Encrypt with public key
    3.Encrypt with private key
    4.Decrypt with public key
    5.Decrypt with private key
    `)

prompt.start()

prompt.get(['mode', 'keyPath'], function (err, result) {
  const {mode } = result
  const keyPath = path.resolve(result.keyPath)
  if (+mode === 1) keysGenerator.generateKeys(keyPath)
  else app.execute(+mode, keyPath)
});

console.log(__dirname)