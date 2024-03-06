# Використовуємо легший образ Node.js
FROM node:alpine

# Встановлюємо робочу директорію в /app
WORKDIR /app

# Копіюємо файли з реквізитами та встановлюємо залежності
COPY package.json yarn.lock ./
RUN yarn install

# Копіюємо всі файли в поточну робочу директорію образу
COPY . .

# Виконуємо збірку проекту
RUN yarn build

# Запускаємо застосунок на порту 3033
CMD ["yarn", "serve", "-s", "build", "-l", "3033"]
