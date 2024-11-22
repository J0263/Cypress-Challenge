/// <reference types="cypress" />
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

// Mock dependencies
import * as questionApi from '../../client/src/services/questionApi';

describe('Quiz Component', () => {
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
    // Mock the API call
    cy.stub(questionApi, 'getQuestions').resolves(mockQuestions);
  });

  it('should render the start button initially', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').should('be.visible');
  });

  it('should start the quiz and display the first question', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Verify first question is displayed
    cy.contains(mockQuestions[0].question).should('be.visible');

    // Verify answers are displayed
    mockQuestions[0].answers.forEach((answer, index) => {
      cy.contains('button', `${index + 1}`).should('be.visible');
      cy.contains(answer.text).should('be.visible');
    });
  });

  it('should move to the next question after answering correctly', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Click the correct answer for the first question
    const correctAnswerIndex = mockQuestions[0].answers.findIndex((a) => a.isCorrect);
    cy.contains('button', `${correctAnswerIndex + 1}`).click();

    // Verify second question is displayed
    cy.contains(mockQuestions[1].question).should('be.visible');
  });

  it('should display the score and completion message when the quiz ends', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Answer all questions
    mockQuestions.forEach((question) => {
      const correctAnswerIndex = question.answers.findIndex((a) => a.isCorrect);
      cy.contains('button', `${correctAnswerIndex + 1}`).click();
    });

    // Verify the quiz is completed
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains(`Your score: ${mockQuestions.length}/${mockQuestions.length}`).should('be.visible');
  });

  it('should restart the quiz when "Take New Quiz" is clicked', () => {
    mount(<Quiz />);
    cy.contains('button', 'Start Quiz').click();

    // Complete the quiz
    mockQuestions.forEach((question) => {
      const correctAnswerIndex = question.answers.findIndex((a) => a.isCorrect);
      cy.contains('button', `${correctAnswerIndex + 1}`).click();
    });

    // Restart the quiz
    cy.contains('button', 'Take New Quiz').click();

    // Verify the start button is displayed again
    cy.contains('button', 'Start Quiz').should('be.visible');
  });
});