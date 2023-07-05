
import * as MUI from '@mui/material';

export const isNativeComponent = (component) => {
    return typeof component.type === 'string';
};

export const isCustomComponent = (component) => {
    return typeof component.type === 'function';
};

export const isThirdPartyComponent = (component) => {
    return Object.values(MUI).includes(component.type);

    // return (
    //     typeof component.type === 'object' &&
    //     typeof component.type.$$typeof === 'symbol'
    // );
};

export const findObjectById = (objects, id) => {
    let match = objects.find((obj) => obj.value === id);
    if (match) {
        return match;
    }

    for (const obj of objects) {
        if (obj.children && obj.children.length > 0) {
            match = findObjectById(obj.children, id);
            if (match) {
                return match;
            }
        }
    }

    return null;
};

export const extractValueFromObjPath = (path, object) => {
    if (!object) {
        return ""
    }
    const pathArr = path?.split('.');
    return pathArr.reduce((acc, pathPortion) => {
        return acc[pathPortion];
    }, object);
}
