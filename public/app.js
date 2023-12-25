const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  // You pass two more arguments for config and middleware
  // More details here: https://github.com/vercel/serve-handler#options
  return handler(request, response, {
    etag: true,
    redirects: [
      { "source": "/node_modules", "destination": "/404" },
      { "source": "/package.json", "destination": "/404" },
      { "source": "/package-lock.json", "destination": "/404" },
      { "source": "/app.js", "destination": "/404" }
    ]
  });
});

server.listen(80, () => {
  console.log('Running at http://localhost:80');
});
