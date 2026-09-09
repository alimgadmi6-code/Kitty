import React, { useState } from 'react';
import { WebsiteTab, GuestbookEntry } from '../types';
import { FRIENDS_DATA, MENU_ITEMS } from '../data/gameData';
import { KittySvg } from './KittySvg';
import { FriendSvg } from './FriendSvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Heart, Send, Gift, Star, Award, Check } from 'lucide-react';

interface HomePortalProps {
  onSelectTab: (tab: WebsiteTab) => void;
  ribbonCoins: number;
  strawberryGems: number;
  highScoreCatcher: number;
  ordersFulfilled: number;
  guestbook: GuestbookEntry[];
  onAddGuestbookEntry: (entry: GuestbookEntry) => void;
  onClaimDailyReward: (coins: number, apples: number) => void;
  activeBow: string;
  activeOutfit: string;
}

export const HomePortal: React.FC<HomePortalProps> = ({
  onSelectTab,
  ribbonCoins,
  strawberryGems,
  highScoreCatcher,
  ordersFulfilled,
  guestbook,
  onAddGuestbookEntry,
  onClaimDailyReward,
  activeBow,
  activeOutfit,
}) => {
  const [hasClaimedGift, setHasClaimedGift] = useState<boolean>(false);
  const [fanEmail, setFanEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Guestbook Form State
  const [gbAuthor, setGbAuthor] = useState<string>('');
  const [gbMessage, setGbMessage] = useState<string>('');
  const [gbSticker, setGbSticker] = useState<string>('🎀');

  const handleClaimDailyGift = () => {
    if (hasClaimedGift) return;
    setHasClaimedGift(true);
    kawaiiAudio.playSuccess();
    onClaimDailyReward(60, 5);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleFanClubSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanEmail.trim() || isSubscribed) return;
    setIsSubscribed(true);
    kawaiiAudio.playSuccess();
    onClaimDailyReward(50, 0);
    try {
      confetti({ particleCount: 40, spread: 60 });
    } catch {
      // ignore
    }
  };

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbAuthor.trim() || !gbMessage.trim()) return;

    const newEntry: GuestbookEntry = {
      id: `gb_${Date.now()}`,
      author: gbAuthor.trim(),
      message: gbMessage.trim(),
      sticker: gbSticker,
      date: 'Just now',
      friendId: 'kitty',
    };

    kawaiiAudio.playSuccess();
    onAddGuestbookEntry(newEntry);
    setGbAuthor('');
    setGbMessage('');

    try {
      confetti({ particleCount: 35, spread: 60 });
    } catch {
      // ignore
    }
  };

  const featuredMenu = MENU_ITEMS.slice(0, 3);
  const featuredFriend = FRIENDS_DATA[1]; // My Melody

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-8">
      {/* 1. Grand Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-pink-200 shadow-md bg-gradient-to-r from-rose-100 via-pink-50 to-amber-50 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Floating background decorative icons */}
        <div className="absolute top-4 left-6 text-2xl animate-float opacity-70">🌸</div>
        <div className="absolute top-6 right-12 text-2xl animate-sparkle opacity-60">✨</div>
        <div className="absolute bottom-4 left-1/4 text-2xl animate-pulse opacity-50">🎀</div>

        {/* Left Hero Text */}
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold mb-3">
            <span>🎀</span>
            <span>Welcome to the Official Cafe Universe</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-red-600 tracking-tight leading-tight mb-3">
            Hello Kitty's <br className="hidden sm:inline" />
            Sweet Cafe & Bakery
          </h1>

          <p className="text-sm sm:text-base text-pink-900/80 max-w-lg mb-6 font-medium leading-relaxed">
            Step into Sanrio Village! Play arcade mini-games, explore the authentic bakery recipe book, dress up Hello Kitty in kawaii outfits, and customize your cozy tea lounge.
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onSelectTab('games');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>🎮 Play Arcade Games</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onSelectTab('menu');
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-pink-50 text-red-600 font-bold text-sm border-2 border-pink-300 shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>🍰 View Cafe Menu</span>
            </button>
          </div>
        </div>

        {/* Right Hero Graphic */}
        <div className="flex flex-col items-center z-10">
          <div 
            className="relative cursor-pointer" 
            onClick={() => kawaiiAudio.playPurr()}
            title="Click Hello Kitty to say hello!"
          >
            <KittySvg
              size={220}
              bowId={activeBow}
              outfitId={activeOutfit}
              handheldId="hand_pie"
              expression="happy"
              className="hover:scale-105 transition-transform"
            />
          </div>

          {/* Daily Treat Gift Button */}
          <button
            onClick={handleClaimDailyGift}
            disabled={hasClaimedGift}
            className={`mt-3 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              hasClaimedGift
                ? 'bg-gray-100 text-gray-400 border border-gray-200'
                : 'bg-white hover:bg-pink-50 text-red-600 border-2 border-red-300 animate-bounce'
            }`}
          >
            <Gift className={`w-4 h-4 ${hasClaimedGift ? 'text-gray-400' : 'text-red-500'}`} />
            <span>{hasClaimedGift ? 'Daily Sweet Pie Claimed ✓' : 'Daily Treat Box! (+60 🎀)'}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Game Attractions Grid */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-800 flex items-center gap-2">
              <span>🎪</span> Interactive Village Attractions
            </h2>
            <p className="text-xs text-gray-600">Choose an attraction to play, bake, style, or decorate!</p>
          </div>

          <button
            onClick={() => {
              kawaiiAudio.playPop();
              onSelectTab('games');
            }}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            <span>All Games</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Attraction 1 */}
          <div
            onClick={() => {
              kawaiiAudio.playPop();
              onSelectTab('games');
            }}
            className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-red-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🍎
              </div>
              <h3 className="font-bold text-base text-gray-800 font-display">Apple Orchard Catcher</h3>
              <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                Catch falling honey apples, trigger Rainbow Fever mode, and set new high scores!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-red-500">
              <span>Best: {highScoreCatcher} pts</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Attraction 2 */}
          <div
            onClick={() => {
              kawaiiAudio.playPop();
              onSelectTab('games');
            }}
            className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🥧
              </div>
              <h3 className="font-bold text-base text-gray-800 font-display">Sweet Pastry Kitchen</h3>
              <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                Assemble artisan recipes for Sanrio friends before the customer timer ticks down!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>Served: {ordersFulfilled} orders</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Attraction 3 */}
          <div
            onClick={() => {
              kawaiiAudio.playPop();
              onSelectTab('dressup');
            }}
            className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-pink-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🎀
              </div>
              <h3 className="font-bold text-base text-gray-800 font-display">Dress-Up & Photo Booth</h3>
              <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                Mix and match iconic bows, chef aprons, and snap lovely polaroid keepsakes!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-pink-600">
              <span>Wardrobe & Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Attraction 4 */}
          <div
            onClick={() => {
              kawaiiAudio.playPop();
              onSelectTab('decor');
            }}
            className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-purple-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
                🛋️
              </div>
              <h3 className="font-bold text-base text-gray-800 font-display">Lounge & Jukebox</h3>
              <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
                Design cafe interiors and play melodic chiptune tracks on the Jukebox!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>Cozy Lounge</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Today's Bakery Specials & Featured Character */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Bakery Menu Preview (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-display text-gray-800 flex items-center gap-1.5">
                <span>🥧</span> Today's Fresh Bakery Specials
              </h3>
              <p className="text-xs text-gray-500">Freshly baked in the cottage oven every morning</p>
            </div>
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onSelectTab('menu');
              }}
              className="text-xs font-bold text-pink-600 hover:text-pink-700 cursor-pointer"
            >
              Full Menu →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {featuredMenu.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  onSelectTab('menu');
                }}
                className="bg-pink-50/50 hover:bg-pink-50 rounded-2xl p-3 border border-pink-100 flex flex-col justify-between cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-3xl block mb-1.5">{item.icon}</span>
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{item.name}</h4>
                  <p className="text-[10px] text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-pink-100 flex items-center justify-between text-[11px] font-bold text-amber-700">
                  <span>🎀 {item.priceCoins}</span>
                  <span className="text-[9px] text-red-500 font-semibold">{item.favoriteOf}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Featured Sanrio Friend (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] uppercase font-bold text-pink-700 tracking-wider bg-white/70 px-2.5 py-0.5 rounded-full border border-pink-200">
                ⭐ Friend of the Week
              </span>
              <span className="text-xs font-bold text-red-600">Mariland</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-xs">
                <FriendSvg friendId={featuredFriend.id} size={64} isHappy={true} />
              </div>
              <div>
                <h4 className="text-lg font-bold font-display text-gray-800">{featuredFriend.name}</h4>
                <p className="text-xs text-pink-600 font-medium">{featuredFriend.title}</p>
                <p className="text-[11px] text-gray-600 mt-1 italic">
                  "{featuredFriend.dialogueGreeting}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-pink-200/80 text-xs">
            <span className="text-gray-700">
              Loves: <strong>{featuredFriend.favoriteTreat}</strong>
            </span>
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onSelectTab('characters');
              }}
              className="text-xs font-bold text-red-600 hover:text-red-700 cursor-pointer"
            >
              Learn More →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Fan Guestbook & Sticker Wall */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-sm flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-gray-800 flex items-center gap-2">
              <span>💌</span> Hello Kitty's Sweet Fan Guestbook
            </h2>
            <p className="text-xs text-gray-600">
              Leave a sweet note for Hello Kitty and pick your favorite Sanrio stamp!
            </p>
          </div>
          <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            {guestbook.length} Warm Messages
          </span>
        </div>

        {/* Existing Guestbook Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guestbook.slice(0, 3).map((entry) => (
            <div
              key={entry.id}
              className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col justify-between gap-2 relative shadow-2xs"
            >
              <span className="absolute top-2 right-2 text-xl">{entry.sticker}</span>
              <p className="text-xs text-gray-700 leading-relaxed pr-6 italic">
                "{entry.message}"
              </p>
              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-pink-100/80">
                <span className="font-bold text-pink-800">{entry.author}</span>
                <span className="text-gray-400">{entry.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Note Form */}
        <form
          onSubmit={handleGuestbookSubmit}
          className="bg-pink-50/40 rounded-2xl p-4 border border-pink-200 flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Your Name / Nickname"
              value={gbAuthor}
              onChange={(e) => setGbAuthor(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white border border-pink-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-400 w-full sm:w-44"
              maxLength={25}
            />

            {/* Sticker picker */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-pink-200">
              {['🎀', '💖', '⭐', '🍎', '🌸'].map((stk) => (
                <button
                  key={stk}
                  type="button"
                  onClick={() => {
                    kawaiiAudio.playPop();
                    setGbSticker(stk);
                  }}
                  className={`w-6 h-6 rounded-lg text-sm flex items-center justify-center transition-all cursor-pointer ${
                    gbSticker === stk ? 'bg-pink-200 scale-110' : 'hover:bg-pink-50'
                  }`}
                >
                  {stk}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            placeholder="Write a sweet message to Hello Kitty..."
            value={gbMessage}
            onChange={(e) => setGbMessage(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-pink-200 text-xs text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-red-400 flex-1 w-full"
            maxLength={120}
          />

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Note</span>
          </button>
        </form>
      </section>

      {/* 5. Fan Club Newsletter Callout */}
      <div className="bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-white/20 text-white px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
            Sweet Fan Club
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-display mt-1">
            Join Hello Kitty's Sweet Friends Club
          </h3>
          <p className="text-xs sm:text-sm text-pink-100 max-w-md mt-0.5">
            Subscribe for seasonal recipes, secret baking tips from mama, and receive +50 🎀 Ribbon Coins immediately!
          </p>
        </div>

        <form onSubmit={handleFanClubSubmit} className="flex items-center gap-2 w-full md:w-auto">
          {isSubscribed ? (
            <div className="bg-white text-emerald-700 px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
              <Check className="w-4 h-4" />
              <span>Welcome to the Fan Club! (+50 Coins Added)</span>
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email..."
                value={fanEmail}
                onChange={(e) => setFanEmail(e.target.value)}
                required
                className="px-4 py-2.5 rounded-full bg-white/95 text-gray-800 text-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-2 focus:ring-amber-300 w-full md:w-60"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap transition-transform active:scale-95"
              >
                Join (+50 🎀)
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
