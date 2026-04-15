
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GuestSidebar } from "@/components/guest/GuestSidebar";
import { GuestHeader } from "@/components/guest/GuestHeader";
import { BookingsSection } from "@/components/guest/sections/BookingsSection";
import { MessagesSection } from "@/components/guest/sections/MessagesSection";
import { ProfileSection } from "@/components/guest/sections/ProfileSection";
import { ReviewsSection } from "@/components/guest/sections/ReviewsSection";

const GuestDashboard = () => {
  const [currentSection, setCurrentSection] = useState("bookings");

  const renderSection = () => {
    switch (currentSection) {
      case "bookings":
        return <BookingsSection />;
      case "messages":
        return <MessagesSection />;
      case "reviews":
        return <ReviewsSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <BookingsSection />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <GuestSidebar 
          currentSection={currentSection} 
          onSectionChange={setCurrentSection} 
        />
        <div className="flex-1">
          <GuestHeader />
          <main className="p-6">
            {renderSection()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default GuestDashboard;
