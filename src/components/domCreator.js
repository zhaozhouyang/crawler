
const filterTags = ['script', 'style']
function parseDom ($, currentDom, domObj) {
  $(currentDom).children().each((index, child) => {
    const tag = $(child).prop('nodeName')
    if (filterTags.find(filterTag => filterTag === tag.toLowerCase())) return true
    const value = $(child).contents().first().text().trim()
    const childDom = {
      value,
      tag,
      imageLink: $(child).attr('src') || undefined,
      contentLink: $(child).attr('href') || undefined,
      class: $(child).attr('class') || undefined,
      children: [],

    }
    domObj.children.push(childDom)
    parseDom($, child, childDom)
  })
}

function domCreator ($) {
  const title = $('title').contents().first().text().trim()
  const body = $('body')
  const domObj = {
    value: title,
    tag: 'title',
    children: [],
  }
  parseDom($, body, domObj)
  return domObj
}
module.exports = domCreator
