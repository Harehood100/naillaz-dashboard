type NotificationTab = "all" | "warning" | "critical" | "success";

type NotificationTabsProps = {
  activeTab: NotificationTab;
  onTabChange: (tab: NotificationTab) => void;
};

const tabs: { label: string; value: NotificationTab }[] = [
  { label: "All", value: "all" },
  { label: "Warning", value: "warning" },
  { label: "Critical", value: "critical" },
  { label: "Success", value: "success" },
];

export default function NotificationTabs({
  activeTab,
  onTabChange,
}: NotificationTabsProps) {
  return (
    <div className="notification-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          className={activeTab === tab.value ? "active" : ""}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}