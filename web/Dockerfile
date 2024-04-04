# Build stage
FROM node:18-alpine as builder
WORKDIR /app

# Copy the package.json, yarn.lock file, and install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the application
RUN yarn build

# Run stage
FROM node:18-alpine as runner
WORKDIR /app

# Copy necessary files from builder to runner
COPY --from=builder /app/package.json .
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static


