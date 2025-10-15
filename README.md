
# 🌿 DalilScan (دليل سكان) - AI Nutrition Tracker

DalilScan is a modern, bilingual (English/Arabic) AI-powered nutrition tracking app designed to make healthy eating simple and intuitive. Snap a photo of your food, and let our AI instantly analyze its nutritional content—calories, macronutrients, and serving size. Track your daily goals, monitor your hydration, and review your meal history, all within a clean, mobile-first interface.

---

## ✨ Core Features

-   **🤖 AI-Powered Food Scanning**: Utilizes the **Google Gemini API** to analyze food from an image and provide detailed nutritional information.
-   **🌐 Fully Bilingual (EN/AR)**: Seamlessly switch between English and Arabic with full Right-to-Left (RTL) layout support.
-   **📊 Interactive Dashboard**: At-a-glance view of your daily progress with a calorie goal bar, macro breakdown, and hydration tracker.
-   **💧 Hydration Tracking**: A visual 8-glass tracker (250ml each) to easily monitor your daily water intake.
-   **📸 Editable Scan Results**: Fine-tune the AI's analysis for accuracy before adding a meal to your log.
-   **🗓️ Comprehensive Meal History**: A filterable and sortable log of all your meals, complete with images and nutrition summaries.
-   **🎯 Customizable Goals**: Set and adjust personal daily goals for calories, protein, carbs, fat, and water intake.
-   **👤 User Profile Management**: Update personal info like weight, height, and activity level to tailor your experience.
-   **📱 Modern & Responsive UI/UX**: Built with Tailwind CSS and Framer Motion for a clean aesthetic, smooth animations, and a mobile-first design.

---

## 🛠️ Tech Stack

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **AI Model**: [Google Gemini API (@google/genai)](https://ai.google.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **State Management**: React Context API
-   **Routing**: [React Router](https://reactrouter.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Internationalization (i18n)**: [react-i18next](https://react.i18next.com/)

---

## 🚀 Getting Started

This project is configured to run in a browser-based development environment that supports ES modules and `importmap`.

### Prerequisites

1.  **Google Gemini API Key**: You need an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  **Browser-Based IDE**: This setup is optimized for platforms like Google's Project IDX or other web-based editors that can serve the files directly.

### Setup & Running the App

1.  **Clone the repository or load the project files** into your environment.
2.  **Set up the API Key**:
    -   The application is hard-coded to look for the API key in `process.env.API_KEY`.
    -   Ensure your development environment provides this environment variable to the application. In many browser IDEs, you can set this up as a "secret" or environment variable.
3.  **Launch the Application**:
    -   Serve the `index.html` file using a local web server or the built-in preview feature of your IDE.
    -   The application will load, and you can start using it immediately.

---

## 🔧 How It Works

### AI Analysis Workflow

The core of DalilScan is its AI-powered food analysis feature in the `Scan` component.

1.  **Image Upload**: The user selects an image from their device.
2.  **Data Conversion**: The image file is converted into a base64-encoded string.
3.  **API Request**: The `gemini-2.5-flash` model is called via the `@google/genai` SDK. The request includes:
    -   The image data.
    -   A text prompt instructing the AI to analyze the food.
    -   A strict `responseSchema` that forces the model to return a structured JSON object containing `name`, `calories`, `protein`, `carbs`, and `fat`.
4.  **Display & Edit**: The parsed JSON response is used to populate an analysis card. The user can review and edit these values.
5.  **Log Meal**: Once confirmed, the final data (including the image and a timestamp) is added to the global state via the `LogContext`.

### Global State Management

The application uses React's Context API to manage state reactively across components:

-   **`UserContext`**: Stores and manages user-specific data like name, profile details (weight, height), and all daily goals (calories, macros, water).
-   **`LogContext`**: Manages the list of all logged meals. It also calculates and provides aggregated data for the current day, such as total calories and macros consumed, which the `Dashboard` uses to display real-time progress.

---

## 🔮 Future Enhancements

-   [ ] **Backend & Database Integration**: Connect to a backend service like Firebase to persist user data, goals, and meal logs across sessions and devices.
-   [ ] **Barcode Scanning**: Add the ability to scan barcodes on packaged foods to quickly retrieve nutritional information.
-   [ ] **Multi-item & Recipe Analysis**: Allow users to analyze meals with multiple food items or full recipes.
-   [ ] **Advanced Analytics**: Provide weekly and monthly reports to help users identify trends in their eating habits.
-   [ ] **Authentication**: Implement a full authentication flow to securely manage user accounts.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
