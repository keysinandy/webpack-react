const producePackageJson = require('../config/packageJsonConfig')
const produceBabelrc = require('../config/babelrcConfig')
const path = require('path')
const testObject = {
  projectName: 'projectName',
  author: 'author',
  version: 'version',
  repository: 'repository',
  useTypescript: false,
  fast: false
}
const pathProduce = path.resolve(__dirname, '../testProduce')
producePackageJson(testObject, path.resolve(pathProduce, 'noFastNoTypescript.json'))
produceBabelrc(testObject, path.resolve(pathProduce, 'noTypescriptBabelrc'))
testObject.useTypescript = true
producePackageJson(testObject, path.resolve(pathProduce, 'noFastTypescript.json'))
testObject.useTypescript = false
testObject.fast = true
producePackageJson(testObject, path.resolve(pathProduce, 'fastNoTypescript.json'))
testObject.useTypescript = true
producePackageJson(testObject, path.resolve(pathProduce, 'fastTypescript.json'))
produceBabelrc(testObject, path.resolve(pathProduce, 'typescriptBabelrc'))

