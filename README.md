# Voting Poll App — React Mini-Project
A simple, responsive voting application built with React, Vite, and Tailwind CSS. 

## Features

### Create Polls: Add custom options to the voting list.

Live Results: View real-time vote counts and dynamic percentage progress bars.

Single-Vote Logic: Users are restricted to one vote; buttons disable automatically after selection.

Data Persistence: Poll data and voting status survive page refreshes.

Reset Capability: Clear all data and votes to start fresh.

Responsive Design: Fully optimized for mobile, tablet, and desktop views.

 ### Tech Stack

Framework: React (Vite)

Styling: Tailwind CSS

State Management: React Hooks (useState, useEffect)

Storage: Web Storage API (localStorage)

### Component Structure

App.jsx: The central hub. Manages global state (polls, hasVoted) and handles core logic.
PollForm.jsx: Form component for adding new poll options.
PollList.jsx: Container that calculates total votes and maps through the options.
PollOption.jsx: Individual item display featuring the vote button and progress bar.

### Setup Instructions

Clone the repository:
git clone git@github.com:safiabulle/Voting-Poll-App.git
cd voting-poll-app

Install dependencies:
npm install

Run the development server:
npm run dev

### Team Members & Contributions
Safia Bulle: Project initialization, Vite setup, and App.jsx state architecture.

Jayson Gicuki and Gabriel Ngige: PollForm.jsx implementation and input handling logic.

 Keith Mutugi and Linda Marani: PollList.jsx & PollOption.jsx components and  README documentation.

Lenox Javana and Jaden Afrika: LocalStorage integration, Reset functionality, and Tailwind styling.


### License
This project is open-source and available under the MIT License.

