import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);

export const server = "https://api.coingecko.com/api/v3";
