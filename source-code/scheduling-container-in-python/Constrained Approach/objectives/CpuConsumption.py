#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jul 12 10:33:31 2021

@author: asus
"""



# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 13:50:38 2021

@author: anwar
"""
import math
class EvalCpuConsumption():
    
    
    def evaluate(self,Instance,solution):
        
        total_cpu_consumption_per_node=[0 for i in range(len(Instance.nodes))]
        total_consumed_cpu=0
       
        #print(total_power_consumption)
        
        for i,var in enumerate(solution.variables):
           
            if (var!=-1):
                print(var)
                print(Instance.find_container_by_id(i).cpu_usage)
                total_cpu_consumption_per_node[var]=total_cpu_consumption_per_node[var]+Instance.find_container_by_id(i).cpu_usage
                total_consumed_cpu+=Instance.find_container_by_id(i).cpu_usage
        print(total_consumed_cpu)
        for i,cpu in enumerate(total_cpu_consumption_per_node):
            
            total_cpu_consumption_per_node[i]=total_cpu_consumption_per_node[i]/total_consumed_cpu
        average =sum(total_cpu_consumption_per_node)/len(total_cpu_consumption_per_node)
        total=0
        for cpu_per_node in total_cpu_consumption_per_node:
            
            total+=(cpu_per_node-average)*(cpu_per_node-average)
    
        return(math.sqrt(total/len(total_cpu_consumption_per_node)))      
        
            
    
    
    