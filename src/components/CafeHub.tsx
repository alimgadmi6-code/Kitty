import React, { useState } from 'react';
import { GameMode } from '../types';
import { FRIENDS_DATA } from '../data/gameData';
import { KittySvg } from './KittySvg';
import { FriendSvg } from './FriendSvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Gift, ArrowRight, Heart, Star } from 'lucide-react';

interface CafeHubProps {
  onSelectMode: (mode: GameMode) => void;
  ribbonCoins: number;
  strawberryGems: number;
  applesHarvested: number;
  ordersFulfilled: number;
  highScoreCatcher: number;
  onClaimDailyReward: (coins: number, apples: number) => void;
  activeBow: string;
  activeOutfit: string;
}

export const CafeHub: React.FC<CafeHubProps> = ({
  onSelectMode,
  ribbonCoins,
  strawberryGems,
  applesHarvested,
  ordersFulfilled,
  highScoreCatcher,
  onClaimDailyReward,
  activeBow,
  activeOutfit,
}) => {
  const [hasClaimedBonus, setHasClaimedBonus] = useState<boolean>(false);
  const [selectedFriendPreview, setSelectedFriendPreview] = useState<string>('kitty');

  const handleClaimBonus = () => {
    if (hasClaimedBonus) return;
    setHasClaimedBonus(true);
    kawaiiAudio.playSuccess();
    onClaimDailyReward(60, 5);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  const friend = FRIENDS_DATA.find((f) => f.id === selectedFriendPreview) || FRIENDS_DATA[0];

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl overflow-hidden border-4 border-pink-200 shadow-md bg-gradient-to-r from-rose-100 via-pink-50 to-amber-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Floating background decorative icons */}
        <div className="absolute top-3 left-4 text-2xl animate-float opacity-70">🌸</div>
        <div className="absolute top-4 right-10 text-2xl animate-sparkle opacity-60">✨</div>
        <div className="absolute bottom-3 left-1/3 text-2xl animate-pulse opacity-50">🎀</div>

        {/* Left: Text & CTA */}
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-red-700 text-xs font-bold mb-3">
            <span>🍎</span>
            <span>Welcome to Hello Kitty's Sweet Village!</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-red-600 tracking-tight leading-tight mb-2">
            Hello Kitty's <br className="hidden sm:inline" />
            Sweet Cafe & Bakery
          </h1>

          <p className="text-sm sm:text-base text-pink-900/80 max-w-md mb-5 font-medium leading-relaxed">
            Harvest crisp apples in the orchard, bake scrumptious pies for My Melody & Cinnamoroll, and style Hello Kitty in cute outfits!
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onSelectMode('catcher');
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>🍎 Play Apple Catcher</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onSelectMode('bakery');
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>🥧 Bake Pastries</span>
            </button>
          </div>
        </div>

        {/* Right: Hello Kitty Animated Character with Daily Gift */}
        <div className="flex flex-col items-center z-10">
          <div className="relative cursor-pointer" onClick={() => kawaiiAudio.playPurr()}>
            <KittySvg
              size={210}
              bowId={activeBow}
              outfitId={activeOutfit}
              handheldId="hand_pie"
              expression="happy"
              className="hover:scale-105 transition-transform"
            />
          </div>

          {/* Daily Treat Gift Box */}
          <button
            onClick={handleClaimBonus}
            disabled={hasClaimedBonus}
            className={`mt-2 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              hasClaimedBonus
                ? 'bg-gray-100 text-gray-400 border border-gray-200'
                : 'bg-white hover:bg-pink-50 text-red-600 border-2 border-red-300 animate-bounce'
            }`}
          >
            <Gift className={`w-4 h-4 ${hasClaimedBonus ? 'text-gray-400' : 'text-red-500'}`} />
            <span>{hasClaimedBonus ? 'Daily Treat Claimed ✓' : 'Daily Apple Pie Gift! (+60 🎀)'}</span>
          </button>
        </div>
      </div>

      {/* Activity Grid (4 Game Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Apple Catcher */}
        <div
          onClick={() => {
            kawaiiAudio.playPop();
            onSelectMode('catcher');
          }}
          className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-red-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🍎
            </div>
            <h3 className="font-bold text-base text-gray-800 font-display">Apple Catcher</h3>
            <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
              Dodge rain clouds and catch juicy red apples, golden stars, and ribbons!
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-red-500">
            <span>Best: {highScoreCatcher} pts</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Bakery Order Rush */}
        <div
          onClick={() => {
            kawaiiAudio.playPop();
            onSelectMode('bakery');
          }}
          className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🥧
            </div>
            <h3 className="font-bold text-base text-gray-800 font-display">Pastry Kitchen</h3>
            <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
              Assemble cakes, pies, and boba orders to satisfy Sanrio friends!
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-amber-600">
            <span>Served: {ordersFulfilled} orders</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Dress-Up Studio */}
        <div
          onClick={() => {
            kawaiiAudio.playPop();
            onSelectMode('dressup');
          }}
          className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-pink-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🎀
            </div>
            <h3 className="font-bold text-base text-gray-800 font-display">Dress-Up & Photo</h3>
            <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
              Mix and match bows, aprons, dresses, and snap polaroid keepsakes!
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-pink-600">
            <span>Wardrobe & Album</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Cafe Decor & Jukebox */}
        <div
          onClick={() => {
            kawaiiAudio.playPop();
            onSelectMode('decor');
          }}
          className="bg-white rounded-3xl p-5 border-2 border-pink-200 hover:border-purple-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-3 group-hover:scale-110 transition-transform">
              🛋️
            </div>
            <h3 className="font-bold text-base text-gray-800 font-display">Decor & Jukebox</h3>
            <p className="text-xs text-gray-600 mt-1 font-medium leading-relaxed">
              Re-decorate cafe wallpaper, flooring, and listen to sweet chiptune music!
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-bold text-purple-600">
            <span>Cozy Lounge</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Friends Clubhouse Bar */}
      <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-display text-gray-800 flex items-center gap-1.5">
              <span>🌸</span> Sanrio Friends Circle
            </h3>
            <p className="text-xs text-gray-500">Tap a friend to hear their sweet greeting quote!</p>
          </div>
          <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            {FRIENDS_DATA.length} Friendly Visitors
          </span>
        </div>

        {/* Friends Avatars Carousel */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {FRIENDS_DATA.map((f) => {
            const isSelected = selectedFriendPreview === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  setSelectedFriendPreview(f.id);
                }}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'border-red-400 bg-rose-50/80 shadow-xs scale-105 ring-2 ring-red-200'
                    : 'border-pink-100 bg-pink-50/40 hover:bg-pink-50'
                }`}
              >
                <div className="w-14 h-14 flex items-center justify-center">
                  <FriendSvg friendId={f.id} size={54} isHappy={isSelected} />
                </div>
                <span className="text-xs font-bold text-gray-800 mt-1 truncate max-w-full">
                  {f.name}
                </span>
                <span className="text-[10px] text-pink-500 font-semibold truncate max-w-full">
                  {f.favoriteTreat.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Friend Speech Box */}
        {friend && (
          <div className="bg-pink-50/70 rounded-2xl p-4 border border-pink-200 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 text-red-500 fill-red-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-pink-800">
                {friend.name} <span className="font-normal text-gray-500">— {friend.title}</span>
              </p>
              <p className="text-xs text-gray-700 italic mt-0.5">
                "{friend.dialogueGreeting}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
