import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useEffect, useState} from 'react';
import FileUpload from "react-material-file-upload";

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
import {useDispatch, useSelector} from "react-redux";
import {createBook, deleteBook, getBooks, updateBook} from "../../../actions/books";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, FormControl,
  FormControlLabel,
  Grid, InputLabel, Select,
  Switch,
  TextField
} from "@material-ui/core";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'isbn', label: 'ISBN', alignRight: false },
  { id: 'name', label: 'Book Title', alignRight: false },
  { id: 'author', label: 'Author', alignRight: false },
  { id: 'publisher', label: 'Publisher', alignRight: false },
  { id: 'language', label: 'Language', alignRight: false },
  { id: 'pages', label: 'Pages', alignRight: false },
  { id: 'publication_date', label: 'Pub. Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'format', label: 'Format', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'discount', label: 'Discount', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {

  const dispatch = useDispatch();

  const [updatedBook, setUpdatedBook] = useState({});

  const [open, setOpen] = useState(null);

  const [selectedBook, setSelectedBook] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedRow, setSelectedRow] = useState(null);

  const {  books  } = useSelector((state) => state.books);

  const [newBookDialogOpen, setNewBookDialogOpen] = useState(false);

  const [newBook, setNewBook] = useState({
    isbn: '',
    name: '',
    author: '',
    publisher: '',
    language: '',
    pages: '',
    publicationDate: '',
    status: '',
    format: '',
    price: '',
    discount: '',

  });

  const [bookFormat, setBookFormat] = useState('Book');
  const [eBookFile, setEbookFile] = useState(null);

  const [bookCoverFile, setBookCoverFile] = useState([]);

  const handleEbookFileChange = (e) => {
    setEbookFile(e.target.files[0]);
  };


  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleBookFormatChange = (event) => {
    setBookFormat(event.target.value);
  };

  const handleUpdateBook = () => {
    if (updatedBook) {
      dispatch(updateBook(selectedRow.isbn, updatedBook));
      handleCloseDialog();
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUpdatedBook((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNewBookChange = (e) => {
    const { id , value } = e.target;
    setNewBook((prevState => ({
      ...prevState,
      [id]:value,
    })));
  };

  // const handleNewBookSubmit = () => {
  //   if(newBook) {
  //     dispatch(createBook(newBook));
  //     setNewBookDialogOpen(false);
  //     setNewBook({
  //       isbn: '',
  //       name: '',
  //       author: '',
  //       publisher: '',
  //       language: '',
  //       pages: '',
  //       publicationDate: '',
  //       status: '',
  //       format: '',
  //       price: '',
  //       discount: '',
  //     })
  //     setBookFormat('');  // reset book format state
  //
  //   }
  // };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setUpdatedBook(row);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenMenu = (event, book) => {
    setOpen(event.currentTarget);
    setSelectedBook(book);
    console.log('handle open ',book)
  };

  const handleDelete = (isbn) => {
    dispatch(deleteBook(isbn));
    setOpen(null);
  }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = books.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, isbn) => {
    const selectedIndex = selected.indexOf(isbn);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, isbn);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };


  const handleIsEBookSwitch = (event) => {
    setIsEBook(event.target.checked);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, books.length - page * rowsPerPage);


  // const filteredUsers = applySortFilter(BOOKLIST, getComparator(order, orderBy), filterName);
  const filteredUsers = applySortFilter(books ? books : [], getComparator(order, orderBy), filterName);

  const isNotFound = filteredUsers.length === 0 && filterName;



  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Books
          </Typography>
          {/* UPDATED: Add an onClick handler to open the new book dialog */}
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={() => setNewBookDialogOpen(true)}>
            New Book
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 , paddingBottom:20}}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={books.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />

                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { isbn, name, author, publisher, language, pages, publicationDate, status, format, price, discount } = row;
                    const selectedBook = selected.indexOf(name) !== -1;

                    return (
                        <TableRow hover key={isbn} tabIndex={-1} role="checkbox" selected={selectedBook} onClick={() => handleRowClick(row)}>
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedBook} onChange={(event) => handleClick(event, isbn)} />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            {isbn}
                          </TableCell>

                          <TableCell align="left">{name}</TableCell>

                          <TableCell align="left">{author}</TableCell>

                          <TableCell align="left">{publisher}</TableCell>

                          <TableCell align="left">{language}</TableCell>

                          <TableCell align="left">{pages}</TableCell>

                          <TableCell align="left">{publicationDate}</TableCell>

                          <TableCell align="left">{status}</TableCell>

                          <TableCell align="left">{format}</TableCell>

                          <TableCell align="left">{price}</TableCell>

                          <TableCell align="left">{discount}</TableCell>

                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={books.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={() => {handleDelete(selectedBook.isbn)}}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {selectedRow && <>
                  <TextField margin="dense" id="isbn" label="ISBN" type="text" value={updatedBook?.isbn || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="name" label="Book Title" type="text" value={updatedBook?.name || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="author" label="Author" type="text" value={updatedBook?.author || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="publisher" label="Publisher" type="text" value={updatedBook?.publisher || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="language" label="Language" type="text" value={updatedBook?.language || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="pages" label="Pages" type="text" value={updatedBook?.pages || ''} fullWidth onChange={handleInputChange} />
                </>}
              </Grid>
              <Grid item xs={6}>
                {selectedRow && <>
                  <TextField margin="dense" id="publication_date" label="Pub. Date" type="text" value={updatedBook?.publicationDate || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="status" label="Status" type="text" value={updatedBook?.status || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="format" label="Format" type="text" value={updatedBook?.format || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="price" label="Price" type="text" value={updatedBook?.price || ''} fullWidth onChange={handleInputChange} />
                  <TextField margin="dense" id="discount" label="Discount" type="text" value={updatedBook?.discount || ''} fullWidth onChange={handleInputChange} />
                </>}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateBook}>Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={newBookDialogOpen} onClose={() => setNewBookDialogOpen(false)}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField margin="dense" id="isbn" label="ISBN" type="text" value={newBook.isbn} fullWidth onChange={handleNewBookChange} />
                <TextField margin="dense" id="name" label="Book Title" type="text" value={newBook.name} fullWidth onChange={handleNewBookChange} />
                <TextField margin="dense" id="author" label="Author" type="text" value={newBook.author} fullWidth onChange={handleNewBookChange} />
                <TextField margin="dense" id="publisher" label="Publisher" type="text" value={newBook.publisher} fullWidth onChange={handleNewBookChange} />
                <TextField margin="dense" id="language" label="Language" type="text" value={newBook.language} fullWidth onChange={handleNewBookChange} />
                <TextField margin="dense" id="pages" label="Pages" type="text" value={newBook.pages} fullWidth onChange={handleNewBookChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField margin="dense" id="publication_date" label="Pub. Date" type="text" value={newBook.publicationDate} fullWidth onChange={handleNewBookChange} />
                <TextField margin="dense" id="status" label="Status" type="text" value={newBook.status} fullWidth onChange={handleNewBookChange} />
                <FormControl margin="dense" fullWidth>
                  <InputLabel id="format-label">Format</InputLabel>
                  <Select
                      labelId="format-label"
                      id="format"
                      value={bookFormat}
                      onChange={handleBookFormatChange}
                  >
                    <MenuItem value={'Book'}>Book</MenuItem>
                    <MenuItem value={'Ebook'}>Ebook</MenuItem>
                  </Select>
                </FormControl>
                <TextField margin="dense" id="price" label="Price" type="text" value={newBook.price} fullWidth onChange={handleNewBookChange} />
                <TextField margin="dense" id="discount" label="Discount" type="text" value={newBook.discount} fullWidth onChange={handleNewBookChange} />
              </Grid>
              <Grid item xs={12} container direction="column" justify="center" alignItems="center">

                {bookFormat === 'Ebook' && (
                    <>
                      <Typography variant="h6" style={{ marginTop: '20px' }}>Ebook Upload</Typography>
                      <FileUpload
                          value={eBookFile}
                          onChange={setEbookFile}
                          multiple={false}
                          rightLabel="to select file"
                          buttonLabel="Upload E-book"
                          buttonRemoveLabel="Remove file"
                          maxFileSize={10}
                          maxUploadFiles={1}
                          bannerProps={{ elevation: 0, variant: "outlined" }}
                          containerProps={{ elevation: 0, variant: "outlined" }}
                          accept=".pdf,.epub"
                      />

                      <Typography variant="h6" style={{ marginTop: '20px' }}>Book Cover Upload</Typography>
                      <FileUpload
                          value={bookCoverFile}
                          onChange={setBookCoverFile}
                          multiple={false}
                          rightLabel="to select file"
                          buttonLabel="Upload Cover"
                          buttonRemoveLabel="Remove file"
                          maxFileSize={10}
                          maxUploadFiles={1}
                          bannerProps={{ elevation: 0, variant: "outlined" }}
                          containerProps={{ elevation: 0, variant: "outlined" }}
                          accept=".jpg,.png"  // assuming covers are images
                      />
                    </>
                )}

                {bookFormat === 'Book' && (
                    <>
                      <Typography variant="h6" style={{ marginTop: '20px' }}>Book Cover Upload</Typography>
                      <FileUpload
                          value={bookCoverFile}
                          onChange={setBookCoverFile}
                          multiple={false}
                          rightLabel="to select file"
                          buttonLabel="Upload Cover"
                          buttonRemoveLabel="Remove file"
                          maxFileSize={10}
                          maxUploadFiles={1}
                          bannerProps={{ elevation: 0, variant: "outlined" }}
                          containerProps={{ elevation: 0, variant: "outlined" }}
                          accept=".jpg,.png"  // assuming covers are images
                      />
                    </>
                )}

              </Grid>

            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewBookDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewBookSubmit} color="primary">
            Add Book
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
