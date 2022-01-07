#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Apr 16 14:16:30 2021

@author: anwar
"""

class Node:
    def __init__(self,id,cluster_id,managerstatus,name,activated,maxPowerconsumption,maxMem):
        self.id =id
        self.cluster_id=cluster_id,
        self.Status=managerstatus
        self.name = name
        self.activated=activated
        self.maxPowerconsumption= maxPowerconsumption
        self.maxMem= maxMem
