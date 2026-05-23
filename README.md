<h1 align="center">ULVIS</h1>

<p align="center">
  <strong>Enterprise License and Asset Tracking System</strong><br>
  <i>A role-based full-stack platform for managing hardware assets, software licenses, assignments, incidents, procurement, and audit operations.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/TailwindCSS-3-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/SQLite-3-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Auth-JWT%20%2B%20RBAC-success?style=flat-square" alt="JWT RBAC">
  <img src="https://img.shields.io/badge/Tests-Node%20Test-informational?style=flat-square" alt="Node Test">
  <img src="https://img.shields.io/badge/Status-Academic%20Final-blueviolet?style=flat-square" alt="Academic Final">
  <img src="https://img.shields.io/badge/License-Educational-lightgrey?style=flat-square" alt="Educational">
</p>

---

# Table of Contents

- [Project Overview](#project-overview)
- [Project Objectives](#project-objectives)
- [Features](#features)
- [Recent Improvements](#recent-improvements)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [Sample Accounts](#sample-accounts)
- [Testing and Validation](#testing-and-validation)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)
- [License](#license)

---

# Project Overview

ULVIS is a web-based information system designed to centrally manage hardware assets, software licenses, assignment workflows, incident records, procurement information, and administrative audit processes within universities and corporate IT environments.

Instead of relying on manual tracking methods, scattered spreadsheet files, and person-dependent operational procedures, the platform provides an integrated environment where all processes are systematically recorded, secured through role-based access control, and continuously monitored by administrators.

# Project Objectives

The primary objective of the project is to make IT asset and license management more secure, traceable, organized, and sustainable. To achieve this, the system:

- Centralizes hardware and software licenses within a unified inventory.
- Manages personnel, IT support, procurement, and IT manager roles with separate authorization levels.
- Standardizes assignment, return, incident, and license renewal processes through predefined business rules.
- Generates automated notifications for upcoming license expiration dates.
- Logs critical operations to ensure auditability and accountability.
- Provides operational visibility through dashboard analytics and reporting tools.

# Features

| Area | Description |
| --- | --- |
| Authentication | JWT-based authentication, bcrypt password hashing, password policies, and mandatory password reset support |
| Authorization | API and interface restrictions for IT Manager, IT Support, Procurement, and Employee roles |
| Hardware Management | Hardware creation, updates, status tracking, assignment, and return management |
| License Management | License creation, updates, expiration tracking, user limits, and seat capacity controls |
| Assignment Management | Hardware and software license allocation, approval, rejection, and return workflows |
| Incident Management | Employee incident reporting, IT support status updates, and process tracking |
| Procurement | Supplier and invoice management |
| Notifications | In-app notifications generated 30, 15, and 7 days before license expiration |
| Auditing | Administrative logging and operational traceability |
| Reporting | Dashboard metrics, license cost analysis, department distribution statistics, and summary cards |

# Recent Improvements

In this release, the project has been restructured to better satisfy delivery requirements and improve maintainability:

- Added the `npm run dev:full` command to run both backend and frontend services simultaneously from the root directory.
- Improved the `README.md` structure with clearer sections for installation, execution, testing, screenshots, and contributions.
- Expanded the `.gitignore` file to exclude `node_modules`, build artifacts, `.env` files, and SQLite database files.
- Added user limits and seat capacity tracking for software licenses.
- Prevented new allocations when license capacity has been reached.
- Implemented a business rule that automatically closes active assignments when hardware status changes.
- Completed backend testing and frontend build verification.

# Technology Stack

| Layer | Technologies |
| --- | --- |
| Backend | Node.js, Express.js, better-sqlite3, JWT, bcryptjs, node-cron, Nodemailer |
| Frontend | React 18, Vite 5, Tailwind CSS, React Router, Axios, Recharts, react-hot-toast |
| Database | SQLite |
| Testing | Node.js built-in test runner |
| Package Management | npm |
| Documentation | Markdown |

# Project Structure

```text
ULVIS/
|-- kaynak-kodlar/
|   |-- backend/
|   |   |-- config/             # Database connection and schema operations
|   |   |-- middleware/         # Authentication, role control, and auditing layers
|   |   |-- routes/             # REST API endpoints
|   |   |-- services/           # Notification, email, and audit services
|   |   |-- test/               # Backend test files
|   |   |-- seed.js             # Sample data seeding
|   |   `-- server.js           # Express application entry point
|   `-- frontend/
|       |-- public/             # Static assets
|       `-- src/
|           |-- components/     # Shared UI components
|           |-- context/        # Authentication and session context
|           |-- pages/          # Page components
|           |-- routes/         # Application routing
|           `-- services/       # Axios API client
|-- dokumantasyon/              # Additional project notes and submission materials
|-- gorseller/
|   |-- screenshots/            # Screenshots for README and project submission
|   `-- logo.png
|-- scripts/
|   `-- dev-full.js             # Unified development launcher
|-- .gitignore
|-- package.json                # Root npm scripts
`-- README.md
```

# Installation

## Requirements

- Node.js 18 or later
- npm
- Git

## Clone the Repository

```bash
git clone https://github.com/Wrindzler/gordon.git
cd gordon
```

## Install Dependencies

All backend and frontend dependencies can be installed from the root directory using a single command:

```bash
npm run install:all
```

Alternatively, dependencies can be installed separately:

```bash
cd kaynak-kodlar/backend
npm install

cd ../frontend
npm install
```

# Running the Application

## Development Mode with a Single Command

Run the following command from the root directory:

```bash
npm run dev:full
```

This command:

- Installs backend dependencies if they are missing.
- Installs frontend dependencies if they are missing.
- Starts the backend API server at `http://localhost:5000`.
- Starts the frontend Vite server at `http://localhost:3000`.
- Separates terminal output using `[backend]` and `[frontend]` labels.

## Running Services Separately

### Backend

```bash
cd kaynak-kodlar/backend
npm run dev
```

### Frontend

```bash
cd kaynak-kodlar/frontend
npm run dev
```

## Database Seeding

To generate sample users and development data:

```bash
cd kaynak-kodlar/backend
npm run seed
```

> Running `npm run seed` may reset the existing development database. Use with caution in production environments.

# Environment Variables

The backend `.env.example` file can be copied as `.env`:

```env
PORT=5000
JWT_SECRET=write-a-long-development-secret-key
DB_PATH=./database.sqlite
APP_URL=http://localhost:3000
RESET_TOKEN_TTL_MINUTES=60

# SMTP configuration is optional.
# Email delivery will be skipped if fields are incomplete.
# SMTP_HOST=
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=
# SMTP_PASS=
# SMTP_FROM="ULVIS <no-reply@example.com>"
```

> The `.env` file should never be committed to GitHub and is excluded through `.gitignore`.

# Sample Accounts

The following development accounts become available after running `npm run seed`:

| Role | Email | Password |
| --- | --- | --- |
| IT Manager | `admin@ulvis.com.tr` | `admin123` |
| IT Support | `itdestek@ulvis.com.tr` | `destek123` |
| Procurement | `satinalma@ulvis.com.tr` | `satin123` |
| Employee | `ali.ozturk@ulvis.com.tr` | `personel123` |

> These accounts are intended solely for local development and testing purposes.

# Testing and Validation

The following validation commands can be executed from the root directory:

```bash
npm run test
npm run build
npm run audit:high
```

These commands verify backend tests, frontend build output, and security audit checks.

# Screenshots

## Login

![ULVIS Login Screen](gorseller/screenshots/Login%20Screen.png)

## IT Manager Dashboard

![ULVIS IT Manager Dashboard](gorseller/screenshots/IT%20Manager%20Dashboard.png)

## Software License Management

![ULVIS Software License Management](gorseller/screenshots/Software%20License%20Management.png)

## Asset Assignment Management

![ULVIS Asset Assignment Management](gorseller/screenshots/Asset%20Assignment%20Management.png)

## Hardware Management

![ULVIS Hardware Management](gorseller/screenshots/IT%20Support%20Hardware%20Management%20Screen.png)

## Additional Screens

- [IT Manager Panel](gorseller/screenshots/IT%20Manager%20Panel.png)
- [IT Manager Notifications](gorseller/screenshots/IT%20Manager%20Notifications.png)
- [Database Management Page](gorseller/screenshots/Database%20Management%20Page.png)
- [Supplier Management](gorseller/screenshots/Supplier%20Management.png)
- [Fault Requests](gorseller/screenshots/Fault%20Requests.png)
- [Reset Password Screen](gorseller/screenshots/Reset%20Password%20Screen.png)

> Before submission, ensure that screenshots do not contain personal data or real passwords.


# Future Enhancements

Potential future improvements include:

- Adding Docker-based deployment configurations
- Establishing automated CI/CD pipelines with GitHub Actions
- Expanding frontend testing coverage
- Implementing more granular role and permission management
- Standardizing demo datasets and screenshots

# Contributors

| Team Member | Responsibility |
| --- | --- |
| Emre Berk Güç | Backend leadership, API services, authentication architecture |
| Kaan Emre Demir | Backend support, notification services, deployment and testing |
| Beste Tuana Çuhadar | Reporting, documentation, ER and UML design |
| Zeynep Zehra Kocatürk | Frontend leadership, UI development, UX workflows |
| Selim İşkodra | Frontend support, integration, and user testing |

# License

This project was developed for academic and educational purposes.

<p align="center">
  <strong>ULVIS</strong><br>
  Enterprise License and Asset Tracking System
</p>
