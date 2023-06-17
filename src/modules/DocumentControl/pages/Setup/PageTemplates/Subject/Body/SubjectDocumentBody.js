import React, { useContext, useEffect, useState } from 'react';
import CustomGrid from '../../../../../../../@core/components/CutomGrid/CustomGrid';
import withAPI from '../../../../../../../api/core';
import Context from '../../../Context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import BulkEditModal from '../SubComp/BulkEditModal';
import HeaderIcons from "../../Documents/HeaderIcons";
import { Stack } from '@mui/material';

function SubjectDocumentBody(props) {

  const globalData = useContext(Context);
  const { api } = props;
  const [documents, setDocuments] = useState([]);
  const [dataLoading, setDataLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState(false);


  useEffect(() => {
    fetchDocs();
  }, [globalData?.setupPageData?.selectedNode])


  const fetchDocs = async () => {
    const selectedNode = globalData?.setupPageData?.selectedNode
    setDataLoading(true);
    const resp = await api.subject.documents(selectedNode.value);
    if (resp.status === 200) {
      setDocuments(resp.data);
    }
    setDataLoading(false);

  }


  return (
    <>
      <Stack direction="row"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      >
        <HeaderIcons />
      </Stack>

      <Box sx={{ mb: 2 }}>
        <Button
          variant='outlined'
          onClick={() => setIsOpenModal(true)}
        >
          Bulk Edit Document
        </Button>
      </Box>

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
            ]}
        />
      }

      <BulkEditModal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        documents={documents}
      />


    </>
  );
}

export default withAPI(SubjectDocumentBody);