import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import { Search } from "@kaspersky/components";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
}

interface UserListProps {
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="wrapper">
      <div className="head">
        <h2>Список пользователей</h2>
        <Search
          value={searchQuery}
          placeholder="Поиск пользователя..."
          onChange={handleSearchChange} 
          onClearClick={handleClearSearch}
          className="input"

        />
      </div>

      <div className="options">
        <p>Имя Фамилия</p>
        <p>Статус</p>
        <p>Роль</p>
      </div>
      <ul className="list">
        {filteredUsers.map((user) => (
          <li key={user.id} onClick={() => onUserSelect(user)}>
            <p>{user.firstName} {user.lastName}</p>
            <p>{user.status}</p>
            <p>{user.role == 'guest' ? 'Гость' :user.role == 'admin' ? 'Администратор' : 'Пользователь'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
