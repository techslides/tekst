      <div><h1>Sorting By Algorithms</h1>
         <p>This page sorts the textarea below with an ajax call to the Go server and uses the Go server's
            sort functions. The time measurement is for the json unmarshalling and sort computing. The source
             is hosted on <a href="https://github.com/kyledinh/tekst">Github</a>.
         </p>
         <p>You can use <a href='http://www.lipsum.com'>www.lipsum.com</a> to generate paragraphs of text to sort.
         </p>
         
         <textarea class="span12" ng-model="data.sourcetext" name="sourcetext" rows="10" cols="120"></textarea>
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
                  <td> Go Lang 
                  <div class="pull-right">
                     <button class="btn btn-primary" ng-click="goSort('NATIVE')"><i class="icon-white icon-refresh"></i> Native </button>
                     <button class="btn btn-info" ng-click="goSort('SELECTION')"><i class="icon-white icon-refresh"></i> Selection</button>
                     <button class="btn btn-success" ng-click="goSort('INSERTION')"><i class="icon-white icon-refresh"></i> Insertion</button>
                     <button class="btn btn-warning" ng-click="goSort('QUICK')"><i class="icon-white icon-refresh"></i> Quick</button>

                  </div>
                  </td>
               </tr>
               <tr>
                  <td> Javascript 
                  <div class="pull-right">
                     <button class="btn btn-primary" ng-click="jsSort('NATIVE')"><i class="icon-white icon-refresh"></i> Native </button>
                     <button class="btn btn-info" ng-click="jsSort('SELECTION')"><i class="icon-white icon-refresh"></i> Selection</button>
                     <button class="btn btn-success" ng-click="jsSort('INSERTION')"><i class="icon-white icon-refresh"></i> Insertion</button>
                     <button class="btn btn-warning" ng-click="jsSort('QUICK')"><i class="icon-white icon-refresh"></i> Quick</button>
                  </div>
                  </td>
               </tr>
            </table>
         <div>
         <h3>{{message}}</h3>
         <p>{{output}}</p>
      </div>
