import { ProfileUserData, UserProfile } from '../types';

export const curatedAvatars = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240',
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=240',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=240',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=240'
];

export const curatedBanners = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200'
];

export const mockUsersDatabase: Record<string, ProfileUserData> = {
  'Afolabi Emmanuel': {
    id: 'u-afolabi-emmanuel',
    name: 'Afolabi Emmanuel',
    username: 'afolabi_emma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    role: 'Brand Designer & Web3 Architect',
    bio: 'Pioneering decentralized visual identities and interactive design systems across Africa & beyond. Passionate about tokenomics, peer skill-trading, and crafting interfaces people love to explore.',
    location: 'Lagos, Nigeria • Creative Region',
    rating: 4.9,
    reviewCount: 38,
    naiPoints: 1850,
    completedCollabs: 24,
    skills: ['Brand Identity', 'Figma', 'Web3 UI', 'Typography', 'Design Systems', 'Copywriting'],
    interests: ['Figma', 'UI/UX', 'Smart Contracts', 'DAO Governance'],
    website: 'https://afolabi.design',
    github: 'afolabi-emma',
    figma: '@afolabi_brand',
    twitter: '@afolabi_web3',
    rate: '45 NaiTokens / hr ($45)',
    availableForCollab: true,
    openToMentoring: true,
    email: 'emmanuel.afolabi@nailand.peer',
    posts: [
      {
        id: 'post-emma-1',
        content: 'Just finished shipping the revised typography rules and token guidelines for our cross-border payment dashboard. Feedback is welcomed!',
        timeAgo: '2 hours ago',
        likes: 42,
        comments: 11,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600'
      },
      {
        id: 'post-emma-2',
        content: 'Honest collaboration is the true currency of Web3. Looking for a React front-end partner for a 2-week sprint.',
        timeAgo: '3 days ago',
        likes: 87,
        comments: 24
      }
    ],
    collabs: [
      {
        id: 'collab-1',
        title: 'DeFi Wallet Design System',
        role: 'Lead UI/UX Designer',
        status: 'Active',
        stipend: '120 NaiTokens',
        timeline: '2 weeks'
      },
      {
        id: 'collab-2',
        title: 'Web3 Skills Barter Exchange Protocol',
        role: 'Design Lead',
        status: 'Completed',
        stipend: '250 NaiTokens',
        timeline: '1 month'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        reviewer: 'Lola Adebinpe',
        reviewerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120',
        rating: 5,
        comment: 'Afolabi is a master of typography and layout balance. He delivered ahead of our sprint deadline with impeccable component documentation.',
        date: '3 weeks ago',
        projectTitle: 'DeFi Wallet Design System'
      },
      {
        id: 'rev-2',
        reviewer: 'Afolabi Toyosi',
        reviewerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120',
        rating: 5,
        comment: 'Working with Emmanuel on front-end handoff was seamless. Every frame had auto-layout and responsive constraints defined.',
        date: '1 month ago',
        projectTitle: 'NaiLand Chamber Beta'
      }
    ]
  },
  'Afolabi Ola': {
    id: 'u-afolabi-ola',
    name: 'Afolabi Ola',
    username: 'afolabi_ola',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
    role: 'UX/UI Expert & Interaction Designer',
    bio: 'Specialist in user interaction architectures, micro-animations, and community peer networks. 6+ years creating engaging digital products that delight users and scale seamlessly.',
    location: 'Abuja, Nigeria • Tech Region',
    rating: 4.8,
    reviewCount: 45,
    naiPoints: 2150,
    completedCollabs: 31,
    skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Usability Testing', 'React Basics'],
    interests: ['UI/UX', 'Mobile Design', 'Web3', 'Design Systems'],
    website: 'https://ola.work',
    github: 'afolabi-ola',
    figma: '@afolabi_ola',
    twitter: '@ola_ux',
    rate: '50 NaiTokens / hr ($50)',
    availableForCollab: true,
    openToMentoring: false,
    email: 'ola.afolabi@nailand.peer',
    posts: [
      {
        id: 'post-ola-1',
        content: 'I create interactive design interfaces that engage users and streamline complex workflows into one-tap experiences.',
        timeAgo: 'Yesterday',
        likes: 64,
        comments: 18,
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600'
      }
    ],
    collabs: [
      {
        id: 'collab-ola-1',
        title: 'Cross-Border Freelance Escrow Flow',
        role: 'Product Designer',
        status: 'Active',
        stipend: '150 NaiTokens',
        timeline: '3 weeks'
      }
    ],
    reviews: [
      {
        id: 'rev-ola-1',
        reviewer: 'Afolabi Victor',
        reviewerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120',
        rating: 5,
        comment: 'Ola brings supreme clarity to complex UX problems. Highly recommended collaborator on any product team!',
        date: '2 weeks ago',
        projectTitle: 'Escrow Flow UX Audit'
      }
    ]
  },
  'Lola Adebinpe': {
    id: 'u-lola-adebinpe',
    name: 'Lola Adebinpe',
    username: 'lola_ade',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200',
    role: 'Senior Product Designer & Design Ops',
    bio: 'Bridging design, engineering, and product strategy. Passionate about design ops, accessible user experiences, and mentoring budding creators in Africa.',
    location: 'Nairobi, Kenya • Creative Region',
    rating: 5.0,
    reviewCount: 52,
    naiPoints: 2400,
    completedCollabs: 40,
    skills: ['Design Ops', 'Figma Tokens', 'Accessibility', 'Mobile UX', 'Mentoring'],
    interests: ['Figma', 'UI/UX', 'Product Strategy', 'Design Tokens'],
    website: 'https://lola.design',
    figma: '@lola_adebinpe',
    twitter: '@lola_uxer',
    rate: '60 NaiTokens / hr ($60)',
    availableForCollab: true,
    openToMentoring: true,
    email: 'lola.adebinpe@nailand.peer',
    posts: [
      {
        id: 'post-lola-1',
        content: 'Design token alignment between Figma and Tailwind CSS saves engineering teams 40% of handoff friction. Published our new playbook!',
        timeAgo: '4 hours ago',
        likes: 95,
        comments: 29
      }
    ],
    collabs: [
      {
        id: 'collab-lola-1',
        title: 'Accessible Design System Core',
        role: 'Design Ops Lead',
        status: 'Active',
        stipend: '180 NaiTokens',
        timeline: '1 month'
      }
    ],
    reviews: [
      {
        id: 'rev-lola-1',
        reviewer: 'Afolabi Emmanuel',
        reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120',
        rating: 5,
        comment: 'Lola is exceptional at orchestrating design tokens and building team momentum. A joy to collaborate with.',
        date: '1 week ago',
        projectTitle: 'Design Token System'
      }
    ]
  },
  'Afolabi Toyosi': {
    id: 'u-afolabi-toyosi',
    name: 'Afolabi Toyosi',
    username: 'toyosi_code',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200',
    role: 'Front End Engineer & React Architect',
    bio: 'Crafting pixel-perfect, accessible, and high-performance Web3 applications. Transforming Figma visual components into robust TypeScript codebases.',
    location: 'Ibadan, Nigeria • Tech Region',
    rating: 4.9,
    reviewCount: 29,
    naiPoints: 1720,
    completedCollabs: 22,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'GraphQL', 'Next.js'],
    interests: ['React', 'TypeScript', 'Web3', 'Mobile Design'],
    github: 'toyosi-code',
    twitter: '@toyosi_frontend',
    rate: '50 NaiTokens / hr ($50)',
    availableForCollab: true,
    openToMentoring: true,
    email: 'toyosi.afolabi@nailand.peer',
    posts: [
      {
        id: 'post-toyosi-1',
        content: 'Smooth 60fps animations with motion/react make all the difference in decentralized app UX. Shipped new layout transitions.',
        timeAgo: '1 day ago',
        likes: 58,
        comments: 14
      }
    ],
    collabs: [
      {
        id: 'collab-toyosi-1',
        title: 'NaiLand Component Library',
        role: 'Lead Frontend Dev',
        status: 'Active',
        stipend: '200 NaiTokens',
        timeline: '2 weeks'
      }
    ],
    reviews: [
      {
        id: 'rev-toyosi-1',
        reviewer: 'Afolabi Emmanuel',
        reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120',
        rating: 5,
        comment: 'Toyosi wrote clean, modular code that matched every spacing specification from our Figma tokens.',
        date: '2 weeks ago',
        projectTitle: 'NaiLand Component Library'
      }
    ]
  },
  'Afolabi Blessing': {
    id: 'u-afolabi-blessing',
    name: 'Afolabi Blessing',
    username: 'blessing_words',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    role: 'UX Copywriter & Narrative Strategist',
    bio: 'Translating complex cryptography and decentralized workflows into clear, human, friendly interface copy that builds user confidence.',
    location: 'Kigali, Rwanda • Creative Region',
    rating: 5.0,
    reviewCount: 22,
    naiPoints: 1390,
    completedCollabs: 18,
    skills: ['UX Writing', 'Content Strategy', 'Microcopy', 'Storytelling', 'Localization'],
    interests: ['Copywriting', 'Web3', 'Community Building'],
    rate: '35 NaiTokens / hr ($35)',
    availableForCollab: true,
    email: 'blessing.afolabi@nailand.peer'
  },
  'Afolabi Victor': {
    id: 'u-afolabi-victor',
    name: 'Afolabi Victor',
    username: 'victor_3d',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
    role: '3D Designer & Spatial Interaction Modeler',
    bio: 'Building immersive digital worlds, stylized assets, and interactive WebGL experiences for Web3 products and next-gen brands.',
    location: 'Accra, Ghana • Tech Region',
    rating: 4.8,
    reviewCount: 19,
    naiPoints: 1640,
    completedCollabs: 15,
    skills: ['Blender', 'Three.js', 'Spline', 'Spatial UI', 'Motion Graphics'],
    interests: ['3D Design', 'VR/AR', 'Tech'],
    rate: '55 NaiTokens / hr ($55)',
    availableForCollab: true,
    email: 'victor.afolabi@nailand.peer'
  },
  'Afolabi Funke': {
    id: 'u-afolabi-funke',
    name: 'Afolabi Funke',
    username: 'funke_figma',
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200',
    role: 'Figma Guru & Interaction Architect',
    bio: 'Figma Community Advocate. Organizing workshops, sharing free design token kits, and helping teams scale modular components.',
    location: 'Cape Town, South Africa • Creative Region',
    rating: 5.0,
    reviewCount: 41,
    naiPoints: 2310,
    completedCollabs: 35,
    skills: ['Figma Variables', 'Design Systems', 'Interactive Prototyping', 'Mentoring'],
    interests: ['Figma', 'UI/UX', 'Community', 'Mentorship'],
    rate: '50 NaiTokens / hr ($50)',
    availableForCollab: true,
    openToMentoring: true,
    email: 'funke.afolabi@nailand.peer'
  },
  'Afolabi Tunde': {
    id: 'u-afolabi-tunde',
    name: 'Afolabi Tunde',
    username: 'tunde_illustrates',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    role: 'Digital Illustrator & Concept Artist',
    bio: 'Crafting expressive editorial illustrations, character models, and vibrant vector graphics celebrating African innovation and culture.',
    location: 'Lagos, Nigeria • Creative Region',
    rating: 4.7,
    reviewCount: 26,
    naiPoints: 1480,
    completedCollabs: 20,
    skills: ['Vector Art', 'Editorial Illustration', 'Procreate', 'Adobe Illustrator', 'Branding'],
    interests: ['Illustration', 'Creative', 'NFTs', 'Graphic Design'],
    rate: '40 NaiTokens / hr ($40)',
    availableForCollab: true,
    email: 'tunde.afolabi@nailand.peer'
  }
};

