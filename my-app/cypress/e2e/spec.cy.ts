
// visit the locahost:3000 server and load the home page of the app 
// type in username for id =username
// type in password for id = password
// click on thg Sign in button with class ="MuiButton-label"  
// validate account name is "Edgar J" is present in data-test ="sidenav-user-full-name"
// get data-test="sidenav-user-balance" text value and save it to a new variable "currentBalance"
// validate 2nd item with class ="MuiTab-wrapper" contains = "friends" with matchcase false with and click on it
// click on New button with data-test="nav-top-new-transaction"
// select contact with class='MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock' and text ="Kaylin Homenick"
// set amount 100 into textbox with id = "amount"
// add a note "from Edgar J to Kaylin Homenick" into textbox with id = "transaction-create-description-input"
// clikc PAY button with data-test="transaction-create-submit-payment"
// click on "HOME" button with class='MuiTypography-root MuiListItemText-primary MuiTypography-body1 MuiTypography-displayBlock' and contains "Home"
// wait 3 sec
// get data-test="sidenav-user-balance" text value and save it to a new variable "updateBalance"
// get difference between updateBalance and currentBalance and save it to a new variable "difference" and it should equal to 100
// connect to users API and validate user Edgar J current balance matchs with UI display

var currentBalance = "";
var updateBalance = "";
describe('Home page', () => {
    it('successfully loads', () => {
        cy.visit('http://localhost:3000') // change URL to match your dev URL
        cy.get('#username').type('Katharina_Bernier')
        cy.get('#password').type('s3cret')
        cy.get('.MuiButton-label').click()
        cy.wait(1000)
        cy.get('[data-test=sidenav-user-full-name]').should('contain', 'Edgar J') 
        
        cy.get('[data-test=sidenav-user-balance]').invoke('text').then((balance) => {
          currentBalance = balance;
          cy.log(currentBalance)
          cy.log(balance)
          cy.get('.MuiTab-wrapper').contains('friends', {matchCase: false}).click()
          cy.wait(1000)
          cy.get('[data-test=nav-top-new-transaction]').click()
          cy.wait(1000)
          cy.get('.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock').contains('Kaylin Homenick').click()
          cy.wait(1000)
          cy.get('#amount').type('100')
          cy.get('#transaction-create-description-input').type('from Edgar J to Kaylin Homenick')
          cy.wait(1000)
          cy.get('[data-test=transaction-create-submit-payment]').click()
          cy.wait(1000)
          cy.get('.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock').contains('Home').click()
        
          cy.wait(3000)
          const element = cy.get('[data-test=sidenav-user-balance]').invoke('text').then((balance) => {
            updateBalance=balance;
            cy.log(currentBalance)
            cy.log(updateBalance)
            const num1 = parseFloat(updateBalance.replace('$', '').replace(',', ''))
            const difference = Math.round(getDollarDifference(currentBalance, updateBalance))
            cy.log(difference.toString())
            expect(difference).to.eq(100) 
            cy.request('GET', 'http://localhost:3001/users/t45AiwidW').then((response) => {
              const balance = response.body.user.balance
              console.log(balance)
              cy.log(" print balance " + balance)
              expect(balance).to.equal(num1*100)
            })
          })
            
          
        });
        
        
        
       

    })
} )


// create a function to covert 2 dollor values into number and get difference

function getDollarDifference(value1: string, value2: string): number {
  const num1 = parseFloat(value1.replace('$', '').replace(',', ''))
  cy.log('num1 : ' + num1.toString())
  const num2 = parseFloat(value2.replace('$', '').replace(',', ''))
  cy.log('num2 : ' + num2.toString())
  return num1 - num2
}









