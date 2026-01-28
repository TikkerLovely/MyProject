# 📁 Project Structure Guide

## Directory Organization

```
/workspaces/MyProject/
│
├── 📖 Documentation
│   ├── README.md
│   ├── QUICK-START.md
│   ├── START-HERE.md
│   ├── DESIGN-OVERVIEW.md
│   └── PORTFOLIO-GUIDE.md
│
└── 💻 Website (src/)
    ├── index.html                    # Main portfolio page
    │
    └── 📁 assets/                    # All static assets
        ├── 📁 css/
        │   └── styles.css            # All styling
        │
        ├── 📁 js/
        │   └── counter.js            # Visitor counter script
        │
        ├── 📁 images/                # Images & icons (optional)
        │   └── (your images here)
        │
        └── 📁 fonts/                 # Custom fonts (optional)
            └── (your fonts here)
```

## File Organization

### Root Files
- **index.html** - Main portfolio page (stays in root for S3 static hosting)

### CSS Files (`assets/css/`)
- **styles.css** - All styling (1000+ lines, well-organized)

### JavaScript Files (`assets/js/`)
- **counter.js** - Visitor counter functionality

### Images (`assets/images/`)
- Store all images here
- Examples: profile photo, project screenshots, icons

### Fonts (`assets/fonts/`)
- Store custom fonts here if not using Google Fonts

## Why This Structure?

✅ **Organized** - Files grouped by type  
✅ **Scalable** - Easy to add more files  
✅ **Professional** - Industry standard structure  
✅ **Maintainable** - Easy to find what you need  
✅ **S3 Compatible** - Works perfectly with AWS S3  

## How to Add Files

### Add an Image
1. Save image to `src/assets/images/`
2. Reference in HTML: `<img src="assets/images/your-image.jpg" alt="Description">`

### Add a Stylesheet
1. Create `src/assets/css/new-style.css`
2. Link in HTML: `<link rel="stylesheet" href="assets/css/new-style.css">`

### Add a Script
1. Create `src/assets/js/new-script.js`
2. Add to HTML: `<script src="assets/js/new-script.js"></script>`

## Deployment to S3

When deploying, the structure is preserved:

```
S3 Bucket (your-bucket-name/)
├── index.html
└── assets/
    ├── css/styles.css
    ├── js/counter.js
    ├── images/...
    └── fonts/...
```

All relative paths work automatically!

## Update Your HTML References

The HTML file has been updated to use the new paths:

```html
<!-- CSS -->
<link rel="stylesheet" href="assets/css/styles.css">

<!-- JavaScript -->
<script src="assets/js/counter.js"></script>

<!-- Images (example) -->
<img src="assets/images/your-photo.jpg" alt="Your Name">
```

## Quick Commands

```bash
# View structure
cd src && find . -type f

# Deploy everything
aws s3 sync src/ s3://your-bucket/

# Local server
cd src && python3 -m http.server 8000
```

## File Size Reference

Current files:
- `index.html` - ~13 KB
- `assets/css/styles.css` - ~16 KB
- `assets/js/counter.js` - ~2 KB
- **Total**: ~31 KB (very lightweight!)

---

**Clean, organized structure ready for production!** ✨
