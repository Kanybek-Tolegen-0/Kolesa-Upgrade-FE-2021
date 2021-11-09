/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import { getItemsRequest } from './requests.js';
import { showLoader, hideLoader } from './loader.js';
import { showError, hideError } from './error.js';
import { addContent } from './dom.js';

const func = () => {
    hideError();
    showLoader();
    getItemsRequest()
        .then(({ data }) => {
            if (data.result !== 'ok' || typeof data.html === 'undefined') {
                showError('Произошла ошибка, попробуйте ещё раз.');
            } else {
                addContent(data);
            }
        })
        .catch((e) => {
            showError(e.message);
        })
        .finally(() => {
            hideLoader();
        });
};

func();
