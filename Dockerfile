FROM python:3.9-slim-buster

WORKDIR /app

COPY requirements.txt .
RUN npm i

COPY . .

CMD ["expo", "start", "--web"]
