/// <reference types="cypress" />
import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz.tsx';

// Mock dependencies
import * as questionApi from '../../client/src/services/questionApi';

describe('Quiz Component Tests', () => {
  const mockQuestions = [
    {
      question: 'What is React?',
      answers: [
        { text: 'A JavaScript library', isCorrect: true },
        { text: 'A CSS framework', isCorrect: false },
        { text: 'A database', isCorrect: false },
        { text: 'A package manager', isCorrect: false },
      ],
    },
    {
      question: 'What is JSX?',
      answers: [
        { text: 'JavaScript XML', isCorrect: true },
        { text: 'Java Syntax', isCorrect: false },
        { text: 'JSON-like Syntax', isCorrect: false },
        { text: 'None of the above', isCorrect: false },
      ],
    },
  ];

  beforeEach(() => {
    // Stub the API call to return mock data
    cy.stub(questionApi, 'getQuestions').resolves(mockQuestions);
  });

  it('renders the Start Quiz button', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').should('be.visible');
  });

  it('starts the quiz and displays the first question', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Check the first question is displayed
    cy.contains(mockQuestions[0].question).should('be.visible');

    // Check the answers are displayed
    mockQuestions[0].answers.forEach((answer, index) => {
      cy.contains('button', `${index + 1}`).should('be.visible');
      cy.contains(answer.text).should('be.visible');
    });
  });

  it('displays the next question after answering', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Answer the first question
    cy.contains('button', '1').click();

    // Verify the second question is displayed
    cy.contains(mockQuestions[1].question).should('be.visible');
  });

  it('completes the quiz and displays the score', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Answer all questions
    mockQuestions.forEach(() => {
      cy.contains('button', '1').click(); // Click the first answer for each question
    });

    // Verify the quiz completion message and score
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains(`Your score: ${mockQuestions.length}/${mockQuestions.length}`).should('be.visible');
  });

  it('allows restarting the quiz after completion', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Complete the quiz
    mockQuestions.forEach(() => {
      cy.contains('button', '1').click();
    });

    // Restart the quiz
    cy.contains('button', 'Take New Quiz').click();

    // Verify the quiz restarts with the Start Quiz button visible again
    cy.contains('button', 'Start Quiz').should('be.visible');
  });
});