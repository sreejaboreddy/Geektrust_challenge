import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from '../UserTable/UserTable';
import Pagination from '../Pagination/Pagination';
import './App.css';

const App = () => {

  // List of all users fetched from the API
  const [users, setUsers] = useState([]);

  // Current active page number
  const [currentPage, setCurrentPage] = useState(1);

  // Number of users displayed per page
  const [usersPerPage] = useState(10);

  // List of selected user IDs
  const [selectedRows, setSelectedRows] = useState([]);

  // Search query for filtering users
  const [searchQuery, setSearchQuery] = useState('');

  // List of users after applying search filter
  const [filteredUsers, setFilteredUsers] = useState([]);


  // Fetch users from the API and set initial user list
  useEffect(() => {
    axios
      .get('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => console.log(error));
  }, []);


  useEffect(() => {
    // Apply search filter whenever the searchQuery changes
    const filteredResults = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filteredResults);
  }, [searchQuery, users]);

  /**
   * Toggle the selection status of a row identified by the provided userId.
   * If the row is currently selected, it will be deselected. If it's not selected, it will be selected.
   *
   * @param {string} userId
   *    The unique identifier of the user associated with the row.
   * 
   * @returns {void}
   *    This function does not return any value explicitly.
   */
  const handleSelectRow = (userId) => {
    const selectedRowIds = selectedRows.includes(userId)
      ? selectedRows.filter((id) => id !== userId)
      : [...selectedRows, userId];
    setSelectedRows(selectedRowIds);
  };


  /**
  * Delete a row with the specified userId from the list of filtered users.
  * Updates the filteredUsers state to remove the row with the specified userId from the displayed table.
  *
  * @param {string} userId
  *    The unique identifier of the user associated with the row to be deleted.
  * @returns {void}
  *    This function does not return any value explicitly (void).
  */
  const handleDeleteRow = (userId) => {
    // Set the filtered users by filtering out the user with the given userId
    setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };


  //Function to handle pagination
  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  /**
   * 
   * Delete all the selected rows from the list of filtered users.
   * Once the selected rows are deleted, clear the selectedRows state.
   * @returns {void}
   */
  const handleDeleteSelected = () => {
    const updatedUsers = filteredUsers.filter((user) => !selectedRows.includes(user.id));
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };

  // Calculate the range of displayed users for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container">
      <input
        className='search-bar'
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <UserTable
        users={currentUsers}
        setUsers={setUsers}
        onSelectRow={handleSelectRow}
        onDeleteRow={handleDeleteRow}

      />
      <Pagination
        totalUsers={filteredUsers.length}
        usersPerPage={usersPerPage}
        currentPage={currentPage}
        onPageChange={handlePaginate}
      />
      <button className="delete-selected-btn" onClick={handleDeleteSelected}>
        Delete Selected
      </button>
    </div>
  );
};

export default App;
