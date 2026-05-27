FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache tini
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 --ingroup nodejs nodeuser
USER nodeuser
ENTRYPOINT ["/sbin/tini", "--"]
STOPSIGNAL SIGINT  # Node.js handles SIGINT for graceful shutdown; adjust for your framework
CMD ["node", "src/app.js"]
HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3000/health 2>/dev/null || curl -f http://localhost:3000/health 2>/dev/null || exit 1
