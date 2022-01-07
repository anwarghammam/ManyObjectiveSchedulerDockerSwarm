#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Mar 19 15:12:01 2021

@author: anwar
"""

# -*- coding: utf-8 -*-
"""
Created on Thu Sep  3 12:13:49 2020

@author: User
"""

import random
from abc import ABC
import sys
from jmetal.core.problem import IntegerProblem
from jmetal.core.solution import IntegerSolution
import collections
import math
from Problem.Instance_from_Json import createInstance
from constraints.AvailableNodesConstraint import AvailableNodesConstraint
from constraints.PlacementConstraints import PlacementConstraints
from constraints.PowerConsumption import PowerConsumption
from constraints.CpuConstraints import CpuConsumption
from constraints.MemoryConstraints import MemoryConsumption
from constraints.SatisfyDependencies import SatisfyDependencies
from objectives.NumberOfNodes import NumberOfNodes
from objectives.AverageNbContainersPerNode import AverageNbContainersPerNode
from objectives.Coupling import Coupling 
from objectives.Cohesion import Cohesion
from objectives.NumberOfChanges import  NumberOfChanges
from objectives.PowerConsumption import EvalPowerConsumption
from objectives.CpuConsumption import EvalCpuConsumption
from objectives.MemConsumption import EvalMemConsumption
from objectives.Priority import Priority

All_Objectives=[NumberOfNodes(),
                AverageNbContainersPerNode(),
                Priority(),       
                Cohesion(), 
            EvalPowerConsumption(),
             NumberOfChanges(),
            
              EvalCpuConsumption(),
              EvalMemConsumption()]


objs=[]
weights=[]
class MonoProblem(IntegerProblem,ABC):

    def __init__(self,Instance):
     
        super(MonoProblem, self).__init__()
        
        self.Instance=Instance
        self.dependencies=Instance.get_alldependencies()
        self.initial_state=Instance.currentState
        self.number_of_variables = len(Instance.containers)
        
        self.objectives=[]
        
        for ob in Instance.objectives:
            
            for key,value in enumerate((ob)):
                print(value)
                objs.append(value)
               
                weights.append(ob[value])
                
        for ob in Instance.objectives[:-1]:
            
            for key,value in enumerate((ob)):
                
                self.objectives.append(All_Objectives[int(value)])
            
        self.constraints=[SatisfyDependencies(),
                          PowerConsumption(),
                          MemoryConsumption(),
                          CpuConsumption(),
                          PlacementConstraints(),
                          AvailableNodesConstraint()
                          ]
        
        self.number_of_constraints = len(self.constraints)    
    
        
        
        #self.constraints=[SatisfyDependencies(),
                          #PowerConsumption(),
                       #   MemoryConsumption(),
                       #   CpuConsumption(),
                       #   PlacementConstraints(),
                      #    AvailableNodesConstraint()
                       #   ]
        
        #self.number_of_constraints = len(self.constraints)
        self.number_of_objectives = 1
        self.obj_directions = [self.MINIMIZE for i in range(self.number_of_objectives)]
        #self.obj_labels = ['nb_nodes','average_nb_containers_per_node','cohesion','coupling','nb_changes','priority']
        if (weights[-1]==1):
            
            self.lower_bound = self.number_of_variables * [-1]
        else:
            self.lower_bound = self.number_of_variables * [0]
        self.upper_bound = self.number_of_variables * [len(Instance.nodes)-1]
        
        
        
    def create_solution(self) -> IntegerSolution:
        new_solution = IntegerSolution(
            self.lower_bound,
            self.upper_bound,
            self.number_of_objectives,
            self.number_of_constraints)
        
        for i in range(self.number_of_variables):
            valid_nodes=self.Instance.constraints[i]
            new_solution.variables[i]=random.choice(valid_nodes)
       
        return new_solution   
     
        
    def evaluate(self, solution: IntegerSolution) -> IntegerSolution:
        
        objectives=[]
        for i,obj in enumerate(self.objectives):
            
            val=obj.evaluate(self.Instance,solution)
            objectives.append(val)
            
        for cons in enumerate(self.constraints):
           
            val=cons[1].evaluate(self.Instance,solution)
            solution.constraints[cons[0]]=val
          
        total_invalids=0
        for i,con in enumerate(solution.constraints):
            
            total_invalids=total_invalids+con
                
        if (total_invalids!=0):
            for i in range(len(solution.objectives)):
                solution.objectives[0]=100000
        else:
            
            all=0
            for i,obj in enumerate(objectives):
            
                all+=obj
            solution.objectives[0]=all/len(objectives)
       
        print(solution)
        return solution
    
    def get_name(self):
        return('MonoProblem')
    
       
        
        
        
   
