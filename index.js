const fs = require ('fs')
const http = require('http')
const url = require ('url')
const dashboardHtml=fs.readFileSync('./index.html','utf-8')
const StudentsHtml=fs.readFileSync('./studentsCard.html','utf-8')
const data =fs.readFileSync('./data.json','utf-8')
const dataObj=JSON.parse(data)
const replaceTemplate=(tempCard,StudentsData)=>{
    let Output=tempCard.replace(/{%StudentsId}/g).replace(/{%Name%}/g,`StundentsData.name`)
    return Output
}
const server=http.createServer((req,res)=>{
const {query,pathname} =url.parse(req.url,true)
if(pathname === '/dashboard' || pathname ==='/'){
    res.writeHead(200, { 'content-type':'text/html'})
    const Cards = dataObj.map(i=>replaceTemplate(PeopleHtml,i)).join(' ')
    const Output = dashboardHtml.replace(/{%People%}/g,Cards).replace(/{%TOTAL%}/g,dataObj.length)
    res.end(Output)
}else if(pathname === '/People'){
    res.writeHead(200, {'content-type':'text/html'})
    const People=dataObj[query.id]
    const Output = replaceTemplate(PeopleHtml,People)
    res.end(Output)
    
}else if(pathname === '/api'){
    res.writeHead(200, {'content-type':'application/json'})
    res.end(data)
    console.log(dataObj[0])
}
})
server.listen(4000,'127.0.0.1',()=>{
    console.log("Port at 4000")
})