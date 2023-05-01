import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
//Nav bar Style.js
export default makeStyles((theme) => ({

    appBar: {
        borderRadius: 15,
        padding: "0px 50px",
        [theme.breakpoints.down("sm")]: {
            padding: "0px 0px",
        },
    },
    appBarFixed: {
        padding: "0px 50px",
    },
    appBarRelative: {
        padding: "0px 0px",
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
