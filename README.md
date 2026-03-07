# Mini Wallet Frontend

This is the frontend for the Mini Wallet application, built with React 19 and Vite.

## Technology Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **API Client**: [Axios](https://axios-http.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## Features

- **Authentication**: Secure login and registration flows.
- **Dashboard**: Real-time balance updates and transaction overview.
- **Top-up**: Modal-based top-up system.
- **Transfer**: Easy peer-to-peer fund transfers.
- **Animations**: Smooth transitions and interactive elements using Framer Motion.
- **Responsive Design**: Fully responsive layout for mobile and desktop.

## Prerequisites

- Node.js (Latest LTS recommended)
- NPM or Yarn
- Backend API running (see [BE/mini-wallet/README.md](../BE/mini-wallet/README.md))

## Installation

1.  **Navigate to the frontend directory**:
    ```bash
    cd FE/mini-wallet-fe
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Environment Setup**:
    Create a `.env` file in the root of the frontend directory (if needed):
    ```env
    VITE_API_URL=http://localhost:8000/api
    ```
4.  **Start development server**:
    ```bash
    npm run dev
    ```

## Scripts

- `npm run dev`: Start development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.
- `npm run preview`: Preview production build locally.
