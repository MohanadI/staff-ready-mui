import React from 'react'

export const Context = React.createContext(null)

export const BulkEditContext = React.createContext(null);

export const useBulkEditContext = () => {
    return React.useContext(BulkEditContext);
}


export default Context