import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useEffect, useState} from 'react';
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
import {deleteBook, getBooks} from "../../../actions/books";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

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


  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch, getBooks]);


  const handleRowClick = (row) => {
    setSelectedRow(row);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - books.length) : 0;

  // const filteredUsers = applySortFilter(BOOKLIST, getComparator(order, orderBy), filterName);
  const filteredUsers = books ? applySortFilter(books, getComparator(order, orderBy), filterName) : [];


  const isNotFound = !filteredUsers.length && !!filterName;



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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
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
          <form>
            <TextField margin="dense" label="Name" type="text" fullWidth value={selectedRow ? selectedRow.name : ''} />
            <TextField margin="dense" label="Company" type="text" fullWidth value={selectedRow ? selectedRow.company : ''} />
            <TextField margin="dense" label="Role" type="text" fullWidth value={selectedRow ? selectedRow.role : ''} />
            {/* Add more fields as needed */}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button >Update</Button> {/* Implement this function to handle the update */}
        </DialogActions>
      </Dialog>
    </>
  );
}
