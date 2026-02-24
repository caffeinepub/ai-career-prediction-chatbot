import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useGetCallerUserProfile';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import ProfileSetupModal from './components/ProfileSetupModal';
import LandingPage from './components/LandingPage';

export default function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <Layout>
      {showProfileSetup && <ProfileSetupModal />}
      {!showProfileSetup && <ChatInterface />}
    </Layout>
  );
}
