import React from 'react';

interface FriendSvgProps {
  friendId: string;
  size?: number;
  className?: string;
  isHappy?: boolean;
}

export const FriendSvg: React.FC<FriendSvgProps> = ({
  friendId,
  size = 120,
  className = '',
  isHappy = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      className={`${className} ${isHappy ? 'animate-bounce' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`blush-${friendId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff70a6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff70a6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground soft shadow */}
      <ellipse cx="80" cy="150" rx="42" ry="6" fill="#fbcfe8" opacity="0.5" />

      {/* MY MELODY */}
      {friendId === 'melody' && (
        <g id="friend-melody">
          {/* Pink Hood */}
          {/* Hood Ears */}
          <path d="M48 65 C25 25, 30 -5, 52 10 C62 18, 65 40, 60 65 Z" fill="#ff758f" stroke="#2b2326" strokeWidth="3.5" />
          <path d="M112 65 C135 25, 130 -5, 108 10 C98 18, 95 40, 100 65 Z" fill="#ff758f" stroke="#2b2326" strokeWidth="3.5" />
          {/* Hood Head */}
          <circle cx="80" cy="72" r="50" fill="#ff758f" stroke="#2b2326" strokeWidth="3.5" />
          {/* Face opening */}
          <ellipse cx="80" cy="78" rx="34" ry="30" fill="#ffffff" stroke="#2b2326" strokeWidth="3.5" />
          {/* Flower on left ear */}
          <circle cx="48" cy="40" r="10" fill="#ffffff" stroke="#2b2326" strokeWidth="2.5" />
          <circle cx="48" cy="40" r="4" fill="#ffd166" />
          {/* Eyes & Nose */}
          <ellipse cx="68" cy="78" rx="3.5" ry="5.5" fill="#2b2326" />
          <ellipse cx="92" cy="78" rx="3.5" ry="5.5" fill="#2b2326" />
          <ellipse cx="80" cy="85" rx="4.5" ry="3.5" fill="#ffd166" stroke="#2b2326" strokeWidth="2" />
          {/* Blushes */}
          <circle cx="60" cy="85" r="7" fill={`url(#blush-${friendId})`} />
          <circle cx="100" cy="85" r="7" fill={`url(#blush-${friendId})`} />
          {/* Body */}
          <path d="M60 115 C60 105, 100 105, 100 115 L106 145 L54 145 Z" fill="#ffccd5" stroke="#2b2326" strokeWidth="3.5" />
          <ellipse cx="68" cy="146" rx="10" ry="5" fill="#ffffff" stroke="#2b2326" strokeWidth="3" />
          <ellipse cx="92" cy="146" rx="10" ry="5" fill="#ffffff" stroke="#2b2326" strokeWidth="3" />
        </g>
      )}

      {/* CINNAMOROLL */}
      {friendId === 'cinnamoroll' && (
        <g id="friend-cinnamoroll">
          {/* Floppy Long Ears */}
          <path
            d="M50 78 C20 70, 5 95, 18 115 C26 126, 48 115, 52 95 Z"
            fill="#ffffff"
            stroke="#2b2326"
            strokeWidth="3.5"
          />
          <path
            d="M110 78 C140 70, 155 95, 142 115 C134 126, 112 115, 108 95 Z"
            fill="#ffffff"
            stroke="#2b2326"
            strokeWidth="3.5"
          />
          {/* Chubby Body */}
          <ellipse cx="80" cy="120" rx="28" ry="24" fill="#ffffff" stroke="#2b2326" strokeWidth="3.5" />
          <ellipse cx="68" cy="144" rx="9" ry="6" fill="#ffffff" stroke="#2b2326" strokeWidth="3" />
          <ellipse cx="92" cy="144" rx="9" ry="6" fill="#ffffff" stroke="#2b2326" strokeWidth="3" />
          {/* Chubby Head */}
          <ellipse cx="80" cy="74" rx="46" ry="34" fill="#ffffff" stroke="#2b2326" strokeWidth="3.5" />
          {/* Big blue eyes */}
          <ellipse cx="64" cy="74" rx="4.5" ry="6.5" fill="#3a86ff" />
          <circle cx="62" cy="71" r="1.8" fill="#ffffff" />
          <ellipse cx="96" cy="74" rx="4.5" ry="6.5" fill="#3a86ff" />
          <circle cx="94" cy="71" r="1.8" fill="#ffffff" />
          {/* Mouth */}
          <path d="M74 84 Q80 88 86 84" stroke="#2b2326" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Pink Cheeks */}
          <circle cx="56" cy="80" r="9" fill={`url(#blush-${friendId})`} />
          <circle cx="104" cy="80" r="9" fill={`url(#blush-${friendId})`} />
        </g>
      )}

      {/* POMPOMPURIN */}
      {friendId === 'purin' && (
        <g id="friend-purin">
          {/* Body */}
          <ellipse cx="80" cy="116" rx="36" ry="28" fill="#ffea79" stroke="#2b2326" strokeWidth="3.5" />
          <ellipse cx="66" cy="144" rx="10" ry="6" fill="#ffea79" stroke="#2b2326" strokeWidth="3" />
          <ellipse cx="94" cy="144" rx="10" ry="6" fill="#ffea79" stroke="#2b2326" strokeWidth="3" />
          {/* Floppy Ears */}
          <ellipse cx="44" cy="75" rx="8" ry="18" fill="#ffea79" stroke="#2b2326" strokeWidth="3" transform="rotate(25, 44, 75)" />
          <ellipse cx="116" cy="75" rx="8" ry="18" fill="#ffea79" stroke="#2b2326" strokeWidth="3" transform="rotate(-25, 116, 75)" />
          {/* Big Round Head */}
          <ellipse cx="80" cy="76" rx="44" ry="36" fill="#ffea79" stroke="#2b2326" strokeWidth="3.5" />
          {/* Brown Beret */}
          <ellipse cx="80" cy="44" rx="24" ry="11" fill="#6f4e37" stroke="#2b2326" strokeWidth="3" />
          <rect x="78" y="32" width="4" height="6" fill="#6f4e37" stroke="#2b2326" strokeWidth="1.5" />
          {/* Eyes & Nose */}
          <ellipse cx="68" cy="76" rx="3.5" ry="4" fill="#2b2326" />
          <ellipse cx="92" cy="76" rx="3.5" ry="4" fill="#2b2326" />
          <ellipse cx="80" cy="82" rx="4.5" ry="3.5" fill="#2b2326" />
          {/* W Mouth */}
          <path d="M72 88 Q76 92 80 88 Q84 92 88 88" stroke="#2b2326" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="58" cy="84" r="8" fill={`url(#blush-${friendId})`} />
          <circle cx="102" cy="84" r="8" fill={`url(#blush-${friendId})`} />
        </g>
      )}

      {/* KUROMI */}
      {friendId === 'kuromi' && (
        <g id="friend-kuromi">
          {/* Jester Hat Ears */}
          <path d="M42 62 C20 30, 25 10, 48 20 C56 25, 62 44, 58 62 Z" fill="#2b1a29" stroke="#2b2326" strokeWidth="3.5" />
          <circle cx="28" cy="18" r="4.5" fill="#ff007f" />
          <path d="M118 62 C140 30, 135 10, 112 20 C104 25, 98 44, 102 62 Z" fill="#2b1a29" stroke="#2b2326" strokeWidth="3.5" />
          <circle cx="132" cy="18" r="4.5" fill="#ff007f" />
          {/* Head with Hat */}
          <circle cx="80" cy="74" r="48" fill="#2b1a29" stroke="#2b2326" strokeWidth="3.5" />
          {/* Pink Skull on hat */}
          <ellipse cx="80" cy="46" rx="7" ry="6" fill="#ff007f" />
          <circle cx="78" cy="45" r="1.5" fill="#ffffff" />
          <circle cx="82" cy="45" r="1.5" fill="#ffffff" />
          {/* White face cutout */}
          <ellipse cx="80" cy="82" rx="34" ry="28" fill="#ffffff" stroke="#2b2326" strokeWidth="3.5" />
          {/* Mischievous eyes */}
          <path d="M64 78 Q70 74 74 81" stroke="#2b2326" strokeWidth="3" fill="none" />
          <ellipse cx="70" cy="80" rx="3.5" ry="4.5" fill="#2b2326" />
          <path d="M96 78 Q90 74 86 81" stroke="#2b2326" strokeWidth="3" fill="none" />
          <ellipse cx="90" cy="80" rx="3.5" ry="4.5" fill="#2b2326" />
          {/* Cute pointy nose and smirk */}
          <ellipse cx="80" cy="86" rx="2.5" ry="2" fill="#2b2326" />
          <path d="M77 91 Q81 94 85 90" stroke="#2b2326" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Jester collar & body */}
          <path d="M60 118 C60 108, 100 108, 100 118 L104 144 L56 144 Z" fill="#2b1a29" stroke="#2b2326" strokeWidth="3.5" />
          <circle cx="70" cy="120" r="3" fill="#ff007f" />
          <circle cx="80" cy="122" r="3" fill="#ff007f" />
          <circle cx="90" cy="120" r="3" fill="#ff007f" />
        </g>
      )}

      {/* KEROPPI */}
      {friendId === 'keroppi' && (
        <g id="friend-keroppi">
          {/* Frog Body */}
          <ellipse cx="80" cy="120" rx="30" ry="24" fill="#70e000" stroke="#2b2326" strokeWidth="3.5" />
          {/* Striped Shirt */}
          <rect x="58" y="108" width="44" height="24" rx="4" fill="#e63946" stroke="#2b2326" strokeWidth="3" />
          <line x1="68" y1="108" x2="68" y2="132" stroke="#ffffff" strokeWidth="4" />
          <line x1="80" y1="108" x2="80" y2="132" stroke="#ffffff" strokeWidth="4" />
          <line x1="92" y1="108" x2="92" y2="132" stroke="#ffffff" strokeWidth="4" />
          <ellipse cx="66" cy="144" rx="9" ry="5" fill="#70e000" stroke="#2b2326" strokeWidth="3" />
          <ellipse cx="94" cy="144" rx="9" ry="5" fill="#70e000" stroke="#2b2326" strokeWidth="3" />
          {/* Giant Round Frog Eyes on top */}
          <circle cx="58" cy="50" r="22" fill="#ffffff" stroke="#2b2326" strokeWidth="3.5" />
          <circle cx="102" cy="50" r="22" fill="#ffffff" stroke="#2b2326" strokeWidth="3.5" />
          {/* Pupils */}
          <circle cx="62" cy="50" r="5" fill="#2b2326" />
          <circle cx="98" cy="50" r="5" fill="#2b2326" />
          {/* Round Frog Face */}
          <ellipse cx="80" cy="78" rx="44" ry="32" fill="#70e000" stroke="#2b2326" strokeWidth="3.5" />
          {/* Iconic V mouth */}
          <path d="M72 82 L80 90 L88 82" stroke="#2b2326" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          {/* Rosy Cheeks */}
          <circle cx="52" cy="80" r="8" fill="#ff758f" opacity="0.7" />
          <circle cx="108" cy="80" r="8" fill="#ff758f" opacity="0.7" />
        </g>
      )}

      {/* HELLO KITTY AVATAR (if friend is kitty) */}
      {friendId === 'kitty' && (
        <g id="friend-kitty">
          <ellipse cx="80" cy="116" rx="28" ry="24" fill="#2563eb" stroke="#2b2326" strokeWidth="3.5" />
          <ellipse cx="68" cy="142" rx="10" ry="6" fill="#ffffff" stroke="#2b2326" strokeWidth="3" />
          <ellipse cx="92" cy="142" rx="10" ry="6" fill="#ffffff" stroke="#2b2326" strokeWidth="3" />
          <path
            d="M50 45 C40 28, 48 18, 62 30 C72 26, 88 26, 98 30 C112 18, 120 28, 110 45 C126 58, 130 80, 120 95 C110 108, 50 108, 40 95 C30 80, 34 58, 50 45 Z"
            fill="#ffffff"
            stroke="#2b2326"
            strokeWidth="3.5"
          />
          <ellipse cx="66" cy="74" rx="3.5" ry="5.5" fill="#2b2326" />
          <ellipse cx="94" cy="74" rx="3.5" ry="5.5" fill="#2b2326" />
          <ellipse cx="80" cy="80" rx="4.5" ry="3.5" fill="#fcd34d" stroke="#2b2326" strokeWidth="2" />
          {/* Whiskers */}
          <line x1="38" y1="72" x2="52" y2="74" stroke="#2b2326" strokeWidth="2.5" />
          <line x1="36" y1="80" x2="52" y2="80" stroke="#2b2326" strokeWidth="2.5" />
          <line x1="122" y1="72" x2="108" y2="74" stroke="#2b2326" strokeWidth="2.5" />
          <line x1="124" y1="80" x2="108" y2="80" stroke="#2b2326" strokeWidth="2.5" />
          {/* Red Bow */}
          <circle cx="106" cy="38" r="6" fill="#d90429" stroke="#2b2326" strokeWidth="2.5" />
          <ellipse cx="96" cy="38" rx="8" ry="6" fill="#e63946" stroke="#2b2326" strokeWidth="2.5" />
          <ellipse cx="116" cy="38" rx="8" ry="6" fill="#e63946" stroke="#2b2326" strokeWidth="2.5" />
        </g>
      )}
    </svg>
  );
};
