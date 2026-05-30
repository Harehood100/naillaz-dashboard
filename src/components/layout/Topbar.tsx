import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

type TopbarProps = {
  title: string;
};

export default function Topbar({
  title,
}: TopbarProps) {
  return (
    <div className="dashboard-topbar">
      <h1 className="page-title">
        {title}
      </h1>

     <div className="topbar-actions">

  <div className="search-container">
    <Search size={18} />

    <input
      type="text"
      placeholder="Search transactions, reports..."
    />
  </div>

  <button className="notification-btn">
    <Bell size={20} />
  </button>

  <div className="profile-section">
    <div className="avatar">
      JD
    </div>

    <ChevronDown size={16} />
  </div>

</div>
    </div>
  );
}