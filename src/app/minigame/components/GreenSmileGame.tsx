'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Phaser from 'phaser';

// ==================== PHASER SCENES ====================

// MenuScene - Màn hình chào mừng
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    // Load ảnh thật từ public/assets/images
    this.load.image('bacteria', '/assets/images/anhsauhai.jpg');
    this.load.image('gift', '/assets/images/anhsp.jpg');
    this.load.image('leaf-good', '/assets/images/anhladua.jpg');
    
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
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0xE8F5E9);

    const logoY = height * 0.25;
    
    const leaf1 = this.add.image(width / 2 - 30, logoY, 'pineapple-leaf');
    const leaf2 = this.add.image(width / 2 + 30, logoY, 'pineapple-leaf');
    leaf1.setTint(0x66BB6A);
    leaf2.setTint(0x4CAF50);

    const title = this.add.text(width / 2, logoY + 80, 'PineSmile', {
      fontSize: '48px',
      fontFamily: 'Arial, sans-serif',
      color: '#2E7D32',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);


    const instructions = this.add.text(width / 2, height * 0.55, 
      '🍃 Thu thập lá dứa tốt\n' +
      '🎁 Nhận quà x5 điểm\n' +
      '🦠 Tránh vi khuẩn\n\n' +
      '👆 Vuốt trái/phải để di chuyển\n' +
      '⚡ Mỗi 5 điểm = tăng tốc!',
      {
        fontSize: '18px',
        fontFamily: 'Arial, sans-serif',
        color: '#4CAF50',
        align: 'center',
        lineSpacing: 8
      }
    );
    instructions.setOrigin(0.5);

    const playButton = this.add.image(width / 2, height * 0.78, 'play-button');
    playButton.setInteractive({ useHandCursor: true });

    const playText = this.add.text(width / 2, height * 0.78, 'BẮT ĐẦU CHƠI', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#FFFFFF',
      fontStyle: 'bold'
    });
    playText.setOrigin(0.5);

    playButton.on('pointerover', () => {
      playButton.setTint(0x81C784);
      playButton.setScale(1.05);
    });

    playButton.on('pointerout', () => {
      playButton.clearTint();
      playButton.setScale(1);
    });

    playButton.on('pointerdown', () => playButton.setScale(0.95));
    playButton.on('pointerup', () => this.scene.start('GameScene'));

    this.tweens.add({
      targets: [leaf1, leaf2],
      y: logoY - 10,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }
}

// GameScene - Màn hình chơi game
class GameScene extends Phaser.Scene {
  // === KHAI BÁO BIẾN ĐỂ FIX LỖI BUILD TYPESCRIPT ===
  player: any;
  lanes: any[];
  currentLane: number;
  score: number;
  lives: number;
  items: any[];
  gameSpeed: number;
  baseSpeed: number;
  combo: number;
  isMoving: boolean;
  swipeStart: { x: number, y: number } | null;
  lastSpeedUpScore: number;
  speedLevel: number;
  
  // Các biến UI
  scoreText: any;
  livesText: any;
  speedLevelText: any;
  comboText: any;
  spawnTimer: any;
  // ==================================================

  constructor() {
    super({ key: 'GameScene' });
    this.player = null;
    this.lanes = [];
    this.currentLane = 1;
    this.score = 0;
    this.lives = 3;
    this.items = [];
    this.gameSpeed = 200;
    this.baseSpeed = 200;
    this.combo = 0;
    this.isMoving = false;
    this.swipeStart = null;
    this.lastSpeedUpScore = 0;
    this.speedLevel = 1;
  }

  preload() {
    // Load ảnh thật
    this.load.image('bacteria', '/assets/images/anhsauhai.jpg');
    this.load.image('gift', '/assets/images/anhsp.jpg');
    this.load.image('leaf-good', '/assets/images/anhladua.jpg');
    
    this.createGameGraphics();
  }

  createGameGraphics() {
    // Nhân vật
    const playerG = this.add.graphics();
    playerG.fillStyle(0xFFEB3B, 1);
    playerG.fillCircle(25, 25, 25);
    playerG.fillStyle(0x000000, 1);
    playerG.fillCircle(15, 18, 3);
    playerG.fillCircle(35, 18, 3);
    playerG.lineStyle(3, 0x000000, 1);
    playerG.arc(25, 25, 15, 0.2, Math.PI - 0.2);
    playerG.strokePath();
    playerG.generateTexture('player', 50, 50);
    playerG.destroy();
  }

