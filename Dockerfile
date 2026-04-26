FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port (Cloud Run sets PORT env var to 8080 by default, but it can be overridden.
# Since the server binds to process.env.PORT, this just documents the default behavior).
EXPOSE 8080

CMD [ "npm", "start" ]
