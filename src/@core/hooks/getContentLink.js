import React from "react";
import { Link } from "react-router-dom";
import ExternalLink from "../components/ExternalLink/ExternalLink";

export function getContentLink(document, rawLink, readonly) {
  if (document?.isDocumentPk && !document?.fileType)
    return ExamLink(document.isDocumentPk, rawLink, null, readonly);
  else if (document?.fileType === "W") return URLLink(document.fileId, rawLink);
  else if (document?.propertyId === "F")
    return DownloadLink(document.filePk, document.fileId, rawLink);
  else
    return (
      <>
        {!rawLink && <div>Document Content</div>}
        <div>[not set]</div>
      </>
    );
}

export function ExamLink(documentPk, rawLink, title, readonly) {
  return (
    <>
      {!rawLink && <div>Exam</div>}
      <div>
        {documentPk ? (
          <ExternalLink
            to={
              __WICKET_BASEURL__ +
              (readonly
                ? `/StaffReady/DocumentViewer?IsDocumentPk=${documentPk}`
                : `/StaffReady/DocumentEditor?IsDocumentPk=${documentPk}`)
            }
            useAnchor
            newTab
          >
            {title ?? "View Document"}
          </ExternalLink>
        ) : (
          "[not set]"
        )}
      </div>
    </>
  );
}

export function URLLink(url, rawLink) {
  return (
    <>
      {!rawLink && <div>Attachment</div>}
      <div>
        {url ? (
          <ExternalLink to={`${url}`} useAnchor newTab>
            Open
          </ExternalLink>
        ) : (
          "[not set]"
        )}
      </div>
    </>
  );
}

export function DownloadLink(filePk, fileId, rawLink) {
  return (
    <>
      {!rawLink && <div>Attachment</div>}
      <div>
        <iframe id="download" style={{ display: "none" }}></iframe>
        {filePk ? (
          <Link
            to="#"
            onClick={() =>
              (document.getElementById(
                "download"
              ).src = `/StaffReady/v10/api/file/${filePk}/${fileId}`)
            }
          >
            Download
          </Link>
        ) : (
          "[not set]"
        )}
      </div>
    </>
  );
}
