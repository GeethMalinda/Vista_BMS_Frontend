import {makeStyles} from '@material-ui/core/styles';
import {deepPurple} from '@material-ui/core/colors';
//Home Style.js


export default makeStyles((theme) => ({
    menuTitle: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    customButton: {
        position: 'fixed',
        zIndex: 100,
        right: '120px',
        top: '220px',
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",  // Change this value as you want
    },
    cardContent: {
        flexGrow: 1,
    },
    bookIcon: {
        position: "fixed",
        animation: `$bookIconAnimation 2s linear`,
        zIndex: 1000,
    },
    '@keyframes bookIconAnimation': {
        '0%': {
            opacity: 1,
            transform: 'translate(0px, 0px) rotate(0deg)',
        },
        '50%': {
            transform: 'rotate(180deg)',
        },
        '100%': {
            opacity: 0,
            transform: 'translate(calc(100vw - 50px), 0px) rotate(360deg)',
        },
    },

    container: {
        padding: 0,
    },

    cardMedia: {
        height: 0,
        paddingTop: '56.25%', // 16:9 aspect ratio
    },

    appBar: {
        borderRadius: 15,
        padding: "0px 20px",

        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("sm")]: {
            padding: "0px 0px",
        },
    },

    menuItem: {
        "&:hover": {
            textDecoration: "underline",
        },
    },

    appBarContainer: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
    },
    appBarLeft: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    appBarRight: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    appBarButton: {
        color: "white",
        marginLeft: theme.spacing(2),
    },
    appBarSearch: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "white",
        marginLeft: theme.spacing(2),
    },
    appBarTitle: {
        marginRight: theme.spacing(2),
    },
}));
