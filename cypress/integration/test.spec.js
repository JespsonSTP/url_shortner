describe('Heading', () => {
    it('has the right title', () => {
        cy.visit('http://0.0.0.0:5000/')

        cy.get('title')
            .invoke('text')
            .should("equal", "URL Shortener")
    });

});