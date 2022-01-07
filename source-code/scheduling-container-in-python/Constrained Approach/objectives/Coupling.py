#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 17:19:08 2021

@author: anwar
"""

class Coupling :
    
    def evaluate(self,Instance,solution):
        
        inter_dependencies=0
       
        for dep in Instance.dependencies :
            
            
            if(solution.variables[dep[0]]!=solution.variables[dep[1]]):
                
                inter_dependencies=inter_dependencies+1
            
                
        coupling=inter_dependencies/len(Instance.dependencies)
        
       
        
        return  coupling
