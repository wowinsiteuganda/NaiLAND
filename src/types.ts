export enum ActiveView {
  LANDING = 'LANDING',
  SIGN_UP = 'SIGN_UP',
  CONFIRMATION_CODE = 'CONFIRMATION_CODE',
  INTERESTS = 'INTERESTS',
  SUGGESTED_REGIONS = 'SUGGESTED_REGIONS',
  LOGIN = 'LOGIN',
  PASSWORD_RESET_CODE = 'PASSWORD_RESET_CODE',
  NEW_PASSWORD = 'NEW_PASSWORD',
  APP_LAYOUT = 'APP_LAYOUT'
}

export type DashboardTab = 'dashboard' | 'messages' | 'community' | 'profile' | 'help' | 'logout';

export interface UserProfile {
  firstName: string;
  secondName: string;
  email: string;
  interests: string[];
  region: string;
  avatar?: string;
  banner?: string;
  username?: string;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  figma?: string;
  twitter?: string;
  rate?: string;
  naiPoints?: number;
  completedCollabs?: number;
  rating?: number;
  availableForCollab?: boolean;
  openToMentoring?: boolean;
  emailNotifications?: boolean;
  publicProfile?: boolean;
}

export interface ProfileReview {
  id: string;
  reviewer: string;
  reviewerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  projectTitle: string;
}

export interface ProfileUserData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner: string;
  role: string;
  bio: string;
  location: string;
  rating: number;
  reviewCount: number;
  naiPoints: number;
  completedCollabs: number;
  skills: string[];
  interests: string[];
  website?: string;
  github?: string;
  figma?: string;
  twitter?: string;
  rate: string;
  availableForCollab: boolean;
  openToMentoring?: boolean;
  isSelf?: boolean;
  email?: string;
  posts?: {
    id: string;
    content: string;
    timeAgo: string;
    likes: number;
    comments: number;
    image?: string;
  }[];
  collabs?: {
    id: string;
    title: string;
    role: string;
    status: 'Active' | 'Completed' | 'Open for Application';
    stipend: string;
    timeline: string;
  }[];
  reviews?: ProfileReview[];
}

export interface MessageAttachment {
  name: string;
  size: string;
  type: 'image' | 'video' | 'file';
  url: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  isMe: boolean;
  attachments?: MessageAttachment[];
}

export interface ChatThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timeString: string;
  category: 'all' | 'community' | 'chat';
  messages: ChatMessage[];
  status?: string;
}

export interface SkillNeedCard {
  id: string;
  name: string;
  rating: number;
  avatar: string;
  text: string;
  compensation: string;
}

export interface CollabOffer {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  roles: string[];
  collaboratorsCount: number;
  projectLength: string;
  commitment: string;
  monetary: string;
  skillExchange: string;
  creator: string;
  creatorAvatar: string;
}

export interface SkillRequest {
  id: string;
  title: string;
  description: string;
  roles: string[];
  projectLength: string;
  monetary: string;
}

export interface PostComment {
  id: string;
  author: string;
  authorAvatar: string;
  rating: number;
  timeAgo?: string;
  content: string;
  likes: number;
  reposts: number;
  shares: number;
  views: number;
}

export interface CommunityFeedPost {
  id: string;
  author: string;
  authorAvatar: string;
  rating: number;
  timeAgo: string;
  content: string;
  image?: string;
  videoUrl?: string;
  images?: string[];
  attachmentTypes?: string[];
  likes: number;
  reposts?: number;
  comments: number;
  shares: number;
  views?: number;
  saved?: boolean;
  commentsList?: PostComment[];
}
