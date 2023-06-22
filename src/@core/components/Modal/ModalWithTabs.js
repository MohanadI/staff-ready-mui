import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  IconButton,
  Tabs,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

/** Emotion Styled Components */
const StyledDialogTitle = styled(DialogTitle)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDialogContent = styled(DialogContent)`
  padding: 15px !important;
`;

const StyledIconButton = styled(IconButton)`
  padding: 0;
`;

const TabContainer = styled(Box)`
  width: 30%;
  border-right: 1px solid;
  border-color: ${({ theme }) => theme.palette.divider};
`;

const StyledTabs = styled(Tabs)`
  background: #292929;

`;

const StyledTab = styled(Tab)`
  border-bottom: 1px solid #ffffff;
  color: #ffffff;
`;

const ContentBox = styled(Box)`
  width: 70%;
  padding: 16px;
`;

function ModalWithTabs({ data, open, onClose }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setSelectedTab(0);
        onClose();
      }}
      fullWidth={true}
      maxWidth={"sm"}
    >
      <StyledDialogTitle>
        {data.title}
        <StyledIconButton
          color="inherit"
          onClick={() => {
            setSelectedTab(0);
            onClose();
          }}
        >
          <CloseIcon />
        </StyledIconButton>
      </StyledDialogTitle>
      <StyledDialogContent>
        <Box style={{ display: "flex", height: 400 }}>
          {data.tabs.length > 1 && (
            <TabContainer>
              <StyledTabs
                value={selectedTab}
                onChange={handleTabChange}
                orientation="vertical"
                variant="scrollable"
                scrollButtons="auto"
              >
                {data.tabs.map((tab, index) => (
                  <StyledTab key={index} label={tab.title} />
                ))}
              </StyledTabs>
            </TabContainer>
          )}

          <ContentBox>{data.tabs[selectedTab].body}</ContentBox>
        </Box>
      </StyledDialogContent>
    </Dialog>
  );
}

export default ModalWithTabs;
