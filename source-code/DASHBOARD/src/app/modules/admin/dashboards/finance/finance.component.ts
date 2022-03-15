import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ApexOptions } from 'ng-apexcharts';
import { FinanceService } from 'app/modules/admin/dashboards/finance/finance.service';
import { ApiService } from 'api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
declare var $: any;

@Component({
  selector: 'finance',
  templateUrl: './finance.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinanceComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data: any;
  accountBalanceOptions: ApexOptions;
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = ['transactionId', 'date', 'name', 'amount', 'status'];
  open = [0, 0, 0]
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  public colors = ['red', 'indigo', 'teal', 'green', 'blue', 'black', 'pink', 'grey', 'gray', 'yellow']
  power = false
  fileToUpload = null;
  containers = []
  nodes = []
  click1 = false
  click2 = false
  click3 = false
  msg:string
  reschedule = false
  constraints = []
  nodes_max_power_consumption = []
  new_containers_priorities = []
  containers_power_consumption = []
  new_nodes_max_power_consumption = []
  new_containers_power_consumption = []
  new_constraints = []
  check1 = []
  resp = []
  displayedColumns = ['name', 'max_power_consumption'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource()

  displayedColumns1 = ['name', 'Power-consumption', 'priority'];
  dataSource1: MatTableDataSource<any> = new MatTableDataSource()

  displayedColumns4 = ['Objectives', 'Weight'];
  dataSource3: MatTableDataSource<any> = new MatTableDataSource()
  objectives1 = [{ 'name': 'Number Of selected nodes' },
  { 'name': 'Average containers per node' },
  { 'name': 'Priorities' },
  { 'name': 'Cohesion' },
  { 'name': 'Average Power Consumption' },
  { 'name': 'Number Of Changes' },
  { 'name': 'Cpu Usage Per Container ' },
  { 'name': 'Memory Usage Per Container' }];

  subscription: Subscription;
  randomNumber = []
  time
  momenttime: string;
  timer: NodeJS.Timer;
  displayedColumns2 = [];
  displayedColumns3 = ['container'];


  /**
   * Constructor
   */
  constructor(private _financeService: FinanceService, private api: ApiService, private router: Router) {
  }



  check = [false, false, false, false, false, false, false, false, false]

  objectives = [{ 0: 0 },
  { 1: 0 },
  { 2: 0 },
  { 3: 0 },
  { 4: 0 },
  { 5: 0 },
  { 6: 0 },
  { 7: 0 },
  { 8: 1 }

  ]

  onSave(i) {
    if (this.check[i] == true) {
      this.check[i] = false
      if (i == 8) {
        this.objectives[8][8] = 0
      }
    }
    else {
      this.check[i] = true
      if (i == 8) {
        this.objectives[8][8] = 1
      }

    }

    console.log(this.check)

  }

  savechanges() {
    this.click1 = true
    if (this.open[0] == 1) {
      this.open[0] = 0
    }
    let i = 0
    let weights = []
    this.check.forEach(element => {

      if (element != false) {
        weights.push(this.objectives[i])
      }
      i = i + 1
    });
    if (this.check[8] == false) {
      weights.push(this.objectives[8])
    }
    console.log(weights)
    this.resp['objectives']=weights
    this.api.weights(weights)
      .subscribe(
        resp => {
          console.log(resp)
        },

      )
  }


  checkboxChanged(i, j) {
    console.log(i)
    console.log(j)
    if (this.check1[j][i] == false) {
      this.check1[j][i] = true
    }
    else {
      this.check1[j][i] = false
    }

  }



  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.get_constraints()
    this.dataSource3 = new MatTableDataSource(this.objectives1);
    console.log(this.objectives1);

  }

  /**
   * After view init
   */

  save() {
    
    console.log(this.dataSource1['filteredData'][0]['power_consumption'])
    console.log(this.dataSource['filteredData'][0]['max_power_consumption'])
    this.click2 = true
    console.log(this.click2)
    if (this.open[1] == 1) {
      this.open[1] = 0
    }

    if (this.open[2] == 1) {
      this.open[2] = 0
    }


    this.reschedule = true
    


      for (var i = 0; i < this.containers.length; i++) {
        let con1 = []
        for (var j = 0; j < this.nodes.length; j++) {
          if (this.check1[i][j] == true) {
            con1.push(j)
          }


        }
        this.new_constraints.push(con1)



      }
      console.log("new constraints  ", this.new_constraints)
      for (var j = 0; j < this.new_constraints.length; j++) {
        this.resp['containers'][j]['placements'] = this.new_constraints[j]
        console.log(this.dataSource1['filteredData'][j]['power_consumption'])
        this.resp['containers'][j]['power_consumption'] = this.dataSource1['filteredData'][j]['power_consumption']
        
      }
      console.log(this.resp)
      for (var j = 0; j < this.nodes_max_power_consumption.length; j++) {

        this.resp['nodes'][j]['max_power_consumption'] = this.dataSource['filteredData'][j]['max_power_consumption']

      }
  


    console.log(this.resp)

    this.api.update_constraints(this.resp)
      .subscribe(
        resp => {
          console.log(resp)
        },

      )
    const type = ['', 'info', 'success', 'warning', 'danger'];

    var color = Math.floor((Math.random() * 4) + 1);
    $.notify({

      message: "saving new constraints..."
    }, {
      type: type[color],
      timer: 1000,
      placement: {
        from: 'top',
        align: 'center',
      }
    });
    /*window.location.reload();*/



  }


  get_constraints() {
    this.api.get_constraints()
      .subscribe(
        resp => {
          console.log(resp)
          this.resp = resp.body
          console.log(resp)
          this.containers = resp.body['containers']
          //this.containers.forEach(element => {

           //let index = element['name'].indexOf(".");
           // element['name'] = element['name'].substring(0, index)
          //})
          this.nodes = resp.body["nodes"]
          this.dataSource = new MatTableDataSource(this.nodes);
          this.dataSource1 = new MatTableDataSource(this.containers);

          this.nodes.forEach(element => {
            this.displayedColumns2.push(element['name'])
          })

          console.log(this.displayedColumns2);

          console.log(this.containers)
          console.log(this.nodes)

          this.nodes.forEach(element => {
            this.displayedColumns3.push(element['name'])
          })


          for (var i = 0; i < this.containers.length; i++) {

            let node = []

            for (var j = 0; j < this.nodes.length; j++) {

              node.push(false)
            }


            let placements = this.containers[i]['placements']
            if (placements != []) {
              for (var p = 0; p < placements.length; p++) {
                console.log(p)
                console.log(placements[p])
                node[placements[p]] = true

              }
            }

            this.check1.push(node)
          }







        });
    console.log(this.constraints)
    console.log(this.check1)
    console.log(this.containers_power_consumption)
    console.log(this.nodes_max_power_consumption)
  }



  OpenInfo(i) {
    if (this.open[i] == 0) {
      this.open[i] = 1
    }


    else {
      this.open[i] = 0
    }


  }



  ngAfterViewInit(): void {
    // Make the data source sortable
    this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;

    this.dataSource1.paginator = this.paginator;

  }

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
   * Prepare the chart data from the data
   *
   * @private
   */

  /**
  * constraints
  */



  /*Rescheduling part*/



  showNotification2(from, align) {


    const type = ['', 'info', 'success', 'warning', 'danger'];

    var color = Math.floor((Math.random() * 4) + 1);
    this.click3 = true;

    this.api.newapproach()
      .subscribe(
        resp => {
          console.log(resp);

          this.msg = ("Execution time is equal to ".concat(Number(resp.body).toFixed(2).toString())).concat(" Seconds");
          var color = Math.floor((Math.random() * 4) + 1);
          $.notify({

            message: this.msg
          }, {
            type: type[color],
            timer: 1000,
            placement: {
              from: from,
              align: align
            }
          });

        });

  }



}
