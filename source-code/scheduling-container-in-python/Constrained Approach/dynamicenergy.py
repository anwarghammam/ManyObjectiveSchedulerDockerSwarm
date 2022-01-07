#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Apr 28 14:12:45 2021

@author: anwar
"""

from datetime import datetime
from random import random
import json
from instance.Instance import Instance
from Problem.Instance_from_Json import createInstance

# datetime object containing current date and time



instance=Instance()
Instance=createInstance(instance)



import threading

    
with open(r'./energy.json', mode='w', encoding='utf-8') as file:
    entry={}
    containers=[]
    for con in instance.containers:
    
        con={'container':con.name,'energy_per_period':[]}
        containers.append(con)
    entry['containers']=containers
    json.dump(entry, file)
def generate_energy():
    values=[]
    date=datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for i,con in enumerate(instance.containers):
        print(con.MaxpowerConsumption)
        val=int(random()*con.MaxpowerConsumption)
        values.append(val)
        key={'x':date,'y':val}
        
        with open("./energy.json", "r") as jsonFile:
            
            data = json.load(jsonFile)
            data['containers'][i]['energy_per_period'].append(key)
        with open("./energy.json", "w") as jsonFile:
            json.dump(data, jsonFile)

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func,sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

def power_average():
    with open(r"./energy.json", "r") as jsonFile:
        
            
            data = json.load(jsonFile)
            with open(r"./instanceExamples/data.json", "r") as file:
                all_instance = json.load(file)
            for con in data['containers']:
                data_for_last_minute=con['energy_per_period'][-6:]
                sum=0
                average=0
                for d in data_for_last_minute:
                    sum+=d['y']
                average=sum/6
                print(average)
                for con1 in all_instance['containers']:
                    if (con1['name']==con['container']):
                            
                        con1['average_power_consumption_per_minute']=average
                        
            with open(r"./instanceExamples/data.json", "w") as file:
                
                json.dump(all_instance, file)
    

set_interval(generate_energy,10)
set_interval(power_average,15)