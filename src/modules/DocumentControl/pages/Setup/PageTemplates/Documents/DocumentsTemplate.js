import React, { useEffect, useContext, useState } from "react";

import Context from "../../Context";
import AccordionComponent from "../../../../../../@core/components/Accordion";
import DocumentStatus from "./Panels/DocumentStatus"

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
      key: "document_status",
      title: "Document Status",
      module: "documentcontrol",
      id: "documentstatus",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <DocumentStatus node={setupPageData.selectedNode} />,
    },
    {
      key: "revision_history",
      title: "Revision History",
      module: "documentcontrol",
      id: "revisionhistory",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "document_properties",
      title: "Document Properties",
      module: "documentcontrol",
      id: "documentproperties",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "reviewers",
      title: "Reviewers",
      module: "documentcontrol",
      id: "reviewers",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "final_reviewers",
      title: "Final Reviewers",
      module: "documentcontrol",
      id: "finalreviewers",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "approvers",
      title: "Approvers",
      module: "documentcontrol",
      id: "approvers",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "acknowledgment_list",
      title: "Acknowledgment List",
      module: "documentcontrol",
      id: "acknowledgmentlist",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "messages",
      title: "Messages",
      module: "documentcontrol",
      id: "messages",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "assigned_locations",
      title: "Assigned Locations",
      module: "documentcontrol",
      id: "assignedLocations",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "associated_documents",
      title: "Associated Documents",
      module: "documentcontrol",
      id: "assignedLocations",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
    },
    {
      key: "publish_history",
      title: "Publish History",
      module: "documentcontrol",
      id: "publishhistory",
      pk: setupPageData.selectedNode.value,
      description: "",
      body: <></>,
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
