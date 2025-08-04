# Project Context: Varyadle

## 1. Project Overview

Varyadle is a web-based word guessing game inspired by Wordle. The name suggests it's a personal project, likely for someone named "Varya". The game appears to be built with a modern web stack: React, TypeScript, and Vite. The styling is clean and modern, with a purple-themed gradient background and floating UI elements.

## 2. File Structure

The project follows a standard Vite/React project structure.

```
/
├───public/
│   └───vite.svg
├───src/
│   ├───assets/
│   │   └───react.svg
│   ├───components/
│   │   ├───FloatingElements.css
│   │   ├───FloatingElements.tsx
│   │   ├───Game.css
│   │   ├───Game.tsx
│   │   ├───GameBoard.css
│   │   ├───GameBoard.tsx
│   │   ├───Header.css
│   │   ├───Header.tsx
│   │   ├───Keyboard.css
│   │   └───Keyboard.tsx
│   ├───data/
│   │   └───words.ts
│   ├───types/
│   │   └───game.ts
│   └───utils/
│       └───gameLogic.ts
├───.gitignore
├───eslint.config.js
├───index.html
├───package.json
├───README.md
├───tsconfig.json
└───vite.config.ts
```

## 3. Key Files

*   **`src/main.tsx`**: The entry point of the React application.
*   **`src/App.tsx`**: The root component of the application, which renders the `Game` component.
*   **`src/components/Game.tsx`**: The main component that manages the game's state and logic. It brings together the `GameBoard`, `Keyboard`, and `Header` components.
*   **`src/components/GameBoard.tsx`**: Renders the grid of letter cells for the guesses.
*   **`src/components/Keyboard.tsx`**: Renders the on-screen keyboard for user input.
*   **`src/utils/gameLogic.ts`**: Contains the core game logic, such as initializing the game, evaluating guesses, and managing game state.
*   **`src/data/words.ts`**: Defines the list of possible words for the game. It includes a function to get a word based on the current date, making it a daily word game.
*   **`src/types/game.ts`**: Defines the TypeScript types for the game state and related data structures.
*   **`vite.config.ts`**: The configuration file for the Vite build tool.
*   **`package.json`**: Lists the project dependencies and scripts.

## 4. Dependencies

### Production Dependencies

*   `react`: A JavaScript library for building user interfaces.
*   `react-dom`: Provides DOM-specific methods that can be used at the top level of your app.

### Development Dependencies

*   `@vitejs/plugin-react`: The official Vite plugin for React.
*   `typescript`: A typed superset of JavaScript that compiles to plain JavaScript.
*   `eslint`: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
*   `@typescript-eslint/eslint-plugin`: An ESLint plugin which provides linting rules for TypeScript codebases.
*   `@typescript-eslint/parser`: An ESLint parser which allows ESLint to lint TypeScript code.
*   `vite`: A modern frontend build tool that provides an extremely fast development environment.

## 5. Scripts

The following scripts are available in `package.json`:

*   `dev`: Starts the development server using Vite.
*   `build`: Compiles the TypeScript code and builds the project for production.
*   `lint`: Lints the codebase using ESLint.
*   `preview`: Serves the production build locally for previewing.
