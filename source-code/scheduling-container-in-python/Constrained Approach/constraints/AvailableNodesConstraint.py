#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 21:32:14 2021

@author: anwar
"""

class AvailableNodesConstraint :
    
    
    def evaluate(self,instance,solution):
        active_nodes=instance.active_nodes()
        invalids=0
        
        for i in solution.variables:
            if (i!=-1):
                if (i not in active_nodes):
                    invalids=invalids+1
                
        return invalids        
            
            
        
    
    