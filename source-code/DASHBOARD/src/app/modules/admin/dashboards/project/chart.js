

 function all(Managerurl){
   
    
    console.log("nour the best");
 var ctx = document.getElementById('myChart').getContext('2d');
 var ctx2 = document.getElementById('myChart2').getContext('2d');
 var ctx3 = document.getElementById('myChart3').getContext('2d');
 var ctx4 = document.getElementById('myChart4').getContext('2d');
 var ctx5 = document.getElementById('myChart5').getContext('2d');
 var ctx6 = document.getElementById('myChart6').getContext('2d');
 // var ctx7 = document.getElementById('myChart7').getContext('2d');
 // var ctx8 = document.getElementById('myChart8').getContext('2d');

 //var ctx9 = document.getElementById('myChart9').getContext('2d');
 //var ctx10 = document.getElementById('myChart10').getContext('2d');

 url="http://192.168.99.110:9090/";
 //url=Managerurl

 
 const query1='100 - (avg(irate(node_cpu_seconds_total{mode="idle"}[5m])  * on(instance) group_left(node_name) node_meta * 100) by (node_name))';
 const query2 = 'sum(node_load5 * on(instance) group_left(node_name) node_meta) by (node_name)';
 
 const query3 ='count(node_meta * on(instance) group_left(node_name) node_meta)';
 const query4 ='sum((node_memory_MemTotal_bytes/1000000 - node_memory_MemFree_bytes/1000000 - node_memory_Cached_bytes/1000000 - node_memory_Buffers_bytes/1000000 - node_memory_Slab_bytes/1000000) * on(instance) group_left(node_name) node_meta) by (node_name)'
const query5="sum(rate(container_network_receive_bytes_total[5m]) * on(container_label_com_docker_swarm_node_id) group_left(node_name) node_meta) by (node_name)"
const query6="sum(rate(container_network_transmit_bytes_total [5m]) * on(container_label_com_docker_swarm_node_id) group_left(node_name) node_meta) by (node_name)" 


//const query9='topk(10, avg_over_time(container_memory_usage_bytes{container_label_com_docker_swarm_node_id=~"'+String(url_node)+'", id=~"/docker/.*"}[5m])/1000/1000)'
//console.log(query9)
// const query10='topk(10, sum(irate(container_cpu_usage_seconds_total{container_label_com_docker_swarm_node_id=~"'+String(url_node)+'", id=~"/docker/.*"}[5m])) by (name) * 100 )'
// const query = 'node_load1';
 // // absolute
 // const start = new Date(new Date().getTime() - (60 * 60 * 1000));
 // const end = new Date();
 // relative
 const start = -30 * 60 * 1000;
 const end = 0; // now
colors=['red','blue','orange','green','gray','pink','yellow','white']


/*all1=[]
var i=-1
var total_energy_per_node=[]

all_running_containers=[]
nodes.forEach(element => {
    element[3].forEach(con => {
        all_running_containers.push(con)
        
    });

    
});
console.log(all_running_containers)
 total_energy_per_node = JSON.parse(JSON.stringify(data[0]['energy_per_period']));

total_energy_per_node.forEach(element => {
      element['y']=0
        
   
    
});

 data.forEach(element => {
     i=i+1
     if (all_running_containers.includes(element['container'])==true)
     {
     var s={
        label: element['container'],
        borderColor: colors[i],
        data: element['energy_per_period'].slice(Math.max(element['energy_per_period'].length - 10, 1))  
     }
     
     all1.push(s)}
     
 });
 all_energies=[]
 console.log(data)
nodes.forEach(element => {
    total_energy_per_node1=[]
    total_energy_per_node1 = JSON.parse(JSON.stringify(total_energy_per_node));
  element[3].forEach(con_per_node=> {
    
      data.forEach(con => {
        
          if (String(con['container'])==String(con_per_node)){
            console.log(con['container'])
            console.log(con_per_node)
              console.log(con_per_node)
              i=0
            con['energy_per_period'].forEach(line => {
                total_energy_per_node1[i]['y']= total_energy_per_node1[i]['y']+line['y']
                i=i+1
                
            });
          }
          
      });
    
  }
  );
 
  all_energies.push({'node':element[0],'energy':total_energy_per_node1})
} ,    

);
console.log(all_energies)



i=0
all2=[]
    all_energies.forEach(element => {
    i=i+1
    var s={
       label: element['node'],
       borderColor: colors[i],
       data: element['energy'].slice(Math.max(element['energy'].length - 10, 1))  
    }
    
    all2.push(s)
    
});
 
 

 
  
 var chart = new Chart(ctx7, {
    type: 'line',
    data: { datasets: all1},
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'minute',
                                              
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }                        
            }]
        },
        title: {
            display: true,
            text: 'Total Power Consumption per Container'
        },
       
    },
    
  }); */


  /*var chart = new Chart(ctx8, {
    type: 'line',
    data: { datasets: all2},
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'minute',
                                              
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }                        
            }]
        },
        title: {
            display: true,
            text: 'Total Power Consumption per Node'
        },
       
    },
    
  });*/

                 
     













 /*var myChart9 = new Chart(ctx9, {
    type: 'line',
    data: {
        },
    options: {
       title: {
           display: true,
           text: 'memory usage in MB per Container '
       },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'minute',
                                              
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }                        
            }]
        },
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: url,
                   
                },
                query: query9,
                timeRange: {
                    type: 'relative',
                    start:start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        
        },
      
    annotation: {
      
       drawTime: 'afterDatasetsDraw', 
       events: ['click'],
       dblClickSpeed: 350, 
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
               
           }
                 }]
   }
              
            },

    plugins: [
        ChartDatasourcePrometheusPlugin,
        
      
       
    ],
 });         
       
  















 var myChart10 = new Chart(ctx10, {
    type: 'line',
    data: {
        },
    options: {
       title: {
           display: true,
           text: '% of cpu usage per container '
       },
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'minute',
                                              
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'value'
                }                        
            }]
        },
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: url,
                   
                },
                query: query10,
                timeRange: {
                    type: 'relative',
                    start:start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        
        },
      
    annotation: {
      
       drawTime: 'afterDatasetsDraw', 
       events: ['click'],
       dblClickSpeed: 350, 
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
               
           }
                 }]
   }
              
            },

    plugins: [
        ChartDatasourcePrometheusPlugin,
        
      
       
    ],
 });



*/




 console.log("anwar the best");


 

 var myChart1 = new Chart(ctx, {
    type: 'line',
    data: {
        },
    options: {
       title: {
           display: true,
           text: '% of cpu usage per node '
       }, 
       scales: { xAxes: [{
           type: 'time',
           time: {
               unit: 'minute',
                                    
           },
           display: true,
           scaleLabel: {
               display: true,
               labelString: 'value'
           }                        
       }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: url,
                   
                },
                query: query1,
                timeRange: {
                    type: 'relative',
                    start:start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        
        },
      
    annotation: {
      
       drawTime: 'afterDatasetsDraw', 
       events: ['click'],
       dblClickSpeed: 350, 
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
               
           }
                 }]
   }
              
            },
            plugins: [
               ChartDatasourcePrometheusPlugin,
           ],

 });
 console.log("anwar the best!!");
 
 var myChart2 = new Chart(ctx2, {
     type: 'line',
     data: {},
     options: {
        title: {
            display: true,
            text: 'System load per node'
        },
         scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                     
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
         plugins: {
             'datasource-prometheus': {
                 prometheus: {
                     endpoint: url ,
                    
                 },
                 query: query2,
                 timeRange: {
                     type: 'relative',
                     start: start,
                     end: end,
                     msUpdateInterval: 5 * 1000,
                 },
             },
         },
     
     annotation: {
        // Defines when the annotations are drawn.
        // This allows positioning of the annotation relative to the other
        // elements of the graph.
        //
        // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
        // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
        drawTime: 'afterDatasetsDraw', // (default)

        // Mouse events to enable on each annotation.
        // Should be an array of one or more browser-supported mouse events
        // See https://developer.mozilla.org/en-US/docs/Web/Events
        events: ['click'],

        // Double-click speed in ms used to distinguish single-clicks from
        // double-clicks whenever you need to capture both. When listening for
        // both click and dblclick, click events will be delayed by this
        // amount.
        dblClickSpeed: 350, // ms (default)

        // Array of annotation configuration objects
        // See below for detailed descriptions of the annotation options
        annotations: [{
            drawTime: 'afterDraw', // overrides annotation.drawTime if set
            id: 'a-line-1', // optional
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value:new Date() ,
            borderColor: 'black',
            borderWidth: 2,
    
               onClick: function(e) {
                   // `this` is bound to the annotation element
                   this.options.value=new Date();
                   console.log(this)
               }
                     }]
    }
         },

     plugins: [
         ChartDatasourcePrometheusPlugin,
     ],
 });
 console.log("drira the best");
 var myChart3 = new Chart(ctx3, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'number of nodes'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                       
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: url ,
                   
                },
                query: query3,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        },
    
    annotation: {
       
       drawTime: 'afterDatasetsDraw', // (default)
       events: ['click'],

       // Mouse events to enable on each annotation.
       // Should be an array of one or more browser-supported mouse events
       // See https://developer.mozilla.org/en-US/docs/Web/Events
      

       // Double-click speed in ms used to distinguish single-clicks from
       // double-clicks whenever you need to capture both. When listening for
       // both click and dblclick, click events will be delayed by this
       // amount.
        // ms (default)

       // Array of annotation configuration objects
       // See below for detailed descriptions of the annotation options
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
           }
                 }]
   }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});
