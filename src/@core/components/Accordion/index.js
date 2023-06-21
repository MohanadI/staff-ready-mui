import { styled } from "@mui/material/styles";
import MuiAccordion, { accordionClasses } from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import StatusIcon from "../icon/StatusIcon";

const Accordion = styled(({ hideHeader, ...props }) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme, hideHeader }) => {
  return {

    [`&.${accordionClasses.root}`]: {
      ".MuiAccordionSummary-root": {
        display: hideHeader ? 'none' : 'static',
      }
    },

    border: `1px solid ${theme.palette.divider}`,
    "&:before": {
      display: "none",
    },
  }

});

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  ({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .09)",
    flexDirection: "row",
    "& .accordion-icon": {
      marginRight: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function AccordionComponent({ item, isLoading }) {
  const configs = item.configs;

  const [expanded, setExpanded] = useState(() => {
    return !!configs?.alwaysExpanded
  });

  const [loading, setLoading] = useState(() => configs?.noLoading ? false : isLoading)


  const handleChange = (flag) => {
    if (!configs?.alwaysExpanded) {
      setExpanded(flag);
    }
  };

  return (
    <Accordion
      sx={{ mb: 2 }}
      key={item.key}
      expanded={expanded}
      onChange={() => handleChange(!expanded)}
      hideHeader={!!configs?.hideHeader}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={item.key + "-content"}
        id={item.key + "-header"}
      >
        {!configs?.noIcon ?
          <StatusIcon key={item.pk} module={item.module} id={item.id} pk={item.pk} />
          :
          null

        }
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {loading ? "Loading..." : item.title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {!loading && item.description}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{expanded && item.body}</AccordionDetails>
    </Accordion>
  );
}

AccordionComponent.displayName = 'AccordionComponent'

export default AccordionComponent