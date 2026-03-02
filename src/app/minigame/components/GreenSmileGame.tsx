'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

// ==================== PHASER SCENES ====================

// MenuScene - Màn hình chào mừng
class MenuScene extends Phaser.Scene {
  userAvatarBase64: string | null = null;

  constructor() {
    super({ key: 'MenuScene' });
  }

  init(data: { avatar: string }) {
    if (data && data.avatar) {
      this.userAvatarBase64 = data.avatar;
    }
  }

  preload() {
    this.load.image('bacteria', '/assets/images/anhsauhai.jpg');
    this.load.image('gift', '/assets/images/anhsp.jpg');
    this.load.image('leaf-good', '/assets/images/anhladua.jpg');
    
    if (this.userAvatarBase64) {
      this.textures.addBase64('user-avatar', this.userAvatarBase64);
    }

    // Load audio files
    this.load.audio('collect-leaf', '/assets/sounds/collect-leaf.mp3');
    this.load.audio('collect-gift', '/assets/sounds/collect-gift.mp3');
    this.load.audio('hit-bacteria', '/assets/sounds/hit-bacteria.mp3');
    this.load.audio('speed-up', '/assets/sounds/speed-up.mp3');
    this.load.audio('game-over', '/assets/sounds/game-over.mp3');
    this.load.audio('spin-reached', '/assets/sounds/spin-reached.mp3');
    this.load.audio('background-music', '/assets/sounds/background-music.mp3');

    this.createGraphics();
  }

  createGraphics() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x4CAF50, 1);
    graphics.fillRoundedRect(0, 0, 60, 80, 10);
    graphics.generateTexture('pineapple-leaf', 60, 80);
    graphics.destroy();

    const buttonGraphics = this.add.graphics();
    buttonGraphics.fillStyle(0x66BB6A, 1);
    buttonGraphics.fillRoundedRect(0, 0, 200, 60, 30);
    buttonGraphics.generateTexture('play-button', 200, 60);
    buttonGraphics.destroy();
  }

  create() {
    this.scene.start('GameScene');
  }
}

// GameScene - Màn hình chơi game
class GameScene extends Phaser.Scene {
  preload() {
    this.load.audio('collect-leaf', '/assets/sounds/collect-leaf.mp3');
    this.load.audio('collect-gift', '/assets/sounds/collect-gift.mp3');
    this.load.audio('hit-bacteria', '/assets/sounds/hit-bacteria.mp3');
    this.load.audio('speed-up', '/assets/sounds/speed-up.mp3');
    this.load.audio('game-over', '/assets/sounds/game-over.mp3');
    this.load.audio('spin-reached', '/assets/sounds/spin-reached.mp3');
    this.load.audio('background-music', '/assets/sounds/background-music.mp3');
  }
    playBackgroundMusic() {
      // Dùng cache.audio để kiểm tra đã load chưa (không phải sound.get)
      if (this.cache.audio.exists('background-music')) {
        if (!this.backgroundMusic) {
          this.backgroundMusic = this.sound.add('background-music', { loop: true, volume: 0.3 });
        }
        if (!this.backgroundMusic.isPlaying) {
          this.backgroundMusic.play();
        }
      } else {
        // Chưa load xong, thử lại sau
        this.time.delayedCall(500, () => this.playBackgroundMusic());
      }
    }
  player: any;
  lanes: any[] = [];
  currentLane: number = 1;
  score: number = 0;
  lives: number = 3;
  items: any[] = [];
  gameSpeed: number = 200;
  baseSpeed: number = 200;
  combo: number = 0;
  isMoving: boolean = false;
  swipeStart: { x: number, y: number } | null = null;
  lastSpeedUpScore: number = 0;
  speedLevel: number = 1;
  reachedSpinThreshold: boolean = false;
  
  scoreText: any;
  livesText: any;
  speedLevelText: any;
  comboText: any;
  spawnTimer: any;

  // Sound effects
  soundEnabled: boolean = true;
  backgroundMusic: Phaser.Sound.BaseSound | null = null;

  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    this.items = [];
    this.score = 0;
    this.lives = 3;
    this.gameSpeed = 200;
    this.currentLane = 1;
    this.isMoving = false;
    this.combo = 0;
    this.reachedSpinThreshold = false;

