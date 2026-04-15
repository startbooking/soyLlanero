
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TouristSidebar } from "@/components/tourist/TouristSidebar";
import { TouristHeader } from "@/components/tourist/TouristHeader";
import { ActivitiesSection } from "@/components/tourist/sections/ActivitiesSection";
import { MessagesSection } from "@/components/tourist/sections/MessagesSection";
import { ProfileSection } from "@/components/tourist/sections/ProfileSection";

const TouristDashboard = () => {
  const [currentSection, setCurrentSection] = useState("activities");

  const renderSection = () => {
    switch (currentSection) {
      case "activities":
        return <ActivitiesSection />;
      case "messages":
        return <MessagesSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <ActivitiesSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <TouristSidebar 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        <div className="flex-1">
          <TouristHeader />
          <main className="p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TouristDashboard;
