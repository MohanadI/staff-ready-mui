export const useCommonAPI = (api, enabledAPIs) => {

    if (enabledAPIs && !enabledAPIs.hasOwnProperty('common')) return;

    api.common = {};

    api.common.getWorkers = (query, callback, callbackError) => {
        const url = `/StaffReady/v10/api/account/workers/quick-search?query=${query}`
        return api.get(url, callback, callbackError)
    }

    api.common.workerAccount = (id, callback, callbackError) => {
        const url = `/StaffReady/v10/api/account/${id}`;
        return api.get(url, callback, callbackError);
    }

    api.common.frequencies = (callback, callbackError) => {
        const url = `/StaffReady/v10/api/document/frequencies`;
        return api.get(url, callback, callbackError)
    }

    api.common.departmentWorkers = (callback, callbackError) => {
        const url = `/StaffReady/v10/api/department/workers/tree?pruneWorkerlessBranches=true`;
        return api.get(url, callback, callbackError);
    }

    api.common.jobTitlesWorkers = (callback, callbackError) => {
        const url = `/StaffReady/v10/api/jobtitle/workers/tree?pruneWorkerlessBranches=true`;
        return api.get(url, callback, callbackError);
    }

    api.common.scheduleWorkers = (callback, callbackError) => {
        const url = `/StaffReady/v10/api/schedule/jobdescriptions/workers/tree?pruneWorkerlessBranches=tru`;
        return api.get(url, callback, callbackError);
    }

    api.common.skillSetWorkers = (callback, callbackError) => {
        const url = `/StaffReady/v10/api/skillset/workers/tree?pruneWorkerlessBranches=true`;
        return api.get(url, callback, callbackError);
    }

    api.common.documentTypes = (callback, callbackError) => {
        const url = `/StaffReady/v10/api/document/types`;
        return api.get(url, callback, callbackError)
    }

}