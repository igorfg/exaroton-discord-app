export const subscribeToServerWebsocket = (server) => {
  server.subscribe();
  server.on("status", function(server) {
    console.log(server.status);
  });
};