console.log("titiii the best");
var myChart4 = new Chart(ctx4, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'Memory Usage per node (Mb)'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                        
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: url ,
                   
                },
                query: query4,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        },
    
    annotation: {
       // Defines when the annotations are drawn.
       // This allows positioning of the annotation relative to the other
       // elements of the graph.
       //
       // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
       // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
       drawTime: 'afterDatasetsDraw', // (default)

       // Mouse events to enable on each annotation.
       // Should be an array of one or more browser-supported mouse events
       // See https://developer.mozilla.org/en-US/docs/Web/Events
       events: ['click'],

       // Double-click speed in ms used to distinguish single-clicks from
       // double-clicks whenever you need to capture both. When listening for
       // both click and dblclick, click events will be delayed by this
       // amount.
       dblClickSpeed: 350, // ms (default)

       // Array of annotation configuration objects
       // See below for detailed descriptions of the annotation options
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
              
               
           }
                 }]
   }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});
console.log("chaimaa the best");
var myChart5 = new Chart(ctx5, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'Received network traffic per node'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                        
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint: url ,
                   
                },
                query: query5,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        },
    
    annotation: {
       // Defines when the annotations are drawn.
       // This allows positioning of the annotation relative to the other
       // elements of the graph.
       //
       // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
       // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
       drawTime: 'afterDatasetsDraw', // (default)

       // Mouse events to enable on each annotation.
       // Should be an array of one or more browser-supported mouse events
       // See https://developer.mozilla.org/en-US/docs/Web/Events
       events: ['click'],

       // Double-click speed in ms used to distinguish single-clicks from
       // double-clicks whenever you need to capture both. When listening for
       // both click and dblclick, click events will be delayed by this
       // amount.
       dblClickSpeed: 350, // ms (default)

       // Array of annotation configuration objects
       // See below for detailed descriptions of the annotation options
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
              
               
           }
                 }]
   }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});



          

