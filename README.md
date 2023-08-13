# ToDo List App

ToDo List App is a simple Vue.js application that allows you to manage a list of tasks or todos. The app uses Vuex for state management and provides basic functionality such as adding, editing, deleting, duplicating and marking tasks as completed.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## Features

- Add new tasks with a title and due date both are mandatory
- Edit existing ToDo's
- Delete tasks, confirmation will be asked using a modal popup
- Mark tasks as completed
- Able to view only ToDo tasks, Completed ToDo's, All ToDo's using a radio button
- Duplicate tasks
- Check if a task's due date is in the past and not completed, it will be highlighted in Red
- Validations has been implemnted for all the fields

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm or yarn (npm is used in the instructions below)
- Install Vue and VueX using cmd/terminal following below commands
    ```
    npm i vue@2.7
    npm i vuex@3.0.1
    ```

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```
   cd todo_app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Usage

1. Start the development server:

   ```
   npm run serve
   ```

   This will start the application and provide you with a local development server. You can access the app by opening your web browser and navigating to `http://localhost:8080`.

2. Use the app to manage your tasks:
   - Add a new task by filling in the title, due date, and clicking "Add Todo".
   - Edit a task by clicking the "Edit" icon and making changes.
   - Delete a task by clicking the "Delete" icon, followed by clicking on delete button in the popup.
   - Duplicate a task by clicking the "Duplicate" icon.
   - Mark a task as completed by clicking the checkbox beside to the task title.
   - Able to view only ToDo tasks, Completed ToDo's, All ToDo's using a radio button.
   - If a task's due date is in the past and not completed, it will be highlighted in Red

---
