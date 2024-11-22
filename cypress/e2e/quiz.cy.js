describe('Tech Quiz End-to-End Tests', () => {
    beforeEach(() => {
      // Visit the quiz page before each test
      cy.visit('/quiz'); // Adjust this path based on your app's routing
    });
  
    it('displays the start button initially', () => {
      // Verify the "Start Quiz" button is visible
      cy.contains('button', 'Start Quiz').should('be.visible');
    });
  
    it('starts the quiz when the start button is clicked', () => {
      // Click the start button
      cy.contains('button', 'Start Quiz').click();
  
      // Verify the first question is displayed
      cy.get('.card').should('be.visible'); // Adjust if necessary
      cy.get('h2').should('not.be.empty'); // Verifies question text is present
  
      // Verify the answers are displayed
      cy.get('button').each((button) => {
        cy.wrap(button).should('be.visible');
      });
    });
  
    it('allows answering questions and moves to the next question', () => {
      // Start the quiz
      cy.contains('button', 'Start Quiz').click();
  
      // Answer the first question
      cy.get('button').first().click();
  
      // Verify that the next question is displayed
      cy.get('h2').should('not.contain.text', ''); // Ensure a new question is displayed
    });
  
    it('ends the quiz and displays the score after all questions are answered', () => {
      // Start the quiz
      cy.contains('button', 'Start Quiz').click();
  
      // Answer all questions
      cy.get('.card').each(() => {
        cy.get('button').first().click(); // Adjust based on your selectors
      });
  
      // Verify the "Quiz Completed" message is displayed
      cy.contains('Quiz Completed').should('be.visible');
  
      // Verify the score is displayed
      cy.get('.alert-success').should('contain.text', 'Your score:');
    });
  
    it('allows restarting the quiz after it is completed', () => {
      // Start the quiz and complete it
      cy.contains('button', 'Start Quiz').click();
      cy.get('.card').each(() => {
        cy.get('button').first().click();
      });
  
      // Verify the "Take New Quiz" button is displayed
      cy.contains('button', 'Take New Quiz').should('be.visible');
  
      // Restart the quiz
      cy.contains('button', 'Take New Quiz').click();
  
      // Verify the quiz restarts with the first question
      cy.contains('button', 'Start Quiz').should('not.exist'); // Start button should be gone
      cy.get('h2').should('be.visible'); // First question should be displayed
    });
  });