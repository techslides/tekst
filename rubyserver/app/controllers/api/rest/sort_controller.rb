module Api 
   module Rest 

      class SortController < ApplicationController
         include Algorithms

         skip_before_filter :verify_authenticity_token

         # http://www.tsheffler.com/blog/?p=428
         before_filter :cors_preflight_check
         after_filter :cors_set_access_control_headers

         # For all responses in this controller, return the CORS access control headers.

         def cors_set_access_control_headers
            headers['Access-Control-Allow-Origin'] = '*'
            headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
            headers['Access-Control-Max-Age'] = "1728000"
         end

         # If this is a preflight OPTIONS request, then short-circuit the
         # request, return only the necessary headers and return an empty
         # text/plain.

         def cors_preflight_check
            logger.debug "Request method ==== #{ request.method } "            

            if request.method == "OPTIONS"
               logger.debug " IS A METHOD :OPTIONS "            
             
               headers['Access-Control-Allow-Origin'] = '*'
               headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
               headers['Access-Control-Allow-Headers'] = %w{Origin Accept Content-Type X-Requested-With X-CSRF-Token}.join(",")
               headers['Access-Control-Max-Age'] = '1728000'          
               render :text => '', :content_type => 'text/plain'      
            end
         end

         # GET method 
         def index
            @p = params.inspect 
            render :json => @p
         end

         # POST method 
         def create        
            logger.debug "sort#create with params == #{ request.params } "   
   
            @task = Task.new
            _start_sw = Time.now
         
            _payload = request.raw_post
            _param_sort = request.params[:sort]

            if (_payload.nil? && _param_sort.nil?)  
               @task.message = "No raw_post data found in Request."
               @task.status = "error"
            else  
               #  use params "sort" if the payload was not in the body 
               #  work around to use curl --data that places json in the params
               if (_payload.nil? && !_param_sort.nil?) 
                  _info = _param_sort 
               else
                  _info = JSON.parse(_payload)
               end 

               @task.data = _info["data"]
               @task.action = _info["action"]

               case @task.action
               when "NATIVE"
                  @task.data = @task.data.sort
                  @task.message = msgformatter(_start_sw, @task) 
                  @task.status = "success"
               when "INSERTION"
                  @task.data = Algorithms.insertion(@task.data)
                  @task.message = msgformatter(_start_sw, @task)   
                  @task.status = "success" 
               when "SELECTION"
                  @task.data = Algorithms.selection(@task.data)
                  @task.message = msgformatter(_start_sw, @task)   
                  @task.status = "success"                 
               else 
                  @task.message = "Unsupported action type, try NATIVE"
                  @task.status = "error"
               end  
            end 
            render :json => @task

         end #  create

         def msgformatter(_start, _task)
            _msg = "#{_task.action} #{(Time.now - _start).to_s} secs "
            _msg += ": #{_task.data.length.to_s} elements" 
         end

      end
   end
end
