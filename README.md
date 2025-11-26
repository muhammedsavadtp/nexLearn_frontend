# NexLearn - Online Learning and Exam Platform

NexLearn is a modern, full-stack web application built with Next.js and Redux, designed to provide a seamless online learning and examination experience. It features user authentication, a timed exam interface, and a results page, with state persistence to ensure a smooth user journey even with page reloads.

## Features

- **User Authentication**: Secure login flow for users to access the exam platform.
- **Exam Interface**: A comprehensive exam interface with a question palette, navigation, and options to mark questions for review.
- **Timed Exams**: A persistent timer that continues even if the page is refreshed, ensuring a fair and uninterrupted exam experience.
- **State Persistence**: Utilizes `redux-persist` to save the exam state (answers, time remaining) to `localStorage`, allowing users to resume their exam after a page refresh.
- **API-Driven Content**: Fetches exam questions and instructions dynamically from a backend API.
- **Results Page**: Displays a detailed breakdown of the user's exam performance, including score, correct answers, incorrect answers, and unattended questions.
- **SEO Optimized**: Includes metadata and Open Graph tags for better search engine visibility and social media sharing.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have Node.js and npm (or yarn) installed on your system.

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/muhammedsavadtp/nexLearn_frontend.git
    cd nex-learn
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

## Usage

To run the application in development mode, use the following command. This will start the development server, usually on `http://localhost:3000`.

```bash
npm run dev
```

### Other Scripts

- **Build for production:**
  ```bash
  npm run build
  ```

- **Start the production server:**
  ```bash
  npm run start
  ```

