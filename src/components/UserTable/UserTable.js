
// UserTable.js
import React, { useState } from 'react';
import UserRow from '../UserRow/UserRow';
import './UserTable.css';


/**
 * UserTable Component
 * 
 * @param {Array} users
 *    An array of objects representing user data with properties: { id, name, email, role }.
 * 
 * @param {function} setUsers
 *    A function to update the users state with new user data.
 * 
 * @param {function} onSelectRow
 *    A callback function to handle selecting/unselecting a row (checkbox change event).
 * 
 * @param {function} onDeleteRow
 *    A callback function to handle deleting a user row when the delete button is clicked.
 * 
 *  @returns {JSX.Element}
 *    Returns a JSX element representing the UserTable component.
 */ 
const UserTable = ({ users, setUsers, onSelectRow, onDeleteRow}) => {
  const [editingUserId, setEditingUserId] = useState(null);

  const handleEditRow = (userId) => {
    setEditingUserId(userId);
  };

/**
 * handleSaveEdit Function
 * This function is responsible for saving the changes made during the editing of a user.
 * 
 * @param {number} userId
 *    The unique identifier of the user being edited.
 * 
 * @param {Object} updatedUserInfo
 *    An object containing the updated user information. It includes properties: { name, email, role }.
 * @returns {void}
 *    This function does not return any value explicitly.
 */
  const handleSaveEdit = (userId, updatedUserInfo) => {
    // Update the user's information in the users state
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedUserInfo } : user
    );
    setUsers(updatedUsers);
    setEditingUserId(null);
  };

  //Callback function to handle canceling the editing mode and discarding changes
  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow
            key={user.id}
            user={user}
            onSelectRow={onSelectRow}
            onDeleteRow={onDeleteRow}
            onEditRow={handleEditRow}
            isEditing={editingUserId === user.id}
            onSaveEdit={handleSaveEdit}
            onCancelEdit={handleCancelEdit}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;



