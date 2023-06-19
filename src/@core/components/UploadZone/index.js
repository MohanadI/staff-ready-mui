import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";

const UploadZoneWrapper = styled(Box)`
  margin-top: 5px;
  border-style: dashed;
  border-color: #313131;
  border-radius: 5px;
  border-width: 2px;
  background-color: #f4f4f4;
  padding: 10px;
  .MuiTypography-body1 {
    font-size: 13px;
  }
  .MuiButton-root {
    font-size: 12px;
    margin: 5px 0;
  }
`;

const UploadZone = ({ uploadInstructions }) => {
  return (
    <UploadZoneWrapper>
      <Typography variant="body1">{uploadInstructions}</Typography>
      <Button startIcon={<VisibilityIcon />} variant="outlined">
        View Document
      </Button>
      <br />
      <Button startIcon={<ChangeCircleIcon />} variant="outlined">
        Replace Document
      </Button>
    </UploadZoneWrapper>
  );
};

export default UploadZone;
