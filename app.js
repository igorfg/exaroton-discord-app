import 'dotenv/config';
import express from 'express';
import {
  InteractionResponseType,
  InteractionType,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { getRandomEmoji } from './utils.js';
import { mineStatus, mineStart, mineStop } from './exaroton/server.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLIC_KEY), async function (req, res) {
  const { type, data } = req.body;

  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    if (name === 'test') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `hello world ${getRandomEmoji()}`,
        },
      });
    }

    if (name === 'mine_status') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: await mineStatus(),
        },
      });
    }

    if (name === 'mine_server') {
      const actionName = req.body.data.options[0].value;
      const nick = req.body?.member?.nick || 'Hackerman';
      
      if (actionName === 'start') {
        const error = await mineStart();

        if (error) {
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${nick} o server já está sendo inicializado! 😡 | ${error}`,
            },
          });
        }

        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `${nick} está gastando o dinheiro da galera...`,
          },
        });
      } else if (actionName === 'stop') {
        const error = await mineStop();

        if (error) {
          return res.send({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
              content: `${nick}, a Laryz roubou todos os diamantes e o server acabou... 🙁 | ${error}`,
            },
          });
        }

        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: `Cansou de jogar jovem ${nick}?`,
          },
        });
      }
    }

    console.error(`unknown command: ${name}`);
    return res.status(400).json({ error: 'unknown command' });
  }

  console.error('unknown interaction type', type);
  return res.status(400).json({ error: 'unknown interaction type' });
});

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});
