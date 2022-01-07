#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 16:47:51 2021

@author: anwar
"""

class Priority():
    
    
    def evaluate(self,Instance,solution):  
        
        
        
        total_available_priorities=0
        total_priorities=0
        
        
        for i,con in enumerate(solution.variables):
            
            total_priorities=total_priorities+Instance.find_container_by_id(i).priority
            
            if (con!=-1):
                total_available_priorities=total_available_priorities+Instance.find_container_by_id(i).priority
                
        return (total_available_priorities/total_priorities)
