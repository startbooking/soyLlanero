
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DashboardSection } from "@/components/admin/sections/DashboardSection";
import { AppConfigSection } from "@/components/admin/sections/AppConfigSection";
import { UsersSection } from "@/components/admin/sections/UsersSection";
import { BusinessesSection } from "@/components/admin/sections/BusinessesSection";
import { EventsSection } from "@/components/admin/sections/EventsSection";
import { ExperiencesSection } from "@/components/admin/sections/ExperiencesSection";
import { ServicesSection } from "@/components/admin/sections/ServicesSection";
import { NewsSection } from "@/components/admin/sections/NewsSection";
import { MessagesSection } from "@/components/admin/sections/MessagesSection";

const AdminDashboard = () => {
  const [currentSection, setCurrentSection] = useState("dashboard");

  const renderSection = () => {
    switch (currentSection) {
      case "dashboard":
        return <DashboardSection />;
      case "app-config":
        return <AppConfigSection />;
      case "users":
        return <UsersSection />;
      case "businesses":
        return <BusinessesSection />;
      case "events":
        return <EventsSection />;
      case "experiences":
        return <ExperiencesSection />;
      case "services":
        return <ServicesSection />;
      case "news":
        return <NewsSection />;
      case "messages":
        return <MessagesSection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AdminSidebar 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        <div className="flex-1">
          <AdminHeader />
          <main className="p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
