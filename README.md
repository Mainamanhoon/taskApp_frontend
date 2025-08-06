# Dual Interface App: Calculator & Text-to-Shader

Welcome to the Dual Interface App\! This project is a unique blend of a practical calculator and a creative text-to-shader generator, all running in a sleek, modern web interface. This README will guide you through setting up the project locally, understanding its architecture, and exploring its features.

-----

## 🚀 Local Setup

To get this project up and running on your local machine, follow these simple steps:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Install dependencies:** This project uses `npm` for package management.

    ```bash
    npm install
    ```

3.  **Run the development server:** This will start a local server, usually on `http://localhost:5173`.

    ```bash
    npm run dev
    ```

4.  **Open in your browser:** Navigate to the local server address in your web browser to see the application in action\!

-----

## ✨ How It Works

This application is built with **React** and **Vite**, providing a fast and efficient development experience. It features two main components:

### 🔢 The Calculator

The calculator is not your average JavaScript-powered tool. It leverages the power of **WebAssembly (WASM)** for its core logic. The `evaluate_expression` function, which handles all the mathematical calculations, is written in Rust and compiled to WASM. This provides a significant performance boost and showcases the potential of using high-performance languages in the browser.

### 🎨 The Text-to-Shader Generator

The text-to-shader generator is a creative tool that allows you to generate GLSL fragment shaders from a simple text description. It uses a backend API to interpret the text and generate the shader code. The generated shader is then rendered in real-time as a background for the entire application, creating a dynamic and visually stunning experience.

-----

## 🌊 Flow

The application flow is straightforward and user-friendly:

1.  **Navigation:** A simple navigation bar at the top allows you to switch between the "Calculator" and "Text-to-Shader" pages.

2.  **Calculator Page:**

      * The calculator interface is intuitive, with a display for the input and result, and a grid of buttons for numbers and operations.
      * You can either use the on-screen buttons or type your expression directly into the input field.
      * Clicking the "=" button or the "Calculate" button will send the expression to the WASM module for evaluation, and the result will be displayed.

3.  **Text-to-Shader Page:**

      * You'll find a text area where you can describe the shader you want to create (e.g., "a rotating cube with a gradient background").
      * Click the "Generate Shader" button to send the description to the backend.
      * The generated GLSL shader code will be displayed, and the shader itself will be rendered as the background of the entire application.

-----

## 🔧 WASM Integration

The integration of WebAssembly is a key feature of this project. Here's how it works:

1.  **Rust Code:** The core calculator logic is written in Rust, in a separate project. This Rust code is compiled into a WASM binary (`.wasm`) and JavaScript glue code (`.js`).

2.  **WASM Files:** The compiled WASM files are located in the `src/wasm` directory.

3.  **Loading the WASM Module:** The `loadCalculatorWasm.js` utility dynamically imports the WASM module. This ensures that the WASM code is loaded only when needed, improving the initial load time of the application.

4.  **Calling WASM Functions:** Once the WASM module is loaded, the `evaluate_expression` function can be called from JavaScript just like any other function. This seamless integration allows us to combine the performance of Rust with the flexibility of JavaScript.

-----

## ☁️ Deployment

This application is deployed as a static site. Here's the general process:

1.  **Build the Project:** The `npm run build` command uses Vite to bundle all the application's assets (HTML, CSS, JavaScript, and WASM) into a `dist` folder.

2.  **Deploy to a Static Host:** The contents of the `dist` folder can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

-----

## 📁 Folder Structure

The project follows a standard Vite + React folder structure, with some additions for our specific features:

```
.
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── calculator/
│   │   │   ├── Button.jsx
│   │   │   ├── ButtonGrid.jsx
│   │   │   ├── Calculator.jsx
│   │   │   └── Display.jsx
│   │   ├── shader/
│   │   │   ├── ShaderDisplay.jsx
│   │   │   ├── ShaderInput.jsx
│   │   │   └── ShaderRenderer.jsx
│   │   └── Navigation.jsx
│   ├── hooks/
│   │   └── useShaderGenerator.js
│   ├── layouts/
│   │   └── RootLayout.jsx
│   ├── pages/
│   │   ├── CalculatorPage.css
│   │   ├── CalculatorPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── NotFoundPage.jsx
│   │   ├── ShaderPage.css
│   │   └── ShaderPage.jsx
│   ├── utils/
│   │   ├── loadCalculatorWasm.js
│   │   └── shaderRunner.js
│   ├── wasm/
│   │   ├── calculator_wasm.d.ts
│   │   ├── calculator_wasm.js
│   │   ├── calculator_wasm_bg.wasm
│   │   └── calculator_wasm_bg.wasm.d.ts
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

  * **`public/`**: Static assets that are not processed by Vite.
  * **`src/`**: The main source code of the application.
      * **`components/`**: Reusable React components.
      * **`hooks/`**: Custom React hooks.
      * **`layouts/`**: Layout components that define the structure of the pages.
      * **`pages/`**: The main pages of the application.
      * **`utils/`**: Utility functions.
      * **`wasm/`**: The WebAssembly module and its JavaScript glue code.
  * **`vite.config.js`**: Vite configuration file.

I hope you enjoy exploring and experimenting with this application\! If you have any questions or suggestions, feel free to open an issue or pull request.
