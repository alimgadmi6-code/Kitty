import React from 'react';
import { PolaroidPhoto } from '../types';
import { KittySvg } from './KittySvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import { X, Trash2, Camera, Sparkles, Heart } from 'lucide-react';

interface PhotoAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: PolaroidPhoto[];
  onDeletePhoto: (id: string) => void;
  onGoToStudio: () => void;
}

export const PhotoAlbumModal: React.FC<PhotoAlbumModalProps> = ({
  isOpen,
  onClose,
  album,
  onDeletePhoto,
  onGoToStudio,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col border-4 border-pink-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
          <div className="flex items-center gap-2">
            <span className="text-xl">📸</span>
            <h3 className="font-bold font-display text-red-600 text-lg">
              Hello Kitty's Memory Album
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pink-200 text-pink-800 font-bold">
              {album.length} {album.length === 1 ? 'Snapshot' : 'Snapshots'}
            </span>
          </div>

          <button
            onClick={() => {
              kawaiiAudio.playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center text-pink-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {album.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-pink-50 border border-pink-200 flex items-center justify-center text-3xl mb-3">
                📷
              </div>
              <h4 className="font-bold text-gray-800 text-base mb-1">Your Album is Empty!</h4>
              <p className="text-xs text-gray-500 max-w-sm mb-4">
                Dress up Hello Kitty with cute ribbons, hats, and dresses, then snap a lovely polaroid memory!
              </p>
              <button
                onClick={() => {
                  kawaiiAudio.playPop();
                  onClose();
                  onGoToStudio();
                }}
                className="px-5 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Visit Photo Booth</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {album.map((photo) => (
                <div
                  key={photo.id}
                  className="bg-white rounded-2xl p-3 border-2 border-pink-200 shadow-sm flex flex-col items-center relative group hover:shadow-md transition-shadow"
                >
                  {/* Delete button */}
                  <button
                    onClick={() => {
                      kawaiiAudio.playPop();
                      onDeletePhoto(photo.id);
                    }}
                    title="Delete photo"
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center shadow-xs transition-colors cursor-pointer z-20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Polaroid Frame */}
                  <div className="w-full aspect-square bg-gradient-to-b from-pink-100 via-rose-50 to-amber-50 rounded-xl overflow-hidden border border-pink-200 flex items-center justify-center relative shadow-inner">
                    <KittySvg
                      size={150}
                      bowId={photo.outfit.bowId}
                      outfitId={photo.outfit.outfitId}
                      handheldId={photo.outfit.handheldId}
                      expression="happy"
                    />
                    {/* Sticker stamp */}
                    <span className="absolute top-2 left-2 text-2xl drop-shadow-xs">
                      {photo.sticker}
                    </span>
                  </div>

                  {/* Polaroid text bottom caption */}
                  <div className="w-full mt-2 text-center">
                    <p className="text-xs font-bold text-gray-800 line-clamp-1">{photo.caption}</p>
                    <p className="text-[10px] text-pink-400 mt-0.5">{photo.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
