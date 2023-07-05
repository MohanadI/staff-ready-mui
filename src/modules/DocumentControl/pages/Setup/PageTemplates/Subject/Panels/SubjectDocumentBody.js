import React, { useContext, useEffect, useState } from 'react';
import CustomGrid from '../../../../../../../@core/components/CutomGrid/CustomGrid';
import withAPI from '../../../../../../../api/core';
import Context from '../../../Context';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import BulkEditModal from '../../../../../../../@core/components/BulkEdit/BulkEditModal';
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material';



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
                field: 'name',
                headerName: 'Document Name',
                flex: 1,
                renderCell: (params) => {
                  const row = params?.row
                  return (
                    <Link style={{ width: '100%' }} to={`/documentcontrol/setup/subjects/document/${row.improvePk}`}>
                      <Typography
                        sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                        title={row.description}
                      >
                        {row.description}

                      </Typography>
                    </Link>
                  )
                }

              },
              {
                field: 'id',
                headerName: 'Classification',
                flex: 1,
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