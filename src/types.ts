/**
 * Types and interfaces for Hello Kitty's Sweet Cafe & Village Website
 */

export type WebsiteTab = 'anniversary' | 'home' | 'games' | 'menu' | 'characters' | 'dressup' | 'decor' | 'village';

export interface CoupleProfile {
  partner1: string;
  partner2: string;
  anniversaryDate: string; // e.g., '2025-10-16'
  customNote: string;
  loveLockLocked: boolean;
  cakeCelebrated: boolean;
}

export interface AnniversaryMilestone {
  id: string;
  dayOrMonth: string;
  title: string;
  description: string;
  icon: string;
  category: 'first_date' | 'adventure' | 'milestone' | 'cozy' | 'anniversary';
  dateStr?: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  category: string;
  completed: boolean;
  notes?: string;
}

export type GameMode = 'hub' | 'catcher' | 'bakery' | 'dressup' | 'decor';

export type GameSubMode = 'catcher' | 'bakery';

export interface FriendCharacter {
  id: string;
  name: string;
  title: string;
  avatarColor: string;
  favoriteTreat: string;
  dialogueHappy: string;
  dialogueGreeting: string;
  friendshipLevel: number;
  birthday: string;
  height: string;
  weight: string;
  personality: string;
  funFact: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'pastry' | 'drink' | 'dessert';
  priceCoins: number;
  description: string;
  icon: string;
  sweetness: number; // 1 to 5
  tags: string[];
  favoriteOf: string;
  prepTime: string;
}

export interface CatchItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'apple' | 'golden_apple' | 'strawberry' | 'ribbon' | 'star' | 'cloud' | 'clock';
  points: number;
  isHazard: boolean;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  color: string;
  category: 'base' | 'flavor' | 'topping' | 'garnish';
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  targetCustomer: string;
  requiredIngredients: string[];
  rewardCoins: number;
  rewardExp: number;
  icon: string;
  difficulty: 'easy' | 'medium' | 'master';
}

export interface ActiveCustomerOrder {
  id: string;
  customerId: string;
  recipeId: string;
  totalTime: number;
  timeLeft: number;
  currentIngredients: string[];
}

export interface WardrobeItem {
  id: string;
  category: 'bow' | 'outfit' | 'handheld' | 'background';
  name: string;
  icon: string;
  cost: number;
  unlocked: boolean;
  colorHex?: string;
}

export interface DecorItem {
  id: string;
  category: 'wallpaper' | 'flooring' | 'table' | 'counter' | 'plushie';
  name: string;
  cost: number;
  unlocked: boolean;
  icon: string;
  previewColor: string;
}

export interface PolaroidPhoto {
  id: string;
  date: string;
  caption: string;
  outfit: {
    bowId: string;
    outfitId: string;
    handheldId: string;
    bgId: string;
  };
  sticker: string;
  dataUrl?: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  message: string;
  sticker: string;
  date: string;
  friendId: string;
}

export interface GameState {
  ribbonCoins: number;
  strawberryGems: number;
  highScoreCatcher: number;
  applesHarvested: number;
  ordersFulfilled: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  activeMusicTrack: string;
  unlockedItems: string[];
  activeBow: string;
  activeOutfit: string;
  activeHandheld: string;
  activeBackground: string;
  cafeWallpaper: string;
  cafeFloor: string;
  cafeTable: string;
  cafePlushie: string;
  album: PolaroidPhoto[];
  guestbook: GuestbookEntry[];
  coupleProfile: CoupleProfile;
  bucketList: BucketListItem[];
}
