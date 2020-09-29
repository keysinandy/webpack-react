const path = require('path')
const fs = require('fs')
const child_process = require('child_process')
const producePackageJson = require('./packageJsonConfig')
const produceBabelrc = require('./babelrcConfig')

// 删除目录
const removeDir = (dir, direct) => {
  if (!direct) {
    dir = path.join(__dirname, dir)
  }

  if (fs.existsSync(dir)) {
    child_process.spawnSync('rm', ['-rf', dir])
  }
}

const dirToRemove = [
  path.resolve(__dirname, '../config'),
  path.resolve(__dirname, '../build'),
  path.resolve(__dirname, '../coverage'),
  path.resolve(__dirname, '../node_modules'),
  path.resolve(__dirname, '../test'),
  path.resolve(__dirname, '../testProduce'),
]
const fileRenameTSX = [
  path.resolve(__dirname, '../src/app.js'),
  path.resolve(__dirname, '../src/index.js'),
]
const create = (chooseResult) => {
  const { useTypescript, fast } = chooseResult
  // 修改package.json
  producePackageJson(chooseResult)

  // 修改.babelrc
  produceBabelrc(chooseResult)

  // 删除文件
  dirToRemove.push(path.resolve(__dirname, '../src/app_fast.js'))
  try {
    if (!fast) {
      dirToRemove.push(
        path.resolve(__dirname, '../src/routes'),
        path.resolve(__dirname, '../src/store'),
        path.resolve(__dirname, '../src/page')
      )
    } else {
      let data = fs.readFileSync(path.resolve(__dirname, '../src/app_fast.js'), {encoding: 'utf-8'})
      fs.writeFileSync(path.resolve(__dirname, '../src/app.js'), data)
    }
    if (!useTypescript) {
      dirToRemove.push(path.resolve(__dirname, '../tsconfig.json'))
    } else {
      fileRenameTSX.forEach(v => {
        fs.renameSync(v, `${v.replace(/\.js$/,'.tsx')}`)
      })
    }
    dirToRemove.forEach(v => removeDir(v, true))
  } catch (error) {
    console.error(error)
  }
}

module.exports = create
