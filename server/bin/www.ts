/**
 * Module dependencies.
 */

import debugModule from "debug";

import app from "../app.ts";

const debugServer = debugModule("server:www");

/**
 * Get port from environment and store in Express. Express can listen on a port or a named pipe.
 */

const port = normalizePort(process.env.PORT ?? "3000");

/**
 * Create and start HTTP server.
 */

const server = app.listen(port, () => {
  const address = server.address()!;
  const bind =
    typeof address === "string" ? `pipe ${address}` : `port ${address.port}`;

  debugServer(`Listening on ${bind}`);
});

server.on("error", onError);

// HELPER FUNCTIONS BASED ON EXPRESS-GENERATOR ----------------------------------------------------

/**
 * Normalize a port/pipe into a number, string, or false.
 */

function normalizePort(value: string): number | string {
  const parsedPort = Number.parseInt(value, 10);

  if (Number.isNaN(parsedPort)) {
    // Named pipe
    return value;
  }

  if (parsedPort >= 0) {
    // Port number
    return parsedPort;
  }

  throw new Error(`Invalid port: ${value}`);
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);

    default:
      throw error;
  }
}
