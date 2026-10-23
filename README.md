# Work-Time-Planning-System - [Chronos]

**Chronos** is a software project consisting of a backend API and a user interface.

## 📌 Project Structure

The project is organized into the following components:

- **`chronos-api/`** — Backend application built with Java and Gradle.
- **`chronos-ui/`** — Frontend application and user interface.

## 🛠️ Technologies

### Backend
- Java
- Gradle
- Docker

### Frontend
- Technologies and frameworks to be documented.

## 🚀 Getting Started

### Prerequisites

Before running the project, make sure you have the required development tools installed.

For the backend:
- Java Development Kit (JDK)
- Git

Docker may also be required depending on the project configuration.

### Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_REPOSITORY_NAME>
```

### Run the Backend

On Windows, open a terminal in the `chronos-api` directory and run:

```powershell
.\gradlew.bat build
```

To run the application, use:

```powershell
.\gradlew.bat bootRun
```

The `bootRun` command applies if the backend is configured as a Spring Boot application.

### Run the Frontend

Frontend installation and startup instructions will be added after confirming the technologies and package manager used by `chronos-ui`.

## 📁 Repository Layout

```text
chronos/
├── chronos-api/
│   ├── src/
│   ├── gradle/
│   ├── build.gradle
│   ├── settings.gradle
│   ├── gradlew
│   ├── gradlew.bat
│   └── Dockerfile
├── chronos-ui/
└── README.md
```

## 🧪 Testing

Backend tests can be executed with:

```powershell
.\gradlew.bat test
```
