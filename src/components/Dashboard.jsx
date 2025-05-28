import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Users, Calendar, IndianRupee, Mail, Lightbulb } from "lucide-react";

const dashboardData = {
  appointments: {
    byUrgency: {
      total: 440,
      categories: [
        { name: "Very Booking", value: 200, color: "#10B981" },
        { name: "Web Old", value: 50, color: "#F59E0B" },
        { name: "Pending", value: 20, color: "#EF4444" },
        { name: "Advance Booking", value: 170, color: "#3B82F6" },
      ],
    },
  },
  revenue: {
    monthly: [
      { month: "Jan", received: 8, resolved: 12, escalated: 2 },
      { month: "Feb", received: 12, resolved: 15, escalated: 3 },
      { month: "March", received: 10, resolved: 18, escalated: 2 },
      { month: "April", received: 15, resolved: 14, escalated: 1 },
      { month: "May", received: 18, resolved: 16, escalated: 2 },
      { month: "June", received: 14, resolved: 20, escalated: 1 },
      { month: "July", received: 16, resolved: 12, escalated: 3 },
      { month: "Aug", received: 12, resolved: 18, escalated: 2 },
      { month: "Sep", received: 18, resolved: 15, escalated: 1 },
      { month: "Oct", received: 14, resolved: 17, escalated: 2 },
      { month: "Nov", received: 16, resolved: 14, escalated: 3 },
      { month: "Dec", received: 12, resolved: 16, escalated: 2 },
    ],
    summary: {
      received: 42,
      resolved: 25,
      escalated: 3,
    },
  },
  productSales: {
    products: [
      { name: "Bed", percentage: 33, color: "#1E40AF" },
      { name: "Cabinet", percentage: 33, color: "#FBBF24" },
      { name: "Wardrobe", percentage: 25, color: "#F87171" },
      { name: "Drawer", percentage: 16, color: "#FDE047" },
      { name: "Table", percentage: 16, color: "#FB7185" },
    ],
  },
  metrics: {
    visitors: "18.4k",
    appointments: "16.4k",
    sales: "15.2k",
    emailSubs: "12.6k",
  },
};

const statsCards = [
  {
    icon: <Users className="w-5 h-5 text-blue-600" />,
    title: "Visitors",
    value: dashboardData.metrics.visitors,
  },
  {
    icon: <Calendar className="w-5 h-5 text-blue-600" />,
    title: "Appointments",
    value: dashboardData.metrics.appointments,
  },
  {
    icon: <IndianRupee className="w-5 h-5 text-blue-600" />,
    title: "Sales",
    value: dashboardData.metrics.sales,
  },
  {
    icon: <Mail className="w-5 h-5 text-blue-600" />,
    title: "Email Subs.",
    value: dashboardData.metrics.emailSubs,
  },
];

const COLORS = ["#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

const Dashboard = () => {
  // Data structure for future API integration
  return (
    <div className=" w-full card-container max-w-[1550px] mx-auto min-h-screen bg-white rounded-xl border border-gray-200 shadow-md mb-8 px-1 py-6 md:p-6">
      {/* Dashboard Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center text-2xl gap-2">
          <Lightbulb size={30} />
          <span className="font-semibold">Settings</span>
        </div>
      </div>

      {/* Main Content container */}

      <div className="w-full grid lg:grid-cols-12  gap-6 mb-6">
        {/* Appointment by Urgency */}
        <div className="bg-white lg:col-span-5  rounded-lg shadow-md border-gray-200 border pb-6">
          <h3 className="text-lg border-b-2 border-gray-200 font-semibold text-gray-800 mb-6 p-4">
            Appointment by urgency
          </h3>
          <div className="flex items-center justify-center px-6">
            <div className="relative">
              <PieChart width={200} height={200}>
                <Pie
                  data={dashboardData.appointments.byUrgency.categories}
                  cx={100}
                  cy={100}
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dashboardData.appointments.byUrgency.categories.map(
                    (entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    )
                  )}
                </Pie>
              </PieChart>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800">
                  {dashboardData.appointments.byUrgency.total}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 px-6">
            {dashboardData.appointments.byUrgency.categories.map(
              (category, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{category.name}</span>
                  <span className="text-sm font-medium ml-auto">
                    {category.value}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white lg:col-span-7  rounded-lg shadow-md border-gray-200 border pb-6">
          <div className="flex items-center justify-between flex-wrap mb-6 border-b-2 border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-800">Revenue</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>Received</span>
                <span className="font-medium">
                  {dashboardData.revenue.summary.received}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Resolved</span>
                <span className="font-medium">
                  {dashboardData.revenue.summary.resolved}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span>Escalated</span>
                <span className="font-medium">
                  {dashboardData.revenue.summary.escalated}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full px-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dashboardData.revenue.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#666" }}
                />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10B981"
                  strokeWidth={2}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="escalated"
                  stroke="#EF4444"
                  strokeWidth={2}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full space-y-6 mt-12">
        <h3 className="text-lg font-semibold text-gray-800">
          Top Product Sales
        </h3>
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Top Product Sales */}
          <div className="w-full lg:col-span-5 h-full flex lg:flex-row rounded-2xl p-6 bg-white shadow-md border-gray-200 border items-center justify-between md:p-x-24 mb-6 lg:mb-0">
            <PieChart width={200} height={200}>
              <Pie
                data={dashboardData.productSales.products}
                cx={100}
                cy={100}
                innerRadius={50}
                outerRadius={90}
                paddingAngle={2}
                dataKey="percentage"
              >
                {dashboardData.productSales.products.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>

            <div className="space-y-3">
              {dashboardData.productSales.products.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: product.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {product.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    {product.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Cards */}
          <div className=" w-full lg:col-span-7 grid grid-cols-2 gap-4">
            {statsCards.map((card, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {card.title}
                  </span>
                </div>
                <p className="text-3xl font-bold text-center text-gray-800">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