  create() {
    const { width, height } = this.cameras.main;

    this.add.rectangle(width / 2, height / 2, width, height, 0xE8F5E9);

    // Đường chạy
    const laneWidth = width / 3;
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

    // Người chơi
    this.player = this.add.container(this.lanes[1].x, height - 100);
    const sprite = this.add.image(0, 0, 'player');
    this.player.add(sprite);
    this.player.setSize(50, 50);

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

    // UI - Sắp xếp lại để không chồng chéo
    // Score ở góc trái trên
    this.scoreText = this.add.text(15, 15, '🍃 0', {
      fontSize: '24px',
      fontFamily: 'Arial, sans-serif',
      color: '#2E7D32',
      fontStyle: 'bold',
      stroke: '#FFFFFF',
      strokeThickness: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      padding: { x: 8, y: 4 }
    });

    // Lives ở góc phải trên
    this.livesText = this.add.text(width - 15, 15, '❤️❤️❤️', {
      fontSize: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      padding: { x: 8, y: 4 }
    });
    this.livesText.setOrigin(1, 0);

    // Speed Level ở giữa, dưới score và lives
    this.speedLevelText = this.add.text(width / 2, 55, 'Speed: 1x', {
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif',
      color: '#FF9800',
      fontStyle: 'bold',
      stroke: '#FFFFFF',
      strokeThickness: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      padding: { x: 10, y: 4 }
    });
    this.speedLevelText.setOrigin(0.5, 0);

    // Combo ở giữa màn hình
    this.comboText = this.add.text(width / 2, height / 2 - 50, '', {
      fontSize: '28px',
      fontFamily: 'Arial, sans-serif',
      color: '#FF9800',
      fontStyle: 'bold',
      stroke: '#FFFFFF',
      strokeThickness: 5
    });
    this.comboText.setOrigin(0.5);
    this.comboText.setVisible(false);

    // Controls
    this.input.keyboard!.on('keydown-LEFT', () => this.moveLeft());
    this.input.keyboard!.on('keydown-RIGHT', () => this.moveRight());
    this.input.keyboard!.on('keydown-A', () => this.moveLeft());
    this.input.keyboard!.on('keydown-D', () => this.moveRight());

    this.input.on('pointerdown', (pointer: any) => {
      this.swipeStart = { x: pointer.x, y: pointer.y };
    });

    this.input.on('pointerup', (pointer: any) => {
      if (this.swipeStart) {
        const diffX = pointer.x - this.swipeStart.x;
        const diffY = Math.abs(pointer.y - this.swipeStart.y);
        if (Math.abs(diffX) > 50 && diffY < 100) {
          diffX > 0 ? this.moveRight() : this.moveLeft();
        }
        this.swipeStart = null;
      }
    });

    // Spawn items
    this.spawnTimer = this.time.addEvent({
      delay: 1500,
      callback: this.spawnItem,
      callbackScope: this,
      loop: true
    });
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
    const x = this.lanes[laneIndex].x;
    
    const rand = Math.random();
    let itemType;
    if (rand < 0.1) itemType = 'gift';
    else if (rand < 0.65) itemType = 'leaf-good';
    else itemType = 'bacteria';

    const item = this.add.container(x, -50);
    
    // Sử dụng ảnh thật, resize cho phù hợp
    const sprite = this.add.image(0, 0, itemType);
    sprite.setDisplaySize(50, 50); // Resize ảnh về kích thước chuẩn
    
    item.add(sprite);
    item.setData('type', itemType);
    item.setData('lane', laneIndex);
    item.setSize(50, 50);

    if (itemType === 'gift') {
      const glow = this.add.circle(0, 0, 35, 0xFFC107, 0.3);
      item.add(glow);
      item.sendToBack(glow);
      this.tweens.add({
        targets: glow,
        scale: 1.5,
        alpha: 0,
        duration: 800,
        yoyo: true,
        repeat: -1
      });
    }

    this.items.push(item);
  }

