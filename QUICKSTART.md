# Quick Start Guide

Follow these steps to personalize your portfolio in **15 minutes**:

## ✅ Step 1: Update Your Name & Info (5 min)

1. **[app/layout.tsx](app/layout.tsx)** - Line 17-20
   ```typescript
   title: "YOUR NAME — AI Engineer (Agri-AI, Edge AI)",
   description: "Your description here",
   ```

2. **[components/Header.tsx](components/Header.tsx)** - Line 46-52
   ```typescript
   <div className="...">YN</div>  // Change "YN" to your initials
   <span>Your Name</span>          // Change to your full name
   ```

3. **[components/Footer.tsx](components/Footer.tsx)** - Line 12-18
   ```typescript
   <div className="...">YN</div>  // Change "YN" to your initials
   <span>Your Name</span>          // Change to your full name
   ```

4. **[components/ContactForm.tsx](components/ContactForm.tsx)** - Line 82-83
   ```typescript
   href="mailto:your.email@example.com"  // Change to your email
   ```

## ✅ Step 2: Update Social Links (2 min)

Update in **both** [components/ContactForm.tsx](components/ContactForm.tsx) (line 91-108) and [components/Footer.tsx](components/Footer.tsx) (line 24-52):

```typescript
href="https://github.com/YOUR_USERNAME"
href="https://linkedin.com/in/YOUR_USERNAME"
href="https://twitter.com/YOUR_USERNAME"
```

## ✅ Step 3: Customize Hero Message (3 min)

**[components/Hero.tsx](components/Hero.tsx)** - Line 23-27

Change the headline to your elevator pitch:
```typescript
<h1>
  Your unique value proposition here
</h1>
```

## ✅ Step 4: Add Your Resume (1 min)

1. Save your resume as `resume.pdf`
2. Place it in the `public/` folder
3. Done! The download links are already configured

## ✅ Step 5: Test Locally (2 min)

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and verify:
- Your name appears in header and footer
- Hero section shows your message
- Social links point to your profiles
- Resume download works

## 🎯 Optional: Update Projects (Later)

When you're ready to add real project content:

1. Edit [lib/projects.ts](lib/projects.ts)
2. Add project images to `public/images/projects/`
3. Follow the structure of existing placeholder projects

See [public/PLACEHOLDER_GUIDE.md](public/PLACEHOLDER_GUIDE.md) for asset specs.

## 🚀 Deploy to Vercel (2 min)

1. Push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Click Deploy

**Done!** Your portfolio is live in minutes.

---

## 🎨 Want to Customize More?

See the complete [README.md](README.md) for:
- Color customization
- Adding more projects
- EmailJS setup
- Advanced configuration

## 💡 Pro Tips

1. **Don't worry about perfect images** - The placeholder styling looks clean even without custom images
2. **Start with placeholder projects** - You can update content incrementally
3. **Deploy early** - Get your portfolio live, then iterate based on feedback
4. **Mobile test** - Open your phone browser to check responsive design

## 🆘 Need Help?

- Build errors? Run `npm run build` to see specific issues
- Port already in use? Try `npm run dev -- -p 3001`
- Questions? Check [README.md](README.md) troubleshooting section

**You're ready! Update the basics above and deploy your portfolio in 15 minutes.**
