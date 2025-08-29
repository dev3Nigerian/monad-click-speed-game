# Monad Game Setup Instructions

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## 🎮 How to Play

1. **Choose Authentication Method**:
   - **Demo Mode**: Click "Demo Mode" to try the game without authentication
   - **Monad Games ID**: Click "Sign in with Monad Games ID" for full integration

2. **Play the Game**:
   - Click "Start Game" to begin
   - Click the target circle as fast as you can for 30 seconds
   - Your score is automatically saved to your Monad Games ID profile

## 🔧 Configuration

### Environment Variables (Optional)

Create a `.env.local` file in the project root:

```env
VITE_MONAD_CLIENT_ID=your-client-id-here
VITE_MONAD_REDIRECT_URI=http://localhost:3000
VITE_MONAD_API_URL=https://api.monad.games
VITE_MONAD_AUTH_URL=https://auth.monad.games
```

### Production Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting platform

## 📁 Project Structure

```
monad-game/
├── src/
│   ├── components/
│   │   ├── AuthComponent.tsx    # Login interface
│   │   └── GameComponent.tsx    # Game logic
│   ├── services/
│   │   └── MonadGamesID.ts      # Monad integration
│   ├── App.tsx                  # Main app component
│   ├── main.tsx                 # Entry point
│   └── index.css               # Styles
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## 🔐 Monad Games ID Integration

The project includes a complete implementation of Monad Games ID integration:

- **OAuth Authentication**: Secure user login with Monad's OAuth system
- **Session Management**: Automatic session restoration
- **Score Tracking**: Scores are saved to Monad's backend
- **User Profile**: Display user information and wallet address

### Features

- ✅ **Demo Mode**: Test without authentication
- ✅ **Real Authentication**: Full Monad Games ID integration
- ✅ **Score Persistence**: Scores saved to Monad backend
- ✅ **Modern UI**: Beautiful, responsive design
- ✅ **TypeScript**: Full type safety
- ✅ **Production Ready**: Build and deploy ready

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding Features

1. **New Game Modes**: Modify `GameComponent.tsx`
2. **UI Changes**: Update CSS in `index.css` and `App.css`
3. **Backend Integration**: Extend `MonadGamesID.ts` service

## 🎯 Game Rules

- Click the target as fast as possible for 30 seconds
- Your score equals the number of successful clicks
- Scores are automatically saved to your Monad profile
- Try to beat your high score!

## 🆘 Troubleshooting

### Common Issues

1. **Port already in use**: Change port in `vite.config.ts`
2. **Build errors**: Run `npm install` to ensure all dependencies are installed
3. **Authentication issues**: Check environment variables in `.env.local`

### Getting Help

- Check the [README.md](README.md) for detailed documentation
- Refer to [Monad Games ID documentation](https://monad-foundation.notion.site/How-to-integrate-Monad-Games-ID-24e6367594f2802b8dd1ef3fbf3d136a)

---

**Happy Gaming! 🎮**
