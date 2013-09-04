
      <div class="container">
         <h1>Modal Example</h1>
         <p>Example of animation with Angular/Bootstrap without jQuery</p>
         <textarea class="span12" ng-model="data.sourcetext" name="sourcetext" rows="10" cols="120"></textarea>
         <p>{{data.sourcetext|reverse}}</p>
         
         <table cellpadding="0" cellspacing="0" border="0" class="table table-bordered" width="100%">
            <tr>
               <td>         
                  <button class="btn btn-warning" ng-click="openModal('modal')">Open Modal</button>
               </td>
            </tr>
         </table> 
         
         <h1>Accordion Example</h1>
         <div class="accordion-group">
         
            <div class="accordion-heading">
               <a class="accordion-toggle" ng-click="toggleAccordion('collapseOne')">
                Collapsible Group Item #1
               </a>
            </div><!-- accordion-heading -->
            
            <div id="collapseOne" class="accordion-body collapse" style="height: 0px;">
               <div class="accordion-inner">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
               </div>
            </div><!-- collapseOne -->
            
         </div><!-- accordion-group -->
                 
                     
      </div><!-- container -->      


      <!-- MODAL -->
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



<!--
      <div class="btn" 
         ng-click="ev = $event" 
         ng-repeat="item in data.sourcetext.split('')">
            {{$index}}. {{item}} {{ev.pageX}} 
       </div>

 -->      
