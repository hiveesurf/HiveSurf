// Game System Tracker - Manages mini-games Easter egg system
// Handles 24-hour cooldowns, localStorage, and Google Analytics integration

// Google Analytics 4 Configuration
const GA4_CONFIG = {
  measurementId: 'G-XXXXXXXXXX', // Replace with your GA4 Measurement ID
  customEvents: {
    gameStarted: 'game_started',
    gameCompleted: 'game_completed',
    gameFailed: 'game_failed',
    cooldownTriggered: 'cooldown_triggered',
    rewardClaimed: 'reward_claimed',
    highScoreAchieved: 'high_score_achieved',
    logoClicks: 'logo_clicks'
  }
};

class GameSystemTracker {
  constructor() {
    this.totalGames = 3;
    this.gameDuration = 5000; // 5 seconds
    this.cooldownDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    this.requiredLogoClicks = 9;
    
    // Initialize game progress from localStorage
    this.gameProgress = this.loadGameProgress();
    this.initGA4();
  }

  // Initialize Google Analytics 4
  initGA4() {
    if (typeof window !== 'undefined' && !window.gtag) {
      // Load GA4 script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_CONFIG.measurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA4_CONFIG.measurementId);
    }
  }

  // Load game progress from localStorage
  loadGameProgress() {
    const defaultProgress = {
      currentStage: 0, // 0=not started, 1-3=current game
      game1: { 
        completed: false, 
        highScore: 0, 
        lastAttempt: null, 
        cooldownUntil: null 
      },
      game2: { 
        completed: false, 
        highScore: 0, 
        lastAttempt: null, 
        cooldownUntil: null 
      },
      game3: { 
        completed: false, 
        highScore: 0, 
        lastAttempt: null, 
        cooldownUntil: null 
      },
      totalAttempts: 0,
      totalWins: 0,
      userProfile: { userId: '', name: '', phone: '', email: '' },
      rewardClaimed: false,
      rewardDismissed: false
    };

    try {
      const stored = localStorage.getItem('gameProgress');
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress;
    } catch (error) {
      return defaultProgress;
    }
  }

  // Save game progress to localStorage
  saveGameProgress() {
    try {
      localStorage.setItem('gameProgress', JSON.stringify(this.gameProgress));
    } catch (error) {
    }
  }

  // Check if user is in cooldown
  isInCooldown() {
    const now = Date.now();
    const cooldownUntil = this.gameProgress.game1.cooldownUntil || 
                         this.gameProgress.game2.cooldownUntil || 
                         this.gameProgress.game3.cooldownUntil;
    
    return cooldownUntil && now < cooldownUntil;
  }

  // Get time remaining in cooldown (in milliseconds)
  getCooldownTimeRemaining() {
    if (!this.isInCooldown()) return 0;
    
    const now = Date.now();
    const cooldownUntil = this.gameProgress.game1.cooldownUntil || 
                         this.gameProgress.game2.cooldownUntil || 
                         this.gameProgress.game3.cooldownUntil;
    
    return Math.max(0, cooldownUntil - now);
  }

