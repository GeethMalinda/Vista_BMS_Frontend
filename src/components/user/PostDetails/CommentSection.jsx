import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { commentBook } from '../../../actions/books';
import useStyles from './styles';

const CommentSection = ({ book }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(book?.comments);
  const classes = useStyles();
  const commentsRef = useRef();

  // Event handler to update state as user types into text field
  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    // const newComment = `${user?.result?.name}: ${comment}`;
    console.log(book , ' ' , comment)
    dispatch({ type: 'ADD_COMMENT', payload: { isbn: book.isbn, comment: comment } })
    setComment(''); // Clear the comment input field

    commentsRef.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to bottom of comments section
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(': ')[0]}</strong>
              {c.split(':')[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={handleInputChange}
          />
          <br />
          <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleSubmit}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
