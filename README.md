# ⚡ Project Title: **Taskify**
![Taskify Overview](https://github.com/user-attachments/assets/24eeb09b-b565-4a67-a40a-96c532c88333)

A web application that provides scheduling management and sharing features.

<br>

## ⚡ Project Overview
  
**Reason for Selection**
- Real-time data synchronization
- Intuitive and manageable UI/UX
- 
**Key Features**
- **Login**: Authenticate users and store session data in cookies or local storage.
- **Logout**: Clear session data on logout to securely end the session.
- **Dashboard**
  - **Create Dashboard**: Users can create a new dashboard.
  - **Vertical and Horizontal Drag-and-Drop**: Users can freely drag and drop items or cards within the dashboard both vertically and horizontally to change their position.
  - **Column-Card Create, Edit, Delete Modals**: Users can create, edit, or delete columns and cards.
  - **Infinite Scroll for Cards**: If there are many cards in the dashboard, load more cards through infinite scroll.
  - **Card Preview**: When users click a card, they can preview the contents of the card.
  - **Comment Creation, Edit, Delete**: Users can add, edit, or delete comments on cards.
- **Invite Members**: Users can invite others to their dashboard or project.
- **Edit Profile**: Users can edit their profile information.
- **Sidebar Dashboard List**: Users can view the dashboards they have created or been invited to in the sidebar and easily access the desired dashboard.
- **Responsive Design**: Supports desktop, tablet, and mobile views.

![dashboardid](https://github.com/user-attachments/assets/993afb22-e291-4676-b787-3ed3243542ee)

<br>

## 📅 Development Timeline

2024.11.14 ~ 2024.12.02

<br>

## 👊 Team Members
| ![김지윤](https://avatars.githubusercontent.com/u/174712986?v=4) | ![김희진](https://avatars.githubusercontent.com/u/77238424?v=4) | ![나승엽](https://avatars.githubusercontent.com/u/166021800?v=4) | ![나지원](https://avatars.githubusercontent.com/u/176969129?v=4) |
| :----------------------------------------------------------: | :--------------------------------------------------------: | :-------------------------------------------------------: | :--------------------------------------------------------: |
|                        김지윤                              |                        👑 김희진                              |                       나승엽                               |                       나지원                               |
| [@21ow](https://github.com/21ow)                             | [@devmanta](https://github.com/devmanta)                    | [@najitwo](https://github.com/najitwo)                      | [@naseungyeop](https://github.com/naseungyeop)               |

<br>

## 📚 Tech Stack

### Environment
  - <img src="https://img.shields.io/badge/visual%20studio%20code-0078d7?style=for-the-badge&logo=visual%20studio%20code&logoColor=white">
  - <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  - <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  - <img src="https://img.shields.io/badge/npm-CB3837.svg?&style=for-the-badge&logo=npm&logoColor=white">

### Config
  - <img src="https://img.shields.io/badge/prettier-F7B93E.svg?&style=for-the-badge&logo=prettier&logoColor=white">
  - <img src="https://img.shields.io/badge/eslint-4B32C3.svg?&style=for-the-badge&logo=eslint&logoColor=white">

### Development
  - <img src="https://img.shields.io/badge/create%20next%20app-000000.svg?&style=for-the-badge&logo=next.js&logoColor=white">
  - <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  - <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  - <img src="https://img.shields.io/badge/typescirpt-3178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white">
  - <img src="https://img.shields.io/badge/CSS%20modules-000000.svg?&style=for-the-badge&logo=cssmodules&logoColor=white">
  - <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  - <img src="https://img.shields.io/badge/nextjs-000000.svg?&style=for-the-badge&logo=next.js&logoColor=white">

 **Major Libraries**
  - <img src="https://img.shields.io/badge/axios-5A29E4.svg?&style=for-the-badge&logo=axios&logoColor=white">
  - <img src="https://img.shields.io/badge/react%20hook%20form-EC5990.svg?&style=for-the-badge&logo=react%20hook%20form&logoColor=white">
  - <img src="https://img.shields.io/badge/react%20beautiful%20dnd-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white">
  - <img src="https://img.shields.io/badge/zustand-61DAFB.svg?&style=for-the-badge&logo=react&logoColor=white">

### Project Management
  - <img src="https://img.shields.io/badge/github%20project-181717.svg?&style=for-the-badge&logo=github%20project&logoColor=white">
  - <img src="https://img.shields.io/badge/notion-000000.svg?&style=for-the-badge&logo=notion&logoColor=white">

### Design
  - <img src="https://img.shields.io/badge/figma-F24E1E.svg?&style=for-the-badge&logo=figma&logoColor=white">

### Hosting
  - <img src="https://img.shields.io/badge/vercel-%23000000.svg?&style=for-the-badge&logo=vercel&logoColor=white">

### Communication
  - <img src="https://img.shields.io/badge/discord-5865F2.svg?&style=for-the-badge&logo=discord&logoColor=white">

<br>
  
## 🗂️ Project Structure

```plain
/public
  ├── /icons                # Icon folder
  └── /images               # Image folder

/src
  ├── (page folders)        # Page folders
  │   ├ folder              # Specific page component folder
  │   ├── layout.module.css # Layout styles
  │   ├── layout.tsx        # Layout component
  ├── /api                  # API-related files
  │   ├── accessToken.ts    # Access token handling
  │   └── login.ts          # Login API
  ├── /app                  # App-wide files
  │   ├── /fonts            # Font files
  │   ├── layout.tsx        # App layout component
  │   ├── page.tsx          # Main page component
  │   ├── reset.css         # Global CSS reset
  │   └── variables.css     # Global CSS variables
  ├── /components           # Reusable components
  ├── /constants            # Constants
  │   ├── cookies.ts        # Cookie constants
  │   └── urls.ts           # URL constants
  ├── /hooks               # Custom React hooks
  ├── /store               # State management
  ├── /types               # Type definitions
  └── /utils               # Utility functions

```

<br>

## 📄 Usage

```bash
git clone https://github.com/najitwo/10-Sprint-Taskify
cd 10-Sprint-Taskify
npm install
npm run dev
```

<br>

## 📌 References
- 🔗 **[Deployment Link](https://taskify10.vercel.app/):** Live demo of Taskify project.
- 🗒️ **[Notion Link](https://victorious-stream-36e.notion.site/PART-3-1-Taskify-13dcc029a107804297dfe06e4cd70a1c?pvs=4):** Comprehensive development documentation.

</div>
