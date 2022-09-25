FROM arm32v7/python:3.7-bullseye

EXPOSE 5000

WORKDIR /usr/src/app

COPY src .
COPY requirements.txt .

# allow docker build on non raspberry hardware
ENV READTHEDOCS=True

RUN pip3 install --no-cache-dir --requirement requirements.txt

CMD python ./e-chicken-ui.py
