// server.js

const { createServer } = require("http");
const { parse } = require("cookie");

const server = createServer((req, res) => {
  // Parse the cookie header and store the cookies in the request context
  const cookies = parse(req.headers.cookie || "");
  req.cookies = cookies;

  // Your Next.js request handler
  // ...
});

server.listen(3000, (err) => {
  if (err) throw err;
  console.log("> Ready on http://localhost:3000");
});
