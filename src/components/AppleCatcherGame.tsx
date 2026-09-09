import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CatchItem } from '../types';
import { KittySvg } from './KittySvg';
import { kawaiiAudio } from '../audio/kawaiiAudio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Trophy, Play, RotateCcw, ArrowLeft, ArrowRight, Zap } from 'lucide-react';

interface AppleCatcherGameProps {
  onEarnCoins: (coins: number, apples: number) => void;
  highScore: number;
  onUpdateHighScore: (score: number) => void;
  activeBow: string;
  activeOutfit: string;
  onGoToBakery: () => void;
}

export const AppleCatcherGame: React.FC<AppleCatcherGameProps> = ({
  onEarnCoins,
  highScore,
  onUpdateHighScore,
  activeBow,
  activeOutfit,
  onGoToBakery,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [applesCaught, setApplesCaught] = useState<number>(0);
  const [lives, setLives] = useState<number>(3);
  const [feverGauge, setFeverGauge] = useState<number>(0); // 0 to 100
  const [isFeverActive, setIsFeverActive] = useState<boolean>(false);
  const [combo, setCombo] = useState<number>(0);
  const [comboText, setComboText] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const kittyXRef = useRef<number>(50); // percentage 0 to 100
  const [kittyX, setKittyX] = useState<number>(50);
  const itemsRef = useRef<CatchItem[]>([]);
  const [, setRerenderToggle] = useState<number>(0);
  const requestRef = useRef<number | null>(null);
  const lastSpawnTime = useRef<number>(0);
  const feverTimerRef = useRef<number | null>(null);

  // Keyboard controls
  const keysPressed = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Handle pointer / touch movement
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlaying || isGameOver || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(10, Math.min(90, x));
    kittyXRef.current = clampedX;
    setKittyX(clampedX);
  };

  // Trigger Fever Mode
  const triggerFever = useCallback(() => {
    setIsFeverActive(true);
    setFeverGauge(100);
    kawaiiAudio.playFever();
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }

    if (feverTimerRef.current) clearTimeout(feverTimerRef.current);
    feverTimerRef.current = window.setTimeout(() => {
      setIsFeverActive(false);
      setFeverGauge(0);
    }, 8000);
  }, []);

  // Start game
  const startGame = () => {
    setScore(0);
    setApplesCaught(0);
    setLives(3);
    setFeverGauge(0);
    setIsFeverActive(false);
    setCombo(0);
    setComboText('');
    itemsRef.current = [];
    setIsGameOver(false);
    setIsPlaying(true);
    kittyXRef.current = 50;
    setKittyX(50);
    kawaiiAudio.playPop();
  };

  // Main game loop
  const updateGame = useCallback((time: number) => {
    if (!isPlaying || isGameOver) return;

    // Move kitty with keys
    if (keysPressed.current.left) {
      kittyXRef.current = Math.max(10, kittyXRef.current - 1.6);
      setKittyX(kittyXRef.current);
    }
    if (keysPressed.current.right) {
      kittyXRef.current = Math.min(90, kittyXRef.current + 1.6);
      setKittyX(kittyXRef.current);
    }

    // Spawn falling items
    const spawnInterval = isFeverActive ? 280 : 650;
    if (time - lastSpawnTime.current > spawnInterval) {
      lastSpawnTime.current = time;

      const randomTypeRoll = Math.random();
      let type: CatchItem['type'] = 'apple';
      let points = 10;
      let isHazard = false;

      if (isFeverActive) {
        // Fever mode spawns only lovely rewards!
        if (randomTypeRoll < 0.4) {
          type = 'golden_apple';
          points = 30;
        } else if (randomTypeRoll < 0.7) {
          type = 'star';
          points = 50;
        } else {
          type = 'strawberry';
          points = 20;
        }
      } else {
        if (randomTypeRoll < 0.45) {
          type = 'apple';
          points = 10;
        } else if (randomTypeRoll < 0.62) {
          type = 'strawberry';
          points = 20;
        } else if (randomTypeRoll < 0.75) {
          type = 'ribbon';
          points = 25;
        } else if (randomTypeRoll < 0.85) {
          type = 'golden_apple';
          points = 30;
        } else if (randomTypeRoll < 0.94) {
          type = 'cloud';
          points = 0;
          isHazard = true;
        } else {
          type = 'clock';
          points = 0;
          isHazard = true;
        }
      }

      const newItem: CatchItem = {
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: -5,
        speed: (isFeverActive ? 1.0 : 0.65) + Math.random() * 0.4,
        type,
        points,
        isHazard,
        size: type === 'star' || type === 'golden_apple' ? 36 : 30,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 4,
      };

      itemsRef.current.push(newItem);
    }

    // Move items & detect catch collisions
    const kittyLeft = kittyXRef.current - 9;
    const kittyRight = kittyXRef.current + 9;
    const basketY = 82; // percentage where basket catches items

    const remainingItems: CatchItem[] = [];

    for (let i = 0; i < itemsRef.current.length; i++) {
      const item = itemsRef.current[i];
      item.y += item.speed;
      item.rotation += item.rotationSpeed;

      // Check collision with Kitty's basket
      if (item.y >= basketY - 4 && item.y <= basketY + 8) {
        if (item.x >= kittyLeft && item.x <= kittyRight) {
          // CAUGHT!
          if (item.isHazard) {
            // Hazard hit
            kawaiiAudio.playHazard();
            setLives((prev) => {
              const nextLives = prev - 1;
              if (nextLives <= 0) {
                setIsGameOver(true);
                setIsPlaying(false);
              }
              return Math.max(0, nextLives);
            });
            setCombo(0);
            setComboText('Ouch!');
          } else {
            // Reward caught!
            const multiplier = isFeverActive ? 2 : 1;
            const earnedPts = item.points * multiplier;
            setScore((s) => s + earnedPts);

            if (item.type === 'apple' || item.type === 'golden_apple') {
              setApplesCaught((a) => a + (item.type === 'golden_apple' ? 3 : 1));
            }

            // Fever charge
            if (!isFeverActive) {
              setFeverGauge((g) => {
                const nextGauge = g + (item.type === 'ribbon' ? 25 : 8);
                if (nextGauge >= 100) {
                  triggerFever();
                  return 100;
                }
                return nextGauge;
              });
            }

            // Audio & Combo
            kawaiiAudio.playCatch(1 + (combo % 8) * 0.08);
            setCombo((c) => {
              const newC = c + 1;
              if (newC >= 15) setComboText('✨ MAGNIFIQUE! ✨');
              else if (newC >= 10) setComboText('💖 SUPER KAWAII! 💖');
              else if (newC >= 5) setComboText('🎀 SWEET COMBO! 🎀');
              else setComboText('Yummy!');
              return newC;
            });
          }
          continue; // item consumed
        }
      }

      // Check if dropped past bottom
      if (item.y < 105) {
        remainingItems.push(item);
      } else if (!item.isHazard && !isFeverActive && (item.type === 'apple' || item.type === 'golden_apple')) {
        // Missed apple breaks combo
        setCombo(0);
      }
    }

    itemsRef.current = remainingItems;
    setRerenderToggle((prev) => prev + 1);

    if (isPlaying && !isGameOver) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
  }, [isPlaying, isGameOver, isFeverActive, combo, triggerFever]);

  useEffect(() => {
    if (isPlaying && !isGameOver) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, isGameOver, updateGame]);

  // Handle Game Over scoring
  useEffect(() => {
    if (isGameOver) {
      const earnedCoins = Math.floor(score * 0.4) + applesCaught * 2;
      onEarnCoins(earnedCoins, applesCaught);
      if (score > highScore) {
        onUpdateHighScore(score);
        kawaiiAudio.playSuccess();
        try {
          confetti({ particleCount: 70, spread: 90 });
        } catch {
          // ignore
        }
      }
    }
  }, [isGameOver, score, applesCaught, highScore, onEarnCoins, onUpdateHighScore]);

  return (
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-6 flex flex-col items-center">
      {/* Top Game Bar */}
      <div className="w-full bg-white rounded-3xl p-4 sm:p-5 border-2 border-pink-200 shadow-sm mb-4 flex flex-wrap items-center justify-between gap-4">
        {/* Score & Apples */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider font-bold text-pink-400">Score</span>
            <span className="text-2xl sm:text-3xl font-bold font-display text-red-600">
              {score.toLocaleString()}
            </span>
          </div>

          <div className="h-8 w-px bg-pink-100" />

          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-wider font-bold text-pink-400">Apples</span>
            <div className="flex items-center gap-1">
              <span className="text-xl">🍎</span>
              <span className="text-xl font-bold text-amber-900">{applesCaught}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-pink-100 hidden sm:block" />

          {/* High score */}
          <div className="hidden sm:flex flex-col">
            <span className="text-[11px] uppercase tracking-wider font-bold text-pink-400">Best Score</span>
            <div className="flex items-center gap-1 text-amber-600 font-bold">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>{Math.max(score, highScore)}</span>
            </div>
          </div>
        </div>

        {/* Fever Gauge & Hearts */}
        <div className="flex items-center gap-4">
          {/* Fever Gauge */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-xs font-bold text-pink-600">
              <Zap className={`w-3.5 h-3.5 ${isFeverActive ? 'text-amber-500 animate-bounce' : ''}`} />
              <span>{isFeverActive ? '🌈 FEVER TIME! 2X' : 'Ribbon Fever'}</span>
            </div>
            <div className="w-28 sm:w-36 h-3 bg-pink-100 rounded-full overflow-hidden border border-pink-200 mt-1">
              <div
                className={`h-full transition-all duration-300 ${
                  isFeverActive
                    ? 'bg-gradient-to-r from-red-500 via-yellow-400 via-green-400 via-blue-500 to-purple-500 animate-pulse'
                    : 'bg-gradient-to-r from-pink-400 to-red-500'
                }`}
                style={{ width: `${feverGauge}%` }}
              />
            </div>
          </div>

          {/* Lives (Hearts) */}
          <div className="flex items-center gap-1 bg-pink-50 px-3 py-1.5 rounded-2xl border border-pink-200">
            {[1, 2, 3].map((h) => (
              <Heart
                key={h}
                className={`w-5 h-5 transition-all ${
                  lives >= h ? 'fill-red-500 text-red-500 scale-105' : 'text-gray-300 opacity-40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Stage */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        className={`w-full h-[460px] sm:h-[500px] relative rounded-3xl overflow-hidden border-4 border-pink-300 shadow-md touch-none cursor-ew-resize transition-all ${
          isFeverActive
            ? 'bg-gradient-to-b from-pink-200 via-rose-100 to-yellow-100'
            : 'bg-gradient-to-b from-sky-100 via-pink-50 to-emerald-100'
        }`}
      >
        {/* Background Clouds & Orchard Trees */}
        <div className="absolute inset-0 pointer-events-none opacity-60">
          <div className="absolute top-4 left-6 text-4xl">☁️</div>
          <div className="absolute top-10 right-12 text-3xl">☁️</div>
          <div className="absolute top-6 left-1/2 text-2xl">🌸</div>
          {/* Apple orchard canopy */}
          <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-emerald-300/40 to-transparent flex justify-around text-lg">
            <span>🍃</span>
            <span>🍎</span>
            <span>🍃</span>
            <span>🍃</span>
            <span>🍎</span>
            <span>🍃</span>
          </div>
        </div>

        {/* Combo Toast Banner */}
        {combo > 2 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full border border-pink-300 shadow-sm text-pink-700 font-bold text-sm sm:text-base animate-pulse pointer-events-none flex items-center gap-1.5 z-20">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{comboText}</span>
            <span className="text-red-500">x{combo}</span>
          </div>
        )}

        {/* Falling Items */}
        {itemsRef.current.map((item) => {
          let itemEmoji = '🍎';
          if (item.type === 'golden_apple') itemEmoji = '🌟';
          if (item.type === 'strawberry') itemEmoji = '🍓';
          if (item.type === 'ribbon') itemEmoji = '🎀';
          if (item.type === 'star') itemEmoji = '⭐';
          if (item.type === 'cloud') itemEmoji = '🌧️';
          if (item.type === 'clock') itemEmoji = '⏰';

          return (
            <div
              key={item.id}
              className="absolute pointer-events-none flex items-center justify-center select-none"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
                fontSize: `${item.size}px`,
                filter: item.type === 'golden_apple' ? 'drop-shadow(0 0 6px #ffd166)' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
              }}
            >
              {itemEmoji}
            </div>
          );
        })}

        {/* Hello Kitty Player Character with Basket */}
        <div
          className="absolute bottom-2 pointer-events-none transition-transform duration-75 ease-out"
          style={{
            left: `${kittyX}%`,
            transform: 'translateX(-50%)',
          }}
        >
          {/* Wicker Apple Basket positioned in front */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-24 h-10 rounded-b-2xl bg-amber-700 border-2 border-amber-900 shadow-md flex items-center justify-center text-xs text-amber-100 font-bold">
            <span className="mr-1">🧺</span>
            <span>Catch!</span>
          </div>

          <KittySvg
            size={135}
            bowId={activeBow}
            outfitId={activeOutfit}
            handheldId="hand_whisk"
            expression={isFeverActive ? 'happy' : 'normal'}
            isExcited={isFeverActive}
          />
        </div>

        {/* Start Game Overlay */}
        {!isPlaying && !isGameOver && (
          <div className="absolute inset-0 bg-white/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-20 h-20 rounded-full bg-red-100 border-2 border-red-300 flex items-center justify-center mb-3 shadow-inner">
              <span className="text-4xl animate-bounce">🍎</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-red-600 mb-1">
              Apple Orchard Catcher
            </h2>
            <p className="text-sm text-pink-700 max-w-md mb-5 leading-relaxed font-medium">
              Hello Kitty is harvesting fresh sweet apples for mama's famous pie! Move Kitty left & right to catch sweet apples, stars & bows. Avoid rain clouds!
            </p>

            <button
              onClick={startGame}
              className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold px-8 py-3.5 rounded-full text-base shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Start Harvesting!</span>
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Tip: Use Keyboard Arrow keys, A/D, or drag mouse/touch!
            </p>
          </div>
        )}

        {/* Game Over Screen */}
        {isGameOver && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center z-30">
            <span className="text-5xl mb-2">🎀</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-red-600 mb-1">
              Harvest Complete!
            </h2>
            <p className="text-sm text-pink-700 mb-4 font-medium">
              Look at all the lovely baking supplies you helped gather!
            </p>

            <div className="bg-pink-50 rounded-2xl p-4 border border-pink-200 w-full max-w-xs mb-5 flex flex-col gap-2 text-sm">
              <div className="flex justify-between font-semibold">
                <span className="text-gray-600">Final Score:</span>
                <span className="text-red-600 font-bold">{score.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-gray-600">Apples Gathered:</span>
                <span className="text-amber-800 font-bold">🍎 {applesCaught}</span>
              </div>
              <div className="h-px bg-pink-200 my-1" />
              <div className="flex justify-between font-bold text-pink-800">
                <span>Ribbon Coins Earned:</span>
                <span className="text-amber-600">+🎀 {Math.floor(score * 0.4) + applesCaught * 2}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={startGame}
                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Play Again</span>
              </button>

              <button
                onClick={() => {
                  kawaiiAudio.playPop();
                  onGoToBakery();
                }}
                className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-full text-sm shadow-sm transition-transform active:scale-95 cursor-pointer"
              >
                <span>🥧 Bake Mama's Pie!</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Onscreen touch arrow controls for mobile */}
      <div className="w-full flex items-center justify-between mt-3 px-2 sm:hidden">
        <button
          onPointerDown={() => {
            keysPressed.current.left = true;
          }}
          onPointerUp={() => {
            keysPressed.current.left = false;
          }}
          onPointerLeave={() => {
            keysPressed.current.left = false;
          }}
          className="w-16 h-16 rounded-2xl bg-white border-2 border-pink-300 active:bg-pink-100 flex items-center justify-center text-pink-700 shadow-sm"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>

        <span className="text-xs text-pink-400 font-semibold">Touch to Move Kitty</span>

        <button
          onPointerDown={() => {
            keysPressed.current.right = true;
          }}
          onPointerUp={() => {
            keysPressed.current.right = false;
          }}
          onPointerLeave={() => {
            keysPressed.current.right = false;
          }}
          className="w-16 h-16 rounded-2xl bg-white border-2 border-pink-300 active:bg-pink-100 flex items-center justify-center text-pink-700 shadow-sm"
        >
          <ArrowRight className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
};
