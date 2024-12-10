import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, deleteUser } from '../features/userSlice';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store/store';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { CiSearch, CiUser } from 'react-icons/ci';

const UserDashboard = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.user.users);
 

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(loadUsers()); // Load users from the JSON file into Redux store
  }, [dispatch]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const filteredUsers = users.filter(
    (user: any) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  // Calculate total number of users based on user IDs
  const totalUserCount = users.length;

  return (
    <div className="flex flex-col md:flex-row h-screen relative">
      {/* Hamburger Button for Mobile View */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 right-4 z-50 bg-[#042c2c] text-white p-2 rounded"
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>
   

      {/* Sidebar */}
      <div
        className={`fixed md:relative top-0 left-0 w-64 bg-[#042c2c] text-white p-6 h-full transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <div className="space-y-4">
          <Link
            to="/dashboard"
            className="w-full text-left py-2 px-4 rounded hover:bg-orange-600 block"
          >
            Dashboard
          </Link>
          <Link
            to="/analytics"
            className="w-full text-left py-2 px-4 rounded hover:bg-orange-600 block"
          >
            Analytics
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1  p-6 md:p-8 bg-gray-100 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">User Management Dashboard</h2>

        {/* Total Users Count */}
        <p className="flex text-sm font-bold text-[#333333] m-2">
          <span className="pr-1 pt-1">
            <CiUser />
          </span>
          All Users: <span className="font-light ml-1">{totalUserCount}</span>
        </p>

        {/* Search Input */}
        <div className="w-full flex items-center mb-4">
          <CiSearch className="text-gray-500 mr-2" size={20} />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={handleSearch}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full table-auto border-collapse bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-100 transition-colors duration-300">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.status}</td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between mb-4 mt-6">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page * usersPerPage >= filteredUsers.length}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