  checkSpeedIncrease() {
    // Tăng tốc mỗi khi đạt bội số của 5
    const currentMilestone = Math.floor(this.score / 5);
    const lastMilestone = Math.floor(this.lastSpeedUpScore / 5);

    if (currentMilestone > lastMilestone && this.score >= 5) {
      this.speedLevel = currentMilestone + 1;
      this.gameSpeed = this.baseSpeed + (currentMilestone * 30); // Tăng 30 mỗi 5 điểm
      
      // Giảm spawn delay
      if (this.spawnTimer) {
        this.spawnTimer.delay = Math.max(800, 1500 - (currentMilestone * 100));
      }

      // Cập nhật UI
      this.speedLevelText.setText(`Speed: ${this.speedLevel}x`);
      
      // Hiệu ứng speed up
      this.showSpeedUpEffect();
      
      this.lastSpeedUpScore = this.score;
    }
  }

  showSpeedUpEffect() {
    const { width, height } = this.cameras.main;
    
    const speedUpText = this.add.text(width / 2, height / 2, '⚡ SPEED UP! ⚡', {
      fontSize: '36px',
      fontFamily: 'Arial, sans-serif',
      color: '#FF9800',
      fontStyle: 'bold',
      stroke: '#FFFFFF',
      strokeThickness: 6
    });
    speedUpText.setOrigin(0.5);

    this.tweens.add({
      targets: speedUpText,
      scale: 1.5,
      alpha: 0,
      duration: 1000,
      ease: 'Power2',
      onComplete: () => speedUpText.destroy()
    });

    // Camera flash
    this.cameras.main.flash(300, 255, 152, 0, false);
  }

  update() {
    const { height } = this.cameras.main;

    for (let i = this.items.length - 1; i >= 0; i--) {
      const item = this.items[i];
      item.y += this.gameSpeed * (1 / 60);

      if (!item.getData('collected') && 
          Math.abs(item.y - this.player.y) < 40 &&
          item.getData('lane') === this.currentLane) {
        this.collectItem(item);
      }

      if (!item.getData('collected') && 
          item.y > this.player.y + 60 &&
          item.getData('type') === 'leaf-good') {
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
      this.showEffect(item.x, item.y, '💥', 0xFF0000);
    } else if (type === 'leaf-good') {
      this.score += 1;
      this.combo++;
      this.showEffect(item.x, item.y, '+1', 0x4CAF50);
      this.updateCombo();
      this.checkSpeedIncrease();
    } else if (type === 'gift') {
      this.score += 5;
      this.combo++;
      this.showEffect(item.x, item.y, '+5 🎁', 0xFFC107);
      this.updateCombo();
      this.checkSpeedIncrease();
    }

    this.scoreText.setText('🍃 ' + this.score);
    item.destroy();

    const circle = this.add.circle(item.x, item.y, 30, 
      type === 'bacteria' ? 0xFF0000 : 0x4CAF50, 0.5);
    this.tweens.add({
      targets: circle,
      scale: 2,
      alpha: 0,
      duration: 300,
      onComplete: () => circle.destroy()
    });
  }

  showEffect(x: number, y: number, text: string, color: number) {
    const effect = this.add.text(x, y, text, {
      fontSize: '28px',
      fontFamily: 'Arial, sans-serif',
      color: '#' + color.toString(16),
      fontStyle: 'bold',
      stroke: '#FFFFFF',
      strokeThickness: 4
    });
    effect.setOrigin(0.5);

    this.tweens.add({
      targets: effect,
      y: y - 60,
      alpha: 0,
      duration: 800,
      onComplete: () => effect.destroy()
    });
  }

  updateCombo() {
    if (this.combo >= 3) {
      this.comboText.setText(`COMBO x${this.combo}! 🔥`);
      this.comboText.setVisible(true);
      this.tweens.add({
        targets: this.comboText,
        scale: 1.2,
        duration: 200,
        yoyo: true
      });
    } else {
      this.comboText.setVisible(false);
    }
  }

  loseLife() {
    this.lives--;
    this.livesText.setText('❤️'.repeat(this.lives));
    this.cameras.main.shake(300, 0.01);

    if (this.lives <= 0) {
      this.scene.pause();
      const event = new CustomEvent('gameOver', {
        detail: { score: this.score }
      });
      window.dispatchEvent(event);
    }
  }
}

// ==================== REACT COMPONENT ====================

const GreenSmileGame = () => {
  const gameContainer = useRef<HTMLDivElement>(null);
  const phaserGame = useRef<Phaser.Game | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [gameResult, setGameResult] = useState<{ score: number, timestamp: number } | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (gameContainer.current && !phaserGame.current) {
      const config = {
        type: Phaser.AUTO,
        parent: gameContainer.current,
        width: 375,
        height: 667,
        backgroundColor: '#E8F5E9',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false
          }
        },
        scene: [MenuScene, GameScene],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      };

