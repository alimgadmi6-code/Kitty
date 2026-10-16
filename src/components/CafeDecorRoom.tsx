import React, { useState } from 'react';
import { DECOR_ITEMS, FRIENDS_DATA } from '../data/gameData';
import { DecorItem } from '../types';
import { KittySvg } from './KittySvg';
import { FriendSvg } from './FriendSvg';
import { kawaiiAudio, MUSIC_TRACKS } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Disc3, Lock, Check, Sparkles, Music, Volume2 } from 'lucide-react';

interface CafeDecorRoomProps {
  ribbonCoins: number;
  unlockedItems: string[];
  onUnlockItem: (itemId: string, cost: number) => void;
  cafeWallpaper: string;
  cafeFloor: string;
  cafeTable: string;
  cafePlushie: string;
  onChangeWallpaper: (id: string) => void;
  onChangeFloor: (id: string) => void;
  onChangeTable: (id: string) => void;
  onChangePlushie: (id: string) => void;
  activeMusicTrack: string;
  onChangeMusicTrack: (track: string) => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
  activeBow: string;
  activeOutfit: string;
}

export const CafeDecorRoom: React.FC<CafeDecorRoomProps> = ({
  ribbonCoins,
  unlockedItems,
  onUnlockItem,
  cafeWallpaper,
  cafeFloor,
  cafeTable,
  cafePlushie,
  onChangeWallpaper,
  onChangeFloor,
  onChangeTable,
  onChangePlushie,
  activeMusicTrack,
  onChangeMusicTrack,
  musicEnabled,
  onToggleMusic,
  activeBow,
  activeOutfit,
}) => {
  const [decorCategory, setDecorCategory] = useState<'wallpaper' | 'flooring' | 'table' | 'plushie'>('wallpaper');
  const [visitingFriendId, setVisitingFriendId] = useState<string>('melody');

  const wallpaperStyles: Record<string, string> = {
    wall_pink_gingham: 'bg-[radial-gradient(#fecdd3_2px,transparent_2px)] bg-[size:16px_16px] bg-pink-100',
    wall_strawberry: 'bg-gradient-to-b from-rose-200 via-pink-100 to-red-50',
    wall_cloud: 'bg-gradient-to-b from-sky-200 via-sky-100 to-white',
    wall_lavender: 'bg-gradient-to-b from-purple-200 via-pink-100 to-indigo-100',
  };

  const floorStyles: Record<string, string> = {
    floor_wood: 'bg-amber-200 border-t-4 border-amber-300',
    floor_tile: 'bg-stone-200 border-t-4 border-stone-300 [background-image:linear-gradient(45deg,#fafaf9_25%,transparent_25%),linear-gradient(-45deg,#fafaf9_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#fafaf9_75%),linear-gradient(-45deg,transparent_75%,#fafaf9_75%)] [background-size:24px_24px]',
    floor_pink_carpet: 'bg-rose-300 border-t-4 border-rose-400',
  };

  const currentItems = DECOR_ITEMS.filter((item) => item.category === decorCategory);

  const handleSelectDecor = (item: DecorItem) => {
    const isUnlocked = unlockedItems.includes(item.id) || item.cost === 0;

    if (!isUnlocked) {
      if (ribbonCoins >= item.cost) {
        kawaiiAudio.playSuccess();
        onUnlockItem(item.id, item.cost);
        try {
          confetti({ particleCount: 35, spread: 65 });
        } catch {
          // ignore
        }
      } else {
        kawaiiAudio.playHazard();
      }
      return;
    }

    kawaiiAudio.playPop();
    if (item.category === 'wallpaper') onChangeWallpaper(item.id);
    else if (item.category === 'flooring') onChangeFloor(item.id);
    else if (item.category === 'table') onChangeTable(item.id);
    else if (item.category === 'plushie') onChangePlushie(item.id);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-red-600 flex items-center gap-2">
            <span>🛋️</span> Hello Kitty's Cozy Cafe Lounge
          </h2>
          <p className="text-xs sm:text-sm text-pink-700 font-medium">
            Customize the cafe room styling, play kawaii melodies on the Jukebox, and host friends!
          </p>
        </div>

        {/* Change visitor */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-600">Visiting Friend:</span>
          <select
            value={visitingFriendId}
            onChange={(e) => {
              kawaiiAudio.playPop();
              setVisitingFriendId(e.target.value);
            }}
            className="px-3 py-1.5 rounded-2xl bg-pink-50 border border-pink-200 text-xs font-bold text-pink-800 focus:outline-hidden focus:ring-2 focus:ring-red-400 cursor-pointer"
          >
            {FRIENDS_DATA.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Room & Customizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 3D-Style Room Preview (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="w-full h-[400px] sm:h-[440px] rounded-3xl relative overflow-hidden border-4 border-pink-300 shadow-md flex flex-col justify-between">
            {/* Upper Room Wall with chosen wallpaper */}
            <div className={`w-full h-2/3 relative transition-all duration-500 ${wallpaperStyles[cafeWallpaper] || wallpaperStyles.wall_pink_gingham}`}>
              {/* Window with view */}
              <div className="absolute top-6 left-8 w-24 h-28 rounded-t-full bg-sky-200 border-4 border-white shadow-sm overflow-hidden flex flex-col items-center justify-center">
                <span className="text-xs text-sky-600 font-bold mb-1">Sanrio Town</span>
                <span className="text-2xl animate-float">☁️</span>
              </div>

              {/* Jukebox In the Corner */}
              <div
                onClick={() => {
                  kawaiiAudio.playPop();
                  onToggleMusic();
                }}
                className="absolute top-10 right-8 w-16 h-28 rounded-t-3xl bg-gradient-to-b from-purple-500 to-pink-500 border-2 border-white shadow-md flex flex-col items-center justify-between p-1.5 cursor-pointer hover:scale-105 transition-transform"
                title="Click to toggle Jukebox music!"
              >
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                  <Disc3 className={`w-6 h-6 text-white ${musicEnabled ? 'animate-spin' : ''}`} />
                </div>
                <div className="w-full bg-amber-200/80 rounded-sm py-0.5 text-center text-[8px] font-bold text-amber-900">
                  JUKEBOX
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-300" />
                </div>
              </div>

              {/* Plushie On Shelf */}
              <div className="absolute top-28 left-40 bg-amber-100/90 px-3 py-1 rounded-xl border border-amber-300 shadow-xs flex items-center gap-1">
                <span className="text-2xl">
                  {DECOR_ITEMS.find((d) => d.id === cafePlushie)?.icon || '🐱'}
                </span>
                <span className="text-[10px] font-bold text-amber-900">Plushie</span>
              </div>
            </div>

            {/* Lower Room Floor */}
            <div className={`w-full h-1/3 relative transition-all duration-500 flex items-center justify-around px-8 ${floorStyles[cafeFloor] || floorStyles.floor_wood}`}>
              {/* Hello Kitty Standing */}
              <div className="relative -top-16">
                <KittySvg
                  size={145}
                  bowId={activeBow}
                  outfitId={activeOutfit}
                  handheldId="hand_pie"
                  expression="happy"
                />
              </div>

              {/* Cafe Table in the center */}
              <div className="relative -top-6 flex flex-col items-center">
                <div className="w-28 h-10 rounded-full bg-red-400 border-2 border-white shadow-md flex items-center justify-center gap-2 text-sm text-white">
                  <span>🫖</span>
                  <span>🥧</span>
                </div>
                <div className="w-4 h-8 bg-amber-800 rounded-b-sm" />
              </div>

              {/* Visiting Friend */}
              <div className="relative -top-14">
                <FriendSvg friendId={visitingFriendId} size={110} isHappy={true} />
              </div>
            </div>
          </div>

          {/* Jukebox Track Controller */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Music className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">Cafe Jukebox</h3>
                  <p className="text-[11px] text-gray-500">Pick cheerful melodies composed with Web Audio API</p>
                </div>
              </div>

              <button
                onClick={() => {
                  kawaiiAudio.playPop();
                  onToggleMusic();
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  musicEnabled ? 'bg-red-500 text-white shadow-xs' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {musicEnabled ? 'Playing 🎵' : 'Muted 🔇'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {MUSIC_TRACKS.map((t) => {
                const isActive = activeMusicTrack === t.id && musicEnabled;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      kawaiiAudio.playPop();
                      onChangeMusicTrack(t.id);
                    }}
                    className={`flex items-start gap-2.5 p-3 rounded-2xl border-2 transition-all text-left cursor-pointer relative overflow-hidden ${
                      isActive
                        ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-200 text-purple-950 shadow-sm'
                        : 'bg-pink-50/50 border-pink-100 hover:bg-pink-100/70 text-gray-700'
                    }`}
                  >
                    <span className="text-2xl mt-0.5">{t.icon}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-bold truncate">{t.name}</p>
                        {isActive && (
                          <span className="flex gap-0.5 items-end h-3">
                            <span className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <span className="w-1 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <span className="w-1 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-pink-700 font-medium">{t.mood}</p>
                      <p className="text-[9px] text-gray-500 truncate mt-0.5">{t.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Furniture & Decor Catalog (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Category Tabs */}
          <div className="bg-white rounded-3xl p-2 border-2 border-pink-200 shadow-sm flex items-center justify-around">
            {[
              { id: 'wallpaper', label: 'Wallpaper', icon: '🪟' },
              { id: 'flooring', label: 'Flooring', icon: '🪵' },
              { id: 'table', label: 'Table', icon: '🪑' },
              { id: 'plushie', label: 'Plushie', icon: '🧸' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  setDecorCategory(tab.id as typeof decorCategory);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  decorCategory === tab.id
                    ? 'bg-red-500 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Decor Items Grid */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold text-gray-700 tracking-wider">
                Select {decorCategory}
              </span>
              <span className="text-xs text-pink-600 font-semibold">
                Coins: 🎀 {ribbonCoins.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {currentItems.map((item) => {
                const isUnlocked = unlockedItems.includes(item.id) || item.cost === 0;
                const isEquipped =
                  (item.category === 'wallpaper' && cafeWallpaper === item.id) ||
                  (item.category === 'flooring' && cafeFloor === item.id) ||
                  (item.category === 'table' && cafeTable === item.id) ||
                  (item.category === 'plushie' && cafePlushie === item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectDecor(item)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all relative cursor-pointer text-center group ${
                      isEquipped
                        ? 'border-red-500 bg-rose-50/90 ring-2 ring-red-200 scale-102'
                        : isUnlocked
                        ? 'border-pink-100 bg-pink-50/50 hover:bg-pink-100 hover:border-pink-300'
                        : 'border-gray-200 bg-gray-50 opacity-80 hover:opacity-100 hover:border-amber-300'
                    }`}
                  >
                    {isEquipped && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </span>
                    )}

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-1.5 shadow-xs"
                      style={{ backgroundColor: item.previewColor }}
                    >
                      {item.icon}
                    </div>

                    <span className="text-xs font-bold text-gray-800 leading-tight mb-1">
                      {item.name}
                    </span>

                    {!isUnlocked ? (
                      <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 mt-1">
                        <Lock className="w-3 h-3" />
                        <span>🎀 {item.cost}</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-pink-600 font-semibold">
                        {isEquipped ? 'In Room' : 'Owned'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
