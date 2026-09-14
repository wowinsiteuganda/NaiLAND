import React, { useState, useRef } from 'react';
import { 
  ProfileUserData, 
  UserProfile 
} from '../types';
import { 
  ArrowLeft, 
  Star, 
  MessageSquareCode, 
  UserCheck, 
  UserPlus, 
  Share2, 
  Settings, 
  MapPin, 
  Globe, 
  ExternalLink, 
  Check, 
  Briefcase, 
  Award, 
  Sparkles, 
  Camera, 
  Edit3, 
  DollarSign, 
  Heart, 
  Clock, 
  Repeat, 
  Send, 
  ThumbsUp, 
  BarChart2, 
  X, 
  Plus, 
  Bell, 
  ShieldCheck, 
  Layers,
  Upload
} from 'lucide-react';
import { curatedAvatars, curatedBanners } from '../data/userProfilesData';
import { readFileAsDataUrl } from '../lib/fileUpload';

interface UserProfileViewProps {
  user: ProfileUserData;
  currentUser: UserProfile;
  isSelf?: boolean;
  initialTab?: 'overview' | 'collabs' | 'posts' | 'reviews' | 'settings';
  onBack: () => void;
  onDirectMessage: (name: string, avatar: string) => void;
  onUpdateCurrentUser: (updated: UserProfile) => void;
}

