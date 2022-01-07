
# Many-objective Container Scheduling

Many-objective Container Scheduling

## How to Install

This project is built based on basically two technologies described as follows:
* Python
* Angular 


At this point, we have to create a swarm where one of the machine is a manager and others are workers.
First, connect to the manager using ssh, Then, to create the swarm, you have first to get the IP address of your manager using <strong> "ifconfig" </strong> and <strong> "ip addr" </strong> and then run the following command:
```
$ docker swarm init --advertise-addr ip-adress
```
To add workers to this swarm, please run the command provided in the output on each machine you want to add after connecting to it. (In our case we want to add 2 workers)

Next, you can check the swarm members using:
```
$ docker node ls
```

Now we have to install some services for Docker Swarm monitoring in the manager machine (to expose Docker engine and container metrics in our project)

<p> Services :</p> 

* prometheus (metrics database) `http://<swarm-manager-ip>:9090`
* node-exporter (host metrics collector)
* cAdvisor (containers metrics collector)

    
## Install
```bash
$ git clone https://github.com/anwarghammam/docker-swarm-monitoring-arm64
$ cd docker-swarm-monitoring-arm64/
$ docker stack deploy --compose-file docker-compose.yml p
```

you can check the containers running in every machine using: 

```
docker ps
```

For every machine we will have a node-exporter and a cadvisor containers running since these containers are golabl, it means that they have to run in every node in the cluster to extract the needed metrics. However, only one prometheus in the manager (we need one instance for collecting data from both nodes)

## Using an example of a docker project

Now, we will create a docker project on the cluster and run containers using a docker-compose file that I created with 50 containers.
First, you will find this docker-compose file in 'many-objective-container-scheduling-main/source-code/scheduling-container-in-python/Constrained Approach/DockerComposeFiles/docker-compose.yml'
After you have to access the manager node using ssh, create the file and then deploy it. Please follow these following instructions:
```bash

$ vi docker-compose.yml (to create the file)
$ copy the content of the docker-compose file in this new created file and save it
$ docker stack deploy --compose-file docker-compose.yml p
```
<strong> PS: you can always check the services you have on your cluster from the manager node using: </strong>

```bash

$ docker service ls

```
<strong> Or the containers that are allocated to a specific node using: </strong>

```bash

$ docker ps

```

Once the environment and the containers are ready, we will enable our backend API that runs the scheduler and collects the data needed for the algorithm and run our dashboard

## BackEnd

<br> </br>
First, you need to run the backend (in the "scheduling-container-in-python" repository). Please go to you Anaconda Prompt (Anaconda needs to be installed on your host so you can install all needed dependencies for the project) and run the <strong> API.py </strong> file using the following command:
<br> </br>
```bash

$ python3 API.py
```

It will run our Api !
<br></br>
And now everything is ready! you can test the demo in the dashboard.


## DASHBOARD
<br>
Before running the app, there are some changes that you have to do since you are using your own docker machines.
<br> </br>
Please go to <strong> src/app/home/chart.js </strong> and replace the variable <strong> url </strong> with "http://your-manager-ip:9090".
 <br> </br>   
Also, please go to <strong> src/app/api.service.ts </strong> and replace the variable <strong> url </strong> with "http://your_manager-ip:9090" 

 <br/><br/>
 
 this changes has to be autoamtically coded from our side, but because of deadlines, we modify the values manually. For sure, we can do it later.
Now, open a terminal on the dashboard project and run the following command:

```bash
$ npm install // To install the dependecnies
$ ng serve   // to run the app
```
Please access on your browser http://localhost:4200. If everything is working well, you are going to see the following webpage.

<div align="center">
    <kbd>
        <img src="https://github.com/anwarghammam/CIS580/blob/main/web3%20(1).png"/>
    </kbd>
    <br/><br/>
</div>
<br> </br>

Now, everything is ready to go!!

## Useful Commands

Deploy a stack on Docker Swarm. You need to use a docker compose file to this end

```console
docker stack deploy --compose-file docker-compose.yml grocery
```

Access a node:

```console
docker-machine.exe ssh "manager"
```
List all nodes

```console
docker node ls
```

Install Docker Swarm

```console
docker swarm init --advertise-addr <Manager's IP>
```

Get the manager’s ip

```console
docker-machine.exe ip manager
```

Create the nodes

```console
docker-machine.exe create --virtualbox-no-vtx-check "manager"
```


## Contribute

Contributions to the this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.

## Authors

* **Anwar Ghammam** 


