import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Icon } from "@iconify/react";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:before": {
    display: "none",
  },
}));

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

export default function AccordionComponent({ item, isLoading }) {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (flag) => {
    setExpanded(flag);
  };

  return (
    <Accordion
      sx={{ mb: 2 }}
      expanded={expanded}
      onChange={() => handleChange(!expanded)}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={item.key + "-content"}
        id={item.key + "-header"}
      >
        <Icon
          className="accordion-icon"
          color="green"
          icon="ic:baseline-check"
          width="30"
          height="25"
        />
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          {isLoading ? "Loading..." : item.title}
        </Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {!isLoading && item.description}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>{expanded && item.body}</AccordionDetails>
    </Accordion>
  );
}
