/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { WebsiteTab, GameState, PolaroidPhoto, GuestbookEntry, CoupleProfile, BucketListItem } from './types';
import { INITIAL_GAME_STATE } from './data/gameData';
import { WebsiteHeader } from './components/WebsiteHeader';
import { AnniversaryHub } from './components/AnniversaryHub';
import { HomePortal } from './components/HomePortal';
import { GamesPortal } from './components/GamesPortal';
import { CafeMenuPage } from './components/CafeMenuPage';
import { CharactersPage } from './components/CharactersPage';
import { DressUpStudio } from './components/DressUpStudio';
import { CafeDecorRoom } from './components/CafeDecorRoom';
import { VillageMapPage } from './components/VillageMapPage';
import { WebsiteFooter } from './components/WebsiteFooter';
import { PhotoAlbumModal } from './components/PhotoAlbumModal';
import { kawaiiAudio, MUSIC_TRACKS } from './audio/kawaiiAudio';

const STORAGE_KEY = 'hello_kitty_sweet_cafe_anniversary_v2';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const profile = parsed.coupleProfile ? {
          ...INITIAL_GAME_STATE.coupleProfile,
          ...parsed.coupleProfile,
          anniversaryDate: parsed.coupleProfile.anniversaryDate === '2025-10-16' ? '2025-10-15' : (parsed.coupleProfile.anniversaryDate || '2025-10-15'),
          partner1: (!parsed.coupleProfile.partner1 || parsed.coupleProfile.partner1 === 'My Love' || parsed.coupleProfile.partner1 === 'Bestie 1') ? 'Tafeh' : parsed.coupleProfile.partner1,
          partner2: (!parsed.coupleProfile.partner2 || parsed.coupleProfile.partner2 === 'Sweetheart' || parsed.coupleProfile.partner2 === 'Bestie 2') ? 'Tafeha' : parsed.coupleProfile.partner2,
          customNote: (!parsed.coupleProfile.customNote || parsed.coupleProfile.customNote.startsWith('365 days of non-stop laughs') || parsed.coupleProfile.customNote.includes('best partner in crime')) 
            ? 'n3mbou zinek :D,mkch harba muhehehe 😈' 
            : parsed.coupleProfile.customNote,
        } : INITIAL_GAME_STATE.coupleProfile;

        const isOldDefaultItem = (b: BucketListItem) => 
          !b || !b.title ||
          b.title.includes('Sanrio') || 
          b.title.includes('Hello Kitty') || 
          b.title.includes('apple pie') || 
          b.title.includes('flower meadow') || 
          b.title.includes('Studio Ghibli') || 
          b.title.includes('photo booth polaroids') || 
          b.title.includes('getaway cabin') || 
          b.title.includes('very first day hanging out');

        let migratedBucketList = INITIAL_GAME_STATE.bucketList;
        if (Array.isArray(parsed.bucketList) && parsed.bucketList.length > 0) {
          const hasOldDefaults = parsed.bucketList.some(isOldDefaultItem);
          if (hasOldDefaults) {
            // Keep any custom goals the user added manually, while replacing old template suggestions
            const userCustomGoals = parsed.bucketList.filter((b: BucketListItem) => 
              !isOldDefaultItem(b) && !INITIAL_GAME_STATE.bucketList.some(item => item.title === b.title)
            );
            migratedBucketList = [...INITIAL_GAME_STATE.bucketList, ...userCustomGoals];
          } else {
            // Check if item 7 has old text
            migratedBucketList = parsed.bucketList.map((item: BucketListItem) => {
              if (item.title && item.title.includes('nchru dbach')) {
                return { ...item, title: 'n9ru 3la rwa7na wa na3mlu ili n7bu 3lih 🙏' };
              }
              return item;
            });
          }
        }

        return {
          ...INITIAL_GAME_STATE,
          ...parsed,
          coupleProfile: profile,
          bucketList: migratedBucketList,
          unlockedItems: Array.from(new Set([...INITIAL_GAME_STATE.unlockedItems, ...(parsed.unlockedItems || [])]))
        };
      }
    } catch {
      // Fallback
    }
    return INITIAL_GAME_STATE;
  });

  const [currentTab, setCurrentTab] = useState<WebsiteTab>('anniversary');
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
    const initialTrack = gameState.activeMusicTrack || 'paris_cafe';
    if (gameState.musicEnabled) {
      kawaiiAudio.startMusic(initialTrack);
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
    if (next) {
      const track = gameState.activeMusicTrack || 'paris_cafe';
      const info = MUSIC_TRACKS.find((t) => t.id === track);
      showToast(`🎵 Kawaii BGM Resumed: ${info ? `${info.icon} ${info.name}` : track}`);
    } else {
      showToast('🔇 Kawaii BGM Paused');
    }
  };

  // Change Music Track
  const handleChangeMusicTrack = (track: string) => {
    setGameState((prev) => ({ ...prev, activeMusicTrack: track, musicEnabled: true }));
    kawaiiAudio.setMusicMuted(false);
    kawaiiAudio.startMusic(track);
    const info = MUSIC_TRACKS.find((t) => t.id === track);
    showToast(`🎵 Now Playing: ${info ? `${info.icon} ${info.name}` : track}`);
  };

  // Skip to Next Music Track
  const handleNextMusicTrack = () => {
    const nextId = kawaiiAudio.nextTrack();
    setGameState((prev) => ({ ...prev, activeMusicTrack: nextId, musicEnabled: true }));
    kawaiiAudio.setMusicMuted(false);
    const info = MUSIC_TRACKS.find((t) => t.id === nextId);
    showToast(`⏭️ Changed Music: ${info ? `${info.icon} ${info.name}` : nextId}`);
  };

  // Skip to Previous Music Track
  const handlePrevMusicTrack = () => {
    const prevId = kawaiiAudio.prevTrack();
    setGameState((prev) => ({ ...prev, activeMusicTrack: prevId, musicEnabled: true }));
    kawaiiAudio.setMusicMuted(false);
    const info = MUSIC_TRACKS.find((t) => t.id === prevId);
    showToast(`⏮️ Changed Music: ${info ? `${info.icon} ${info.name}` : prevId}`);
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

  // Update Couple Profile
  const handleUpdateCoupleProfile = (profile: CoupleProfile) => {
    setGameState((prev) => ({ ...prev, coupleProfile: profile }));
    showToast('💖 Anniversary Details Saved!');
  };

  // Update Bucket List
  const handleUpdateBucketList = (items: BucketListItem[]) => {
    setGameState((prev) => ({ ...prev, bucketList: items }));
  };

  // Take Anniversary Photo
  const handleTakeAnniversaryPhoto = (caption: string, dataUrl?: string) => {
    const newPhoto: PolaroidPhoto = {
      id: `photo_anniv_${Date.now()}`,
      date: 'Today • 1 Year',
      caption,
      outfit: {
        bowId: gameState.activeBow,
        outfitId: gameState.activeOutfit,
        handheldId: gameState.activeHandheld,
        bgId: gameState.activeBackground,
      },
      sticker: '💖',
      dataUrl,
    };
    setGameState((prev) => ({
      ...prev,
      album: [newPhoto, ...prev.album],
    }));
    showToast('📸 Photo added to Anniversary Scrapbook!');
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
        activeMusicTrack={gameState.activeMusicTrack}
        coupleProfile={gameState.coupleProfile}
        onToggleSound={handleToggleSound}
        onToggleMusic={handleToggleMusic}
        onChangeMusicTrack={handleChangeMusicTrack}
        onNextMusicTrack={handleNextMusicTrack}
        onPrevMusicTrack={handlePrevMusicTrack}
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
        {currentTab === 'anniversary' && (
          <AnniversaryHub
            coupleProfile={gameState.coupleProfile}
            onUpdateCoupleProfile={handleUpdateCoupleProfile}
            bucketList={gameState.bucketList}
            onUpdateBucketList={handleUpdateBucketList}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onClaimReward={(coins, gems) => handleEarnBakeryRewards(coins, gems)}
            onTakeAnniversaryPhoto={handleTakeAnniversaryPhoto}
            activeMusicTrack={gameState.activeMusicTrack}
            onChangeMusicTrack={handleChangeMusicTrack}
          />
        )}

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
            coupleProfile={gameState.coupleProfile}
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
