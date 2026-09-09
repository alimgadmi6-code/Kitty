import React from 'react';

interface KittySvgProps {
  className?: string;
  size?: number;
  bowId?: string;
  outfitId?: string;
  handheldId?: string;
  expression?: 'normal' | 'happy' | 'wink' | 'baking' | 'eating';
  isExcited?: boolean;
}

export const KittySvg: React.FC<KittySvgProps> = ({
  className = '',
  size = 200,
  bowId = 'bow_classic',
  outfitId = 'outfit_classic',
  handheldId = 'hand_apple',
  expression = 'normal',
  isExcited = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={`${className} ${isExcited ? 'animate-bounce' : ''}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Soft drop shadow */}
        <filter id="kitty-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#f48fb1" floodOpacity="0.3" />
        </filter>
        <radialGradient id="blush-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff70a6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff70a6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g filter="url(#kitty-shadow)">
        {/* Ground shadow */}
        <ellipse cx="120" cy="228" rx="65" ry="8" fill="#ffccd5" opacity="0.6" />

        {/* Feet / Paws */}
        <ellipse cx="98" cy="220" rx="18" ry="10" fill="#ffffff" stroke="#2b2326" strokeWidth="4.5" />
        <ellipse cx="142" cy="220" rx="18" ry="10" fill="#ffffff" stroke="#2b2326" strokeWidth="4.5" />

        {/* Body Base & Outfits */}
        {/* Underbody / Shirt */}
        <path
          d="M78 152 C78 135, 162 135, 162 152 L172 216 C172 222, 68 222, 68 216 Z"
          fill="#ffffff"
          stroke="#2b2326"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Outfits Switcher */}
        {outfitId === 'outfit_classic' && (
          <g id="outfit-classic-overalls">
            {/* Yellow inner shirt */}
            <path d="M80 148 C95 142, 145 142, 160 148 L166 182 L74 182 Z" fill="#ffde59" />
            {/* Blue Overalls */}
            <path
              d="M74 175 C74 168, 166 168, 166 175 L170 216 C170 220, 70 220, 70 216 Z"
              fill="#2563eb"
              stroke="#2b2326"
              strokeWidth="4"
            />
            {/* Overall Straps */}
            <path d="M88 150 L92 178" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
            <path d="M152 150 L148 178" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
            <circle cx="92" cy="177" r="3.5" fill="#fef08a" stroke="#2b2326" strokeWidth="1.5" />
            <circle cx="148" cy="177" r="3.5" fill="#fef08a" stroke="#2b2326" strokeWidth="1.5" />
          </g>
        )}

        {outfitId === 'outfit_apron' && (
          <g id="outfit-baker-apron">
            {/* Pink gingham shirt */}
            <path d="M80 148 C95 142, 145 142, 160 148 L166 216 L74 216 Z" fill="#ffccd5" />
            {/* Red Baker Apron */}
            <path
              d="M92 158 L148 158 L154 214 C154 218, 86 218, 86 214 Z"
              fill="#e63946"
              stroke="#2b2326"
              strokeWidth="3.5"
            />
            <path d="M96 158 L96 146" stroke="#e63946" strokeWidth="7" strokeLinecap="round" />
            <path d="M144 158 L144 146" stroke="#e63946" strokeWidth="7" strokeLinecap="round" />
            {/* Apron Pocket with Heart */}
            <rect x="106" y="185" width="28" height="20" rx="4" fill="#ffffff" stroke="#2b2326" strokeWidth="2" />
            <path d="M116 195 C116 191, 124 191, 120 198 Z" fill="#e63946" />
          </g>
        )}

        {outfitId === 'outfit_strawberry' && (
          <g id="outfit-strawberry-dress">
            {/* Strawberry Pink Ruffle Dress */}
            <path
              d="M80 150 C95 144, 145 144, 160 150 L174 212 C174 218, 66 218, 66 212 Z"
              fill="#ff4d6d"
              stroke="#2b2326"
              strokeWidth="4"
            />
            {/* White polka dots */}
            <circle cx="95" cy="170" r="3.5" fill="#ffffff" />
            <circle cx="145" cy="170" r="3.5" fill="#ffffff" />
            <circle cx="120" cy="185" r="3.5" fill="#ffffff" />
            <circle cx="85" cy="198" r="3.5" fill="#ffffff" />
            <circle cx="155" cy="198" r="3.5" fill="#ffffff" />
            <circle cx="120" cy="208" r="3.5" fill="#ffffff" />
            {/* Ruffle hem */}
            <path d="M66 212 Q90 220 120 216 Q150 220 174 212" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          </g>
        )}

        {outfitId === 'outfit_kimono' && (
          <g id="outfit-kimono">
            <path
              d="M76 150 C90 144, 150 144, 164 150 L172 216 L68 216 Z"
              fill="#ff99c8"
              stroke="#2b2326"
              strokeWidth="4"
            />
            {/* Kimono crossover */}
            <path d="M88 150 L140 185" stroke="#ffffff" strokeWidth="4" />
            <path d="M152 150 L100 185" stroke="#ffffff" strokeWidth="4" />
            {/* Red Obi Sash */}
            <rect x="76" y="180" width="88" height="18" fill="#d90429" stroke="#2b2326" strokeWidth="3" rx="3" />
            <rect x="110" y="177" width="20" height="24" fill="#ffd166" stroke="#2b2326" strokeWidth="2" rx="2" />
          </g>
        )}

        {outfitId === 'outfit_princess' && (
          <g id="outfit-princess">
            <path
              d="M74 150 C90 144, 150 144, 166 150 L178 216 L62 216 Z"
              fill="#d8b4e2"
              stroke="#2b2326"
              strokeWidth="4"
            />
            <path d="M100 152 L120 175 L140 152" fill="#ffd166" stroke="#2b2326" strokeWidth="2" />
            <path d="M64 212 C90 205, 150 205, 176 212" stroke="#fbcfe8" strokeWidth="8" />
          </g>
        )}

        {outfitId === 'outfit_sweater' && (
          <g id="outfit-cloud-sweater">
            <path
              d="M72 150 C90 142, 150 142, 168 150 L174 216 L66 216 Z"
              fill="#bde0fe"
              stroke="#2b2326"
              strokeWidth="4"
            />
            <path d="M95 180 C95 174, 110 174, 115 180 C120 174, 135 174, 135 180 C135 188, 95 188, 95 180 Z" fill="#ffffff" />
          </g>
        )}

        {/* Arms and Hands */}
        {/* Left Arm */}
        <ellipse cx="66" cy="180" rx="14" ry="12" fill="#ffffff" stroke="#2b2326" strokeWidth="4.5" />
        {/* Right Arm */}
        <ellipse cx="174" cy="180" rx="14" ry="12" fill="#ffffff" stroke="#2b2326" strokeWidth="4.5" />

        {/* Head Base */}
        <path
          d="
            M65 55
            C48 25, 62 10, 85 30
            C105 24, 135 24, 155 30
            C178 10, 192 25, 175 55
            C205 75, 212 110, 195 135
            C180 155, 60 155, 45 135
            C28 110, 35 75, 65 55
            Z
          "
          fill="#ffffff"
          stroke="#2b2326"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Soft Cheeks Blush */}
        <circle cx="56" cy="108" r="14" fill="url(#blush-grad)" />
        <circle cx="184" cy="108" r="14" fill="url(#blush-grad)" />

        {/* Whiskers (3 on left, 3 on right) */}
        {/* Left side whiskers */}
        <line x1="28" y1="92" x2="62" y2="96" stroke="#2b2326" strokeWidth="4" strokeLinecap="round" />
        <line x1="24" y1="106" x2="60" y2="106" stroke="#2b2326" strokeWidth="4" strokeLinecap="round" />
        <line x1="30" y1="120" x2="64" y2="116" stroke="#2b2326" strokeWidth="4" strokeLinecap="round" />

        {/* Right side whiskers */}
        <line x1="212" y1="92" x2="178" y2="96" stroke="#2b2326" strokeWidth="4" strokeLinecap="round" />
        <line x1="216" y1="106" x2="180" y2="106" stroke="#2b2326" strokeWidth="4" strokeLinecap="round" />
        <line x1="210" y1="120" x2="176" y2="116" stroke="#2b2326" strokeWidth="4" strokeLinecap="round" />

        {/* Eyes */}
        {expression === 'wink' ? (
          <>
            {/* Left eye wink */}
            <path d="M78 98 Q88 108 98 98" stroke="#2b2326" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Right eye normal */}
            <ellipse cx="148" cy="98" rx="6.5" ry="9" fill="#2b2326" />
          </>
        ) : expression === 'happy' ? (
          <>
            {/* Happy squint eyes */}
            <path d="M78 100 Q88 90 98 100" stroke="#2b2326" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M138 100 Q148 90 158 100" stroke="#2b2326" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          <>
            {/* Classic Oval Eyes */}
            <ellipse cx="88" cy="98" rx="6.5" ry="9" fill="#2b2326" />
            <ellipse cx="148" cy="98" rx="6.5" ry="9" fill="#2b2326" />
            <circle cx="86" cy="95" r="2.2" fill="#ffffff" />
            <circle cx="146" cy="95" r="2.2" fill="#ffffff" />
          </>
        )}

        {/* Nose - Classic Yellow Oval */}
        <ellipse cx="118" cy="110" rx="7.5" ry="5.5" fill="#fcd34d" stroke="#2b2326" strokeWidth="3" />

        {/* Bows and Head Accessories (placed on Kitty's left ear, viewer's right side) */}
        {bowId === 'bow_classic' && (
          <g id="bow-classic" transform="translate(160, 42) rotate(12)">
            {/* Left loop */}
            <ellipse cx="-18" cy="0" rx="16" ry="12" fill="#e63946" stroke="#2b2326" strokeWidth="4" />
            {/* Right loop */}
            <ellipse cx="18" cy="0" rx="16" ry="12" fill="#e63946" stroke="#2b2326" strokeWidth="4" />
            {/* Center knot */}
            <circle cx="0" cy="0" r="10" fill="#d90429" stroke="#2b2326" strokeWidth="4" />
          </g>
        )}

        {bowId === 'bow_polka' && (
          <g id="bow-polka" transform="translate(160, 42) rotate(12)">
            <ellipse cx="-18" cy="0" rx="16" ry="12" fill="#ff758f" stroke="#2b2326" strokeWidth="4" />
            <circle cx="-18" cy="-2" r="3" fill="#ffffff" />
            <circle cx="-24" cy="4" r="2.5" fill="#ffffff" />
            <ellipse cx="18" cy="0" rx="16" ry="12" fill="#ff758f" stroke="#2b2326" strokeWidth="4" />
            <circle cx="18" cy="-2" r="3" fill="#ffffff" />
            <circle cx="24" cy="4" r="2.5" fill="#ffffff" />
            <circle cx="0" cy="0" r="10" fill="#ff4d6d" stroke="#2b2326" strokeWidth="4" />
          </g>
        )}

        {bowId === 'bow_chef' && (
          <g id="bow-chef-hat" transform="translate(145, 15)">
            <path
              d="M-22 30 C-35 15, -20 -15, 0 -12 C15 -25, 35 5, 26 30 Z"
              fill="#ffffff"
              stroke="#2b2326"
              strokeWidth="4"
            />
            <rect x="-24" y="26" width="52" height="12" rx="4" fill="#e63946" stroke="#2b2326" strokeWidth="3" />
          </g>
        )}

        {bowId === 'bow_crown' && (
          <g id="bow-crown" transform="translate(160, 35)">
            <path
              d="M-20 15 L-24 -10 L-10 2 L0 -15 L10 2 L24 -10 L20 15 Z"
              fill="#ffd166"
              stroke="#2b2326"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <circle cx="0" cy="-15" r="3" fill="#ff4d6d" />
            <circle cx="-24" cy="-10" r="2.5" fill="#06d6a0" />
            <circle cx="24" cy="-10" r="2.5" fill="#118ab2" />
          </g>
        )}

        {bowId === 'bow_flowers' && (
          <g id="bow-flowers" transform="translate(162, 40)">
            <circle cx="-14" cy="0" r="10" fill="#ff99c8" stroke="#2b2326" strokeWidth="3" />
            <circle cx="-14" cy="0" r="3" fill="#ffe066" />
            <circle cx="14" cy="0" r="10" fill="#ff99c8" stroke="#2b2326" strokeWidth="3" />
            <circle cx="14" cy="0" r="3" fill="#ffe066" />
            <circle cx="0" cy="-8" r="11" fill="#f4a261" stroke="#2b2326" strokeWidth="3" />
            <circle cx="0" cy="-8" r="3.5" fill="#ffffff" />
          </g>
        )}

        {bowId === 'bow_gothic' && (
          <g id="bow-gothic" transform="translate(160, 42) rotate(12)">
            <ellipse cx="-18" cy="0" rx="16" ry="12" fill="#2d003b" stroke="#2b2326" strokeWidth="4" />
            <ellipse cx="18" cy="0" rx="16" ry="12" fill="#2d003b" stroke="#2b2326" strokeWidth="4" />
            <circle cx="0" cy="0" r="9" fill="#ff0054" stroke="#2b2326" strokeWidth="3.5" />
            {/* Tiny skull motif */}
            <circle cx="-2" cy="-1" r="1.5" fill="#ffffff" />
            <circle cx="2" cy="-1" r="1.5" fill="#ffffff" />
          </g>
        )}

        {/* Handheld Accessories (Held in right hand, viewer's right) */}
        {handheldId === 'hand_apple' && (
          <g id="hand-apple" transform="translate(182, 175)">
            <circle cx="0" cy="4" r="14" fill="#e63946" stroke="#2b2326" strokeWidth="3.5" />
            <path d="M0 -8 C0 -14, 8 -16, 8 -12" stroke="#6b705c" strokeWidth="3" strokeLinecap="round" fill="none" />
            <ellipse cx="6" cy="-12" rx="5" ry="3" fill="#588157" />
            <circle cx="-4" cy="0" r="3" fill="#ffffff" opacity="0.6" />
          </g>
        )}

        {handheldId === 'hand_pie' && (
          <g id="hand-pie" transform="translate(182, 176)">
            {/* Golden pie slice */}
            <path d="M-10 14 L16 14 L18 -4 L-12 2 Z" fill="#ddb892" stroke="#2b2326" strokeWidth="3" />
            <path d="M-12 2 Q4 -4 18 -4" stroke="#7f4f24" strokeWidth="4" strokeLinecap="round" />
            <circle cx="4" cy="6" r="3" fill="#e63946" />
            <circle cx="10" cy="8" r="2.5" fill="#e63946" />
          </g>
        )}

        {handheldId === 'hand_whisk' && (
          <g id="hand-whisk" transform="translate(186, 170) rotate(-20)">
            <rect x="-3" y="10" width="6" height="24" rx="2" fill="#ddb892" stroke="#2b2326" strokeWidth="2.5" />
            <ellipse cx="0" cy="-2" rx="10" ry="14" fill="none" stroke="#6c757d" strokeWidth="3" />
            <line x1="0" y1="-16" x2="0" y2="12" stroke="#6c757d" strokeWidth="2.5" />
          </g>
        )}

        {handheldId === 'hand_teddy' && (
          <g id="hand-teddy" transform="translate(185, 178)">
            {/* Tiny Chum Bear */}
            <ellipse cx="0" cy="6" rx="12" ry="14" fill="#ffb703" stroke="#2b2326" strokeWidth="3" />
            <circle cx="0" cy="-6" r="10" fill="#ffb703" stroke="#2b2326" strokeWidth="3" />
            <circle cx="-8" cy="-14" r="4.5" fill="#fb8500" stroke="#2b2326" strokeWidth="2.5" />
            <circle cx="8" cy="-14" r="4.5" fill="#fb8500" stroke="#2b2326" strokeWidth="2.5" />
            <circle cx="-3" cy="-7" r="1.5" fill="#2b2326" />
            <circle cx="3" cy="-7" r="1.5" fill="#2b2326" />
            <ellipse cx="0" cy="-3" rx="3.5" ry="2.5" fill="#ffffff" />
            <circle cx="0" cy="-4" r="1.2" fill="#2b2326" />
          </g>
        )}

        {handheldId === 'hand_boba' && (
          <g id="hand-boba" transform="translate(184, 174)">
            <path d="M-9 -10 L-7 14 C-7 18, 7 18, 7 14 L9 -10 Z" fill="#ffccd5" stroke="#2b2326" strokeWidth="3" />
            {/* Straw */}
            <line x1="0" y1="-18" x2="0" y2="12" stroke="#ff4d6d" strokeWidth="4" strokeLinecap="round" />
            {/* Pearls */}
            <circle cx="-3" cy="12" r="2.2" fill="#2b2326" />
            <circle cx="2" cy="13" r="2.2" fill="#2b2326" />
            <circle cx="0" cy="8" r="2.2" fill="#2b2326" />
          </g>
        )}

        {handheldId === 'hand_wand' && (
          <g id="hand-wand" transform="translate(186, 168) rotate(-15)">
            <line x1="0" y1="-10" x2="0" y2="30" stroke="#ffd166" strokeWidth="4" strokeLinecap="round" />
            <path
              d="M0 -22 L4 -14 L12 -14 L6 -8 L8 0 L0 -5 L-8 0 L-6 -8 L-12 -14 L-4 -14 Z"
              fill="#ff006e"
              stroke="#2b2326"
              strokeWidth="2.5"
            />
          </g>
        )}
      </g>
    </svg>
  );
};
