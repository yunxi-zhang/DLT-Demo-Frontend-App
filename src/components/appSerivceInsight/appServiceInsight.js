
import {ApplicationInsights} from '@microsoft/applicationinsights-web';
import {ReactPlugin} from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from "history";
require('dotenv').config()

let reactPlugin = new ReactPlugin();
const browserHistory = createBrowserHistory({ basename: '' });

const ai = new ApplicationInsights({
    config: {
        instrumentationKey: process.env.REACT_APP_APPINSIGHTS_KEY,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: browserHistory }
          }
    }
})
ai.loadAppInsights()

export const appInsights = ai.appInsights