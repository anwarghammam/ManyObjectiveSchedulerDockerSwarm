#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 16:59:25 2021

@author: anwar
"""
import collections
import math

class AverageNbContainersPerNode():
    
    
    def evaluate(self,Instance,solution):
        
        
        occurences=[]
        total=0
       
        nb_variables= list(filter((-1).__ne__, solution.variables))
        for val in collections.Counter(nb_variables).values() :
            
            occurences.append(val/len(solution.variables))
        if (len(occurences)==0):
            return(0)
        else:    
            average =sum(occurences)/ len(occurences)
            
            for oc in occurences:
                total+=(oc-average)*(oc-average)
            
      
            return(math.sqrt(total/len(occurences)) )  
