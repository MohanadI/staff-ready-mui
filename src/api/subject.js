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

    api.subject.create_document = (payload, callback, errorCallback) => {
      const url = `/StaffReady/v10/api/document/create`;
      return api.post(url, payload, callback, errorCallback);
    };

    api.subject.create_subject = (payload, callback, errorCallback, params) => {
      const url = `/StaffReady/v10/api/subject/save`;
      return api.post(url, payload, callback, errorCallback, params);
    };

}