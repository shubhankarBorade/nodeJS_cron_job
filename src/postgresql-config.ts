import {Sequelize} from "sequelize";
import config from './config';
import util from 'util'

const debuglog = util.debuglog('query');

type callback = () => void;

interface postgresProp {
    init: callback
}

export const sequelize = new Sequelize(config.postgresql_url, {logging: debuglog, benchmark: true});

export const postgres: postgresProp = {
    init: () => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Database connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }
};