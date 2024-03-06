# Використовуємо офіційний базовий образ Python
FROM python:3.8-slim-buster

# Встановлюємо робочу директорію в /app
WORKDIR /app

# Копіюємо файли з реквізитами та встановлюємо залежності
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо всі файли в поточну робочу директорію образу
COPY . .

# Запускаємо Gunicorn на порту 3032
CMD ["gunicorn", "-b", "0.0.0.0:3032", "app:app"]
