import PropTypes from 'prop-types';
import { Icon } from "../../../../components";
import { styled } from "styled-components"
import { TableRow } from "../table-row/table-row";
import { useState } from "react";
import { PROP_TYPE } from '../../../../constants';
import { request } from '../../../../utils';

const UserRowContainer = ({ className, id, login, createdAt, roleId: userRoleId, onUserRemove, roles }) => {
  const [initialRoleId, setInitialRoleId] = useState(userRoleId);
  const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

  const onRoleChange = ({ target }) => {
    setSelectedRoleId(Number(target.value));
  }

  const onRoleSave = (userId, newUserRoleId) => {
    request(`/users/${userId}`, "PATCH", {roleId: newUserRoleId}).then(() => {
      setInitialRoleId(newUserRoleId);
    })
  }

  const isSaveButtonDisabled = selectedRoleId === initialRoleId;

  return (
    <div className={className}>
      <TableRow border={true}>
        <div className="login-column">{login}</div>
        <div className="registered-at-column">{createdAt}</div>

        <div className="role-column">
          <select value={selectedRoleId} onChange={onRoleChange}>
            {roles.map(({ id: roleId, name: roleName }) => {
              return <option key={roleId} value={roleId}>{roleName}</option>
            })}
          </select>
          <Icon
            id="fa-floppy-o"
            margin="0 0 0 10px"
            disabled={isSaveButtonDisabled}
            onClick={() => onRoleSave(id, selectedRoleId)}
          />
        </div>
      </TableRow>
      <Icon
        id="fa-trash-o"
        margin="0 0 0 10px"
        onClick={onUserRemove}
      />
    </div>
  )
}

export const UserRow = styled(UserRowContainer)`
  display:flex;
  margin-top: 10px;

  & select {
    padding: 0 5px;
    font-size: 16px;
  }
`;

UserRow.propTypes = {
  id: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  roleId: PROP_TYPE.ROLE_ID.isRequired,
  onUserRemove: PropTypes.func.isRequired,
  roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired
}