import React, { useEffect, useContext, useState } from "react";

import Context from "../../../Context";
import AccordionComponent from "../../../../../../../@core/components/Accordion";
import SubjectDocumentBody from "./Body/SubjectDocumentBody";
import SubjectBody from "./Body/SubjectBody";
import withAPI from "../../../../../../../api/core";

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
    {
      key: "subject",
      title: "Subject",
      module: "documentcontrol",
      id: "subject",
      pk: setupPageData.selectedNode.value,
      description: "ss",
      body: <SubjectBody />,
    },
    {
      key: "subject_documents",
      title: "Subject Documents",
      module: "documentcontrol",
      id: "subject",
      pk: setupPageData.selectedNode.value,
      description: "ss",
      description: "",
      body: <SubjectDocumentBody />,
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