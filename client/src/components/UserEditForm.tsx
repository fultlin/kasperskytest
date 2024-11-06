import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Button, Radio, StyledInput } from "@kaspersky/components";
import { RadioChangeEvent } from "antd/es/radio";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
}

interface UserEditFormProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onCancel: () => void;
}

const UserEditForm: React.FC<UserEditFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [editableUser, setEditableUser] = useState<User>({ ...user });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    setEditableUser(user);
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  const handleStatusChange = (e: RadioChangeEvent) => {
    const { value } = e.target;
    setEditableUser({ ...editableUser, status: value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/users/${editableUser.id}`,
        editableUser
      );
      onSave(response.data);
      setEditableUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancel = () => {
    setEditableUser(user); 
    setIsEditing(false); 
  };

  return (
    <div>
      {!isEditing ? (
        <div className="wrapper">
          <h2>Информация о пользователе</h2>
          <p>Имя: {editableUser.firstName}</p>
          <p>Фамилия: {editableUser.lastName}</p>
          <p>Статус: {editableUser.status === "active" ? "Активный" : "Неактивный"}</p>
          <p>Роль: {editableUser.role === "guest" ? "Гость" : editableUser.role === "admin" ? "Администратор" : "Пользователь"}</p>
          <div className="buttons">
            <Button text="Edit" onClick={() => setIsEditing(true)} />
            <Button text="Close" onClick={onCancel} />
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <h2>Редактирование пользователя</h2>
          <div className="inputcontent">
            <label htmlFor="firstName">Имя</label>
            <StyledInput
              name="firstName"
              value={editableUser.firstName}
              onChange={handleChange}
              placeholder="Имя"
              className="input"
            />
          </div>

          <div className="inputcontent">
            <label htmlFor="lastName">Фамилия</label>
            <StyledInput
              name="lastName"
              value={editableUser.lastName}
              onChange={handleChange}
              placeholder="Фамилия"
              className="input"
            />
          </div>

          <div className="inputcontent">
            <label>Статус</label>
            <Radio
              options={[
                { label: "Активный", value: "active" },
                { label: "Неактивный", value: "inactive" },
              ]}
              value={editableUser.status}
              onChange={handleStatusChange}
              className="radio"
            />
          </div>

          <div className="inputcontent">
            <label htmlFor="role">Роль</label>
            <select
              name="role"
              value={editableUser.role}
              onChange={handleChange}
              className="accardion"
            >
              <option value="admin">Администратор</option>
              <option value="user">Пользователь</option>
              <option value="guest">Гость</option>
            </select>
          </div>

          <div className="buttons">
            <Button text="Save" onClick={handleSave} />
            <Button text="Cancel" onClick={handleCancel} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEditForm;
