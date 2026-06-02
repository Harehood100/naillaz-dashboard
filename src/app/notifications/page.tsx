"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import NotificationTabs from "@/components/notifications/NotificationTabs";
import NotificationCard from "@/components/notifications/NotificationCard";
import "./notifications.css";

type NotificationType = "warning" | "critical" | "success";

const notifications = [
  {
    group: "TODAY",
    type: "warning" as const,
    title: "Budget Exceeded",
    message:
      'Your "Entertainment" budget has exceeded its monthly limit by $145.00. Automatic transfers have been paused.',
    time: "10:45 AM",
    actions: ["Fix Now", "View Details"],
  },
  {
    group: "TODAY",
    type: "success" as const,
    title: "Savings Goal Reached",
    message: 'Congratulations! You have reached your "Summer Vacation" goal of $5000.',
    time: "08:30 AM",
    actions: ["View History"],
  },
  {
    group: "TODAY",
    type: "critical" as const,
    title: "Unusual Activity Detected",
    message: "A login attempt was made by an unrecognized device in Frankfurt, Germany.",
    time: "03:15 PM",
    actions: ["Secure Account", "Not Me"],
  },
  {
    group: "TODAY",
    type: "warning" as const,
    title: "Monthly Expenses Review",
    message: "Your expenditures for the month of May are ready.",
    time: "06:12 AM",
    actions: ["View"],
  },
  {
    group: "YESTERDAY",
    type: "success" as const,
    title: "Payment Processed",
    message: 'Automatic payment of $89.00 to "Cloud Services Inc." has been processed.',
    time: "Yesterday",
    actions: ["View Receipt"],
  },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<"all" | NotificationType>("all");

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((notification) => notification.type === activeTab);

  const groups = ["TODAY", "YESTERDAY"];

  return (
    <AppLayout title="Notifications" activePage="notifications">
      <div className="notifications-page">
        <div className="notifications-header">
    
          <p>Stay updated with your account activity and financial health alerts.</p>
        </div>

        <NotificationTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {groups.map((group) => {
          const groupNotifications = filteredNotifications.filter(
            (notification) => notification.group === group
          );

          if (groupNotifications.length === 0) return null;

          return (
            <div className="notification-group" key={group}>
              <h3>{group}</h3>

              {groupNotifications.map((notification) => (
                <NotificationCard
                  key={`${notification.group}-${notification.title}`}
                  type={notification.type}
                  title={notification.title}
                  message={notification.message}
                  time={notification.time}
                  actions={notification.actions}
                />
              ))}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}