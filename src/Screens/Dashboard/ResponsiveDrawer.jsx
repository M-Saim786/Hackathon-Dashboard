import * as React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import DashboardContent from './DashboardContent';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { listItems } from './Drawer';
import { Button, ListItemIcon } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import Logo from '../../Assests/logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PostAddIcon from '@mui/icons-material/PostAdd';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import InfoIcon from '@mui/icons-material/Info';
import PolicyIcon from '@mui/icons-material/Policy';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../Config/Firebase';
import { useEffect } from 'react';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: "5px 10px",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    // background:"transparent"
}));
function ResponsiveDrawer({ window, children }) {
    const listItems = [
        {
            category: "Main",
            ListItems: [{
                goto: "/dashboard",
                name: "Dashboard",
                icon: <DashboardIcon />
            }]
        },
        {
            category: "Requests",
            ListItems: [{
                goto: "/request",
                name: "Requests",
                icon: <CategoryIcon />
            }]
        },

        {
            category: "Posts",
            ListItems: [{
                goto: "/posts",
                name: "Posts",
                icon: <PostAddIcon />
            }]
        },
        {
            category: "General",
            ListItems: [
                {
                    goto: "/privacyPolicy",
                    name: "Privacy Policy",
                    icon: <PolicyIcon />
                },
                {
                    goto: "/termsCondtions",
                    name: "Terms & Conditions",
                    icon: <SettingsSuggestIcon />
                },
                {
                    goto: "/aboutSaylani",
                    name: "About Saylani",
                    icon: <InfoIcon />
                },
                {
                    goto: "/settings",
                    name: "Settings",
                    icon: <SettingsSuggestIcon />
                },
            ]
        },

    ]
    const location = useLocation()
    let Navigate = useNavigate()
    const [User, setUser] = React.useState([])
    const activeItem = listItems?.ListItems?.filter((navItem) => navItem.goto === location.pathname)
    console.log(location.pathname)
    // const { window ;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const loginCheck = async () => {
        let User_ID = localStorage.getItem("User_ID")
        if (!User_ID) {
            Navigate('/')
        }
        else {
            Navigate("/dashboard")

            const docRef = doc(db, "Users", User_ID);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setUser(docSnap.data())
            } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    }

    useEffect(() => {
        loginCheck()
    }, [])

    const logOut = () => {
        localStorage.removeItem("User_ID")
        loginCheck()
    }
    const drawer = (
        <div>
            <DrawerHeader>
                <img src={Logo} alt="" style={{
                    // border: "1px solid red",
                    width: "100%", height: "10vh"
                }} />

            </DrawerHeader>
            {/* <Toolbar /> */}
            <Divider />
            {/* <List> */}
            {listItems &&
                listItems.map((item, index) => (
                    <Box sx={{ color: "#9EA3AE", }} key={index}>
                        <Box sx={{ mt: "20px", pl: "16px", }}>
                            <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                                {item?.category}
                            </Typography>
                        </Box>
                        <List sx={{}}>
                            {item?.ListItems &&
                                item?.ListItems?.map((item, index) => (
                                    <Box
                                        component={NavLink}
                                        to={item.goto}
                                        // onClick={() => Navigate(item.goto)}
                                        key={index}
                                        sx={{
                                            color: "black",
                                            textDecoration: "none",
                                            // my: "2px",
                                            // "&.active": { color: "#0072BB" },
                                            "&.active > li": { backgroundColor: "#0072BB", color: "white" },
                                            "&.active > li >svg": { color: "white" },
                                            "&.active > li > div >div > svg": {
                                                color: "white"
                                            },
                                            "&.active ": { backgroundColor: "#0072BB", },
                                            textDecoration: "none", "&:hover": {
                                                textDecoration: "none"
                                            },
                                            backgroundColor: "red"
                                            // border: "1px solid red"
                                        }}
                                    >
                                        <ListItem
                                            key={item.name}
                                            disablePadding
                                            sx={{
                                                color: "inherit",
                                                fontWeight: "bold",

                                                // color: "white"
                                            }}
                                        >
                                            <ListItemButton disableRipple={true}>
                                                <ListItemIcon sx={{
                                                    minWidth: "24px", mr: "10px",
                                                    // color: "white"
                                                }}>
                                                    {item?.icon}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={item?.name}
                                                    sx={{
                                                        color: "inherit",
                                                        fontSize: 20,
                                                        fontWeight: "bold"
                                                    }}
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    </Box>
                                ))}
                        </List>
                    </Box>
                ))}


            {/* </List> */}
            {/* <Divider /> */}
            <List >
                <ListItem >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: "10px",
                            my: { lg: "0px", md: "0px", sm: "0px", xs: "20px" },
                            // border:"1px solid red"
                        }}
                    >
                        <Box
                            sx={{
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                display: "grid",
                                alignContent: "center",
                            }}
                        >
                            <img
                                src={User?.ProfImg}
                                width="80%"
                                style={{
                                    borderRadius: "50%",
                                    height: "7vh",
                                    border: "1px solid"
                                }}
                                alt="profile"
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                justifyContent: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    // border:"1px solid re d"
                                }}
                            >
                                {User?.Name}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#2a2b2e",

                                }}
                            >{User?.Email}
                            </Typography>
                        </Box>
                    </Box>
                </ListItem>
                <ListItem>
                    <Button
                        sx={{ width: "200px", textTransform: "capitalize", background: "#006EB5" }}
                        variant="contained"
                        onClick={logOut}
                        startIcon={<LogoutIcon />}>
                        Logout
                    </Button>

                </ListItem>
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    // border: "1px solid red",
                    backgroundColor: "#94C43A"
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` },
                    mt: 10,
                    // mt: { lg: 10,  } 
                }}
            >
                {/* <Toolbar /> */}
                {children}
                {/* <DashboardContent></DashboardContent> */}
            </Box>
        </Box>
    );
}

// ResponsiveDrawer.propTypes = {
//     /**
//      * Injected by the documentation to work in an iframe.
//      * Remove this when copying and pasting into your project.
//      */
//     window: PropTypes.func,
// };

export default ResponsiveDrawer;