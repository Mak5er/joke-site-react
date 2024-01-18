# Використовуємо офіційний образ Python
FROM python:3.8

# Встановлюємо залежності
COPY requirements.txt /app/requirements.txt
WORKDIR /app
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо файли проекту в контейнер
COPY . /app

# Запускаємо Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:3031", "app:app"]
