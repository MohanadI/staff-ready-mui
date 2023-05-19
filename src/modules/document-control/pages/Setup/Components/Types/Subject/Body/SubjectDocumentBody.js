import React from 'react';
import CustomGrid from '../../../../../../../../components/CutomGrid/CustomGrid';
import Data from '../../../../../../../../components/CutomGrid/Data';
import TestGrid from '../../../../../../../../components/CutomGrid/TestGrid';

export default function SubjectDocumentBody() {
  return (
    <>
      <h1>SubjectDocumentBody</h1>
      <CustomGrid
        rows={Data}
        columns={[{
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
        ]} />
    </>
  );
}