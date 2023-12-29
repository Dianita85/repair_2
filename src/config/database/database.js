import { Sequelize } from 'sequelize';
import { envs } from './../enviroments/enviroments.js';

export const sequelize = new Sequelize(envs.DB_URI, {
  logging: false,
});

export async function  authenticated(){
  try {
    await sequelize.authenticate();
    console.log('Conection ok!😉');
  } catch (error) {
    console.log(error);
  }
};

export async function syncUp() {
  try {
    await sequelize.sync({ force: true});
    console.log('Synced ok!😉');
  } catch (error) {
    console.error(error);
  }
};
