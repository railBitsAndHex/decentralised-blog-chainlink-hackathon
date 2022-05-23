import React, { useState, useEffect } from "react";
import "../styles/profileInfoGrid.modules.css";
import { useAuth } from "./../context/AuthContext";
import { bpGraphData, graphObj } from "./../helper/graphCreate";
import { useParams } from "react-router-dom";
import {
  XAxis,
  YAxis,
  BarChart,
  Tooltip,
  Legend,
  Bar,
  CartesianGrid,
} from "recharts";
import { useAccountsChanged } from "../hooks/AuthHooks";
function ProfileStats() {
  // const { accounts } = useAuth();
  useAccountsChanged();
  const [statsData, setStatsData] = useState([]);
  const { uid } = useParams();
  console.log(`UID: ${uid}`);
  useEffect(() => {
    const getData = async (uid: string) => {
      const data: any = await bpGraphData(uid);
      setStatsData(data);
    };
    if (uid !== undefined) getData(uid);
  }, [uid]);

  return (
    <>
      <section className="posting-stats-sect">
        <div className="posting-stats-title">Posting Stats</div>
        <div className="posting-stats-graph-div">
          {statsData && (
            <BarChart width={600} height={250} data={statsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis interval={1} />
              <Tooltip />
              <Legend />
              <Bar dataKey="blogPostCount" fill="#0096c7" />
            </BarChart>
          )}
        </div>
      </section>
    </>
  );
}

export default ProfileStats;
