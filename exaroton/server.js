import 'dotenv/config';

class ServerStatus {
  static OFFLINE = 0;
  static ONLINE = 1;
  static STARTING = 2;
  static STOPPING = 3;
  static RESTARTING = 4;
  static SAVING = 5;
  static LOADING = 6;
  static CRASHED = 7;
  static PENDING = 8;
  static TRANSFERRING = 9;
  static PREPARING = 10;
}

export const mineStatus = async (server) => {
  await server.get();

  switch (server.status) {
    case ServerStatus.OFFLINE:
      return 'AI TOMEI DANO 💀 | OFFLINE';
    case ServerStatus.ONLINE:
      return 'PAI TA ON 😎 | ONLINE';
    case ServerStatus.STARTING:
      return 'AI AI 🌩️ | STARTING';
    case ServerStatus.STOPPING:
      return 'MORRENDO... 🤢 | STOPPING';
    case ServerStatus.RESTARTING:
      return 'É GUYS... 🙁 | RESTARTING';
    case ServerStatus.SAVING:
      return 'MAXIMO CHUMBADO 😝 | SAVING';
    case ServerStatus.LOADING:
      return 'ABRE A PORTA PORRA! 🚪 | LOADING';
    case ServerStatus.CRASHED:
      return 'FUDEU 😐 | CRASHED';
    case ServerStatus.PENDING:
      return 'PENDING';
    case ServerStatus.TRANSFERRING:
      return 'TRANSFERRING';
    case ServerStatus.PREPARING:
      return 'PREPARING';
    default:
      return 'DEU MERDA IRMÃO';
  }
};

export const mineStart = async () => {
  try {
    await server.start();
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
};

export const mineStop = async () => {
  try {
    await server.stop();
  } catch (e) {
    console.error(e.message);
    return e.message;
  }
};
