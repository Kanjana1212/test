import React from "react";

export default function AddTransactionModal({ modalFor, form, onChange, onClose, onSubmit, accounts }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{modalFor === "รับ" ? "รายรับใหม่" : modalFor === "จ่าย" ? "รายจ่ายใหม่" : "เป้าหมายใหม่"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-form" onSubmit={onSubmit}>
          <label>บัญชี</label>
          <select name="account" value={form.account} onChange={onChange}>
            {accounts.map((a) => <option key={a.name} value={a.name}>{a.name}</option>)}
          </select>

          <label>วันที่</label>
          <input type="date" name="date" value={form.date} onChange={onChange} />

          <label>หมวดหมู่</label>
          <input name="category" value={form.category} onChange={onChange} placeholder="เช่น ค่าอาหาร" />

          <label>ชื่อรายการ</label>
          <input name="title" value={form.title} onChange={onChange} placeholder="ชื่อรายการ" />

          <label>จำนวนเงิน</label>
          <input name="amount" type="number" value={form.amount} onChange={onChange} placeholder="จำนวนเงิน" />

          <label>โน้ต</label>
          <input name="note" value={form.note} onChange={onChange} placeholder="โน้ต (ถ้ามี)" />

          {modalFor === "เป้าหมาย" && (
            <>
              <label>URL รูปภาพ</label>
              <input name="image" value={form.image || ""} onChange={onChange} placeholder="ใส่ URL รูปภาพ" />
              {form.image && <img src={form.image} alt="Preview" style={{ width: "80px", marginTop: "5px" }} />}
            </>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>ยกเลิก</button>
            <button type="submit" className="btn-save">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
}