/**
 * Builds a ProfileUserData structure from the logged in user's profile state
 */
export function buildProfileFromCurrentUser(user: UserProfile): ProfileUserData {
  const fullName = `${user.firstName || 'Afolabi'} ${user.secondName || 'Ola'}`.trim() || 'Afolabi Ola';
  const username = user.username || `${user.firstName.toLowerCase() || 'afolabi'}_${user.secondName.toLowerCase() || 'ola'}`;

  return {
    id: 'current-user-profile',
    name: fullName,
    username: username.replace(/[^a-zA-Z0-9_]/g, ''),
    avatar: user.avatar || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=240',
    banner: user.banner || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
    role: user.headline || 'Product Designer & Web3 Collaborator',
    bio: user.bio || 'Designing decentralized interfaces, trading skills with top creators, and building the future on NaiLand.',
    location: user.location || `${user.region || 'Creative'} • Global`,
    rating: user.rating ?? 4.9,
    reviewCount: 34,
    naiPoints: user.naiPoints ?? 1420,
    completedCollabs: user.completedCollabs ?? 18,
    skills: user.interests && user.interests.length > 0 ? user.interests : ['Figma', 'UI/UX', 'Mobile Design', 'React'],
    interests: user.interests && user.interests.length > 0 ? user.interests : ['Creative', 'Tech', 'Web3'],
    website: user.website || 'https://nailand.peer/me',
    github: user.github || 'nailand-creator',
    figma: user.figma || `@${username}`,
    twitter: user.twitter || `@${username}`,
    rate: user.rate || '40 NaiTokens / hr ($40)',
    availableForCollab: user.availableForCollab ?? true,
    openToMentoring: user.openToMentoring ?? true,
    isSelf: true,
    email: user.email || 'user@nailand.com',
    posts: [
      {
        id: 'self-post-1',
        content: 'Excited to be active on NaiLand! Looking forward to trading skills with fellow Web3 designers and front-end developers.',
        timeAgo: 'Just now',
        likes: 12,
        comments: 3
      }
    ],
    collabs: [
      {
        id: 'self-collab-1',
        title: 'Interactive Design Interface Sprint',
        role: 'Lead Designer',
        status: 'Active',
        stipend: '100 NaiTokens',
        timeline: '10 days'
      }
    ],
    reviews: [
      {
        id: 'self-rev-1',
        reviewer: 'Afolabi Emmanuel',
        reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120',
        rating: 5,
        comment: 'Great peer-mesh collaborator! Prompt communication, clear design handoff, and wonderful work ethic.',
        date: '5 days ago',
        projectTitle: 'Interactive Design Sprint'
      }
    ]
  };
}

