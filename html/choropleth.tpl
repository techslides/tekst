      <div><h1>Choropleth - By US Counties</h1>
         <p>This map used d3js to display the unemployment rater by counties. Each county is clickable.</p>
                 
         <br clear="all"/>         
         <div id="selection-board">
               <span ng-repeat="n in binh"><button class="btn btn-success" ng-click="play()">{{n.id}}</button></span>
         </div>
         
			<br clear="all"/>

         <div class="col-lg-8" id="stage"> 
         <div class="spinner" id="spinner"></div>        
         </div><!-- col-lg-8 -->

      </div><!-- Choropleth-->
