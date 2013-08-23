      <div><h1>Beta Page</h1>
         <textarea class="span12" ng-model="data.sourcetext" name="sourcetext" rows="10" cols="120"></textarea>
         <p>{{data.sourcetext|reverse}}</p>
      </div>

      <div class="modal hide fade ng-scope in" tabindex="-1" id="modal" style="display: none;" aria-hidden="false">
         <div class="modal-header">
            <button type="button" class="close" ng-click="closeModal('modal')" aria-hidden="true">×</button>
            <h3 id="myModalLabel">Modal header</h3>
         </div>
         <div class="modal-body">
            <form>
            <fieldset>
            <legend>Legend</legend>
            <label>Label name</label>
               <input type="text" placeholder="Type something…" autofocus="autofocus">
            <span class="help-block">Example block-level help text here.</span>
            <label class="checkbox">
               <input type="checkbox"> Check me out
            </label>
            <button type="submit" class="btn">Submit</button>
            </fieldset>
            </form>
            <p>{{modal.content}}</p>
            <br/>
            <pre>2 + 3 = {{ 2 + 3 }}</pre>
         </div>
         <div class="modal-footer">
            <button class="btn" ng-click="closeModal('modal')">Close</button>
            <button class="btn btn-primary" ng-click="modal.saved=true;dismiss()">Save changes</button>
            <button class="btn btn-primary" ng-click="parentController(dismiss)">Parent dismiss</button>
         </div>
      </div><!-- Modal -->

      <div id="backdrop" class="fade in"></div>

      <div class="btn btn-warning" ng-click="openModal('modal')">
            Open Modal
      </div>

      <div class="btn" 
         ng-click="ev = $event" 
         ng-repeat="item in data.sourcetext.split('')">
            {{$index}}. {{item}} {{ev.pageX}} 
       </div>
