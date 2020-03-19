FROM php:7.2.1-apache-stretch

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    curl \
    curl \
    git \
    subversion \
  && rm -rf /var/lib/apt/lists/*

COPY config/php.ini /usr/local/etc/php/
COPY src/ /var/www/html