import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { interval, Subject } from 'rxjs';

import 'rxjs/Rx';
@Injectable({
  providedIn: 'root'
})

export class ApiService implements OnInit{
 url="http://192.168.99.111:9090/"
 all_current_data
 eliminate_services=['p_node-exporter','p_cadvisor','p_prometheus','p_grafana']
 public dataSubject = new Subject<number>();
  public dataState = this.dataSubject.asObservable();
  
 constructor(private http: HttpClient)  { 
  
 }
 
 ngOnInit(){
   
 
    
  }
  public subjectdata1(max): void {
    interval(30000).subscribe(x => this.dataSubject.next((Math.floor(Math.random() * max))));
  }
  

 default():Observable<HttpResponse<any>>{
   return this.http.get<any>("https://containerscheduler.herokuapp.com/default", { observe: 'response' });
 }
 exectime():Observable<HttpResponse<any>>{
  return this.http.get<any>("https://containerscheduler.herokuapp.com/getexectime/", { observe: 'response' });
}
 newapproach():Observable<HttpResponse<any>>{
   return this.http.get<any>("https://containerscheduler.herokuapp.com/newapproach/", { observe: 'response' });
 }
 getcpu():Observable<HttpResponse<any>>{
  return this.http.get<any>("https://containerscheduler.herokuapp.com/getcpu/", { observe: 'response' });
}
getmem():Observable<HttpResponse<any>>{
  return this.http.get<any>("http://localhost:5002/getmem/", { observe: 'response' });
}
getTotalMem():Observable<HttpResponse<any>>{
  return this.http.get<any>("https://containerscheduler.herokuapp.com/getMaxmem/", { observe: 'response' });
}
 getnb_nodes()
 {
  return   this.http.get<JSON>(this.url+"api/v1/query?query=count(node_meta)", { observe: 'response' })
  
 }                                                                                                                         
 getnb_services():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=count(count(container_tasks_state%7Bcontainer_label_com_docker_swarm_service_name%3D~%22.%2B%22%7D)+by+(container_label_com_docker_swarm_service_name))", { observe: 'response' });
  }
  
  get_available_mem():Observable<HttpResponse<JSON>>{
   return  this.http.get<JSON>(this.url+"api/v1/query?query=sum((node_memory_MemAvailable_bytes+%2F+node_memory_MemTotal_bytes)+*+on(instance)+group_left(node_name)+node_meta+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta)", { observe: 'response' });
  }
  get_available_disk():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100%20-%20(avg(irate(node_cpu_seconds_total{mode=%22idle%22}[5m])%20%20*%20on(instance)%20group_left(node_name)%20node_meta*%20100))", { observe: 'response' });
  }

  nb_con_node(node_id):Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=count(container_last_seen%7Bcontainer_label_com_docker_swarm_node_id%3D~%22"+node_id+"%22%7D)", { observe: 'response' });
  }



  nb_info():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(node_meta)+by+(node_id,+node_name,+instance)", { observe: 'response' });
  }
  nb_totalmem():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(node_memory_MemTotal_bytes%2F100000000*+on(instance)+group_left(node_name)+node_meta)", { observe: 'response' });
  }
  nb_total_disk():Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(node_filesystem_size_bytes%7Bmountpoint%3D%22%2Frootfs%22%7D%2F100000000*+on(instance)+group_left(node_name)+node_meta)", { observe: 'response' });
  }

 consumed_mem_node(node_id):Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100-sum((node_memory_MemAvailable_bytes+%2F+node_memory_MemTotal_bytes)+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+node_id+"%22%7D+*+100)+%2F+count(node_meta+*+on(instance)+group_left(node_name)+node_meta%7Bnode_id%3D~%22"+node_id+"%22%7D)", { observe: 'response' });
  }

  consumed_cpu_node(node_id):Observable<HttpResponse<JSON>>{
   return   this.http.get<JSON>(this.url+"api/v1/query?query=100%20-%20(avg(irate(node_cpu_seconds_total{mode=%22idle%22}[5m])*%20on(instance)%20group_left(node_name)%20node_meta{node_id=%22"+node_id+"%22}%20*%20100)%20by%20(node_name))", { observe: 'response' });
  }

  total_cpu_node(node_id):Observable<HttpResponse<JSON>>{
    return   this.http.get<JSON>(this.url+"api/v1/query?query=count(node_cpu_seconds_total%7Bmode%3D%22idle%22%7D%20*%20on(instance)%20group_left(node_name)%20node_meta%7Bnode_id%3D~%22"+node_id+"%22%7D)&g0.tab=1", { observe: 'response' });
   }

   total_mem_node(node_id):Observable<HttpResponse<JSON>>{
    return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(node_memory_MemTotal_bytes%20*%20on(instance)%20group_left(node_name)%20node_meta%7Bnode_id%3D~%22"+node_id+"%22%7D%2F1000%2F1000%2F1000)&g0.tab=1", { observe: 'response' });
   }
   
  containers_per_node(node_id):Observable<HttpResponse<JSON>>{
    return   this.http.get<JSON>(this.url+"api/v1/query?query=sum(rate(container_last_seen{container_label_com_docker_swarm_service_name!=%22"+this.eliminate_services[0]+"%22,container_label_com_docker_swarm_service_name!=%22"+this.eliminate_services[1]+"%22,container_label_com_docker_swarm_service_name!=%22"+this.eliminate_services[2]+"%22,container_label_com_docker_swarm_node_id=~%22"+node_id+"%22}[5m])) by (container_label_com_docker_swarm_service_name)", { observe: 'response' });
   }
  
  alerts():Observable<HttpResponse<JSON>>{
    return   this.http.get<JSON>(this.url+"api/v1/alerts", { observe: 'response' });
   }

   get_constraints():Observable<HttpResponse<any>>{
    return this.http.get<any>("https://containerscheduler.herokuapp.com/getjson/", { observe: 'response' });
  }
  updateStatus():Observable<HttpResponse<any>>{
    return this.http.get<any>("https://containerscheduler.herokuapp.com/UpdateStatus/", { observe: 'response' });
  }

 public update_constraints(entity:any):Observable<any>{
    return this.http.post<JSON>("https://containerscheduler.herokuapp.com/update/",JSON.stringify(entity))
   
    
  }
energy():Observable<HttpResponse<any>>{
    return this.http.get<any>("https://containerscheduler.herokuapp.com/getenergy/", { observe: 'response' });
  }

  public weights(entity:any):Observable<any>{
    return this.http.post<JSON>("https://containerscheduler.herokuapp.com/getweights/",JSON.stringify(entity))
   
    
  }

  public Status(entity:any):Observable<any>{
    return this.http.post<JSON>("https://containerscheduler.herokuapp.com/getStatus/",JSON.stringify(entity))
   
    
  }

  
  public geturl(entity:any):Observable<any>{
    return this.http.post<JSON>("http://localhost:5002/geturl/",JSON.stringify(entity))
   
    
  }
 


}



 



  


  

  
 
