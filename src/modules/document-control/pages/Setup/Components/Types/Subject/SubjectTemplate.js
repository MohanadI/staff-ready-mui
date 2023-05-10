import React, { useEffect, useContext, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';

import Context from '../../../Context';
import AccordionComponent from '../../../../../../../@core/components/Accordion';
import SubjectDocumentBody from './Body/SubjectDocument';
import SubjectBody from './Body/Subject';

export default function SubjectTemplate() {
    const [isLoading, setIsLoading] = useState(false);
    const [subjectID, setSubjectID] = useState(null);
    const { setupPageData } = useContext(Context);

    useEffect(() => {
        setIsLoading(true);
        setSubjectID(setupPageData?.selectedNode?.value);
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, [setupPageData]);

    const panels = [
        {
            key: "subject",
            title: "Subject",
            iconApi: "",
            description: "",
            body: <SubjectBody />
        },
        {
            key: "subject_documents",
            title: "Subject Documents",
            iconApi: "",
            description: "",
            body: <SubjectDocumentBody />
        }
    ];
    return (
        <>
            {isLoading && subjectID ?
                <Skeleton variant='rounded' animation="wave" sx={{height: 150, mt: 1}}/> :
                panels.map((item) =>
                    <AccordionComponent key={item.key} item={item} />
                )
            }
        </>
    );
}