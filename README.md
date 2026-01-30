# Nodebase: AI-Powered Workflow Automation Platform

![Project Banner](https://img.shields.io/badge/Status-Production%20Ready-success?style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**The open-source alternative to n8n and Zapier.** Built for developers who want full control, AI-native integration, and a production-grade SaaS architecture.

This monorepo contains the complete source code for a drag-and-drop automation platform capable of running complex, multi-step workflows with real-time execution tracking.

---

## ⚡ Features

* **Visual Workflow Builder:** A powerful React Flow-based canvas to drag, drop, and connect triggers and actions.
* **AI-Native Execution:** Built-in nodes for **OpenAI**, **Anthropic (Claude)**, and **Google Gemini** to build intelligent agents.
* **Real-Time Observability:** Watch workflows execute live via WebSockets. See steps light up as they succeed or fail.
* **Robust Architecture:** Powered by **Inngest** for reliable background job processing, retries, and concurrency management.
* **Authentication & Security:** Secure user management with **Better Auth** (Email/Password, Google, GitHub).
* **Monetization Ready:** Full SaaS billing infrastructure integrated with **Polar.sh** (Subscriptions, Free Tiers, Usage Limits).
* **Developer Experience:** Type-safe APIs with **tRPC**, end-to-end types, and a modern Next.js 15 App Router setup.

---

## 🛠️ The Tech Stack

This project leverages the bleeding edge of the React & Node.js ecosystem.

### **Core**
* ![Next.js](https://img.shields.io/badge/Next.js_15-black?style=flat-square&logo=next.js&logoColor=white) **Framework**: App Router, Server Components, Server Actions.
* ![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white) **Language**: Strict typing for rock-solid code.
* ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white) **Styling**: With **Shadcn UI** for accessible, beautiful components.

### **Backend & Data**
* ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white) **Database**: Hosted on **Neon** (Serverless Postgres).
* ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white) **ORM**: Type-safe database access.
* ![Inngest](https://img.shields.io/badge/Inngest-Background_Jobs-000000?style=flat-square) **Queue**: Event-driven background jobs and workflow orchestration.
* ![tRPC](https://img.shields.io/badge/tRPC-Type_Safe_API-2596BE?style=flat-square&logo=trpc&logoColor=white) **API Layer**: End-to-end type safety without code generation.

### **Services**
* **Authentication**: [Better Auth](https://www.better-auth.com/)
* **Payments**: [Polar.sh](https://polar.sh/)
* **Error Tracking**: [Sentry](https://sentry.io/)
* **AI Observability**: Sentry AI Monitoring

---

## 🚀 Getting Started

Follow these steps to get the platform running locally on your machine.

### **Prerequisites**
* Node.js 18+
* npm / yarn / pnpm / bun
* A PostgreSQL database (local or Neon)

### **Installation**

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/yourusername/nodebase.git](https://github.com/yourusername/nodebase.git)
    cd nodebase
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Copy the example environment file and fill in your secrets.
    ```bash
    cp .env.example .env
    ```
    *You will need API keys for: Database (Neon), Auth (Better Auth), Inngest, Polar, and your AI providers (OpenAI, Anthropic).*

4.  **Database Setup**
    Push the Prisma schema to your database.
    ```bash
    npx prisma db push
    ```

5.  **Run the Development Suite**
    We use **mprocs** to run the Next.js server, Inngest dashboard, and Prisma Studio in a single terminal interface.
    ```bash
    npm run dev:all
    ```

6.  **Open your browser**
    Navigate to `http://localhost:3000` to see the app.
    Access the Inngest dashboard at `http://localhost:8288`.

---

## 🧩 Workflow Nodes

The platform supports a growing library of nodes:

### **Triggers**
* 🖱️ **Manual Trigger**: Start a workflow with a button click.
* 🪝 **Webhook**: Trigger via a unique HTTP endpoint.
* 📝 **Google Forms**: Run workflows on new form submissions.
* 💳 **Stripe**: React to payment events (e.g., `payment_intent.succeeded`).

### **Actions**
* 🧠 **AI Inference**: Ask LLMs (GPT-4, Claude 3.5 Sonnet, Gemini Pro) to process text.
* 🌐 **HTTP Request**: Make GET/POST/PUT/DELETE requests to any external API.
* 💬 **Messaging**: Send notifications to **Discord** and **Slack**.

---

## 🤝 Contributing

Contributions are welcome! Whether it's adding a new integration node, fixing a bug, or improving documentation.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
