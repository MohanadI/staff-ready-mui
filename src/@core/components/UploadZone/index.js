import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

const UploadZone = ({ uploadInstructions, actions }) => {
  return (
    <UploadZoneWrapper>
      <Typography variant="body1">{uploadInstructions}</Typography>
      {actions}
    </UploadZoneWrapper>
  );
};

export default UploadZone;
