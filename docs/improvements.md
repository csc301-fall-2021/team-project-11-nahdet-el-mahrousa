# Future Improvements

## Bot App

The bot app uses localStorage for the restoring conversation when reload. Google Analytics also collects user's geo-location, which in the final product the users should be notified.

The app should also support messages of various media, including link, video, or images.

## Server

The server currently implements a Dependency-Injection-like pattern, which is unnecessary and nonstandard in JavaScript. It should be change to plain function calls. The security issue should be better handled, with more advanced privilege checking in service layer, and distinct privileges of each user (e.g., canAccessBot, canModifyBot, canAccessStatistics).

The infrastructure of the server should be improved, in terms of error handling and logging formalization.
