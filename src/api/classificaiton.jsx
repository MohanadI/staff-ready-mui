export const useClassificationAPI = (api, enabledAPIs) => {

    if (enabledAPIs && !enabledAPIs.hasOwnProperty('classification')) return;

    api.classification = {};

    api.classification.get = (callback, callbackError) => {
        const url = "/StaffReady/v10/api/tree/classification"
        return api.get(url, callback, callbackError)
    }


}
