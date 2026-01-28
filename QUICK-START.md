# 🚀 Quick Start - View Your Portfolio Locally

## Step 1: Test Locally in Your Browser

### Option A: Python Server (Recommended)

```bash
# Navigate to the src directory
cd /workspaces/MyProject/src

# Start a simple server
python3 -m http.server 8000

# Open in browser: http://localhost:8000
```

### Option B: VS Code Live Server

1. Install **Live Server** extension in VS Code
2. Right-click on `index.html` 
3. Select "Open with Live Server"
4. Browser opens automatically

### Option C: Direct File Open

```bash
# On Mac/Linux
open /workspaces/MyProject/src/index.html

# On Windows
start /workspaces/MyProject/src/index.html
```

---

## Step 2: Customize Your Content

Edit these files to personalize your portfolio:

### Edit: `/workspaces/MyProject/src/index.html`

Find and replace:
- `Your Name` → Your actual name
- `your.email@example.com` → Your email
- `+1234567890` → Your phone
- LinkedIn/GitHub URLs → Your profiles
- Job titles, companies, dates → Your experience
- Skills → Your actual skills
- Projects → Your real projects

### Edit: `/workspaces/MyProject/src/styles.css`

Find and update color variables (around line 5-20):
```css
--primary: #0066cc;      /* Change to your brand color */
--secondary: #00d9ff;    /* Change to accent color */
```

---

## Step 3: Preview Changes

After making changes:

1. Save the file (Ctrl+S or Cmd+S)
2. Refresh browser (F5 or Cmd+R)
3. Hard refresh if changes don't appear (Ctrl+Shift+R)

---

## Step 4: Check Responsiveness

Test your portfolio on different screen sizes:

1. Open DevTools (F12)
2. Click device icon (Responsive Design Mode)
3. Test on:
   - Desktop (1920x1080)
   - Tablet (768x1024)
   - Mobile (375x667)

All sections should look good! ✓

---

## Step 5: Deploy to AWS

Once satisfied with your design:

```bash
# From your project root directory
cd /workspaces/MyProject

# Deploy to S3 (replace with your bucket name)
aws s3 sync src/ s3://your-bucket-name/

# If using CloudFront, invalidate cache
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

---

## 📋 Quick Customization Checklist

- [ ] Updated name in hero section
- [ ] Updated subtitle/profession
- [ ] Updated email and phone
- [ ] Added real LinkedIn and GitHub URLs
- [ ] Updated about section with your bio
- [ ] Updated skills with your actual skills
- [ ] Added your work experience
- [ ] Added your projects
- [ ] Changed colors to match your brand
- [ ] Added your photo (optional, replaces emoji)
- [ ] Tested on mobile, tablet, desktop
- [ ] Deployed to S3 (if ready)

---

## 🎨 Color Scheme Ideas

### Option 1: Tech Blue (Current)
```css
--primary: #0066cc;
--secondary: #00d9ff;
```

### Option 2: Modern Purple
```css
--primary: #7c3aed;
--secondary: #a78bfa;
```

### Option 3: Professional Dark
```css
--primary: #1e40af;
--secondary: #3b82f6;
```

### Option 4: Warm Orange
```css
--primary: #ea580c;
--secondary: #fb923c;
```

Change these in the `:root` section of `styles.css`

---

## 💡 Pro Tips

1. **Use real images** - Replace emoji placeholder with your headshot
2. **Link to real projects** - Add actual GitHub repo links
3. **Be specific** - Avoid generic descriptions, be specific about achievements
4. **Keep it updated** - Add new projects and experience as you grow
5. **Mobile first** - Always check how it looks on phone

---

## ⚡ Performance Check

Your portfolio loads fast because:
- No heavy frameworks
- Single CSS file
- Minimal JavaScript
- CloudFront CDN (if deployed)

Typical load time: **< 1 second**

---

## 🆘 Troubleshooting

**Problem**: CSS not loading properly
- **Solution**: Make sure `styles.css` is in the same folder as `index.html`

**Problem**: Links look broken
- **Solution**: Check that URLs are complete (starting with http:// or https://)

**Problem**: Layout looks weird on mobile
- **Solution**: Hard refresh (Ctrl+Shift+R) and check viewport meta tag is present

**Problem**: Colors look different
- **Solution**: Check browser zoom level (should be 100%)

---

## 📞 Support

For detailed help:
- See [Step 2: Create HTML/CSS Resume](./02-html-css-resume.md)
- See [PORTFOLIO-GUIDE.md](./PORTFOLIO-GUIDE.md)
- Check [troubleshooting section](#-troubleshooting)

---

## ✨ What's Next?

After customizing locally:

1. **Deploy to AWS** → [Go to Step 3: S3 Hosting](./03-s3-static-hosting.md)
2. **Add HTTPS & Domain** → [Go to Step 4: CloudFront](./04-cloudfront-https.md)
3. **Add Visitor Counter** → [Go to Step 5: Visitor Counter](./05-visitor-counter.md)

Happy building! 🚀
