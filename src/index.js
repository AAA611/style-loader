// @ts-nocheck
const loader = function () {}

loader.pitch = function (remainingRequest) {
  const options = this.getOptions()
  const { insertType = 'onestyletag', esModule = false } = options

  const n = function (remainingRequest) {
    return remainingRequest.replace(/\\/g, '/')
  }

  const getImportCode = function (remainingRequest, esModule) {
    const importAbsolutePath = n(remainingRequest)
    let importCode
    if (esModule) {
      importCode = `import style from !!${importAbsolutePath}`
    } else {
      importCode = `let style = require("!!${importAbsolutePath}").default`
    }
    return importCode
  }

  const insertStyleTag = function () {
    let code = `
    const styleEl=document.createElement('style')
    styleEl.innerHTML=style.toString()
    document.head.appendChild(styleEl)
    `
    return code
  }

  const getInsertCode = function (insertType) {
    let insertCode
    switch (insertType) {
      case 'onestyletag':
        insertCode = insertStyleTag()
        break
      default:
        break
    }
    return insertCode
  }

  const getExportCode = function (esModule) {
    let exportCode
    if (esModule) {
      exportCode = `export default style&&style.locals||{}`
    } else {
      exportCode = `module.exports=style&&style.locals||{}`
    }
    return exportCode
  }

  let resCode = `
  ${getImportCode(remainingRequest, esModule)}
  ${getInsertCode(insertType)}
  ${getExportCode(esModule)}
  `
  return resCode
}

module.exports = loader
