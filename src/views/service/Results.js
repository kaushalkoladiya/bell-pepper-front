import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch } from "react-redux";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import VisibilityIcon from "@material-ui/icons/Visibility";
import setEmptyStr from "../../utils/setEmptyStr";
import ProfileName from "../../components/ProfileName";
import trimStr from "../../utils/trimStr";
import Image from "../../components/Image";
import { openServiceDialog } from "../../redux/service/actions";
import setDate from "../../utils/setDate";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, services, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [selectedServiceIds, setSelectedServiceIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedServiceIds;

    if (event.target.checked) {
      newSelectedServiceIds = services.map((service) => service._id);
    } else {
      newSelectedServiceIds = [];
    }

    setSelectedServiceIds(newSelectedServiceIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedServiceIds.indexOf(id);
    let newSelectedServiceIds = [];

    if (selectedIndex === -1) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds.slice(1)
      );
    } else if (selectedIndex === selectedServiceIds.length - 1) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedServiceIds = newSelectedServiceIds.concat(
        selectedServiceIds.slice(0, selectedIndex),
        selectedServiceIds.slice(selectedIndex + 1)
      );
    }

    setSelectedServiceIds(newSelectedServiceIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleOpenServiceDialog = (id) => {
    dispatch(openServiceDialog(id));
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedServiceIds.length === services.length}
                    color="primary"
                    indeterminate={
                      selectedServiceIds.length > 0 &&
                      selectedServiceIds.length < services.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Vendor's Company Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Registration date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.slice(0, limit).map((service) => (
                <TableRow
                  hover
                  key={service._id}
                  selected={selectedServiceIds.indexOf(service._id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedServiceIds.indexOf(service._id) !== -1}
                      onChange={(event) => handleSelectOne(event, service._id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <ProfileName name={service.vendorId.companyName} />
                  </TableCell>
                  <TableCell>
                    <Image image={service.image} />
                  </TableCell>
                  <TableCell>{setEmptyStr(service.title)}</TableCell>
                  <TableCell>
                    {trimStr(setEmptyStr(service.description))}
                  </TableCell>
                  <TableCell>{setEmptyStr(service.price)}</TableCell>
                  <TableCell>{setDate(service.createdAt)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleOpenServiceDialog(service._id)}
                    >
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={services.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  services: PropTypes.array.isRequired,
};

export default Results;
