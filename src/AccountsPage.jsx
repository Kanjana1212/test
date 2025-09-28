import { useState } from "react";
import "./Accounts.css";

export default function AccountsPage({ onGoHome }) {
  const [accounts, setAccounts] = useState([
    { id: 1, name: "กรุงไทย", balance: 2843 },
    { id: 2, name: "กสิกร", balance: 2000 },
    { id: 3, name: "เงินสด", balance: 0 },
  ]);

  const [incomes, setIncomes] = useState([
    { id: 1, title: "เงินเดือน", amount: 10000 },
  ]);

  const [expenses, setExpenses] = useState([
    { id: 1, title: "ค่าอาหาร", amount: 500 },
  ]);

  return (
    <div className="container">
      {/* ปุ่มกลับ */}
      <button className="back-btn" onClick={onGoHome}>
        ← กลับ
      </button>

      <h1 className="page-title">📒 บัญชี</h1>

      {/* บัญชี */}
      <div className="accounts-grid">
        {accounts.map((acc) => (
          <div key={acc.id} className="card">
            <span className="account-name">{acc.name}</span>
            <span className="account-balance">
              THB {acc.balance.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* รายรับ */}
      <Section title="รายรับ" items={incomes} color="green" />

      {/* รายจ่าย */}
      <Section title="รายจ่าย" items={expenses} color="red" />

      {/* การลงทุนและเป้าหมาย */}
      <Section title="การลงทุนและเป้าหมาย" items={[]} color="blue" />
    </div>
  );
}

function Section({ title, items, color }) {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-card">
        {items.length > 0 ? (
          <ul className="list">
            {items.map((item) => (
              <li key={item.id} className="list-item">
                <span>{item.title}</span>
                <span className={`amount ${color}`}>
                  THB {item.amount.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">ยังไม่มีข้อมูล</p>
        )}
        <button className="new-btn">+ New</button>
      </div>
    </div>
  );
}
