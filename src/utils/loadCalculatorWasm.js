// Utility to load the calculator WASM module from the src directory
export async function loadCalculatorWasm() {
  // Import the JS glue code from src/wasm
  const module = await import('../wasm/calculator_wasm.js');
  // Initialize the WASM module with a Vite-compatible URL
  await module.default(new URL('../wasm/calculator_wasm_bg.wasm', import.meta.url));
  return module;
}
