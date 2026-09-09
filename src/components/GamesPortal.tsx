import React, { useState } from 'react';
import { GameSubMode } from '../types';
import { AppleCatcherGame } from './AppleCatcherGame';
import { OrderRushGame } from './OrderRushGame';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import { Trophy, Award, Sparkles, Play } from 'lucide-react';

interface GamesPortalProps {
  initialSubMode?: GameSubMode;
  highScoreCatcher: number;
  ordersFulfilled: number;
  onEarnCatcherCoins: (coins: number, apples?: number) => void;
  onUpdateHighScore: (score: number) => void;
  onEarnBakeryRewards: (coins: number, gems?: number) => void;
  onIncrementOrders: () => void;
  activeBow: string;
  activeOutfit: string;
}

export const GamesPortal: React.FC<GamesPortalProps> = ({
  initialSubMode = 'catcher',
  highScoreCatcher,
  ordersFulfilled,
  onEarnCatcherCoins,
  onUpdateHighScore,
  onEarnBakeryRewards,
  onIncrementOrders,
  activeBow,
  activeOutfit,
}) => {
  const [subMode, setSubMode] = useState<GameSubMode>(initialSubMode);

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Top Arcade Navigation & Stats Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Submode Switcher Pills */}
        <div className="flex items-center gap-2 bg-pink-50 p-1.5 rounded-2xl border border-pink-200">
          <button
            onClick={() => {
              kawaiiAudio.playPop();
              setSubMode('catcher');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              subMode === 'catcher'
                ? 'bg-red-500 text-white shadow-xs'
                : 'text-gray-600 hover:text-red-600 hover:bg-pink-100/50'
            }`}
          >
            <span>🍎</span>
            <span>Apple Orchard Catcher</span>
          </button>

          <button
            onClick={() => {
              kawaiiAudio.playPop();
              setSubMode('bakery');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              subMode === 'bakery'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-gray-600 hover:text-amber-600 hover:bg-pink-100/50'
            }`}
          >
            <span>🥧</span>
            <span>Pastry Kitchen Rush</span>
          </button>
        </div>

        {/* Global Record Stats */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5 bg-rose-50 px-3 py-1.5 rounded-2xl border border-rose-200 text-rose-800">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Best Catch: {highScoreCatcher} pts</span>
          </div>

          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200 text-amber-800">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Orders Baked: {ordersFulfilled}</span>
          </div>
        </div>
      </div>

      {/* Sub Game View */}
      {subMode === 'catcher' ? (
        <AppleCatcherGame
          onEarnCoins={onEarnCatcherCoins}
          highScore={highScoreCatcher}
          onUpdateHighScore={onUpdateHighScore}
          activeBow={activeBow}
          activeOutfit={activeOutfit}
          onGoToBakery={() => setSubMode('bakery')}
        />
      ) : (
        <OrderRushGame
          onEarnCoins={onEarnBakeryRewards}
          ordersFulfilledCount={ordersFulfilled}
          onIncrementOrders={onIncrementOrders}
        />
      )}
    </div>
  );
};
