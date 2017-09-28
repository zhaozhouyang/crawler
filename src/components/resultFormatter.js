const fs = require('fs')
const json2html = require('json-to-html')

function jsonToHtml (obj, path) {

}

function toRawHtml (domObj, $) {
  fs.writeFile(`./data/${domObj.value}/1_raw.html`, $('*').html(), (res) => {})
}

function toStructuredJsonFile (domObj) {
  fs.writeFile(`./data/${domObj.value}/2_structured.json`, JSON.stringify(domObj, null, 2), (res) => {})
}

function toStructuredHTMLFile (domObj) {
  var htmlStr = `<html lang="en-US"><head><style>
  table {
    border-collapse: collapse;
    margin-top: 5px;
    width: 100%;
  }
  table, td, th {
    border: 1px solid black;
    padding: 4px;
    text-align: left;
  }
  </style></head><body>
  `
  function generateHtml (curDom) {
    const style = `style=""`
    htmlStr += `<table><tbody><tr><th>Tag ${curDom.class || ''}</th><th>Value</th></tr><tr><td>${curDom.tag}</td>`
    htmlStr += `<td>${curDom.value} ${curDom.contentLink || ''} ${curDom.imageLink || ''}`
    for (const child of curDom.children) {
      generateHtml(child)
    }
    htmlStr += '</td></tr></tbody></table>'
  }
  generateHtml(domObj)
  htmlStr += '</body></html>'
  fs.writeFile(`./data/${domObj.value}/3_structured.html`, htmlStr, (res) => {})
}

function toPlainTxtFile (domObj) {
  var domList = []
  var txtStr = ''
  function toPlainList (curDom) {
    if (curDom.value) {
      domList.push(curDom)
      txtStr += curDom.value + '\n'
    }
    for (const child of curDom.children) toPlainList(child)
  }
  toPlainList(domObj)
  fs.writeFile(`./data/${domObj.value}/4_plain.txt`, txtStr, (res) => {})
}

function resultFormatter (domObj, $) {
  const filePath = `./data/${domObj.value.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')}`
  if (!fs.existsSync(filePath)) fs.mkdirSync(filePath)
  toRawHtml(domObj, $)
  toStructuredJsonFile(domObj)
  toStructuredHTMLFile(domObj)
  toPlainTxtFile(domObj)
}
module.exports = resultFormatter
