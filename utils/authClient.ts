import {google} from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    '995866684034-1ccr8hct2s9m470u9r6aqee4lvaopc79.apps.googleusercontent.com',
    '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',
    'http://localhost:8080/auth/google/callback'
);

const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    // scope: ['email', 'profile']
    scope: ['https://www.googleapis.com/auth/contacts']
});

export {oauth2Client, redirectUrl}