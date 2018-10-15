const interceptor = [
    response => response,
    error => {
        const { response: { status } } = error;
        if (status === 401 || status === 403) {
            localStorage.clear();
            if (!window.location.href.split('/').includes('login')) {
                window.location.reload();
            }
        }
        return Promise.reject(error);
    }
];

export default interceptor;