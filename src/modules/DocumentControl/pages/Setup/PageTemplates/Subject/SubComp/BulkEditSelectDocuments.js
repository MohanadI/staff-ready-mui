import { useEffect, useRef, useState } from "react";
import CustomGrid from "../../../../../../../@core/components/CutomGrid/CustomGrid";
import { useBulkEditContext } from "../../../Context";
import { useGridApiRef } from "@mui/x-data-grid";

const BulkEditSelectDocuments = (props) => {

    const sharedData = useBulkEditContext();
    const { selectedRows } = sharedData.values;
    const { setSelectedRows } = sharedData.methods
    const apiRef = useGridApiRef('');

    const { documents } = sharedData.values;

    function onRowSelected(newRowSelectedModel) {
        setSelectedRows(newRowSelectedModel)
    }
    function onHeaderCheckBoxClicked(e) {
        const rowsId = apiRef.current.getAllRowIds();
        if (e.target.checked) {
            setSelectedRows(rowsId)
        } else {
            setSelectedRows([]);
        }
    }

    return (
        <CustomGrid
            apiRef={apiRef}
            rows={documents}
            checkboxSelection
            rowSelectionModel={selectedRows}
            onRowSelectionModelChange={onRowSelected}
            // utilities={gridUtilities}
            columns={
                [
                    {
                        type: 'checkboxSelection',
                        flex: 0.5,
                        onHeaderChecked: onHeaderCheckBoxClicked
                    },
                    {
                        field: 'subject',
                        headerName: 'Subject',
                        flex: 1,
                        valueGetter: (params) => {
                            return params?.row?.subject?.id
                        },
                    },
                    {
                        field: 'id',
                        headerName: 'Classification',
                        flex: 1,
                    },
                    {
                        field: 'name',
                        headerName: 'Name',
                        flex: 1,
                    },
                    {
                        field: 'description',
                        headerName: 'Description',
                        flex: 1
                    }
                ]
            }

        />
    )

}

export default BulkEditSelectDocuments;