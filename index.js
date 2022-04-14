const app = require('./app');
const path = require('path');
const keysGenerator = require('./keysGenerator');
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const settings = {
  mode: '',
  keyPath: ''
}

async function init() {
  await new Promise((resolve => {
    readline.question(`
    1.Generate key pair
    2.Encrypt with public key
    3.Encrypt with private key
    4.Decrypt with public key
    5.Decrypt with private key \n
    mode: `,
      mode => {
        if (!mode || mode < 1 && mode > 5) {
          throw new Error('Incorrect mode value. Available value from mode : 1 to 5')
        }
        settings.mode = +mode
        console.log(`Selected mode: ${mode}`)
        resolve()
      }
    )
  }))
  const question = settings.mode === 1 ? `Path to keys or leave blank for default path './keys'` : 'Path to key'
  await new Promise(resolve => {
    readline.question(
      question,
      keyPath => {
        console.log(keyPath)
        settings.keyPath = path.resolve(keyPath ? keyPath : './keys/')
        console.log(`Selected keyPath: ${settings.keyPath}`)
        resolve()
      })
  })

  readline.close()

  const {mode, keyPath} = settings
  if (mode === 1) await keysGenerator.generateKeys(keyPath)
  else app.execute(+mode, keyPath)
}

init()