/**
 * Resolves a ProfileUserData by name, id, or creates a dynamic high-fidelity profile
 */
export function getUserProfile(
  nameOrId: string, 
  avatarOrCurrentUser?: string | UserProfile, 
  fallbackAvatar?: string
): ProfileUserData {
  const currentUser = typeof avatarOrCurrentUser === 'object' ? avatarOrCurrentUser : undefined;
  const avatar = typeof avatarOrCurrentUser === 'string' ? avatarOrCurrentUser : fallbackAvatar;

  // Check if requesting own profile
  if (nameOrId === 'me' || nameOrId === 'self' || (currentUser && (`${currentUser.firstName} ${currentUser.secondName}`.trim().toLowerCase() === nameOrId.toLowerCase()))) {
    if (currentUser) {
      return buildProfileFromCurrentUser(currentUser);
    }
  }

  // Exact or case-insensitive match from database
  const normalized = nameOrId.trim();
  if (mockUsersDatabase[normalized]) {
    const existing = mockUsersDatabase[normalized];
    return avatar ? { ...existing, avatar } : existing;
  }

  const matchKey = Object.keys(mockUsersDatabase).find(k => k.toLowerCase() === normalized.toLowerCase());
  if (matchKey) {
    const existing = mockUsersDatabase[matchKey];
    return avatar ? { ...existing, avatar } : existing;
  }

  // Generate a plausible high-fidelity fallback profile for any other clicked user
  const sanitizedUsername = normalized.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return {
    id: `u-${sanitizedUsername}`,
    name: normalized,
    username: sanitizedUsername,
    avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=240',
    banner: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200',
    role: 'Creative Contributor & Web3 Specialist',
    bio: `Active collaborator in the NaiLand ecosystem. Dedicated to open-source coordination, skill exchange, and decentralized workflows.`,
    location: 'Creative Region • Africa',
    rating: 4.8,
    reviewCount: 15,
    naiPoints: 1250,
    completedCollabs: 12,
    skills: ['Figma', 'UI Design', 'Skill Exchange', 'Collaboration'],
    interests: ['Design', 'Tech', 'Web3'],
    rate: '35 NaiTokens / hr ($35)',
    availableForCollab: true,
    isSelf: false,
    email: `${sanitizedUsername}@nailand.peer`,
    posts: [
      {
        id: `post-${sanitizedUsername}-1`,
        content: `Looking forward to collaborating on upcoming peer sprints. Send me a message if you want to trade skills!`,
        timeAgo: '1 day ago',
        likes: 24,
        comments: 5
      }
    ],
    reviews: [
      {
        id: `rev-${sanitizedUsername}-1`,
        reviewer: 'Afolabi Emmanuel',
        reviewerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120',
        rating: 5,
        comment: `Excellent collaborator with sharp attention to detail. Would gladly work with again!`,
        date: '2 weeks ago',
        projectTitle: 'Skills Collaboration Sprint'
      }
    ]
  };
}
