import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketDashboardComponent } from './ticket-dashboard.component';
import { TicketService } from '../../services/ticket.service';
import { of, throwError } from 'rxjs';

describe('TicketDashboardComponent', () => {
  let component: TicketDashboardComponent;
  let fixture: ComponentFixture<TicketDashboardComponent>;
  let mockTicketService: any;

  beforeEach(async () => {
    // Create a mock tracking the service responses
    mockTicketService = {
      getTickets: jasmine.createSpy().and.returnValue(of([
        { id: 1, name: 'Setup', description: 'desc', status: 'New' }
      ])),
      searchTickets: jasmine.createSpy().and.returnValue(of([])),
      deleteTicket: jasmine.createSpy().and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [TicketDashboardComponent], // Uses Standalone component import
      providers: [
        { provide: TicketService, useValue: mockTicketService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TicketDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Trigger ngOnInit
  });

  it('should compile and load tickets on init', () => {
    expect(component).toBeTruthy();
    expect(mockTicketService.getTickets).toHaveBeenCalled();
    // Validate signals loaded
    expect(component.tickets().length).toBe(1);
    expect(component.loading()).toBeFalse();
  });

  it('should search tickets when string is provided', () => {
    component.searchQuery = 'Setup';
    component.onSearch();
    expect(mockTicketService.searchTickets).toHaveBeenCalledWith('Setup');
  });
});
