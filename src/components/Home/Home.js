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

//this is the home menu
const Home = () => {
    const classes = useStyles();
    const [books, setBooks] = useState([
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [appBarPosition, setAppBarPosition] = useState("relative");

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
        <Container maxWidth="xl" className={classes.container}>
            <AppBar className={classes.appBar} position={appBarPosition} color="primary">
                <Toolbar className={appBarPosition === "fixed" ? classes.appBarFixed : classes.appBarRelative}>
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
                                <MenuItem onClick={handleClose}>Option 1</MenuItem>
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
                            <Button className={classes.appBarButton}>Fiction</Button>
                            <Button className={classes.appBarButton}>Nonfiction</Button>
                            <Button className={classes.appBarButton}>Travel</Button>
                            <Button className={classes.appBarButton}>Sinhala</Button>
                            <Button className={classes.appBarButton}>Other</Button>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" className={classes.container}>
                <Grid container spacing={2}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <CardMedia  className={classes.cardMedia}
                                            image={book.image}
                                            title={book.title}
                                            alt={book.title}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>{book.title}</Typography>
                                    <Typography variant="body1">{book.author}</Typography>
                                    <Typography variant="body1">{book.description}</Typography>
                                    <Typography variant="button">{book.price}</Typography>
                                </CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Button variant="contained" color="primary">
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
    );
}

export default Home
