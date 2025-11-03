# CodeReviewAI

CodeReviewAI is a web application that provides instant, AI-powered feedback on your code. It is designed to help developers find bugs, identify security vulnerabilities, and discover performance improvements to ship higher-quality code faster.

The application features a user-friendly interface for uploading or pasting code, a comprehensive dashboard to track analysis history and code quality metrics, and a seamless authentication flow.

## ✨ Features

- **AI-Powered Code Analysis**: Get instant feedback on code quality, performance, security, and best practices.
- **Multi-Language Support**: Analyze code in various languages including JavaScript, Python, Java, and more.
- **Interactive Demo**: Try the analyzer directly on the homepage with sample code snippets or your own code.
- **User Dashboard**: A comprehensive dashboard to view total reviews, average scores, issues found, and lines of code analyzed.
- **Review History**: Filter, sort, and search through past code reviews in a list or grid view.
- **Data Visualization**: Charts display score distribution and recent activity to track code quality trends.
- **Responsive Design**: A clean, modern UI that works seamlessly across devices.
- **Modal-based UI**: Non-intrusive modals for user authentication and creating new code reviews.
- **Global State Management**: Uses Zustand for efficient and minimal state management.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **File Uploads**: [React Dropzone](https://react-dropzone.js.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Linting**: [ESLint](https://eslint.org/)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- Node.js (v18.0 or later)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sanchitarora802/codereview-ai.git
    cd codereview-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the running application.

## 📂 Project Structure

The repository is organized to separate concerns and maintain a clean codebase.

```
/src
├── app/                  # Next.js App Router pages (e.g., /, /dashboard, /pricing)
├── components/           # Reusable React components
│   ├── Login/            # Authentication form components
│   ├── Modals/           # Modal dialogs for auth and code review
│   ├── dashboard/        # Components specific to the user dashboard
│   ├── home/             # Components for the landing page
│   ├── layout/           # Global layout components (Navbar, Footer)
│   └── shared/           # Generic, reusable components (Button, Card, Input)
├── constants/            # Centralized constants and configuration data
├── store/                # Zustand store for global state management
└── utils/                # Utility and helper functions
```

## 📖 Usage

### Home Page
The landing page provides an overview of the application's features, a "How It Works" section, and pricing information. Users can try the AI analysis directly through the **Demo Section** by pasting code, uploading a file, or using provided samples.

### Authentication
Click "Get Started Free" to open the authentication modal. The system will check if the user's email exists to present either a login or a sign-up form.

### Dashboard
After logging in, users are redirected to the `/dashboard`. Here you can:
- View key statistics like total reviews and average score.
- See charts visualizing score distribution and recent activity.
- Start a new code review by clicking the "New Review" button.
- Filter and sort through a list of all past reviews.
- Toggle between a detailed list view and a high-level grid view for your reviews.
