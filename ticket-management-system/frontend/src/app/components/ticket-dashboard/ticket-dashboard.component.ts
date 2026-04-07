import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <h1>Ticket Management Dashboard</h1>
      
      <div class="search-bar">
        <input type="text" [(ngModel)]="searchQuery" placeholder="Search tickets..." (keyup)="onSearch()">
        <button (click)="onSearch()">Search</button>
      </div>

      <div class="ticket-list" *ngIf="!loading()">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ticket of tickets()">
              <td>{{ ticket.id }}</td>
              <td>{{ ticket.name }}</td>
              <td>{{ ticket.description }}</td>
              <td>{{ ticket.status }}</td>
              <td>
                <button (click)="editTicket(ticket)">Edit</button>
                <button class="danger" (click)="deleteTicket(ticket.id!)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="loading()">Loading tickets...</div>
    </div>
  `,
  styleUrls: ['./ticket-dashboard.component.css']
})
export class TicketDashboardComponent implements OnInit {
  private ticketService = inject(TicketService);

  // Angular Signals for state management
  tickets = signal<Ticket[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  searchQuery = '';

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading.set(true);
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load tickets');
        this.loading.set(false);
      }
    });
  }

  onSearch(): void {
    this.loading.set(true);
    if (!this.searchQuery.trim()) {
      this.loadTickets();
      return;
    }
    this.ticketService.searchTickets(this.searchQuery).subscribe({
      next: (data) => {
        this.tickets.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  deleteTicket(id: number): void {
    if (confirm('Are you sure you want to delete this ticket?')) {
      this.ticketService.deleteTicket(id).subscribe(() => this.loadTickets());
    }
  }

  editTicket(ticket: Ticket): void {
     // Navigation logic to Edit Screen
     console.log('Edit requested for:', ticket.id);
  }
}