    // 🔧 FIX: Khôi phục audio context (Browser autoplay policy)
    if (this.sound.locked) {
      this.sound.once('unlocked', () => {
        if (this.sound.context.state === 'suspended') {
          this.sound.context.resume();
        }
        this.playBackgroundMusic();
      });
    } else {
      if (this.sound.context.state === 'suspended') {
        this.sound.context.resume();
      }
      this.playBackgroundMusic();
    }

    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0xE8F5E9);

    // Đường chạy
    const laneWidth = width / 3;
    this.lanes = [];
    for (let i = 0; i < 3; i++) {
      this.lanes.push({ x: laneWidth * i + laneWidth / 2, index: i });
    }

    // Vẽ làn
    const roadGraphics = this.add.graphics();
    roadGraphics.lineStyle(2, 0xC8E6C9, 0.5);
    for (let i = 1; i < 3; i++) {
      roadGraphics.lineTo(laneWidth * i, 0);
      roadGraphics.lineTo(laneWidth * i, height);
      roadGraphics.strokePath();
      roadGraphics.beginPath();
    }

    // Animation đường
    const lines = [];
    for (let i = 0; i < 10; i++) {
      const line1 = this.add.rectangle(laneWidth, i * 80, 3, 40, 0x81C784, 0.6);
      const line2 = this.add.rectangle(laneWidth * 2, i * 80, 3, 40, 0x81C784, 0.6);
      lines.push(line1, line2);
    }

    this.tweens.add({
      targets: lines,
      y: '+=80',
      duration: 1000,
      repeat: -1,
      onRepeat: () => {
        lines.forEach(line => {
          if (line.y > height + 40) line.y = -40;
        });
      }
    });

    // === TẠO NGƯỜI CHƠI ===
    this.player = this.add.container(this.lanes[1].x, height - 100);
    this.player.setSize(50, 50);

    if (this.textures.exists('user-avatar')) {
      const maskShape = this.make.graphics({});
      maskShape.fillCircle(0, 0, 25);
      const mask = maskShape.createGeometryMask();

      const avatarSprite = this.add.image(0, 0, 'user-avatar');
      const scale = 50 / Math.min(avatarSprite.width, avatarSprite.height);
      avatarSprite.setScale(scale);
      avatarSprite.setMask(mask);
      
      this.player.add(avatarSprite);
      (this.player as any).avatarMask = maskShape;

      const border = this.add.graphics();
      border.lineStyle(3, 0x2E7D32, 1);
      border.strokeCircle(0, 0, 26);
      this.player.add(border);

    } else {
      const playerG = this.add.graphics();
      playerG.fillStyle(0xFFEB3B, 1);
      playerG.fillCircle(0, 0, 25);
      playerG.fillStyle(0x000000, 1);
      playerG.fillCircle(-10, -7, 3);
      playerG.fillCircle(10, -7, 3);
      playerG.lineStyle(3, 0x000000, 1);
      playerG.arc(0, 0, 15, 0.2, Math.PI - 0.2);
      playerG.strokePath();
      this.player.add(playerG);
    }

    // Glow effect
    const glow = this.add.circle(0, 0, 30, 0xFFFFFF, 0.2);
    this.player.add(glow);
    this.player.sendToBack(glow);

    this.tweens.add({
      targets: glow,
      scale: 1.2,
      alpha: 0.1,
      duration: 1000,
      yoyo: true,
      repeat: -1
    });

    // UI
    this.scoreText = this.add.text(15, 15, '🍃 0', {
      fontSize: '24px', fontFamily: 'Arial, sans-serif', color: '#2E7D32', fontStyle: 'bold',
      stroke: '#FFFFFF', strokeThickness: 4, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: { x: 8, y: 4 }
    });

    this.livesText = this.add.text(width - 15, 15, '❤️❤️❤️', {
      fontSize: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: { x: 8, y: 4 }
    });
    this.livesText.setOrigin(1, 0);

    this.speedLevelText = this.add.text(width / 2, 55, 'Speed: 1x', {
      fontSize: '18px', fontFamily: 'Arial, sans-serif', color: '#FF9800', fontStyle: 'bold',
      stroke: '#FFFFFF', strokeThickness: 3, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: { x: 10, y: 4 }
    });
    this.speedLevelText.setOrigin(0.5, 0);

    this.comboText = this.add.text(width / 2, height / 2 - 50, '', {
      fontSize: '28px', fontFamily: 'Arial, sans-serif', color: '#FF9800', fontStyle: 'bold',
      stroke: '#FFFFFF', strokeThickness: 5
    });
    this.comboText.setOrigin(0.5);
    this.comboText.setVisible(false);

    // Controls
    if(this.input.keyboard) {
        this.input.keyboard.on('keydown-LEFT', () => this.moveLeft());
        this.input.keyboard.on('keydown-RIGHT', () => this.moveRight());
        this.input.keyboard.on('keydown-A', () => this.moveLeft());
        this.input.keyboard.on('keydown-D', () => this.moveRight());
    }

    this.input.on('pointerdown', (pointer: any) => { this.swipeStart = { x: pointer.x, y: pointer.y }; });
    this.input.on('pointerup', (pointer: any) => {
      if (this.swipeStart) {
        const diffX = pointer.x - this.swipeStart.x;
        const diffY = Math.abs(pointer.y - this.swipeStart.y);
        if (Math.abs(diffX) > 30 && diffY < 100) { diffX > 0 ? this.moveRight() : this.moveLeft(); }
        this.swipeStart = null;
      }
    });

    this.spawnTimer = this.time.addEvent({ delay: 1500, callback: this.spawnItem, callbackScope: this, loop: true });
  }

  moveLeft() {
    if (this.isMoving || this.currentLane === 0) return;
    this.currentLane--;
    this.moveToLane();
  }

  moveRight() {
    if (this.isMoving || this.currentLane === 2) return;
    this.currentLane++;
    this.moveToLane();
  }

  moveToLane() {
    this.isMoving = true;
    this.tweens.add({
      targets: this.player,
      x: this.lanes[this.currentLane].x,
      duration: 200,
      ease: 'Power2',
      onComplete: () => { this.isMoving = false; }
    });
  }

  spawnItem() {
    const laneIndex = Phaser.Math.Between(0, 2);
    const rand = Math.random();
    let itemType = rand < 0.1 ? 'gift' : (rand < 0.65 ? 'leaf-good' : 'bacteria');
    
    const item = this.add.container(this.lanes[laneIndex].x, -50);
    const sprite = this.add.image(0, 0, itemType);
    sprite.setDisplaySize(50, 50);
    item.add(sprite);
    item.setData('type', itemType);
    item.setData('lane', laneIndex);
    item.setSize(50, 50);

    if (itemType === 'gift') {
      const glow = this.add.circle(0, 0, 35, 0xFFC107, 0.3);
      item.add(glow);
      item.sendToBack(glow);
      this.tweens.add({ targets: glow, scale: 1.5, alpha: 0, duration: 800, yoyo: true, repeat: -1 });
    }
    this.items.push(item);
  }

  checkSpeedIncrease() {
    const currentMilestone = Math.floor(this.score / 5);
    const lastMilestone = Math.floor(this.lastSpeedUpScore / 5);
    if (currentMilestone > lastMilestone && this.score >= 5) {
      this.speedLevel = currentMilestone + 1;
      this.gameSpeed = this.baseSpeed + (currentMilestone * 50); // Tăng từ 30 lên 50 để nhanh hơn
      if (this.spawnTimer) this.spawnTimer.delay = Math.max(600, 1500 - (currentMilestone * 150)); // Spawn nhanh hơn: 600ms min, 150ms/level
      this.speedLevelText.setText(`Speed: ${this.speedLevel}x`);
      this.showSpeedUpEffect();
      this.lastSpeedUpScore = this.score;
    }
  }

  showSpeedUpEffect() {
    const { width, height } = this.cameras.main;
    this.playSound('speed-up');
    const speedUpText = this.add.text(width / 2, height / 2, '⚡ SPEED UP! ⚡', {
      fontSize: '36px', fontFamily: 'Arial, sans-serif', color: '#FF9800', fontStyle: 'bold', stroke: '#FFFFFF', strokeThickness: 6
    });
    speedUpText.setOrigin(0.5);
    this.tweens.add({
      targets: speedUpText, scale: 1.5, alpha: 0, duration: 1000, ease: 'Power2', onComplete: () => speedUpText.destroy()
    });
    this.cameras.main.flash(300, 255, 152, 0, false);
  }

  // Kiểm tra đạt 100 điểm để spin
  checkSpinThreshold() {
    if (!this.reachedSpinThreshold && this.score >= 100) {
      this.reachedSpinThreshold = true;
      this.showSpinReachedEffect();
      // Tạm dừng game và dispatch event
      this.scene.pause();
      window.dispatchEvent(new CustomEvent('spinReached', { detail: { score: this.score } }));
    }
  }

  showSpinReachedEffect() {
    const { width, height } = this.cameras.main;
    this.playSound('spin-reached');
    const msg = this.add.text(width / 2, height / 2 - 60, '🎉 ĐẠT 100 ĐIỂM! 🎉', {
      fontSize: '32px', fontFamily: 'Arial, sans-serif', color: '#FFD700', fontStyle: 'bold',
      stroke: '#FF6B00', strokeThickness: 5
    });
    msg.setOrigin(0.5);
    
    const spinMsg = this.add.text(width / 2, height / 2 + 20, 'BẠN CÓ QUY HỎA MAY MẮN!', {
      fontSize: '20px', fontFamily: 'Arial, sans-serif', color: '#FF6B00', fontStyle: 'bold',
      stroke: '#FFFFFF', strokeThickness: 3
    });
    spinMsg.setOrigin(0.5);
  }

  update() {
    if ((this.player as any).avatarMask) {
        (this.player as any).avatarMask.x = this.player.x;
        (this.player as any).avatarMask.y = this.player.y;
    }

    const { height } = this.cameras.main;
    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.y += this.gameSpeed * (1 / 60);

      if (!item.getData('collected') && Math.abs(item.y - this.player.y) < 40 && item.getData('lane') === this.currentLane) {
        this.collectItem(item);
      }
      if (!item.getData('collected') && item.y > this.player.y + 60 && item.getData('type') === 'leaf-good') {
        this.playSound('hit-bacteria');
        this.loseLife();
        item.setData('collected', true);
      }
      if (item.y > height + 50) {
        item.destroy();
        this.items.splice(i, 1);
      }
    }
  }

  collectItem(item: any) {
    const type = item.getData('type');
    item.setData('collected', true);
    if (type === 'bacteria') {
      this.loseLife();
      this.combo = 0;
      this.playSound('hit-bacteria');
      this.showEffect(item.x, item.y, '💥', 0xFF0000);
    } else if (type === 'leaf-good') {
      this.score += 1;
      this.combo++;
      this.playSound('collect-leaf');
      this.showEffect(item.x, item.y, '+1', 0x4CAF50);
      this.updateCombo();
      this.checkSpeedIncrease();
      this.checkSpinThreshold();
    } else if (type === 'gift') {
      this.score += 5;
      this.combo++;
      this.playSound('collect-gift');
      this.showEffect(item.x, item.y, '+5 🎁', 0xFFC107);
      this.updateCombo();
      this.checkSpeedIncrease();
      this.checkSpinThreshold();
    }
    this.scoreText.setText('🍃 ' + this.score);
    item.destroy();
    
    const circle = this.add.circle(item.x, item.y, 30, type === 'bacteria' ? 0xFF0000 : 0x4CAF50, 0.5);
    this.tweens.add({ targets: circle, scale: 2, alpha: 0, duration: 300, onComplete: () => circle.destroy() });
  }

  showEffect(x: number, y: number, text: string, color: number) {
    const effect = this.add.text(x, y, text, {
      fontSize: '28px', fontFamily: 'Arial, sans-serif', color: '#' + color.toString(16), fontStyle: 'bold', stroke: '#FFFFFF', strokeThickness: 4
    });
    effect.setOrigin(0.5);
    this.tweens.add({ targets: effect, y: y - 60, alpha: 0, duration: 800, onComplete: () => effect.destroy() });
  }

  updateCombo() {
    if (this.combo >= 3) {
      this.comboText.setText(`COMBO x${this.combo}! 🔥`);
      this.comboText.setVisible(true);
      this.tweens.add({ targets: this.comboText, scale: 1.2, duration: 200, yoyo: true });
    } else {
      this.comboText.setVisible(false);
    }
  }

  loseLife() {
    this.lives--;
    this.livesText.setText('❤️'.repeat(this.lives));
    this.cameras.main.shake(300, 0.01);
    if (this.lives <= 0) {
      // Dừng background music
      if (this.backgroundMusic && this.backgroundMusic.isPlaying) {
        this.backgroundMusic.stop();
      }

      // Phát game-over sound
      this.playSound('game-over');
      
      // Đợi âm thanh phát xong (khoảng 2 giây) mới dispatch event
      this.time.delayedCall(2000, () => {
        this.scene.pause();
        window.dispatchEvent(new CustomEvent('gameOver', { detail: { score: this.score } }));
      });
    }
  }

  // Hàm phát âm thanh
  playSound(soundKey: string) {
    if (this.soundEnabled) {
      let sound = this.sound.get(soundKey);
      if (!sound) {
        sound = this.sound.add(soundKey, { volume: 0.7 });
      }
      if (sound) {
        if (!sound.isPlaying) {
          sound.play();
        } else {
          sound.stop();
          sound.play();
        }
      }
    }
  }
}

