
A simple template that uses WebPack to package a Firefox browser extension.  

# Project Structure

Code in `src` is organized by the following browser extension components:  sidebar, popup, content (content scripts), and background.  Each component has a corresponding section in the `manifest.json`.

Both html components (`popup` and `sidebar`) have their TypeScript code injected with Webpack during the build process.  See `webpack.config.js` for details.

# Usage

Build then start Firefox.

```bash
npm run build

npm run start:firefox
```

Check the console to see when each script is loaded.  If using `start:firefox` from above, switch to "Multiprocess" in the browser console.  As specified by the `manifest.json`, the content script will only be loaded when navigating to a local file URI.