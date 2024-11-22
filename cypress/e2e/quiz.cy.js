describe('Tech Quiz', () => {
    beforeEach(() => {
      // Visit the quiz page before each test
      cy.visit('/quiz'); // Adjust the path based on your app's routing
    });
  
    it('starts the quiz when the start button is clicked', () => {
      // Ensure the start button is visible
      cy.contains('button', 'Start Quiz').should('be.visible');
  
      // Click the start button
      cy.contains('button', 'Start Quiz').click();
  
      // Verify the first question is displayed
      cy.get('.question').should('be.visible');
    });
  
    it('presents the next question after answering the current question', () => {
      // Start the quiz
      cy.contains('button', 'Start Quiz').click();
  
      // Answer the first question
      cy.get('.option').first().click(); // Adjust selector based on your HTML
  
      // Verify the second question appears
      cy.get('.question').should('contain.text', 'Question 2'); // Adjust text based on your app
    });
  
    it('ends the quiz and displays the score when all questions are answered', () => {
      // Start the quiz
      cy.contains('button', 'Start Quiz').click();
  
      // Answer all questions
      cy.get('.option').each((option) => {
        cy.wrap(option).click(); // Click each option
      });
  
      // Verify the quiz is over
      cy.get('.quiz-over').should('be.visible');
  
      // Verify the score is displayed
      cy.get('.score').should('contain.text', 'Your Score:');
    });
  
    it('allows restarting the quiz after it is over', () => {
      // Start the quiz and answer all questions
      cy.contains('button', 'Start Quiz').click();
      cy.get('.option').each((option) => {
        cy.wrap(option).click();
      });
  
      // Quiz is over, verify restart button
      cy.contains('button', 'Restart Quiz').should('be.visible');
  
      // Restart the quiz
      cy.contains('button', 'Restart Quiz').click();
  
      // Verify the first question is displayed again
      cy.get('.question').should('be.visible');
    });
  });