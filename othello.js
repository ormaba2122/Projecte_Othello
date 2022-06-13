
var http = require("http");
var url = require("url");
var fs = require('fs');

function iniciar() {
    function onRequest(request, response) {
        let sortida;
        const baseURL = request.protocol + '://' + request.headers.host + '/';
        const reqUrl = new URL(request.url, baseURL);
        console.log("Petició per a  " + reqUrl.pathname + " rebuda.");
        const pathname = reqUrl.pathname;
        const search_params = reqUrl.searchParams;
        const nom = search_params.get('nom');
        const numjugador = search_params.get('numjugador');
        

        if (pathname == '/inici') {
            fs.readFile('./partida.html', function(err, sortida) {
                response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
                });
                response.write(sortida);
                response.end();
                
            });

        }else if (pathname == '/login') {
            fs.readFile('./login.html', function(err, sortida) {
                response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
                });
                response.write(sortida);
                response.end();
            });
		}
        else if (pathname == '/dades') {
            function dades(dataPost, res) {
                const data = JSON.parse(dataPost);
                console.log("--------------------------------",data);
                res.end();
            }
		}
        else if (pathname == '/negra') {
            fs.readFile('./fichanegre.png', function(err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'image/png'
                });
				
                response.write(sortida);
                response.end();
            });
		} else if (pathname == '/blanca') {
            fs.readFile('./fichablanca.png', function(err, sortida) {
                response.writeHead(200, {
                    'Content-Type': 'image/png'
                });
				
                response.write(sortida);
                response.end();
            });
			
        } else {
            response.writeHead(404, {
                "Content-Type": "text/html; charset=utf-8"
            });
            sortida = "404 NOT FOUND";
            response.write(sortida);
            response.end();
        }

    }


    http.createServer(onRequest).listen(8888);
    console.log("Servidor iniciat.");
}

exports.iniciar = iniciar;
