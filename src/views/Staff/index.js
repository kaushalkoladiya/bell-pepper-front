import React, { useEffect, useState } from "react";
import axios from "axios";
// mui
import {
  Box,
  Button,
  Container,
  makeStyles,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@material-ui/core";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  deleteStaff,
  getStaffs,
  openStaffDialog,
} from "../../redux/staff/actions";
// components
import Page from "../../components/Page";
import DataTable from "../../components/DataTable";
import Image from "../../components/Image";
import { setDate, setEmptyStr, trimStr } from "../../utils";
import SearchBar from "../../components/SearchBar";
import ProfileName from "../../components/ProfileName";
import TableToolbar from "../../components/TableToolbar";
import Dialog from "./Dialog";
import ToolTipButton from "../../components/ToolTipButton";
import { DeleteIcon, EditIcon } from "../../components/Icon";
import { warning, alert } from "../../utils/alert";
import { ROOT_USER } from "../../constants";
import ShortString from "../../components/ShortString";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  expandableRow: {
    display: "flex",
    flexDirection: "column",
    padding: "0 5%",
  },
  expandableColumn: { display: "flex", alignItems: "center" },
}));

const Staff = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const staffData = useSelector((state) => state.staff.data);
  const userType = useSelector((state) => state.admin.userType);

  const isRootUser = userType === ROOT_USER ? true : false;

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(staffData);
  }, [setData, staffData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/staff");
        dispatch(getStaffs(data.data.staffs));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch]);

  const handleSearch = (e) => {
    const value = e.target.value.toUpperCase();
    if (value) {
      const data = staffData.filter((row) => {
        return (
          row?.name?.toUpperCase()?.indexOf(value) > -1 ||
          row?.email?.toUpperCase()?.indexOf(value) > -1 ||
          row?.about?.toUpperCase()?.indexOf(value) > -1 ||
          row?.mobile?.toUpperCase()?.indexOf(value) > -1 ||
          row?.gender?.toUpperCase()?.indexOf(value) > -1 ||
          row?.age?.toString()?.toUpperCase()?.indexOf(value) > -1 ||
          row?.nationality?.toUpperCase()?.indexOf(value) > -1
        );
      });
      setData(data);
    } else {
      setData(staffData);
    }
  };

  const handleOpenDialog = (id = null) => {
    dispatch(openStaffDialog(id));
  };

  const handleDelete = (id) => {
    const data = warning();
    data
      .then(async (isDeleted) => {
        if (isDeleted) {
          // delete here
          try {
            const { data } = await axios.delete(`/staff/${id}`);
            if (data.status === 200) {
              dispatch(deleteStaff(id));
              alert("Deleted!", "Service has been deleted!", "success");
            }
          } catch (error) {
            console.log(error);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const columns = [
    {
      name: "Name",
      cell: (row) => <ProfileName image={row.image} name={row.name} />,
      sortable: true,
    },
    {
      name: "Email",
      cell: (row) => <ShortString string={row.email} />,
      sortable: true,
    },
    {
      name: "Phone",
      cell: (row) => <ShortString string={row.mobile} />,
      sortable: true,
    },
    {
      name: "Gender",
      selector: "gender",
      sortable: true,
    },
    {
      name: "Age",
      selector: "age",
      sortable: true,
    },
    {
      name: "Nationality",
      selector: "nationality",
      sortable: true,
    },
    {
      name: "Id Proof",
      cell: (row) => <Image image={row.idProof} />,
      sortable: true,
    },
    {
      name: "About",
      cell: (row) => <ShortString string={row.about} />,
      sortable: true,
    },
    {
      name: "Joined On",
      cell: (row) => setDate(row.createdAt),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <ToolTipButton onClick={() => handleOpenDialog(row._id)} title="Edit">
            <EditIcon />
          </ToolTipButton>
          <ToolTipButton title="Delete" onClick={() => handleDelete(row._id)}>
            <DeleteIcon />
          </ToolTipButton>
        </div>
      ),
      sortable: true,
    },
  ];

  const ExpandableComponent = ({ data }) => (
    <div className={classes.expandableRow}>
      <div className={classes.expandableColumn}>
        <Typography variant="body1">Company Name:&nbsp;</Typography>
        <Typography variant="body2" color="textSecondary">
          {setEmptyStr(data.vendorId.companyName)}
        </Typography>
      </div>
      <div className={classes.expandableColumn}>
        <Typography variant="body1">Email:&nbsp;</Typography>
        <Typography variant="body2" color="textSecondary">
          {setEmptyStr(data.vendorId.email)}
        </Typography>
      </div>
      <div className={classes.expandableColumn}>
        <Typography variant="body1">Mobile:&nbsp;</Typography>
        <Typography variant="body2" color="textSecondary">
          {setEmptyStr(data.vendorId.mobile)}
        </Typography>
      </div>
      <div className={classes.expandableColumn}>
        <Typography variant="body1">Address:&nbsp;</Typography>
        <Typography
          variant="body2"
          color="textSecondary"
        >{`${data.vendorId.address.houseNumber}, ${data.vendorId.address.street} ${data.vendorId.address.city}`}</Typography>
      </div>
    </div>
  );

  return (
    <Page className={classes.root} title="Staffs">
      <Container maxWidth={false}>
        {!isRootUser && (
          <TableToolbar title="Staff" onAddButtonClick={handleOpenDialog} />
        )}
        <Box mt={3}>
          {isRootUser ? (
            <DataTable
              data={data}
              title="Staffs"
              columns={columns}
              actions={<SearchBar title="Staffs" onSearch={handleSearch} />}
              expandableRows
              expandableRowsComponent={<ExpandableComponent />}
            />
          ) : (
            <DataTable
              data={data}
              title="Staffs"
              columns={columns}
              actions={<SearchBar title="Staffs" onSearch={handleSearch} />}
            />
          )}
        </Box>
      </Container>
      <Dialog />
    </Page>
  );
};

export default Staff;
