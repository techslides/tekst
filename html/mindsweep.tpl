      <div><h1>Mindsweep</h1>
         <p>This implementation is incomplete, but you can read the mindsweep library at <a href="https://github.com/kyledinh/toolkit/tree/master/mindsweep">Github.</a></p>
         <p>{{result}}</p>
         <form class="form-inline">
            <input type="text" ng-model="game.name" />
            <button class="btn btn-info" ng-click="save()">Save</button>
         </form>
         <table>
            <tr ng-repeat="row in display">
               <td ng-repeat="cell in row"><button class="btn" ng-click="play(cell.x,cell.y)">{{cell.show}}</button></td>
            </tr>
         </table>
      </div><!-- Mindsweep -->
