import 'dotenv/config';
import { InstallGlobalCommands } from './utils.js';

const TEST_COMMAND = {
  name: 'test',
  description: 'Basic command',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const MINE_STATUS = {
  name: 'mine_status',
  description: 'Confere o status do server',
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 1, 2],
};

const MINE_SERVER = {
  name: 'mine_server',
  description: 'Realiza uma ação de desligar ou ligar o server',
  options: [
    {
      type: 3,
      name: 'action',
      description: 'Escolha a ação',
      required: true,
      choices: [
        {
          name: 'Start',
          value: 'start',
        },
        {
          name: 'Stop',
          value: 'stop',
        }
      ],
    },
  ],
  type: 1,
  integration_types: [0, 1],
  contexts: [0, 2],
};

const ALL_COMMANDS = [TEST_COMMAND, MINE_STATUS, MINE_SERVER];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