      phaserGame.current = new Phaser.Game(config);

      const handleGameOver = (event: any) => {
        setGameResult({
          score: event.detail.score,
          timestamp: Date.now()
        });
        setShowForm(true);
      };

      window.addEventListener('gameOver', handleGameOver);

      return () => {
        window.removeEventListener('gameOver', handleGameOver);
      };
    }

    return () => {
      if (phaserGame.current) {
        phaserGame.current.destroy(true);
        phaserGame.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // THAY ĐỔI URL VÀ ENTRY IDs Ở ĐÂY
      const formUrl = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';
      
      const formDataToSend = new FormData();
      formDataToSend.append('entry.YOUR_NAME_ENTRY_ID', formData.name);
      formDataToSend.append('entry.YOUR_PHONE_ENTRY_ID', formData.phone);
      formDataToSend.append('entry.YOUR_SCORE_ENTRY_ID', gameResult?.score.toString() || '0');

      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formDataToSend
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        handlePlayAgain();
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
      setIsSubmitting(false);
    }
  };

  const handlePlayAgain = () => {
    setShowForm(false);
    setSubmitSuccess(false);
    setFormData({ name: '', phone: '' });
    setIsSubmitting(false);
    
    if (phaserGame.current) {
      // Stop tất cả scenes
      const scenes = phaserGame.current.scene.getScenes(true);
      scenes.forEach(scene => {
        if (scene.scene.isActive()) {
          scene.scene.stop();
        }
      });
      
      // Restart MenuScene
      setTimeout(() => {
        phaserGame.current?.scene.start('MenuScene');
      }, 100);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div ref={gameContainer} style={styles.container} />
      
      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.formContainer}>
            {!submitSuccess ? (
              <>
                <div style={styles.header}>
                  <div style={styles.smileIcon}>😁</div>
                  <h2 style={styles.title}>Chúc mừng!</h2>
                  <div style={styles.scoreDisplay}>
                    <span style={styles.scoreLabel}>Điểm số:</span>
                    <span style={styles.scoreValue}>{gameResult?.score || 0}</span>
                  </div>
                  <p style={styles.tagline}>🌿 PineSmile – Nụ cười xanh từ thiên nhiên</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                  <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Họ và tên *</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Nhập họ và tên của bạn"
                      disabled={isSubmitting}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label htmlFor="phone" style={styles.label}>Số điện thoại *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      pattern="[0-9]{10,11}"
                      placeholder="Nhập số điện thoại"
                      disabled={isSubmitting}
                      style={styles.input}
                    />
                  </div>

                  <div style={styles.formActions}>
                    <button type="submit" disabled={isSubmitting} style={styles.btnSubmit}>
                      {isSubmitting ? 'Đang gửi...' : 'Gửi kết quả'}
                    </button>
                    <button 
                      type="button" 
                      onClick={handlePlayAgain} 
                      disabled={isSubmitting} 
                      style={styles.btnSecondary}
                    >
                      Chơi lại
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div style={styles.successMessage}>
                <div style={styles.successIcon}>✓</div>
                <h3 style={styles.successTitle}>Gửi thành công!</h3>
                <p style={styles.successText}>Cảm ơn bạn đã tham gia.</p>
                <p style={styles.successText}>Đang khởi động lại game...</p>
              </div>
            )}
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
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#2E7D32',
    fontSize: '14px',
    fontWeight: '600'
  },
  input: {
    padding: '14px 16px',
    border: '2px solid #C8E6C9',
    borderRadius: '12px',
    fontSize: '16px',
    background: 'white'
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
  },
  successMessage: {
    textAlign: 'center',
    padding: '20px'
  },
  successIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #4CAF50, #66BB6A)',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 'bold',
    margin: '0 auto 20px'
  },
  successTitle: {
    color: '#2E7D32',
    fontSize: '24px',
    margin: '0 0 8px 0'
  },
  successText: {
    color: '#66BB6A',
    fontSize: '16px',
    margin: '4px 0'
  }
};

export default GreenSmileGame;