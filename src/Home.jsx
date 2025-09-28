import React, { useState } from "react";
import "./Home.css";
import ExpenseDonut from "./ExpenseDonut";
import AddTransactionModal from "./AddTransactionModal";
import GoalCard from "./GoalCard";

export default function Home({ user, onLogout }) {
  const [activeMenu, setActiveMenu] = useState("home");

  const accounts = [
    { name: "กรุงไทย", balance: "THB 2,843.00" },
    { name: "กสิกร", balance: "THB 2,000.00" },
    { name: "เงินสด", balance: "THB 0.00" },
  ];
  
  const [transactions, setTransactions] = useState([
    { type: "รับ", title: "เงินเดือน", amount: "THB 25,000.00", date: "2025-08-01", account: "กสิกร" },
    { type: "จ่าย", title: "ค่าเช่า", amount: "THB 7,500.00", date: "2025-08-03", account: "กรุงไทย" },
    { type: "จ่าย", title: "ค่าไฟ", amount: "THB 1,200.00", date: "2025-08-05", account: "เงินสด" },
    { type: "รับ", title: "โบนัส", amount: "THB 5,000.00", date: "2025-08-10", account: "กสิกร" },
  ]);

  const [goals, setGoals] = useState([]); // ✅ ใส่ตรงนี้

  const budgets = [
    { title: "ค่าอาหาร", amount: 0, icon: "🍜", percent: 0 },
    { title: "ค่าการศึกษา", amount: 0, icon: "📚", percent: 0 },
    { title: "ค่าโรงเรียน", amount: 0, icon: "🏫", percent: 0 },
    { title: "ค่าช้อปปิ้ง", amount: 0, icon: "🛍️", percent: 0 },
    { title: "ค่าโดยสาร", amount: 0, icon: "🚌", percent: 0 },
    { title: "ค่าสังสรรค์", amount: 0, icon: "🎉", percent: 0 },
    { title: "ค่าไฟ", amount: 0, icon: "⚡", percent: 0 },
    { title: "ค่าน้ำ", amount: 0, icon: "💧", percent: 0 },
    { title: "ภาษี", amount: 0, icon: "💸", percent: 0 },
    { title: "ถอนเงินสด", amount: 0, icon: "🏧", percent: 0 },
    { title: "สาธารณูปโภค", amount: 0, icon: "🏠", percent: 0 },
    { title: "บริจาค", amount: 0, icon: "🤝", percent: 0 },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [modalFor, setModalFor] = useState("รับ"); // "รับ" หรือ "จ่าย" หรือ "เป้าหมาย"
  const [form, setForm] = useState({
    type: "รับ",
    account: accounts[0].name,
    date: "",
    category: "",
    title: "",
    amount: "",
    note: "",
    image: "", // ✅ เพิ่มบรรทัดนี้
  });

  const openNewModal = (type) => {
    setModalFor(type);
    setForm({
      type: type === "เป้าหมาย" ? "เป้า" : (type === "รับ" ? "รับ" : "จ่าย"),
      account: accounts[0].name,
      date: new Date().toISOString().split("T")[0],
      category: "",
      title: "",
      amount: "",
      note: "",
      image: "", // ✅ เพิ่มบรรทัดนี้
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ข้างบนกับ handleFormChange
  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(prev => ({ ...prev, image: reader.result })); // reader.result คือ Data URL
    };
    reader.readAsDataURL(file);
  }
  };

const submitForm = (e) => {
  e.preventDefault();

  // แปลงจำนวนเงินเป็น THB พร้อมจุดทศนิยม
  const formattedAmount = `THB ${parseFloat(form.amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  })}`;

  if (modalFor === "เป้าหมาย") {
    const newGoal = {
      title: form.title,
      amount: formattedAmount,
      date: form.date,
      account: form.account,
      note: form.note,
      image: form.image || "", // Data URL ของไฟล์ที่อัปโหลด
    };
    setGoals(prev => [...prev, newGoal]);
  } else {
    const newTransaction = {
      type: form.type,
      title: form.title,
      amount: formattedAmount,
      date: form.date,
      account: form.account,
      note: form.note,
    };
    setTransactions(prev => [...prev, newTransaction]);
  }

  closeModal();
};

  // คำนวณรวม
  const income = transactions
    .filter((t) => t.type === "รับ")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace("THB ", "").replace(/,/g, "")), 0);

  const expense = transactions
    .filter((t) => t.type === "จ่าย")
    .reduce((sum, t) => sum + parseFloat(t.amount.replace("THB ", "").replace(/,/g, "")), 0);

  const renderMainContent = () => {
    if (activeMenu === "income") {
      return (
        <section className="card">
          <h2>รายการรายรับ</h2>
          <div className="transactions">
            <button className="btn-save" onClick={() => openNewModal("รับ")}>+ New</button>
            {transactions
              .filter((t) => t.type === "รับ")
              .map((t, i) => (
                <div key={i} className="transaction-box">
                  <div>
                    <div className="transaction-title">{t.title}</div>
                    <div className="transaction-info">
                      {t.date} • {t.account}
                    {t.note && <div className="transaction-note">{t.note}</div>}
                    </div>
                  </div>
                  <div className="transaction-amount income">{t.amount}</div>
                </div>
              ))}
          </div>
        </section>
      );
    }

    if (activeMenu === "expense") {
      return (
        <section className="card">
          <h2>รายการรายจ่าย</h2>
          <div className="transactions">
            <button className="btn-save" onClick={() => openNewModal("จ่าย")}>+ New</button>
            {transactions
              .filter((t) => t.type === "จ่าย")
              .map((t, i) => (
                <div key={i} className="transaction-box">
                  <div>
                    <div className="transaction-title">{t.title}</div>
                    <div className="transaction-info">
                      {t.date} • {t.account}
                    {t.note && <div className="transaction-note">{t.note}</div>}
                    </div>
                  </div>
                  <div className="transaction-amount expense">{t.amount}</div>
                </div>
              ))}
          </div>
        </section>
      );
    }

    // หน้า Home ปกติ
    return (
      <>
        <section className="card">
          <h2>บัญชี</h2>
          <div className="accounts">
            {accounts.map((a) => (
              <div key={a.name} className="account-box">
                <div className="account-name">{a.name}</div>
                <div className="account-balance">{a.balance}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>รายรับ</h2>
          <div className="transactions">
            <button className="btn-save" onClick={() => openNewModal("รับ")}>+ New</button>
            {transactions
              .filter((t) => t.type === "รับ")
              .map((t, i) => (
                <div key={i} className="transaction-box">
                  <div>
                    <div className="transaction-title">{t.title}</div>
                    <div className="transaction-info">
                      {t.date} • {t.account}
                    {t.note && <div className="transaction-note">{t.note}</div>}
                    </div>
                  </div>
                  <div className="transaction-amount income">{t.amount}</div>
                </div>
              ))}
          </div>
        </section>

        <section className="card">
          <h2>รายจ่าย</h2>
          <div className="transactions">
            <button className="btn-save" onClick={() => openNewModal("จ่าย")}>+ New</button>
            {transactions
              .filter((t) => t.type === "จ่าย")
              .map((t, i) => (
                <div key={i} className="transaction-box">
                  <div>
                    <div className="transaction-title">{t.title}</div>
                    <div className="transaction-info">
                      {t.date} • {t.account}
                    {t.note && <div className="transaction-note">{t.note}</div>}
                    </div>
                  </div>
                  <div className="transaction-amount expense">{t.amount}</div>
                </div>
              ))}
          </div>
        </section>

    <section className="card">
      <h2>การลงทุนและเป้าหมาย</h2>
      <div className="goals">
        <button className="btn-save" onClick={() => openNewModal("เป้าหมาย")}>+ New</button>

        {goals.length === 0 ? (
          <div className="goal-box empty">ยังไม่มีรายการ</div>
        ) : (
          goals.map((g, i) => (
          <div key={i} className="goal-box vertical">
          {g.image && <img src={g.image} alt={g.title} className="goal-image" />}
          <div className="goal-title">{g.title}</div>
          <div className="goal-info">{g.date} • {g.account}</div>
          <div className="goal-amount">{g.amount}</div>
          {g.note && <div className="goal-note">{g.note}</div>}
        </div>
      ))
    )}
    </div>
    </section>
      </>
    );
  };

const renderAsideContent = () => {
  if (activeMenu === "income" || activeMenu === "expense") return null;

  return (
    <>
      {/* ✅ วงกลมสรุปรายรับ-รายจ่าย */}
      <section className="card donut-wrap">
        <h2>สรุปการใช้จ่าย</h2>
        <ExpenseDonut income={income} expense={expense} />
      </section>

      <section className="card">
        <h2>งบประมาณต่อเดือน</h2>
        <div className="budgets-grid">
          {budgets.map((b) => (
            <div key={b.title} className="budget-card">
              <div className="budget-icon">{b.icon}</div>
              <div className="budget-title">{b.title}</div>
              <div className="budget-amount">THB {b.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3>Template</h3>
        <p className="template-info">Notion Template รายรับ-รายจ่าย</p>
        <p className="template-author">By Bundit.lungkla</p>
      </section>
    </>
  );
};


  return (
    <div className="home">
      <header className="home-header">
        <div className="logo-box">$</div>
        <div>
          <h1>รายรับ - รายจ่าย</h1>
          <p>สวัสดี, {user}</p>
        </div>
        <button className="logout-btn" onClick={onLogout}>
          ออกจากระบบ
        </button>
      </header>

      <section className="summary">
        <div className="summary-box income">
          <h3>รายรับ</h3>
          <p>THB {income.toLocaleString()}</p>
        </div>
        <div className="summary-box expense">
          <h3>รายจ่าย</h3>
          <p>THB {expense.toLocaleString()}</p>
        </div>
      </section>

      <div className="home-body">
        <aside className="sidebar">
          <nav>
            <h3>เมนู</h3>
            <ul>
              <li onClick={() => setActiveMenu("home")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                🏦 บัญชี
              </li>
              <li onClick={() => setActiveMenu("income")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                💰 รายรับ
              </li>
              <li onClick={() => setActiveMenu("expense")} style={{ cursor: "pointer", fontWeight: "bold" }}>
                💸 รายจ่าย
              </li>
              <li style={{ fontWeight: "bold" }}>🔄 โอนเงิน</li>
              <li style={{ fontWeight: "bold" }}>⚙️ ตั้งค่า</li>
            </ul>
          </nav>
        </aside>

        <main className="main">{renderMainContent()}</main>
        <aside className="aside">{renderAsideContent()}</aside>
      </div>

      <footer className="footer">ระบบรายรับ - รายจ่าย • ตัวอย่างเทมเพลต</footer>

      {/* -------- Modal Overlay -------- */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalFor === "รับ" ? "รายรับใหม่" : modalFor === "จ่าย" ? "รายจ่ายใหม่" : "เป้าหมายใหม่"}</h3>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>

            <form className="modal-form" onSubmit={submitForm}>
              <label>บัญชี</label>
              <select name="account" value={form.account} onChange={handleFormChange}>
                {accounts.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
              </select>

              <label>วันที่</label>
              <input type="date" name="date" value={form.date} onChange={handleFormChange} />

              <label>หมวดหมู่</label>
              <input name="category" value={form.category} onChange={handleFormChange} placeholder="เช่น ค่าอาหาร" />

              <label>ชื่อรายการ</label>
              <input name="title" value={form.title} onChange={handleFormChange} placeholder="ชื่อรายการ" />

              <label>จำนวนเงิน</label>
              <input name="amount" type="number" value={form.amount} onChange={handleFormChange} placeholder="จำนวนเงิน" />

              <label>โน้ต</label>
              <input name="note" value={form.note} onChange={handleFormChange} placeholder="โน้ต (ถ้ามี)" />
              
                {/* ✅ เพิ่มส่วน URL รูปภาพเฉพาะเป้าหมาย */}
              {modalFor === "เป้าหมาย" && (
              <>
              <label>รูปภาพ</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
    
              {/* preview รูปทันที */}
              {form.image && (
              <img src={form.image} alt="Preview" style={{ width: "80px", marginTop: "5px" }} />
              )}
              </>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={closeModal}>ยกเลิก</button>
                <button type="submit" className="btn-save">บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
