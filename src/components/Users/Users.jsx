import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import MainLayout from "../Layouts/MainLayout";
function Users() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const dateColumns = ["createdAt", "updatedAt"];
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
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => handleEdit(row)}
                type="button" // good practice inside forms
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(row)}
                type="button"
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
      var token = localStorage.getItem("token");

      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/users?page=${currentPage}&limit=${rowsPerPage}`,
          {
            method: "GET",
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
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, rowsPerPage]);

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading) return <div>Loading data...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;

  return (
    <>
      <MainLayout>
        <div className="kt-container-fixed">
          <div className="flex flex-wrap items-center lg:items-end justify-between- gap-5 pb-7.5">
            <div className="flex flex-col justify-center gap-2">
              <h1 className="text-xl font-medium leading-none text-mono">
                Users
              </h1>
              <div className="flex items-center gap-2 text-sm font-normal text-secondary-foreground">
                <div className="card ">
                  <div className="card-body col-12">
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

                  {/* Rows per page dropdown */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <label className="me-2">Rows per page:</label>
                      <select
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

                    {/* Pagination controls */}
                    <nav>
                      <ul className="pagination mb-0">
                        <li
                          className={`page-item ${
                            currentPage === 1 && "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, i) => (
                          <li
                            key={i}
                            className={`page-item ${
                              currentPage === i + 1 && "active"
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(i + 1)}
                            >
                              {i + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages && "disabled"
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export default Users;
