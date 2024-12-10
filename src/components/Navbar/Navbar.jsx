import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import LogoGriffTech from "../../assets/logo_grifftech_large.webp";
import './Navbar.scss';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { label: 'ACCUEIL', href: '#section-home' },
    { label: 'MES SERVICES', href: '#section-services' },
    { label: 'PORTFOLIO', href: '#section-portfolio' },
    { label: 'CONTACT', href: '#section-contact' },
  ];

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }

    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false); 
    }

    setLastScrollY(window.scrollY); 
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleScrollToSection = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setDrawerOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(25, 25, 25, 0.85)', borderBottom: '2px solid #F04346', transition: 'transform 0.3s ease', transform: hideNavbar ? 'translateY(-100%)' : 'translateY(0)', }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src={LogoGriffTech} alt="Logo GriffTech" style={{ width: 150 }} />
          </Box>

          {/* Navigation */}
          {isMobile ? (
            <IconButton color="inherit" edge="end" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button key={item.label} href={item.href} onClick={handleScrollToSection} sx={{ color: '#e0e0e0', fontWeight: '500', textTransform: 'none', '&:hover': { color: '#F04346' } }}>
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer pour la version mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250, backgroundColor: '#1a1a1a', height: '100%', color: '#e0e0e0' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton component="a" href={item.href} onClick={handleScrollToSection}>
                  <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: '500', color: '#e0e0e0', textAlign: 'center' }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider sx={{ backgroundColor: '#444' }} />
        </Box>
      </Drawer>

      {/* Bouton "Scroll to Top" */}
      {showScrollTop && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            width: 50,
            height: 50,
            backgroundColor: '#F04346',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: 24,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            zIndex: 1001,
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            transform: 'scale(1)',
          }}
          onClick={scrollToTop}
        >
          ↑
        </Box>
      )}
    </>
  );
}

export default Navbar;
