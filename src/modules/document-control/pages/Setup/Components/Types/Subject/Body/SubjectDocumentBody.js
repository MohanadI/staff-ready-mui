import React from 'react';
import CustomGrid from '../../../../../../../../@core/components/CutomGrid/CustomGrid';
import Data from '../../../../../../../../@core/components/CutomGrid/Data';
import TestGrid from '../../../../../../../../@core/components/CutomGrid/TestGrid';

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