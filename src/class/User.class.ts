import {sequelize} from "../postgresql-config";
import {UserProp} from "../interfaces";

const {QueryTypes} = require('sequelize');

export class User {
    static async getUserOfAndroidVersionCode(androidVersionCode: number): Promise<any> {
        return await sequelize.query(`select "id", "userName", "firebaseToken"
                    from users
                    where "androidVersionCode">=${androidVersionCode}`, {
            type: QueryTypes.SELECT
        });
    }

    static async getUsersByBirthdate(birthdate: string, androidVersionCode: number): Promise<UserProp[] | any> {
        return await sequelize.query(`select "id", "userName", "fullName", "firebaseToken"
                     from users
                     where "androidVersionCode">=${androidVersionCode} AND (birthday) ~ '${birthdate}'`, {
            type: QueryTypes.SELECT
        })
    }
}