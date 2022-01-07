#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Apr 18 16:44:48 2021

@author: anwar
"""

class EvalPowerConsumption :
    
    
    def evaluate(self,Instance,solution):
        
        
        total_power_consumption=0
        power_consumption=0
        for con in Instance.containers:
            total_power_consumption+=con.average_power_consumption_per_minute
        for i,var in enumerate(solution.variables):
            if (var!=-1):
                power_consumption+=Instance.find_container_by_id(i).average_power_consumption_per_minute
        return (power_consumption/total_power_consumption)  