// ==================== REACT COMPONENT ====================

interface SpinResult {
  type: 'notebook' | 'voucher' | 'unlucky';
}

const GreenSmileGame = () => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const phaserGame = useRef<Phaser.Game | null>(null);
  
  const [step, setStep] = useState<'upload' | 'game' | 'spin' | 'result'>('upload');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<{ score: number, timestamp: number } | null>(null);
  const [spinResult, setSpinResult] = useState<SpinResult | null>(null);
  const [sessionId, setSessionId] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showSpinResult, setShowSpinResult] = useState(false);
  const [confettiItems, setConfettiItems] = useState<Array<{id:number,x:number,color:string,delay:number,size:number,drift:number}>>([]);
  const spinAudioRef = useRef<HTMLAudioElement | null>(null);
  const wheelRotationRef = useRef(0);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm tính toán kết quả vòng quay đã được tích hợp vào handleSpin

  useEffect(() => {
    if (step === 'game' && gameContainer.current) {
      if (phaserGame.current) {
        phaserGame.current.destroy(true);
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameContainer.current,
        width: 375,
        height: 667,
        backgroundColor: '#E8F5E9',
        physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } },
        scene: [MenuScene, GameScene],
        scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH }
      };

      phaserGame.current = new Phaser.Game(config);

      if (avatar) {
        phaserGame.current.scene.start('MenuScene', { avatar });
      }

      const handleGameOver = (event: any) => {
        setGameResult({ score: event.detail.score, timestamp: Date.now() });
        // Delay nhỏ để Phaser không bị destroy ngay khi âm thanh vừa bắt đầu
        setTimeout(() => {
          setStep('result');
        }, 200);
      };

      const handleSpinReached = (event: any) => {
        setGameResult({ score: event.detail.score, timestamp: Date.now() });
        setStep('spin');
      };

      window.addEventListener('gameOver', handleGameOver);
      window.addEventListener('spinReached', handleSpinReached);

      return () => {
        window.removeEventListener('gameOver', handleGameOver);
        window.removeEventListener('spinReached', handleSpinReached);
        if (phaserGame.current) {
            phaserGame.current.destroy(true);
            phaserGame.current = null;
        }
      };
    }
  }, [step, sessionId, avatar]);

  const handlePlayAgain = () => {
    setSpinResult(null);
    setShowSpinResult(false);
    setConfettiItems([]);
    setWheelRotation(0);
    wheelRotationRef.current = 0;
    setSessionId(prev => prev + 1);
    setStep('game');
  };

  const handleRetakePhoto = () => {
    setSpinResult(null);
    setShowSpinResult(false);
    setConfettiItems([]);
    setWheelRotation(0);
    wheelRotationRef.current = 0;
    setAvatar(null);
    setStep('upload');
  };

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Play spin sound
    try {
      if (!spinAudioRef.current) {
        spinAudioRef.current = new Audio('/assets/sounds/spin-reached.mp3');
      }
      spinAudioRef.current.currentTime = 0;
      spinAudioRef.current.play().catch(() => {});
    } catch(e) {}

    // Determine result
    const rand = Math.random();
    const result: SpinResult = rand < 0.05 ? { type: 'notebook' } : rand < 0.25 ? { type: 'voucher' } : { type: 'unlucky' };
    
    // Segment angles (3 segments, each 120deg)
    // Wheel pointer is at top. Segments: 0=unlucky(0-120), 1=voucher(120-240), 2=notebook(240-360)
    const segmentMap = { unlucky: 0, voucher: 1, notebook: 2 };
    const segIdx = segmentMap[result.type];
    // Center of winning segment
    const segCenter = segIdx * 120 + 60;
    // We need segCenter to end up at 0deg (top/pointer)
    // Total spin = multiple full rounds + offset to land correctly
    const extraSpins = (5 + Math.floor(Math.random() * 3)) * 360;
    const targetAngle = wheelRotationRef.current + extraSpins + (360 - (wheelRotationRef.current % 360 + segCenter) % 360);
    
    wheelRotationRef.current = targetAngle;
    setWheelRotation(targetAngle);

    setTimeout(() => {
      // Stop spin sound
      if (spinAudioRef.current) {
        spinAudioRef.current.pause();
        spinAudioRef.current.currentTime = 0;
      }
      setSpinResult(result);
      setIsSpinning(false);
      setShowSpinResult(true);

      // Confetti for wins
      if (result.type !== 'unlucky') {
        const colors = ['#FFD700','#FF6B6B','#4ECDC4','#95E85E','#FF9F43','#FFFFFF'];
        const items = Array.from({length: 60}, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 1.5,
          size: 6 + Math.random() * 10,
          drift: (Math.random() - 0.5) * 200
        }));
        setConfettiItems(items);
        setTimeout(() => setConfettiItems([]), 4000);
      }
    }, 4500);
  };

  const getSpinResultMessage = (result: SpinResult) => {
    switch (result.type) {
      case 'notebook':
        return { title: '🎉 Chúc mừng!', message: 'Bạn đã trúng một quyển xổ tay', emoji: '📓' };
      case 'voucher':
        return { title: '🎉 Tuyệt vời!', message: 'Bạn đã trúng voucher 30%', emoji: '🎟️' };
      case 'unlucky':
        return { title: '😊 Không may', message: 'Chúc bạn may mắn lần sau!', emoji: '✨' };
    }
  };

  return (
    <div style={styles.wrapper}>
      
      {/* 1. MÀN HÌNH CHỤP ẢNH */}
      {step === 'upload' && (
         <div style={styles.uploadContainer}>
             <div style={styles.smileIcon}>📸</div>
             <h2 style={styles.title}>Chào mừng bạn!</h2>
             <p style={{...styles.tagline, marginBottom: '20px'}}>Hãy chụp ảnh để làm nhân vật trong game.</p>
             
             {avatar ? (
                 <div style={{textAlign: 'center'}}>
                     <img src={avatar} alt="Preview" style={styles.avatarPreview} />
                     <div style={styles.formActions}>
                        <button onClick={() => setStep('game')} style={styles.btnSubmit}>
                            VÀO GAME ➤
                        </button>
                        <button onClick={() => setAvatar(null)} style={styles.btnSecondary}>
                            Chọn lại
                        </button>
                     </div>
                 </div>
             ) : (
                <>
                    <label htmlFor="file-upload" style={{...styles.btnSubmit, display: 'inline-block', textAlign: 'center'}}>
                         📷 Mở Camera / Chọn Ảnh
                    </label>
                    <input 
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={handleImageUpload}
                        style={{display: 'none'}}
                    />
                </>
             )}
         </div>
      )}

      {/* 2. KHUNG GAME */}
      {step === 'game' && <div ref={gameContainer} style={styles.container} />}
      
      {/* 3. MÀN HÌNH VÒNG QUAY */}
      {step === 'spin' && !showSpinResult && (
        <div style={spinStyles.overlay}>
          {/* Confetti */}
          {confettiItems.map(c => (
            <div key={c.id} style={{
              position: 'fixed', top: '-20px', left: `${c.x}%`,
              width: c.size, height: c.size * 0.6,
              background: c.color, borderRadius: '2px',
              animation: `confettiFall 3s ${c.delay}s ease-in forwards`,
              transform: `rotate(${Math.random()*360}deg)`,
              zIndex: 2000, pointerEvents: 'none'
            }} />
          ))}

          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;900&display=swap');
            @keyframes confettiFall {
              0% { transform: translateY(0) rotate(0deg) translateX(0); opacity: 1; }
              100% { transform: translateY(110vh) rotate(720deg) translateX(${150}px); opacity: 0; }
            }
            @keyframes shimmer {
              0%,100% { opacity: 0.6; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.05); }
            }
            @keyframes pulseGlow {
              0%,100% { box-shadow: 0 0 20px rgba(255,215,0,0.4), 0 0 40px rgba(255,215,0,0.2); }
              50% { box-shadow: 0 0 40px rgba(255,215,0,0.8), 0 0 80px rgba(255,215,0,0.4); }
            }
            @keyframes spinBtnPulse {
              0%,100% { transform: scale(1); box-shadow: 0 8px 30px rgba(255,107,107,0.5); }
              50% { transform: scale(1.04); box-shadow: 0 12px 40px rgba(255,107,107,0.8); }
            }
            @keyframes floatBadge {
              0%,100% { transform: translateY(0px); }
              50% { transform: translateY(-6px); }
            }
            @keyframes tickle {
              0%,100% { transform: scaleX(1); }
              50% { transform: scaleX(1.1); }
            }
            @keyframes starFloat {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(-80px) rotate(180deg); opacity: 0; }
            }
          `}</style>

          <div style={spinStyles.container}>
            {/* Header */}
            <div style={spinStyles.header}>
              <div style={spinStyles.badge}>
                <span style={{animation: 'floatBadge 2s ease-in-out infinite', display: 'inline-block'}}>🏆</span>
                &nbsp;100 ĐIỂM ĐẠT ĐƯỢC!
              </div>
              <h2 style={spinStyles.title}>VÒNG QUAY<br/>MAY MẮN</h2>
              <div style={spinStyles.scoreChip}>
                <span style={{fontSize: '14px', opacity: 0.9}}>Điểm của bạn</span>
                <span style={{fontSize: '32px', fontWeight: 900, fontFamily: 'Fredoka One', letterSpacing: '1px'}}>{gameResult?.score || 0}</span>
              </div>
            </div>

            {/* Wheel Area */}
            <div style={spinStyles.wheelArea}>
              {/* Outer ring glow */}
              <div style={{...spinStyles.outerRing, animation: isSpinning ? 'pulseGlow 0.5s ease-in-out infinite' : 'pulseGlow 2s ease-in-out infinite'}}>
                {/* Decorative dots on ring */}
                {Array.from({length: 12}, (_, i) => (
                  <div key={i} style={{
                    position: 'absolute', width: 10, height: 10,
                    background: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B6B' : '#95E85E',
                    borderRadius: '50%',
                    top: '50%', left: '50%',
                    transform: `rotate(${i*30}deg) translateY(-152px) translateX(-5px)`,
                    boxShadow: '0 0 8px currentColor'
                  }} />
                ))}

                {/* Pointer */}
                <div style={spinStyles.pointer}>
                  <svg width="32" height="44" viewBox="0 0 32 44">
                    <polygon points="16,0 32,44 0,44" fill="#FFD700" stroke="#FF9F43" strokeWidth="2"/>
                    <polygon points="16,8 26,40 6,40" fill="#FFF3B0"/>
                  </svg>
                </div>

                {/* Spinning wheel SVG */}
                <div style={{
                  width: 280, height: 280,
                  transition: isSpinning ? `transform 4.5s cubic-bezier(0.17, 0.67, 0.12, 1.0)` : 'none',
                  transform: `rotate(${wheelRotation}deg)`,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <svg width="280" height="280" viewBox="0 0 280 280" style={{display:'block'}}>
                    {/* Segment 0: unlucky - top (0-120deg) */}
                    <path d="M140,140 L140,0 A140,140 0 0,1 261.24,209.97 Z" fill="#4ECDC4"/>
                    <path d="M140,140 L140,0 A140,140 0 0,1 261.24,209.97 Z" fill="url(#grad0)" opacity="0.4"/>
                    {/* Segment 1: voucher - right-bottom (120-240deg) */}
                    <path d="M140,140 L261.24,209.97 A140,140 0 0,1 18.76,209.97 Z" fill="#FF9F43"/>
                    <path d="M140,140 L261.24,209.97 A140,140 0 0,1 18.76,209.97 Z" fill="url(#grad1)" opacity="0.4"/>
                    {/* Segment 2: notebook - left (240-360deg) */}
                    <path d="M140,140 L18.76,209.97 A140,140 0 0,1 140,0 Z" fill="#FF6B6B"/>
                    <path d="M140,140 L18.76,209.97 A140,140 0 0,1 140,0 Z" fill="url(#grad2)" opacity="0.4"/>

                    {/* Divider lines */}
                    <line x1="140" y1="140" x2="140" y2="0" stroke="white" strokeWidth="4"/>
                    <line x1="140" y1="140" x2="261.24" y2="209.97" stroke="white" strokeWidth="4"/>
                    <line x1="140" y1="140" x2="18.76" y2="209.97" stroke="white" strokeWidth="4"/>

                    {/* Center circle */}
                    <circle cx="140" cy="140" r="28" fill="#2C3E50" stroke="white" strokeWidth="4"/>
                    <circle cx="140" cy="140" r="18" fill="#FFD700"/>
                    <circle cx="140" cy="140" r="10" fill="#FFF"/>
                    <circle cx="140" cy="140" r="5" fill="#FFD700"/>

                    {/* Segment icons - unlucky segment center ~60deg */}
                    <text x="185" y="75" textAnchor="middle" fontSize="28" transform="rotate(60,185,75)">✨</text>
                    <text x="185" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="Nunito, sans-serif" transform="rotate(60,185,98)">Lần sau</text>

                    {/* voucher ~180deg center */}
                    <text x="140" y="240" textAnchor="middle" fontSize="28" transform="rotate(180,140,240)">🎟️</text>
                    <text x="140" y="218" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="Nunito, sans-serif" transform="rotate(180,140,218)">Voucher</text>

                    {/* notebook ~300deg center */}
                    <text x="95" y="75" textAnchor="middle" fontSize="28" transform="rotate(300,95,75)">📓</text>
                    <text x="95" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="white" fontFamily="Nunito, sans-serif" transform="rotate(300,95,98)">Xổ tay</text>

                    <defs>
                      <radialGradient id="grad0" cx="70%" cy="30%"><stop offset="0%" stopColor="white" stopOpacity="0.3"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient>
                      <radialGradient id="grad1" cx="50%" cy="80%"><stop offset="0%" stopColor="white" stopOpacity="0.3"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient>
                      <radialGradient id="grad2" cx="30%" cy="70%"><stop offset="0%" stopColor="white" stopOpacity="0.3"/><stop offset="100%" stopColor="white" stopOpacity="0"/></radialGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>

            {/* Spin Button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              style={{
                ...spinStyles.spinBtn,
                animation: isSpinning ? 'none' : 'spinBtnPulse 1.5s ease-in-out infinite',
                opacity: isSpinning ? 0.75 : 1,
                cursor: isSpinning ? 'not-allowed' : 'pointer'
              }}
            >
              {isSpinning ? (
                <span>⏳ &nbsp;Đang quay...</span>
              ) : (
                <span>🎯 &nbsp;QUAY NGAY!</span>
              )}
            </button>

            <p style={spinStyles.subtext}>Vòng quay sẽ quyết định phần quà của bạn 🍀</p>
          </div>
        </div>
      )}

      {/* 4. MÀN HÌNH KẾT QUẢ VÒNG QUAY */}
      {step === 'spin' && showSpinResult && spinResult && (
        <div style={spinStyles.overlay}>
          <div style={spinStyles.resultContainer}>
            {/* Animated emoji */}
            <div style={{fontSize: '90px', animation: 'floatBadge 2s ease-in-out infinite', marginBottom: '12px'}}>
              {getSpinResultMessage(spinResult).emoji}
            </div>
            <h2 style={spinStyles.resultTitle}>{getSpinResultMessage(spinResult).title}</h2>
            <p style={spinStyles.resultMsg}>{getSpinResultMessage(spinResult).message}</p>

            {spinResult.type !== 'unlucky' && (
              <div style={spinStyles.prizeBadge}>
                🎁 Phần quà của bạn đang được chuẩn bị!
              </div>
            )}

            <div style={{display:'flex', flexDirection:'column', gap:'12px', marginTop:'28px', width:'100%'}}>
              <button onClick={handlePlayAgain} style={spinStyles.spinBtn}>
                🔄 &nbsp;Chơi lại
              </button>
              <button onClick={handleRetakePhoto} style={spinStyles.secondaryBtn}>
                📷 &nbsp;Chụp lại ảnh
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 5. MÀN HÌNH KẾT QUẢ GAME OVER */}
      {step === 'result' && (
        <div style={styles.overlay}>
          <div style={styles.formContainer}>
            <div style={styles.header}>
              <div style={styles.smileIcon}>😁</div>
              <h2 style={styles.title}>Game Over</h2>
              <div style={styles.scoreDisplay}>
                <span style={styles.scoreLabel}>Điểm số:</span>
                <span style={styles.scoreValue}>{gameResult?.score || 0}</span>
              </div>
              <p style={styles.tagline}>🌿 PineSmile – Nụ cười xanh từ thiên nhiên</p>
            </div>

            <div style={styles.formActions}>
              <button onClick={handlePlayAgain} style={styles.btnSubmit}>
                Chơi lại
              </button>
              <button onClick={handleRetakePhoto} style={styles.btnSecondary}>
                Chụp lại ảnh
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    position: 'relative',
    width: '100%',
    maxWidth: '375px',
    margin: '0 auto',
    background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)'
  },
  container: {
    position: 'relative',
    width: '100%',
    aspectRatio: '375 / 667'
  },
  uploadContainer: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
    height: '100%', padding: '20px', aspectRatio: '375 / 667', textAlign: 'center'
  },
  avatarPreview: {
    width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover',
    border: '4px solid #4CAF50', marginBottom: '20px'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  formContainer: {
    background: 'linear-gradient(135deg, #FFFFFF 0%, #F1F8E9 100%)',
    borderRadius: '24px',
    padding: '32px 24px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    maxHeight: '80vh',
    overflow: 'auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '28px'
  },
  smileIcon: {
    fontSize: '64px',
    marginBottom: '12px'
  },
  title: {
    color: '#2E7D32',
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 16px 0'
  },
  scoreDisplay: {
    background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '50px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
  },
  scoreLabel: {
    fontSize: '16px',
    fontWeight: '500'
  },
  scoreValue: {
    fontSize: '28px',
    fontWeight: 'bold'
  },
  tagline: {
    color: '#66BB6A',
    fontSize: '16px',
    fontStyle: 'italic',
    margin: '12px 0 0 0'
  },
  spinContainer: {
    position: 'relative',
    width: '280px',
    height: '280px',
    margin: '0 auto 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wheel: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: '#f0f0f0',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    overflow: 'hidden',
    border: '8px solid #FFD700'
  },
  wheelSegment: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    clipPath: 'polygon(50% 50%, 100% 0, 100% 100%)',
    position: 'relative'
  } as React.CSSProperties,
  wheelText: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: '12px'
  },
  pointer: {
    position: 'absolute',
    top: -15,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '40px',
    color: '#FFD700',
    fontWeight: 'bold',
    zIndex: 10
  },
  formActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '8px'
  },
  btnSubmit: {
    padding: '16px 24px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
  },
  btnSecondary: {
    padding: '16px 24px',
    border: '2px solid #4CAF50',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    background: 'white',
    color: '#4CAF50'
  }
};

// Spin Wheel Premium Styles
const spinStyles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 1000, fontFamily: "'Nunito', sans-serif",
    overflow: 'hidden'
  },
  container: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '24px 20px', width: '100%', maxWidth: '400px',
    position: 'relative', zIndex: 1
  },
  header: {
    textAlign: 'center', marginBottom: '20px', width: '100%'
  },
  badge: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #FFD700, #FF9F43)',
    color: '#1a1a1a', fontWeight: 900, fontSize: '13px',
    padding: '6px 18px', borderRadius: '50px',
    letterSpacing: '1px', marginBottom: '12px',
    boxShadow: '0 4px 15px rgba(255,215,0,0.4)',
    fontFamily: "'Nunito', sans-serif"
  },
  title: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '38px', color: '#FFFFFF',
    margin: '0 0 16px 0', lineHeight: 1.1,
    textShadow: '0 2px 20px rgba(255,215,0,0.5)',
    letterSpacing: '1px'
  },
  scoreChip: {
    display: 'inline-flex', flexDirection: 'column' as const, alignItems: 'center',
    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    color: 'white', padding: '10px 28px', borderRadius: '16px',
    gap: '2px'
  },
  wheelArea: {
    position: 'relative', display: 'flex', alignItems: 'center',
    justifyContent: 'center', marginBottom: '24px',
    width: '320px', height: '320px'
  },
  outerRing: {
    width: '310px', height: '310px', borderRadius: '50%',
    background: 'linear-gradient(135deg, #2C3E50, #1a252f)',
    border: '6px solid rgba(255,215,0,0.6)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative',
    boxShadow: '0 0 30px rgba(255,215,0,0.3), inset 0 0 20px rgba(0,0,0,0.3)'
  },
  pointer: {
    position: 'absolute', top: '-22px', left: '50%',
    transform: 'translateX(-50%)', zIndex: 10,
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))'
  },
  spinBtn: {
    width: '100%', padding: '18px 24px',
    background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    border: 'none', borderRadius: '16px',
    fontSize: '18px', fontWeight: 900, color: 'white',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif",
    letterSpacing: '0.5px',
    boxShadow: '0 8px 30px rgba(255,107,107,0.5)',
    transition: 'opacity 0.2s'
  },
  secondaryBtn: {
    width: '100%', padding: '14px 24px',
    background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
    border: '2px solid rgba(255,255,255,0.3)', borderRadius: '16px',
    fontSize: '16px', fontWeight: 700, color: 'white',
    cursor: 'pointer', fontFamily: "'Nunito', sans-serif"
  },
  subtext: {
    color: 'rgba(255,255,255,0.5)', fontSize: '13px',
    margin: '12px 0 0 0', textAlign: 'center' as const
  },
  resultContainer: {
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
    padding: '40px 28px', width: '100%', maxWidth: '380px',
    textAlign: 'center' as const
  },
  resultTitle: {
    fontFamily: "'Fredoka One', cursive",
    fontSize: '40px', color: '#FFD700',
    margin: '0 0 12px 0',
    textShadow: '0 2px 20px rgba(255,215,0,0.6)'
  },
  resultMsg: {
    color: 'rgba(255,255,255,0.85)', fontSize: '18px',
    fontWeight: 600, margin: '0 0 16px 0',
    lineHeight: 1.5
  },
  prizeBadge: {
    background: 'linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,159,67,0.2))',
    border: '1px solid rgba(255,215,0,0.4)',
    color: '#FFD700', padding: '12px 20px',
    borderRadius: '12px', fontSize: '14px', fontWeight: 700,
    backdropFilter: 'blur(10px)'
  }
};

export default GreenSmileGame;