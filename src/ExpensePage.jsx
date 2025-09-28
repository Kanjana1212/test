import React from "react";
import "./Table.css";

export default function ExpensePage({ transactions, onBack }) {
  const expenses = transactions.filter((t) => t.type === "จ่าย");

  return (
    <div className="page">
      <header className="page-header">
        <button onClick={onBack} className="back-btn">⬅ กลับ</button>
        <h2>รายการรายจ่ายทั้งหมด</h2>
      </header>

      <table className="data-table">
        <thead>
          <tr>
            <th>วันที่</th>
            <th>ชื่อรายการ</th>
            <th>หมวดหมู่</th>
            <th>บัญชี</th>
            <th>จำนวนเงิน</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td>{t.account}</td>
              <td className="expense">{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
