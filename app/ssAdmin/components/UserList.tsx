import React from 'react';

// Interface untuk props komponen UserList
interface UserListProps {
  users: string[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <ul className="divide-y divide-gray-200">
      {users.map(user => (
        <li key={user} className="p-4 flex items-center">
          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {user.charAt(0).toUpperCase()}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user}</div>
            <div className="text-sm text-gray-500">Connected</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
