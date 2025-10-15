import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  name: string;
  calorieGoal: number;
}

interface UserContextType {
  user: User;
  updateUser: (user: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    name: 'Guest',
    calorieGoal: 2000,
  });

  const updateUser = (updatedUser: Partial<User>) => {
    setUser(prevUser => ({ ...prevUser, ...updatedUser }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
