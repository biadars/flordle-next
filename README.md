# flordle
This is a song guessing game based off of heardle, specifically for Hozier and Florence and the Machine songs.

## Installation
To run your own version of this:
1. Set up a heroku app using this repository (or otherwise setup hosting and a database)
2. Set up a spotify app using the [spotify developer portal](https://developer.spotify.com/)
3. Create your own .env file containing:
    * Your spotify credentials: SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REDIRECT_URI
    * Your database credentials: DATABASE_URL
4. Populate your database with songs of your choice using commands of the format:
   ```
   INSERT INTO "Song" ("Artist", "Title", "SpotifyUri") VALUES ('Hozier', 'Take Me To Church', 'spotify:track:70LrxJ5u19umvrXbC19g20');
   ```
   You can obtain the spotify URI in the spotify desktop app - open the actions menu for a song, hold down CTRL and hover over the share menu to see a 'Copy Spotify URI' option
5. Run `npm install` to install this project's dependencies
6. To run it, run the following commands:
    ```
   npm run build
   heroku local
    ```
7. Or alternatively, to run it in development mode: `npm run dev`
8. Be mindful that for people to play, you need to add them as beta testers of your spotify application in the developer portal