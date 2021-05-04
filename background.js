window.iteminfo = {}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){
  window.iteminfo['url'] = request.url
  window.iteminfo['sku'] = request.sku
  window.iteminfo['prodname'] = request.prodname
  window.iteminfo['price'] = request.price
  window.iteminfo['description'] = request.description
  window.iteminfo['details'] = request.details
  window.iteminfo['width'] = request.width
  window.iteminfo['height'] = request.height
  window.iteminfo['depth'] = request.depth
  window.iteminfo['handle_drop'] = request.handle_drop
  window.iteminfo['color'] = request.color
})

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.create({url: 'popup.html'})
})
