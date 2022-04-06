import * as http from 'http';
import {IncomingMessage, ServerResponse} from 'http';
import * as fs from 'fs';
import * as p from 'path';
import * as url from 'url';

//用http创建server
const server = http.createServer();
const publicDir = p.resolve(__dirname, 'public');
let cacheAge = 3600 * 24 * 265;

//监听server的request事件
server.on('request', (request: IncomingMessage, response: ServerResponse) => {
  const {method, url: path, headers} = request;
  const {pathname, search} = url.parse(path);

  if (method === 'POST') {
    response.statusCode = 200;
    response.end('这是一个假响应');
    return;
  }

  // response.setHeader('Content-Type','text/html;charset=utf-8')
  // /index.html => index.html
  let filename = pathname.substr(1);
  if (filename === '') {
    filename = 'index.html';
  }
  fs.readFile(p.resolve(publicDir, filename), (error, data) => {
      if (error) {
        console.log(error);
        if (error.errno === -4058) {
          response.statusCode = 404;
          fs.readFile(p.resolve(publicDir, '404.html'), (error, data) => {
            response.end(data);
          });
        } else if (error.errno === -4068) {
          response.statusCode = 403;
          response.end('无权查看目录内容');
        } else {
          response.statusCode = 500;
          response.end('服务器繁忙，请稍后再试');
        }
      } else {
        //返回文件内容
        response.setHeader('Cache-Control', `public,max-age=${cacheAge}`);
        response.end(data);
      }
    }
  );
});

//监听本机的端口
server.listen(8888);
