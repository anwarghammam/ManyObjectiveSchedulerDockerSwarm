import json
  
# Opening JSON file
def json_data():
    f = open(r"./data.json")
    data = json.load(f)
    machines=[]
    activated=[]
    max_power_consumption_per_node=[]
    power_consumption_per_container=[]
    containers=[]
    constraints=[]
    dependencies=[]
    for i in data['nodes']:
        print(i['name'])
        machines.append(i['name'])
        max_power_consumption_per_node.append(i['max_power_consumption'])
        activated.append(i['activated'])
    for i in data['containers']:
   
        containers.append(i['name'])
        power_consumption_per_container.append(i['power_consumption'])
        if (i["placements"]!=[]):
            placements=i['placements']
            placements.append(-1)
            constraints.append(placements)
            
        else :
                constraints.append('NA')
        if (i["dependencies"]!=[]):  
            for dep in i["dependencies"]:
                key=(i["id"],dep)
                dependencies.append(key)
        
    print(containers)   
    print(constraints)    
    print(machines)
    print(activated)
    print(max_power_consumption_per_node)
    initial_state=data["currentState"]
    print(initial_state)
    print(dependencies)
    print(power_consumption_per_container)
    return containers,initial_state,machines,constraints,dependencies,activated,max_power_consumption_per_node,power_consumption_per_container


