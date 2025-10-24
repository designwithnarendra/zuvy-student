# Netlify Deployment Guide

This project is a **client-side React application** built with Vite and is fully compatible with Netlify's static site hosting.

## ✅ Pre-Deployment Checklist

- [x] Pure client-side React app (no SSR)
- [x] All data is mock data (no backend required)
- [x] Uses `BrowserRouter` for client-side routing
- [x] `_redirects` file configured for SPA routing
- [x] `netlify.toml` configured for build settings
- [x] Build tested and working

## 🚀 Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended for first deployment)

1. **Push your code to Git** (GitHub, GitLab, or Bitbucket)
   ```bash
   git add .
   git commit -m "Add Netlify deployment configuration"
   git push
   ```

2. **Connect to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build` (auto-detected from netlify.toml)
   - Publish directory: `dist` (auto-detected from netlify.toml)
   - Click "Deploy site"

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and deploy**
   ```bash
   netlify init
   # Follow the prompts to create a new site or link to existing

   # Deploy to production
   netlify deploy --prod
   ```

### Option 3: Drag & Drop Deploy (Quick test)

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Drag the `dist` folder** to Netlify's deploy dropzone at [app.netlify.com/drop](https://app.netlify.com/drop)

## 📁 Important Files

### `netlify.toml`
Tells Netlify how to build and deploy your site:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### `public/_redirects`
Enables client-side routing (SPA routing):
```
/*    /index.html   200
```

Both files serve the same purpose - the redirects configuration ensures all routes are handled by React Router.

## 🔧 Build Configuration

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Node Version**: 18.x or higher (Netlify default)

## ✨ Features Enabled

After deployment, your site will have:
- ✅ Direct URL access to any route (e.g., `/course/1`)
- ✅ Page refresh works on all routes
- ✅ Browser back/forward buttons work
- ✅ Shareable links to any page
- ✅ Fast static site performance
- ✅ Automatic HTTPS
- ✅ Global CDN distribution

## 🧪 Testing After Deployment

Test these scenarios to verify everything works:

1. **Homepage**: Visit root URL → Should load dashboard
2. **Direct route access**: Visit `your-site.netlify.app/course/1` → Should load course page
3. **Refresh test**: Navigate to any page, refresh → Page should reload correctly
4. **Deep link test**: Share link to `/module/2` → Should work when opened
5. **404 test**: Visit invalid route like `/nonexistent` → Should show your NotFound page

## 🐛 Troubleshooting

### Issue: 404 on page refresh
**Solution**: Make sure `_redirects` file exists in `public/` folder and `netlify.toml` has the redirects configuration.

### Issue: Build fails with "command not found"
**Solution**: Ensure `package.json` has the build script:
```json
"scripts": {
  "build": "vite build"
}
```

### Issue: Assets not loading
**Solution**: Check that paths in your code use relative paths or start with `/`. Vite handles this automatically.

### Issue: Environment variables needed
**Solution**: Set them in Netlify dashboard under Site settings > Environment variables. Not needed for this project as all data is mock.

## 📊 Build Output

Current build stats:
- CSS: ~75 KB (gzipped: ~13 KB)
- JS: ~634 KB (gzipped: ~185 KB)
- Total: ~710 KB (gzipped: ~198 KB)

## 🎯 Next Steps (Optional Optimizations)

1. **Code splitting**: Implement dynamic imports to reduce initial bundle size
2. **Image optimization**: Optimize images in `/public/lovable-uploads`
3. **Custom domain**: Add your custom domain in Netlify settings
4. **Analytics**: Add Netlify Analytics or Google Analytics
5. **Forms**: If you add contact forms, use Netlify Forms

## 📚 Resources

- [Netlify SPA Documentation](https://docs.netlify.com/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#netlify)
- [React Router with Netlify](https://ui.dev/react-router-cannot-get-url-refresh)

## ✅ Deployment Checklist

Before going live:
- [ ] Test all routes work
- [ ] Verify dark/light mode toggle works
- [ ] Check responsive design on mobile
- [ ] Test all interactive features
- [ ] Review console for errors
- [ ] Test on different browsers
- [ ] Share links to verify routing

---

**Your app is now ready for Netlify deployment! 🚀**
