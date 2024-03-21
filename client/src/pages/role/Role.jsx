import { useEffect, useMemo, useState } from "react";
import DataTables from "react-data-table-component";

import PageHeader from "../../components/PageHeader/PageHeader";
import { getAllPermissionData } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRole,
  deleteRoles,
  updateRoleStatusData,
} from "../../features/user/userApiSlice";
import { timeAgo } from "../../helpers/timeAgo";
import CreateRole from "../../components/Modals/RoleModals/CreateRole";
import {
  deleteAlert,
  messageToaster,
  selectionRowsDelete,
} from "../../utils/tools";
import UpdateRole from "../../components/Modals/RoleModals/UpdateRole";

const Role = () => {
  const cols = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
    },
    {
      name: "Permission",
      selector: (row) => (
        <>
          <ul>
            {row.permissions?.map((per, index) => {
              return (
                <li style={{ listStyleType: "none" }} key={index}>
                  {per}
                </li>
              );
            })}
          </ul>
        </>
      ),
    },
    {
      name: "CreatedAt",
      selector: (row) => timeAgo(new Date(row.createdAt)),
    },
    {
      name: "Status",
      selector: (row) => (
        <div className="status-toggle">
          <input
            type="checkbox"
            id="status_1"
            className="check"
            checked={row.status ? true : false}
          />
          <label
            onClick={() => handleStatusUpdate(row._id, row.status)}
            htmlFor="status_1"
            className="checktoggle"
          >
            checkbox
          </label>
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => (
        <>
          <button
            className="btn btn-small btn-warning mr-1"
            data-target="#roleEditModalPopup"
            data-toggle="modal"
            onClick={() => setIdEdit(row._id)}
          >
            <i className="fa fa-edit"></i>
          </button>
          <button
            onClick={() => handleDeleteRole(row._id)}
            className="btn btn-small btn-danger"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const { role, error, message } = useSelector(getAllPermissionData);

  const [idEdit, setIdEdit] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  // delete role data
  const handleDeleteRole = (id) => {
    deleteAlert(dispatch, deleteRole, id);
  };
  /// status update
  const handleStatusUpdate = (id, status) => {
    dispatch(updateRoleStatusData({ id, status }));
  };

  // validation
  useEffect(() => {
    messageToaster(dispatch, error, message);
  }, [error, message, dispatch]);

  // handle rows select
  const handleRowSelect = (state) => {
    setSelectedRows(state.selectedRows.map((row) => row));
  };
  // Delete all rows seleted
  const contextActions = useMemo(() => {
    const handleDelete = selectionRowsDelete(
      selectedRows,
      dispatch,
      deleteRoles,
      setSelectedRows,
      setToggleCleared,
      toggleCleared
    );

    return handleDelete;
  }, [dispatch, selectedRows, setToggleCleared, toggleCleared]);

  // Role Data search and Filtering code
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = role?.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  return (
    <>
      <PageHeader title="Roles" />

      <CreateRole show="roleModalPopup" />
      <UpdateRole idEdit={idEdit} show="roleEditModalPopup" />

      <div className="row">
        <div className="col-md-12">
          <button
            className="btnm btn-primary"
            data-target="#roleModalPopup"
            data-toggle="modal"
          >
            Add new role
          </button>
          <br />
          <br />
          <DataTables
            fixedHeader
            pagination
            className="shadow-sm"
            title="All Categories Data"
            columns={cols}
            data={filteredItems}
            onSelectedRowsChange={handleRowSelect}
            contextActions={contextActions}
            selectableRows
            highlightOnHover
            clearSelectedRows={toggleCleared}
            subHeader
            subHeaderComponent={
              <>
                <input
                  id="search"
                  type="text"
                  className="form-control"
                  placeholder="Search ..."
                  aria-label="Search Input"
                  style={{ width: "200px" }}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-small btn-danger"
                  onClick={handleClear}
                >
                  <i className="fa fa-times"></i>
                </button>
              </>
            }
          />
        </div>
      </div>
    </>
  );
};

export default Role;
