import React, { useState, useEffect, useRef } from 'react';
import { FRIENDS_DATA, RECIPES_DATA, INGREDIENTS_DATA } from '../data/gameData';
import { FriendCharacter, Recipe, Ingredient, ActiveCustomerOrder } from '../types';
import { FriendSvg } from './FriendSvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, CheckCircle2, RotateCcw, Award, Heart, HelpCircle } from 'lucide-react';

interface OrderRushGameProps {
  onEarnCoins: (coins: number, gems?: number) => void;
  ordersFulfilledCount: number;
  onIncrementOrders: () => void;
}

export const OrderRushGame: React.FC<OrderRushGameProps> = ({
  onEarnCoins,
  ordersFulfilledCount,
  onIncrementOrders,
}) => {
  const [activeOrders, setActiveOrders] = useState<ActiveCustomerOrder[]>([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
  const [currentBowl, setCurrentBowl] = useState<string[]>([]);
  const [friendshipLevels, setFriendshipLevels] = useState<Record<string, number>>({
    kitty: 1,
    melody: 1,
    cinnamoroll: 1,
    purin: 1,
    kuromi: 1,
    keroppi: 1,
  });
  const [activeDialogue, setActiveDialogue] = useState<{ name: string; text: string } | null>(null);
  const [streak, setStreak] = useState<number>(0);

  // Spawn initial customer order if empty
  useEffect(() => {
    if (activeOrders.length === 0) {
      spawnNewCustomer();
    }
  }, [activeOrders.length]);

  // Timer loop for customer patience
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveOrders((prevOrders) => {
        return prevOrders
          .map((order) => {
            const nextTime = order.timeLeft - 0.5;
            return { ...order, timeLeft: nextTime };
          })
          .filter((order) => {
            if (order.timeLeft <= 0) {
              kawaiiAudio.playHazard();
              setStreak(0);
              const friend = FRIENDS_DATA.find((f) => f.id === order.customerId);
              setActiveDialogue({
                name: friend ? friend.name : 'Customer',
                text: 'Oh no, I have to run! Maybe next time...',
              });
              return false;
            }
            return true;
          });
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  // Spawn a new customer
  const spawnNewCustomer = () => {
    if (activeOrders.length >= 3) return;

    // Pick a random friend and a compatible or random recipe
    const randomFriend = FRIENDS_DATA[Math.floor(Math.random() * FRIENDS_DATA.length)];
    // Find favorite recipe or any recipe
    const matchingRecipe =
      RECIPES_DATA.find((r) => r.targetCustomer === randomFriend.id) ||
      RECIPES_DATA[Math.floor(Math.random() * RECIPES_DATA.length)];

    const totalTime = matchingRecipe.difficulty === 'master' ? 45 : matchingRecipe.difficulty === 'medium' ? 40 : 35;

    const newOrder: ActiveCustomerOrder = {
      id: `${Date.now()}_${Math.random()}`,
      customerId: randomFriend.id,
      recipeId: matchingRecipe.id,
      totalTime,
      timeLeft: totalTime,
      currentIngredients: [],
    };

    setActiveOrders((prev) => [...prev, newOrder]);
  };

  const activeOrder = activeOrders[selectedOrderIndex] || activeOrders[0];
  const activeCustomer = activeOrder ? FRIENDS_DATA.find((f) => f.id === activeOrder.customerId) : null;
  const activeRecipe = activeOrder ? RECIPES_DATA.find((r) => r.id === activeOrder.recipeId) : null;

  // Add ingredient to bowl
  const handleAddIngredient = (ingredientId: string) => {
    if (!activeRecipe) return;
    kawaiiAudio.playPop();

    if (currentBowl.length >= 5) return; // limit
    const nextBowl = [...currentBowl, ingredientId];
    setCurrentBowl(nextBowl);

    // Check if ingredient matches target step
    const targetIdx = currentBowl.length;
    if (activeRecipe.requiredIngredients[targetIdx] === ingredientId) {
      kawaiiAudio.playCatch(1.2);
    }
  };

  // Clear bowl
  const handleClearBowl = () => {
    kawaiiAudio.playPop();
    setCurrentBowl([]);
  };

  // Serve the finished treat
  const handleServeOrder = () => {
    if (!activeRecipe || !activeCustomer || !activeOrder) return;

    // Check recipe match
    const isCorrect =
      currentBowl.length === activeRecipe.requiredIngredients.length &&
      currentBowl.every((ingId, idx) => ingId === activeRecipe.requiredIngredients[idx]);

    if (isCorrect) {
      // SUCCESS!
      kawaiiAudio.playSuccess();
      try {
        confetti({
          particleCount: 45,
          spread: 70,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }

      const reward = activeRecipe.rewardCoins + streak * 5;
      const willAwardGem = (ordersFulfilledCount + 1) % 4 === 0;
      onEarnCoins(reward, willAwardGem ? 1 : 0);
      onIncrementOrders();
      setStreak((s) => s + 1);

      // Level up friendship
      setFriendshipLevels((prev) => ({
        ...prev,
        [activeCustomer.id]: (prev[activeCustomer.id] || 1) + 1,
      }));

      // Happy dialogue
      setActiveDialogue({
        name: activeCustomer.name,
        text: activeCustomer.dialogueHappy,
      });

      // Remove fulfilled order and reset bowl
      setActiveOrders((prev) => prev.filter((o) => o.id !== activeOrder.id));
      setCurrentBowl([]);
      setSelectedOrderIndex(0);

      // Auto-spawn replacement after short delay
      setTimeout(() => {
        spawnNewCustomer();
      }, 1200);
    } else {
      // Mistake
      kawaiiAudio.playHazard();
      setActiveDialogue({
        name: activeCustomer.name,
        text: "Hmm, this doesn't look quite right! Let's check the recipe card!",
      });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Top Header & Streak */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-red-600 flex items-center gap-2">
            <span>🥧</span> Hello Kitty's Pastry Kitchen
          </h2>
          <p className="text-xs sm:text-sm text-pink-700 font-medium">
            Assemble sweet bakery orders with cheer and care for Hello Kitty & friends!
          </p>
        </div>

        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="bg-gradient-to-r from-amber-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{streak} Order Streak! (+{streak * 5} bonus)</span>
            </div>
          )}

          <div className="bg-pink-50 px-3 py-1.5 rounded-2xl border border-pink-200 text-xs font-bold text-pink-800 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Orders Served: {ordersFulfilledCount}</span>
          </div>

          <button
            onClick={() => {
              kawaiiAudio.playPop();
              spawnNewCustomer();
            }}
            disabled={activeOrders.length >= 3}
            className="px-3 py-1.5 rounded-2xl bg-red-500 hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
          >
            + Invite Friend
          </button>
        </div>
      </div>

      {/* Customer Waiting Area (Counter Seats) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {activeOrders.map((order, idx) => {
          const friend = FRIENDS_DATA.find((f) => f.id === order.customerId);
          const recipe = RECIPES_DATA.find((r) => r.id === order.recipeId);
          const isSelected = idx === selectedOrderIndex;
          const patienceRatio = order.timeLeft / order.totalTime;

          if (!friend || !recipe) return null;

          return (
            <div
              key={order.id}
              onClick={() => {
                kawaiiAudio.playPop();
                setSelectedOrderIndex(idx);
                setCurrentBowl([]);
              }}
              className={`rounded-3xl p-4 border-2 transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-rose-50/90 border-red-400 shadow-md ring-2 ring-red-200 scale-102'
                  : 'bg-white/80 border-pink-200 hover:bg-pink-50/50'
              }`}
            >
              {/* Patience Progress Bar */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gray-100">
                <div
                  className={`h-full transition-all duration-300 ${
                    patienceRatio > 0.5 ? 'bg-emerald-400' : patienceRatio > 0.25 ? 'bg-amber-400' : 'bg-red-500 animate-pulse'
                  }`}
                  style={{ width: `${Math.max(0, patienceRatio * 100)}%` }}
                />
              </div>

              <div className="flex items-center gap-3 mt-1">
                <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center relative">
                  <FriendSvg friendId={friend.id} size={64} />
                  <span className="absolute -top-1 -right-1 text-xs px-1.5 py-0.2 bg-white rounded-full border border-pink-200 font-bold text-pink-700">
                    Lv.{friendshipLevels[friend.id] || 1}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-800 truncate">{friend.name}</h3>
                    <span className="text-xs text-amber-600 font-bold">+{recipe.rewardCoins} 🎀</span>
                  </div>
                  <p className="text-xs text-pink-600 font-semibold truncate mt-0.5">
                    Wants: {recipe.icon} {recipe.name}
                  </p>
                  <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
                    <Clock className="w-3 h-3 text-pink-400" />
                    <span>{Math.ceil(order.timeLeft)}s left</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Baking Station */}
      {activeOrder && activeCustomer && activeRecipe ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Customer & Recipe Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Customer Dialogue & Live Avatar */}
            <div className="bg-white rounded-3xl p-5 border-2 border-pink-200 shadow-sm flex flex-col items-center text-center relative">
              <div className="relative mb-2">
                <FriendSvg friendId={activeCustomer.id} size={110} isHappy={streak > 0} />
              </div>

              <div className="bg-pink-50 rounded-2xl p-3 border border-pink-200 w-full relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-pink-50 border-t border-l border-pink-200 transform rotate-45" />
                <p className="text-xs font-bold text-pink-800 mb-0.5">{activeCustomer.name}</p>
                <p className="text-xs text-gray-700 font-medium italic">
                  "{activeDialogue?.name === activeCustomer.name ? activeDialogue.text : activeCustomer.dialogueGreeting}"
                </p>
              </div>

              {/* Recipe Checklist */}
              <div className="w-full mt-4 bg-amber-50/70 rounded-2xl p-3.5 border border-amber-200 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-800">
                    Recipe Card: {activeRecipe.name}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-bold">
                    {activeRecipe.difficulty}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mb-3">{activeRecipe.description}</p>

                {/* Steps order */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {activeRecipe.requiredIngredients.map((ingId, idx) => {
                    const ing = INGREDIENTS_DATA.find((i) => i.id === ingId);
                    const isAdded = currentBowl[idx] === ingId;

                    return (
                      <div
                        key={idx}
                        className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all min-w-[62px] ${
                          isAdded
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-white border-amber-200 text-gray-700'
                        }`}
                      >
                        <span className="text-xl mb-0.5">{ing?.icon || '❓'}</span>
                        <span className="text-[10px] font-semibold leading-tight line-clamp-1">
                          {ing?.name.split(' ')[0]}
                        </span>
                        {isAdded && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bowl Assembly & Ingredient Pantry (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* The Prep Bowl / Display Dish */}
            <div className="bg-white rounded-3xl p-5 border-2 border-pink-200 shadow-sm flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🥣</span>
                  <h3 className="font-bold text-gray-800 text-sm">Pastry Dish Preparation</h3>
                </div>
                <button
                  onClick={handleClearBowl}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Plate</span>
                </button>
              </div>

              {/* Visual Bowl */}
              <div className="w-full h-36 rounded-2xl bg-gradient-to-b from-pink-50 to-rose-100 border-2 border-dashed border-pink-300 flex items-center justify-center p-4 relative overflow-hidden">
                {currentBowl.length === 0 ? (
                  <div className="text-center text-pink-400 text-xs font-semibold">
                    <span>✨ Tap ingredients from the pantry below in order! ✨</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2 flex-wrap z-10">
                    {currentBowl.map((ingId, idx) => {
                      const ing = INGREDIENTS_DATA.find((i) => i.id === ingId);
                      return (
                        <div
                          key={idx}
                          className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-pink-200 flex flex-col items-center justify-center animate-scale-in"
                        >
                          <span className="text-2xl">{ing?.icon}</span>
                          <span className="text-[9px] font-bold text-gray-600 truncate max-w-[48px]">
                            {ing?.name.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action: Serve Button */}
              <div className="w-full mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-gray-500 font-medium">
                  Ingredients: {currentBowl.length} / {activeRecipe.requiredIngredients.length}
                </span>

                <button
                  onClick={handleServeOrder}
                  disabled={currentBowl.length === 0}
                  className="flex-1 max-w-xs flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 rounded-2xl text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Serve to {activeCustomer.name}!</span>
                </button>
              </div>
            </div>

            {/* Ingredient Pantry Grid */}
            <div className="bg-white rounded-3xl p-5 border-2 border-pink-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Baker's Pantry & Toppings
                </span>
                <span className="text-xs text-pink-400 font-medium">Tap to add</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                {INGREDIENTS_DATA.map((ing) => (
                  <button
                    key={ing.id}
                    onClick={() => handleAddIngredient(ing.id)}
                    className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-pink-100 bg-pink-50/60 hover:bg-pink-100 hover:border-pink-300 active:scale-95 transition-all text-center cursor-pointer group"
                  >
                    <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">
                      {ing.icon}
                    </span>
                    <span className="text-[11px] font-bold text-gray-800 leading-tight">
                      {ing.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-pink-200 shadow-sm">
          <span className="text-5xl mb-3 block">🎀</span>
          <h3 className="text-xl font-bold font-display text-red-600 mb-2">No Active Orders</h3>
          <p className="text-sm text-gray-500 mb-4">Invite friendly guests from Sanrio town to order sweet treats!</p>
          <button
            onClick={spawnNewCustomer}
            className="px-6 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            Ring Cafe Bell 🔔
          </button>
        </div>
      )}
    </div>
  );
};
