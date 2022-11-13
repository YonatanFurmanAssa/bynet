# Install OS + Framework
FROM node:18-alpine3.16

# Create directory inside the image: 
WORKDIR /app

# Copy only package.json to image /app:
COPY package.json /app/package.json

# Run command line "npm i" insde the image:
RUN npm install --silent

# Copy all files into image /app:
COPY . . 

# Expose Port
EXPOSE 3002

# Run "npm start" when container starts: 
CMD ["npm", "start"]