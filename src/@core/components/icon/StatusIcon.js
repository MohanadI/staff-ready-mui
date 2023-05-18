import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import withAPI from "../../../api/core";
import IconifyIcon from "./IconifyIcon";

function StatusIcon({ api, module, id, pk }) {
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        api.colorbarStatus(module, id, pk,
            (cbStatus) => {
                setStatus(cbStatus.color?.toLowerCase());
                setIsLoading(false);
            });
    }, []);

    return (
      <>
        {isLoading && <CircularProgress size={25} sx={{ mr: 1 }} />}
        {status === "ok" && (
          <IconifyIcon
            className="accordion-icon"
            color="#8cc53f"
            icon="ic:baseline-check"
            width="25"
            height="25"
          />
        )}
        {status === "info" && (
          <IconifyIcon
            className="accordion-icon"
            color="#3498db"
            icon="ph:info-fill"
            width="25"
            height="25"
          />
        )}
        {status === "warn" && (
          <IconifyIcon
            className="accordion-icon"
            color="#f7c041"
            icon="material-symbols:warning-outline-rounded"
            width="25"
            height="25"
          />
        )}
        {status === "error" && (
          <IconifyIcon
            className="accordion-icon"
            color="#eb6421"
            icon="mdi:stop-alert"
            width="25"
            height="25"
          />
        )}
      </>
    );
}

export default withAPI(StatusIcon);