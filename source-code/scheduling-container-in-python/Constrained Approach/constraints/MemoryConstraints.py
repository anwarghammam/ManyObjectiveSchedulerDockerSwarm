#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jul 12 10:46:37 2021

@author: asus
"""



# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 13:50:38 2021

@author: anwar
"""

class MemoryConsumption():
    
    
    def evaluate(self,Instance,solution):
        
        total_mem_consumption=[0 for i in range(len(Instance.nodes))]
        #print(solution.variables)
        #print(total_power_consumption)
        for i,var in enumerate(solution.variables):
           
            if (var!=-1):
               
                total_mem_consumption[var]=total_mem_consumption[var]+Instance.find_container_by_id(i).mem_usage
      
            
        invalids=0
        
        for i,p in enumerate(total_mem_consumption):
            
            if (Instance.find_node_by_id(i).maxMem<p):
                invalids=invalids+1
        
                
        return(invalids)
            
    
    
    