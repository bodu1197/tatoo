
import React, { useState } from 'react';
import type { ArtistUser, Tattoo, Event, Review, AdminView, Payment } from '../../types';
import { AdminSidebar } from './AdminSidebar';
import { AdminDashboard } from './AdminDashboard';
import { ArtistApprovalPage } from './ArtistApprovalPage';
import { UserManagementPage } from './UserManagementPage';
import { AnalyticsPage } from './AnalyticsPage';
import { AdManagementPage } from './AdManagementPage';
import { ContentManagementPage } from './ContentManagementPage';
import { RevenueManagementPage } from './RevenueManagementPage';

interface AdminPageProps {
  allArtists: ArtistUser[];
  allTattoos: Tattoo[];
  allEvents: Event[];
  allReviews: Review[];
  allPayments: Payment[];
  pendingArtists: ArtistUser[];
  onApprove: (artistId: number) => void;
  onReject: (artistId: number) => void;
  onSetSubscription: (artistId: number, days: number | null) => void;
  onDeleteTattoo: (tattooId: number) => void;
  onDeleteEvent: (eventId: number) => void;
  onDeleteReview: (reviewId: number) => void;
  onLogout: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  allArtists,
  allTattoos,
  allEvents,
  allReviews,
  allPayments,
  pendingArtists,
  onApprove,
  onReject,
  onSetSubscription,
  onDeleteTattoo,
  onDeleteEvent,
  onDeleteReview,
  onLogout
}) => {
  const [activeView, setActiveView] = useState<AdminView>('DASHBOARD');

  const renderContent = () => {
    switch (activeView) {
      case 'APPROVAL':
        return <ArtistApprovalPage artists={pendingArtists} onApprove={onApprove} onReject={onReject} />;
      case 'USERS':
        return <UserManagementPage users={allArtists} />;
      case 'ANALYTICS':
        return <AnalyticsPage />;
      case 'ADS':
        return <AdManagementPage artists={allArtists} onSetSubscription={onSetSubscription} />;
      case 'CONTENT':
        return <ContentManagementPage
                  tattoos={allTattoos}
                  events={allEvents}
                  reviews={allReviews}
                  onDeleteTattoo={onDeleteTattoo}
                  onDeleteEvent={onDeleteEvent}
                  onDeleteReview={onDeleteReview}
               />;
      case 'REVENUE':
        return <RevenueManagementPage payments={allPayments} />;
      case 'DASHBOARD':
      default:
        return <AdminDashboard allUsers={allArtists} allPayments={allPayments} pendingCount={pendingArtists.length} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-800 text-gray-200">
      <AdminSidebar activeView={activeView} onNavigate={setActiveView} onLogout={onLogout} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};