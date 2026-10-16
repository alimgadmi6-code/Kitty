import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/gameData';
import { MenuItem } from '../types';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Sparkles, Clock, Heart, Coffee, Check, ShoppingBag, Award } from 'lucide-react';

interface CafeMenuPageProps {
  ribbonCoins: number;
  onSpendCoins: (coins: number) => void;
  onGoToKitchen: () => void;
}

export const CafeMenuPage: React.FC<CafeMenuPageProps> = ({
  ribbonCoins,
  onSpendCoins,
  onGoToKitchen,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pastry' | 'drink' | 'dessert'>('all');
  const [orderedItems, setOrderedItems] = useState<string[]>([]);

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOrderForTable = (item: MenuItem) => {
    if (ribbonCoins < item.priceCoins) {
      kawaiiAudio.playHazard();
      return;
    }

    kawaiiAudio.playSuccess();
    onSpendCoins(item.priceCoins);
    setOrderedItems((prev) => [...prev, item.id]);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <span>🍰</span>
            <span>Handcrafted Fresh Daily with Care</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-red-600">
            Hello Kitty's Sweet Bakery Cafe Menu
          </h2>
          <p className="text-xs sm:text-sm text-pink-700 max-w-xl mt-1 font-medium">
            Explore our artisanal bakery delicacies, freshly shaken strawberry boba teas, and fluffy cloud desserts made from organic orchard ingredients.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              kawaiiAudio.playPop();
              onGoToKitchen();
            }}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>🥧 Bake in Kitchen</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'Full Menu', icon: '🍽️' },
          { id: 'pastry', label: 'Artisanal Pastries', icon: '🥧' },
          { id: 'drink', label: 'Boba & Sweet Drinks', icon: '🧋' },
          { id: 'dessert', label: 'Flans & Parfaits', icon: '🍮' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              kawaiiAudio.playPop();
              setSelectedCategory(cat.id as typeof selectedCategory);
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedCategory === cat.id
                ? 'bg-red-500 text-white shadow-xs scale-102'
                : 'bg-white hover:bg-pink-50 text-pink-900 border border-pink-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const isOrdered = orderedItems.includes(item.id);
          const canAfford = ribbonCoins >= item.priceCoins;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border-2 border-pink-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group"
            >
              <div>
                {/* Header with icon & tags */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200 flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                      🎀 {item.priceCoins} Coins
                    </span>
                    <span className="text-[10px] text-pink-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.prepTime}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-base text-gray-800 font-display mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  {item.description}
                </p>

                {/* Sweetness meter & Favorite tag */}
                <div className="flex items-center justify-between py-2 border-t border-b border-pink-100 mb-3 text-[11px]">
                  <div className="flex items-center gap-1 text-pink-700 font-semibold">
                    <span>Sweetness:</span>
                    <span className="tracking-widest">
                      {'🍬'.repeat(item.sweetness)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-red-600 font-bold">
                    <Heart className="w-3 h-3 fill-red-400" />
                    <span>{item.favoriteOf}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-pink-50 text-pink-700 font-semibold border border-pink-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={() => handleOrderForTable(item)}
                disabled={!canAfford}
                className={`w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  !canAfford
                    ? 'bg-gray-100 text-gray-400 border border-gray-200'
                    : isOrdered
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                    : 'bg-red-500 hover:bg-red-600 text-white shadow-xs active:scale-95'
                }`}
              >
                {isOrdered ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Order Served at Table! (Order More)</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{canAfford ? 'Order for Table 🍽️' : 'Need More Ribbon Coins'}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Secret Baking Tip Banner */}
      <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-amber-100 rounded-3xl p-5 border-2 border-pink-200 flex flex-col sm:flex-row items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
          👩‍🍳
        </div>
        <div>
          <h4 className="font-bold text-sm text-red-600 font-display">
            Hello Kitty's Master Baker Tip
          </h4>
          <p className="text-xs text-pink-900/80 font-medium mt-0.5">
            "The secret to mama's apple pie is chilling the pastry butter dough for 30 minutes, and brushing the top crust with fresh honey apple syrup before baking with lots of cheer and care!"
          </p>
        </div>
      </div>
    </div>
  );
};
