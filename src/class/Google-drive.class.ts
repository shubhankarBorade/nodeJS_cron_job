import fs from "fs";
import readline from "readline";
import {google} from "googleapis";
import path from "path";

export class GoogleDrive {
    // If modifying these scopes, delete token.json.
    private SCOPES = [
        "https://www.googleapis.com/auth/drive.readonly",
        "https://www.googleapis.com/auth/drive.metadata.readonly",
    ];

    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    private TOKEN_PATH = path.join(__dirname + '../../data/token.json');

    constructor() {
        // Load client secrets from a local file.
        fs.readFile(process.env.GOOGLE_DRIVE_CRED, {encoding: "utf8"}, (err: Error, content: string) => {
            if (err) return console.log("Error loading client secret file:", err);
            // Authorize a client with credentials, then call the Google Drive API.
            this.authorize(JSON.parse(content), this.listFiles);
        });
    }

    /**
     * Lists the names and IDs of up to 10 files.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
    listFiles(auth) {
        const drive = google.drive({version: "v3", auth});
        drive.files.list(
            {
                pageSize: 100,
                q: "'12wI0yfN8ZqnXkvj8yIfN4loLOZnmYh-R' in parents",
                fields: "nextPageToken, files(id, name, kind, mimeType)"
            },
            (err, res) => {
                if (err) return console.log("The API returned an error: " + err);
                console.log("response", res.data);
                const files = res.data.files;
                if (files.length) {
                    const folders = [];
                    files.map((file) => {
                        folders.push(file);
                    });
                    console.log('folders', folders);
                } else {
                    console.log("No files found.");
                }
            }
        );
    }

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */
    private authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.web;
        const oAuth2Client = new google.auth.OAuth2(
            client_id,
            client_secret,
            redirect_uris[0]
        );

        // Check if we have previously stored a token.
        fs.readFile(this.TOKEN_PATH, {encoding: "utf8"}, (err: Error, token: string) => {
            if (err) return this.getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            callback(oAuth2Client);
        });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    private getAccessToken(oAuth2Client, callback) {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: this.SCOPES,
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
                fs.writeFile(this.TOKEN_PATH, JSON.stringify(token), (err) => {
                    if (err) return console.error(err);
                    console.log("Token stored to", this.TOKEN_PATH);
                });
                callback(oAuth2Client);
            });
        });
    }
}

const googleDrive = new GoogleDrive();
