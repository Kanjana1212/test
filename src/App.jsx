import React, { useState } from "react";
import Login from "./Login";
import Home from "./Home";
import Accounts from "./Accounts";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home"); // หน้าเริ่มต้นคือ home

  const handleLogout = () => {
    setUser(null);
    setPage("home"); // กลับไปหน้า home หลัง logout
  };

  // ✅ ถ้ายังไม่ได้ login → แสดงหน้า Login
  if (!user) {
    return <Login onLogin={(email) => setUser(email)} />;
  }

  // ✅ หลัง login แล้ว → เช็คว่าต้องแสดงหน้าไหน
  if (page === "accounts") {
    return <Accounts onBack={() => setPage("home")} />;
  }

  // ✅ ถ้าไม่ใช่ accounts → แสดงหน้า Home
  return (
    <Home
      user={user}
      onLogout={handleLogout}
      onGoAccounts={() => setPage("accounts")}
    />
  );
}
