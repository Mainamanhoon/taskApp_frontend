
# Dual Interface App: Calculator & Text-to-Shader

 This React project is the frontend of an app which consists of a calculator tab and a text-to-shader generator tab. This README will guide you through setting up the project locally, understanding its architecture, and exploring its features.

##  Tech Stack

This project is built with following tools:

  * **Frontend Framework:** **React**
  * **Languages:** **JavaScript (with JSX)** and **Rust** (compiled to **WebAssembly**)
  * **Styling:** **CSS**
  * **WASM Integration:** `vite-plugin-wasm`, `vite-plugin-top-level-await`
  * **3D Graphics:** **Raw WebGL**

-----

##  Local Setup

To get this project up and running on your local machine, follow these simple steps:

1.  **Clone the repository:**

    ```bash
    https://github.com/Mainamanhoon/taskApp_frontend.git
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

##  How It Works

This application is built using **React** and it has two main components:

###  The Calculator

The calculator for simple arithematic operations. It leverages a **WebAssembly (WASM)** for its core logic. The `evaluate_expression` function, which handles all the mathematical calculations, is written in Rust and compiled to WASM.
<img width="1923" height="1043" alt="Screenshot (33)" src="https://github.com/user-attachments/assets/555caef8-fe5b-4ad9-8536-8e65511289fb" />


###  The Text-to-Shader Generator

The text-to-shader generator is a tool that generates GLSL fragment shaders from a simple text description. It uses a backend API to interpret the text and generate the shader code. The generated shader is then rendered  as a background for the entire application.

<img width="950" height="500" alt="Screenshot (30)" src="https://github.com/user-attachments/assets/d5a62b64-e42d-4c55-be15-92b149682217" />

 <br />


<img width="950" height="500" alt="Screenshot (32)" src="https://github.com/user-attachments/assets/16bff485-99c6-4748-9302-bd24b714c44f" />

-----

## 🔧 WASM Integration

The integration of WebAssembly is a key feature of this project. Here's how it works:

1.  **Rust Code:** The core calculator logic is written in Rust, in a separate project. This Rust code is compiled into a WASM binary (`.wasm`) and JavaScript glue code (`.js`).

2.  **WASM Files:** The compiled WASM files are located in the `src/wasm` directory.

3.  **Loading the WASM Module:** The `loadCalculatorWasm.js` utility dynamically imports the WASM module. This ensures that the WASM code is loaded only when needed, improving the initial load time of the application.

4.  **Calling WASM Functions:** Once the WASM module is loaded, the `evaluate_expression` function can be called from JavaScript just like any other function. This seamless integration allows us to combine the performance of Rust with the flexibility of JavaScript.

-----


-----

##  Plugins & Dependencies Analysis

Here's a comprehensive breakdown of all the plugins and dependencies used in your dual-interface app:

###  **Frontend Plugins (Vite)**

#### **Core Vite Plugins:**

1.  **`@vitejs/plugin-react`**

      * **Purpose**: React support for Vite
      * **What it does**:
          * Enables JSX compilation
          * Provides React Fast Refresh (hot reload)
          * Optimizes React components for production
      * **Why you need it**: Essential for React development in Vite

2.  **`vite-plugin-wasm`**

      * **Purpose**: WebAssembly module loading
      * **What it does**:
          * Handles `.wasm` file imports
          * Provides WASM instantiation utilities
          * Enables direct WASM imports in JavaScript
      * **Why you need it**: For your Rust calculator WASM module

3.  **`vite-plugin-top-level-await`**

      * **Purpose**: Top-level await support
      * **What it does**:
          * Enables `await` at the module level
          * Required for async WASM initialization
          * Modern JavaScript feature support
      * **Why you need it**: WASM modules need async loading

#### **Vite Configuration Features:**

```javascript
assetsInclude: ['**/*.glsl'],  // Treats GLSL files as assets
server: {
  proxy: {
    '/api': 'http://localhost:4000',  // API proxy for development
  },
}
```

###  **Frontend Dependencies**

#### **Runtime Dependencies:**

  * **`react` & `react-dom`**: Core React framework
  * **`react-router-dom`**: Client-side routing
  * **`@react-three/fiber`**: React renderer for Three.js (though you use raw WebGL)
  * **`three`**: 3D graphics library (likely unused since you use raw WebGL)

#### **Development Dependencies:**

  * **ESLint Plugins:**
      * **`@eslint/js`**: Core ESLint JavaScript rules
      * **`eslint-plugin-react-hooks`**: React Hooks linting rules
      * **`eslint-plugin-react-refresh`**: React Fast Refresh linting
      * **`globals`**: Browser globals for ESLint
  * **TypeScript Support:**
      * **`@types/react`**: TypeScript definitions for React
      * **`@types/react-dom`**: TypeScript definitions for React DOM

###  **Rust WASM Dependencies**
   * **WASM Compilation:** `wasm-bindgen`, `serde`, `serde-wasm-bindgen`


##  Folder Structure

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










