import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { EventService } from '../../services/event.service';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  CalendarOptions,
  DateSelectArg,
  EventInput,
} from '@fullcalendar/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';

export interface DialogData {
  title: string;
  backgroundColor: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  isAdded = new EventEmitter<boolean>();
  events: EventInput[] = [];
  backgroundColor = '';
  selectedEvent: EventInput = [];
  isMobile!: MediaQueryList;
  isDesktop!: MediaQueryList;
  title = '';
  mediaQueryList: MediaQueryList | undefined;
  isLoading = false;
  options: CalendarOptions | undefined;
  mobileQueryListener: () => void;

  constructor(
    private eventService: EventService,
    public dialog: MatDialog,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private snackBar: MatSnackBar
  ) {
    this.isMobile = media.matchMedia('(max-width: 425px)');
    this.isDesktop = media.matchMedia('(min-width: 1024px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.isMobile.addListener(this.mobileQueryListener);
    this.isDesktop.addListener(this.mobileQueryListener);
  }

  handleSelect = (arg: DateSelectArg) => {
    const dialogRef = this.dialog.open(EventsDialogComponent, {
      width: '400px',
      maxWidth: '85vw',
      height: '450px',
      data: { title: this.title, backgroundColor: this.backgroundColor },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.selectedEvent = {
          title: result.title,
          start: arg.startStr,
          end: arg.endStr,
          allDay: true,
        };
        this.eventService.addEvent(this.selectedEvent).subscribe(
          (resData) => {
            console.log(resData);
            this.snackBar
              .open('Successfully added event', '', {
                duration: 2000,
              })
              .afterDismissed()
              .subscribe(() => {
                this.isAdded.emit(true);
                this.ngOnInit();
              });
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            this.snackBar.open('Failed to add event', '', {
              duration: 1000,
            });
          }
        );
      }
    });
  };

  ngOnInit(): void {
    this.isLoading = true;
    this.eventService.getEvents().subscribe((res: EventInput[]) => {
      this.events = res;
      this.isLoading = false;
    });
    this.options = {
      initialView: 'dayGridMonth',
      // footerToolbar: {
      //   center: 'addNewEventButton',
      // },
      headerToolbar: {
        right: 'prev,next,today',
      },
      customButtons: {
        addNewEventButton: {
          text: 'Add new event',
          click: () => {
            this.openDialog();
          },
        },
      },
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      editable: true,
      weekends: true,
      droppable: true,
      selectable: true,
      select: this.handleSelect,
      longPressDelay: 200,
      locale: 'vi',
      aspectRatio: 1,
    };
  }

  openDialog = () => {
    const dialogRef = this.dialog.open(EventsDialogComponent, {
      width: '300px',
      height: '300px',
      data: { title: this.title, backgroundColor: this.backgroundColor },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.title = result.title;
      this.backgroundColor = result.backgroundColor;
    });
  };
}

@Component({
  selector: 'app-events-dialog',
  templateUrl: 'events-dialog.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class EventsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick = () => {
    this.dialogRef.close();
  };
  submit = (e: Event) => {
    this.dialogRef.close();
  };
}

export interface EventsTableElement {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

@Component({
  selector: 'app-all-events',
  templateUrl: 'all-events.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class AllEventsComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() isAdded = new EventEmitter<boolean>();
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  EVENT_TABLE_DATA: EventsTableElement[] = [];
  selection = new SelectionModel<EventsTableElement>(true, []);
  dataSource: any;
  displayedColumns: string[] = ['select', 'title', 'start', 'end'];

  constructor(
    private eventService: EventService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.eventService.getEventsTableData().subscribe((res) => {
      this.EVENT_TABLE_DATA = res;
      this.dataSource = new MatTableDataSource(res);
    });
  }

  applyFilter = (event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  };

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  masterToggle = () => {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  };

  isAllSelected = () => {
    const numSelected = this.selection.selected.length;
    const numRow = this.dataSource.data.length;
    return numSelected === numRow;
  };

  checkboxLabel = (row?: EventsTableElement) => {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  };

  handleDeleteEvents = () => {
    const idList = this.selection.selected.map((value) => value.id);
    for (const id of idList) {
      this.eventService.deleteEvent(id).subscribe(
        () => {
          console.log('deleted ' + id);
          this.snackBar.open(`Successfully deleted event ${id}`, '', {
            duration: 1000,
          });
        },
        () => {
          this.snackBar.open(`Failed to delete event ${id}`, '', {
            duration: 1000,
          });
        }
      );
    }
    setTimeout(() => window.location.reload(), 2000);
  };

  ngOnChanges(changes: SimpleChanges): void {
    this.isAdded.subscribe((value) => {
      if (value) {
        this.ngOnInit();
      }
    });
  }
}
