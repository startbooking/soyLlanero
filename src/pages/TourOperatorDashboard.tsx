
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TourOperatorSidebar } from "@/components/tour-operator/TourOperatorSidebar";
import { TourOperatorHeader } from "@/components/tour-operator/TourOperatorHeader";
import { CompanyInfoSection } from "@/components/tour-operator/sections/CompanyInfoSection";
import { PricingSection } from "@/components/tour-operator/sections/PricingSection";
import { AvailabilitySection } from "@/components/tour-operator/sections/AvailabilitySection";
import { MessagesSection } from "@/components/tour-operator/sections/MessagesSection";
import { ReviewsSection } from "@/components/tour-operator/sections/ReviewsSection";

const TourOperatorDashboard = () => {
  const [currentSection, setCurrentSection] = useState("company-info");

  const renderSection = () => {
    switch (currentSection) {
      case "company-info":
        return <CompanyInfoSection />;
      case "pricing":
        return <PricingSection />;
      case "availability":
        return <AvailabilitySection />;
      case "messages":
        return <MessagesSection />;
      case "reviews":
        return <ReviewsSection />;
      default:
        return <CompanyInfoSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <TourOperatorSidebar 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        <div className="flex-1">
          <TourOperatorHeader />
          <main className="p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default TourOperatorDashboard;
