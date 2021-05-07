colors = []

document.addEventListener('DOMContentLoaded', function(){
  // document.querySelector('button').addEventListener('click', onclick, false)
  // function onclick() {
  //   chrome.tabs.query({currentWindow: true, active: true},
  //   function(tabs){
  //     chrome.tabs.sendMessage(tabs[0].id, '', setInfo)
  //   })
  // }
  //
  // function setInfo(res){
  //   const div = document.createElement('div')
  //   div.textContent = `幅: ${res.width}`
  //   div.textContent += `高さ: ${res.height}`
  //   div.textContent += `マチ: ${res.depth}`
  //   document.body.appendChild(div)
  // }

  const bg = chrome.extension.getBackgroundPage()

  const tbl = document.createElement("table")
  Object.keys(bg.iteminfo).forEach(function (key){
    const row = document.createElement("tr")
    const th = document.createElement("th")
    const td = document.createElement("td")
    let cellText = document.createTextNode(`${key}: `)
    th.appendChild(cellText)
    cellText = document.createTextNode(bg.iteminfo[key])
    td.appendChild(cellText)
    row.appendChild(th)
    row.appendChild(td)
    tbl.appendChild(row)
  })
  document.body.appendChild(tbl)

  const sku = bg.iteminfo['sku']
  myregex = /\w+\d-\d+/
  if(myregex.test(sku)){
    const sku_short = sku.match(myregex)
    const a = document.createElement('a')
    const a_text = document.createTextNode('buyma');
    a.setAttribute('href', `https://www.buyma.com/r/-F1/${sku_short}`)
    a.setAttribute('target', '_blank')
    a.appendChild(a_text);

    // div.textContent += `https://www.buyma.com/r/-F1/${sku_short}`
    createElmBtn(sku_short)
    document.body.appendChild(a)
  }

  let txtDetails = ''
  txtDetails= `幅: ${bg.iteminfo['width']}cm\n`
  txtDetails += `高さ: ${bg.iteminfo['height']}cm\n`
  txtDetails += `マチ: ${bg.iteminfo['depth']}cm\n`
  txtDetails += `ハンドルドロップ: ${bg.iteminfo['handle_drop']}cm\r\n`
  createElmBtn(txtDetails)

  // document.getElementById("show_color").addEventListener("click", function() {
  //   const url = bg.iteminfo['url']
  //   let cur_col = ''
  //   myregex = /_([A-Z]+)\.html/
  //   if(myregex.test(url)){
  //     cur_col = url.match(myregex)[1]
  //   }
  //
  //   colors.forEach(color => {
  //     const a = document.createElement('a')
  //     const a_text = document.createTextNode(color)
  //     new_url = url.replace(cur_col, color)
  //
  //     a.setAttribute('href', new_url)
  //     a.setAttribute('target', '_blank')
  //     a.appendChild(a_text);
  //     document.body.appendChild(a)
  //   })
  // })

},false)

function createElmBtn(text){
  const parent = document.createElement('div')
  parent.textContent = text
  const btn = document.createElement("BUTTON")
  const btn_name = text.toString().slice(0,5)
  btn.innerHTML = 'copy'
  parent.appendChild(btn)
  btn.onclick = function(){
    saveToClipboard(text)
  }
  document.body.appendChild(parent)
}

function saveToClipboard(text) {
    const copyFrom = document.createElement('textarea')
    const t = document.createTextNode(text)
    copyFrom.appendChild(t);
    document.body.appendChild(copyFrom)

    copyFrom.select()
    document.execCommand('copy')
    copyFrom.remove()
}

// document.getElementById("add_color").addEventListener("click", function() {
//   const color = document.getElementById("color").value
//   colors.push(color)
//   document.getElementById("arr_colors").innerHTML = colors;
// })
