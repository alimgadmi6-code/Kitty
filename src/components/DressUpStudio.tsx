import React, { useState, useRef } from 'react';
import { WARDROBE_ITEMS } from '../data/gameData';
import { WardrobeItem, PolaroidPhoto } from '../types';
import { KittySvg } from './KittySvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Camera, Sparkles, Check, Lock, Download, Heart, Smile } from 'lucide-react';

interface DressUpStudioProps {
  ribbonCoins: number;
  unlockedItems: string[];
  onUnlockItem: (itemId: string, cost: number) => void;
  activeBow: string;
  activeOutfit: string;
  activeHandheld: string;
  activeBackground: string;
  onChangeBow: (id: string) => void;
  onChangeOutfit: (id: string) => void;
  onChangeHandheld: (id: string) => void;
  onChangeBackground: (id: string) => void;
  onSavePhoto: (photo: PolaroidPhoto) => void;
}

export const DressUpStudio: React.FC<DressUpStudioProps> = ({
  ribbonCoins,
  unlockedItems,
  onUnlockItem,
  activeBow,
  activeOutfit,
  activeHandheld,
  activeBackground,
  onChangeBow,
  onChangeOutfit,
  onChangeHandheld,
  onChangeBackground,
  onSavePhoto,
}) => {
  const [activeCategory, setActiveCategory] = useState<'bow' | 'outfit' | 'handheld' | 'background'>('bow');
  const [expression, setExpression] = useState<'normal' | 'happy' | 'wink'>('happy');
  const [photoCaption, setPhotoCaption] = useState<string>('Hello Kitty Sweet Style 🎀');
  const [selectedSticker, setSelectedSticker] = useState<string>('💖');
  const [flashEffect, setFlashEffect] = useState<boolean>(false);
  const [lastSnappedPhoto, setLastSnappedPhoto] = useState<PolaroidPhoto | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);

  // Background gradient map
  const bgStyles: Record<string, string> = {
    bg_bakery: 'bg-gradient-to-b from-amber-100 via-rose-50 to-pink-100',
    bg_garden: 'bg-gradient-to-b from-emerald-100 via-pink-100 to-rose-100',
    bg_tokyo: 'bg-gradient-to-b from-indigo-200 via-purple-100 to-pink-200',
    bg_starry: 'bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-700',
    bg_bedroom: 'bg-gradient-to-b from-pink-200 via-rose-100 to-pink-50',
  };

  const currentItems = WARDROBE_ITEMS.filter((item) => item.category === activeCategory);

  const handleSelectItem = (item: WardrobeItem) => {
    const isUnlocked = unlockedItems.includes(item.id) || item.cost === 0;

    if (!isUnlocked) {
      // Try to purchase
      if (ribbonCoins >= item.cost) {
        kawaiiAudio.playSuccess();
        onUnlockItem(item.id, item.cost);
        try {
          confetti({ particleCount: 30, spread: 60 });
        } catch {
          // ignore
        }
      } else {
        kawaiiAudio.playHazard();
      }
      return;
    }

    kawaiiAudio.playPop();
    if (item.category === 'bow') onChangeBow(item.id);
    else if (item.category === 'outfit') onChangeOutfit(item.id);
    else if (item.category === 'handheld') onChangeHandheld(item.id);
    else if (item.category === 'background') onChangeBackground(item.id);
  };

  // Snap photo handler
  const handleSnapPhoto = () => {
    kawaiiAudio.playCamera();
    setFlashEffect(true);

    setTimeout(() => {
      setFlashEffect(false);
    }, 250);

    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    const newPhoto: PolaroidPhoto = {
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      caption: photoCaption,
      outfit: {
        bowId: activeBow,
        outfitId: activeOutfit,
        handheldId: activeHandheld,
        bgId: activeBackground,
      },
      sticker: selectedSticker,
    };

    setLastSnappedPhoto(newPhoto);
    onSavePhoto(newPhoto);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-red-600 flex items-center gap-2">
            <span>🎀</span> Hello Kitty's Wardrobe & Photo Studio
          </h2>
          <p className="text-xs sm:text-sm text-pink-700 font-medium">
            Mix & match adorable bows, dresses, and cute props, then snap polaroid keepsakes!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Expression toggle buttons */}
          <div className="flex items-center gap-1 bg-pink-50 p-1 rounded-2xl border border-pink-200">
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setExpression('happy');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                expression === 'happy' ? 'bg-red-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              Smile 😊
            </button>
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setExpression('wink');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                expression === 'wink' ? 'bg-red-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              Wink 😉
            </button>
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setExpression('normal');
              }}
              className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                expression === 'normal' ? 'bg-red-500 text-white shadow-xs' : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              Classic 🐱
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Stage & Live Preview (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center gap-4">
          <div
            ref={stageRef}
            className={`w-full h-[400px] sm:h-[440px] rounded-3xl relative overflow-hidden border-4 border-pink-300 shadow-md flex flex-col items-center justify-end pb-4 transition-colors duration-500 ${
              bgStyles[activeBackground] || bgStyles.bg_bakery
            }`}
          >
            {/* Camera Flash overlay */}
            {flashEffect && (
              <div className="absolute inset-0 bg-white z-50 animate-fade-out pointer-events-none" />
            )}

            {/* Background Decorative elements */}
            <div className="absolute top-4 left-6 text-2xl opacity-70">✨</div>
            <div className="absolute top-8 right-8 text-3xl opacity-70">🌸</div>
            <div className="absolute top-1/3 left-10 text-xl opacity-60">🎀</div>
            <div className="absolute top-1/4 right-12 text-2xl opacity-60">🍓</div>

            {/* Sticker badge placed on stage */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/85 backdrop-blur-xs border border-pink-200 text-xs font-bold text-pink-700 shadow-xs flex items-center gap-1">
              <span>{selectedSticker}</span>
              <span>{photoCaption}</span>
            </div>

            {/* Hello Kitty SVG Render */}
            <div className="relative z-10 transition-transform duration-300 hover:scale-105">
              <KittySvg
                size={260}
                bowId={activeBow}
                outfitId={activeOutfit}
                handheldId={activeHandheld}
                expression={expression}
                isExcited={flashEffect}
              />
            </div>
          </div>

          {/* Photo Snap Controls */}
          <div className="w-full bg-white rounded-3xl p-4 border-2 border-pink-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={photoCaption}
                onChange={(e) => setPhotoCaption(e.target.value)}
                maxLength={36}
                placeholder="Caption your polaroid..."
                className="flex-1 px-3.5 py-2 rounded-2xl bg-pink-50 border border-pink-200 text-xs sm:text-sm text-pink-900 focus:outline-hidden focus:ring-2 focus:ring-red-400 font-medium"
              />

              {/* Sticker picker */}
              <div className="flex items-center gap-1">
                {['💖', '🎀', '⭐', '🍓', '🧁'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      kawaiiAudio.playPop();
                      setSelectedSticker(st);
                    }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-transform cursor-pointer ${
                      selectedSticker === st ? 'bg-pink-200 scale-110' : 'hover:bg-pink-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSnapPhoto}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-5 h-5" />
              <span>Snap Polaroid Photo & Save to Album!</span>
            </button>
          </div>
        </div>

        {/* Right Column: Wardrobe Closet & Category Tabs (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Category Tabs */}
          <div className="bg-white rounded-3xl p-2 border-2 border-pink-200 shadow-sm flex items-center justify-around">
            {[
              { id: 'bow', label: 'Bows & Hats', icon: '🎀' },
              { id: 'outfit', label: 'Outfits', icon: '👗' },
              { id: 'handheld', label: 'Accessories', icon: '🍎' },
              { id: 'background', label: 'Scenes', icon: '🌄' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  setActiveCategory(cat.id as typeof activeCategory);
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-red-500 text-white shadow-xs'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-pink-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Wardrobe Items Grid */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase font-bold text-gray-700 tracking-wider">
                Select {activeCategory}
              </span>
              <span className="text-xs text-pink-600 font-semibold">
                Ribbons: 🎀 {ribbonCoins.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {currentItems.map((item) => {
                const isUnlocked = unlockedItems.includes(item.id) || item.cost === 0;
                const isEquipped =
                  (item.category === 'bow' && activeBow === item.id) ||
                  (item.category === 'outfit' && activeOutfit === item.id) ||
                  (item.category === 'handheld' && activeHandheld === item.id) ||
                  (item.category === 'background' && activeBackground === item.id);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
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

                    <span className="text-3xl mb-1.5 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>

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
                        {isEquipped ? 'Equipped' : 'Unlocked'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Last Snapped Photo Preview Card */}
          {lastSnappedPhoto && (
            <div className="bg-white rounded-3xl p-4 border-2 border-pink-200 shadow-sm flex items-center justify-between gap-4 animate-scale-in">
              <div className="flex items-center gap-3">
                <div className="w-14 h-16 bg-pink-100 rounded-xl border border-pink-200 flex items-center justify-center relative shadow-inner">
                  <KittySvg size={48} bowId={lastSnappedPhoto.outfit.bowId} outfitId={lastSnappedPhoto.outfit.outfitId} />
                  <span className="absolute -top-1 -right-1 text-xs">{lastSnappedPhoto.sticker}</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800">{lastSnappedPhoto.caption}</p>
                  <p className="text-[11px] text-gray-500">Saved to in-game album • {lastSnappedPhoto.date}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                ✓ Saved!
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
