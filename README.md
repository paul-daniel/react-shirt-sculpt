# 3D T-Shirt Customizer

Welcome to the 3D T-shirt Customizer, a state-of-the-art web application designed to customize your t-shirts in 3D using ReactJS, TypeScript, TailwindCSS, and Three.js, powered by an express server integrated with OpenAI's GenerativeAI.

![Screenshot 1](./client/src/assets/shirt-custom%20(7).png)

## Features

IMPORTANT : Generative AI can take some time(a few seconds to 20seconds sometimes) after you sent a prompt so be patient ^^.

- **Real-time 3D Preview**: Utilize Three.js to visualize the t-shirt customization in real-time.
- **Custom Color Palette**: Choose from a vast array of colors to personalize your t-shirt.
- **Add Logo**: Embed your unique logo onto the t-shirt.
- **Texture Customization**: Apply various textures to enhance the t-shirt's design.
- **Interactive UI**: Show or hide the logo and texture as per your preferences.
- **Export Feature**: Once you're satisfied with the design, download it with just a click.

## Screenshots

![Screenshot 1](./client/src/assets/shirt-custom%20(4).png)
![Screenshot 2](./client/src/assets/shirt-custom%20(3).png)
![Screenshot 3](./client/src/assets/shirt-custom%20(2).png)
![Screenshot 4](./client/src/assets/shirt-custom%20(1).png)


## Live Application

Experience the application yourself: [3D T-Shirt Customizer Live](http://react-three-openai.s3-website.eu-west-3.amazonaws.com/)


## Setup and Installation

1. Clone the repository:

```bash
git clone <repository-url>

# install the server dependencies
cd server
npm install

# start the server
npm run backend:development

# install the client dependencies
cd client
npm install

# start the client (do this in two separate terminals)
npm run dev-css
npm run dev
```

Note that the application is by default in production mode. To change that,
go to client/src/store/index.ts and replace the content with the code bellow

```typescript
import {proxy} from 'valtio'

const state = proxy({
    intro : true,
    color : '#EFBD4E',
    isLogoTexture : true,
    isFullTexture : false,
    logoDecal : './threejs.png',
    fullDecal : './threejs.png',
    mode : "dev"
})

export default state
```

Now you have it working ! Feel free to add more features and share them with me and others if you want.
