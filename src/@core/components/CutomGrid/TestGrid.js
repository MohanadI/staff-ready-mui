import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
];

const initialRows = [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', age: 32 },
    // ...other initial rows
];

function TestGrid() {
    const [rows, setRows] = React.useState(initialRows);

    const handleFilterChange = (event, columnField) => {
        const { value } = event.target;

        // Filter the rows based on the columnField and value
        // Replace the following line with your logic to filter rows

        const filteredRows = initialRows.filter((row) =>
            String(row[columnField]).toLowerCase().includes(value.toLowerCase())
        );

        setRows(filteredRows);
    };

    function CustomHeader() {
        return (
            <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                        type="text"
                        placeholder="ID"
                        onChange={(event) => handleFilterChange(event, 'id')}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        onChange={(event) => handleFilterChange(event, 'firstName')}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        onChange={(event) => handleFilterChange(event, 'lastName')}
                    />
                    <input
                        type="text"
                        placeholder="Age"
                        onChange={(event) => handleFilterChange(event, 'age')}
                    />
                </div>
            </div>
        );
    }


    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                slots={{
                    // Toolbar: GridToolbar,
                    columnHeaders: CustomHeader,

                }}
                componentsProps={{
                    toolbar: {
                        filterRowsButtonText: 'Filter Rows',
                    },
                }}

                onFilterChange={handleFilterChange}
            />
        </div>
    );
}


export default TestGrid;