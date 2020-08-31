import React, { useState, useEffect } from 'react';
import { authProvider } from '../msal-1.x/authProvider';
import * as Msal from 'msal';

const myMSALObj = new Msal.UserAgentApplication(authProvider.config);

async function MsalAuth() {
    console.log("authz in Msal:", false);
    await myMSALObj.loginPopup(authProvider.loginRequest);
    console.log("account info:", myMSALObj.getAccount());
    // myMSALObj.loginPopup(authProvider.loginRequest)
    //     .then(loginResponse => {
    //         console.log("account info:", loginResponse);

    //         if (myMSALObj.getAccount()) {
    //             console.log("get account");
    //         }
    //         console.log("authz in Msal:", true);
    //         return true;
    //     }).catch(error => {
    //         console.log(error);
    //     });
    return true;

}

export default MsalAuth;