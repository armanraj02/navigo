# Navigo Deployment Guide

This guide covers deployment pipelines for Vercel, Netlify, Docker, and standard static hosting environments.

---

## ⚡ Vercel Deployment

Navigo is fully configured for deployment on Vercel:

1. **Connect Repository:** Import the repository into your Vercel Dashboard.
2. **Configure Settings:**
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
3. **Environment Variables:** Set `NODE_ENV = production`.
4. **Deploy:** Vercel automatically runs the Turbopack optimized static assets compiler.

---

## 🐳 Docker Container Deployment

To containerize and run Navigo in production:

### 1. Create a `Dockerfile` in the root directory:
```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image, copy all files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "start"]
```

### 2. Build and Run:
```bash
docker build -t navigo-frontend .
docker run -p 3000:3000 navigo-frontend
```

---

## 📦 Static Hosting / Export Setup

If you wish to export Navigo as a static client-only app:
1. Modify `next.config.ts` to include:
   ```typescript
   const nextConfig = {
     output: 'export',
   };
   ```
2. Run build:
   ```bash
   npm run build
   ```
3. Deploy the resulting `out/` folder to Netlify, S3, or GitHub Pages.
