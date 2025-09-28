import React from "react";
import "./Table.css";

export default function IncomePage({ transactions, onBack }) {
  const incomes = transactions.filter((t) => t.type === "รับ");

  return (
    <div className="page">
      <header className="page-header">
        <button onClick={onBack} className="back-btn">⬅ กลับ</button>
        <h2>รายการรายรับทั้งหมด</h2>
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
          {incomes.map((t, i) => (
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td>{t.account}</td>
              <td className="income">{t.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
