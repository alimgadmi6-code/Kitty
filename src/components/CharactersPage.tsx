import React, { useState } from 'react';
import { FRIENDS_DATA } from '../data/gameData';
import { FriendCharacter } from '../types';
import { KittySvg } from './KittySvg';
import { FriendSvg } from './FriendSvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Heart, Volume2, Sparkles, Cake, Star, Award } from 'lucide-react';

interface CharactersPageProps {
  onGoToKitchen: () => void;
  onGoToDressUp: () => void;
}

export const CharactersPage: React.FC<CharactersPageProps> = ({
  onGoToKitchen,
  onGoToDressUp,
}) => {
  const [activeFriendId, setActiveFriendId] = useState<string>('kitty');
  const [friendshipLevels, setFriendshipLevels] = useState<Record<string, number>>({
    kitty: 5,
    melody: 3,
    cinnamoroll: 4,
    purin: 3,
    kuromi: 2,
    keroppi: 2,
  });

  const selectedFriend = FRIENDS_DATA.find((f) => f.id === activeFriendId) || FRIENDS_DATA[0];

  const handleCheerFriend = (friendId: string) => {
    kawaiiAudio.playSuccess();
    setFriendshipLevels((prev) => ({
      ...prev,
      [friendId]: Math.min(10, (prev[friendId] || 1) + 1),
    }));

    try {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-900 text-xs font-bold mb-2">
            <span>🌸</span>
            <span>Official Character Roster & Encyclopedia</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-red-600">
            Meet Hello Kitty & Sanrio Friends
          </h2>
          <p className="text-xs sm:text-sm text-pink-700 max-w-xl mt-1 font-medium">
            Learn all about Hello Kitty, My Melody, Cinnamoroll, Pompompurin, Kuromi, and Keroppi! Tap to hear their sweet greetings and grow friendship levels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              kawaiiAudio.playPop();
              onGoToDressUp();
            }}
            className="px-4 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-xs cursor-pointer"
          >
            🎀 Style Kitty
          </button>
        </div>
      </div>

      {/* Main Showcase Layout: Left Character Detail & Right Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Detailed Spotlight Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-sm flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Character Graphic */}
            <div className="w-44 h-44 rounded-3xl bg-gradient-to-b from-rose-50 to-pink-100 border-2 border-pink-200 flex items-center justify-center p-2 shadow-inner relative flex-shrink-0">
              {selectedFriend.id === 'kitty' ? (
                <KittySvg
                  size={150}
                  bowId="bow_classic"
                  outfitId="outfit_classic"
                  handheldId="hand_apple"
                  expression="happy"
                  className="animate-float"
                />
              ) : (
                <div className="animate-float">
                  <FriendSvg friendId={selectedFriend.id} size={140} isHappy={true} />
                </div>
              )}

              <span className="absolute top-2 left-2 text-xl">✨</span>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
                {selectedFriend.title}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-800 mt-0.5">
                {selectedFriend.name}
              </h3>

              {/* Friendship meter */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  Lv. {friendshipLevels[selectedFriend.id] || 1}
                </span>
                <div className="flex-1 max-w-[140px] h-2.5 rounded-full bg-pink-100 overflow-hidden border border-pink-200">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-pink-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, ((friendshipLevels[selectedFriend.id] || 1) / 10) * 100)}%`,
                    }}
                  />
                </div>
                <button
                  onClick={() => handleCheerFriend(selectedFriend.id)}
                  className="px-2.5 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11px] font-bold cursor-pointer transition-colors"
                >
                  + Cheer! 💕
                </button>
              </div>

              {/* Greeting quote bubble */}
              <div className="mt-4 bg-pink-50/80 rounded-2xl p-3 border border-pink-200 relative">
                <p className="text-xs text-pink-950 italic">
                  "{selectedFriend.dialogueGreeting}"
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Encyclopedia Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-pink-100 text-xs">
            <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
              <span className="text-[10px] text-gray-500 uppercase font-bold">Birthday</span>
              <p className="font-bold text-gray-800 mt-0.5">{selectedFriend.birthday}</p>
            </div>

            <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
              <span className="text-[10px] text-gray-500 uppercase font-bold">Height</span>
              <p className="font-bold text-gray-800 mt-0.5">{selectedFriend.height}</p>
            </div>

            <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
              <span className="text-[10px] text-gray-500 uppercase font-bold">Weight</span>
              <p className="font-bold text-gray-800 mt-0.5">{selectedFriend.weight}</p>
            </div>

            <div className="bg-pink-50/50 p-3 rounded-2xl border border-pink-100">
              <span className="text-[10px] text-gray-500 uppercase font-bold">Favorite Treat</span>
              <p className="font-bold text-red-600 mt-0.5 truncate">{selectedFriend.favoriteTreat}</p>
            </div>
          </div>

          {/* Personality & Fun Fact */}
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/70">
              <span className="font-bold text-amber-900 block mb-1">🎀 Personality</span>
              <p className="text-gray-700 leading-relaxed">{selectedFriend.personality}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-sky-50/70 border border-sky-200/70">
              <span className="font-bold text-sky-900 block mb-1">⭐ Official Fun Fact</span>
              <p className="text-gray-700 leading-relaxed">{selectedFriend.funFact}</p>
            </div>
          </div>
        </div>

        {/* Right: Character Selector Cards (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <span className="text-xs uppercase font-bold text-gray-600 tracking-wider px-1">
            Choose Character Profile
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {FRIENDS_DATA.map((f) => {
              const isSelected = activeFriendId === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => {
                    kawaiiAudio.playPop();
                    setActiveFriendId(f.id);
                  }}
                  className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-red-400 bg-rose-50/90 shadow-sm ring-2 ring-red-200 scale-101'
                      : 'border-pink-100 bg-white hover:bg-pink-50/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center">
                      {f.id === 'kitty' ? (
                        <KittySvg size={38} bowId="bow_classic" outfitId="outfit_classic" expression="happy" />
                      ) : (
                        <FriendSvg friendId={f.id} size={36} isHappy={true} />
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-gray-800">{f.name}</h4>
                      <p className="text-[11px] text-pink-600">{f.favoriteTreat}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full border border-red-200">
                    <Heart className="w-3 h-3 fill-red-400" />
                    <span>Lv.{friendshipLevels[f.id] || 1}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
