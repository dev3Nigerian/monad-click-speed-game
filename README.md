# Monad Game with Games ID Integration

A React-based game that demonstrates integration with Monad Games ID for authentication and score tracking.

## Features

- 🔐 **Monad Games ID Authentication**: Secure user authentication using Monad's OAuth system
- 🎮 **Interactive Game**: Simple click speed game with real-time scoring
- 📊 **Score Tracking**: Automatic score saving to Monad's backend
- 🏆 **Leaderboard Ready**: Scores are stored for leaderboard functionality
- 🎯 **Demo Mode**: Try the game without setting up authentication
- 🎨 **Modern UI**: Beautiful, responsive design with gradient backgrounds

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Monad Games ID credentials (for production use)

## Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd monad-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your Monad Games ID credentials:
   ```env
   VITE_MONAD_CLIENT_ID=your-actual-client-id
   VITE_MONAD_REDIRECT_URI=http://localhost:3000
   VITE_MONAD_API_URL=https://api.monad.games
   VITE_MONAD_AUTH_URL=https://auth.monad.games
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Monad Games ID Integration

This project demonstrates how to integrate Monad Games ID into your game:

### Authentication Flow

1. **Initialization**: The app initializes Monad Games ID on startup
2. **Login**: Users can sign in using Monad's OAuth system
3. **Session Management**: User sessions are stored locally and restored on page reload
4. **Score Tracking**: Game scores are automatically sent to Monad's backend

### Key Components

- `MonadGamesID` service (`src/services/MonadGamesID.ts`): Handles all authentication and API calls
- `AuthComponent` (`src/components/AuthComponent.tsx`): Login interface
- `GameComponent` (`src/components/GameComponent.tsx`): Game logic with score tracking

### API Endpoints Used

- `POST /oauth/token`: Exchange authorization code for access token
- `GET /user/profile`: Get authenticated user information
- `POST /games/scores`: Save game scores
- `GET /games/scores`: Retrieve user scores

## Development

### Project Structure

```
src/
├── components/
│   ├── AuthComponent.tsx    # Authentication UI
│   └── GameComponent.tsx    # Game logic and UI
├── services/
│   └── MonadGamesID.ts      # Monad integration service
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css               # Global styles
```

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Demo Mode

For development and testing, the app includes a demo mode that:
- Creates a mock user session
- Simulates score tracking (logs to console)
- Allows testing without Monad credentials

## Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Configure production environment**
   - Set up proper Monad Games ID credentials
   - Update redirect URIs for your domain
   - Configure CORS settings

3. **Deploy to your hosting platform**
   - The `dist/` folder contains the built application
   - Serve it using any static file server

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_MONAD_CLIENT_ID` | Your Monad Games ID client ID | Yes |
| `VITE_MONAD_REDIRECT_URI` | OAuth redirect URI | Yes |
| `VITE_MONAD_API_URL` | Monad API base URL | Yes |
| `VITE_MONAD_AUTH_URL` | Monad auth base URL | Yes |
| `VITE_GAME_ID` | Unique identifier for your game | No |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions about Monad Games ID integration, refer to the [official documentation](https://monad-foundation.notion.site/How-to-integrate-Monad-Games-ID-24e6367594f2802b8dd1ef3fbf3d136a).

## Game Rules

- Click the target as fast as you can for 30 seconds
- Your score is the number of successful clicks
- Scores are automatically saved to your Monad Games ID profile
- Try to beat your high score!

---

Built with ❤️ for the Monad ecosystem
