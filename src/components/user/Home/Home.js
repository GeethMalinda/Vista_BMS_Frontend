import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useStyles from './style';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Container,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Badge,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Grid,
    InputAdornment,
    Paper, List, Divider, ListItemAvatar, Avatar
} from "@material-ui/core";
import {Search, ArrowDropDown, AddShoppingCart, Add as AddIcon, Remove as RemoveIcon} from "@mui/icons-material";
import {selectBook, getBooks, getBookByCategory} from "../../../actions";
import Navbar from "../navbar/Navbar";
import Box from "@mui/material/Box";
import {Icon} from "@iconify/react";



//this is the home menu
const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [appBarPosition, setAppBarPosition] = useState("relative");
    const [clickedCategory, setClickedCategory] = useState("");
    const [cartItems, setCartItems] = useState({});
    const [cartOpen, setCartOpen] = useState(false);
    const [totalItems, setTotalItems] = useState(0);

    const { books } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(getBooks()).then(() => {
            console.log("books")
        }).catch((error) => {
            toast.error(`Error fetching books: ${error.message}`);
        });
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setAppBarPosition("fixed");
            } else {
                setAppBarPosition("relative");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCardClick = (book) => {
        dispatch(selectBook(book));
        navigate(`/customer/book/${book.isbn}`);
    };

    const handleButtonClick = (isbn) => {
        if (!cartItems[isbn]) {
            setTotalItems(prev => prev + 1);
        }
        setCartItems((prevState) => ({
            ...prevState,
            [isbn]: prevState[isbn] ? prevState[isbn] + 1 : 1,
        }));
    };


    const handleIncrement = (isbn) => {
        setCartItems((prevState) => ({
            ...prevState,
            [isbn]: prevState[isbn] + 1,
        }));
    }


    const handleDecrement = (isbn) => {
        if (cartItems[isbn] && cartItems[isbn] > 0) {
            setCartItems((prevState) => {
                const updatedState = { ...prevState };
                updatedState[isbn] -= 1;

                if (updatedState[isbn] === 0) {
                    delete updatedState[isbn];
                    setTotalItems(prev => prev - 1);
                }

                return updatedState;
            });
        }
    }
    const handleCategoryClick = (category) => {
        setClickedCategory(category);
        dispatch(getBookByCategory(category));
    };
    const calculateAfterDiscount = (originalPrice, discountRate) => {
        let discountedPrice = originalPrice * (1 - discountRate);
        return discountedPrice.toFixed(2);
    }

    const cartItemsData = books.filter(book => cartItems[book.isbn]);

    return (
        <>
            <Navbar/>
            <Container maxWidth="xl" className={classes.container}>
                <AppBar className={classes.appBar} position={appBarPosition} color="primary">
                    <Toolbar >
                        <div className={classes.appBarContainer}>
                            <div className={classes.appBarLeft}>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <Typography variant="h6" className={classes.menuTitle}>

                                    </Typography>
                                    <ArrowDropDown />
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleClose} className={classes.menuItem} >Option 1</MenuItem>
                                    <MenuItem onClick={handleClose}>Option 2</MenuItem>
                                    <MenuItem onClick={handleClose}>Option 3</MenuItem>
                                    <MenuItem onClick={handleClose}>Option 4</MenuItem>
                                    <MenuItem onClick={handleClose}>Option 5</MenuItem>
                                </Menu>
                                <TextField
                                    variant="outlined"
                                    color="inherit"
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <div className={classes.appBarRight}>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Fiction")}
                                    style={{
                                        color: clickedCategory === "Fiction" ? "#00FF00" : "",
                                    }}
                                >
                                    Fiction
                                </Button>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Nonfiction")}
                                    style={{
                                        color: clickedCategory === "Nonfiction" ? "#00FF00" : "",
                                    }}
                                >
                                    Nonfiction
                                </Button>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Kids")}
                                    style={{
                                        color: clickedCategory === "Kids" ? "#00FF00" : "",
                                    }}
                                >
                                   Kids
                                </Button>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Science & Technology")}
                                    style={{
                                        color: clickedCategory === "Science & Technology" ? "#00FF00" : "",
                                    }}
                                >
                                    Science & Technology
                                </Button>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Graphic Novels & Comics")}
                                    style={{
                                        color: clickedCategory === "Graphic Novels & Comics" ? "#00FF00" : "",
                                    }}
                                >
                                    Graphic Novels & Comics
                                </Button>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Poetry")}
                                    style={{
                                        color: clickedCategory === "Poetry" ? "#00FF00" : "",
                                    }}
                                >
                                    Poetry
                                </Button>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={2}>
                        {books.map((book) => (
                            <Grid key={book.id} item xs={12} sm={6} md={4} lg={3}>
                                <Card className={classes.card} onClick={() => handleCardClick(book)}>
                                    <CardMedia  className={classes.cardMedia}
                                                image={book.imageURL}
                                                title={book.name}
                                                alt={book.name}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h5" gutterBottom>{book.name}</Typography>
                                        <Typography variant="body1">{book.author}</Typography>
                                        <Typography variant="body1">{book.description}</Typography>
                                        <Paper elevation={3} style={{ padding: '10px', backgroundColor: '#f5f5f5' , marginTop:'10px' , marginBottom:'10px'}}>
                                            <Typography variant="h6" gutterBottom>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <s>${book.price}</s>
                                                    <Typography variant="h5" style={{ color: '#229A16', marginLeft: '10px' }}>${calculateAfterDiscount(book.price, book.discount)}</Typography>
                                                </div>
                                            </Typography>
                                        </Paper>


                                    </CardContent>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(event) => {

                                            handleButtonClick(book.isbn);
                                            event.stopPropagation();
                                        }}
                                    >
                                        Add to Cart
                                    </Button>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
                <Dialog fullWidth onClose={() => setCartOpen(false)} open={cartOpen}>
                    <DialogTitle
                        style={{
                            backgroundColor: '#229A16',
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                    >
                        <Box display="flex" alignItems="center" justifyContent="center">
                            Shopping Cart
                            <Icon  style={{ marginLeft:20 }}>
                                <AddShoppingCart />
                            </Icon>
                        </Box>
                    </DialogTitle>


                    <DialogContent>
                        <List>
                            {cartItemsData.map((book, index) => (
                                <React.Fragment key={book.isbn}>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={2}>
                                                <img src={book.imageURL} style={{width: 'auto', height: '75px'}} alt={book.name}/>
                                            </Grid>
                                            <Grid item xs={10}>
                                                <ListItemText primary={book.name} secondary={`Quantity: ${cartItems[book.isbn]}`} />
                                                <Typography variant="body1" style={{color: '#229A16', fontWeight: 'bold'}}>
                                                    {`Rs. ${book.price}`}
                                                </Typography>
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="increase" onClick={() => handleIncrement(book.isbn)} style={{backgroundColor: '#229A16', color: 'white', marginRight: '10px'}}>
                                                        <AddIcon />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="decrease" onClick={() => handleDecrement(book.isbn)} style={{backgroundColor: '#FFC107', color: 'white'}}>
                                                        <RemoveIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    {index < cartItemsData.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={() => navigate('/payment')} color="primary">
                            Checkout
                        </Button>
                    </DialogActions>
                </Dialog>

            </Container>
            <IconButton className={classes.customButton} onClick={() => setCartOpen(true)}>
                <Badge badgeContent={totalItems} color="error">
                    <AddShoppingCart />
                </Badge>
            </IconButton>
        </>
    );
}

export default Home
