import React from "react";
import { DBInfo, DBSidebar } from "../components";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBSidebar />
      <DBInfo />
    </div>
  );
};

export default Dashboard;
