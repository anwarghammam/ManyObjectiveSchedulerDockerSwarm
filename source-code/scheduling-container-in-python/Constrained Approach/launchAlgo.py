# -*- coding: utf-8 -*-
"""
Created on Thu Sep  3 11:45:07 2020

@author: User
"""

from jmetal.algorithm.multiobjective.nsgaiii import UniformReferenceDirectionFactory
from Problem.NSGAIII1 import NSGAIII
from jmetal.operator.crossover import IntegerSBXCrossover
from jmetal.operator.mutation import IntegerPolynomialMutation
from Problem.problem import ReschedulingProblem
from jmetal.util.termination_criterion import StoppingByEvaluations
from jmetal.util.solution import get_non_dominated_solutions, print_function_values_to_file,print_variables_to_file,print_function_values_to_screen,print_variables_to_screen
from jmetal.lab.visualization import Plot
from jmetal.core.quality_indicator import QualityIndicator,FitnessValue,HyperVolume,InvertedGenerationalDistance
from jmetal.util.observer import  ProgressBarObserver
import numpy as np
from instance.Instance import Instance
from extract_data import Data
import subprocess
import time
from Problem.Instance_from_Json import createInstance



solutions=[]



all2=np.zeros([1,5])
all3=[]







max_evaluations=2500




 

def transform(instance):
   
    
    problem=ReschedulingProblem(instance)
    algorithm1= NSGAIII(
    problem=problem,
    population_size=200,
    reference_directions=UniformReferenceDirectionFactory(problem.number_of_objectives,n_partitions=problem.number_of_objectives),
    mutation=IntegerPolynomialMutation(probability=0.05),
    crossover=IntegerSBXCrossover(probability=0.9),
    termination_criterion=StoppingByEvaluations(max_evaluations=max_evaluations)
    )

    print()
    instance.print_info('nodes')
    print()


    print()

    print()
    instance.print_info('currentstate')


    print()



    print()
    instance.print_info('constraints')


    print()

    print()
    instance.print_info('objectives')


    print()

    print()
    instance.print_info('dependencies')
    print()
    algorithm1.observable.register(ProgressBarObserver(max=max_evaluations))  
    print()
    print()
    print("Algorithm running....")
    print()
    print()
    start_time = time.time()
    algorithm1.run()
    
    
    print()
       
    front = get_non_dominated_solutions(algorithm1.get_result())
    # violated=0
    # for sol in front:
    #     cons=[]
    #     for i,constraint in enumerate(problem.constraints) :
            
    #         cons.append(constraint.evaluate(instance,sol))
         
        
    #     total_invalids=0
    #     for i,con in enumerate(cons):
            
    #             total_invalids=total_invalids
                
    #     if (total_invalids!=0):
    #         violated=violated+1
    print()
    print()            
    #print("violated solutions are equal to ", violated/len(front) ,"%  for ", len(front))    

    front_sol1=[]
    resultat=[]
    weights=[]
    for ob in instance.objectives:
    
        for key,value in enumerate((ob)):
            weights.append(ob[value])
        
    for solution in front:
        res=0
        for i,ob in enumerate(solution.objectives):
            
            res=weights[i]*ob
      
        resultat.append(res)
    
        front_sol1.append(solution.objectives)
    best_sol=resultat.index(min(resultat))  
    candidate=(front[best_sol])    
    
    print()
    print()
    print("the candidate solution is :")   
    print()
   
    print(candidate)
        
    
    #print_function_values_to_file(front,r"/home/anwar/Desktop/NSGAIII/test/&-"+str(max_evaluations)+".txt")
    # print_variables_to_file(front, r"/home/anwar/Desktop/NSGAIII/pareto-front-approach1.txt")
    # #print("functions value of the front :")
    # print()
    # print()
    # print(f'Computing time: ${algorithm1.total_computing_time}')
    #print_function_values_to_screen(front)
    print()
    #print("variables value of the front:")
    print()
    print()
    #cmd = ('docker-machine ssh s1 docker stack deploy --compose-file test.yml p1 ').split()

    #p = subprocess.Popen(cmd)
    #output, errors = p.communicate() 
    
        #print_variables_to_screen(front)


#    plot_front = Plot(title='Pareto front approximation', axis_labels=['nb_nodes','max_containers/node','cohesion','coupling','changes'])
#    plot_front.plot(front, label='NSGAIII-MOOC', filename=r"C:\Users\User\Desktop\MOOC\NSGAIII\MOOC", format='png')
    
   
    # for i in all3:
    #     print(i.variables)
    #     print("objectives")
    # 
        
    # state=all3[0].variables
    # candidate_functions=all3[0].objectives
    # print("candidate solution : ")
    # print()
    
    # print(state)
    # print(candidate_functions)

  
    
    Data().updateDockerCompose(instance.containers,instance.images,instance.currentState,instance.nodes,'DockerComposeFiles/initial-docker-compose.yml')
    
    services_to_shutdown=Data().updateDockerCompose(instance.containers,instance.images,candidate.variables,instance.nodes,'DockerComposeFiles/updated-docker-compose.yml')
    
    for i,node in enumerate(instance.nodes):
        if node.Status=="Leader":
            master=node.name
            master_id=i
    for service in services_to_shutdown:
        #print("docker-machine ssh manager docker service rm" +str(service))
        cmd = ("docker-machine ssh "+str(master)+" docker service rm "  +str(service)).split()

        p = subprocess.Popen(cmd)
        output, errors = p.communicate() 
    print("--- %s seconds ---" % (time.time() - start_time))
    print(f'Computing time: ${algorithm1.total_computing_time}')
    times=[]
    times.append(time.time() - start_time)
    times.append(algorithm1.total_computing_time)
    return algorithm1.total_computing_time
# #-----------------------------------------------------------------------------------------------------------------------------------------------
# instance=Instance()
# Instance=createInstance(instance)




# transform(Instance)
