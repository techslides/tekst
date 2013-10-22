      <div><h1>Mindsweep</h1>
         <p>This implementation is incomplete, but you can read the mindsweep library at <a href="https://github.com/kyledinh/toolkit/tree/master/mindsweep">Github.</a></p>
                 
         <br clear="all"/>         
         
         <div class="accordion-group pull-left span6">
      
            <div class="panel panel-default">
            <!-- Default panel contents -->
               <div class="panel-heading"><button class="btn btn-info" ng-click="toggleAccordion('collapseOne')">Game Options</button> {{result}}</div>

               <div class="panel-body" style="display: none;" id="collapseOne">
    
               <div class="well" style="margin-top: 20px;">

                  <form class="form-inline" name="newgame" role="form">
                     <div class="form-group">

                        <div class="input-group col-lg-2">
                           <span class="input-group-addon">x</span>
                           <input type="text" class="form-control" id="restart_x" value="{{game.grid.x}}" >
                        </div>
                        <div class="input-group col-lg-2">
                           <span class="input-group-addon">y</span>
                           <input type="text" class="form-control" id="restart_y" value="{{game.grid.y}}" >
                        </div>
                        <div class="input-group col-lg-2">
                           <span class="input-group-addon"># (bombs)</span>
                           <input type="text" class="form-control" id="restart_n" value="{{game.numBombs}}" >
                        </div>       
                        <div class="input-group col-lg-2">                 
                           <button class="btn btn-success" ng-click="restart()">New Game</button>
                        </div>
                     </div>
                  </form>  

                  <br clear="all"/>         

                    
                  <!-- TODO: load saved games 
                  <form role="form">
                     <div class="form-group">
                     <select>
                        <option>Albert</option>
                        <option>Berry</option>
                        <option>Connie</option>
                        <option>Dylan</option>
                        <option>Ed</option>
                     </select>
                     <button class="btn" ng-click="loadgame()">Load Game</button>
                  </div>
                  </form>

                  <br clear="all"/>  

                  -->       


                  <form class="form-inline" role="form">
                     <div class="form-group">
                     <input type="text" ng-model="game.name" />
                     <button class="btn btn-info" ng-click="save()">Save</button>
                     </div>
                  </form>                  
                                                 
               </div>

  </div>


</div>  





            
         </div><!-- accordion-group -->
         <br clear="all"/>
         <br clear="all"/>         
         <table id="game-board">
            <tr ng-repeat="row in display">
               <td ng-repeat="cell in row"><button class="btn tile-square" ng-click="play(cell.x,cell.y)">{{cell.show}}</button></td>
            </tr>
         </table>
      </div><!-- Mindsweep -->
