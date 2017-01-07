var db = require("../core/db");
var http = require("http");
var admin = require('../controllers/admin');
var httpmsgs = require("./httpMsgs");
var settings = require('../settings');
var regex = require('node-regexp');

http.createServer(function (req, resp){
    switch (req.method) {
        case 'GET':
        
            if(req.url === "/"){
                httpmsgs.sendHome(req, resp);
            }
            else if(req.url === "/employees"){
                admin.getList(req, resp);
            }
            else{
                var idPatt = "[0-9]+";
                var Patt = new RegExp("/employees/" + idPatt);
                if(Patt.test(req.url)){
                    Patt = new RegExp(idPatt);
                    var id = Patt.exec(req.url);
                    admin.get(req, resp, id);
                }
                else{
                    httpmsgs.show404(req, resp);
                }
            }
            
            break;


        case 'POST':
            if(req.url === "/employees"){
                var reqBody = '';
                req.on("data", function(data){
                    reqBody += data;
                    if(reqBody.length > 1e7) // 10MB
                    {
                        httpmsgs.show413(req, resp);
                    }
                });
                req.on("end", function(){
                    admin.add(req, resp, reqBody);
                });
            }
            else{
                httpmsgs.show404(req, resp);
            }
        break;

        case 'PUT':
            if(req.url === "/employees"){
                var reqBody = '';
                req.on("data", function(data){
                    reqBody += data;
                    if(reqBody.length > 1e7) // 10MB
                    {
                        httpmsgs.show413(req, resp);
                    }
                });
                req.on("end", function(){
                    admin.update(req, resp, reqBody);
                });
            }
            else{
                httpmsgs.show404(req, resp);
            }
        break;

        case 'DELETE':
            if(req.url === "/employees"){
                var reqBody = '';
                req.on("data", function(data){
                    reqBody += data;
                    if(reqBody.length > 1e7) // 10MB
                    {
                        httpmsgs.show413(req, resp);
                    }
                });
                req.on("end", function(){
                    admin.delete(req, resp, reqBody);
                });
            }
            else{
                httpmsgs.show404(req, resp);
            }

        break; 

        default:
            httpmsgs.show405(req, resp);
        break;
    }
}).listen(2000, function(){
    console.log("Started listening at: 2000");
});




/********************************************** */
// Code already in Use.

 /*               db.executeSql("select * from admin", function(data, err){
                    if(err){
                        resp.writeHead(500, "Internal Error Occurred", {"Content-Type": "text/html"});
                        resp.write("<html><head><title>500</title></head><body>500: Error. Details:"+ err +" </body> </html>");
                    }
                    else{
                        resp.writeHead(200);
                        resp.write(JSON.stringify(data));
                        resp.end();
                    }
                });
*/
/*            resp.writeHead(404);
            resp.write("Employee"); 
            resp.end();
*/
    
/*                var str = "123456789";
                var patt1 = /[0-9]/g;
                var result = str.match(patt1);*/
/*                var expression = /["0-9"]/gi;
                var regex = new RegExp(expression);
                var t = 'www.google.com/images';

                if (t.match(regex)) {
                console.log("Successful match");
                console.log(t.match(regex));
                } else {
                console.log("No match");
                }*/

