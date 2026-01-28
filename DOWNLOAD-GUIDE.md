# 📥 Download & Deploy Guide

## ✅ เสร็จแล้ว! Code ของคุณพร้อมดาวโหลด

### 📦 โครงสร้าง Project (Data-Driven Architecture)

```
MyProject/
├── src/
│   ├── index.html              (Template - ไม่ต้องแก้ไข)
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css      (ดีไซน์ - แก้ได้)
│   │   ├── js/
│   │   │   ├── app.js          (โหลดข้อมูล - ไม่ต้องแก้)
│   │   │   └── counter.js      (Visitor counter)
│   │   ├── images/             (รูปภาพของคุณ)
│   │   ├── fonts/              (Fonts เพิ่มเติม)
│   │   └── data/
│   │       └── portfolio.json   (📝 ข้อมูลทั้งหมด - แก้ตรงนี้!)
│   └── pages/
├── Documentation files...
└── .git/                        (Git repo)
```

---

## 🎯 วิธีใช้งาน

### 1️⃣ **ดาวโหลด Code**

```bash
# Clone จาก local folder
cp -r /workspaces/MyProject ~/my-portfolio

# หรือใช้ Git ถ้า push ขึ้น GitHub
git clone https://github.com/YOUR_USERNAME/MyProject.git
```

### 2️⃣ **แก้ไขข้อมูล (เพียงแค่แก้ JSON)**

เปิดไฟล์: `src/assets/data/portfolio.json`

```json
{
  "personal": {
    "name": "Chayangkul Somruk",        // ← แก้ชื่อ
    "email": "your@email.com",          // ← แก้อีเมล
    "phone": "+66912345678",            // ← แก้เบอร์
    "title": "Your Job Title",          // ← แก้ตำแหน่ง
    // ... อื่นๆ
  },
  "skills": [
    {
      "title": "Your Skill",            // ← แก้ Skill
      "items": ["Skill 1", "Skill 2"]
    }
  ],
  "experience": [
    {
      "position": "Your Position",      // ← แก้ตำแหน่ง
      "company": "Company Name",        // ← แก้บริษัท
      // ... อื่นๆ
    }
  ]
  // ฯลฯ
}
```

✅ **บันทึก JSON** → HTML อัปเดตอัตโนมัติ!

### 3️⃣ **ทดสอบ Local**

```bash
cd src
python3 -m http.server 8000
```

เปิด: `http://localhost:8000`

### 4️⃣ **Deploy ขึ้น Cloud**

#### **AWS S3 (แนะนำ)**
```bash
aws s3 sync src/ s3://your-bucket-name/
```

#### **Netlify / Vercel**
```bash
# Push ขึ้น GitHub ก่อน
git push origin main

# Netlify/Vercel จะ deploy อัตโนมัติ
```

#### **GitHub Pages**
```bash
# Push ขึ้น GitHub
git push origin main

# Enable GitHub Pages ใน Settings
```

---

## 🔧 แก้ไข Portfolio ทีละส่วน

### 📝 เปลี่ยนข้อมูลส่วนตัว
```json
"personal": {
  "name": "Your Name",
  "title": "Your Title",
  "description": "Your bio",
  "email": "your@email.com",
  "phone": "+66...",
  "location": "Your Location",
  "linkedin": "https://linkedin.com/in/...",
  "github": "https://github.com/...",
  "twitter": "https://twitter.com/..."
}
```

### 💻 เพิ่ม Skill
```json
"skills": [
  {
    "icon": "🎯",
    "title": "My Skill",
    "items": [
      "Skill 1",
      "Skill 2",
      "Skill 3"
    ]
  }
]
```

### 💼 เพิ่ม Experience
```json
"experience": [
  {
    "position": "Job Title",
    "company": "Company Name",
    "date": "Jan 2024 - Present",
    "achievements": [
      "Achievement 1",
      "Achievement 2"
    ]
  }
]
```

### 🚀 เพิ่ม Project
```json
"projects": [
  {
    "emoji": "🎯",
    "title": "Project Name",
    "tech": "Tech Stack",
    "description": "Project description"
  }
]
```

---

## 🎨 แก้ไข Design

เปิดไฟล์: `src/assets/css/styles.css`

### เปลี่ยนสี
```css
:root {
  --primary: #0066cc;     /* สีหลัก */
  --secondary: #00d9ff;   /* สีรอง */
  --accent: #ff6b9d;      /* สีเน้น */
}
```

### เปลี่ยนแบบอักษร
```css
body {
  font-family: 'Your Font', sans-serif;
}
```

---

## 📊 วิธี Download

### Option 1: Download ZIP
```bash
# สร้าง ZIP
cd ~
zip -r my-portfolio.zip /workspaces/MyProject

# ดาวโหลดไปเครื่องของคุณ
```

### Option 2: Push ขึ้น GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git branch -M main
git push -u origin main
```

---

## ✨ มีอะไรพิเศษ?

✅ **Data-Driven**: ข้อมูลแยกใน JSON - แก้ง่าย  
✅ **Responsive**: ใช้ได้ทั้ง Desktop, Tablet, Mobile  
✅ **Professional**: CSS Grid, Flexbox, Animations  
✅ **No Database**: Static site - deploy ได้ไหน ก็ได้  
✅ **Fast**: ไม่ต้อง backend - S3 + CloudFront ได้ใน 5 นาที  

---

## 🚀 Next Steps

1. ✅ แก้ไข `portfolio.json` ด้วยข้อมูลของคุณ
2. ✅ ทดสอบด้วย `python3 -m http.server 8000`
3. ✅ เพิ่มรูปภาพใน `src/assets/images/`
4. ✅ Push ขึ้น GitHub / Deploy ขึ้น Cloud

---

## 📧 ติดต่อ

มีคำถามหรือปัญหา? ตรวจสอบ:
- `QUICK-START.md` - Quick reference
- `STRUCTURE.md` - File organization
- `PORTFOLIO-GUIDE.md` - Customization guide
