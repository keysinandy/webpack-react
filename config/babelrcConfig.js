const path = require('path')
const fs = require('fs')

const produceBabelrc = (chooseResult, filename) => {
  if (chooseResult.useTypescript) {
    return
  }
  try {
    const configJson =  fs.readFileSync(path.resolve(__dirname, '../.babelrc'), {encoding: 'utf-8'})
    let config = configJson.replace(/,\s?\n\s+"@babel\/preset-typescript"/, "")
    if (filename) {
      fs.writeFileSync(filename, config)
    } else {
      fs.writeFileSync(path.resolve(__dirname, '../.babelrc'), config)
    }

  } catch (error) {
    console.error(error)
  }
}

module.exports = produceBabelrc
