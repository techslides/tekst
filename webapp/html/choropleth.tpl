      <div><h1>Choropleth - By US Counties</h1>
          <p>This map uses d3js to display the unemployment rate by counties. Each county is clickable.</p>
          <p><button class="btn btn-primary" ng-click="cold()">Cold</button> <button class="btn btn-danger" ng-click="flu()">Influenza</button></p>
                 
          <br clear="all"/>         
          <div id="selection-board">
              <span ng-repeat="n in binh"><button class="btn btn-success" ng-click="play()">{{n.id}}</button></span>
          </div>
         
	  <br clear="all"/>

          <div class="col-lg-8" id="stage"> 
         
          <div id="spinner" class="progress progress-striped active">
          <div class="progress-bar"  role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="50" style="width: 100%">
          
          </div>
          </div>

          </div><!-- col-lg-8 -->

       </div><!-- Choropleth-->
