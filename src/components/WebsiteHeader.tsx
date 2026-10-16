import React, { useState } from 'react';
import { WebsiteTab, CoupleProfile } from '../types';
import { Volume2, VolumeX, Music, Image as ImageIcon, Sparkles, Heart, SkipForward, SkipBack, Play, Pause, ChevronDown, Radio } from 'lucide-react';
import { kawaiiAudio, MUSIC_TRACKS, MusicTrackInfo } from '../audio/kawaiiAudio';

interface WebsiteHeaderProps {
  currentTab: WebsiteTab;
  onSelectTab: (tab: WebsiteTab) => void;
  ribbonCoins: number;
  strawberryGems: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  activeMusicTrack: string;
  coupleProfile?: CoupleProfile;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onChangeMusicTrack: (track: string) => void;
  onNextMusicTrack: () => void;
  onPrevMusicTrack: () => void;
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
  activeMusicTrack,
  coupleProfile,
  onToggleSound,
  onToggleMusic,
  onChangeMusicTrack,
  onNextMusicTrack,
  onPrevMusicTrack,
  onOpenAlbum,
  albumCount,
}) => {
  const [isMusicMenuOpen, setIsMusicMenuOpen] = useState(false);
  const [currentVolume, setCurrentVolume] = useState<number>(kawaiiAudio.getMusicVolume());

  const currentTrackInfo = MUSIC_TRACKS.find((t) => t.id === activeMusicTrack) || MUSIC_TRACKS[0];

  const handleSetVolume = (vol: number) => {
    kawaiiAudio.playPop();
    kawaiiAudio.setMusicVolume(vol);
    setCurrentVolume(vol);
  };

  const tabs: { id: WebsiteTab; label: string; icon: string; badge?: string }[] = [
    { id: 'anniversary', label: '1st Anniversary', icon: '💖', badge: '1 Year!' },
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
            <span className="font-bold">Happy 1st Anniversary! 🌟 365 Days Together (October 15)</span>
            <span className="hidden sm:inline opacity-90">• {coupleProfile ? `${coupleProfile.partner1} & ${coupleProfile.partner2}` : 'Tafeh & Tafeha'}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Track preview in top ticker */}
            <button
              onClick={() => setIsMusicMenuOpen(!isMusicMenuOpen)}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-2 py-0.5 rounded-full text-[10px] font-bold text-white transition-colors cursor-pointer"
              title="Click to Change Music"
            >
              <span>🎵</span>
              <span className="max-w-[130px] truncate">{currentTrackInfo.name}</span>
              <span className="text-[9px] underline">Change Music</span>
            </button>

            <span className="hidden md:inline text-pink-100">
              "You can never have too many friends!"
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
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold shadow-xs">
                1 Year Anniversary 💕
              </span>
            </div>
            <p className="text-[11px] text-pink-600 -mt-0.5 font-medium">
              Sweet Cafe • 365 Days of Us
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

          {/* Sound & Music Controls with interactive Music Box menu */}
          <div className="relative flex items-center gap-1 pl-1 border-l border-pink-200">
            {/* SFX toggle */}
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

            {/* Quick Skip Track Button */}
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                onNextMusicTrack();
              }}
              title="Next Music Track (Change Song)"
              className="p-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 transition-colors cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Music Player Hub Button */}
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setIsMusicMenuOpen(!isMusicMenuOpen);
              }}
              title="Open Music Player & Change Track"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all cursor-pointer font-bold ${
                musicEnabled 
                  ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-300 shadow-xs' 
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'animate-bounce text-purple-600' : ''}`} />
              <span className="hidden sm:inline text-[11px] max-w-[80px] truncate">
                {currentTrackInfo.icon} {currentTrackInfo.name}
              </span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isMusicMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Floating Kawaii Music Player Popover */}
            {isMusicMenuOpen && (
              <div 
                className="absolute top-10 right-0 w-80 sm:w-92 bg-white rounded-3xl shadow-2xl border-2 border-pink-300 p-4 z-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-150 text-pink-950"
                style={{ filter: 'drop-shadow(0 10px 25px rgba(255, 77, 109, 0.15))' }}
              >
                {/* Popover Header */}
                <div className="flex items-center justify-between pb-2 border-b border-pink-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎵</span>
                    <div>
                      <h4 className="text-xs font-bold text-red-600 uppercase tracking-wide">
                        Sweet Music Box
                      </h4>
                      <p className="text-[10px] text-pink-600">Sanrio Procedural Soundscapes</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsMusicMenuOpen(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm font-bold w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Now Playing Mini Player Card */}
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 rounded-2xl p-3 border border-pink-200 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-white border border-pink-200 flex items-center justify-center text-2xl shadow-xs">
                        {currentTrackInfo.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-red-100 text-red-700 font-bold">
                            {musicEnabled ? 'NOW PLAYING' : 'PAUSED'}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">{currentTrackInfo.tempo}</span>
                        </div>
                        <p className="text-xs font-bold text-gray-900 truncate mt-0.5">
                          {currentTrackInfo.name}
                        </p>
                        <p className="text-[10px] text-pink-700 truncate">{currentTrackInfo.mood}</p>
                      </div>
                    </div>
                  </div>

                  {/* Player Transport Controls */}
                  <div className="flex items-center justify-center gap-3 pt-1 border-t border-pink-200/60">
                    <button
                      onClick={() => {
                        kawaiiAudio.playPop();
                        onPrevMusicTrack();
                      }}
                      title="Previous Song"
                      className="p-2 rounded-full bg-white hover:bg-pink-100 text-pink-700 border border-pink-200 shadow-xs transition-transform hover:scale-105 cursor-pointer"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        kawaiiAudio.playPop();
                        onToggleMusic();
                      }}
                      title={musicEnabled ? 'Pause' : 'Play'}
                      className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold flex items-center gap-1.5 shadow-sm hover:scale-105 transition-transform cursor-pointer text-xs"
                    >
                      {musicEnabled ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Play</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        kawaiiAudio.playPop();
                        onNextMusicTrack();
                      }}
                      title="Next Song (Change Track)"
                      className="p-2 rounded-full bg-white hover:bg-pink-100 text-pink-700 border border-pink-200 shadow-xs transition-transform hover:scale-105 cursor-pointer"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Volume Level Preset Selector */}
                  <div className="flex items-center justify-between pt-1 text-[10px] text-pink-800">
                    <span className="font-bold flex items-center gap-1">
                      <Volume2 className="w-3 h-3 text-pink-500" /> Volume:
                    </span>
                    <div className="flex items-center gap-1">
                      {[
                        { label: 'Soft', val: 0.3 },
                        { label: 'Cozy', val: 0.6 },
                        { label: 'Full', val: 1.0 },
                      ].map((vol) => (
                        <button
                          key={vol.label}
                          onClick={() => handleSetVolume(vol.val)}
                          className={`px-2 py-0.5 rounded-full font-bold transition-colors cursor-pointer ${
                            Math.abs(currentVolume - vol.val) < 0.1
                              ? 'bg-pink-500 text-white'
                              : 'bg-white hover:bg-pink-100 text-pink-700 border border-pink-200'
                          }`}
                        >
                          {vol.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Song Selection List */}
                <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Select Any Song ({MUSIC_TRACKS.length})
                  </span>

                  {MUSIC_TRACKS.map((t) => {
                    const isCurrent = activeMusicTrack === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          kawaiiAudio.playPop();
                          onChangeMusicTrack(t.id);
                        }}
                        className={`flex items-center gap-2.5 p-2 rounded-xl text-left transition-all cursor-pointer ${
                          isCurrent
                            ? 'bg-red-50 border border-red-300 text-red-950 font-bold shadow-xs'
                            : 'hover:bg-pink-50/70 border border-transparent text-gray-700'
                        }`}
                      >
                        <span className="text-xl">{t.icon}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs truncate">{t.name}</p>
                            {isCurrent && musicEnabled && (
                              <span className="text-[10px] text-red-500 font-bold animate-pulse">
                                Playing 🎶
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-pink-600/80 truncate">{t.mood}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Random Track Button */}
                <button
                  onClick={() => {
                    kawaiiAudio.playPop();
                    const remaining = MUSIC_TRACKS.filter((t) => t.id !== activeMusicTrack);
                    const pick = remaining[Math.floor(Math.random() * remaining.length)];
                    onChangeMusicTrack(pick.id);
                  }}
                  className="w-full py-1.5 rounded-xl bg-pink-100 hover:bg-pink-200 text-pink-800 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>🎲</span>
                  <span>Surprise Me / Random Track</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

