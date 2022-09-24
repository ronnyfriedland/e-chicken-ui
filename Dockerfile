FROM arm32v7/python:3.7-slim-bullseye

WORKDIR /usr/src/app

COPY src .
COPY requirements.txt .

RUN apt-get update
RUN apt-get install --yes gcc
RUN pip3 install --no-cache-dir --requirement requirements.txt

CMD python ./e-chicken-ui.py
