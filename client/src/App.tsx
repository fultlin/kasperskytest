import React, { useState } from "react";
import UserList from "./components/UserList";
import UserEditForm from "./components/UserEditForm";
import { ConfigProvider } from "@kaspersky/components/design-system/context/provider";
import { GlobalStyle } from "@kaspersky/components/design-system/global-style";
import { LangVariants } from "@kaspersky/components/helpers/localization/types";
import { ThemeKey } from "@kaspersky/components/design-system/types";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  role: string;
}

const App: React.FC = () => {
  const [themeKey] = useState<ThemeKey>(ThemeKey.Dark);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
  };

  return (
    <ConfigProvider theme={themeKey} locale={LangVariants.EnUs}>
      <GlobalStyle />
      <main>
        {selectedUser ? (
          <UserEditForm
            user={selectedUser}
            onSave={handleSaveUser}
            onCancel={handleCancelEdit}
          />
        ) : (
          <UserList onUserSelect={handleUserSelect} />
        )}
      </main>
    </ConfigProvider>
  );
};

export default App;
