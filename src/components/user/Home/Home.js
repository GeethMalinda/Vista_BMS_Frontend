import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
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
    Paper
} from "@material-ui/core";
import {Search, ArrowDropDown, AddShoppingCart, Add as AddIcon, Remove as RemoveIcon} from "@mui/icons-material";
import {selectBook, getBooks, getBookByCategory} from "../../../actions/books";
import Navbar from "../navbar/Navbar";



//this is the home menu
const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [cartOpen, setCartOpen] = useState(false);

    const { books } = useSelector((state) => state.books);

    useEffect(() => {
        dispatch(getBooks());
    }, [dispatch]);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCardClick = (book) => {
        console.log('book',book)
        dispatch(selectBook(book));
        navigate(`/customer/book/${book.isbn}`);
    };

    const [appBarPosition, setAppBarPosition] = useState("relative");
    const [clickedButtons, setClickedButtons] = useState({});
    const [clickedCategory, setClickedCategory] = useState("");
    const [cartItems, setCartItems] = useState({});


    const handleButtonClick = (book) => {
        setAddToCartToggled(true);
        setClickedButtons((prevState) => ({
            ...prevState,
            [book.isbn]: !prevState[book.isbn],
        }));
        setCartItems((prevState) => ({
            ...prevState,
            [book.isbn]: prevState[book.isbn] ? prevState[book.isbn] + 1 : 1,
        }));
    };

    const handleIncrement = (isbn) => {
        setCartItems((prevState) => ({
            ...prevState,
            [isbn]: prevState[isbn] + 1,
        }));
    };

    const handleDecrement = (isbn) => {
        if (cartItems[isbn] > 1) {
            setCartItems((prevState) => ({
                ...prevState,
                [isbn]: prevState[isbn] - 1,
            }));
        } else {
            const newCartItems = {...cartItems};
            delete newCartItems[isbn];
            setCartItems(newCartItems);
        }
    };

    const handleCategoryClick = (category) => {
        console.log(category);
        setClickedCategory(category);
        dispatch(getBookByCategory(category));
    };

    const calculateAfterDiscount = (originalPrice, discountRate) => {
        let discountedPrice = originalPrice * (1 - discountRate);
        return discountedPrice.toFixed(2); // toFixed(2) will round to two decimal places

    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setAppBarPosition("fixed");
            } else {
                setAppBarPosition("relative");
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const totalItems = Object.values(cartItems).reduce((a, b) => a + b, 0);

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
                                        Blackwell's
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
                                                    <Typography variant="h5" style={{ color: 'green', marginLeft: '10px' }}>${calculateAfterDiscount(book.price, book.discount)}</Typography>
                                                </div>
                                            </Typography>
                                        </Paper>


                                    </CardContent>

                                    <Button
                                        variant="contained"
                                        color={clickedButtons[book.isbn] ? "default" : "primary"}
                                        style={{
                                            backgroundColor: clickedButtons[book.isbn] ? "#00FF00" : "",
                                        }}
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
                <Dialog open={cartOpen} onClose={() => setCartOpen(false)} fullWidth>
                    <DialogTitle>Shopping Cart</DialogTitle>
                    <DialogContent>
                        <List>
                            {Object.entries(cartItems).map(([isbn, quantity]) => {
                                const book = books.find(book => book.isbn === isbn);
                                return book ? (
                                    <ListItem key={isbn}>
                                        <ListItemText primary={book.name} secondary={`Quantity: ${quantity}`} />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="increase" onClick={() => handleIncrement(isbn)}>
                                                <AddIcon />
                                            </IconButton>
                                            <IconButton edge="end" aria-label="decrease" onClick={() => handleDecrement(isbn)}>
                                                <RemoveIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ) : null;
                            })}

                        </List>
                    </DialogContent>
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
