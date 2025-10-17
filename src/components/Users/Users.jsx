import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import MainLayout from "../Layouts/MainLayout";
import EditUserModal from "../Modal/EditUserModal";
import { toast } from "react-toastify";
function Users() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [userData, setUserData] = useState({});
  const dateColumns = ["createdAt", "updatedAt"];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClose = () => setIsModalOpen(false);

  const columns = data[0]
    ? [
        ...Object.keys(data[0]).map((key) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1),
          selector: (row) => row[key],
          sortable: true,
          cell: (row) =>
            dateColumns.includes(key) && row[key]
              ? new Date(row[key]).toLocaleString()
              : row[key],
        })),
        {
          name: "Actions",
          cell: (row) => (
            <div className="flex gap-2">
              <button
                className="px-3 py-1 text-white bg-blue-600 hover:bg-blue-700 rounded text-sm"
                onClick={() => handleEdit(row)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded text-sm"
                onClick={() => handleDelete(row)}
              >
                Delete
              </button>
            </div>
          ),
          ignoreRowClick: true,
        },
      ]
    : [];

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("token");
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/users?page=${currentPage}&limit=${rowsPerPage}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setData(data.rows);
        setTotalRows(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, rowsPerPage]);

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleEdit = (row) => {
    console.log(row);
    setUserData(row);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedUser) => {
    setData((prevData) =>
      prevData.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    toast.success("Record updated successfully..!");

    handleClose();
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen ">
        <div className="px-4">
          <h1 className="text-2xl font-semibold mb-4">Users</h1>

          {/* Data Table */}
          <div className="bg-white shadow rounded-lg overflow-x-auto">
            <DataTable
              columns={columns}
              data={data}
              progressPending={loading}
              highlightOnHover
              striped
              pagination={false}
              responsive
            />
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
            {/* Rows per page */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Rows per page:</label>
              <select
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>

            {/* Pagination */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded border text-sm ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded border text-sm ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>

          {/* Error Handling */}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </div>

      <EditUserModal
        isModalOpen={isModalOpen}
        userData={userData}
        handleClose={handleClose}
        onUpdate={handleUpdate}
      />
    </MainLayout>
  );
}

export default Users;
