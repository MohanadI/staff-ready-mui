import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MuiToolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import Logo from "../../assets/images/logo.png";
import { useSettings } from "../hooks/useSettings";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const { settings } = useSettings();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const Toolbar = styled(MuiToolbar)(({ theme }) => ({
    maxwidth: "100%",
    maxHeight: 35,
    minHeight: "35px !important",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  return (
    <AppBar position="static" sx={{ boxShadow: "none" }}>
      <Box
        sx={{
          height: 70,
          padding: 1.5,
          backgroundColor: "secondary.dark",
        }}
      >
        <img src={Logo} alt="logo" />
      </Box>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {settings.activeMenu?.parent}
        </Typography>
        {/* Mobile screen menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {settings.activeMenu?.children?.map((page) => (
              <MenuItem
                key={page.title}
                onClick={() => {
                  navigate(page.path);
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">{page.title}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        {/* Desktop screen menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {settings.activeMenu?.children?.map((page) => (
            <Button
              size="small"
              key={page.title}
              onClick={() => navigate(page.path)}
              sx={{
                color: "white"
              }}
            >
              {page.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default TopBar;
