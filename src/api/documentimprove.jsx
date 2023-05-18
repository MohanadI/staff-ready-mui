export const useDocumentImproveAPI = (api, enabledAPIs) => {

    if(enabledAPIs && !enabledAPIs.hasOwnProperty('useDocumentImproveAPI')) return;

    api.documentImprove = {}

    api.documentImprove.get = (pk, callback, errorCallback) => {
        const url = `/StaffReady/v10/api/document/${pk}`
        return api.get(url, callback, errorCallback)
    }

    api.documentImprove.getByChangeLogPk = (pk, callback, errorCallback) => {
        const url = `/StaffReady/v10/api/document/changelogs/${pk}/document`
        return api.get(url, callback, errorCallback)
    }

    api.documentImprove.activeRequirements = (pk, callback, errorCallback) => {
        const url = `/StaffReady/v10/api/document/${pk}/requirements/active`
        return api.get(url, callback, errorCallback)
    }

    api.documentImprove.nonActiveRequirements = (pk, callback, errorCallback) => {
        const url = `/StaffReady/v10/api/document/${pk}/requirements/nonactive`
        return api.get(url, callback, errorCallback)
    }

    api.documentImprove.managed = (callback, errorCallback) => {
        const url = `/StaffReady/v10/api/document/managed`
        return api.get(url, callback, errorCallback)
    }

}

