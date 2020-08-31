import { MsalAuthProvider, LoginType } from 'react-aad-msal';

// Msal Configurations
const msalConfig = {
    auth: {
        authority: 'https://login.microsoftonline.com/275c9f59-c140-457a-886e-3445c669b292',
        clientId: 'b13fb0bc-df51-46c6-8229-ff06d85173e7',
        redirectUri: 'http://localhost:3000'
    },
    cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true
    }
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
const loginRequest = {
    scopes: ["openid", "profile", "User.Read"]
};

// Options
const options = {
    loginType: LoginType.Popup,
    tokenRefreshUri: window.location.origin + '/auth.html'
}

export const authProvider = new MsalAuthProvider(msalConfig, loginRequest, options)