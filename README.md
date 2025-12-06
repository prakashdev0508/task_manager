## My Task – Task Board

**My Task** is a lightweight, single-page task management dashboard built with React, TypeScript, and Vite.  
It provides a clean, responsive board to organize tasks into **Todo**, **Pending**, and **Completed** columns.

---

### Tech Stack

- **Frontend**: React + TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Utility-first CSS classes (Tailwind-style)
- **Storage**: Browser `localStorage` for persisting tasks

---

### Features

- **Task Board Columns**
  - Separate lanes for **Todo**, **Pending**, and **Completed** tasks.
  - Each column shows a live count of tasks.

- **Create & Edit Tasks**
  - Add new tasks using the **“+ Add New Task”** button in the Todo column.
  - Edit existing tasks via a dedicated modal that lets you update title, notes/description, and status.

- **Drag & Drop Status Changes**
  - Drag tasks between the three columns to instantly update their status.

- **Search**
  - Global search bar in the header filters tasks by **title** or **description** in real time.

- **Task Details Drawer**
  - Click **View** on a task card to open a right-side drawer with:
    - Task title, label, status, priority, comments count, checklist count, and remaining days.

- **Delete & Cleanup**
  - Delete tasks via a confirmation modal.
  - Internal support for clearing completed tasks and replacing the task list (via Redux slice).

- **Persistence**
  - Tasks are automatically saved to `localStorage` and restored on page reload.

---

### Getting Started

#### 1. Prerequisites

- **Node.js**: v18+ (recommended)
- **npm**: v9+ (comes with recent Node versions)

Verify your versions:

```bash
node -v
npm -v
```

#### 2. Install Dependencies

From the project root:

```bash
npm install
```

#### 3. Run the Development Server

Start Vite’s dev server:

```bash
npm run dev
```

By default, the app will be available at something like:

```text
http://localhost:5173
```

(Your terminal output will show the exact URL.)

#### 4. Build for Production

To create an optimized production build:

```bash
npm run build
```

---

### Usage Overview

- **Add a task**
  - Click **“+ Add New Task”** in the **Todo** column.
  - Fill in task title, optional dates and notes, choose a status, and click **“Add task”**.

- **Edit a task**
  - Use the edit action on a task card to open the same modal in edit mode.

- **Move a task**
  - Drag a task card into **Todo**, **Pending**, or **Completed** columns to update its status.

- **View details**
  - Use the view action on a task card to open the task details drawer on the right.

- **Search tasks**
  - Type into the header search bar to filter tasks by title or description across all columns.

All changes are automatically stored in your browser, so your board state persists between sessions.

---

### Scripts Reference

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build for production.


