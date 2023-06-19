import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import withAPI from "../../../../../../../api/core";

function EmptyHistory() {
  return (
    <>
      <Typography variant="h6" sx={{ fontSize: "15px", fontWeight: "bold"}}>Document History</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Previous Action</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">Document Owner started their changelog</TableCell>
              <TableCell align="right">
                <Button size='small' color="error" variant="outlined"> Remove Content</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}

export default withAPI(EmptyHistory);
