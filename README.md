# Shema Arafati H - Next.js Portfolio

A modern, responsive portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features a Matrix-style dark theme with smooth animations and interactive elements.

## Features

- 🌙 **Dark/Light Mode Toggle** - Seamless theme switching
- 📱 **Fully Responsive** - Optimized for all devices
- ✨ **Smooth Animations** - Powered by Framer Motion
- 🎨 **Modern Design** - Matrix-inspired dark theme
- 📧 **Contact Form** - Functional contact section
- 🚀 **Performance Optimized** - Built with Next.js best practices

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout with theme provider
│   │   └── page.tsx         # Main page component
│   ├── components/
│   │   ├── AboutSection.tsx # About section component
│   │   ├── ProjectsSection.tsx # Projects showcase
│   │   └── ContactSection.tsx # Contact form section
│   └── ...
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Customization

### Personal Information

Update the following in your components:

1. **Hero Section** (`src/app/page.tsx`):
   - Change name from "Shema Arafati H"
   - Update professional title
   - Add your profile photo

2. **About Section** (`src/components/AboutSection.tsx`):
   - Update the bio text
   - Modify statistics (years experience, projects, etc.)
   - Update contact information

3. **Projects Section** (`src/components/ProjectsSection.tsx`):
   - Add your actual projects
   - Update project descriptions
   - Add GitHub and demo links

4. **Contact Section** (`src/components/ContactSection.tsx`):
   - Update contact details
   - Configure form submission (integrate with backend service)

### Adding Your Profile Photo

1. Place your photo in the `public/` folder
2. Update the profile image in `src/app/page.tsx`:
   ```tsx
   <Image
     src="/your-photo.jpg"
     alt="Shema Arafati H"
     width={320}
     height={320}
     className="rounded-full"
   />
   ```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

---

**Built with ❤️ using Next.js**
