      <div><h1>DNA Comparision Tool </h1>
         <p>Compare 2 sequences of DNA and get a report of difference and mutations.
         </p>
         <p>You can use <a href='http://uswest.ensembl.org/biomart/'>BioMart</a> to get DNA sequences.
         </p>
         
         <textarea class="span12" ng-model="seq_x" name="seq_x" rows="8" cols="120"></textarea>
         <textarea class="span12" ng-model="seq_y" name="seq_y" rows="8" cols="120"></textarea>
         <button id="align" class="btn btn-info" ng-click="align()"><i class="icon-white icon-refresh"></i>Align</button>

         <h3>{{message}}</h3>
         <p>{{output}}</p>

      </div>
