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
    ListItemSecondaryAction, Grid, Container, InputAdornment, TextField,
} from "@material-ui/core";
import useStyles from './style';
import {Search} from "@mui/icons-material";

//this is the home menu
const Home = () => {
    const classes = useStyles();
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "The Alchemist",
            author: "Paulo Coelho",
            description: "An Andalusian shepherd boy named Santiago travels from his homeland in Spain to the Egyptian desert in search of treasure buried near the Pyramids. Along the way, he meets a variety of people who point him in the right direction, including a gypsy woman, a king, and an alchemist.",
            image: "https://i.imgur.com/a57a23m.jpg",
            price: 19.99,
        },
        {
            id: 2,
            title: "Harry Potter and the Sorcerer's Stone",
            author: "J.K. Rowling",
            description: "Harry Potter has never had a birthday party, never received a Christmas present, and never been kissed. All because he is different from the other children in his neighborhood: Harry Potter is a wizard. Harry's parents were murdered by the evil Lord Voldemort when Harry was just a baby, but Harry survived with only a lightning-bolt scar on his forehead as a memento. Now Harry's life is about to change dramatically. He is about to start his first year at Hogwarts School of Witchcraft and Wizardry, where he will learn about magic and make new friends. But even within the Wizarding community, there is one thing that Harry is afraid of: Lord Voldemort is still out there, and he wants revenge.",
            image: "https://i.imgur.com/861634a.jpg",
            price: 24.99,
        },
        {
            id: 3,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            description: "Harry Potter has never had a birthday party, never received a Christmas present, and never been kissed. All because he is different from the other children in his neighborhood: Harry Potter is a wizard. Harry's parents were murdered by the evil Lord Voldemort when Harry was just a baby, but Harry survived with only a lightning-bolt scar on his forehead as a memento. Now Harry's life is about to change dramatically. He is about to start his first year at Hogwarts School of Witchcraft and Wizardry, where he will learn about magic and make new friends. But even within the Wizarding community, there is one thing that Harry is afraid of: Lord Voldemort is still out there, and he wants revenge.",
            image: "https://i.imgur.com/749845b.jpg",
            price: 16.99,
        },
    ]);

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
        <Container maxWidth="xl">
            <AppBar className={classes.appBar} position={appBarPosition} color="primary">
                <Toolbar className={appBarPosition === "fixed" ? classes.appBarFixed : classes.appBarRelative}>
                    <div className={classes.appBarContainer}>
                        <div className={classes.appBarLeft}>
                            <Typography variant="h6" color="inherit" className={classes.appBarTitle}>
                                Blackwell's
                            </Typography>
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


            <div style={{marginTop: '300px'}}>
                <Grid container spacing={2}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <CardMedia
                                    image={book.image}
                                    title={book.title}
                                    alt={book.title}
                                />
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>{book.title}</Typography>
                                    <Typography variant="body1">{book.author}</Typography>
                                    <Typography variant="body1">{book.description}</Typography>
                                </CardContent>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <Button variant="outlined" color="primary">
                                                Add to Cart
                                            </Button>
                                        </ListItemIcon>
                                        <ListItemText primary={book.price}/>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <Grid container spacing={2}>
                {books.map((book) => (
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <CardMedia
                                image={book.image}
                                title={book.title}
                                alt={book.title}
                            />
                            <CardContent>
                                <Typography variant="h5" gutterBottom>{book.title}</Typography>
                                <Typography variant="body1">{book.author}</Typography>
                                <Typography variant="body1">{book.description}</Typography>
                            </CardContent>
                            <List>
                                <ListItem>
                                    <ListItemIcon>
                                        <Button variant="outlined" color="primary">
                                            Add to Cart
                                        </Button>
                                    </ListItemIcon>
                                    <ListItemText primary={book.price}/>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                ))}
            </Grid>

        </Container>
    );
}

export default Home
