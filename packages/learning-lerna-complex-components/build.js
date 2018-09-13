const { promisify } = require('util')
const { join } = require('path')
const { existsSync, mkdir, readFile, writeFile } = require('fs')

const mkdirAsync = promisify(mkdir)
const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

const BASE_PATH = __dirname
const PACKAGE_FILE = 'package.json'
const TARGET_PATH = 'dist'

function updateJson (input) {
  const output = { ...input }

  delete output.dependencies
  delete output.devDependencies
  delete output.private
  delete output.scripts

  return {
    ...output,
    name: output.name.replace(/-dev$/, ''),
    peerDependencies: {
      ...input.dependencies
    }
  }
}

function createDirectoryIfNotExists () {
  if (existsSync(join(BASE_PATH, TARGET_PATH))) {
    return Promise.resolve()
  }

  return mkdirAsync(join(BASE_PATH, TARGET_PATH))
}

readFileAsync(join(BASE_PATH, PACKAGE_FILE), { encoding: 'utf8' })
  .then(function parse (str) {
    return JSON.parse(str)
  })
  .then(updateJson)
  .then(function stringify (obj) {
    return JSON.stringify(obj, null, 2)
  })
  .then(function savePackage (data) {
    return createDirectoryIfNotExists()
      .then(() => writeFileAsync(join(BASE_PATH, TARGET_PATH, PACKAGE_FILE), data))
  })
