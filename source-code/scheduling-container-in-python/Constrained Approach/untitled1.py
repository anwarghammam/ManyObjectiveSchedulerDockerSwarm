#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Oct 12 13:00:41 2021

@author: anwar
"""


import subprocess


machines=[]
with  open(r"./test3.txt",'w') as file :
    
    cmd ="docker-machine ssh manager docker node ls".split(';')

    p = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=file,shell=True)
    output, errors = p.communicate()
    print(output)
    print(errors)
    
    
# p = subprocess.Popen('docker-machine ls'.split(), stdout=subprocess.PIPE, stderr=subprocess.STDOUT,shell=True)
# for line in p.stdout:
    
#     print (line )  