import React from 'react';
import { WebsiteTab } from '../types';
import { Volume2, VolumeX, Music, Image as ImageIcon, Sparkles, Heart } from 'lucide-react';
import { kawaiiAudio } from '../audio/kawaiiAudio';

interface WebsiteHeaderProps {
  currentTab: WebsiteTab;
  onSelectTab: (tab: WebsiteTab) => void;
  ribbonCoins: number;
  strawberryGems: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onOpenAlbum: () => void;
  albumCount: number;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  currentTab,
  onSelectTab,
  ribbonCoins,
  strawberryGems,
  soundEnabled,
  musicEnabled,
  onToggleSound,
  onToggleMusic,
  onOpenAlbum,
  albumCount,
}) => {
  const tabs: { id: WebsiteTab; label: string; icon: string; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'games', label: 'Arcade Games', icon: '🎮', badge: 'Play!' },
    { id: 'menu', label: 'Cafe Menu', icon: '🍰' },
    { id: 'characters', label: 'Meet Friends', icon: '🌸' },
    { id: 'dressup', label: 'Dress-Up', icon: '🎀' },
    { id: 'decor', label: 'Lounge & Jukebox', icon: '🛋️' },
    { id: 'village', label: 'Village Map', icon: '🗺️' },
  ];

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b-2 border-pink-200 sticky top-0 z-40 shadow-xs">
      {/* Top Announcement Ribbon Ticker */}
      <div className="w-full bg-gradient-to-r from-red-500 via-pink-500 to-rose-400 text-white text-[11px] sm:text-xs py-1 px-4 font-semibold overflow-hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="animate-bounce">🎀</span>
            <span className="hidden sm:inline">Official Hello Kitty Sweet Cafe & Village Portal</span>
            <span className="sm:hidden">Hello Kitty Official Cafe</span>
            <span className="opacity-75">• Fresh Apple Pies Out of the Oven!</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-pink-100">
              "You can never have too many friends!"
            </span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] font-bold">
              Open Daily
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => {
            kawaiiAudio.playPop();
            onSelectTab('home');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="text-2xl select-none">🎀</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-red-600 font-display tracking-wide">
                HELLO KITTY
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 font-bold border border-pink-200 uppercase">
                Official Website
              </span>
            </div>
            <p className="text-[11px] text-pink-500 -mt-0.5 font-medium">
              Sweet Cafe, Bakery & Village
            </p>
          </div>
        </div>

        {/* Center Tabs Navigation */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  onSelectTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap relative cursor-pointer ${
                  isActive
                    ? 'bg-red-500 text-white shadow-sm scale-102'
                    : 'bg-pink-50 hover:bg-pink-100 text-pink-900 border border-pink-200/70'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950 font-bold ml-0.5 animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Currency & Controls */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          {/* Ribbon Coins */}
          <div 
            title="Ribbon Coins"
            className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-amber-900"
          >
            <span>🎀</span>
            <span className="font-bold">{ribbonCoins.toLocaleString()}</span>
          </div>

          {/* Strawberry Gems */}
          <div 
            title="Strawberry Gems"
            className="flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full border border-red-200 text-red-800"
          >
            <span>🍓</span>
            <span className="font-bold">{strawberryGems}</span>
          </div>

          {/* Album */}
          <button
            onClick={() => {
              kawaiiAudio.playPop();
              onOpenAlbum();
            }}
            title="Open Polaroid Photo Album"
            className="flex items-center gap-1 bg-pink-100 hover:bg-pink-200 px-2.5 py-1 rounded-full border border-pink-300 text-pink-700 transition-colors cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Album</span>
            {albumCount > 0 && (
              <span className="px-1.5 py-0.2 bg-red-500 text-white rounded-full text-[10px]">
                {albumCount}
              </span>
            )}
          </button>

          {/* Audio controls */}
          <div className="flex items-center gap-1 pl-1 border-l border-pink-200">
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onToggleSound();
              }}
              title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
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
              className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                musicEnabled ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-gray-100 text-gray-400'
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
