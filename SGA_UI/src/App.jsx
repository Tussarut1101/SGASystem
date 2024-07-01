import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Login/Login";
import Home from "./Login/Home";
import TransactionMain from "./Transaction/Main/TransactionMain";
import TransactionDetail from "./Transaction/Detail/TransactionDetail";
import MasterPeriod from "./Master/Period/Period";
import MasterCategory from "./Master/Category/CategoryM";
import ReportResult from "./Report/Result/ResultRPT";

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/SGASystem" element={<Login />} />
          <Route path="/SGASystem/Home" element={<Home />} />
          <Route path="/SGASystem/Transaction" element={<TransactionMain />} />
          <Route path="/SGASystem/TransactionDetail" element={<TransactionDetail />} />
          <Route path="/SGASystem/Master/Period" element={<MasterPeriod />} />
          <Route path="/SGASystem/Master/Category" element={<MasterCategory />} />
          <Route path="/SGASystem/Report/Result" element={<ReportResult />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
export default App;