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
import { useLocation, useNavigate } from 'react-router-dom';
// import { listItems } from './Drawer';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import Logo from '../Assests/logo.png'
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';


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
            goto: "/dashboard",
            name: "Dashboard",
            icon: <DashboardIcon />
        },
        {
            goto: "/dashboard/prod",
            name: "Products",
            icon: <CategoryIcon />
        },
        {
            goto: "/dashboard/addPro",
            name: "Add Products",
            icon: <ProductionQuantityLimitsIcon />
        },
        {
            goto: "/dashboard/sales",
            name: "Sales",
            icon: <ReceiptIcon />
        },
        {
            goto: "/dashboard/settings",
            name: "Settings",
            icon: <SettingsSuggestIcon />
        },

    ]
    const location = useLocation()
    let Navigate = useNavigate()
    const [User, setUser] = React.useState([])
    const activeItem = listItems.filter((navItem) => navItem.goto === location.pathname)
    // const { window ;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const loginCheck = () => {
        let User_ID = localStorage.getItem("User_ID")
        if (!User_ID) {
            Navigate('/gotologin')
        }
        else {
            Navigate("/dashboard")
            // const dbref2 = ref(db, 'Users')
            // onValue(dbref2, (snapShot) => {
            //     let data1 = snapShot.val()
            //     data1 = Object.values(data1)
            //     console.log(data1)
            //     for (const i of data1) {
            //         if (i.User_ID === User_ID) {
            //             setUser(i)
            //             setProfImg(i.Profile_Img)
            //         }
            //     }
            // })
        }
    }
    React.useEffect(() => {
        // console.log(props)
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
            <List>
                {listItems.map((text, index) => (
                    // console.log(text.goto),
                    <ListItem key={index} disablePadding sx={{
                        backgroundColor: activeItem[0]?.goto === text.goto ? "#006EB5" : "",
                        width: "100%",
                    }} onClick={() => Navigate(text.goto)} >
                        <ListItemButton sx={{
                            // border: "1px solid red",
                            color: "gray",
                            display: "flex",
                            my: 0.5
                        }}>
                            <ListItemText sx={{
                                color: activeItem[0]?.goto === text.goto ? "white" : "gray",
                            }}>
                                {text.icon}
                            </ListItemText>
                            <ListItemText primary={text.name} sx={{
                                fontWeight: "bolder",
                                color: activeItem[0]?.goto === text.goto ? "white" : "gray",
                                // border: "1px solid red"
                            }}>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* </List> */}
            <Divider />
            <List sx={{ position: "absolute", bottom: 0 }}>
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
                                src={User?.Profile_Img}
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
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
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