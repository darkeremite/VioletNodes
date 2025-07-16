import Bot from './utils/Bot.js'
import dotenv from 'dotenv'
import sshClient from './VioletCord/modules/sshclient/sshClient.js'
import { ConnectConfig } from 'ssh2';

dotenv.config()


//VioletCord
const sshConfig: ConnectConfig = {
  host: '127.0.0.1', // IP или домен SSH-сервера
  port: 22,                   // Порт SSH (обычно 22)
  username: 'root',   // Имя пользователя
  password: 'u'
  // privateKey: require('fs').readFileSync('/path/to/private/key') // Альтернатива паролю
};

// Создаем SSH-клиент
const conn = new sshClient();

// Обработчики событий
conn.on('ready', () => {
  console.log('SSH соединение установлено!');

  // Выполняем команду на сервере
  conn.exec('ls -la', (err, stream) => {
    if (err) {
      console.error('Ошибка выполнения команды:', err);
      return conn.end();
    }

    stream.on('close', (code: number, signal: string) => {
      console.log(`Команда завершена с кодом ${code}`);
      conn.end(); // Закрываем соединение
    }).on('data', (data: Buffer) => {
      console.log('Вывод команды:\n', data.toString());
    }).stderr.on('data', (data: Buffer) => {
      console.error('Ошибка:', data.toString());
    });
  });
});

conn.on('error', (err) => {
  console.error('Ошибка подключения:', err);
});

conn.on('end', () => {
  console.log('Соединение закрыто');
});

// Подключаемся к серверу
console.log('Подключаемся к SSH серверу...');
conn.connect(sshConfig);
const VioletCord = new Bot(process.env.BOT_TOKEN, process.env.BOT_NAME)

VioletCord.run()
