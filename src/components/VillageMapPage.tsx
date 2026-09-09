import React, { useState } from 'react';
import { VILLAGE_LANDMARKS } from '../data/gameData';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import { MapPin, Clock, Heart, Users, Sparkles, ArrowRight } from 'lucide-react';

interface VillageMapPageProps {
  onGoToOrchard: () => void;
  onGoToBakery: () => void;
  onGoToCharacters: () => void;
}

export const VillageMapPage: React.FC<VillageMapPageProps> = ({
  onGoToOrchard,
  onGoToBakery,
  onGoToCharacters,
}) => {
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('cottage_bakery');

  const landmark = VILLAGE_LANDMARKS.find((l) => l.id === selectedLandmarkId) || VILLAGE_LANDMARKS[0];

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-2">
            <span>🗺️</span>
            <span>Explore Sanrio Sweet Village</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-red-600">
            Village Map & Sightseeing Guide
          </h2>
          <p className="text-xs sm:text-sm text-pink-700 max-w-xl mt-1 font-medium">
            Take a scenic walking tour through the village! Visit the warm cottage bakery, climb the apple trees, or relax by Keroppi's sparkling pond.
          </p>
        </div>
      </div>

      {/* Interactive Map Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Visual Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-sky-100 via-emerald-50 to-pink-50 rounded-3xl p-6 border-4 border-pink-200 shadow-md relative overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-between">
          {/* Decorative Clouds & Foliage */}
          <div className="absolute top-4 left-6 text-2xl animate-float">☁️</div>
          <div className="absolute top-8 right-12 text-3xl animate-float opacity-80">☁️</div>
          <div className="absolute bottom-4 left-6 text-2xl opacity-60">🌸</div>
          <div className="absolute bottom-6 right-6 text-2xl opacity-60">🌷</div>

          {/* Map Heading */}
          <div className="bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-pink-200 self-start shadow-xs text-xs font-bold text-pink-900 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>Interactive Village Landmarks — Tap a pin to visit!</span>
          </div>

          {/* Pins in relative positions */}
          <div className="relative w-full h-[280px] my-auto">
            {/* 1. Cottage Bakery (Center-Left) */}
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setSelectedLandmarkId('cottage_bakery');
              }}
              className={`absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-md flex flex-col items-center ${
                selectedLandmarkId === 'cottage_bakery'
                  ? 'bg-red-500 text-white border-white scale-110 ring-4 ring-red-200 z-20'
                  : 'bg-white text-gray-800 border-pink-300 hover:scale-105'
              }`}
            >
              <span className="text-2xl">🏡</span>
              <span className="text-[11px] font-bold mt-1 whitespace-nowrap">Kitty's Bakery</span>
            </button>

            {/* 2. Apple Orchard (Top-Left) */}
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setSelectedLandmarkId('apple_orchard');
              }}
              className={`absolute top-8 left-12 p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-md flex flex-col items-center ${
                selectedLandmarkId === 'apple_orchard'
                  ? 'bg-red-500 text-white border-white scale-110 ring-4 ring-red-200 z-20'
                  : 'bg-white text-gray-800 border-pink-300 hover:scale-105'
              }`}
            >
              <span className="text-2xl">🍎</span>
              <span className="text-[11px] font-bold mt-1 whitespace-nowrap">Apple Orchard</span>
            </button>

            {/* 3. Blossom Meadow (Bottom-Center) */}
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setSelectedLandmarkId('mariland_meadow');
              }}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-md flex flex-col items-center ${
                selectedLandmarkId === 'mariland_meadow'
                  ? 'bg-red-500 text-white border-white scale-110 ring-4 ring-red-200 z-20'
                  : 'bg-white text-gray-800 border-pink-300 hover:scale-105'
              }`}
            >
              <span className="text-2xl">🌷</span>
              <span className="text-[11px] font-bold mt-1 whitespace-nowrap">Blossom Meadow</span>
            </button>

            {/* 4. Donut Pond (Bottom-Right) */}
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setSelectedLandmarkId('donut_pond');
              }}
              className={`absolute bottom-8 right-10 p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-md flex flex-col items-center ${
                selectedLandmarkId === 'donut_pond'
                  ? 'bg-red-500 text-white border-white scale-110 ring-4 ring-red-200 z-20'
                  : 'bg-white text-gray-800 border-pink-300 hover:scale-105'
              }`}
            >
              <span className="text-2xl">🐸</span>
              <span className="text-[11px] font-bold mt-1 whitespace-nowrap">Donut Pond</span>
            </button>

            {/* 5. Cloud Terrace (Top-Right) */}
            <button
              onClick={() => {
                kawaiiAudio.playPop();
                setSelectedLandmarkId('cloud_observatory');
              }}
              className={`absolute top-6 right-16 p-3 rounded-2xl border-2 transition-all cursor-pointer shadow-md flex flex-col items-center ${
                selectedLandmarkId === 'cloud_observatory'
                  ? 'bg-red-500 text-white border-white scale-110 ring-4 ring-red-200 z-20'
                  : 'bg-white text-gray-800 border-pink-300 hover:scale-105'
              }`}
            >
              <span className="text-2xl">☁️</span>
              <span className="text-[11px] font-bold mt-1 whitespace-nowrap">Cloud Terrace</span>
            </button>
          </div>

          <div className="text-center text-[11px] text-pink-700/80 font-semibold">
            ✨ Tip: Each village landmark has fresh seasonal ingredients and friendly visitors!
          </div>
        </div>

        {/* Right: Landmark Details Card (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-pink-200 shadow-sm flex flex-col justify-between gap-5">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 border border-pink-200 flex items-center justify-center text-3xl shadow-inner">
                {landmark.icon}
              </div>
              <div>
                <span className="text-[11px] font-bold text-pink-500 uppercase tracking-wider">
                  Sanrio Village Destination
                </span>
                <h3 className="text-xl font-bold font-display text-gray-800">
                  {landmark.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              {landmark.description}
            </p>

            {/* Stats Breakdown */}
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-pink-50/60 border border-pink-100">
                <Clock className="w-4 h-4 text-pink-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-800">Hours: </span>
                  <span className="text-gray-600">{landmark.hours}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-amber-50/60 border border-amber-100">
                <Heart className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-800">Signature Treat: </span>
                  <span className="text-amber-800">{landmark.specialty}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-purple-50/60 border border-purple-100">
                <Users className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-800">Friendly Visitors: </span>
                  <span className="text-purple-800">{landmark.visitors}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Jump button */}
          <div className="pt-4 border-t border-pink-100">
            {landmark.id === 'apple_orchard' && (
              <button
                onClick={() => {
                  kawaiiAudio.playPop();
                  onGoToOrchard();
                }}
                className="w-full py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>🍎 Go to Orchard (Play Apple Catcher)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {landmark.id === 'cottage_bakery' && (
              <button
                onClick={() => {
                  kawaiiAudio.playPop();
                  onGoToBakery();
                }}
                className="w-full py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>🥧 Enter Bakery Kitchen (Pastry Rush)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {landmark.id !== 'apple_orchard' && landmark.id !== 'cottage_bakery' && (
              <button
                onClick={() => {
                  kawaiiAudio.playPop();
                  onGoToCharacters();
                }}
                className="w-full py-3 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>🌸 Meet Friends at this Landmark</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
