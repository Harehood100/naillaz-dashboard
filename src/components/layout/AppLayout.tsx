import Sidebar from "./sidebar";
import Footer from "./Footer";
import Topbar from "./Topbar";

type AppLayoutProps = {
  title: string;
  activePage: string;
  children: React.ReactNode;
};

export default function AppLayout({
  title,
  activePage,
  children,
}: AppLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar activePage={activePage} />

      <main className="dashboard-content">
        <Topbar title={title} />

        {children}

        <Footer />
      </main>
    </div>
  );
}