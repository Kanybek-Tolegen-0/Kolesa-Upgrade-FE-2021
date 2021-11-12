export const showError = (message) => {
    const errorElement = document.querySelector('#error');

    errorElement.innerHTML = message;
    errorElement.style.display = 'block';
};

export const hideError = () => {
    document.querySelector('#error').style.display = 'none';
};
