
// Monad Games ID Service
// This service handles authentication and user management for Monad games

interface User {
  id: string
  username: string
  walletAddress: string
  email?: string
}

interface GameScore {
  gameId: string
  score: number
  timestamp: number
}

class MonadGamesID {
  private static instance: MonadGamesID
  private isInitialized = false
  private currentUser: User | null = null
  private gameId: string = 'monad-demo-game'

  // Configuration - replace with your actual values
  private config = {
    clientId: (import.meta as any).env.VITE_MONAD_CLIENT_ID || 'your-client-id',
    redirectUri: (import.meta as any).env.VITE_MONAD_REDIRECT_URI || 'http://localhost:3000',
    apiUrl: (import.meta as any).env.VITE_MONAD_API_URL || 'https://api.monad.games',
    authUrl: (import.meta as any).env.VITE_MONAD_AUTH_URL || 'https://auth.monad.games'
  }

  private constructor() {}

  static getInstance(): MonadGamesID {
    if (!MonadGamesID.instance) {
      MonadGamesID.instance = new MonadGamesID()
    }
    return MonadGamesID.instance
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return
    }

    try {
      // Check if we have a stored session
      const storedUser = localStorage.getItem('monad_user')
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser)
      }

      // Check for auth callback
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      const state = urlParams.get('state')

      if (code && state) {
        // Handle OAuth callback
        await this.handleAuthCallback(code, state)
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
      }

      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize Monad Games ID:', error)
      throw error
    }
  }

  async login(): Promise<User> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    try {
      // Generate state parameter for security
      const state = this.generateRandomString(32)
      localStorage.setItem('monad_auth_state', state)

      // Redirect to Monad auth
      const authUrl = `${this.config.authUrl}/oauth/authorize?` +
        `client_id=${this.config.clientId}&` +
        `redirect_uri=${encodeURIComponent(this.config.redirectUri)}&` +
        `response_type=code&` +
        `state=${state}&` +
        `scope=profile email`

      window.location.href = authUrl
      
      // This will redirect, so we won't reach here
      throw new Error('Redirect initiated')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  private async handleAuthCallback(code: string, state: string): Promise<void> {
    const storedState = localStorage.getItem('monad_auth_state')
    if (state !== storedState) {
      throw new Error('Invalid state parameter')
    }

    try {
      // Exchange code for access token
      const tokenResponse = await fetch(`${this.config.apiUrl}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: this.config.clientId,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri
        })
      })

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token')
      }

      const tokenData = await tokenResponse.json()
      
      // Get user profile
      const userResponse = await fetch(`${this.config.apiUrl}/user/profile`, {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`
        }
      })

      if (!userResponse.ok) {
        throw new Error('Failed to get user profile')
      }

      const userData = await userResponse.json()
      
      this.currentUser = {
        id: userData.id,
        username: userData.username,
        walletAddress: userData.wallet_address,
        email: userData.email
      }

      // Store user data
      localStorage.setItem('monad_user', JSON.stringify(this.currentUser))
      localStorage.setItem('monad_access_token', tokenData.access_token)
      
      // Clean up
      localStorage.removeItem('monad_auth_state')
    } catch (error) {
      console.error('Auth callback failed:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      // Clear local storage
      localStorage.removeItem('monad_user')
      localStorage.removeItem('monad_access_token')
      localStorage.removeItem('monad_auth_state')
      
      this.currentUser = null
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (!this.isInitialized) {
      await this.initialize()
    }
    return this.currentUser
  }

  async updateUserScore(score: number): Promise<void> {
    if (!this.currentUser) {
      throw new Error('User not authenticated')
    }

    const accessToken = localStorage.getItem('monad_access_token')
    if (!accessToken) {
      throw new Error('No access token found')
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/games/scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          gameId: this.gameId,
          score: score,
          timestamp: Date.now()
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update score')
      }
    } catch (error) {
      console.error('Failed to update score:', error)
      throw error
    }
  }

  async getUserScores(): Promise<GameScore[]> {
    if (!this.currentUser) {
      throw new Error('User not authenticated')
    }

    const accessToken = localStorage.getItem('monad_access_token')
    if (!accessToken) {
      throw new Error('No access token found')
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/games/scores?gameId=${this.gameId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to get user scores')
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to get user scores:', error)
      throw error
    }
  }

  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Mock implementation for development
  async mockLogin(): Promise<User> {
    const mockUser: User = {
      id: 'mock-user-123',
      username: 'DemoPlayer',
      walletAddress: '0x1234567890123456789012345678901234567890',
      email: 'demo@example.com'
    }
    
    this.currentUser = mockUser
    localStorage.setItem('monad_user', JSON.stringify(mockUser))
    
    return mockUser
  }

  async mockUpdateScore(score: number): Promise<void> {
    console.log(`Mock score update: ${score}`)
    // In a real implementation, this would send to Monad's API
  }
}

// Export singleton instance
export const monadGamesID = MonadGamesID.getInstance()

// For backward compatibility
export { MonadGamesID }
