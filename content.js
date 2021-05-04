// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
// const description = $("#pdp-description:first-child").text()
//   let width = height = depth = 0
//   $("#pdp-details").find("li").each(function() {
//       let myregex = /Depth.*\s(\d+(\.\d+)?)/
//       let matches = this.innerText.match(myregex)
//       if(myregex.test(this.innerText)){
//         depth = matches[1]
//       }
//
//       myregex = /Width.*\s(\d+(\.\d+)?)/
//       matches = this.innerText.match(myregex)
//       if(myregex.test(this.innerText)){
//         width = matches[1]
//       }
//
//       myregex = /Height.*\s(\d+(\.\d+)?)/
//       matches = this.innerText.match(myregex)
//       if(myregex.test(this.innerText)){
//         height = matches[1]
//       }
//   });
//
//   sendResponse({
//     description: description,
//     width: width,
//     height: height,
//     depth: depth
//   })
// })
const prodname = $(".description-and-detail h1").text()
const description = $("#pdp-description:first-child").text()
const details = $("[class=js-product-details_val]").text()
const price = $("meta[itemprop='price']").attr("content")
const color = $("div").find(".selected-color").text()

let sku
if($("meta[itemprop='productID']").length > 0){
  sku = $("meta[itemprop='productID']").attr("content")
}else if($("meta[itemprop='sku']").length > 0){
  sku = $("meta[itemprop='sku']").attr("content")
}

let arr_details = ''
let width = height = depth = handle_drop = 0
$("#pdp-details").find("li").each(function() {
  arr_details += this.innerText + '\n'
  let myregex = /Depth.*\s(\d+(\.\d+)?)/
  let matches = this.innerText.match(myregex)
  if(myregex.test(this.innerText)){
    depth = matches[1]
  }

  myregex = /Width.*\s(\d+(\.\d+)?)/
  matches = this.innerText.match(myregex)
  if(myregex.test(this.innerText)){
    width = matches[1]
  }

  myregex = /Height.*\s(\d+(\.\d+)?)/
  matches = this.innerText.match(myregex)
  if(myregex.test(this.innerText)){
    height = matches[1]
  }

  myregex = /Handle\sDrop.*\s(\d+(\.\d+)?)/
  matches = this.innerText.match(myregex)
  if(myregex.test(this.innerText)){
    handle_drop = matches[1]
  }
});

chrome.runtime.sendMessage({
  url: window.location.href,
  sku: sku,
  prodname: prodname,
  price: price,
  description: description,
  details: arr_details,
  width: width,
  height: height,
  depth: depth,
  handle_drop: handle_drop,
  color: color
})
