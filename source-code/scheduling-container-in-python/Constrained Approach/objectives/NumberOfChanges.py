#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 16:49:35 2021

@author: anwar
"""

class NumberOfChanges():
    
    def evaluate(self,Instance,solution)   :
        changes=0
       
        for i in range(len(Instance.currentState)):
            if (Instance.currentState[i]!=solution.variables[i]):
                changes+=1
        changes=changes/len(solution.variables)        
        return(changes)
