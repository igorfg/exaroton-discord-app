import { Client } from 'exaroton';

export const connectToExaroton = async () => {
  const token = process.env.EXAROTON_TOKEN;
  const client = new Client(token);

  const serverId = process.env.EXAROTON_SERVER_ID;
  const server = client.server(serverId);

  return server;
}
