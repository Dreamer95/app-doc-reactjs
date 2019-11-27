// Libraries
import axios from 'axios';
import {appConfig} from 'Src/constant';

export function handleError(error) {
    try {
        if (error) {
            if (appConfig.APPLICATION_ENV) {
                switch (appConfig.APPLICATION_ENV) {
                    case 'development': {
                        console.error(error);
                        break;
                    }
                    case 'sandbox': {
                        sendMessageToSlack(error);
                        console.error(error);
                        break;
                    }
                    case 'production': {
                        sendMessageToSlack(error);
                        break;
                    }
                }
            }
        }
    } catch (error) {
        //
    }
}

function sendMessageToSlack(error) {
    try {
        if (error) {
            const webHook = 'https://hooks.slack.com/services/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';
            const href = window.location.href;
            const options = {
                channel: 'monitor-antalyser',
                text: 
                '`' + appConfig.APPLICATION_ENV + '`' + '\n```' + `${error.stack}\n` + '```\n' + href + '\n======================================================================',
                username: 'antalyser',
                icon_emoji: ':ghost:'
            };

            axios.post(webHook, JSON.stringify(options));   
        }
    } catch (error) {
        //
    }
}