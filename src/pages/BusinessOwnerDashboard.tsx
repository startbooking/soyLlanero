
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BusinessOwnerSidebar } from "@/components/business-owner/BusinessOwnerSidebar";
import { BusinessOwnerHeader } from "@/components/business-owner/BusinessOwnerHeader";
import { CompanySection } from "@/components/business-owner/sections/CompanySection";
import { MessagesSection } from "@/components/business-owner/sections/MessagesSection";
import { StatisticsSection } from "@/components/business-owner/sections/StatisticsSection";

const BusinessOwnerDashboard = () => {
  const [currentSection, setCurrentSection] = useState("company");

  const renderSection = () => {
    switch (currentSection) {
      case "company":
        return <CompanySection />;
      case "messages":
        return <MessagesSection />;
      case "statistics":
        return <StatisticsSection />;
      default:
        return <CompanySection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <BusinessOwnerSidebar 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        <div className="flex-1">
          <BusinessOwnerHeader />
          <main className="p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BusinessOwnerDashboard;
