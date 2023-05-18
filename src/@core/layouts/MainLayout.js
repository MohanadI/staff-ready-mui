// ** MUI Imports
import Fab from "@mui/material/Fab";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";

// ** Icon Imports
import Icon from "../components/icon/IconifyIcon";

// ** Theme Config Import
import themeConfig from "../configs/themeConfig";

// ** Components
import ScrollToTop from "../components/scroll-to-top";
import TopBar from "./TopBar";

const HorizontalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
  ...(themeConfig.horizontalMenuAnimation && { overflow: "clip" }),
});

const MainContentWrapper = styled(Box)({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  width: "100%",
  padding: theme.spacing(2),
  transition: "padding .25s ease-in-out",
  [theme.breakpoints.down("sm")]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const MainLayout = (props) => {
  // ** Props
  const { children, scrollToTop } = props;

  return (
    <HorizontalLayoutWrapper className="layout-wrapper">
      <MainContentWrapper className="layout-content-wrapper">
        {/* Navbar */}
        <TopBar />

        {/* Content */}
        <ContentWrapper className="layout-page-content">
          {children}
        </ContentWrapper>

        {/* Scroll to top button */}
        {scrollToTop ? (
          scrollToTop(props)
        ) : (
          <ScrollToTop className="mui-fixed">
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <Icon icon="mdi:arrow-up" />
            </Fab>
          </ScrollToTop>
        )}
      </MainContentWrapper>
    </HorizontalLayoutWrapper>
  );
};

export default MainLayout;
