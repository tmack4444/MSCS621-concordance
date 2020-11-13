FROM nginx
FROM node
WORKDIR app
COPY *package*json ./
RUN npm install aws-sdk
RUN npm install
COPY . .
CMD ["npm","start"]
