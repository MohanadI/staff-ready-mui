import React, { useEffect, useContext, useState } from "react";

import Context from "../../Context";
import AccordionComponent from "../../../../../../@core/components/Accordion";


export default function DocumentsTemplate() {
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
      key: "document_history",
      title: "Document History",
      iconApi: "",
      description: "ss",
      body: <h1>asdasd</h1>,
    },
    {
      key: "revision_history",
      title: "Revision History",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "document_properties",
      title: "Document Properties",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "reviewers",
      title: "Reviewers",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "final_reviewers",
      title: "Final Reviewers",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "approvers",
      title: "Approvers",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "acknowledgment_list",
      title: "Acknowledgment List",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "messages",
      title: "Messages",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "assigned_locations",
      title: "Assigned Locations",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "associated_documents",
      title: "Associated Documents",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
    },
    {
      key: "publish_history",
      title: "Publish History",
      iconApi: "",
      description: "",
      body: <h1>asdasd</h1>,
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
