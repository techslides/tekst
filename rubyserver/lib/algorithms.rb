module Algorithms

   def self.swap(arr, x, y)
   	  _temp = arr[x]
   	  arr[x] = arr[y]
   	  arr[y] = _temp
   	  return arr
   end	

   def self.insertion(arr) 
   	
      arr.each_index do |i|
      	j = i
         #for (j = i; j > 0; j--)
      	while j > 0 
            if (arr[j] < arr[j-1])
               swap(arr, j, j-1)
            else
               break
            end
            j -= 1
         end
      end

      return arr
   end 

   def self.selection(arr)
      arr_length = arr.length

      #for (var i = 0; i < N; i++) {
      arr.each_index do |i|
         min = i;
         #for (var j = i+1; j < N; j++) {
         j = i+1
         while j < arr_length
            if (arr[j] < arr[min])
               min = j;
            end
            j += 1   
         end
         swap(arr, i , min)      
      end

      return arr
   end 

end
