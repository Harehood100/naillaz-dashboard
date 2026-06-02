type NotificationType = "warning" | "critical" | "success";

type NotificationCardProps = {
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  actions?: string[];
};

const icons = {
  warning: "!",
  critical: "!",
  success: "✓",
};

export default function NotificationCard({
  type,
  title,
  message,
  time,
  actions = [],
}: NotificationCardProps) {
  return (
    <div className={`notification-card ${type}`}>
      <div className="notification-top">
        <div className="notification-content">
          <div className="notification-title-row">
            <span className={`notification-icon ${type}`}>{icons[type]}</span>
            <h4>{title}</h4>
          </div>

          <p>{message}</p>

          {actions.length > 0 && (
            <div className="notification-actions">
              {actions.map((action) => (
                <button key={action} type="button">
                  {action}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="notification-time">{time}</span>
      </div>
    </div>
  );
}