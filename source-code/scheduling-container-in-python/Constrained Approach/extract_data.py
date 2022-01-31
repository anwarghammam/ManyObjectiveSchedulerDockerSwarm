# -*- coding: utf-8 -*-
"""
Created on Sun Aug 30 13:11:51 2020

@author: User
"""

import subprocess
import yaml
import json
all1={}


#NUMBER OF NODES BY CLUSTER


class Data:


    def get_nodes(self):

        machines=[]
        machines_ids=[]
        roles=[]
        status=[]
        activated=[]
        with  open(r"./test3.txt",'w') as file :


            cmd = ('docker-machine ssh manager docker node ls').split()
            #cmd = (' ssh pi@node-01 docker node ls').split()

            p = subprocess.Popen(cmd,stdout=file)
            output, errors = p.communicate()
            


        with open(r"./test3.txt",'r') as file:


            for line in file:
                if (line.find("*")!=-1):
                    line=line.replace("*",'')
                    
                    roles.append("manager")
                else:
                    roles.append('worker')
                groupe=line.split()
                machines.append(groupe[1])
                machines_ids.append(groupe[0])
                status.append(groupe[2])

        print(machines)
        del machines[0]
        del machines_ids[0]
        del roles[0]
        del status[0]
        for st in status :
            if str(st)=="Ready":
                activated.append('true')
            else:
                activated.append('false')
        return machines,machines_ids,roles,activated
    # def get_nodes_Id(self):
    #     machines=self.get_nodes()
    #     machines_ids=[]
    #     roles=[]
    #     with open(r"./test3.txt",'r') as file:


    #         for line in file:

    #             line=line.replace("*",'')
    #             groupe=line.split()
    #             machines_ids.append(groupe[0])

    #     print(machines_ids)
    #     del machines_ids[0]
    #     return machines_ids

    def get_data(self,machines):
        
        containers=[]
        initial_state=[]
        images=[]
        

        for i,machine in enumerate(machines) :
            containers1=[]
            images1=[]
        #please change this path with the right one for you
            with  open(r"./test3.txt",'w') as file :
                
                cmd = ('docker-machine ssh '+str(machine)+' docker ps ').split()
                #cmd = ('ssh pi@'+str(machine)+' docker ps ').split()

                p = subprocess.Popen(cmd,stdout=file)
                output, errors = p.communicate()
            with open(r"./test3.txt",'r') as file:

                for line in file:

                    groupe=line.split()

                    containers1.append(groupe[-1])
                    images1.append(groupe[1])

            containers1=containers1[1:]
            images1=images1[1:]


            if( 'carlosedp/rpi-cadvisor:latest' in images1):
                del containers1[images1.index('carlosedp/rpi-cadvisor:latest')]
                del images1[images1.index('carlosedp/rpi-cadvisor:latest')]
            if( 'anwargh/grafana:vlast' in images1):
                del containers1[images1.index('anwargh/grafana:vlast')]
                del images1[images1.index('anwargh/grafana:vlast')]
            if( 'jmb12686/node-exporter:latest' in images1):
                del containers1[images1.index('jmb12686/node-exporter:latest')]
                del images1[images1.index('jmb12686/node-exporter:latest')]
            if( 'prom/alertmanager:latest' in images1):
                del containers1[images1.index('prom/alertmanager:latest')]
                del images1[images1.index('prom/alertmanager:latest')]

            if( 'anwargh/prometheus:arch64' in images1):
                del containers1[images1.index('anwargh/prometheus:arch64')]
                del images1[images1.index('anwargh/prometheus:arch64')]

            if( 'anwargh/prometheus:arch32' in images1):
                del containers1[images1.index('anwargh/prometheus:arch32')]
                del images1[images1.index('anwargh/prometheus:arch32')]



            for container in containers1:

                containers.append(container)
                initial_state.append(i)

            for img in images1:

                images.append(img)


        return images,containers,initial_state,machines




    def updateDockerCompose(self,containers,images,state,machines,file):
        services_to_shutdown=[]
        eliminate=[]
        master=''

        for node in machines:
            if node.Status=="Leader":
                master=node.name
        with open(r'DockerComposeFiles/docker-compose.yml') as file2:

            compose = yaml.load(file2,Loader=yaml.FullLoader)

        keys=list(compose['services'].keys())
        print (keys)
        print
        
        for i in range(len(state)):
            if (state[i]!=-1):
                print(images[i]," ",containers[i].name)
        print()
        print()
        print()
        print() 
        
        for i,con  in enumerate(images) :

            for j,dict in enumerate(compose['services']):
                #print(keys[j])
                

                if (str(str(keys[j])+'.') in str(containers[i].name)):
                    print('fel condition')
                    print(str(compose['services'][dict]['image']),con,str(keys[j])+'.',str(containers[i].name))
                    
                    
                    if (state[i]!=-1):
                        
                       # print(dict)


                        name='node.hostname == '+str(machines[state[i]].name)
                        compose['services'][dict].update({'deploy': {'placement': {'constraints':  [ name ]}}})

                    else:
                        print('-1')
                        print(str(compose['services'][dict]['image']),con,str(keys[j])+'.',str(containers[i].name))
                        
                        eliminate.append(dict)
                        services_to_shutdown.append('p_'+str(keys[j]))

        print(services_to_shutdown)  

        print(eliminate)           
        for dict in eliminate:
            
            del(compose['services'][dict])
            
        with open(file,'w') as file1:

            yaml.dump(compose,file1)

        # cmd = ("scp -r " +str(file) + " pi@"+str(machines[0].name)+":. ").split()

        # p = subprocess.Popen(cmd)
        # output, errors = p.communicate()

        #cmd = ('ssh pi@'+str(machines[0].name)+' docker stack deploy -c updated-docker-compose.yml p ').split()

        cmd = ("docker-machine scp localhost:"+str(file)+"  docker@"+str(master)+":. ").split()

        p = subprocess.Popen(cmd)
        output, errors = p.communicate()

        cmd = ('docker-machine ssh '+str(master)+' docker stack deploy -c updated-docker-compose.yml p ').split()

        p = subprocess.Popen(cmd)
        output, errors = p.communicate()

        return (services_to_shutdown)



        # cmd = ('ssh root@manager docker stack deploy --compose-file docker-compose1.yml p1 ').split()

        # p = subprocess.Popen(cmd)
        # output, errors = p.communicate()

        return (services_to_shutdown)



    def get_dependencies(self,images,containers):

        all_dependencies=[]
    #images,containers,initial_state,machines=get_data()
        # cmd = ('scp root@manager:docker-compose.yml /home/anwar/Desktop').split()

        # p = subprocess.Popen(cmd)
        # output, errors = p.communicate()
        with open(r'DockerComposeFiles/docker-compose.yml') as file:


            compose = yaml.load(file,Loader=yaml.FullLoader)

            for dict in compose['services']:
                key=[]

                print(compose['services'][dict].get('depends_on'))
                if((compose['services'][dict].get('depends_on') is not None)):


                    key=[]
                    for k,con in enumerate(containers):

                        if (str(dict) in str(con)) :
                            key.append(k)


                    dependencies=compose['services'][dict]['depends_on']
                # print(dependencies)
                    images1=[]
                    for dep in dependencies:
                        images1.append(compose['services'][dep]['image'])
                # print(images)
                    for dep in images1:

                        for j,con in enumerate(images):

                            for k in key:

                                if (str(dep) in str(con)) and ((k,j) not in all_dependencies):
                                    all_dependencies.append((k,j))

                if((compose['services'][dict].get('links') is not None)):


                    key=[]
                    for k,con in enumerate(containers):

                        if (str(dict) in str(con)) :
                            key.append(k)


                    dependencies=compose['services'][dict]['links']
                # print(dependencies)
                    images1=[]
                    for dep in dependencies:
                        images1.append(compose['services'][dep]['image'])
                # print(images)
                    for dep in images1:

                        for j,con in enumerate(images):

                            for k in key:

                                if (str(dep) in str(con)) and ((k,j) not in all_dependencies):
                                    all_dependencies.append((k,j))



                # if((compose['services'][dict].get('links') is not None)):
                #     image=compose['services'][dict]['image']
                #     for k,con in enumerate(containers):
                #         if (str(image) in str(con)):
                #             key=k

                #     dependencies=compose['services'][dict]['links']
                #     images=[]
                #     for dep in dependencies:
                #         images.append(compose['services'][dep]['image'])
                #     for dep in images:
                #         for j,con in enumerate(containers):
                #             if (str(dep) in str(con)) and  ((key,j) not in all_dependencies):
                #                 all_dependencies.append((key,j))

        return (all_dependencies)


    def get_constraints(self,machines,roles,images):


        with open(r'DockerComposeFiles/docker-compose.yml') as file:
            compose = yaml.load(file,Loader=yaml.FullLoader)
            constraints=[]
            for dict in compose['services']:

                constraints.append("chey")


            for dict in compose['services']:

                if(compose['services'][dict].get('image') in images):

                    container_index=images.index(compose['services'][dict].get('image'))

                else:

                    image_name=compose['services'][dict].get('image')+":latest"
                    container_index=images.index(image_name)

                if((compose['services'][dict].get('deploy') is  None)):
                    print(container_index)
                    constraints[container_index]='NA'



                else:


                    constraint=compose['services'][dict]['deploy']['placement']['constraints'][0]


                    if ("node.hostname" in constraint):
                        index=constraint.index('==')

                        name=constraint[index+3:]

                        mach=machines.index(name)


                        constraints[container_index]=mach

                    if ("node.role" in constraint):
                        tuple=[]
                        if("manager" in constraint):

                            for i,rol in enumerate(roles):
                                if (rol=="manager"):
                                    tuple.append(i)

                            constraints[container_index]=tuple
                        elif ("worker" in constraint):

                            for i,rol in enumerate(roles):
                                if (rol=="worker"):
                                    tuple.append(i)


                            constraints[container_index]=tuple


        return(constraints)


    def createjson(self,machines,machines_IDS,containers,initial_state,images,dependencies,constraints,roles,activated):
        

        with open(r'instanceExamples/data.json', mode='w', encoding='utf-8') as file:

            nodes=[]
            cons=[]
            dep=[]
            entry = {}
            for i,n in enumerate(machines):
                if roles[i]=="manager":

                    one_node = {'id':i,'name': n,"Manager Status": "Leader","cluster_id":machines_IDS[i],"activated": activated[i], "max_power_consumption": 1030, "Maxmem":0}
                    nodes.append(one_node)
                else:
                    one_node = {'id':i,'name': n,"Manager Status": "worker","cluster_id":machines_IDS[i],"activated": activated[i], "max_power_consumption": 1030, "Maxmem":0}
                    nodes.append(one_node)
                    
            for i,n in enumerate(containers):

                one_container ={'id':i,'name': n,'image':images[i],'dependencies':[],'placements':[],"priority": 4,"average_power_consumption_per_minute": 30, "power_consumption": 50, "cpu_usage": 5.14109452666673405, "mem_usage": 10.13}
                print(one_container['dependencies'])
                cons.append(one_container)

            for i,dep in enumerate(dependencies):
            #print(cons[dep[0]].dependencies)

                cons[dep[0]]['dependencies'].append(dep[1])


            entry['nodes']=nodes
            entry['currentState']=initial_state
            entry['containers']=cons
            entry['objectives']=[{"0": 0.25}, {"1": 0.25}, {"6": 0.25}, {"7": 0.25}, {"8": 1}]
            json.dump(entry, file)
        return('done')

def GetAllData():
    data=Data()
    machines,machines_ids,roles,activated=data.get_nodes()
    images,containers,initial_state,machines=data.get_data(machines)
    dependencies=data.get_dependencies(images,containers)
    data.createjson(machines,machines_ids,containers,initial_state,images,dependencies,[[] for i in range(len(containers))],roles,activated)
    

