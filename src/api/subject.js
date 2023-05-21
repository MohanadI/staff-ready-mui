export const useSubjectApi = (api, enableAPIs) => {
    if (enableAPIs && !enableAPIs.hasOwnProperty('useSubjectApi')) return;

    api.subject = {};

    api.subject.documents = (pk) => {
        const url = `/StaffReady/v10/api//subject/${pk}/documents`;
        return api.get(url);
    }

}