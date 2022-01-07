#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 17:14:02 2021

@author: anwar
"""

class Cohesion :
    
    def evaluate(self,Instance,solution):
        
        intra_dependencies=0
       
        for dep in Instance.dependencies :
            
            
            if(solution.variables[dep[0]]==solution.variables[dep[1]]):
                
                intra_dependencies=intra_dependencies+1
            
                
        cohesion=1-(intra_dependencies/len(Instance.dependencies))
        
       
        
        return  cohesion
