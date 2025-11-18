import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserRow from "../tables/UserRow";
import UserRowSkeleton from "../tables/loading/UserRowSkeletonState";
import EmptySearch from "../empty states/EmptySearch";

// Fetch users function
const API_URL = process.env.REACT_APP_API_URL;

const fetchUsers = async ({ page, perPage, params }) => {
  const queryParams = new URLSearchParams({
    page,
    perPage,
    ...params,
  }).toString();

  const response = await fetch(`${API_URL}/api/account?${queryParams}`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  return data;
};

export default function AppNotifications() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [error, setError] = useState(null);

  const params = { role: "customer" }; 

  // Fetch users whenever page changes
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUsers({
          page: pagination.currentPage,
          perPage: 8, 
          params,
        });
        
        // console.log(data)
        setUsers(data.data || []);
        setPagination((prev) => ({
          ...prev,
          currentPage: data.current_page,
          totalPages: data.last_page,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [pagination.currentPage]); 

  const handleUserClick = (userId) => {
    navigate(`user-details/${userId}`);
  };

  const handlePageChange = (page) => {
    if (page !== pagination.currentPage) { 
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
      }));
    }
  };

  return (
    <section className="w-full h-full py-10">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
          Customer List
        </h2>

        {error && <div className="text-red-500">{error}</div>}

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {loading ? (
            <UserRowSkeleton num={5} />
          ) : users.length === 0 ? (
            <EmptySearch
              label="No customers found"
              context="There are no customers here."
            />
          ) : (
            users.map((user) => (
              <UserRow
                key={user.id}
                data={{
                  // pfp:user.pfp,
                  name: user.name,
                  email: user.email,
                  role: user.role,
                  id: user.id,
                }}
                click={() => handleUserClick(user.id)}
              />
            ))
          )}
        </div>

        <div className="mt-4 flex justify-between">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage <= 1}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
          >
            Previous
          </button>
          <span className="text-white">Page {pagination.currentPage} of {pagination.totalPages}</span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
