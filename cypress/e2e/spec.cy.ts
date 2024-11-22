describe('Tech Quiz End-to-End Tests', () => {
  beforeEach(() => {
    // Intercept the API call to return mock questions
    cy.fixture('questions.json').then((questions) => {
      cy.intercept('GET', '/api/questions/random', {
        statusCode: 200,
        body: questions,
      }).as('getQuestions');
    });

    // Visit the quiz page
    cy.visit('/');
  });

  it('displays the start button on load', () => {
    // Verify the "Start Quiz" button is visible
    cy.contains('button', 'Start Quiz').should('be.visible');
  });

  it('starts the quiz and displays the first question', () => {
    // Start the quiz
    cy.contains('button', 'Start Quiz').click();

    // Wait for the API call to complete
    cy.wait('@getQuestions');

    // Verify the first question is displayed
    cy.get('.card h2').should('contain.text', 'What is React?'); // Replace with your first question's text

    // Verify the answer options are displayed
    cy.get('.btn.btn-primary').should('have.length', 4); // Assuming 4 answer buttons
  });

  it('allows answering a question and displays the next question', () => {
    // Start the quiz
    cy.contains('button', 'Start Quiz').click();

    // Wait for the API call to complete
    cy.wait('@getQuestions');

    // Answer the first question
    cy.get('.btn.btn-primary').first().click();

    // Verify the next question is displayed
    cy.get('.card h2').should('not.contain.text', 'What is React?'); // Ensure the question changes
  });

  it('displays the score after the last question', () => {
    // Start the quiz
    cy.contains('button', 'Start Quiz').click();

    // Wait for the API call to complete
    cy.wait('@getQuestions');

    // Answer all questions
    cy.get('.btn.btn-primary').each(($el) => {
      cy.wrap($el).click();
    });

    // Verify the completion message and score
    cy.contains('Quiz Completed').should('be.visible');
    cy.contains('Your score:').should('be.visible');
  });

  it('resets the quiz after completion', () => {
    // Start and complete the quiz
    cy.contains('button', 'Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.btn.btn-primary').each(($el) => {
      cy.wrap($el).click();
    });

    // Restart the quiz
    cy.contains('button', 'Take New Quiz').click();

    // Wait for DOM updates (if needed)
    cy.wait(500);

    // Verify the quiz is reset
    it('displays the start button on load', () => {
      // Verify the "Start Quiz" button is visible
      cy.contains('button', 'Start Quiz').should('be.visible');
    });
  });
});