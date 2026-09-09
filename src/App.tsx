/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WebsiteTab, GameState, PolaroidPhoto, GuestbookEntry } from './types';
import { INITIAL_GAME_STATE } from './data/gameData';
import { WebsiteHeader } from './components/WebsiteHeader';
import { HomePortal } from './components/HomePortal';
import { GamesPortal } from './components/GamesPortal';
import { CafeMenuPage } from './components/CafeMenuPage';
import { CharactersPage } from './components/CharactersPage';
import { DressUpStudio } from './components/DressUpStudio';
import { CafeDecorRoom } from './components/CafeDecorRoom';
import { VillageMapPage } from './components/VillageMapPage';
import { WebsiteFooter } from './components/WebsiteFooter';
import { PhotoAlbumModal } from './components/PhotoAlbumModal';
import { kawaiiAudio } from './audio/kawaiiAudio';

const STORAGE_KEY = 'hello_kitty_sweet_cafe_website_v2';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...INITIAL_GAME_STATE, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return INITIAL_GAME_STATE;
  });

  const [currentTab, setCurrentTab] = useState<WebsiteTab>('home');
  const [isAlbumOpen, setIsAlbumOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save game state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch {
      // ignore
    }
  }, [gameState]);

  // Audio initial sync
  useEffect(() => {
    kawaiiAudio.setSoundMuted(!gameState.soundEnabled);
    kawaiiAudio.setMusicMuted(!gameState.musicEnabled);
    if (gameState.musicEnabled) {
      kawaiiAudio.startMusic(gameState.activeMusicTrack);
    }
    return () => {
      kawaiiAudio.stopMusic();
    };
  }, []);

  // Show a cute temporary toast
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Toggle Sound Effects
  const handleToggleSound = () => {
    const next = !gameState.soundEnabled;
    kawaiiAudio.setSoundMuted(!next);
    setGameState((prev) => ({ ...prev, soundEnabled: next }));
  };

  // Toggle Kawaii BGM
  const handleToggleMusic = () => {
    const next = !gameState.musicEnabled;
    kawaiiAudio.setMusicMuted(!next);
    setGameState((prev) => ({ ...prev, musicEnabled: next }));
  };

  // Change Music Track
  const handleChangeMusicTrack = (track: string) => {
    setGameState((prev) => ({ ...prev, activeMusicTrack: track, musicEnabled: true }));
    kawaiiAudio.setMusicMuted(false);
    kawaiiAudio.startMusic(track);
    showToast(
      `🎵 Now Playing: ${
        track === 'waltz'
          ? 'Pastel Tea Party'
          : track === 'arcade'
          ? 'Sugar Rush Arcade'
          : "Kitty's Morning Walk"
      }`
    );
  };

  // Earn Coins and Apples
  const handleEarnCoins = (coins: number, apples: number = 0) => {
    setGameState((prev) => ({
      ...prev,
      ribbonCoins: prev.ribbonCoins + coins,
      applesHarvested: prev.applesHarvested + apples,
    }));
    if (coins > 0) {
      showToast(`+${coins} 🎀 Ribbon Coins Earned!`);
    }
  };

  // Spend Coins (Menu sampling or purchases)
  const handleSpendCoins = (coins: number) => {
    setGameState((prev) => ({
      ...prev,
      ribbonCoins: Math.max(0, prev.ribbonCoins - coins),
    }));
    showToast(`Order Placed! Enjoy your delicious treat! 🍽️`);
  };

  // Earn Coins and Gems from Bakery
  const handleEarnBakeryRewards = (coins: number, gems: number = 0) => {
    setGameState((prev) => ({
      ...prev,
      ribbonCoins: prev.ribbonCoins + coins,
      strawberryGems: prev.strawberryGems + gems,
    }));
    if (gems > 0) {
      showToast(`+${coins} 🎀 Ribbon Coins & +${gems} 🍓 Strawberry Gem!`);
    } else {
      showToast(`+${coins} 🎀 Ribbon Coins!`);
    }
  };

  // Update high score
  const handleUpdateHighScore = (newScore: number) => {
    setGameState((prev) => ({
      ...prev,
      highScoreCatcher: Math.max(prev.highScoreCatcher, newScore),
    }));
    showToast(`🏆 New High Score: ${newScore}!`);
  };

  // Unlock an item with coins
  const handleUnlockItem = (itemId: string, cost: number) => {
    if (gameState.ribbonCoins < cost) {
      showToast('Not enough Ribbon Coins yet! Play mini-games to earn more! 🎀');
      return;
    }
    setGameState((prev) => ({
      ...prev,
      ribbonCoins: prev.ribbonCoins - cost,
      unlockedItems: [...prev.unlockedItems, itemId],
    }));
    showToast('✨ New Item Unlocked! Yay! ✨');
  };

  // Save photo to album
  const handleSavePhoto = (photo: PolaroidPhoto) => {
    setGameState((prev) => ({
      ...prev,
      album: [photo, ...prev.album],
    }));
    showToast("📸 Photo saved to Hello Kitty's Memory Album!");
  };

  // Delete photo from album
  const handleDeletePhoto = (photoId: string) => {
    setGameState((prev) => ({
      ...prev,
      album: prev.album.filter((p) => p.id !== photoId),
    }));
  };

  // Add guestbook note
  const handleAddGuestbookEntry = (entry: GuestbookEntry) => {
    setGameState((prev) => ({
      ...prev,
      guestbook: [entry, ...prev.guestbook],
    }));
    showToast('💌 Message posted to Hello Kitty\'s Guestbook!');
  };

  return (
    <div className="min-h-screen bg-[#fff5f7] flex flex-col text-[#4a2835]">
      {/* Official Website Header with Nav & Controls */}
      <WebsiteHeader
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (gameState.musicEnabled) {
            kawaiiAudio.startMusic(gameState.activeMusicTrack);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        ribbonCoins={gameState.ribbonCoins}
        strawberryGems={gameState.strawberryGems}
        soundEnabled={gameState.soundEnabled}
        musicEnabled={gameState.musicEnabled}
        onToggleSound={handleToggleSound}
        onToggleMusic={handleToggleMusic}
        onOpenAlbum={() => setIsAlbumOpen(true)}
        albumCount={gameState.album.length}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-pink-300 shadow-lg text-xs sm:text-sm font-bold text-red-600 animate-bounce flex items-center gap-2">
          <span>🎀</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Website Tab Pages */}
      <main className="flex-1 py-4 sm:py-6">
        {currentTab === 'home' && (
          <HomePortal
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            ribbonCoins={gameState.ribbonCoins}
            strawberryGems={gameState.strawberryGems}
            highScoreCatcher={gameState.highScoreCatcher}
            ordersFulfilled={gameState.ordersFulfilled}
            guestbook={gameState.guestbook}
            onAddGuestbookEntry={handleAddGuestbookEntry}
            onClaimDailyReward={(coins, apples) => handleEarnCoins(coins, apples)}
            activeBow={gameState.activeBow}
            activeOutfit={gameState.activeOutfit}
          />
        )}

        {currentTab === 'games' && (
          <GamesPortal
            highScoreCatcher={gameState.highScoreCatcher}
            ordersFulfilled={gameState.ordersFulfilled}
            onEarnCatcherCoins={handleEarnCoins}
            onUpdateHighScore={handleUpdateHighScore}
            onEarnBakeryRewards={handleEarnBakeryRewards}
            onIncrementOrders={() => {
              setGameState((prev) => ({
                ...prev,
                ordersFulfilled: prev.ordersFulfilled + 1,
              }));
            }}
            activeBow={gameState.activeBow}
            activeOutfit={gameState.activeOutfit}
          />
        )}

        {currentTab === 'menu' && (
          <CafeMenuPage
            ribbonCoins={gameState.ribbonCoins}
            onSpendCoins={handleSpendCoins}
            onGoToKitchen={() => setCurrentTab('games')}
          />
        )}

        {currentTab === 'characters' && (
          <CharactersPage
            onGoToKitchen={() => setCurrentTab('games')}
            onGoToDressUp={() => setCurrentTab('dressup')}
          />
        )}

        {currentTab === 'dressup' && (
          <DressUpStudio
            ribbonCoins={gameState.ribbonCoins}
            unlockedItems={gameState.unlockedItems}
            onUnlockItem={handleUnlockItem}
            activeBow={gameState.activeBow}
            activeOutfit={gameState.activeOutfit}
            activeHandheld={gameState.activeHandheld}
            activeBackground={gameState.activeBackground}
            onChangeBow={(id) => setGameState((prev) => ({ ...prev, activeBow: id }))}
            onChangeOutfit={(id) => setGameState((prev) => ({ ...prev, activeOutfit: id }))}
            onChangeHandheld={(id) => setGameState((prev) => ({ ...prev, activeHandheld: id }))}
            onChangeBackground={(id) => setGameState((prev) => ({ ...prev, activeBackground: id }))}
            onSavePhoto={handleSavePhoto}
          />
        )}

        {currentTab === 'decor' && (
          <CafeDecorRoom
            ribbonCoins={gameState.ribbonCoins}
            unlockedItems={gameState.unlockedItems}
            onUnlockItem={handleUnlockItem}
            cafeWallpaper={gameState.cafeWallpaper}
            cafeFloor={gameState.cafeFloor}
            cafeTable={gameState.cafeTable}
            cafePlushie={gameState.cafePlushie}
            onChangeWallpaper={(id) => setGameState((prev) => ({ ...prev, cafeWallpaper: id }))}
            onChangeFloor={(id) => setGameState((prev) => ({ ...prev, cafeFloor: id }))}
            onChangeTable={(id) => setGameState((prev) => ({ ...prev, cafeTable: id }))}
            onChangePlushie={(id) => setGameState((prev) => ({ ...prev, cafePlushie: id }))}
            activeMusicTrack={gameState.activeMusicTrack}
            onChangeMusicTrack={handleChangeMusicTrack}
            musicEnabled={gameState.musicEnabled}
            onToggleMusic={handleToggleMusic}
            activeBow={gameState.activeBow}
            activeOutfit={gameState.activeOutfit}
          />
        )}

        {currentTab === 'village' && (
          <VillageMapPage
            onGoToOrchard={() => setCurrentTab('games')}
            onGoToBakery={() => setCurrentTab('games')}
            onGoToCharacters={() => setCurrentTab('characters')}
          />
        )}
      </main>

      {/* Polaroid Photo Album Modal */}
      <PhotoAlbumModal
        isOpen={isAlbumOpen}
        onClose={() => setIsAlbumOpen(false)}
        album={gameState.album}
        onDeletePhoto={handleDeletePhoto}
        onGoToStudio={() => {
          setIsAlbumOpen(false);
          setCurrentTab('dressup');
        }}
      />

      {/* Official Website Footer */}
      <WebsiteFooter
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
