      <div><h1>Sorting By Algorithms</h1>
         <p>This page sorts the textarea below with an ajax call to the Go server and uses the Go server's
            sort functions. The time measurement is for the json unmarshalling and sort computing. The AngularJS/Go source
             is hosted on <a href="https://github.com/kyledinh/tekst">Github</a>. And the Ruby on Rails source is hosted here on a <a href="https://github.com/kyledinh/toolkit/tree/master/ruby/rubysort"> seperate repo</a>.
         </p>
         <p>You can use <a href='http://www.lipsum.com'>www.lipsum.com</a> to generate paragraphs of text to sort.
         </p>
         
         <textarea class="span12" ng-model="data.sourcetext" name="sourcetext" rows="10" cols="120"></textarea>

         <h3>{{message}}</h3>
         <p>{{output}}</p>


         <div>
            <table cellpadding="0" cellspacing="0" border="0" class="table table-bordered" width="100%">
               <tr>
                  <td>
                  <h4>Sort Criteria</h4>
                  <div class="pull-left">
                  <form name="myForm" ng-controller="AlphaCtrl">
                     <label class="radio">
                        <input type="radio" ng-model="data.criteria" name="criteria" value="WORD">
                        By words
                     </label>
                     <label class="radio">
                        <input type="radio" ng-model="data.criteria" name="criteria" value="CHAR">
                        By characters
                     </label>
                  </form>                                                                                  
                  </div>
                  </td>
               </tr>            
               <tr>
                  <td> <b>Go Lang</b> (sends AJAX to Go Server)<br/>(*Quicksort not implemented to show JSON error response) 
                  <div id="go_buttons" class="pull-right">
                     <button id="go_native" class="btn btn-primary" ng-click="goSort('NATIVE')"><i class="icon-white icon-refresh"></i> Native </button>
                     <button id="go_selection" class="btn btn-info" ng-click="goSort('SELECTION')"><i class="icon-white icon-refresh"></i> Selection</button>
                     <button id="go_insertion" class="btn btn-success" ng-click="goSort('INSERTION')"><i class="icon-white icon-refresh"></i> Insertion</button>
                     <button id="go_quick" class="btn btn-warning" ng-click="goSort('QUICK')"><i class="icon-white icon-refresh"></i> Quick</button>
                  </div>
                  </td>
               </tr>
               <tr>
                  <td> <b>Javascript</b> (processes the task locally) 
                  <div id="js_buttons" class="pull-right">
                     <button id="js_native" class="btn btn-primary" ng-click="jsSort('NATIVE')"><i class="icon-white icon-refresh"></i> Native </button>
                     <button id="js_selection" class="btn btn-info" ng-click="jsSort('SELECTION')"><i class="icon-white icon-refresh"></i> Selection</button>
                     <button id="js_insertion" class="btn btn-success" ng-click="jsSort('INSERTION')"><i class="icon-white icon-refresh"></i> Insertion</button>
                     <button id="js_quick" class="btn btn-warning" ng-click="jsSort('QUICK')"><i class="icon-white icon-refresh"></i> Quick</button>
                  </div>
                  </td>
               </tr>
               <tr>
                  <td> <b>Ruby On Rails</b> (sends cross-site AJAX call to a RoR Server) 
                  <div id="ror_buttons" class="pull-right">
                     <button id="ror_native" class="btn btn-primary" ng-click="rorSort('NATIVE')"><i class="icon-white icon-refresh"></i> Native </button>
                     <button id="ror_selection" class="btn btn-info" ng-click="rorSort('SELECTION')"><i class="icon-white icon-refresh"></i> Selection</button>
                     <button id="ror_insertion" class="btn btn-success" ng-click="rorSort('INSERTION')"><i class="icon-white icon-refresh"></i> Insertion</button>
                     <button id="ror_quick" class="btn btn-warning" ng-click="rorSort('QUICK')"><i class="icon-white icon-refresh"></i> Quick</button>
                  </div>
                  </td>
               </tr>
            </table>
         <div>
      </div>
