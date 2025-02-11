var http = require("http");

var server = http.createServer(async (req, res) => {
  var url = require("url");
  console.log(req.url);
  var parsedurl = url.parse(req.url, true);
  console.log(parsedurl.query);

  var data = await fetch("https://fakestoreapi.com/products");
  var data1 = await data.json();
  var cate = parsedurl.query.cat;
  var response = [];

  if (cate === "m") {
    response = data1.filter((val) => val.category === "men's clothing");
  } else if (cate === "w") {
    response = data1.filter((val) => val.category === "women's clothing");
  } else if (cate === "e") {
    response = data1.filter((val) => val.category === "electronics");
  } else if (cate === "j") {
    response = data1.filter((val) => val.category === "jewelery");
  } else {
    response = data1; 
  }

  // res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(response));
});

server.listen(3001, () => {
  console.log("Server has been started on port 3001");
});
