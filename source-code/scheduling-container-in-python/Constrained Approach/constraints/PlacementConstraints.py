#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 21:31:45 2021

@author: anwar
"""

class PlacementConstraints():
    
    
    
    def evaluate(self,instance,solution):
        
        invalid=0
        for i in range(len(instance.constraints)):
            
            cons=instance.constraints[i]
            if(solution.variables[i] not in cons):
                invalid=invalid+1
                        
                
                        
        return(invalid)
    
    
        