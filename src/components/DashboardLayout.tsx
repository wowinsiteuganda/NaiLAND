import React from 'react';
import NaiLandLogo from './NaiLandLogo';
import { DashboardTab, UserProfile } from '../types';
import { LayoutDashboard, MessageSquareCode, Users, HelpCircle, LogOut, Menu, X, Bell, Globe, Settings, SlidersHorizontal, User, Coins } from 'lucide-react';

interface DashboardLayoutProps {
  user: UserProfile;
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  onLogout: () => void;
  onOpenOwnProfile?: (openSettings?: boolean) => void;
  children: React.ReactNode;
}

export default function DashboardLayout({ user, activeTab, setActiveTab, onLogout, onOpenOwnProfile, children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Menu lists
  const menuItems = [
    { id: 'dashboard' as DashboardTab, text: 'Dash Board', icon: LayoutDashboard },
    { id: 'messages' as DashboardTab, text: 'Messages', icon: MessageSquareCode },
    { id: 'community' as DashboardTab, text: 'Community', icon: Users },
    { id: 'profile' as DashboardTab, text: 'My Profile', icon: User, action: () => onOpenOwnProfile ? onOpenOwnProfile(false) : setActiveTab('profile') },
  ];

  const subItems = [
    { id: 'help' as DashboardTab, text: 'Help Desk', icon: HelpCircle },
    { id: 'logout' as DashboardTab, text: 'Log Out', icon: LogOut, action: onLogout },
  ];

  // Afolabi Ola profile avatar matching the image or dynamic user avatar
  const profileAvatarUrl = user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=120';
  const fullName = `${user.firstName || 'Afolabi'} ${user.secondName || 'Ola'}`.trim();
  const naiPoints = user.naiPoints ?? 2450;

  const handleAvatarClick = () => {
    if (onOpenOwnProfile) {
      onOpenOwnProfile(false);
    } else {
      setActiveTab('profile');
    }
  };

  const handleSettingsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOpenOwnProfile) {
      onOpenOwnProfile(true);
    } else {
      setActiveTab('profile');
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-stone-800 flex flex-col md:flex-row font-sans" id="app-layout-root">
      
      {/* MOBILE BAR */}
      <div className="md:hidden bg-white border-b border-stone-100 px-4 py-3 flex justify-between items-center z-50 sticky top-0" id="mobile-topbar">
        <NaiLandLogo size="sm" />
        <div className="flex items-center gap-2">
          {/* Mobile NaiPoints badge with subtle glow */}
          <button 
            onClick={handleAvatarClick}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-[#FFFDF2] via-[#FFF9E6] to-[#FFF3CD] border border-[#FFD54F] rounded-full text-stone-900 cursor-pointer animate-subtle-glow select-none active:scale-95 transition-transform"
            id="mobile-naipoints-badge"
            title={`Your Balance: ${naiPoints.toLocaleString()} NaiPoints • Click to view profile`}
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FFC107] to-[#FFA000] flex items-center justify-center text-stone-950 shrink-0 shadow-2xs">
              <Coins className="w-2.5 h-2.5 text-stone-950" style={{ strokeWidth: 2.4 }} />
            </div>
            <span className="font-mono text-xs font-black leading-none text-stone-950">{naiPoints.toLocaleString()}</span>
            <span className="text-[9px] font-bold text-amber-900 uppercase leading-none">NP</span>
          </button>

          <button 
            onClick={handleAvatarClick} 
            className="w-8 h-8 rounded-full overflow-hidden border border-stone-200 cursor-pointer"
            title="My Profile"
          >
            <img src={profileAvatarUrl} alt={fullName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </button>
          <button className="relative p-1.5 text-stone-400 hover:text-stone-800 whitespace-nowrap" id="btn-mobile-bells">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
          </button>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)} 
            className="p-1.5 text-stone-600 hover:text-stone-900 border border-stone-200 rounded-lg whitespace-nowrap"
            id="btn-mobile-hamburger"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-2 mb-0.5 text-[#100F0F] font-bold" />}
          </button>
        </div>
      </div>

      {/* SIDEBAR NAVIGATION LAYOUT */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-[#EFEFEF] flex flex-col transition-transform duration-300 md:translate-x-0 md:sticky md:top-0 h-screen shrink-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        id="app-sidebar"
      >
        {/* Sidebar Header Logo */}
        <div className="p-6 pb-8 flex justify-start items-center" id="sidebar-logo-container">
          <NaiLandLogo size="sm" />
        </div>

        {/* Menu Items lists */}
        <nav className="flex-1 px-0 flex flex-col justify-between" id="sidebar-menu">
          <div className="flex flex-col gap-1" id="sidebar-main-group">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setActiveTab(item.id);
                    }
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-[14px] font-semibold select-none cursor-pointer transition-all whitespace-nowrap text-left
                    ${isActive 
                      ? 'bg-[#FFC107] text-stone-950 font-bold border-none' 
                      : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'}`}
                  id={`nav-item-${item.id}`}
                >
                  <IconComp className={`w-5 h-5 ${isActive ? 'text-stone-950 stroke-[2.2px]' : 'text-stone-400'}`} />
                  <span>{item.text}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-1 mb-6" id="sidebar-sub-group">
            {subItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      setActiveTab(item.id);
                    }
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-6 py-4 text-[14px] font-semibold select-none cursor-pointer transition-all whitespace-nowrap text-left
                    ${isActive 
                      ? 'bg-[#FFC107] text-stone-950 font-bold border-none' 
                      : 'text-stone-400 hover:text-stone-800 hover:bg-stone-50'}`}
                  id={`nav-item-${item.id}`}
                >
                  <IconComp className={`w-5 h-5 ${isActive ? 'text-stone-950 stroke-[2.2px]' : 'text-stone-400'}`} />
                  <span>{item.text}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main View Port content */}
      <main className="flex-1 min-h-screen flex flex-col overflow-y-auto" id="app-viewport">
        
        {/* Persistent Desktop Header matching the screenshot exactly */}
        <header className="hidden md:flex items-center justify-between px-10 py-5 bg-white border-b border-[#EFEFEF] sticky top-0 z-30 h-[80px]" id="desktop-persistent-header">
          {/* Wider search container with filter funnel button inside the input */}
          <div className="relative w-full max-w-[500px]" id="desktop-search-wrapper">
            <input 
              type="text" 
              placeholder="Search for..."
              className="w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl pl-5 pr-12 py-3 text-sm text-stone-800 placeholder-stone-400 outline-none focus:border-[#FFC107] transition-all font-sans"
              id="inp-header-search"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-800 cursor-pointer transition" id="btn-header-filter">
              <SlidersHorizontal className="w-[18px] h-[18px]" style={{ strokeWidth: 1.8 }} />
            </button>
          </div>

          {/* User profile, notifications indicators, NaiPoints badge and settings on right line */}
          <div className="flex items-center gap-4" id="header-right-side">
            {/* Visually Prominent NaiPoints Badge with subtle glow animation */}
            <button
              onClick={handleAvatarClick}
              className="relative inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-gradient-to-r from-[#FFFDF2] via-[#FFF9E6] to-[#FFF3CD] border border-[#FFD54F] rounded-full text-stone-900 cursor-pointer hover:border-[#FFC107] hover:scale-[1.02] active:scale-[0.98] transition-all select-none animate-subtle-glow group shadow-xs"
              id="hdr-naipoints-badge"
              title={`Your Balance: ${naiPoints.toLocaleString()} NaiPoints • Click to view breakdown in profile`}
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FFC107] via-[#FFB300] to-[#FFA000] flex items-center justify-center shadow-xs text-stone-950 shrink-0 group-hover:rotate-12 transition-transform duration-300">
                <Coins className="w-3.5 h-3.5 text-stone-950" style={{ strokeWidth: 2.3 }} />
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="font-mono font-black text-[14px] text-stone-950 tracking-tight leading-none" id="hdr-naipoints-value">
                  {naiPoints.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-amber-900/90 tracking-wide uppercase leading-none font-sans">
                  NaiPoints
                </span>
              </div>

              {/* Subtle ambient pulse indicator dot */}
              <span className="relative flex h-2 w-2 ml-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB300]"></span>
              </span>
            </button>

            {/* Globe icon representing region */}
            <button className="p-2 text-stone-700 hover:bg-stone-50 rounded-xl transition cursor-pointer" id="btn-hdr-globe" title="Region: Creative">
              <Globe className="w-[20px] h-[20px]" style={{ strokeWidth: 1.8 }} />
            </button>

            {/* Notification bell with red status dot */}
            <button className="p-2 text-stone-700 hover:bg-stone-50 rounded-xl transition cursor-pointer relative" id="btn-hdr-bell" title="Notifications">
              <Bell className="w-[20px] h-[20px]" style={{ strokeWidth: 1.8 }} />
              <span className="absolute top-1.5 right-1.5 w-[7px] h-[7px] bg-[#E53935] rounded-full border border-white"></span>
            </button>

            {/* Dynamic Active User Profile Avatar & Name - Clickable to open Profile */}
            <div 
              onClick={handleAvatarClick}
              className="flex items-center gap-3 ml-1 select-none cursor-pointer group p-1 rounded-full hover:bg-stone-50 transition" 
              id="avatar-container-head"
              title="Click to view your profile"
            >
              <div className="relative w-10 h-10" id="avatar-ring-head">
                <img 
                  src={profileAvatarUrl} 
                  alt={fullName} 
                  className="w-10 h-10 rounded-full object-cover border border-stone-200 group-hover:ring-2 group-hover:ring-[#FFC107] transition"
                  referrerPolicy="no-referrer"
                  id="img-hdr-avatar"
                />
                
                {/* Active Indicator green bubble on bottom left */}
                <span className="absolute bottom-0 left-0 w-[11px] h-[11px] bg-[#4CAF50] rounded-full border-2 border-white"></span>
                
                {/* Micro cog settings gear overlay on bottom right */}
                <button 
                  onClick={handleSettingsClick}
                  className="absolute -bottom-0.5 -right-1 bg-stone-100 hover:bg-[#FFC107] rounded-full p-[3px] border border-stone-200 cursor-pointer transition shadow-2xs" 
                  id="badge-hdr-gear"
                  title="Profile Settings"
                >
                  <Settings className="w-[10px] h-[10px] text-stone-700" />
                </button>
              </div>

              <div className="hidden lg:flex flex-col text-left">
                <span className="text-xs font-bold text-stone-900 group-hover:text-amber-700 transition leading-tight">
                  {fullName}
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  View Profile
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 bg-white" id="main-content-scrollable">
          {children}
        </div>
      </main>

    </div>
  );
}
