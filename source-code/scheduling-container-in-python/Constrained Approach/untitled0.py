#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Jul 19 12:48:58 2021

@author: asus
"""
import yaml
images=['rabbitmq','rabbitmq','mongo','mongo','grafana/grafana','grafana/grafana']


    
with open('DockerComposeFiles/docker-compose.yml') as file2:
  
    compose = yaml.load(file2,Loader=yaml.FullLoader)
           
    for j,dict in enumerate(compose['services']):
        
        print(dict)
            
 