  // Format cooldown time as HH:MM:SS
  getCooldownTimeFormatted() {
    const remaining = this.getCooldownTimeRemaining();
    if (remaining === 0) return '00:00:00';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Start a game
  startGame(gameNumber) {
    if (this.isInCooldown()) {
      return false;
    }

    if (gameNumber === 1 && this.gameProgress.currentStage === 0) {
      this.gameProgress.currentStage = 1;
      this.gameProgress.totalAttempts++;
      this.saveGameProgress();
      
      this.trackEvent(GA4_CONFIG.customEvents.gameStarted, {
        game_number: gameNumber,
        current_stage: this.gameProgress.currentStage
      });
      
      return true;
    }

    if (gameNumber > 1 && this.gameProgress[`game${gameNumber - 1}`].completed) {
      this.gameProgress.currentStage = gameNumber;
      this.gameProgress.totalAttempts++;
      this.saveGameProgress();
      
      this.trackEvent(GA4_CONFIG.customEvents.gameStarted, {
        game_number: gameNumber,
        current_stage: this.gameProgress.currentStage
      });
      
      return true;
    }

    return false;
  }

  // Complete a game successfully
  completeGame(gameNumber, score) {
    const gameKey = `game${gameNumber}`;
    const now = Date.now();
    
    this.gameProgress[gameKey].completed = true;
    this.gameProgress[gameKey].lastAttempt = now;
    
    if (score > this.gameProgress[gameKey].highScore) {
      this.gameProgress[gameKey].highScore = score;
      this.trackEvent(GA4_CONFIG.customEvents.highScoreAchieved, {
        game_number: gameNumber,
        score: score
      });
    }
    
    this.gameProgress.totalWins++;
    this.saveGameProgress();
    
    this.trackEvent(GA4_CONFIG.customEvents.gameCompleted, {
      game_number: gameNumber,
      score: score,
      high_score: this.gameProgress[gameKey].highScore
    });
    
    return true;
  }

  // Fail a game (triggers 24-hour cooldown)
  failGame(gameNumber, score, reason = 'timeout') {
    const gameKey = `game${gameNumber}`;
    const now = Date.now();
    const cooldownUntil = now + this.cooldownDuration;
    
    // Set cooldown for all games
    this.gameProgress.game1.cooldownUntil = cooldownUntil;
    this.gameProgress.game2.cooldownUntil = cooldownUntil;
    this.gameProgress.game3.cooldownUntil = cooldownUntil;
    
    this.gameProgress[gameKey].lastAttempt = now;
    this.gameProgress.currentStage = 0; // Reset to beginning
    this.saveGameProgress();
    
    this.trackEvent(GA4_CONFIG.customEvents.gameFailed, {
      game_number: gameNumber,
      score: score,
      reason: reason
    });
    
    this.trackEvent(GA4_CONFIG.customEvents.cooldownTriggered, {
      game_failed: gameNumber,
      cooldown_until: new Date(cooldownUntil).toISOString()
    });
    
    return true;
  }

  // Check if all games are completed
  areAllGamesCompleted() {
    return this.gameProgress.game1.completed && 
           this.gameProgress.game2.completed && 
           this.gameProgress.game3.completed;
  }

  // Reset all progress (for testing or after reward claimed)
  resetProgress() {
    this.gameProgress = {
      currentStage: 0,
      game1: { completed: false, highScore: 0, lastAttempt: null, cooldownUntil: null },
      game2: { completed: false, highScore: 0, lastAttempt: null, cooldownUntil: null },
      game3: { completed: false, highScore: 0, lastAttempt: null, cooldownUntil: null },
      totalAttempts: 0,
      totalWins: 0,
      userProfile: { userId: '', name: '', phone: '', email: '' },
      rewardClaimed: false,
      rewardDismissed: false
    };
    this.saveGameProgress();
  }

  // Claim reward (after all games completed)
  claimReward(userProfile) {
    if (!this.areAllGamesCompleted()) {
      return false;
    }

    this.gameProgress.userProfile = userProfile;
    this.gameProgress.rewardClaimed = true;
    this.gameProgress.rewardDismissed = true; // also suppress future displays
    this.saveGameProgress();
    
    this.trackEvent(GA4_CONFIG.customEvents.rewardClaimed, {
      user_name: userProfile.name,
      user_phone: userProfile.phone,
      user_email: userProfile.email,
      total_attempts: this.gameProgress.totalAttempts,
      total_wins: this.gameProgress.totalWins
    });
    
    return true;
  }

  // Dismiss reward without claiming (user closed modal)
  dismissReward() {
    this.gameProgress.rewardDismissed = true;
    this.saveGameProgress();
  }

  // Track logo clicks
  trackLogoClicks(clickCount) {
    this.trackEvent(GA4_CONFIG.customEvents.logoClicks, {
      click_count: clickCount,
      required_clicks: this.requiredLogoClicks
    });
  }

  // Generic event tracking
  trackEvent(eventName, parameters = {}) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Get current game state
  getCurrentState() {
    return {
      currentStage: this.gameProgress.currentStage,
      isInCooldown: this.isInCooldown(),
      cooldownTimeRemaining: this.getCooldownTimeRemaining(),
      cooldownTimeFormatted: this.getCooldownTimeFormatted(),
      allGamesCompleted: this.areAllGamesCompleted(),
      totalAttempts: this.gameProgress.totalAttempts,
      totalWins: this.gameProgress.totalWins,
      gameProgress: this.gameProgress,
      rewardClaimed: this.gameProgress.rewardClaimed,
      rewardDismissed: this.gameProgress.rewardDismissed
    };
  }

  // Get game-specific data
  getGameData(gameNumber) {
    const gameKey = `game${gameNumber}`;
    return this.gameProgress[gameKey];
  }
}

// Export singleton instance
export const gameSystemTracker = new GameSystemTracker();
export default GameSystemTracker;
