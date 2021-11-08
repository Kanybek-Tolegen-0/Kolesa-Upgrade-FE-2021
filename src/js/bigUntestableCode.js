import { getItemsRequest } from './requests';
import { showLoader, hideLoader } from './loader';
import { showError, hideError } from './error';
import { addContent } from './dom';

export default () => {
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
