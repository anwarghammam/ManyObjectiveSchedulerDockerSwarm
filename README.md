
# Many-objective Container Scheduling

Many-objective Container Scheduling

## How to Install

This project is built based on basically two technologies described as follows:
* Python (prepare your python environment)
* Angular (In your environment, you have to install npm, nodejs, and angular cli)


Also, it is based on 3 docker machines so we will be using a VMware to create them , thus please run the following instructions:

## for Ubuntu 

```bash
$ sudo apt-get install virtualbox
$ curl -L https://github.com/docker/machine/releases/download/v0.16.0/docker-machine-`uname -s`-`uname -m` >/tmp/docker-machine &&
chmod +x /tmp/docker-machine && sudo cp /tmp/docker-machine /usr/local/bin/docker-machine

```
## for Windows
If you have not yet installed Docker for Windows, please see this link https://docs.docker.com/docker-for-windows/install/ for an explanation.
To Create machines locally using VirtualBox https://www.virtualbox.org/. This driver requires VirtualBox 5+ to be installed on your host. Using VirtualBox 4.3+ should work but will give you a warning. Older versions will refuse to work. 

Now, you are ready to create a docker machine, please run the following command on your cmd:
```
docker-machine create --driver virtualbox "the machine's name" 
```
Please make sure to give the following names to the created machines : "manager" , "worker1", "worker2" since we used them in our code.
<br> </br>
You can verify the creation of the machines by running:
```
$ docker-machine ls
```
At this point, we consider that you installed virtual box, and create the virtual machines, we have to create a swarm where one of the machine is a manager and others are workers.
First, connect to the manager using ssh, Then, to create the swarm, you have first to get the IP address of your manager using <strong> "ifconfig" </strong> and <strong> "ip addr" </strong> and then run the following command:
```
$ docker swarm init --advertise-addr ip-adress
```
To add workers to this swarm, please run the command provided in the output on each machine you want to add after connecting to it. (In our case we want to add 2 workers)

Next, you can check the swarm members using:
```
$ docker node ls
```
To monitor the nodes and containers metrics (eg: the distributions of the containers per nodes, the number fo services, the resources conmption in every node consumed by every vontainer etc..), we used open sources tools that helped us to parse the cluster in real time and update the values in our dashborad every s seconds.

<p> Services :</p> 

* prometheus (metrics database) `http://<swarm-manager-ip>:9090`
* node-exporter (host metrics collector)
* cAdvisor (containers metrics collector)

Now we have to install some services for Docker Swarm monitoring in the manager machine (to expose Docker engine and container metrics in our project)

<p> Services :</p> 

* prometheus (metrics database) `http://<swarm-manager-ip>:9090`: is a leading open-source monitoring system and a time series database. It provides a functional query language called PromQL (Prometheus Query Language) that lets the user select and aggregate time series data in real time that can be shown after as a graph, consumed by our dashborad via the HTTP API.
* node-exporter : is a node metrics collector designed to monitor the host system  by exposing a wide variety of hardware and kernel-related metrics.
* cAdvisor :is a container's metrics collector that provides container users an understanding of the resource usage and performance characteristics of their running containers. It is a running daemon that collects, aggregates, processes, and exports information about running containers. 

## Docker Swarm Monitoring Architecture
In order to collect metrics from swarm nodes, we need to deploy the node-exporter and the cAdvisor on each node. All we need is an automated way for Prometheus to reach these instances so it can "scrape" them to collect nodes and containers metrics from them.

<div align="center">
    <kbd>
        <img src="https://github.com/anwarghammam/many-objective-container-scheduling-main/blob/main/Screen%20Shot%202022-02-14%20at%201.44.55%20PM.png"/>
    </kbd>
    <br/><br/>
</div>
<br> </br>

We have for every node of our cluster a Node-Exporter and a cAdvisor instance, but just one Prometheus instance in our manager to collect the data by scraping its targets (cadvisor and node-exporter). After extracting all metrics, we created queries using Promql, to consume the necessary data we want to show in our dashboard via its HTTP API.
    
## Install
```bash
$ git clone https://github.com/anwarghammam/Monitoring-Docker-Swarm
$ cd Monitoring-Docker-Swarm/
$ docker stack deploy --compose-file docker-compose.yml p
```

you can check the containers running in every machine using: 

```
docker ps
```

We have for every node of our cluster a Node-Exporter and a cAdvisor instance, but just one Prometheus instance in our manager to collect the data by scraping its targets (cadvisor and node-exporter). After extracting all metrics, we created queries using Promql, to consume the necessary data we want to show in our dashboard via its HTTP API.

## running a docker project (containers)

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

Once the docker swarm is ready, the containers are running and the services to monitor the containers in real time is ready, we will now run our backend API that  collects the data needed for the sceduler from promtheus and using docker CLI, and run the algo to reallocated n=containers when needed.

## BackEnd

<br> </br>
Just one change need to be done:
First go to file extract_data.py in source-code/scheduling-container-in-python/ConstrainedApproach/extract_data.py, and change the manager name in line 30 with your manager name. <img src="Screen Shot 2022-02-14 at 2.05.54 PM.png"/>
Now, you need to run the backend (in the "scheduling-container-in-python" repository). Please go to you Anaconda Prompt (Anaconda needs to be installed on your host so you can install all needed dependencies for the project) and run the <strong> API.py </strong> file using the following command:
<br> </br>
```bash

$ python3 API.py
```

It will run our Api !
<br></br>
And now everything is ready! you can test the demo in the dashboard.


## DASHBOARD
<br>
Before running the app, there is one change that you have to do, since you are using your own docker machines.
<br> </br>
Please go to <strong>source-code/DASHBOARD/src/api.service.ts</strong> and replace the variable <strong> url </strong> with "http://manager-ip-address:9090".
 <br> </br>   
 
 this changes has to be autoamtically coded from our side, but because of deadlines, we modify the values manually. For sure, we can do it later.
Now, open a terminal on the dashboard project and run the following command:

```bash
$ npm install // To install the dependecnies (npm has to be already installed in your environment)
$ ng serve or npm start   // to run the app
```
By default, the app will be open bia port 4200, we can change it by running ng serve -p "port number".

once the app is running, Please access on your browser http://localhost:4200. If everything is working well, you are going to see the dashboard we see everytime.

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


