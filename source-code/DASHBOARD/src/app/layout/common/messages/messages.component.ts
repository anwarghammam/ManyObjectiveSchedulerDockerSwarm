import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message } from 'app/layout/common/messages/messages.types';
import { MessagesService } from 'app/layout/common/messages/messages.service';
import { ApiService } from 'api.service';

@Component({
    selector       : 'messages',
    templateUrl    : './messages.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'messages'
})
export class MessagesComponent implements OnInit, OnDestroy
{
    @ViewChild('messagesOrigin') private _messagesOrigin: MatButton;
    @ViewChild('messagesPanel') private _messagesPanel: TemplateRef<any>;

    messages: Message[];
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    open: any[]=[]
  alerts_colors: any[]=[];
  prom_alerts:[];
  public isCollapsed = false;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _messagesService: MessagesService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private api: ApiService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {    this.get_alerts()
        // Subscribe to message changes
        
    }


    details(i){
        this.open[i]=true
        
    }
         
    details1(i){
      this.open[i]=false
      
    }
      get_alerts(){
        this.api.alerts().subscribe(
          resp => {
            console.log("alerts")
            console.log(resp)
            this.prom_alerts=(resp.body['data']['alerts']);
            console.log(this.prom_alerts)
            for (var val of this.prom_alerts) {
              this.open.push(false)
              if(val['labels']['alertname']== "node_cpu_usage"){
                this.alerts_colors.push('danger')
              } // prints values: 10, 20, 30, 40
              else {
                this.alerts_colors.push('info')
              }
            }
            console.log(this.alerts_colors)
    
            console.log("w1 "+this.prom_alerts)
             })
            
            
             }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if ( this._overlayRef )
        {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the messages panel
     */
    openPanel(): void
    {
        // Return if the messages panel or its origin is not defined
        if ( !this._messagesPanel || !this._messagesOrigin )
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._messagesPanel, this._viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    /**
     * Mark all messages as read
     */
    markAllAsRead(): void
    {
        // Mark all as read
        this._messagesService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given message
     */
    toggleRead(message: Message): void
    {
        // Toggle the read status
        message.read = !message.read;

        // Update the message
        this._messagesService.update(message.id, message).subscribe();
    }

    /**
     * Delete the given message
     */
    delete(message: Message): void
    {
        // Delete the message
        this._messagesService.delete(message.id).subscribe();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._messagesOrigin._elementRef.nativeElement)
                                  .withLockedPosition(true)
                                  .withPush(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void
    {
        let count = 0;

        if ( this.messages && this.messages.length )
        {
            count = this.messages.filter(message => !message.read).length;
        }

        this.unreadCount = count;
    }
}