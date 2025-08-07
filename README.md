
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

  











