# syntax=docker/dockerfile:1

FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build

FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci
COPY backend ./
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
ENV STATIC_FRONTEND_DIR=/app/public

RUN addgroup -g 1001 -S nodejs && adduser -S portfolio -u 1001 -G nodejs

COPY backend/package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/src/templates ./src/templates
COPY --from=frontend-builder /app/frontend/dist ./public

RUN mkdir -p logs tmp data && chown -R portfolio:nodejs /app
USER portfolio

EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3001/api/health || exit 1
CMD ["node", "dist/server.js"]
