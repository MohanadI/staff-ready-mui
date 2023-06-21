import React, { useEffect, useContext, useState } from "react";

import Context from "../../Context";
import AccordionComponent from "../../../../../../@core/components/Accordion";
import RevisionBody from "./Panels/RevisionBody.js";


export default function RevisionTemplate() {
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
      key: "revision",
      title: "Revision",
      module: "documentcontrol",
      id: "revision",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <RevisionBody pk={setupPageData.selectedNode.value} /> , 
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
