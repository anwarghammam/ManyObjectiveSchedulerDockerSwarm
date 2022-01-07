#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import math
class EvalMemConsumption():
    
    
    def evaluate(self,Instance,solution):
        
        total_mem_consumption=[0 for i in range(len(Instance.nodes))]
        total_consumed_mem=0
        print(solution.variables)
        #print(total_power_consumption)
        for i,var in enumerate(solution.variables):
           
            if (var!=-1):
                print(var)
                print(Instance.find_container_by_id(i).cpu_usage)
                total_mem_consumption[var]=total_mem_consumption[var]+Instance.find_container_by_id(i).mem_usage
                total_consumed_mem+=Instance.find_container_by_id(i).mem_usage
        print(total_consumed_mem)
        for i,mem in enumerate(total_mem_consumption):
            total_mem_consumption[i]=total_mem_consumption[i]/total_consumed_mem
        
        average =sum(total_mem_consumption)/ len(total_mem_consumption)
        total=0
        for mem_per_node in total_mem_consumption:
            
            total+=(mem_per_node-average)*(mem_per_node-average)
    
        return(math.sqrt(total/len(total_mem_consumption)) )      
        
            
    
    
    