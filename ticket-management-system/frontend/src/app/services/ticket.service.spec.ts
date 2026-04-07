import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TicketService, Ticket } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TicketService]
    });
    service = TestBed.inject(TicketService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding requests
  });

  it('should fetch all tickets successfully', () => {
    const mockTickets: Ticket[] = [
      { id: 1, name: 'Setup DB', description: 'desc', status: 'Done' }
    ];

    service.getTickets().subscribe(tickets => {
      expect(tickets.length).toBe(1);
      expect(tickets[0].name).toEqual('Setup DB');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tickets');
    expect(req.request.method).toBe('GET');
    req.flush(mockTickets);
  });

  it('should create a new ticket', () => {
    const newTicket: Ticket = { name: 'UI Bug', description: 'Screen flashes', status: 'New' };

    service.createTicket(newTicket).subscribe(ticket => {
      expect(ticket.name).toEqual('UI Bug');
    });

    const req = httpMock.expectOne('http://localhost:8080/api/tickets');
    expect(req.request.method).toBe('POST');
    req.flush({ id: 2, ...newTicket });
  });
});
