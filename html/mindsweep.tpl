      <div><h1>Mindsweep</h1>
         <p>This implementation is incomplete, but you can read the mindsweep library at <a href="https://github.com/kyledinh/toolkit/tree/master/mindsweep">Github.</a></p>
                 
         <br clear="all"/>         
         
         <div class="accordion-group pull-left span6">
      
            <div class="accordion-heading">
                  <div class="form-inline accordion-toggle">
                     <button class="btn btn-info" ng-click="toggleAccordion('collapseOne')">Game Options</button>
                     {{result}}
                  </div>

            </div><!-- accordion-heading -->
            
            <div id="collapseOne" class="accordion-body collapse" style="height: 0px;">
               <div class="accordion-inner">

                  <form class="form-inline">Grid (x) (y) (# bombs)
                  </form>
                  <form class="form-inline" name="newgame">
                     <input class="input-small" type="text" id="restart_x" value="{{game.grid.x}}" />
                     <input class="input-small" type="text" id="restart_y" value="{{game.grid.y}}" />
                     <input class="input-small" type="text" id="restart_n" value="{{game.numBombs}}" />
                     <button class="btn btn-success" ng-click="restart()">New Game</button>
                  </form>  
                    
                  <!-- TODO: load saved games -->
                  <form class="form-inline">
                     <select>
  						<option>Albert</option>
  						<option>Berry</option>
  						<option>Connie</option>
  						<option>Dylan</option>
  						<option>Ed</option>
					 </select>
                     <button class="btn" ng-click="loadgame()">Load Game</button>
                  </form>   
                  <form class="form-inline">
                     <input type="text" ng-model="game.name" />
                     <button class="btn btn-info" ng-click="save()">Save</button>
                  </form>                  
                                                 
               </div>
            </div><!-- collapseOne -->
            
         </div><!-- accordion-group -->
         <br clear="all"/>
         <br clear="all"/>         
         <table>
            <tr ng-repeat="row in display">
               <td ng-repeat="cell in row"><button class="btn" ng-click="play(cell.x,cell.y)">{{cell.show}}</button></td>
            </tr>
         </table>
      </div><!-- Mindsweep -->
