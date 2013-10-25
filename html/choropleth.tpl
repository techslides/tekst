      <div><h1>Choropleth - By US Counties</h1>
         <p>This implementation is incomplete, but you can read the mindsweep library at <a href="https://github.com/kyledinh/toolkit/tree/master/mindsweep">Github.</a></p>
                 
         <br clear="all"/>         
         <div id="selection-board">
               <div ng-repeat="n in binh"><button class="btn btn-default" ng-click="play()">{{n.id}}</button></div>
         </div>
         
			<br clear="all"/>

         <div class="col-lg-8" id="stage"> 
         <div class="spinner" id="spinner"></div>        
         </div><!-- col-lg-8 -->



      </div><!-- Choropleth-->
