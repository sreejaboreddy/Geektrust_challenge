
import React, { useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './UserRow.css';

/**
 * UserRow Component
 * 
 * @param {object} user
 *    An object representing the user data with properties: { id, name, email, role }.
 * 
 * @param {function} onSelectRow
 *    A callback function to handle selecting/unselecting the row (checkbox change event).
 * 
 * @param {function} onDeleteRow
 *    A callback function to handle deleting the user row when the delete button is clicked.
 * 
 * @param {function} onEditRow
 *    A callback function to handle initiating the editing mode when the edit button is clicked.
 * 
 * @param {boolean} isEditing
 *    A boolean flag indicating whether the row is in editing mode or not.
 * 
 * @param {function} onSaveEdit
 *    A callback function to handle saving the changes made during the editing mode.
 *    This function takes two parameters: userId and updatedUserInfo (an object with updated name, email, and role).
 * 
 * @param {function} onCancelEdit
 *    A callback function to handle canceling the editing mode and discarding any changes made.
 * 
 * @returns {JSX.Element}
 *    Returns a JSX element representing the UserRow component.
 */
const UserRow = ({ user, onSelectRow, onDeleteRow, onEditRow, isEditing, onSaveEdit, onCancelEdit }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleCheckboxChange = () => {
    onSelectRow(user.id);
  };

  const handleDeleteClick = () => {
    onDeleteRow(user.id);
  };

  const handleEditClick = () => {
    onEditRow(user.id);
  };

  const handleSaveClick = () => {
    onSaveEdit(user.id, { name, email, role });
  };

  const handleCancelClick = () => {
    onCancelEdit();
  };

  return (
    <tr className={user.isSelected ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          checked={user.isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{isEditing ? <input value={name} onChange={(e) => setName(e.target.value)} /> : user.name}</td>
      <td>{isEditing ? <input value={email} onChange={(e) => setEmail(e.target.value)} /> : user.email}</td>
      <td>{isEditing ? <input value={role} onChange={(e) => setRole(e.target.value)} /> : user.role}</td>
      <td>
        {isEditing ? (
          <>
            <button className="save-btn" onClick={handleSaveClick}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancelClick}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button className="edit-btn" onClick={handleEditClick}>
              <EditIcon />
            </button>
            <button className="delete-btn" onClick={handleDeleteClick}>
              <DeleteIcon />
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default UserRow;


