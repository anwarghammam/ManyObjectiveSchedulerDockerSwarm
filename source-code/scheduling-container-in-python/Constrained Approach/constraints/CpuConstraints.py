#!/usr/bin/env python3
# -*- coding: utf-8 -*-



# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 13:50:38 2021

@author: anwar
"""

class CpuConsumption():
    
    
    def evaluate(self,Instance,solution):
        
        total_cpu_consumption=[0 for i in range(len(Instance.nodes))]
        #print(solution.variables)
        #print(total_power_consumption)
        for i,var in enumerate(solution.variables):
           
            if (var!=-1):
               
                total_cpu_consumption[var]=total_cpu_consumption[var]+Instance.find_container_by_id(i).cpu_usage
      
            
        invalids=0
        
        for i,p in enumerate(total_cpu_consumption):
            
            if (100<p):
                invalids=invalids+1
        
                
        return(invalids)
            
    
    
    