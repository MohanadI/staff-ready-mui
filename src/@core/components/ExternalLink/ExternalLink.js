import Button from "@mui/material/Button";
import React, { useCallback } from 'react'

/**
 * A component for linking outside of the React application, typically to the Wicket app.
 * @param props.to path to go to on click
 * @param {boolean} props.newTab boolean prop; open link in new tab when true
 */
function ExternalLink(props) {
    const { to, newTab, useAnchor, style, asButton } = props;

    const goToLink = useCallback((e) => {
        e?.preventDefault();
        if (newTab)
            window.open(to, "_blank")
        else
            window.location = to;
        return null;
    }, [to, newTab])

    if (useAnchor) {
        return (
          <Button
            variant="text"
            href={to}
            className={props.className}
            onClick={goToLink}
          >
            {props.children}
          </Button>
        );
    }

    if(asButton){
        return (
          <Button variant="outlined" className={props.className} onClick={goToLink}>
            {props.children}
          </Button>
        );
    }

    return (
        <span role='link' className={props.className} onClick={goToLink} >
            {props.children}
        </span>
    )
}

export default ExternalLink