export default function UserProfileView({
  user,
  currentUser,
  isSelf = false,
  initialTab = 'overview',
  onBack,
  onDirectMessage,
  onUpdateCurrentUser
}: UserProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'collabs' | 'posts' | 'reviews' | 'settings'>(
    initialTab === 'settings' && !isSelf ? 'overview' : initialTab
  );

  const [isConnected, setIsConnected] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Settings form state for editing own profile
  const [firstName, setFirstName] = useState(currentUser.firstName || user.name.split(' ')[0] || '');
  const [secondName, setSecondName] = useState(currentUser.secondName || user.name.split(' ').slice(1).join(' ') || '');
  const [username, setUsername] = useState(currentUser.username || user.username || '');
  const [headline, setHeadline] = useState(currentUser.headline || user.role || '');
  const [bio, setBio] = useState(currentUser.bio || user.bio || '');
  const [email, setEmail] = useState(currentUser.email || user.email || '');
  const [location, setLocation] = useState(currentUser.location || user.location || '');
  const [region, setRegion] = useState(currentUser.region || 'Creative');
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar || user.avatar);
  const [bannerUrl, setBannerUrl] = useState(currentUser.banner || user.banner);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setAvatarUrl(dataUrl);
      onUpdateCurrentUser({
        ...currentUser,
        avatar: dataUrl
      });
    } catch (err) {
      console.error('Failed to read avatar file:', err);
    }
  };

  const handleBannerFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setBannerUrl(dataUrl);
      onUpdateCurrentUser({
        ...currentUser,
        banner: dataUrl
      });
    } catch (err) {
      console.error('Failed to read banner file:', err);
    }
  };
  const [website, setWebsite] = useState(currentUser.website || user.website || '');
  const [github, setGithub] = useState(currentUser.github || user.github || '');
  const [figma, setFigma] = useState(currentUser.figma || user.figma || '');
  const [twitter, setTwitter] = useState(currentUser.twitter || user.twitter || '');
  const [rate, setRate] = useState(currentUser.rate || user.rate || '45 NaiTokens / hr');
  const [availableForCollab, setAvailableForCollab] = useState(currentUser.availableForCollab ?? user.availableForCollab);
  const [openToMentoring, setOpenToMentoring] = useState(currentUser.openToMentoring ?? user.openToMentoring ?? true);
  const [publicProfile, setPublicProfile] = useState(currentUser.publicProfile ?? true);
  const [emailNotifications, setEmailNotifications] = useState(currentUser.emailNotifications ?? true);

  // Skills tag editor
  const [skillsList, setSkillsList] = useState<string[]>(
    currentUser.interests && currentUser.interests.length > 0 
      ? currentUser.interests 
      : user.skills
  );
  const [newSkillInput, setNewSkillInput] = useState('');

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skillsList.includes(newSkillInput.trim())) {
      setSkillsList([...skillsList, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkillsList(skillsList.filter(s => s !== skillToRemove));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...currentUser,
      firstName,
      secondName,
      username,
      headline,
      bio,
      email,
      location,
      region,
      avatar: avatarUrl,
      banner: bannerUrl,
      website,
      github,
      figma,
      twitter,
      rate,
      availableForCollab,
      openToMentoring,
      publicProfile,
      emailNotifications,
      interests: skillsList
    };

    onUpdateCurrentUser(updated);
    setSaveToast(true);
    setTimeout(() => {
      setSaveToast(false);
      setActiveTab('overview');
    }, 1200);
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  return (
    <div className="text-left max-w-7xl mx-auto flex flex-col gap-6 font-sans bg-white min-h-screen text-stone-800 pb-16 px-4 md:px-8 pt-4" id="user-profile-page-container">
      
      {/* TOAST ALERTS */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 animate-fade-in border border-stone-700">
          <Check className="w-4 h-4 text-[#FFC107]" />
          <span>Profile link copied to clipboard!</span>
        </div>
      )}

      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-emerald-100 px-5 py-3 rounded-xl shadow-xl text-xs font-bold flex items-center gap-2.5 animate-bounce border border-emerald-700">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Profile settings updated successfully!</span>
        </div>
      )}

      {/* TOP NAVIGATION & BREADCRUMBS */}
      <div className="flex justify-between items-center py-2" id="profile-breadcrumbs-bar">
        <button 
          onClick={onBack}
          className="px-4 py-2 rounded-full border border-stone-200 hover:bg-stone-50 hover:border-stone-400 text-xs font-bold flex items-center gap-2 text-stone-800 transition shadow-2xs cursor-pointer select-none"
          id="btn-profile-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Workspace</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShareProfile}
            className="p-2 rounded-full border border-stone-200 hover:bg-stone-50 text-stone-600 hover:text-stone-900 transition cursor-pointer select-none"
            title="Share profile"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {isSelf && (
            <button
              onClick={() => setActiveTab(activeTab === 'settings' ? 'overview' : 'settings')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer select-none shadow-2xs
                ${activeTab === 'settings' 
                  ? 'bg-stone-950 text-white' 
                  : 'bg-[#FFC107] text-stone-950 hover:bg-[#FFB300]'}`}
              id="btn-edit-profile-top"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{activeTab === 'settings' ? 'View Profile' : 'Profile Settings'}</span>
            </button>
          )}
        </div>
      </div>

      {/* HERO BANNER & AVATAR BLOCK */}
      <div className="relative rounded-3xl overflow-hidden border border-stone-200 bg-stone-950 select-none shadow-sm" id="profile-hero-frame">
        {/* Banner Graphic Backdrop */}
        <div className="relative h-48 sm:h-64 w-full overflow-hidden bg-stone-900">
          <img 
            src={isSelf ? bannerUrl : user.banner} 
            alt="Profile background banner" 
            className="w-full h-full object-cover object-center filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-black/20" />
          
          {isSelf && (
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button 
                type="button"
                onClick={() => bannerInputRef.current?.click()}
                className="bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-[11px] px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 transition cursor-pointer"
                title="Upload custom banner image from device"
              >
                <Camera className="w-3.5 h-3.5 text-[#FFC107]" />
                <span>Upload Banner</span>
              </button>
            </div>
          )}
        </div>

        {/* User Details & Identity Overlay Section */}
        <div className="relative z-10 px-6 md:px-10 pb-6 pt-0 bg-white flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-stone-100">
          
          {/* Left: Avatar + Title info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-16 sm:-mt-20">
            {/* Avatar container */}
            <div className="relative shrink-0" id="profile-avatar-wrapper">
              <img 
                src={isSelf ? avatarUrl : user.avatar} 
                alt={user.name} 
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-stone-100"
                referrerPolicy="no-referrer"
              />
              
              {/* Online Green Bubble */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm" title="Online now" />

              {/* Edit Avatar quick trigger for own profile */}
              {isSelf && (
                <>
                  <input 
                    type="file" 
                    ref={avatarInputRef} 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarFileChange} 
                  />
                  <input 
                    type="file" 
                    ref={bannerInputRef} 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleBannerFileChange} 
                  />
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute -top-1 -right-1 p-2 bg-stone-900 hover:bg-black text-white rounded-full shadow-md border border-stone-700 transition cursor-pointer"
                    title="Upload real profile photo from computer"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#FFC107]" />
                  </button>
                </>
              )}
            </div>

            {/* Name, Handle, Role and Location */}
            <div className="flex flex-col text-left mb-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="font-sans font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
                  {isSelf ? `${firstName} ${secondName}`.trim() : user.name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-[#B78103] text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFB300]" />
                  <span>Verified Peer</span>
                </span>
              </div>

              <span className="text-xs font-mono font-medium text-stone-400 mt-0.5">
                @{isSelf ? username : user.username}
              </span>

              <p className="text-sm font-semibold text-stone-700 mt-1.5 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-stone-400" />
                <span>{isSelf ? headline : user.role}</span>
              </p>

              <div className="flex items-center gap-3 text-xs text-stone-500 font-medium mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isSelf ? location : user.location}</span>
                </span>
                <span>•</span>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${user.availableForCollab ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-600'}`}>
                  {user.availableForCollab ? '● Available for Collab' : '○ Busy'}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions row */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end pb-1" id="profile-primary-actions">
            {!isSelf ? (
              <>
                <button
                  onClick={() => onDirectMessage(user.name, user.avatar)}
                  className="flex-1 md:flex-initial px-5 py-2.5 rounded-full bg-[#FFC107] hover:bg-[#FFB300] active:scale-95 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer select-none whitespace-nowrap"
                  id="btn-profile-message"
                >
                  <MessageSquareCode className="w-4 h-4 text-stone-950" />
                  <span>Message & Collaborate</span>
                </button>

                <button
                  onClick={() => setIsConnected(!isConnected)}
                  className={`px-4 py-2.5 rounded-full border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer select-none whitespace-nowrap
                    ${isConnected 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'border-stone-300 hover:border-stone-800 text-stone-800 hover:bg-stone-50'}`}
                  id="btn-profile-connect"
                >
                  {isConnected ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Connected</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5 text-stone-600" />
                      <span>Connect</span>
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('settings')}
                  className="px-5 py-2.5 rounded-full bg-[#FFC107] hover:bg-[#FFB300] text-stone-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer select-none whitespace-nowrap"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* METRICS STRIP: Rating, NaiPoints, Collabs, Rate */}
        <div className="grid grid-cols-2 sm:grid-cols-4 border-t border-stone-100 bg-[#FAFAFA] divide-x divide-stone-100 text-left py-3 px-6 md:px-10" id="profile-stats-strip">
          <div className="py-2 pr-4">
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block tracking-wider">Peer Rating</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-base font-black text-stone-900">{user.rating.toFixed(1)}</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`w-3 h-3 ${idx < Math.floor(user.rating) ? 'text-[#FFB300] fill-[#FFB300]' : 'text-stone-300 fill-stone-300'}`} />
                ))}
              </div>
              <span className="text-[11px] text-stone-400 font-medium">({user.reviewCount})</span>
            </div>
          </div>

          <div className="py-2 px-4">
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block tracking-wider">NaiPoints Stash</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-base font-black text-stone-900">{user.naiPoints.toLocaleString()}</span>
              <span className="text-[10px] font-bold text-stone-500 uppercase">NPs</span>
            </div>
          </div>

          <div className="py-2 px-4">
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block tracking-wider">Collaborations</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Layers className="w-4 h-4 text-stone-500" />
              <span className="text-base font-black text-stone-900">{user.completedCollabs}</span>
              <span className="text-xs text-stone-500 font-medium">Completed</span>
            </div>
          </div>

          <div className="py-2 pl-4">
            <span className="text-[10px] uppercase font-mono font-bold text-stone-400 block tracking-wider">Skill Exchange Rate</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-bold text-stone-800 truncate">{isSelf ? rate : user.rate}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PROFILE NAVIGATION TABS */}
      <div className="flex items-center border-b border-stone-200 gap-6 overflow-x-auto scrollbar-none" id="profile-subtabs-bar">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3.5 font-sans font-bold text-xs transition border-b-2 whitespace-nowrap cursor-pointer select-none
            ${activeTab === 'overview' 
              ? 'border-stone-950 text-stone-950' 
              : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          id="tab-profile-overview"
        >
          Overview & Bio
        </button>

        <button
          onClick={() => setActiveTab('collabs')}
          className={`pb-3.5 font-sans font-bold text-xs transition border-b-2 whitespace-nowrap cursor-pointer select-none
            ${activeTab === 'collabs' 
              ? 'border-stone-950 text-stone-950' 
              : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          id="tab-profile-collabs"
        >
          Collabs & Projects ({user.collabs?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3.5 font-sans font-bold text-xs transition border-b-2 whitespace-nowrap cursor-pointer select-none
            ${activeTab === 'posts' 
              ? 'border-stone-950 text-stone-950' 
              : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          id="tab-profile-posts"
        >
          Community Posts ({user.posts?.length || 0})
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3.5 font-sans font-bold text-xs transition border-b-2 whitespace-nowrap cursor-pointer select-none
            ${activeTab === 'reviews' 
              ? 'border-stone-950 text-stone-950' 
              : 'border-transparent text-stone-400 hover:text-stone-700'}`}
          id="tab-profile-reviews"
        >
          Peer Endorsements ({user.reviews?.length || 0})
        </button>

        {isSelf && (
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-3.5 font-sans font-bold text-xs transition border-b-2 whitespace-nowrap cursor-pointer select-none flex items-center gap-1.5
              ${activeTab === 'settings' 
                ? 'border-[#FFC107] text-stone-950' 
                : 'border-transparent text-amber-700 hover:text-amber-800'}`}
            id="tab-profile-settings"
          >
            <Settings className="w-3.5 h-3.5 text-[#FFB300]" />
            <span>Profile Settings</span>
          </button>
        )}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="overview-tab-content">
          {/* Left 2 Cols: Bio Narrative, Skills, Credentials */}
          <div className="lg:col-span-2 flex flex-col gap-6 text-left">
            
            {/* About Card */}
            <div className="bg-white border border-[#EBEBEB] p-6 rounded-2xl shadow-2xs">
              <h3 className="text-sm font-bold font-sans text-stone-900 uppercase tracking-wider mb-3">
                About & Philosophy
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-sans">
                {isSelf ? bio : user.bio}
              </p>
            </div>

            {/* Skills & Specialties */}
            <div className="bg-white border border-[#EBEBEB] p-6 rounded-2xl shadow-2xs">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold font-sans text-stone-900 uppercase tracking-wider">
                  Verified Skills & Trade Specialties
                </h3>
                {isSelf && (
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className="text-xs font-bold text-[#FFB300] hover:underline cursor-pointer"
                  >
                    Edit skills
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {(isSelf ? skillsList : user.skills).map((skill, sIdx) => (
                  <span 
                    key={sIdx}
                    className="px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 font-sans text-xs font-semibold hover:border-amber-400 hover:bg-amber-50/50 transition cursor-default flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Experience & Web3 Proof of Collaboration */}
            <div className="bg-white border border-[#EBEBEB] p-6 rounded-2xl shadow-2xs">
              <h3 className="text-sm font-bold font-sans text-stone-900 uppercase tracking-wider mb-4">
                Decentralized Work History & Badges
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-start border-b border-stone-100 pb-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-[#B78103]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-stone-900">NaiLand Top Collaborator 2026</span>
                    <span className="text-[11px] text-stone-500">Recognized for delivering 20+ verified peer-to-peer design handoffs</span>
                    <span className="text-[10px] font-mono text-stone-400 mt-0.5">Consensus Verified by NaiMesh</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-stone-900">Figma Buddies Chamber Contributor</span>
                    <span className="text-[11px] text-stone-500">Core contributor to open design tokens & interaction components</span>
                    <span className="text-[10px] font-mono text-stone-400 mt-0.5">Verified Contributor</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Col: Details Sidebar, Social Links, Direct Connect Box */}
          <div className="flex flex-col gap-6 text-left">
            {/* Quick Contact & Links */}
            <div className="bg-white border border-[#EBEBEB] p-6 rounded-2xl shadow-2xs flex flex-col gap-4">
              <h3 className="text-sm font-bold font-sans text-stone-900 uppercase tracking-wider">
                External Presence & Links
              </h3>

              <div className="flex flex-col gap-2.5 text-xs">
                {user.website && (
                  <a 
                    href={user.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition text-stone-700"
                  >
                    <span className="flex items-center gap-2 font-medium">
                      <Globe className="w-4 h-4 text-stone-400" />
                      <span>Portfolio Website</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                )}

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 text-stone-700">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="font-mono text-stone-400">@</span>
                    <span>Figma Community</span>
                  </span>
                  <span className="font-mono text-stone-500">{user.figma || `@${user.username}`}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 text-stone-700">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="font-mono text-stone-400">#</span>
                    <span>GitHub Handle</span>
                  </span>
                  <span className="font-mono text-stone-500">{user.github || `${user.username}-dev`}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-stone-100 text-stone-700">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="font-mono text-stone-400">𝕏</span>
                    <span>X / Twitter</span>
                  </span>
                  <span className="font-mono text-stone-500">{user.twitter || `@${user.username}`}</span>
                </div>
              </div>

              {!isSelf && (
                <button
                  onClick={() => onDirectMessage(user.name, user.avatar)}
                  className="w-full mt-2 py-3 rounded-xl bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageSquareCode className="w-4 h-4 text-[#FFC107]" />
                  <span>Start a Collab Pitch</span>
                </button>
              )}
            </div>

            {/* Collaboration Preference Summary */}
            <div className="bg-amber-50/50 border border-amber-200/80 p-6 rounded-2xl text-left flex flex-col gap-3">
              <span className="text-[10px] font-mono font-bold tracking-wider text-amber-700 uppercase">
                PEER EXCHANGE TERMS
              </span>
              <h4 className="font-sans font-bold text-sm text-stone-900">
                Ready for Skill Exchange
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {user.name} accepts direct skill trades (e.g. UX wireframes in exchange for Smart Contract or React audits) as well as NaiTokens compensation.
              </p>
              <div className="pt-2 border-t border-amber-200/50 flex justify-between items-center text-xs">
                <span className="font-bold text-stone-700">Standard Rate</span>
                <span className="font-mono font-bold text-amber-800">{isSelf ? rate : user.rate}</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: COLLABS & PROJECTS */}
      {activeTab === 'collabs' && (
        <div className="flex flex-col gap-4 text-left" id="collabs-tab-content">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-sans font-bold text-base text-stone-900">
              Active Collabs & Open Opportunities
            </h3>
            <span className="text-xs font-mono text-stone-400">
              {user.collabs?.length || 0} listings recorded
            </span>
          </div>

          {user.collabs && user.collabs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.collabs.map((collab) => (
                <div 
                  key={collab.id} 
                  className="bg-white border border-[#EBEBEB] p-5 rounded-2xl flex flex-col justify-between hover:shadow-xs transition"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {collab.status}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        Duration: {collab.timeline}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-stone-900 mb-1">
                      {collab.title}
                    </h4>
                    <p className="text-xs text-stone-500 mb-4">
                      Role: <strong className="text-stone-700">{collab.role}</strong>
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-stone-100 text-xs">
                    <span className="font-bold text-stone-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
                      <span>{collab.stipend}</span>
                    </span>

                    {!isSelf ? (
                      <button
                        onClick={() => onDirectMessage(user.name, user.avatar)}
                        className="px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition cursor-pointer"
                      >
                        Apply / Discuss
                      </button>
                    ) : (
                      <span className="text-xs text-stone-400 font-mono">Your Project</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-10 text-center text-xs text-stone-400">
              No active collabs posted yet.
            </div>
          )}
        </div>
      )}

      {/* TAB 3: POSTS & SHOWCASES */}
      {activeTab === 'posts' && (
        <div className="flex flex-col gap-4 text-left max-w-3xl mx-auto w-full" id="posts-tab-content">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-sans font-bold text-base text-stone-900">
              Community Posts by {user.name}
            </h3>
          </div>

          {user.posts && user.posts.length > 0 ? (
            user.posts.map((post) => (
              <div 
                key={post.id} 
                className="bg-white border border-[#EBEBEB] p-6 rounded-2xl flex flex-col gap-4 hover:shadow-xs transition"
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-10 h-10 rounded-full object-cover border border-stone-200" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-stone-900">{user.name}</span>
                    <span className="text-[10px] font-mono text-stone-400">{post.timeAgo}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                  {post.content}
                </p>

                {post.image && (
                  <div className="rounded-xl overflow-hidden border border-stone-100 max-h-72">
                    <img 
                      src={post.image} 
                      alt="Post visual showcase" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div className="flex items-center gap-6 pt-3 border-t border-stone-100 text-xs text-stone-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <ThumbsUp className="w-4 h-4 text-stone-400" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquareCode className="w-4 h-4 text-stone-400" />
                    <span>{post.comments} comments</span>
                  </div>
                  <button 
                    onClick={handleShareProfile}
                    className="ml-auto text-stone-400 hover:text-stone-800 transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-10 text-center text-xs text-stone-400">
              No community posts authored yet.
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REVIEWS & ENDORSEMENTS */}
      {activeTab === 'reviews' && (
        <div className="flex flex-col gap-4 text-left" id="reviews-tab-content">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h3 className="font-sans font-bold text-base text-stone-900">
                Verified Peer Endorsements
              </h3>
              <p className="text-xs text-stone-500">
                Reviews left by collaborators after completing project milestones.
              </p>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
              <Star className="w-4 h-4 text-[#FFB300] fill-[#FFB300]" />
              <span className="font-bold text-xs text-stone-900">{user.rating.toFixed(1)} / 5.0</span>
            </div>
          </div>

          {user.reviews && user.reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.reviews.map((rev) => (
                <div 
                  key={rev.id} 
                  className="bg-white border border-[#EBEBEB] p-5 rounded-2xl flex flex-col justify-between hover:shadow-xs transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={rev.reviewerAvatar} 
                          alt={rev.reviewer} 
                          className="w-9 h-9 rounded-full object-cover border border-stone-200" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-xs text-stone-900">{rev.reviewer}</span>
                          <span className="text-[10px] font-mono text-stone-400">{rev.date}</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        {Array.from({ length: rev.rating }).map((_, sIdx) => (
                          <Star key={sIdx} className="w-3 h-3 text-[#FFB300] fill-[#FFB300]" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed mb-3">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-50 text-[11px] text-stone-400 font-mono">
                    Project: <span className="text-stone-700 font-medium">{rev.projectTitle}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-10 text-center text-xs text-stone-400">
              No peer endorsements received yet. Complete a collaboration sprint to earn ratings!
            </div>
          )}
        </div>
      )}

      {/* TAB 5: PROFILE SETTINGS (FOR EDITING OWN PROFILE) */}
      {activeTab === 'settings' && isSelf && (
        <form onSubmit={handleSaveSettings} className="flex flex-col gap-8 text-left max-w-4xl" id="profile-settings-form">
          
          {/* SECTION 1: PERSONAL DETAILS */}
          <div className="bg-white border border-[#EBEBEB] p-6 sm:p-8 rounded-2xl shadow-2xs flex flex-col gap-5">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-sans font-bold text-base text-stone-900">
                Personal Information & Identity
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Update how fellow members see and contact you across NaiLand.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">First Name</label>
                <input 
                  type="text" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="e.g. John"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={secondName} 
                  onChange={(e) => setSecondName(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="e.g. Doe"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Username / Handle</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 font-mono text-xs">@</span>
                  <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl pl-8 pr-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                    placeholder="john_doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Professional Headline / Role</label>
              <input 
                type="text" 
                value={headline} 
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                placeholder="e.g. Senior UX Designer & Web3 Interaction Architect"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">Bio / About You</label>
              <textarea 
                rows={3} 
                value={bio} 
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl p-3.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                placeholder="Share your experience, philosophy, and what skills you love trading..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Suggested Region Chamber</label>
                <select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition cursor-pointer"
                >
                  <option value="Creative">Creative Region 🌍</option>
                  <option value="Tech">Tech Region 🪐</option>
                  <option value="Wellness">Wellness Region 🌺</option>
                  <option value="Business">Business Region 💼</option>
                  <option value="Politics">Politics Region 👑</option>
                  <option value="Economics">Economics Region 📈</option>
                  <option value="Sciences">Sciences Region ⚛️</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">City, Country</label>
                <input 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="e.g. Lagos, Nigeria"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: AVATAR & BANNER PICKER */}
          <div className="bg-white border border-[#EBEBEB] p-6 sm:p-8 rounded-2xl shadow-2xs flex flex-col gap-5">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-sans font-bold text-base text-stone-900">
                Visual Assets (Avatar & Banner)
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Choose from curated artistic presets or input a custom image URL.
              </p>
            </div>

            {/* Avatar picker */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">Select Profile Avatar</label>
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload from Device</span>
                </button>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {curatedAvatars.map((avUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatarUrl(avUrl)}
                    className={`w-14 h-14 rounded-2xl overflow-hidden border-2 shrink-0 transition cursor-pointer relative
                      ${avatarUrl === avUrl ? 'border-[#FFC107] ring-2 ring-[#FFC107]/40 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={avUrl} alt="Avatar option" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {avatarUrl === avUrl && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#FFC107] rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-stone-950 stroke-[3px]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-2.5">
                <input 
                  type="text" 
                  value={avatarUrl} 
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-600 outline-none focus:border-[#FFC107] font-mono"
                  placeholder="Or paste custom image URL..."
                />
              </div>
            </div>

            {/* Banner picker */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">Select Hero Banner Style</label>
                <button
                  type="button"
                  onClick={() => bannerInputRef.current?.click()}
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Banner from Device</span>
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {curatedBanners.map((bUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setBannerUrl(bUrl)}
                    className={`h-16 rounded-xl overflow-hidden border-2 shrink-0 transition cursor-pointer relative
                      ${bannerUrl === bUrl ? 'border-[#FFC107] ring-2 ring-[#FFC107]/40 scale-102' : 'border-stone-200 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={bUrl} alt="Banner option" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {bannerUrl === bUrl && (
                      <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#FFC107] rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-stone-950 stroke-[3px]" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: SKILLS TAG MANAGER */}
          <div className="bg-white border border-[#EBEBEB] p-6 sm:p-8 rounded-2xl shadow-2xs flex flex-col gap-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-sans font-bold text-base text-stone-900">
                Skills & Trade Interests
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Manage tags to help members discover you on the Interactive Coordinates Map.
              </p>
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                value={newSkillInput} 
                onChange={(e) => setNewSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                placeholder="Type a skill (e.g. Figma, React, 3D Modeling, Rust) and press Enter..."
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {skillsList.map((skill, sIdx) => (
                <span 
                  key={sIdx}
                  className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-stone-800 font-sans text-xs font-semibold flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button 
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-stone-400 hover:text-stone-800 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SECTION 4: RATES & COLLAB PREFERENCES */}
          <div className="bg-white border border-[#EBEBEB] p-6 sm:p-8 rounded-2xl shadow-2xs flex flex-col gap-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-sans font-bold text-base text-stone-900">
                Collaboration & Rate Preferences
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Standard Rate / Hour</label>
                <input 
                  type="text" 
                  value={rate} 
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="e.g. 45 NaiTokens / hr ($45)"
                />
              </div>

              <div className="flex flex-col justify-center gap-2 pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-stone-800">
                  <input 
                    type="checkbox" 
                    checked={availableForCollab} 
                    onChange={(e) => setAvailableForCollab(e.target.checked)}
                    className="w-4 h-4 accent-[#FFC107] rounded"
                  />
                  <span>Available for New Collaborative Sprints</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-stone-800">
                  <input 
                    type="checkbox" 
                    checked={openToMentoring} 
                    onChange={(e) => setOpenToMentoring(e.target.checked)}
                    className="w-4 h-4 accent-[#FFC107] rounded"
                  />
                  <span>Open to Mentoring Junior Peers</span>
                </label>
              </div>
            </div>
          </div>

          {/* SECTION 5: SOCIAL PRESENCE */}
          <div className="bg-white border border-[#EBEBEB] p-6 sm:p-8 rounded-2xl shadow-2xs flex flex-col gap-4">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-sans font-bold text-base text-stone-900">
                Social Accounts & External Portfolios
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Website / Portfolio</label>
                <input 
                  type="url" 
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Figma Handle</label>
                <input 
                  type="text" 
                  value={figma} 
                  onChange={(e) => setFigma(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="@figma_user"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">GitHub Username</label>
                <input 
                  type="text" 
                  value={github} 
                  onChange={(e) => setGithub(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="github-username"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">X / Twitter Handle</label>
                <input 
                  type="text" 
                  value={twitter} 
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full bg-[#FAFAFA] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800 outline-none focus:border-[#FFC107] transition"
                  placeholder="@twitter_handle"
                />
              </div>
            </div>
          </div>

          {/* SAVE BUTTONS ROW */}
          <div className="flex justify-end items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="px-5 py-2.5 rounded-full border border-stone-300 text-xs font-bold text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#FFC107] hover:bg-[#FFB300] text-stone-950 font-black text-xs transition shadow-md cursor-pointer flex items-center gap-1.5"
              id="btn-save-profile-settings"
            >
              <Check className="w-4 h-4 text-stone-950 stroke-[3px]" />
              <span>Save Profile Changes</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
