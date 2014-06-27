describe('Tekst Test', function() {

  var SERVER_URL = 'http://localhost:8000/view/#/';

  describe('Tekst - DataViz', function() {
    var todoList;

    beforeEach(function() {
      browser.get(SERVER_URL);
    });

    it('should click donut chart', function() {
      browser.get(SERVER_URL + 'dataviz');
      element(by.css('donut-chart')).click();
      expect(element(by.css('.ng-isolate-scope.ng-scope')).isPresent()).toBe(true);
      element(by.css('donut-chart')).click();
      expect(element(by.css('.ng-isolate-scope.ng-scope')).isPresent()).toBe(true);
      element(by.css('donut-chart')).click();
      expect(element(by.css('.ng-isolate-scope.ng-scope')).isPresent()).toBe(true);                         
    });

    it('should use seq tool', function() {
      browser.get(SERVER_URL + 'seq');
      element(by.buttonText('Align')).click();
      expect(element(by.css('svg')).isPresent()).toBe(true);   
      element(by.buttonText('Align')).click();                          
    });

  });
});
