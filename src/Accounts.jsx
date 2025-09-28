import React, { useState } from "react";
import { FaUniversity, FaMoneyBillWave, FaPlusCircle } from "react-icons/fa";
import "./Accounts.css";

export default function Accounts({ onBack }) {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "กรุงไทย", balance: 2843.0, type: "bank" },
    { id: 2, name: "กสิกร", balance: 2000.0, type: "bank" },
    { id: 3, name: "เงินสด", balance: 0.0, type: "cash" },
  ]);

  const [newName, setNewName] = useState("");
  const [newBalance, setNewBalance] = useState("");

  const addAccount = (e) => {
    e.preventDefault();
    if (newName && newBalance) {
      setAccounts([
        ...accounts,
        {
          id: accounts.length + 1,
          name: newName,
          balance: parseFloat(newBalance),
          type: "bank", // ค่า default ให้เป็น bank
        },
      ]);
      setNewName("");
      setNewBalance("");
    }
  };

  const getIcon = (type) => {
    if (type === "bank") return <FaUniversity className="account-icon" />;
    if (type === "cash") return <FaMoneyBillWave className="account-icon" />;
    return <FaUniversity className="account-icon" />;
  };

  return (
    <div className="accounts-page">
      <header className="accounts-header">
        <button className="back-btn" onClick={onBack}>
          ⬅ กลับ
        </button>
        <h1>บัญชี</h1>
      </header>

      <section className="accounts-grid">
        {accounts.map((acc) => (
          <div key={acc.id} className="account-card">
            {getIcon(acc.type)}
            <div className="account-info">
              <h3>{acc.name}</h3>
              <p>
                THB{" "}
                {acc.balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        ))}

        {/* การ์ดเพิ่มบัญชี */}
        <div className="account-card add-card">
          <FaPlusCircle className="account-icon add-icon" />
          <h3>เพิ่มบัญชี</h3>
          <form onSubmit={addAccount}>
            <input
              type="text"
              placeholder="ชื่อบัญชี"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="number"
              placeholder="ยอดเงินเริ่มต้น"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
            />
            <button type="submit">บันทึก</button>
          </form>
        </div>
      </section>
    </div>
  );
}
