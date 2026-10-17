import React, { useState, useEffect, useRef } from 'react';
import { CoupleProfile, AnniversaryMilestone, BucketListItem, WebsiteTab } from '../types';
import { ANNIVERSARY_MILESTONES, ANNIVERSARY_REASONS, COUPLE_BUCKET_LIST } from '../data/gameData';
import { KittySvg } from './KittySvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { 
  Heart, Sparkles, Flame, Wind, Cake, Gift, Calendar, Clock, 
  BookHeart, Check, Plus, Edit3, Lock, Unlock, Camera, Music, 
  RotateCcw, Share2, Award, ChevronRight, Star, Quote
} from 'lucide-react';
import { saveAnniversaryWish, saveAnniversaryLetter, saveBucketGoal } from '../lib/supabase';

interface AnniversaryHubProps {
  coupleProfile: CoupleProfile;
  onUpdateCoupleProfile: (profile: CoupleProfile) => void;
  bucketList: BucketListItem[];
  onUpdateBucketList: (items: BucketListItem[]) => void;
  onSelectTab: (tab: WebsiteTab) => void;
  onClaimReward: (coins: number, gems: number) => void;
  onTakeAnniversaryPhoto: (caption: string, dataUrl?: string) => void;
  activeMusicTrack: string;
  onChangeMusicTrack: (track: string) => void;
}

