import React, { useContext, useEffect, useState } from "react";

const UserContext = React.createContext();

function ParentComponent({ children }) {
  const [userState, setUserState] = useState({
    Namık: true,
    Eda: true,
    Suzan: true,
    Engin: true,
    Samet: true
  });

  // KODUNUZ BURAYA GELECEK
  const sharedValues = {
    userState,
    setUserState
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUser = Object.keys(userState)[
        Math.floor(Math.random() * Object.keys(userState).length)
      ];

      setUserState((prevUserState) => ({
        ...prevUserState,
        [randomUser]: !prevUserState[randomUser]
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserContext.Provider value={sharedValues}>{children}</UserContext.Provider>
  );
}

const UserList = () => {
  // KODUNUZ BURAYA GELECEK
  const { userState } = useContext(UserContext);

  return (
    <div>
      {Object.entries(userState).map(([username, isOnline]) => {
        const id = crypto.randomUUID();
        return (
          <div key={id}>
            {username}: {isOnline ? "🟢" : "🔴"}
          </div>
        );
      })}
    </div>
  );
};

const App = () => {
  return (
    <ParentComponent>
      <UserList />
    </ParentComponent>
  );
};

export default App;