console.log("amal the best");
var myChart6 = new Chart(ctx6, {
    type: 'line',
    data: {},
    options: {
       title: {
           display: true,
           text: 'transmit network traffic per node'
       },
        scales: { xAxes: [{
            type: 'time',
            time: {
                unit: 'minute',
                                      
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'value'
            }                        
        }]},
        plugins: {
            'datasource-prometheus': {
                prometheus: {
                    endpoint:url ,
                   
                },
                query: query6,
                timeRange: {
                    type: 'relative',
                    start: start,
                    end: end,
                    msUpdateInterval: 5 * 1000,
                },
            },
        },
    
    annotation: {
       // Defines when the annotations are drawn.
       // This allows positioning of the annotation relative to the other
       // elements of the graph.
       //
       // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
       // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
       drawTime: 'afterDatasetsDraw', // (default)
       events: ['click'],
       // Mouse events to enable on each annotation.
       // Should be an array of one or more browser-supported mouse events
       // See https://developer.mozilla.org/en-US/docs/Web/Events
       //events: ['click'],

       // Double-click speed in ms used to distinguish single-clicks from
       // double-clicks whenever you need to capture both. When listening for
       // both click and dblclick, click events will be delayed by this
       // amount.
       dblClickSpeed: 350, // ms (default)

       // Array of annotation configuration objects
       // See below for detailed descriptions of the annotation options
       annotations: [{
        drawTime: 'afterDraw', // overrides annotation.drawTime if set
        id: 'a-line-1', // optional
        type: 'line',
        mode: 'vertical',
        scaleID: 'x-axis-0',
        value:new Date() ,
        borderColor: 'black',
        borderWidth: 2,

           onClick: function(e) {
               // `this` is bound to the annotation element
               this.options.value=new Date();
               
           }
                 }]
   }},

    plugins: [
        ChartDatasourcePrometheusPlugin,
    ],
});

console.log("anwar the best");}