export const AnniversaryHub: React.FC<AnniversaryHubProps> = ({
  coupleProfile,
  onUpdateCoupleProfile,
  bucketList,
  onUpdateBucketList,
  onSelectTab,
  onClaimReward,
  onTakeAnniversaryPhoto,
  activeMusicTrack,
  onChangeMusicTrack,
}) => {
  // Editing Couple Profile modal/drawer state
  const [isEditingProfile, setIsEditingProfile] = useState<boolean>(false);
  const [partner1Name, setPartner1Name] = useState<string>(coupleProfile.partner1);
  const [partner2Name, setPartner2Name] = useState<string>(coupleProfile.partner2);
  const [annivDate, setAnnivDate] = useState<string>(coupleProfile.anniversaryDate);
  const [customLetter, setCustomLetter] = useState<string>(coupleProfile.customNote);

  // Anniversary Letter Envelope state
  const [isLetterOpen, setIsLetterOpen] = useState<boolean>(false);
  const [isEditingLetter, setIsEditingLetter] = useState<boolean>(false);

  // Cake Ceremony State (0: Unlit, 1: Candle Lit, 2: Wishing, 3: Blown Out, 4: Cut & Celebrated)
  const [cakeStep, setCakeStep] = useState<number>(coupleProfile.cakeCelebrated ? 4 : 0);
  const [wishMadeText, setWishMadeText] = useState<string>('');
  const [isWishing, setIsWishing] = useState<boolean>(false);

  useEffect(() => {
    setPartner1Name(coupleProfile.partner1);
    setPartner2Name(coupleProfile.partner2);
    setAnnivDate(coupleProfile.anniversaryDate);
    setCustomLetter(coupleProfile.customNote);
  }, [coupleProfile]);

  // New Bucket List Item state
  const [newBucketTitle, setNewBucketTitle] = useState<string>('');

  // Uploaded photo preview for polaroid
  const [userPhotos, setUserPhotos] = useState<Array<{ id: string; url: string; caption: string; date: string }>>([
    {
      id: 'default_couple_1',
      url: '',
      caption: '365 Days of Fun & Friendship 🌟 Our 1st Anniversary',
      date: 'October 15 • 1 Year'
    }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live timer calculating time together
  const [timeTogether, setTimeTogether] = useState({
    days: 365,
    hours: 8760,
    minutes: 525600,
    seconds: 31536000,
  });

  useEffect(() => {
    const calculateTime = () => {
      try {
        const start = new Date(coupleProfile.anniversaryDate).getTime();
        const now = Date.now();
        const diffMs = Math.max(0, now - start);
        const days = Math.max(365, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor(diffMs / (1000 * 60));
        const seconds = Math.floor(diffMs / 1000);
        setTimeTogether({ days, hours, minutes, seconds });
      } catch {
        setTimeTogether({ days: 365, hours: 8760, minutes: 525600, seconds: 31536000 });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [coupleProfile.anniversaryDate]);

  // Trigger heart confetti
  const triggerHeartConfetti = () => {
    kawaiiAudio.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#ff4d6d', '#ff758f', '#ff85a1', '#ffd166', '#ffffff']
      });
    } catch {
      // ignore
    }
  };

  // Cake Ceremony Handlers
  const handleLightCandle = () => {
    kawaiiAudio.playChime();
    setCakeStep(1);
  };

  const handleMakeWish = () => {
    setIsWishing(true);
  };

  const handleConfirmWish = () => {
    kawaiiAudio.playSuccess();
    setIsWishing(false);
    setCakeStep(2);
    if (wishMadeText.trim()) {
      saveAnniversaryWish(wishMadeText.trim(), coupleProfile.partner2);
    }
  };

  const handleBlowCandle = () => {
    kawaiiAudio.playPop();
    setCakeStep(3);
    triggerHeartConfetti();
  };

  const handleCutCake = () => {
    kawaiiAudio.playSuccess();
    setCakeStep(4);
    onUpdateCoupleProfile({ ...coupleProfile, cakeCelebrated: true });
    onClaimReward(150, 10);
    triggerHeartConfetti();
  };

  // Toggle Bucket List Item
  const handleToggleBucket = (id: string) => {
    kawaiiAudio.playPop();
    const updated = bucketList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdateBucketList(updated);
    if (!bucketList.find((b) => b.id === id)?.completed) {
      triggerHeartConfetti();
    }
  };

  // Add Bucket Item
  const handleAddBucketItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBucketTitle.trim()) return;
    kawaiiAudio.playSuccess();
    const cleanGoal = newBucketTitle.trim();
    const newItem: BucketListItem = {
      id: `bucket_${Date.now()}`,
      title: cleanGoal,
      category: 'Romantic Goals',
      completed: false,
    };
    onUpdateBucketList([...bucketList, newItem]);
    saveBucketGoal(cleanGoal, coupleProfile.partner2);
    setNewBucketTitle('');
  };

  // Save Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    kawaiiAudio.playSuccess();
    const newNote = customLetter.trim() || coupleProfile.customNote;
    const authorName = partner2Name.trim() || coupleProfile.partner2;
    onUpdateCoupleProfile({
      ...coupleProfile,
      partner1: partner1Name.trim() || 'Tafeh',
      partner2: authorName,
      anniversaryDate: annivDate,
      customNote: newNote,
    });
    if (newNote) {
      saveAnniversaryLetter(newNote, authorName);
    }
    setIsEditingProfile(false);
    triggerHeartConfetti();
  };

  // Toggle Friendship Bond Lock
  const handleToggleBondLock = () => {
    kawaiiAudio.playSuccess();
    const nextLocked = !coupleProfile.loveLockLocked;
    onUpdateCoupleProfile({ ...coupleProfile, loveLockLocked: nextLocked });
    triggerHeartConfetti();
  };

  // Handle Photo Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const newPhoto = {
        id: `user_photo_${Date.now()}`,
        url: dataUrl,
        caption: `1 Year Anniversary with ${coupleProfile.partner2} 🌟`,
        date: 'Today • 1 Year'
      };
      setUserPhotos([newPhoto, ...userPhotos]);
      kawaiiAudio.playSuccess();
      triggerHeartConfetti();
      onTakeAnniversaryPhoto(newPhoto.caption, dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const completedBucketCount = bucketList.filter((b) => b.completed).length;

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-8 text-[#4a2835]">
      {/* 1. Grand 1-Year Anniversary Celebration Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-pink-300 shadow-xl bg-gradient-to-br from-rose-100 via-pink-50 to-amber-50 p-6 sm:p-10 flex flex-col items-center text-center gap-6">
        {/* Decorative Floating Ribbon & Star Accents */}
        <div className="absolute top-3 left-4 text-2xl animate-bounce">🎀</div>
        <div className="absolute top-4 right-4 text-2xl animate-pulse">🌟</div>
        <div className="absolute bottom-4 left-6 text-xl opacity-60">✨</div>
        <div className="absolute bottom-4 right-6 text-2xl opacity-80 animate-bounce" style={{ animationDelay: '300ms' }}>⭐</div>

        {/* Top Commemorative Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md tracking-wide uppercase">
          <Sparkles className="w-4 h-4 animate-spin text-amber-200" />
          <span>Happy 1st Anniversary • 1 Year Together (October 15)</span>
          <Sparkles className="w-4 h-4 text-amber-200" />
        </div>

        {/* Duo Title */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl font-black font-display text-red-600 tracking-tight flex items-center justify-center gap-3 flex-wrap">
            <span>{coupleProfile.partner1}</span>
            <span className="text-amber-400 text-2xl sm:text-3xl">⭐</span>
            <span>{coupleProfile.partner2}</span>
          </h1>
          <p className="text-base sm:text-lg text-pink-700 font-semibold mt-2">
            365 Days of Sweet Smiles, High Fives, Inside Jokes & Endless Adventures Together
          </p>
        </div>

        {/* 365 Days Live Time Counter Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl">
          <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-red-500 font-display">
              {timeTogether.days}
            </span>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Days Together</span>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-pink-500 font-display">
              {timeTogether.hours.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Hours Shared</span>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-purple-600 font-display">
              {timeTogether.minutes.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Sweet Minutes</span>
          </div>

          <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-500 font-display">
              {timeTogether.seconds.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-pink-600 uppercase tracking-wider">Seconds Together</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={triggerHeartConfetti}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-sm shadow-md hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Celebrate with Confetti! 🎉</span>
          </button>

          <button
            onClick={() => {
              kawaiiAudio.playPop();
              onChangeMusicTrack('anniversary_love');
            }}
            className="px-4 py-2.5 rounded-full bg-white hover:bg-pink-50 text-red-600 font-bold text-sm border-2 border-pink-200 shadow-sm hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Music className="w-4 h-4 text-red-500" />
            <span>Play Anniversary Waltz 🎶</span>
          </button>

          <button
            onClick={() => {
              kawaiiAudio.playPop();
              setIsEditingProfile(true);
            }}
            className="px-4 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-sm border border-pink-300 shadow-sm hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Customize Names & Date</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive 1st Anniversary Heart Cake Ceremony & Anniversary Letter Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* A. 1st Anniversary Cake Ceremony */}
        <div className="bg-white rounded-3xl p-6 border-3 border-pink-200 shadow-sm flex flex-col justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-pink-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎂</span>
              <div>
                <h3 className="text-lg font-bold font-display text-red-600">
                  1st Anniversary Heart Cake Ceremony
                </h3>
                <p className="text-xs text-pink-600">Light the candle, make a wish & slice together!</p>
              </div>
            </div>

            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-100 text-pink-700">
              {cakeStep === 4 ? 'Celebrated! 🍰' : `Step ${cakeStep + 1} of 4`}
            </span>
          </div>

          {/* Interactive Visual Cake Rendering */}
          <div className="flex flex-col items-center justify-center py-4 relative">
            {/* Candle with Flickering Animated Flame */}
            <div className="flex flex-col items-center mb-1">
              {cakeStep >= 1 && cakeStep < 3 && (
                <div className="w-4 h-6 bg-amber-400 rounded-full animate-pulse blur-[1px] relative flex items-center justify-center shadow-lg shadow-amber-300">
                  <div className="w-2 h-3 bg-white rounded-full animate-bounce" />
                </div>
              )}
              {cakeStep >= 3 && (
                <div className="text-xs font-bold text-gray-400 animate-pulse pb-1">
                  💨 poof!
                </div>
              )}
              {cakeStep === 0 && (
                <div className="w-2 h-3 bg-gray-400 rounded-xs mb-0.5" />
              )}
              {/* Golden Candle with "1" */}
              <div className="w-5 h-12 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 border border-amber-500 rounded-t-md shadow-xs flex items-center justify-center font-black text-amber-900 text-xs font-display">
                1
              </div>
            </div>

            {/* Cake Tier 1 (Heart top) */}
            <div className="w-36 h-14 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-3xl border-2 border-pink-400 shadow-sm flex items-center justify-center relative">
              <span className="text-sm">🍓 💖 🍓</span>
              <div className="absolute -bottom-2 w-full flex justify-around text-[10px] text-pink-500">
                <span>🤍</span><span>🤍</span><span>🤍</span><span>🤍</span>
              </div>
            </div>

            {/* Cake Tier 2 (Base) */}
            <div className="w-52 h-18 bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 rounded-b-2xl border-2 border-pink-300 shadow-md flex items-center justify-center relative">
              <span className="text-xs font-bold text-pink-700 font-display tracking-widest uppercase">
                1 Year Together
              </span>
              {cakeStep === 4 && (
                <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[1px] rounded-b-2xl">
                  <span className="text-xs font-bold text-red-600 bg-white px-3 py-1 rounded-full shadow-xs border border-pink-200">
                    🍰 First Slice Shared!
                  </span>
                </div>
              )}
            </div>

            {/* Plate */}
            <div className="w-64 h-3 bg-gradient-to-r from-gray-100 via-white to-gray-200 border-2 border-gray-300 rounded-full shadow-sm mt-1" />
          </div>

          {/* Cake Ceremony Actions */}
          <div className="flex flex-col gap-2">
            {cakeStep === 0 && (
              <button
                onClick={handleLightCandle}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 fill-white" />
                <span>Light the Golden "1 Year" Candle 🕯️</span>
              </button>
            )}

            {cakeStep === 1 && (
              <button
                onClick={handleMakeWish}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
              >
                <Sparkles className="w-4 h-4 fill-white" />
                <span>Make a Wish for Year 2 🌟</span>
              </button>
            )}

            {cakeStep === 2 && (
              <button
                onClick={handleBlowCandle}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Wind className="w-4 h-4 text-white" />
                <span>Blow Out the Candle Together 💨</span>
              </button>
            )}

            {cakeStep === 3 && (
              <button
                onClick={handleCutCake}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer animate-bounce"
              >
                <Cake className="w-4 h-4 text-white" />
                <span>Slice the Anniversary Cake! (+150 Coins & +10 Gems) 🍰</span>
              </button>
            )}

            {cakeStep === 4 && (
              <div className="bg-pink-50 p-3 rounded-2xl border border-pink-200 text-center flex items-center justify-between">
                <span className="text-xs font-bold text-pink-700">
                  🎉 Wish Made: "{wishMadeText || 'Endless laughter, good times, and amazing memories together'}"
                </span>
                <button
                  onClick={() => {
                    kawaiiAudio.playPop();
                    setCakeStep(0);
                  }}
                  title="Relive Ceremony"
                  className="p-1.5 rounded-full hover:bg-pink-200 text-pink-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* B. Wax-Sealed Anniversary Friendship Letter */}
        <div className="bg-white rounded-3xl p-6 border-3 border-pink-200 shadow-sm flex flex-col justify-between gap-4 relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-pink-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💌</span>
              <div>
                <h3 className="text-lg font-bold font-display text-red-600">
                  1-Year Anniversary Friendship Letter
                </h3>
                <p className="text-xs text-pink-600">Special sealed message for our 365th day together</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditingLetter(!isEditingLetter)}
              className="text-xs font-bold text-pink-600 hover:text-pink-800 flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditingLetter ? 'Done' : 'Personalize Note'}</span>
            </button>
          </div>

          {!isLetterOpen ? (
            /* Closed Vintage Envelope with Wax Seal */
            <div 
              onClick={() => {
                kawaiiAudio.playSuccess();
                setIsLetterOpen(true);
                triggerHeartConfetti();
              }}
              className="my-auto py-8 px-6 bg-gradient-to-br from-pink-100 to-rose-200 rounded-3xl border-2 border-pink-300 shadow-md flex flex-col items-center justify-center gap-3 cursor-pointer hover:scale-102 transition-transform group"
            >
              <div className="w-16 h-16 rounded-full bg-red-600 border-4 border-red-700 shadow-lg flex items-center justify-center text-white text-2xl font-black font-display group-hover:scale-110 transition-transform">
                🎀
              </div>
              <div className="text-center">
                <p className="font-bold text-red-800 text-sm">
                  To {coupleProfile.partner2}, from the bottom of my heart
                </p>
                <p className="text-xs text-pink-600">Click to break the wax seal & read</p>
              </div>
            </div>
          ) : (
            /* Open Friendship Letter View */
            <div className="my-auto bg-[#fffcf9] p-5 rounded-2xl border-2 border-pink-200 shadow-inner flex flex-col gap-3 relative">
              <div className="flex items-center justify-between text-xs text-pink-600 font-semibold border-b border-pink-100 pb-1.5">
                <span>Date: October 15 • 1 Year Together</span>
                <span className="text-amber-500 font-bold">mkch harbaa</span>
              </div>

              {isEditingLetter ? (
                <div className="flex flex-col gap-2">
                  <textarea
                    value={customLetter}
                    onChange={(e) => setCustomLetter(e.target.value)}
                    rows={5}
                    className="w-full p-2.5 border-2 border-pink-300 rounded-xl text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    placeholder="Write your heartfelt 1-year anniversary message here..."
                  />
                  <button
                    onClick={() => {
                      kawaiiAudio.playSuccess();
                      onUpdateCoupleProfile({ ...coupleProfile, customNote: customLetter });
                      setIsEditingLetter(false);
                      triggerHeartConfetti();
                      if (customLetter.trim()) {
                        saveAnniversaryLetter(customLetter.trim(), coupleProfile.partner2);
                      }
                    }}
                    className="self-end px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold cursor-pointer"
                  >
                    Save Note
                  </button>
                </div>
              ) : (
                <div className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium space-y-2 italic">
                  <p className="text-red-600 font-bold not-italic">
                    Dearest {coupleProfile.partner2},
                  </p>
                  <p>
                    "{coupleProfile.customNote || 'n3mbou zinek :D,mkch harba muhehehe 😈'}"
                  </p>
                  <p className="text-right text-pink-600 font-bold not-italic pt-2">
                    From your partner in crime, {coupleProfile.partner1} 🎀
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-pink-100">
                <button
                  onClick={() => setIsLetterOpen(false)}
                  className="text-xs text-gray-500 hover:text-gray-700 underline cursor-pointer"
                >
                  Close Envelope
                </button>
                <button
                  onClick={triggerHeartConfetti}
                  className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Send Cheers 🎉</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. "Our 365-Day Journey" Interactive Story Timeline */}
      {/* 3. Year 2 Together Bucket List & Friendship Bond Lock */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-pink-200 shadow-sm flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pink-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-pink-50 rounded-2xl border border-pink-100 shadow-xs">📋</span>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-red-600">
                Year 2 Together Bucket List
              </h3>
              <p className="text-xs sm:text-sm text-pink-600">
                {completedBucketCount} of {bucketList.length} awesome goals completed! Keep making wonderful memories together.
              </p>
            </div>
          </div>

          {/* Golden Heart Lock Status */}
          <button
            onClick={handleToggleBondLock}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-all ${
              coupleProfile.loveLockLocked 
                ? 'bg-amber-100 border-amber-300 text-amber-900 shadow-xs' 
                : 'bg-gray-100 border-gray-300 text-gray-500'
            }`}
          >
            {coupleProfile.loveLockLocked ? <Lock className="w-4 h-4 text-amber-600" /> : <Unlock className="w-4 h-4" />}
            <span>{coupleProfile.loveLockLocked ? 'Bond Locked 🔐' : 'Unlocked'}</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold text-pink-600">
            <span>Bucket List Progress</span>
            <span>{Math.round((completedBucketCount / Math.max(1, bucketList.length)) * 100)}%</span>
          </div>
          <div className="w-full bg-pink-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(completedBucketCount / Math.max(1, bucketList.length)) * 100}%` }}
            />
          </div>
        </div>

        {/* Checklist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {bucketList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleToggleBucket(item.id)}
              className={`flex items-center gap-3.5 p-3.5 rounded-2xl border-2 transition-all cursor-pointer text-xs sm:text-sm select-none ${
                item.completed 
                  ? 'bg-pink-50/70 border-pink-200 text-gray-400 line-through' 
                  : 'bg-white hover:bg-pink-50/60 border-pink-100 hover:border-pink-300 text-gray-800 shadow-xs hover:shadow-sm'
              }`}
            >
              <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-colors shrink-0 ${
                item.completed ? 'bg-red-500 border-red-500 text-white' : 'border-pink-300 bg-pink-50/50'
              }`}>
                {item.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="flex-1 font-semibold leading-relaxed">{item.title}</span>
            </div>
          ))}
        </div>

        {/* Add Bucket Item Form */}
        <form onSubmit={handleAddBucketItem} className="flex gap-2 pt-3 border-t border-pink-100">
          <input
            type="text"
            value={newBucketTitle}
            onChange={(e) => setNewBucketTitle(e.target.value)}
            placeholder="Add a new goal for Year 2 together..."
            className="flex-1 px-4 py-2 border-2 border-pink-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-red-500 text-white rounded-2xl text-xs sm:text-sm font-bold cursor-pointer hover:bg-red-600 transition-colors shadow-sm"
          >
            Add Goal
          </button>
        </form>
      </div>

      {/* 5. Anniversary Polaroid Scrapbook & Couple Photo Snapper */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-pink-200 shadow-sm flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-pink-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-red-600 flex items-center gap-2">
              <span>📸</span> 1-Year Anniversary Polaroid Memories
            </h2>
            <p className="text-xs sm:text-sm text-pink-600">
              Snap dress-up photos or upload your own real couple picture to display in the album
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-800 font-bold text-xs border border-pink-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              <span>Upload Our Real Photo 🖼️</span>
            </button>

            <button
              onClick={() => onSelectTab('dressup')}
              className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Snap Kitty Outfit 🎀</span>
            </button>
          </div>
        </div>

        {/* Polaroids Gallery Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {userPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white p-3 pt-3 pb-4 rounded-xl border-2 border-pink-200 shadow-md flex flex-col items-center gap-2 rotate-[-1deg] hover:rotate-0 hover:scale-102 transition-all"
            >
              {/* Photo Area */}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-amber-100 border border-pink-100 flex items-center justify-center relative">
                {photo.url ? (
                  <img src={photo.url} alt="Anniversary Moment" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center gap-2">
                    <div className="w-20 h-20">
                      <KittySvg bowId="bow_anniversary_tiara" outfitId="outfit_classic" handheldId="hand_rose_bouquet" />
                    </div>
                    <span className="text-xs font-bold text-red-600 font-display">
                      Happy 1st Anniversary!
                    </span>
                    <span className="text-[10px] text-pink-600">365 Days Together</span>
                  </div>
                )}
                {/* Cute Sticker Corner */}
                <span className="absolute top-2 right-2 text-xl drop-shadow-xs">💖</span>
              </div>

              {/* Handwritten Style Caption */}
              <p className="text-xs font-bold text-gray-800 font-display text-center truncate max-w-full px-1">
                {photo.caption}
              </p>
              <span className="text-[10px] text-gray-400 font-mono -mt-1">
                {photo.date}
              </span>
            </div>
          ))}

          {/* Quick link to official Photo Album */}
          <div
            onClick={() => onSelectTab('characters')}
            className="p-5 rounded-2xl border-2 border-dashed border-pink-300 bg-pink-50/50 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-pink-100 transition-colors"
          >
            <span className="text-3xl">🌸</span>
            <span className="text-xs font-bold text-red-600 font-display">
              Sanrio Friends Congratulating Us
            </span>
            <span className="text-[10px] text-pink-600">
              Read sweet anniversary notes from Kitty, Daniel, Melody & friends!
            </span>
          </div>
        </div>
      </div>

      {/* Make a Wish Modal for Cake Ceremony */}
      {isWishing && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border-3 border-pink-300 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              <div>
                <h3 className="text-base font-bold font-display text-red-600">
                  Make an Anniversary Wish Together
                </h3>
                <p className="text-xs text-pink-600">Close your eyes and make a special wish for Year 2!</p>
              </div>
            </div>

            <input
              type="text"
              value={wishMadeText}
              onChange={(e) => setWishMadeText(e.target.value)}
              placeholder="e.g., Endless laughs, cute roadtrips, and holding your hand forever"
              className="w-full p-3 border-2 border-pink-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setIsWishing(false)}
                className="px-4 py-2 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmWish}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                Confirm Wish 🌟
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Couple Profile Modal */}
      {isEditingProfile && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <form 
            onSubmit={handleSaveProfile}
            className="bg-white rounded-3xl max-w-lg w-full p-6 border-3 border-pink-300 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎀</span>
                <div>
                  <h3 className="text-base font-bold font-display text-red-600">
                    Customize Our Anniversary Details
                  </h3>
                  <p className="text-xs text-pink-600">Personalize names and dates for your website</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Partner 1 Name / Nickname:
                </label>
                <input
                  type="text"
                  value={partner1Name}
                  onChange={(e) => setPartner1Name(e.target.value)}
                  placeholder="e.g. Tafeh"
                  className="w-full p-2.5 border-2 border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Partner 2 Name / Nickname:
                </label>
                <input
                  type="text"
                  value={partner2Name}
                  onChange={(e) => setPartner2Name(e.target.value)}
                  placeholder="e.g. Tafeha"
                  className="w-full p-2.5 border-2 border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Anniversary Date:
              </label>
              <input
                type="date"
                value={annivDate}
                onChange={(e) => setAnnivDate(e.target.value)}
                className="w-full p-2.5 border-2 border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                Anniversary Letter Note:
              </label>
              <textarea
                value={customLetter}
                onChange={(e) => setCustomLetter(e.target.value)}
                rows={4}
                className="w-full p-2.5 border-2 border-pink-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            <div className="flex gap-2 justify-end pt-2 border-t border-pink-100">
              <button
                type="button"
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 rounded-full text-xs font-bold text-gray-500 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                Save Anniversary Details 💖
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
