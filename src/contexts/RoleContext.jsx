import { createContext, useContext, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within RoleProvider');
  return context;
};

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [pillarsProgress, setPillarsProgress] = useState({
    inclusion: 0,
    responsabilite: 0,
    durabilite: 0
  });

  return (
    <RoleContext.Provider value={{ role, setRole, pillarsProgress, setPillarsProgress }}>
      {children}
    </RoleContext.Provider>
  );
};