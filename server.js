const http = require("http");
const PORT = 3000;
const server = http.createServer((req,res)=>{
  const {url,method} = req;
  const dataChunks=[];

  req.on("data",(chunk)=>{
    console.log("Data log");
    dataChunks.push(chunk);
  });/*end of the req.on info*/

  req.on("end",()=>{
    if(method == "GET"){
      if(url == "/"){
        res.setHeader("content-type", "text/html");
        res.statusCode = 200;
        res.write("<h1>Home</h1> <p>Squirrel</p>");
      }else if(url== "/about"){
        res.setHeader("content-type","text/html");
        res.statusCode = 200;
        res.write ("<h1>About</h1> <p>info</p>");
      }
    }else if (method == "POST"){
      if(url == "/about"){
        res.setHeader("content-type", "application/json");
        res.statusCode = 200;
        const details={
          name: "Cecelia",
          pets: "yes",};
        res.write(JSON.stringify(details));
      }else if(url == "/echo"){
        res.setHeader("content-type", "application/json");
        res.statusCode= 200;          
        const body = Buffer.concat(dataChunks).toString();
        res.write(body);
      }
    }
    res.end();
  });//end of the req.on ("end") function callback
});//create server function ends

server.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}...`);
});














