      <div><h1>DNA Comparision Tool </h1>
         <p>Compare 2 sequences of DNA and get a report of difference and mutations.
         </p>
         <p>You can use <a href='http://uswest.ensembl.org/biomart/'>BioMart</a> to get DNA sequences.
         </p>
         
         <div class="container">
              <textarea class="span12 margin-4" ng-model="seq_x" name="seq_x" rows="6" cols="120"></textarea>
              <textarea class="span12 margin-4" ng-model="seq_y" name="seq_y" rows="6" cols="120"></textarea>
         </container>
         <div class="container">
              <button id="align" class="btn btn-info pull-left" ng-click="align()"><i class="icon-white icon-refresh"></i>Align</button>
         </div>

         <h3>{{message}}</h3>
         <p>{{output}}</p>
         <div ng-repeat="report in reports">
              <svg width="575px" height="44px" viewBox="0 0 575 44" version="1.1" >
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                  <rect id="head" stroke="#979797" fill="#4A4A4A" sketch:type="MSShapeGroup" x="3" y="2" width="40" height="40" rx="8"></rect>
                  <rect id="box" stroke="#979797" fill="#D8D8D8" sketch:type="MSShapeGroup" x="48" y="2" width="500" height="40" rx="8"></rect>
                  <text id="6" sketch:type="MSTextLayer" font-family="Arial Black" font-size="18" font-weight="686" line-spacing="24" letter-spacing="0.0281250011" fill="#D4D4D4">
                    <tspan x="16" y="30">{{report.name}}</tspan>
                  </text>
                  <rect ng-repeat="(key, value) in report.mutations" id="line" fill="#4990E2" sketch:type="MSShapeGroup" x="{{10 * key + 40}}" y="-2" width="5" height="46"></rect>
                </g>
              </svg>

         </div>

      </div>
