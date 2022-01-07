#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jul 18 13:03:20 2021

@author: asus
"""


#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 15:56:23 2021

@author: anwar
"""

import json




solution=[2, 0, 0, 0, 0, 2, 1, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 1, 0, 1, 1, 1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 0, 0, 1, 2, 0, 0, 2, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 1, 0, 0, 0, 2, 0, 2, 1]
def createInstance():
    
    total_cpu=[0,0,0]
    total_mem=[0,0,0]
       
    f = open(r"../instanceExamples/data.json")
   
    data = json.load(f)
    i=0
   
    for con in data['containers']:
        print(i)
        if (solution[i]!=-1):
            total_cpu[solution[i]]+=con['cpu_usage']
            total_mem[solution[i]]+=con['mem_usage']
        i=i+1
        
    print(total_cpu)
    print(total_mem)
     
     

# instance=Instance()
createInstance()
# objs=[]
# for ob in Instance.objectives:
#     for key,value in enumerate((ob)):
#         print(ob[value])
#         objs.append(value)
        
S= [2, 0, 0, 1, 0, 2, 0, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 0, 1, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0, 1, 1, 2, 1, 1, 2, 2, 1, 0, 1, 1, 0, 2, 2, 0, 2, 0, 0, 1, 1, 2, 0, 1, 2, 2, 0, 0, 2, 1, 0, 0, 2, 1, 1, 2, 2, 1, 0, 1, 0, 0, 2, 0, 2, 0, 2, 0, 0, 1, 0, 0, 1, 2, 2, 2, 0, 2, 2, 1, 2, 1, 2, 0, 2, 1, 0, 2, 1, 0]    
print(S[41])   
print(S[7])     
print(S[46])   
print(S[27])   
print(S[22])   
print(S[46])   
print(S[26])   
print(S[13])   