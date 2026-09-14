import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthFlow from './components/AuthFlow';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './components/DashboardHome';
import CommunitySection from './components/CommunitySection';
import CommunityDirectory from './components/CommunityDirectory';
import MessagesSection from './components/MessagesSection';
import UserProfileView from './components/UserProfileView';
import { getUserProfile, buildProfileFromCurrentUser } from './data/userProfilesData';
import { ActiveView, DashboardTab, UserProfile, ChatThread, ChatMessage, ProfileUserData } from './types';
import { Layers, HelpCircle, Eye, MonitorPlay } from 'lucide-react';

export default function App() {
  // Navigation & States
  const [activeView, setActiveView] = useState<ActiveView>(ActiveView.LANDING);
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  
  // Profile navigation state
  const [selectedProfileUser, setSelectedProfileUser] = useState<ProfileUserData | null>(null);
  const [profileInitialTab, setProfileInitialTab] = useState<'overview' | 'collabs' | 'posts' | 'reviews' | 'settings'>('overview');
  
  // Direct Chat trigger parameters
  const [directChatUser, setDirectChatUser] = useState<string | undefined>(undefined);
  const [directChatAvatar, setDirectChatAvatar] = useState<string | undefined>(undefined);

  // Lifted Chat Threads state to preserve chat messages on tab swaps
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 't-1',
      name: 'Afolabi Emmanuel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120',
      lastMessage: 'Awesome workspace! Let us review the database schema tonight.',
      timeString: '14:20',
      category: 'chat',
      messages: [
        { id: 'm-1', sender: 'Afolabi Emmanuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120', content: "Hello! I am excited to kickstart this mock collaboration on Nailand workspace.", time: '14:10', isMe: false },
        { id: 'm-2', sender: 'Me', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120', content: "Same here Afolabi! The Web3 peer design looks highly accurate and responsive.", time: '14:15', isMe: true },
        { id: 'm-3', sender: 'Afolabi Emmanuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120', content: "Awesome workspace! Let us review the database schema tonight.", time: '14:20', isMe: false }
      ]
    },
    {
      id: 't-2',
      name: 'Lola Adebinpe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120',
      lastMessage: 'Attached the wireframe draft...',
      timeString: 'Yesterday',
      category: 'chat',
      messages: [
        { id: 'l-1', sender: 'Lola Adebinpe', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120', content: "Hey! Could you assist me with the React layouts frontend audit? I have attached PDF guidelines wireframes.", time: '18:30', isMe: false }
      ]
    },
    {
      id: 't-3',
      name: 'Figma Buddies Community',
      avatar: '🎨',
      lastMessage: 'Victor O: check out our mobile landing dashboard...',
      timeString: 'Yesterday',
      category: 'community',
      messages: [
        { id: 'c-1', sender: 'Victor O.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80', content: "Hello Figma buddies! Welcome to the premium chat lobby.", time: '09:12', isMe: false }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('t-1');

  // Authenticated User profile
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: 'Afolabi',
    secondName: 'Ola',
    username: 'afolabi_ola',
    email: 'afolabi.ola@nailand.network',
    interests: ['Figma Buddies', 'React & TypeScript', 'Web3 Barter', 'Design Systems'],
    region: 'Creative',
    role: 'Lead Product Designer & Web3 Architect',
    bio: 'Crafting decentralised exchange interfaces, fluid design tokens, and next-generation African creative networks.',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    location: 'Lagos, Nigeria',
    website: 'https://afolabiola.design',
    github: 'github.com/afolabiola',
    figma: 'figma.com/@afolabiola',
    twitter: 'x.com/afolabiola',
    rate: '50 NaiTokens / hr',
    naiPoints: 2450
  });

  // Prototype walkthrough floaty control tab
  const [showWalkthrough, setShowWalkthrough] = useState(true);

  // Handlers
  const handleAuthSuccess = (profile: UserProfile) => {
    setUserProfile(profile);
    setSelectedCommunity(null);
    setActiveTab('dashboard');
    setActiveView(ActiveView.APP_LAYOUT);
  };

  const handleSelectDirectChat = (personName: string, avatar: string) => {
    setDirectChatUser(personName);
    setDirectChatAvatar(avatar);
    
    // Check if thread already exists inside our lifted state
    const match = threads.find(t => t.name === personName);
    if (match) {
      setActiveThreadId(match.id);
    } else {
      // Create new thread & prepend
      const newTh: ChatThread = {
        id: `t-${Date.now()}`,
        name: personName,
        avatar: avatar || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=80',
        lastMessage: 'Let us start chatting!',
        timeString: 'Just now',
        category: 'chat',
        messages: [
          { id: `m-${Date.now()}`, sender: personName, avatar: avatar || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=80', content: `Hey! I received your ping to trade skills on NaiLand. How can I help?`, time: 'Just now', isMe: false }
        ]
      };
      setThreads([newTh, ...threads]);
      setActiveThreadId(newTh.id);
    }
    
    setActiveTab('messages');
  };

  // Open any person's profile
  const handleViewProfile = (personName: string, avatar?: string, initialTab: 'overview' | 'collabs' | 'posts' | 'reviews' | 'settings' = 'overview') => {
    const currentFullName = `${userProfile.firstName || ''} ${userProfile.secondName || ''}`.trim();
    const isMe = personName.toLowerCase() === currentFullName.toLowerCase() || personName.toLowerCase() === 'me';
    
    if (isMe) {
      setSelectedProfileUser(buildProfileFromCurrentUser(userProfile));
    } else {
      setSelectedProfileUser(getUserProfile(personName, avatar));
    }
    setProfileInitialTab(initialTab);
    setActiveTab('profile');
    setActiveView(ActiveView.APP_LAYOUT);
  };

  // Open current user's own profile and optional settings tab
  const handleViewOwnProfile = (openSettings = false) => {
    setSelectedProfileUser(buildProfileFromCurrentUser(userProfile));
    setProfileInitialTab(openSettings ? 'settings' : 'overview');
    setActiveTab('profile');
    setActiveView(ActiveView.APP_LAYOUT);
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] relative text-stone-800" id="app-root-container">
      
      {/* ========================================================== */}
      {/* 🚀 PROTOTYPE WALKTHROUGH CONTROLLER FLOATING HEADER BAR    */}
      {/* ========================================================== */}
      {showWalkthrough && (
        <div 
          className="bg-stone-900 border-b border-stone-800 text-stone-100 py-3.5 px-4 sticky top-0 z-50 text-xs shadow-md"
          id="walkthrough-bar"
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex items-center gap-2" id="walkthrough-intro">
              <span className="p-1.5 bg-[#f8c21a] rounded text-stone-950 font-bold text-[10px] animate-pulse">
                PROTOTYPE DIRECTORY
              </span>
              <p className="text-left text-stone-300 text-[11px] leading-relaxed">
                Rebuilt pixel-perfect replica of <strong className="text-white font-serif">NaiLand</strong>. You can navigate the experience organically or click direct presets beneath!
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5 items-center justify-center" id="walkthrough-presets">
              <span className="text-[10px] font-mono text-stone-500 uppercase">Presets:</span>
              
              <button 
                onClick={() => {
                  setActiveView(ActiveView.LANDING);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition whitespace-nowrap
                  ${activeView === ActiveView.LANDING 
                    ? 'bg-[#f8c21a] text-stone-950 font-black' 
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'}`}
              >
                1. Landing Web Page
              </button>

              <button 
                onClick={() => {
                  // Blank form
                  setUserProfile({ firstName: '', secondName: '', email: '', interests: [], region: '' });
                  setActiveView(ActiveView.SIGN_UP);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition whitespace-nowrap
                  ${activeView === ActiveView.SIGN_UP 
                    ? 'bg-[#f8c21a] text-stone-950 font-black' 
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'}`}
              >
                2. Onboarding Forms
              </button>

              <button 
                onClick={() => {
                  setActiveView(ActiveView.APP_LAYOUT);
                  setActiveTab('dashboard');
                  setSelectedCommunity(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition whitespace-nowrap
                  ${activeView === ActiveView.APP_LAYOUT && activeTab === 'dashboard'
                    ? 'bg-[#f8c21a] text-stone-950 font-black' 
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'}`}
              >
                3. Live Coordinates Map
              </button>

              <button 
                onClick={() => {
                  setActiveView(ActiveView.APP_LAYOUT);
                  setActiveTab('community');
                  setSelectedCommunity('Figma Buddies');
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition whitespace-nowrap
                  ${activeView === ActiveView.APP_LAYOUT && selectedCommunity === 'Figma Buddies'
                    ? 'bg-[#f8c21a] text-stone-950 font-black' 
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'}`}
              >
                4. Figma Buddies Chamber
              </button>

              <button 
                onClick={() => {
                  setActiveView(ActiveView.APP_LAYOUT);
                  setActiveTab('messages');
                  setDirectChatUser('Afolabi Emmanuel');
                  setDirectChatAvatar('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120');
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition whitespace-nowrap
                  ${activeView === ActiveView.APP_LAYOUT && activeTab === 'messages'
                    ? 'bg-[#f8c21a] text-stone-950' 
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'}`}
              >
                5. Project Chat Sidebar
              </button>

              <button 
                onClick={() => {
                  handleViewOwnProfile(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer transition whitespace-nowrap
                  ${activeView === ActiveView.APP_LAYOUT && activeTab === 'profile'
                    ? 'bg-[#f8c21a] text-stone-950 font-black' 
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'}`}
              >
                6. My Profile & Settings
              </button>

              <button 
                onClick={() => setShowWalkthrough(false)}
                className="text-stone-500 hover:text-white text-lg font-bold pl-1 border-l border-stone-800 ml-1.5 whitespace-nowrap"
                title="Hide Preset Navigator"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* 🔮 MAIN ACTIVE MOUNT DIRECTORY                             */}
      {/* ========================================================== */}
      <div id="mount-view-container" className="relative">
        
        {/* VIEW 1: LANDING PAGE */}
        {activeView === ActiveView.LANDING && (
          <LandingPage 
            onSignUpClick={() => setActiveView(ActiveView.SIGN_UP)}
            onLogInClick={() => setActiveView(ActiveView.LOGIN)}
            onExploreSkillsClick={() => {
              setActiveView(ActiveView.APP_LAYOUT);
              setActiveTab('dashboard');
              setSelectedCommunity(null);
            }}
          />
        )}

        {/* VIEW 2: AUTHORIZATION FLOW WIZARDS */}
        {(activeView === ActiveView.SIGN_UP || 
          activeView === ActiveView.CONFIRMATION_CODE || 
          activeView === ActiveView.INTERESTS || 
          activeView === ActiveView.SUGGESTED_REGIONS || 
          activeView === ActiveView.LOGIN || 
          activeView === ActiveView.PASSWORD_RESET_CODE || 
          activeView === ActiveView.NEW_PASSWORD) && (
          <div className="py-8 bg-stone-50/50 min-h-screen" id="auth-flow-mounted-wrap">
            <AuthFlow 
              initialView={activeView}
              onSuccess={handleAuthSuccess}
              onBackToHome={() => setActiveView(ActiveView.LANDING)}
              onLogInInstead={() => setActiveView(ActiveView.SIGN_UP)}
            />
          </div>
        )}

        {/* VIEW 3: IN-APP ACTIVE DASHBOARD LAYOUTS */}
        {activeView === ActiveView.APP_LAYOUT && (
          <DashboardLayout 
            user={userProfile}
            activeTab={activeTab}
            setActiveTab={(t) => {
              if (t === 'logout') {
                setActiveView(ActiveView.LANDING);
                return;
              }
              setActiveTab(t);
              setSelectedCommunity(null);
            }}
            onLogout={() => {
              setActiveView(ActiveView.LANDING);
            }}
            onOpenOwnProfile={handleViewOwnProfile}
          >
            {/* Active Nested Tab rendering */}
            {activeTab === 'dashboard' && (
              <DashboardHome 
                user={userProfile}
                onSelectCommunity={(comName) => {
                  setSelectedCommunity(comName);
                  setActiveTab('community');
                }}
                onSelectDirectChat={handleSelectDirectChat}
                onViewProfile={(name, avatar) => handleViewProfile(name, avatar)}
              />
            )}

            {activeTab === 'community' && (
              selectedCommunity ? (
                <CommunitySection 
                  communityName={selectedCommunity}
                  onBackToDashboard={() => {
                    setSelectedCommunity(null);
                  }}
                  onViewProfile={(name, avatar) => handleViewProfile(name, avatar)}
                />
              ) : (
                <CommunityDirectory 
                  onSelectCommunity={(comName) => {
                    setSelectedCommunity(comName);
                  }}
                />
              )
            )}

            {activeTab === 'messages' && (
              <MessagesSection 
                threads={threads}
                setThreads={setThreads}
                activeThreadId={activeThreadId}
                setActiveThreadId={setActiveThreadId}
                initialChatWith={directChatUser} 
                initialAvatar={directChatAvatar} 
                clearDirectChatTrigger={() => {
                  setDirectChatUser(undefined);
                  setDirectChatAvatar(undefined);
                }}
              />
            )}

            {activeTab === 'profile' && (
              <UserProfileView 
                user={selectedProfileUser || buildProfileFromCurrentUser(userProfile)}
                currentUser={userProfile}
                isSelf={
                  !selectedProfileUser ||
                  selectedProfileUser.name.toLowerCase() === `${userProfile.firstName || ''} ${userProfile.secondName || ''}`.trim().toLowerCase() ||
                  selectedProfileUser.id === 'usr-me'
                }
                initialTab={profileInitialTab}
                onBack={() => setActiveTab('dashboard')}
                onDirectMessage={handleSelectDirectChat}
                onUpdateCurrentUser={(updated) => {
                  setUserProfile(updated);
                  setSelectedProfileUser(buildProfileFromCurrentUser(updated));
                }}
              />
            )}

            {activeTab === 'help' && (
              <div className="p-10 text-left max-w-5xl mx-auto flex flex-col gap-6" id="help-deck">
                <div className="bg-white border border-stone-200/50 p-6 rounded-2xl" id="help-card">
                  <span className="text-[10px] tracking-widest font-mono text-amber-600 font-bold block mb-1">NAILAND USER ASSIST</span>
                  <h3 className="font-serif font-bold text-xl text-stone-900 border-b border-stone-50 pb-4 mb-4">Workspace Knowledge Hub</h3>
                  
                  <div className="flex flex-col gap-4 text-xs leading-relaxed text-stone-600" id="help-questions">
                    <div>
                      <strong className="text-stone-800 text-sm">💡 What is Nailand peer-mesh network?</strong>
                      <p className="mt-1">NaiLand is a decentralized social platform that enables developers, writers, designers, and builders to coordinate hackathons, audit smart code, and exchange digital assets through collaborative barter consensus protocols.</p>
                    </div>

                    <div>
                      <strong className="text-stone-800 text-sm">💡 How does the ticking delivery countdown timer operate?</strong>
                      <p className="mt-1">The countdown widget tracks milestone synchronization. In the message workspaces, participants observe remaining schedules to ship elements securely before gas fee fluctuations occur.</p>
                    </div>

                    <div>
                      <strong className="text-stone-800 text-sm">💡 Are coordinates values dynamic?</strong>
                      <p className="mt-1">Yes! Selecting nodes scattered on the Interactive Map displays immediate peer names, feedback indexes, and enables triggering direct message conversations.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DashboardLayout>
        )}

      </div>

    </div>
  );
}
