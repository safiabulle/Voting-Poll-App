# Voting Poll App - React Mini-Project

A simple, responsive voting application built with React, Vite, and Tailwind CSS.

## Features

- Create Polls: Add custom options to the voting list.
- Live Results: View real-time vote counts and dynamic percentage progress bars.
- Single-Vote Logic: Users are restricted to one vote; buttons disable automatically after selection.
- Data Persistence: Poll data and voting status survive page refreshes.
- Reset Capability: Restore the default poll options and clear previous votes.
- Responsive Design: Optimized for mobile, tablet, and desktop views.

## Component Structure

- `App.jsx`: Manages the main state, voting logic, reset logic, and localStorage updates.
- `PollForm.jsx`: Handles the form for adding new poll options.
- `PollList.jsx`: Calculates total votes and displays the list of poll options.
- `PollOption.jsx`: Displays each option with its vote button, delete button, vote count, and progress bar.

## Setup Instructions

Clone the repository:

```bash
git clone git@github.com:safiabulle/Voting-Poll-App.git
cd Voting-Poll-App
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

## Team Members & Contributions

- Safia Bulle: Project initialization, Vite setup, and `App.jsx` state architecture.
- Jayson Gichuki and Gabriel Ngige: `PollForm.jsx` implementation and input handling logic.
- Keith Mutugi and Linda Marani: `PollList.jsx`, `PollOption.jsx`, and README documentation.
- Lenox Javana and Jaden Afrika: localStorage integration, reset functionality, and Tailwind styling.

## License
This project is open-source and available under the MIT License.
