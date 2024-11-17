import { styles } from "@/app/styles/style";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loader from "../../Loader/Loader";

// const analyticsData = [
//   {
//     name: "Page A",
//     Count: 4000,
//   },
//   {
//     name: "Page B",
//     Count: 3000,
//   },
//   {
//     name: "Page C",
//     Count: 5000,
//   },
//   {
//     name: "Page D",
//     Count: 1000,
//   },
//   {
//     name: "Page E",
//     Count: 4000,
//   },
//   {
//     name: "Page F",
//     Count: 800,
//   },
//   {
//     name: "Page G",
//     Count: 200,
//   },
// ];

type Props = {
  isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.orders.last12Months.forEach((item: any, index: number) => {
      const date = new Date(item.month);
      const formattedDate = `${(index + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
      analyticsData.push({ name: formattedDate, Count: item.count });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div className={isDashboard ? "mb-2 mt-[0px] pl-[40px]" : "mt-[50px]"}>
            <h1 className={`${styles.title} ${isDashboard && "!text-[20px]"} px-5 !text-start`}>
              Thống kê hóa đơn
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>Thống kê hóa đơn trong năm nay</p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
