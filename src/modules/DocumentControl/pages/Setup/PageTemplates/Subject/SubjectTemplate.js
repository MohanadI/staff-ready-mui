import React, { useEffect, useContext, useState } from "react";

import Context from "../../Context";
import AccordionComponent from "../../../../../../@core/components/Accordion";
import SubjectDocumentBody from "./Panels/SubjectDocumentBody";
import SubjectBody from "./Panels/SubjectBody";
import withAPI from "../../../../../../api/core";


function SubjectTemplate({ api }) {
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
    // {
    //   key: 'subject_search',
    //   title: "Subject Search",
    //   module: 'documentcontrol',
    //   id: 'subject',
    //   body: <div>Test search template</div>,
    //   configs: { alwaysExpanded: true, noLoading: true, noIcon: true, hideHeader: true }

    // },
    {
      key: "subject",
      title: "Subject",
      module: "documentcontrol",
      id: "subject",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <SubjectBody node={setupPageData.selectedNode} />,
    },
    {
      key: "subject_documents",
      title: "Subject Documents",
      module: "documentcontrol",
      id: "subject",
      pk: setupPageData.selectedNode.value,
      description: "",
      description: "",
      body: <SubjectDocumentBody node={setupPageData.selectedNode} />,
    },

  ];

  return (
    <>
      {panels.map((item) => (
        <AccordionComponent key={item.key} item={item} isLoading={isLoading} />
      ))}
    </>
  );
}

export default withAPI(SubjectTemplate)