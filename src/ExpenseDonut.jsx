import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

export default function ExpenseDonut({ income, expense }) {
  const data = {
    labels: ["รายรับ", "รายจ่าย"],
    datasets: [
      {
        data: [income, expense],
        backgroundColor: ["#188f4eff", "#d63c3cff"], // เขียว/แดง
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",           // ช่องกลางกว้าง
    plugins: {
      legend: { position: "bottom", labels: { color: "#494949ff" } },
    },
  };

  return <Doughnut data={data} options={options} />;
}
