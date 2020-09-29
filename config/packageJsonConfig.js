const path = require('path')
const fs = require('fs')

const fastExclude = [
  '@types/react-redux',
  '@types/react-router-config',
  '@types/react-router-dom',
  'react-redux',
  'react-router',
  'react-router-config',
  'react-router-dom',
  'redux',
  'redux-thunk',
  'immer'
]

const tsExclude = [
  '@types/node',
  '@types/react',
  '@types/react-dom',
  '@types/react-redux',
  '@types/react-router-config',
  '@types/react-router-dom',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  '@babel/preset-typescript'
]

const NODE_ENV = process.env.NODE_ENV

const producePackageJson = (chooseResult, filename) => {
  try {
    let data = fs.readFileSync(path.resolve(__dirname, '../package.json'))
    let jsonObject = JSON.parse(data)
    const { projectName, author, version, repository, useTypescript, fast} = chooseResult

    // 根据参数修改依赖
    let devDependence = {...jsonObject.devDependencies}
    let dependence = {...jsonObject.dependencies}

    for (const key in devDependence) {
      if (!fast) {
        if (fastExclude.includes(key) && devDependence[key]) {
          delete devDependence[key]
        }
      }
      if (tsExclude.includes(key) && !useTypescript) {
        if (devDependence[key]) {
          delete devDependence[key]
        }
      }
    }
    for (const key in dependence) {
      if (!fast) {
        if (fastExclude.includes(key) && dependence[key]) {
          delete dependence[key]
        }
      }
      if (tsExclude.includes(key) && !useTypescript) {
        if (dependence[key]) {
          delete dependence[key]
        }
      }
    }

    const scripts = {}
    for (const key in jsonObject.scripts) {
      if (!/self/.test(key)) {
        scripts[key] = jsonObject.scripts[key]
      }
    }

    jsonObject = Object.assign(jsonObject, {
      name: projectName,
      author,
      version,
      repository
    }, {
      devDependencies: devDependence,
      dependencies: dependence,
      scripts
    })

    if (NODE_ENV === 'test') {
      // fs.file(path.resolve(__dirname, '../test/package.json'))
      fs.writeFileSync(path.resolve(__dirname, filename), JSON.stringify(jsonObject, null, 2))
    } else {
      fs.writeFileSync(path.resolve(__dirname, '../package.json'), JSON.stringify(jsonObject, null, 2))
    }

  } catch (error) {
    console.error(error)
  }
}

module.exports = producePackageJson
