      <div><h1>Data Visualization with D3JS</h1>

          <div class="col-lg-8" id="stage"> 
              <h4>Donut Charts</h4>
              <donut-chart width="200" height="200" data="shared.data" on-click="chartClicked()"></donut-chart> 
              <ul>
                  <li ng-repeat="v in shared.data track by $index">
                      <input type="range" min="0" max="100" ng-model="shared.data[$index]"></input>
                  </li>
                  <button ng-click="addValue()">Add value</button>
              </ul>
          </div><!-- col-lg-8 -->

       </div><!-- DataDiz-->
