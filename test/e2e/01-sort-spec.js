describe('tekst sort page', function() {

  var SERVER_URL = 'http://localhost:8000/view/#/';

  describe('todo list', function() {
    var todoList;

    beforeEach(function() {
      browser.get(SERVER_URL);
    });

    it('should sort', function() {
      browser.get(SERVER_URL + 'sort');
      element(by.model('data.sourcetext')).clear();
      element(by.model('data.sourcetext')).sendKeys('zebra cat dog');
      element(by.id('go_selection')).click();

      var greeting = element(by.binding('output'));
      expect(greeting.getText()).toEqual('cat dog zebra');     
    });

    it('should play mindsweep', function() {
      browser.get(SERVER_URL + 'mindsweep');
      element(by.buttonText('Game Options')).click();
      element(by.id('restart_x')).clear();
      element(by.id('restart_x')).sendKeys('9');
      element(by.id('restart_y')).clear();
      element(by.id('restart_y')).sendKeys('6');   
      element(by.buttonText('New Game')).click();  
      element(by.buttonText('Game Options')).click();

      element.all(by.css('[id="game-board"] tr')).then(function(trs) {
        expect(trs.length).toBe(6);
      });                       
    });

    it('should use choropleth', function() {
      browser.get(SERVER_URL + 'choropleth');
      element(by.buttonText('Cold')).click();
      expect(element(by.css('.counties')).isPresent()).toBe(true);
      element(by.buttonText('Influenza')).click();
      expect(element(by.css('.counties')).isPresent()).toBe(true);                      
    });

  });
});
