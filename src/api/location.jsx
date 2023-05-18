export const useLocationAPI = (api, enabledAPIs) => {
    if(enabledAPIs && !enabledAPIs.hasOwnProperty('useLocationAPI')) return;

    api.location = {}


    /**
     * Retrieve all locations assigned to a document improve (by improvePk)
     */
    api.location.forDocumentImprove = (pk, callback, errorCallback) => {
        const url = `/StaffReady/v10/api/document/${pk}/locations`;
        return api.get(url, callback, errorCallback);
    }

}

