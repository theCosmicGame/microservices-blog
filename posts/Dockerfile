# set up base image
FROM node:alpine

# working directory
WORKDIR /app
# file to copy
COPY package.json ./
# run npm install to install our dependencies
RUN npm install
# copy everything from our directory
COPY ./ ./

# default command
CMD ["npm", "start"]