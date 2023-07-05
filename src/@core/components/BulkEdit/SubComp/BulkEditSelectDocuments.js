import { useEffect, useRef, useState } from "react";
import CustomGrid from "../../CutomGrid/CustomGrid";
import Box from '@mui/material/Box'
import { useBulkEditContext } from "../../../../modules/DocumentControl/pages/Setup/Context";
import { useGridApiRef } from "@mui/x-data-grid";
import Typography from '@mui/material/Typography';
import { grey } from "@mui/material/colors";

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
        <Box>
            <Typography sx={{ fontStyle: "italic", mb: 2, color: grey[600] }} variant="subtitle1" color="initial">
                {`Select at least 1 document to edit. (Documents that are currently undergoing revision cannot be modified.`}
            </Typography>
            <CustomGrid
                apiRef={apiRef}
                rows={documents}
                checkboxSelection
                rowSelectionModel={selectedRows}
                onRowSelectionModelChange={onRowSelected}
                pageSize={8}
                getRowId={row => row.improvePk}
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
        </Box>
    )

}

export default BulkEditSelectDocuments;