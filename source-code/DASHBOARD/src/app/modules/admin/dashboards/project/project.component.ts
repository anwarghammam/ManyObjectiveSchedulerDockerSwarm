import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, from, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApexOptions } from 'ng-apexcharts';
import { ProjectService } from 'app/modules/admin/dashboards/project/project.service';
import { ApiService } from 'api.service';


import { ConditionalExpr } from '@angular/compiler';
import Chart from 'chart.js';
import 'chart.js';
declare var all: any;
declare var $: any;
@Component({
    selector: 'project',
    templateUrl: './project.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent implements OnInit, OnDestroy {
    click1 = false
    infoV = []
    Nodesroles: { [id: string]: any; } = {};
    nodes_info = []
    resp
    containers_info = []
    nodes_idsV = []
    containers = []
    url
    data1V = []
    color
    StatusMsg=''
    nodes_namesV = []
    nodes_power_consumption = []

    chartGithubIssues: ApexOptions = {};
    chartTaskDistribution: ApexOptions = {};
    chartBudgetDistribution: ApexOptions = {};
    chartWeeklyExpenses: ApexOptions = {};
    chartMonthlyExpenses: ApexOptions = {};
    chartYearlyExpenses: ApexOptions = {};
    data: any;
    selectedProject: string = 'ACME Corp. Backend App';
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    @ViewChild('googlechart')


    chart1 = {
        title: 'Total memory',
        type: 'Gauge',
        data: [["memory", 0
        ]],
        options: {
            width: 400,
            height: 150,
            greenFrom: 0,
            greenTo: 75,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 5,
            majorTicks: ['0%', '100%']


        }
    }
    chart2 = {
        title: 'Total CPU',
        type: 'Gauge',
        data: [[
            'disk', 0,
        ]],
        options: {
            width: 400,
            height: 150,

            greenFrom: 0,
            greenTo: 75,
            redFrom: 90,
            redTo: 100,
            yellowFrom: 75,
            yellowTo: 90,
            minorTicks: 5
        }
    }
    chart3 = {
        title: 'services',
        type: 'Gauge',
        data: [[
            'services', 0,


        ]],
        options: {
            width: 400,
            height: 150,

            blueFrom: 0,
            blueTo: 100,

            minorTicks: 5


        }
    }
    chart4 = {
        title: 'number of containers',
        type: 'Gauge',
        data: [[
            'containers', 0,


        ]],
        options: {
            width: 400,
            height: 150,

            blueFrom: 0,
            blueTo: 100,

            minorTicks: 5


        }
    }
    times = []

    public TimeExecdata = []
    public colors = ['red', 'indigo', 'teal', 'green', 'blue', 'black', 'pink', 'grey', 'gray', 'yellow']
    public colorsP = ['warn']
    public node = 0
    public services
    public available_mem
    public available_disk
    public con
    containers_energy
    public total_containers: number = 0
    public total_memory
    public total_disque
    public data1 = []
    public consumed_mem
    public consumed_cpu
    public data3 = []
    public total_resources = []
    public info = []
    public nodes_ids = []
    public nodes_names = []
    public total_cpu
    public total_mem
    public pieChartData = [3, 3, 3, 3, 3, 3]
    infos: JSON[]
    public names = []


    /* bars*/
    title3 = '% resources consumption per node';
    type3 = 'ComboChart';

    columnNames3 = ['ressources', 'cpu', 'mem'];
    options3 = {
        hAxis: {
            title: 'node'
        },
        vAxis: {
            title: '% of consumption'
        },
        seriesType: 'bars',
    }
    /**
     * Constructor
     */
    constructor(
        private _projectService: ProjectService,
        private api: ApiService,
        private _router: Router
    ) {

         
        


        this.api.updateStatus()
        .subscribe(
           
            resp => {
               
                this.StatusMsg=resp.body
                console.log(this.StatusMsg)
               // var color = Math.floor((Math.random() * 4) + 1);
               // if (this.StatusMsg==="done"){

                //}
               // else{
                //    $.notify({

                     //   message: String(this.StatusMsg)
                   // }, {
                     //   type: 'info',
                     //   timer: 1000,
                       // placement: {
                       //     from: 'left',
                       //     align: 'center'
                     //   }
                  //  });
               // }
                
                

            });

        

        this.api.nb_info()
            .subscribe(
                resp => {

                    this.infoV = resp.body['data']['result']

                    for (var val of this.infoV) {

                        this.nodes_idsV.push(val['metric']['node_id'])
                        this.nodes_namesV.push(val['metric']['node_name'])
                        this.data1V.push([val['metric']['node_name'], val['metric']['node_id'], val['metric']['instance']])
                    }
                    this.get_containers()




                });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */

    ngOnInit(): void {
        
        this.api.geturl(this.api.url)
            .subscribe(resp => {

               console.log(resp)
            });
       
            this.api.getmem()
            .subscribe(resp => {
               
               console.log(resp)
            });

        
        this.nb_info()


        /**
         * 
         * this part s related to the visualizer
         */
          
        this.color = [Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1)]


        setTimeout(() => {
            this.api.all_current_data = this.data1V
        
            this.data1V.forEach(element => {
               console.log("elemet   ", element)
                this.nodes_info.forEach(element1 => {
                    console.log("elemet 1  ", element)
                    if (String(element1['name']) == String(element[0])) {

                        element1['containers'] = (element[3])
                    }
                });




            });
           

            this.nodes_info.forEach(element => {



                element['priorities'] = []
                element['containers'].forEach(con => {

                    this.containers_info.forEach(con_info => {
                        if (con_info['name'] == con) {
                            element['priorities'].push(con_info['priority'])

                        }
                    });

                });
                console.log(this.nodes_info)
            });



        }, 500);



        /**
        * 
        * this part s related to the exectime
        */



        this.api.exectime()
            .subscribe(
                resp => {

                    this.times = resp.body.times
                    console.log(this.times)
                    this.times.forEach(element => {
                        let exectime = []
                        exectime.push(element["containers"])
                        exectime.push(element["exectime"])
                        this.TimeExecdata.push(exectime)
                        console.log(this.TimeExecdata)
                    });

                });


       
       

        this.nb_total_dis()



        this.nb_services()
        this.nb_total_mem()
        this.get_available_mem()
        this.get_available_disk()

        // Get the data
        this._projectService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;
                console.log(data)

                // Prepare the chart data
                this._prepareChartData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    }
                }
            }
        };


        setTimeout(() => {
           
            all(String(this.api.url));

        }, 5);

    }


    initrealdata(){
        all(String(this.api.url));
    }


    get_containers() {
        this.get_constraints()
        this.data1V.forEach(val => {

            let containers_per_node = []
            this.api.containers_per_node(String(val[1]))
                .subscribe(
                    resp => {

                        resp.body['data'].result.forEach(element => {
                            containers_per_node.push(element['metric']['container_label_com_docker_swarm_service_name'].toString())


                        });

                        val.push(containers_per_node)

                    })

                ;
        }

        )


    }




    get_constraints() {
        this.api.get_constraints()
            .subscribe(
                resp => {

                    this.resp = resp.body

                    this.containers_info = resp.body['containers']



                    this.nodes_info = resp.body["nodes"]
                    console.log(this.nodes_info)



                    this.nodes_info.forEach(element => {
                        let name1 = String(element['name'])

                        this.Nodesroles[name1] = element['Manager Status']
                        console.log(this.Nodesroles)

                        let index = this.nodes_names.indexOf(element['name'])


                        if (index > -1) {
                            this.nodes_power_consumption[index] = (element['max_power_consumption'])

                        }

                    });












                });

    }



    showNotification1(from, align) {
        const type = ['', 'info', 'success', 'warning', 'danger'];
        this.click1 = true;
        this.api.default()
        .subscribe(
            resp => {
                console.log("default" + resp);

            });
        var color = Math.floor((Math.random() * 4) + 1);
        $.notify({

            message: "back to the default scheduler ! please wait"
        }, {
            type: type[color],
            timer: 1000,
            placement: {
                from: from,
                align: align
            }
        });
       
        /** window.location.reload() **/
    }


    consumed_ressources() {

        let i = -1
        this.data1.forEach(val => {

            console.log(val)
            forkJoin([this.api.consumed_mem_node(String(val[1])),
            this.api.consumed_cpu_node(String(val[1]))]).subscribe(data => {

                this.consumed_mem = parseFloat(data[0].body['data']['result']['0']['value']['1']);
                this.consumed_mem = this.consumed_mem.toFixed(2)

                this.consumed_cpu = parseFloat(data[1].body['data']['result']['0']['value']['1']);
                this.consumed_cpu = this.consumed_cpu.toFixed(2)
                this.data3.push(
                    [String(val[0]), this.consumed_cpu, this.consumed_mem])
            });




            forkJoin([this.api.total_cpu_node(String(val[1])),
            this.api.total_mem_node(String(val[1]))]).subscribe(data => {

                this.total_cpu = parseFloat(data[0].body['data']['result']['0']['value']['1']);

                this.total_mem = parseFloat(data[1].body['data']['result']['0']['value']['1']);

                this.total_resources.push(
                    [String(val[0]), String(val[1]), String(this.Nodesroles[String(val[0])]), String(this.total_cpu), String(this.total_mem), String(100 - this.consumed_cpu), String(((((this.total_mem.toFixed(2) * 100) - this.consumed_mem) / (this.total_mem.toFixed(2) * 100)) * 100).toFixed(2))])
            });

            console.log(this.total_resources)

        })



    }
    nb_con() {
        console.log(this.data1)

        this.data1.forEach(val => {

            this.pieChartData = []
            this.api.nb_con_node(String(val[1]))
                .subscribe(
                    resp => {

                        this.con = resp.body['data']['result']['0']['value']['1'];
                        this.names.push(val[0])
                        this.total_containers += parseInt(resp.body['data']['result']['0']['value']['1']);
                        console.log("total containers  " + this.total_containers)
                        this.pieChartData.push(this.con)
                        this.data.push([val[1], this.con])

                        this.chart4.data = [['number of containers', this.total_containers]]

                    })
                ;
        })
        console.log("total containers  " + this.total_containers)




    }

    number_node() {
        this.api.getnb_nodes().subscribe(
            resp => {
                this.node = resp.body['data']['result']['0']['value']['1'];
            });

    }
    nb_services() {
        this.api.getnb_services()
            .subscribe(
                resp => {

                    this.services = parseFloat(resp.body['data']['result']['0']['value']['1']);
                    this.services = this.services
                    this.chart3.data = [['nb services', this.services]]

                });

    }

    ChangeStatus(resource) {
        if (resource[2] == 'worker') {
            resource[2] = 'Reachable'


        }

        this.api.Status(this.total_resources)
            .subscribe(
                resp => {
                    console.log(resp)
                },

            )


    }
    get_available_mem() {
        this.api.get_available_mem()
            .subscribe(
                resp => {

                    this.available_mem = 100 - parseFloat(resp.body['data']['result']['0']['value']['1']);

                    this.chart1.data = [['consumed Memory', this.available_mem]]
                });

    }
    get_available_disk() {
        this.api.get_available_disk()
            .subscribe(
                resp => {

                    this.available_disk = parseFloat(resp.body['data']['result']['0']['value']['1']);

                    this.chart2.data = [['consumed CPU', this.available_disk]]
                });

    }

    nb_info() {
        this.api.nb_info()
            .subscribe(
                resp => {
                    this.info = resp.body['data']['result']

                    for (var val of this.info) {

                        this.nodes_ids.push(val['metric']['node_id'])
                        this.nodes_names.push(val['metric']['node_name'])
                        this.data1.push([val['metric']['node_name'], val['metric']['node_id'], val['metric']['instance'], val['metric']['Manager Status']])
                    }
                    this.consumed_ressources()
                    this.nb_con()

                });

        console.log(this.data1)



    }
    nb_total_mem() {
        this.api.nb_totalmem()
            .subscribe(
                resp => {

                    this.total_memory = parseFloat((resp.body['data']['result']['0']['value']['1']));


                });

    }

    nb_total_dis() {
        this.api.nb_total_disk()
            .subscribe(
                resp => {

                    this.total_disque = parseFloat(resp.body['data']['result']['0']['value']['1']);
                    console.log("cpu")
                    console.log(this.total_disque)
                });

    }


    public pieChartLabels = this.names;









    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter(el => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute('fill', `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`);
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void {
        // Github issues


        // Task distribution
        this.chartTaskDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'polarArea',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            labels: this.data.taskDistribution.labels,
            legend: {
                position: 'bottom'
            },
            plotOptions: {
                polarArea: {
                    spokes: {
                        connectorColors: 'var(--fuse-border)'
                    },
                    rings: {
                        strokeColor: 'var(--fuse-border)'
                    }
                }
            },
            series: this.data.taskDistribution.series,
            states: {
                hover: {
                    filter: {
                        type: 'darken',
                        value: 0.75
                    }
                }
            },
            stroke: {
                width: 2
            },
            theme: {
                monochrome: {
                    enabled: true,
                    color: '#93C5FD',
                    shadeIntensity: 0.75,
                    shadeTo: 'dark'
                }
            },
            tooltip: {
                followCursor: true,
                theme: 'dark'
            },
            yaxis: {
                labels: {
                    style: {
                        colors: 'var(--fuse-text-secondary)'
                    }
                }
            }
        };

        // Budget distribution
        this.chartBudgetDistribution = {
            chart: {
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'radar',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#818CF8'],
            dataLabels: {
                enabled: true,
                formatter: (val: number): string | number => `${val}%`,
                textAnchor: 'start',
                style: {
                    fontSize: '13px',
                    fontWeight: 500
                },
                background: {
                    borderWidth: 0,
                    padding: 4
                },
                offsetY: -15
            },
            markers: {
                strokeColors: '#818CF8',
                strokeWidth: 4
            },
            plotOptions: {
                radar: {
                    polygons: {
                        strokeColors: 'var(--fuse-border)',
                        connectorColors: 'var(--fuse-border)'
                    }
                }
            },
            series: this.data.budgetDistribution.series,
            stroke: {
                width: 2
            },
            tooltip: {
                theme: 'dark',
                y: {
                    formatter: (val: number): string => `${val}%`
                }
            },
            xaxis: {
                labels: {
                    show: true,
                    style: {
                        fontSize: '12px',
                        fontWeight: '500'
                    }
                },
                categories: this.data.budgetDistribution.categories
            },
            yaxis: {
                max: (max: number): number => parseInt((max + 10).toFixed(0), 10),
                tickAmount: 7
            }
        };

        // Weekly expenses
        this.chartWeeklyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#22D3EE'],
            series: this.data.weeklyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.weeklyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };

        // Monthly expenses
        this.chartMonthlyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#4ADE80'],
            series: this.data.monthlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.monthlyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };

        // Yearly expenses
        this.chartYearlyExpenses = {
            chart: {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'line',
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#FB7185'],
            series: this.data.yearlyExpenses.series,
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                theme: 'dark'
            },
            xaxis: {
                type: 'category',
                categories: this.data.yearlyExpenses.labels
            },
            yaxis: {
                labels: {
                    formatter: (val): string => `$${val}`
                }
            }
        };
    }



}
