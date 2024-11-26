
# Tech Quiz End-to-End Testing with Cypress

## Table of Contents
- [Overview](#overview)
- [Features Tested](#features-tested)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Test Files and Structure](#test-files-and-structure)
- [How to Run Tests](#how-to-run-tests)
- [Mock Data](#mock-data)
- [Known Issues](#known-issues)
- [Walkthrough] (#walkthrough)

---

## Overview

This project uses Cypress to perform end-to-end tests on a Tech Quiz web application. The tests cover all core functionalities, including starting the quiz, answering questions, displaying the score, and resetting the quiz. The goal is to ensure that the app functions as expected and provides a seamless user experience.

---

## Features Tested

### **1. Displays the Start Button**
- Verifies that the "Start Quiz" button is visible when the page loads.

### **2. Starts the Quiz**
- Tests that clicking the "Start Quiz" button fetches the first question and displays it.

### **3. Allows Answering Questions**
- Ensures users can answer a question and proceed to the next one.

### **4. Displays the Score**
- Confirms that the score is displayed after the user answers all questions.

### **5. Resets the Quiz**
- Verifies that clicking "Take New Quiz" resets the quiz and returns the user to the initial state.

---

## Technologies Used

- [Cypress](https://www.cypress.io/) for end-to-end testing.
- [Node.js](https://nodejs.org/) for the runtime environment.
- Mock API responses for consistent test results.

---

## Setup and Installation

### **1. Clone the Repository**
```bash
git clone <https://github.com/J0263/Cypress-Challenge.git>
cd <Cypress-Challenge>
```

### **2. Install Dependencies**
Ensure you have Node.js installed. Then, run:
```bash
npm install
```

### **3. Install Cypress**
Cypress is included as a development dependency. If not installed, run:
```bash
npm install cypress --save-dev
```

### **4. Open Cypress**
To open the Cypress Test Runner, run:
```bash
npx cypress open
```

---

## Test Files and Structure

### **Folder Structure**
```plaintext
cypress/
├── e2e/
│   └── spec.cy.ts      # End-to-end tests for the Tech Quiz
├── fixtures/
│   └── questions.json  # Mock data for testing
├── support/
│   └── commands.js     # Custom Cypress commands
│   └── e2e.js          # Support file for tests
└── tsconfig.json       # TypeScript configuration
```

### **Key Test File: `spec.cy.ts`**
This file contains all test cases for the Tech Quiz, including:
- Displaying the start button.
- Starting the quiz and fetching questions.
- Answering questions and displaying the next one.
- Completing the quiz and resetting it.

### **Mock Data: `questions.json`**
Used to intercept API calls and provide consistent responses for tests.

---

## How to Run Tests

### **Run in Cypress Test Runner**
1. Open the Test Runner:
   ```bash
   npm run cypress
   ```
2. Select the `spec.cy.ts` file under the `e2e` folder.
3. Click to run the tests in the browser.

### **Run in Headless Mode**
Run the tests in the terminal without opening a browser:
```bash
npx cypress run
```

---

## Mock Data

The `questions.json` file contains predefined questions and answers for testing. Example:

```json
[
  {
    "question": "What is React?",
    "answers": [
      { "text": "A JavaScript library", "isCorrect": true },
      { "text": "A CSS framework", "isCorrect": false },
      { "text": "A database", "isCorrect": false },
      { "text": "A package manager", "isCorrect": false }
    ]
  },
  {
    "question": "What is JSX?",
    "answers": [
      { "text": "JavaScript XML", "isCorrect": true },
      { "text": "Java Syntax", "isCorrect": false },
      { "text": "JSON-like Syntax", "isCorrect": false },
      { "text": "None of the above", "isCorrect": false }
    ]
  }
]
```

---

## Known Issues

- The "Take New Quiz" button occasionally requires additional time for the DOM to update. A `cy.wait()` command has been added to handle this.
- Mock data must match the structure expected by the application for tests to pass.

##Walkthrough
Walkthroug video can be found on https://drive.google.com/file/d/1efrJrmyw9ohuNIXHhar-4-nIlmNctt4U/view?usp=sharing