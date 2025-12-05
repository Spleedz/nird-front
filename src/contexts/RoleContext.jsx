import { createContext, useContext, useState, useEffect } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) throw new Error('useRole must be used within RoleProvider');
  return context;
};

export const RoleProvider = ({ children }) => {
  const [role, setRoleState] = useState(null);
  const [pillarsProgress, setPillarsProgress] = useState({
    inclusion: 0,
    responsabilite: 0,
    durabilite: 0
  });

  // Charger le rôle depuis localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('nird-selected-role');
    if (savedRole) {
      setRoleState(savedRole);
    }
  }, []);

  // Wrapper pour setRole qui persiste
  const setRole = (newRole) => {
    setRoleState(newRole);
    localStorage.setItem('nird-selected-role', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole, pillarsProgress, setPillarsProgress }}>
      {children}
    </RoleContext.Provider>
  );
};
