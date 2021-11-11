/* eslint-disable import/extensions */
import addApp from './app.js';

import { toggleFavoriteRequest } from './requests.js';

/* eslint-disable import/prefer-default-export */
export const addContent = (data) => {
    Array.from(addApp(data).querySelectorAll('button')).forEach((button) => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.currentTarget.textContent = 'Загрузка...';

            toggleFavoriteRequest(e.currentTarget.dataset.id)
                .then(({ data: buttonData }) => {
                    if (buttonData.result === 'set') {
                        e.currentTarget.textContent = '🌝';
                    } else {
                        e.currentTarget.textContent = '🌚';
                    }
                });
        });
    });
};
