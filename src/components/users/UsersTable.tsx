import { CSSProperties, ChangeEvent, useState } from "react";

import { useModalContext } from "@/context/ModalContext";
import { useUsersContext } from "@/context/UsersContext";
import { useClientsContext } from "@/context/ClientsContext";

import {
  Table,
  Skeleton,
  Button,
  FormControl,
  FormLabel,
  Select,
  Option,
  Typography,
  IconButton,
  Input,
} from "@mui/joy";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function stableSort<T>(array: readonly T[]) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  return stabilizedThis.map((el) => el[0]);
}

function labelDisplayedRows({
  from,
  to,
  count,
}: {
  from: number;
  to: number;
  count: number;
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

const UsersTable = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const { users, isLoading } = useUsersContext();
  const { clients } = useClientsContext();
  const { dispatch } = useModalContext();

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredData = users.filter((row) => {
    return (
      row.name.toLowerCase().includes(filter.toLowerCase()) ||
      row.surname.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const getClientsNumber = (id: string) => {
    return clients.filter((client) => client.userId === id).length;
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    event.preventDefault();
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (users.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? users.length
      : Math.min(users.length, (page + 1) * rowsPerPage);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  if (isLoading) {
    return (
      <Skeleton
        variant="overlay"
        sx={{
          height: "300px",
          width: "100%",
          position: "relative",
        }}></Skeleton>
    );
  }

  return (
    <>
      <FormControl>
        <FormLabel>Filter by name/surname</FormLabel>
        <Input
          type="text"
          color="primary"
          placeholder="Name/Surname"
          variant="outlined"
          onChange={handleFilterChange}
        />
      </FormControl>
      <Table aria-label="clients table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-center">Surname</th>
            <th className="text-center">Email</th>
            <th className="text-center">Clients</th>
            <th className="text-right">-</th>
          </tr>
        </thead>
        <tbody>
          {stableSort(filteredData)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td className="text-center">{user.surname}</td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{getClientsNumber(user._id)}</td>
                <td className="justify-end items-center flex gap-2">
                  <Button
                    size="sm"
                    onClick={() =>
                      dispatch({
                        type: "EDIT_USER",
                        payload: { userId: user._id },
                      })
                    }>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    onClick={() => {
                      dispatch({
                        type: "DELETE_USER",
                        payload: { userId: user._id },
                      });
                    }}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          {emptyRows > 0 && (
            <tr
              style={
                {
                  height: `calc(${emptyRows} * 40px)`,
                  "--TableRow-hoverBackground": "transparent",
                } as CSSProperties
              }>
              <td colSpan={5} aria-hidden />
            </tr>
          )}
          {filteredData.length === 0 && (
            <tr
              style={
                {
                  height: `calc(${emptyRows} * 40px)`,
                  "--TableRow-hoverBackground": "transparent",
                } as CSSProperties
              }>
              <td colSpan={5} className="text-center">
                No users
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className="bg-transparent">
              <div className="flex gap-2 items-center justify-end ">
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select
                    onChange={handleChangeRowsPerPage}
                    value={rowsPerPage}>
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={20}>20</Option>
                  </Select>
                </FormControl>
                <Typography textAlign="center" sx={{ minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: users.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: users.length === -1 ? -1 : users.length,
                  })}
                </Typography>
                <div className="flex gap-2">
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      users.length !== -1
                        ? page >= Math.ceil(users.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </Table>
    </>
  );
};

export default UsersTable;
