#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 16:57:14 2021

@author: anwar
"""

class NumberOfNodes:
    
    def evaluate(self,Instance,solution):
        
        nb_selected_nodes= set(solution.variables)
        if (-1 in nb_selected_nodes):
            
            nb_selected_nodes.remove(-1)
        

        return (len(nb_selected_nodes)/len(Instance.nodes))
