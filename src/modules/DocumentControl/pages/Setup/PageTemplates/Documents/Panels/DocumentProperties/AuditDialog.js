import React, {useContext} from 'react';
import { 
    Dialog, 
    DialogTitle, 
    DialogContent,
    CircularProgress,
    Typography, 
} from '@mui/material';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import CustomGrid from '../../../../../../../../@core/components/CutomGrid/CustomGrid';
import Context from '../../../../Context';
// import withAPI from '../../../../../../../../api/core';

// import { DatePicker } from '@mui/lab';


export function AuditDialog({props, isOpen, onClose }) {

  const globalData = useContext(Context);
  // const { api } = props;
  const [documents, setDocuments] = useState([]);
  const [dataLoading, setDataLoading] = useState(false)
    
    // useEffect(() => {
    //   console.log("Audit Dialog Component Mounted")
    //   fetchDocs();
    // }, [globalData?.setupPageData?.selectedNode])

    // const fetchDocs = async () => {
    //   const selectedNode = globalData?.setupPageData?.selectedNode
    //   setDataLoading(true);
    //   const resp = await api.subject.documents(selectedNode.value);
    //   if (resp.status === 200) {
    //     setDocuments(resp.data);
    //   }
    //   setDataLoading(false);
    // }

    return (
      <Dialog maxWidth='lg' open={isOpen} onClose={onClose}>
        <DialogTitle fontSize={24}>Audit Report</DialogTitle>
        <DialogContent>
        {documents.length === 0 && dataLoading ?
        <div style={{ textAlign: "center" }}>
          <CircularProgress size={25} />
        </div>
        :
        <CustomGrid
          rows={documents}
          loading={dataLoading}
          columns={
            [
              {
                field: 'name',
                headerName: 'Name',
                flex: 1,
              },
              {
                field: 'id',
                headerName: 'User ID',
                flex: 1,
              },
              {
                field: 'action',
                headerName: 'Action',
                flex: 1,
                valueGetter: (params) => {
                  return params?.row?.subject?.id
                },
              },
              {
                field: 'details',
                headerName: 'Details',
                flex: 2
              },
              {
                field: 'date',
                headerName: 'Date',
                flex: 1
              }
            ]}
        />
      }
        </DialogContent>
      </Dialog>
    )
}