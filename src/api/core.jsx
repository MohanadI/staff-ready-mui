import React from 'react';
import { useLocationAPI } from "./location";
import axios from "axios";

import { useSnackbar } from '../@core/hooks/useSnackbar';
import { useDocumentImproveAPI } from "./documentimprove";
import { useSubjectApi } from './subject';
import { useClassificationAPI } from './classificaiton';
import { useCommonAPI } from './common';

/**
* Base of the React API client
* Exposes the useAPI hook for functional components and withAPI HOC for class components
*/

/**
 * Hook to access the StaffReady React API
 *
 * Example usage:
 * const api = useAPI(); //get the core api object
 * useLocationAPI(api);  //enable location API calls
 *
 *
 *
 * @returns An object containing API functions. Pass this object to other API hooks to enable APIs
 */
export const useAPI = () => {
    const { showSnackbar, SnackbarComponent } = useSnackbar();

    const api = {
        get: function (url, callback, errorCallback) {
            return axios.get(url)
                .then((response) => {
                    callback && callback(response.data)
                    return response
                })
                .catch((error) => {
                    console.error(error);
                    showSnackbar('Error loading data', 'error');
                    errorCallback && errorCallback(error);
                    return error;
                })
        },
        post: function (url, payload, callback, errorCallback, params) {
            return axios({
                method: "POST",
                url: url,
                data: payload,
                params: params
            }).then((response) => {
                showSnackbar('Success', 'success');
                callback && callback(response.data)
                return response
            })
                .catch((error) => {
                    console.error(error);
                    showSnackbar('Error loading data', 'error');
                    errorCallback && errorCallback(error);
                    return error;
                })
        },
        colorbarStatus: function (module, colorbarId, pk, callback, errorCallback) {
            const url = `/StaffReady/v10/api/${module}/colorbar/${colorbarId}/${pk}`;
            return api.get(url, callback, errorCallback);
        }
    }

    return {
        api,
        SnackbarComponent,
    };
}


function withAPI(Component, enabledAPIs) {
    return (props) => {
        const { api, SnackbarComponent } = useAPI();

        //Each API can do its own check if it's enabled or not
        //We can't use conditional logic here otherwise we'll violate the Rule of Hooks
        useLocationAPI(api, enabledAPIs)
        useDocumentImproveAPI(api, enabledAPIs)
        useSubjectApi(api, enabledAPIs)
        useClassificationAPI(api, enabledAPIs);
        useCommonAPI(api, enabledAPIs);

        return (
            <>
                <SnackbarComponent />
                <Component
                    api={api}
                    {...props}
                />
            </>

        );
    };
}

export default withAPI;
