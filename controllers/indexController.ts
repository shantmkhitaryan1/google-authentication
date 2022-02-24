import {google} from "googleapis";
import {Request, Response} from 'express'

const fs = require('fs');
import {oauth2Client, redirectUrl} from '../utils/authClient'

const uuid = require('node-uuid');
import {IConnections} from "../interfaces/contact.interface";
import {IPersonInterface} from "../interfaces/person.interface"

let auth = false;

const renderHome = async function (req: Request, res: Response) {
    // let oauth2 = google.oauth2({version: 'v1', auth: oauth2Client});
    if (auth) {
        const randomID = uuid.v4();
        const generatedUrl = `http://localhost:8080/downloadJSon/${randomID}`;

        res.render('index', {buttonSpan: 'Sign out', url: 'http://localhost:8080/logout', generatedUrl, auth: true})
    } else {
        res.render('index', {buttonSpan: 'Sign in', url: redirectUrl, generatedUrl: '', auth: false})
    }
}

const callback = async function (req: any, res: Response) {
    const code = req.query.code;
    if (code) {
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        auth = true;
    }
    return res.redirect('/');
}

const logout = (req: Request, res: Response) => {
    oauth2Client.revokeCredentials().then(r => console.log('revoke ', r));
    auth = false;
    res.redirect('/');
}

const downloadJson = async (req: Request, res: Response) => {
    const service = google.people({version: 'v1', auth: oauth2Client});

    let full_person_array: IPersonInterface[] = [];
    await read_contacts(service);

    async function read_contacts(service: any, nxt_token = null) {
        try {
            const data = await fetch_page_data(service, nxt_token);
            let connections = data.connections;

            connections.forEach((person: any) => {
                full_person_array.push(person);
            });

            if (nxt_token) {
                await read_contacts(service, nxt_token);
            }

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Content-disposition', 'attachment; filename=contacts.json');
            res.send(full_person_array);
            // return res.redirect('/')
        } catch (e) {
            console.log(e)
        }
    }

    async function fetch_page_data(service: any, page_token: any) {

        try {
            const res = await service.people.connections.list({
                resourceName: 'people/me',
                pageSize: 1000,
                pageToken: page_token,
                personFields: 'names,emailAddresses,phoneNumbers',
            });
            const connections = res.data.connections;
            if (connections) {

                return res.data
            } else {
                console.log('No connections found.');
            }
        } catch (err) {
            return console.error('The API returned an error: ' + err);
        }
    }
}

module.exports = {renderHome, callback, logout, downloadJson}