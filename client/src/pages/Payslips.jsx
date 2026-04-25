import React, { useCallback, useEffect, useState } from "react";
import { dummyEmployeeData, dummyPayslipData } from "../assets/assets";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipsForm from "../components/payslip/GeneratePayslipsForm";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = true;
  const fetchPayslips = useCallback(async () => {
    setPayslips(dummyPayslipData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    if (isAdmin) setEmployees(dummyEmployeeData);
  }, [isAdmin]);

  if (loading) return <Loading />;
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 ">
        <div>
          <h1 className="page-title">Payslips</h1>
          <p className="page-subtitle">
            {isAdmin
              ? "Genrate and manage employee payslips"
              : "Your payslips history"}
          </p>
        </div>
        {isAdmin && <GeneratePayslipsForm employees={employees} onSuccess={fetchPayslips} />}
      </div>
      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;
