import { useEffect, useState } from 'react';
import { PrivateContent, H2 } from '../../components';
import { TableRow, UserRow } from './components';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { checkAccess, request } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

const UsersContainer = ({ className }) => {
  const userRole = useSelector(selectUserRole)
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [shouldUpdateUsersList, setShouldUpdateUsersList] = useState(false)

  useEffect(() => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return
    }

    Promise.all([
      request('/users'),
      request('/users/roles')
    ]).then(([usersRes, rolesRes]) => {
      if (usersRes.error || rolesRes.error) {
        setErrorMessage(usersRes.error || rolesRes.error);
        return;
      }
      setUsers(usersRes.data);
      setRoles(rolesRes.data);
    }).catch(err => console.log);
  }, [shouldUpdateUsersList, userRole]);

  const onUserRemove = (userId) => {
    if (!checkAccess([ROLE.ADMIN], userRole)) {
      return
    }
    request(`/users/${userId}`, "DELETE")
      .then(() => {
        setShouldUpdateUsersList(!shouldUpdateUsersList);
      })
  }

  return (
    <PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
      <div className={className}>
        <H2>Пользователи</H2>

        <div>
          <TableRow>
            <div className="login-column">Логин</div>
            <div className="registered-at-column">Дата регистрации</div>
            <div className="role-column">Роль</div>
          </TableRow>

          {users.map(({ id, login, createdAt, roleId }) => {
            return <UserRow
              key={id}
              id={id}
              login={login}
              createdAt={createdAt}
              roleId={roleId}
              roles={roles.filter(({ id: roleId }) => roleId !== ROLE.GUEST)}
              onUserRemove={() => onUserRemove(id)}
            />
          })}
        </div>
      </div>
    </PrivateContent>
  )
}

export const Users = styled(UsersContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 570px;
  font-size: 18px;
`;