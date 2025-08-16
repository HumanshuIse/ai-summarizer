# 🚀 AI Meeting Summarizer

A full-stack application built with FastAPI and React that leverages the high-speed Groq API to summarize meeting transcripts. The generated summaries can be edited and shared via email as plaintext, PDF, or DOCX attachments.



## ✨ Features

-   **AI-Powered Summaries**: Input a long meeting transcript and a custom instruction to get a concise summary.
-   **High-Speed Inference**: Uses the Groq API for near-instant summary generation.
-   **Editable Output**: The AI-generated summary can be edited directly in the browser before sharing.
-   **Multi-Format Sharing**: Share the final summary via email, with options to send it as plaintext in the email body or as a PDF or DOCX attachment.

---

## 🛠️ Tech Stack

-   **Backend**: **FastAPI**, **Uvicorn**, **Groq**, **Resend**, **ReportLab** (for PDFs), **python-docx** (for DOCX).
-   **Frontend**: **React**, **Vite**, **react-hot-toast**.

---

## 🔧 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   **Python** (3.8+)
-   **Node.js** and **npm** (or yarn)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/ai-summarizer.git](https://github.com/YourUsername/ai-summarizer.git)
    cd ai-summarizer
    ```

2.  **Backend Setup:**
    ```bash
    # Navigate to the backend folder
    cd backend

    # Create and activate a virtual environment
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

    # Install the required Python packages
    pip install -r requirements.txt
    ```

3.  **Frontend Setup:**
    ```bash
    # Navigate to the frontend folder from the root directory
    cd frontend

    # Install the required npm packages
    npm install
    ```

### Configuration

The backend requires API keys to function.

1.  In the `backend` folder, create a file named `.env`.
2.  Copy the content from the example below and add your secret keys.

    ```env
    # backend/.env

    GROQ_API_KEY="gsk_YourGroqApiKey"
    RESEND_API_KEY="re_YourResendApiKey"
    ```

---

## 🏃 Running the Application

You will need to run the backend and frontend in two separate terminals.

**1. Run the Backend Server:**
```bash
# In the backend directory with the venv active
uvicorn main:app --reload
```
The backend will be running at http://127.0.0.1:8000.

**2. Run the Frontend Server:**
```bash
# In the frontend directory
npm run dev
```
The frontend will be running at http://localhost:5173 (or a similar port). Open this URL in your browser to use the application.

---

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.


