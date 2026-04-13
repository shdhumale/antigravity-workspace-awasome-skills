/// <reference types="jasmine" />
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

  it('should set editingTicket when edit button is clicked', () => {
    const ticket = { id: 1, name: 'Setup', description: 'desc', status: 'OPEN' };
    component.editTicket(ticket);
    expect(component.editingTicket()).toEqual(ticket);
    expect(component.editingTicket()).not.toBe(ticket); // Should be a copy
  });

  it('should call updateTicket when saveEdit is called', () => {
    const ticket = { id: 1, name: 'Setup', description: 'desc', status: 'OPEN' };
    mockTicketService.updateTicket = jasmine.createSpy().and.returnValue(of(ticket));
    component.editingTicket.set(ticket);
    
    component.saveEdit();
    
    expect(mockTicketService.updateTicket).toHaveBeenCalledWith(1, ticket);
    expect(component.editingTicket()).toBeNull();
  });

  it('should initialize newTicket and set isCreating to true when openCreateModal is called', () => {
    component.openCreateModal();
    expect(component.isCreating()).toBeTrue();
    expect(component.newTicket()).toEqual({ name: '', description: '', status: 'OPEN' });
  });

  it('should call createTicket when saveNewTicket is called with valid data', () => {
    const ticket = { name: 'New Task', description: 'New description', status: 'OPEN' };
    mockTicketService.createTicket = jasmine.createSpy().and.returnValue(of({ ...ticket, id: 2 }));
    component.newTicket.set(ticket);
    
    component.saveNewTicket();
    
    expect(mockTicketService.createTicket).toHaveBeenCalledWith(ticket);
    expect(component.isCreating()).toBeFalse();
    expect(mockTicketService.getTickets).toHaveBeenCalled();
  });
});
