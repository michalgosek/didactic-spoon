import convict from 'convict';
import path from 'path';

export const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'IP_ADDRESS',
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: '*',
      default: 'mongodb://localhost:27017/didactic_spoon'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'mydb'
    }
  }
});

// Load environment dependent configuration
const env = config.get('env');
config.loadFile(path.join(__dirname, `config-${env}.json`));
 

// Perform validation
config.validate({allowed: 'strict'});

 