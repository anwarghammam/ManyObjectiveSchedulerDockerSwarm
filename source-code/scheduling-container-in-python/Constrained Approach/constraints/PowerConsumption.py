
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 13:50:38 2021

@author: anwar
"""

class PowerConsumption():
    
    
    def evaluate(self,Instance,solution):
        
        total_power_consumption=[0 for i in range(len(Instance.nodes))]
        #print(solution.variables)
        #print(total_power_consumption)
        for i,var in enumerate(solution.variables):
           
            if (var!=-1):
               
                total_power_consumption[var]=total_power_consumption[var]+Instance.find_container_by_id(i).average_power_consumption_per_minute
      
            
        invalids=0
        
        for i,p in enumerate(total_power_consumption):
            
            if (Instance.find_node_by_id(i).maxPowerconsumption<p):
                invalids=invalids+1
        
                
        return(invalids)
            
    
    
    