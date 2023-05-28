import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom";
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    Card,
    CardContent,
    CardMedia,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton, Menu, MenuItem,
    ListItemSecondaryAction, Grid, Container, InputAdornment, TextField,
} from "@material-ui/core";
import useStyles from './style';
import {Search,ArrowDropDown} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import {useDispatch} from "react-redux";
import {selectBook, setBooks} from "../../../actions/books";
import { useSelector } from 'react-redux';
import Navbar from "../navbar/Navbar";


//this is the home menu
const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [books, setBooksDummy] = useState([
        {
            id: 1,
            title: "The Alchemist",
            author: "Paulo Coelho",
            description: "Book description...",
            image: "https://designforwriters.com/wp-content/uploads/2017/10/design-for-writers-book-cover-tf-2-a-million-to-one.jpg",
            price: 19.99,
        },
        {
            id: 2,
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            description: "Book description...",
            image: "https://media.harrypotterfanzone.com/deathly-hallows-us-childrens-edition-1050x0-c-default.jpg",
            price: 24.99,
        },
        {
            id: 3,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "Book description...",
            image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/12/attachment_137125302-e1670235568295.jpeg?auto=format&q=60&fit=max&w=930",
            price: 16.99,
        },
        {
            id: 4,
            title: "Book Title 4",
            author: "Author 4",
            description: "Book description...",
            image: "https://marketplace.canva.com/EAFEbtlNK2Q/1/0/1003w/canva-double-exposure-artistic-background-novel-book-cover-sTAyOpO_rTI.jpg",
            price: 15.99,
        },
        {
            id: 5,
            title: "Book Title 5",
            author: "Author 4",
            description: "Book description...",
            image: "https://s26162.pcdn.co/wp-content/uploads/2021/10/To_Kill_a_Mockingbird_first_edition_cover.jpg",
            price: 16.99,
        },
        {
            id: 6,
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            description: "Book description...",
            image: "https://media.harrypotterfanzone.com/deathly-hallows-us-childrens-edition-1050x0-c-default.jpg",
            price: 24.99,
        },
        {
            id: 7,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "Book description...",
            image: "https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/12/attachment_137125302-e1670235568295.jpeg?auto=format&q=60&fit=max&w=930",
            price: 16.99,
        },
        {
            id: 8,
            title: "Book Title 4",
            author: "Author 4",
            description: "Book description...",
            image: "https://marketplace.canva.com/EAFEbtlNK2Q/1/0/1003w/canva-double-exposure-artistic-background-novel-book-cover-sTAyOpO_rTI.jpg",
            price: 15.99,
        },
        {
            id: 9,
            title: "Book Title 5",
            author: "Author 4",
            description: "Book description...",
            image: "https://s26162.pcdn.co/wp-content/uploads/2021/10/To_Kill_a_Mockingbird_first_edition_cover.jpg",
            price: 16.99,
        },
    ]);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory



    const storedBooks = useSelector((state) => state.books.books);

    useEffect(() => {
        if (storedBooks.length === 0) {
            dispatch(setBooks(books));
        }
    }, [dispatch, storedBooks]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCardClick = (book) => {
        dispatch(selectBook(book));
        navigate(`/customer/${book.id}`);
    };

    const [appBarPosition, setAppBarPosition] = useState("relative");
    const [clickedButtons, setClickedButtons] = useState({});
    const [clickedCategory, setClickedCategory] = useState("");


    const handleButtonClick = (id) => {
        setClickedButtons((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const handleCategoryClick = (category) => {
        setClickedCategory((prevCategory) => (prevCategory === category ? "" : category));
    };

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
                                    onClick={() => handleCategoryClick("Travel")}
                                    style={{
                                        color: clickedCategory === "Travel" ? "#00FF00" : "",
                                    }}
                                >
                                    Travel
                                </Button>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Sinhala")}
                                    style={{
                                        color: clickedCategory === "Sinhala" ? "#00FF00" : "",
                                    }}
                                >
                                    Sinhala
                                </Button>
                                <Button
                                    className={classes.appBarButton}
                                    onClick={() => handleCategoryClick("Other")}
                                    style={{
                                        color: clickedCategory === "Other" ? "#00FF00" : "",
                                    }}
                                >
                                    Other
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
                                                image={book.image}
                                                title={book.title}
                                                alt={book.title}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="h5" gutterBottom>{book.title}</Typography>
                                        <Typography variant="body1">{book.author}</Typography>
                                        <Typography variant="body1">{book.description}</Typography>
                                        <Typography variant="button">{book.price}</Typography>
                                    </CardContent>
                                    <List>
                                        <ListItem>
                                            <ListItemIcon>
                                                <Button
                                                    variant="contained"
                                                    color={clickedButtons[book.id] ? "default" : "primary"}
                                                    style={{
                                                        backgroundColor: clickedButtons[book.id] ? "#00FF00" : "",
                                                    }}
                                                    onClick={() => handleButtonClick(book.id)}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </ListItemIcon>
                                            {/*<ListItemText primary={book.price}/>*/}
                                        </ListItem>
                                    </List>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>


            </Container>
        </>
    );
}

export default Home
