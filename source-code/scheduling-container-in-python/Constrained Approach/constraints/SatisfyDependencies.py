#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 22:22:00 2021

@author: anwar
"""

class SatisfyDependencies():
    
    
    def evaluate(self,instance,solution):
        invalids=0
        
        for i,var in enumerate (solution.variables):
            if var==-1:
                dependents=self.getDependents(instance.get_alldependencies(),i)
                for dep in dependents:
                    if solution.variables[dep]!=-1:
                        invalids=invalids+1
                    
                        
        return invalids        
    def getDependents(self,dependencies,i):
        containers=[]
        
        for dep in dependencies:
            if dep[1]==i:
                containers.append(dep[0])
                
        return(containers)