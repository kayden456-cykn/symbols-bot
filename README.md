# Animal Company Symbol Bot

JavaScript Discord bot with a TypeScript symbol/solution database.

## Commands
- `/symbols` — shows the current symbol database whenever run.
- `/symbols name:<symbol>` — looks up a symbol.
- `/solve puzzle:<name>` — returns a saved puzzle sequence.

## Setup
1. Install Node.js 20+.
2. Create a Discord application/bot and invite it with `bot` and `applications.commands` scopes.
3. Copy `.env.example` to `.env`; set the token, application ID, and test server ID.
4. Run `npm install`, `npm run register`, then `npm start`.

## Updating data
Edit `src/data/symbols.ts` and add verified symbols and sequences. The bot must be restarted after editing this file. The original uploaded file was an IL2CPP export map, not verified in-game symbol data, so no actual puzzle answers are invented.

For automatic announcements when an external source updates, the bot needs a specific website/API/feed to monitor. Never commit your real bot token.
