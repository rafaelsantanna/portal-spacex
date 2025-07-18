describe('SpaceX Portal - Navigation', () => {
  beforeEach(() => {
    // Visit homepage before each test
    cy.visit('/')
  })

  it('should navigate from home to launches page', () => {
    // Check if we're on the homepage
    cy.contains('SpaceX Launch Portal').should('be.visible')
    
    // Click on "View Launches" button
    cy.contains('View Launches').click()
    
    // Should navigate to launches page
    cy.url().should('include', '/launches')
    cy.contains('SpaceX Launches').should('be.visible')
  })

  it('should scroll through launches and navigate to launch detail', () => {
    // Navigate to launches page
    cy.visit('/launches')
    
    // Wait for launches to load
    cy.get('[data-testid="launch-card"]', { timeout: 10000 }).should('have.length.at.least', 1)
    
    // Scroll down to trigger infinite scroll (if implemented)
    cy.scrollTo('bottom')
    
    // Wait a bit for potential new launches to load
    cy.wait(2000)
    
    // Click on the first launch card's "View Details" button
    cy.get('[data-testid="launch-card"]').first().within(() => {
      cy.contains('View Details').click()
    })
    
    // Should navigate to launch detail page
    cy.url().should('match', /\/launches\/\w+/)
    
    // Check if launch detail page elements are present
    cy.get('h1').should('be.visible')
    cy.contains('Mission Details').should('be.visible')
  })

  it('should navigate using header links', () => {
    // Test header navigation
    cy.get('header').within(() => {
      // Click on Launches link in header
      cy.contains('Launches').click()
    })
    
    // Should be on launches page
    cy.url().should('include', '/launches')
    
    // Navigate back to home using logo/title
    cy.get('header').within(() => {
      cy.contains('SpaceX Portal').click()
    })
    
    // Should be back on homepage
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('should work on mobile viewport', () => {
    // Set mobile viewport
    cy.viewport('iphone-x')
    
    // Check if mobile menu button is visible
    cy.get('header').within(() => {
      cy.get('button[aria-label="Toggle menu"]').should('be.visible')
      
      // Click mobile menu button
      cy.get('button[aria-label="Toggle menu"]').click()
    })
    
    // Wait for mobile menu to appear outside of header scope
    cy.contains('Launches').should('be.visible')
    
    // Click on Launches in mobile menu
    cy.contains('Launches').click()
    
    // Should navigate to launches page
    cy.url().should('include', '/launches')
  })

  it('should handle external links correctly', () => {
    // Navigate to launches page
    cy.visit('/launches')
    
    // Wait for launches to load
    cy.get('[data-testid="launch-card"]', { timeout: 10000 }).should('have.length.at.least', 1)
    
    // Check if external links have correct attributes
    cy.get('[data-testid="launch-card"]').first().within(() => {
      // Check for Watch button (YouTube link)
      cy.get('a[target="_blank"]').first().should('have.attr', 'rel', 'noopener noreferrer')
    })
    
    // Test header external link
    cy.get('header').within(() => {
      cy.get('a[href="https://www.spacex.com"]')
        .should('have.attr', 'target', '_blank')
        .should('have.attr', 'rel', 'noopener noreferrer')
    })
  })

  it('should display loading states appropriately', () => {
    // Visit launches page
    cy.visit('/launches')
    
    // Check for loading or content
    cy.get('body').should('be.visible')
    cy.get('body').then(($body) => {
      if ($body.text().includes('Loading')) {
        cy.contains('Loading').should('be.visible')
      } else {
        cy.contains('SpaceX Launches').should('be.visible')
      }
    })
  })

  it('should handle navigation errors gracefully', () => {
    // Try to visit a non-existent launch detail page
    cy.visit('/launches/non-existent-id', { failOnStatusCode: false })
    
    // Should show some kind of error or redirect
    cy.get('body').should('be.visible')
  })
})