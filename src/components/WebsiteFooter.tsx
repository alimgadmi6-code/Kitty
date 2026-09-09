import React from 'react';
import { WebsiteTab } from '../types';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import { Heart, ArrowUp, Sparkles, MapPin, Clock } from 'lucide-react';

interface WebsiteFooterProps {
  onSelectTab: (tab: WebsiteTab) => void;
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({ onSelectTab }) => {
  const scrollToTop = () => {
    kawaiiAudio.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t-2 border-pink-200 mt-12 pt-10 pb-8 px-4 text-pink-900">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Philosophy */}
          <div className="flex flex-col gap-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center text-white text-lg shadow-xs">
                🎀
              </div>
              <span className="text-lg font-bold font-display text-red-600">
                HELLO KITTY
              </span>
            </div>
            <p className="text-xs text-pink-700/80 leading-relaxed">
              Hello Kitty's Sweet Cafe & Bakery is dedicated to spreading smiles, warm freshly baked pies, and heartfelt friendship across the globe.
            </p>
            <div className="text-[11px] font-bold text-red-600 mt-1">
              "Small Gift, Big Smile" 🎁
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1">
              Explore Website
            </h4>
            {[
              { id: 'home', label: 'Cafe Portal Home' },
              { id: 'games', label: 'Arcade Mini-Games' },
              { id: 'menu', label: 'Bakery Menu & Recipes' },
              { id: 'characters', label: 'Sanrio Friends Roster' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  onSelectTab(link.id as WebsiteTab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-xs text-pink-700 hover:text-red-600 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Col 3: Attractions */}
          <div className="flex flex-col gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1">
              Attractions
            </h4>
            {[
              { id: 'dressup', label: 'Wardrobe & Photo Studio' },
              { id: 'decor', label: 'Cafe Lounge & Jukebox' },
              { id: 'village', label: 'Sanrio Village Map' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  kawaiiAudio.playPop();
                  onSelectTab(link.id as WebsiteTab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-xs text-pink-700 hover:text-red-600 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Col 4: Visit Info & Motto */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-950 mb-1">
              Cottage Bakery Hours
            </h4>
            <div className="text-xs text-pink-700/80 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-pink-500" />
                <span>Open Daily: 8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                <span>1 Apple Lane, Sanrio Sweet Village</span>
              </div>
            </div>

            <div className="p-3 bg-pink-50 rounded-2xl border border-pink-200 text-[11px] text-pink-900 mt-1">
              🍎 <strong>Grandpa's Orchard Rule:</strong> "The sweetest apples are always shared with good friends!"
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-6 border-t border-pink-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-pink-600">
          <div className="flex items-center gap-2">
            <span>© Sanrio Universe Inspired Web Experience</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 fill-red-400 text-red-500" /> for Hello Kitty Fans
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-800 font-bold border border-pink-200 transition-all cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
