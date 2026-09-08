import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from "aws-lambda";

const page = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello World</title>
  <style>
    body { font-family: system-ui, sans-serif; display: grid; place-items: center; min-height: 100vh; margin: 0; background: #0f172a; color: #e2e8f0; }
    .card { text-align: center; padding: 3rem; border: 1px solid #334155; border-radius: 12px; }
    h1 { margin: 0 0 .5rem; }
    code { color: #38bdf8; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello, World</h1>
    <p>Served by <code>Lambda</code> in <code>us-east-2</code>, deployed by GitHub Actions via OIDC.</p>
    <p><a href="/api" style="color:#38bdf8">/api</a> returns JSON</p>
  </div>
</body>
</html>`;

export const handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2> => {
  // Simple routing on the raw path, no framework needed
  if (event.rawPath === "/api") {
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: "hello from Lambda",
        method: event.requestContext.http.method,
        path: event.rawPath,
        region: process.env.AWS_REGION,
        runtime: process.version,
        requestId: event.requestContext.requestId,
      }),
    };
  }

  return {
    statusCode: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
    body: page,
  };
};
