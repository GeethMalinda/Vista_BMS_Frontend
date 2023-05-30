import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider ,Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link  } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { getBook, getBooksBySearch } from '../../../actions/books'; // Updated import
import CommentSection from './CommentSection';
import useStyles from './styles';
import {AddToPhotos} from "@mui/icons-material";

//This is my bookdetails panel
const BookDetails = () => {
  const { selectedBook: book, books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    console.log('use effect')
    console.log('id ', id)
    dispatch(getBook(id));
  }, [id]);

  useEffect(() => {
    if (book) {
      dispatch(getBooksBySearch({ search: 'none', tags: book?.tags?.join(',') }));
    }
  }, [book]);


  // if (!book) return null;

/*
  const openPost = (_id) => history.push(`/posts/${_id}`);
*/
  const openPost = (_id) => {
    navigate(`/customer/book/${_id}`);
    console.log(_id)
  }

  if (!book) {
    return (
        <Paper elevation={6} className={classes.loadingPaper}>
          <CircularProgress size="7em" />
        </Paper>
    );
  }

  const recommendedPosts = books?.filter(({ _id }) => _id !== book._id) || [];

  return (
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
        <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{book.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">
              {book.tags?.map((tag) => ( // Added optional chaining here
                  <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                    {` #${tag} `}
                  </Link>
              ))}
            </Typography>
            <Typography gutterBottom variant="body1" component="p">{book.message}</Typography>
            <Typography variant="h6">
              Author:
              <Link to={`/creators/${book.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                {` ${book.author}`}
              </Link>
            </Typography>
            <Typography variant="body1"> Stock Published : {moment(book.createdAt).fromNow()}</Typography>

            <Typography variant="h4">
              <Link to={`/creators/${book.name}`} style={{ textDecoration: 'none', color: '#FF1493' }}>
               $ {` ${book.price}`}
              </Link>
            </Typography>
            <Divider style={{ margin: '20px 0' }} />
            {/*<Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>*/}
            <Button variant="contained" raised color="primary">
              <AddToPhotos />
              Add to cart
            </Button>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection book={book} />
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="h6"><strong>More Informations </strong></Typography>
            <Typography variant="body1"><strong>Language</strong></Typography>
            <Typography variant="body1"><strong>Publisher</strong></Typography>
            <Typography variant="body1"><strong>ISBN</strong></Typography>
            <Typography variant="body1"><strong>Pages</strong></Typography>
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={book.image || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={book.title} />
          </div>
        </div>
        {recommendedPosts && recommendedPosts.length > 0 && (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">You might also like:</Typography>
              <Divider />
              <div className={classes.recommendedPosts}>
                {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                      <Typography gutterBottom variant="h6">{title}</Typography>
                      <Typography gutterBottom variant="subtitle2">{name}</Typography>
                      <Typography gutterBottom variant="subtitle2">{message}</Typography>
                      <Typography gutterBottom variant="subtitle1">Likes: {likes?.length || 0}</Typography>
                      <img src={selectedFile} width="200px" />
                    </div>
                ))}
              </div>
            </div>
        )}
      </Paper>
  );
};

export default BookDetails;