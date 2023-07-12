export const useClassificationAPI = (api, enabledAPIs) => {

    if (enabledAPIs && !enabledAPIs.hasOwnProperty('classification')) return;

    api.classification = {};

    api.classification.get = (callback, callbackError) => {
        const url = "/StaffReady/v10/api/tree/classification"
        return api.get(url, callback, callbackError)
    }

    api.classification.get_parent = (pk, callback, callbackError) => {
        const url = `/StaffReady/v10/api/classification/${pk}`
        return api.get(url, callback, callbackError)
    }

    api.classification.department = (callback, errorCallback) => {
        const url = `/StaffReady/v10/api/department/tree`
        return api.get(url, callback, errorCallback);
    }

    api.subject.create_classification = (payload, callback, errorCallback, params) => {
        const url = `/StaffReady/v10/api/classification/save`;
        return api.post(url, payload, callback, errorCallback, params);
    };
}
