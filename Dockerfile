FROM node:18.20.2

WORKDIR /var/www/tick-tack-toe

ENTRYPOINT ["tail", "-f", "/dev/null"]
