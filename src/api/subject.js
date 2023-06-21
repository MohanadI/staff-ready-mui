export const useSubjectApi = (api, enableAPIs) => {
    if (enableAPIs && !enableAPIs.hasOwnProperty('useSubjectApi')) return;

    api.subject = {};

    api.subject.documents = (pk) => {
        const url = `/StaffReady/v10/api//subject/${pk}/documents`;
        return api.get(url);
    }

    api.subject.get = (callback, errorCallback) => {
        const url = `StaffReady/v10/api/tree/subjects`
        return api.get(url, callback, errorCallback);
    }

}