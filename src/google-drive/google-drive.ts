// const fs = require("fs");
import fs from "fs";
// const readline = require("readline");
import readline from "readline"
import {google} from "googleapis";
import path from "path";

// If modifying these scopes, delete token.json.
const SCOPES = [
    "https://www.googleapis.com/auth/drive.readonly",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// const TOKEN_PATH = "token.json";
const TOKEN_PATH = path.join(__dirname + "/token.json")

interface GoogleDriveFilesProp {
    kind: string,
    id: string,
    name: string,
    mimeType: string,
    webContentLink: string
}

export function GetFiles(): Promise<GoogleDriveFilesProp[]> {
    return new Promise(async (resolve, reject) => {
        // Load client secrets from a local file.
        fs.readFile(process.env.GOOGLE_DRIVE_CRED, "utf8", (err, content) => {
            if (err) return console.log("Error loading client secret file:", err);
            // Authorize a client with credentials, then call the Google Drive API.
            authorize(JSON.parse(content), listFiles)
                .then((result: GoogleDriveFilesProp[]) => resolve(result))
                .catch(err => console.log('error', err));
        });
    })
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
    return new Promise(async (resolve, reject) => {
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );
        // Check if we have previously stored a token.
        fs.readFile(path.join(__dirname + '/token.json'), "utf8", (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client, result => {
                return resolve(result);
            })
        });
    })
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param callback
 */
function listFiles(auth, callback) {
    const drive = google.drive({version: "v3", auth});
    drive.files.list(
        {
            pageSize: 100,
            orderBy: 'createdTime desc',
            q: "'12wI0yfN8ZqnXkvj8yIfN4loLOZnmYh-R' in parents",
            fields: "nextPageToken, files(id, name, kind, mimeType, webContentLink)"
        },
        (err, res) => {
            if (err) return console.log("The API returned an error: " + err);
            const files = res.data.files;
            const folders: GoogleDriveFilesProp[] = [];
            if (files.length) {
                files.map((file: GoogleDriveFilesProp) => {
                    folders.push(file);
                });
                return callback(folders);
            } else {
                console.log("No files found.");
                return callback(err);
            }
        }
    );
}
