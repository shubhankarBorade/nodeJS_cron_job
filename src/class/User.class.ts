import {sequelize} from "../postgresql-config";

const {QueryTypes} = require('sequelize');

export class User {
    static async getUserOfAndroidVersionCode(androidVersionCode: number): Promise<any> {
        return await sequelize.query(`select "id", "userName", "firebaseToken"
                    from users
                    where "androidVersionCode">=${androidVersionCode}`, {
            type: QueryTypes.SELECT
        });
    }
}