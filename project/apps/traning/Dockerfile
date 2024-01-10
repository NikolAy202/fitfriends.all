FROM node:18.13-alpine
WORKDIR /opt/fitfriends-traning
COPY ./dist/apps/traning/package.json .
RUN npm install --omit=dev
COPY ./dist/apps/traning .
CMD ["node", "./main.js"]
