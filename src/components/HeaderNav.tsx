import React from 'react';
import { GameMode } from '../types';
import { Volume2, VolumeX, Music, Disc3, Sparkles, Image as ImageIcon, Heart } from 'lucide-react';
import { kawaiiAudio } from '../audio/kawaiiAudio';

interface HeaderNavProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  ribbonCoins: number;
  strawberryGems: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onOpenAlbum: () => void;
  albumCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentMode,
  onSelectMode,
  ribbonCoins,
  strawberryGems,
  soundEnabled,
  musicEnabled,
  onToggleSound,
  onToggleMusic,
  onOpenAlbum,
  albumCount,
}) => {
  const modes: { id: GameMode; label: string; icon: string; color: string }[] = [
    { id: 'hub', label: 'Cafe Hub', icon: '🏡', color: 'bg-rose-500' },
    { id: 'catcher', label: 'Apple Catcher', icon: '🍎', color: 'bg-red-500' },
    { id: 'bakery', label: 'Pastry Rush', icon: '🥧', color: 'bg-amber-500' },
    { id: 'dressup', label: 'Dress-Up', icon: '🎀', color: 'bg-pink-500' },
    { id: 'decor', label: 'Room Decor', icon: '🛋️', color: 'bg-purple-500' },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-pink-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        {/* Left: Brand Logo & Title */}
        <div 
          onClick={() => {
            kawaiiAudio.playPop();
            onSelectMode('hub');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-xl select-none">🎀</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-red-600 font-display tracking-wide">
                HELLO KITTY
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-semibold border border-pink-200">
                Sweet Cafe
              </span>
            </div>
            <p className="text-[11px] text-pink-400 -mt-0.5 font-medium hidden sm:block">
              Bakery & Friends Adventure
            </p>
          </div>
        </div>

        {/* Center: Mode Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
          {modes.map((m) => {
            const isActive = currentMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  onSelectMode(m.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-500 text-white shadow-sm scale-105'
                    : 'bg-pink-50 hover:bg-pink-100 text-pink-800 hover:text-pink-900 border border-pink-200/60'
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Currency Balances & Audio Controls */}
        <div className="flex items-center gap-2.5 text-xs font-semibold">
          {/* Ribbon Coins */}
          <div 
            title="Ribbon Coins earned from orders & apple catching"
            className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-amber-900"
          >
            <span className="text-sm">🎀</span>
            <span className="font-bold">{ribbonCoins.toLocaleString()}</span>
          </div>

          {/* Strawberry Gems */}
          <div 
            title="Strawberry Gems"
            className="flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-full border border-red-200 text-red-800"
          >
            <span className="text-sm">🍓</span>
            <span className="font-bold">{strawberryGems}</span>
          </div>

          {/* Photo Album Button */}
          <button
            onClick={() => {
              kawaiiAudio.playPop();
              onOpenAlbum();
            }}
            title="Open Polaroid Photo Album"
            className="flex items-center gap-1 bg-pink-100 hover:bg-pink-200 px-2.5 py-1 rounded-full border border-pink-300 text-pink-700 transition-colors relative"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Album</span>
            {albumCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px]">
                {albumCount}
              </span>
            )}
          </button>

          {/* Sound & Music Controls */}
          <div className="flex items-center gap-1 pl-1 border-l border-pink-200">
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onToggleSound();
              }}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className={`p-1.5 rounded-full transition-colors ${
                soundEnabled ? 'bg-pink-100 text-pink-700 hover:bg-pink-200' : 'bg-gray-100 text-gray-400'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onToggleMusic();
              }}
              title={musicEnabled ? 'Pause BGM' : 'Play Kawaii BGM'}
              className={`p-1.5 rounded-full transition-colors ${
                musicEnabled ? 'bg-purple-100 text-purple-700 hover:bg-purple-200 animate-spin-slow' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Music className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
