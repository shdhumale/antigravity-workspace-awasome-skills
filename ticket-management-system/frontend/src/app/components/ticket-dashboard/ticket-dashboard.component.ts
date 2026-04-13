import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TicketService, Ticket } from '../../services/ticket.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="dashboard-container">
      <h1>Ticket Management Dashboard</h1>
      
      <div class="search-bar">
        <input type="text" [(ngModel)]="searchQuery" placeholder="Search tickets..." (keyup)="onSearch()">
        <button (click)="onSearch()">Search</button>
        <button class="create-btn" (click)="openCreateModal()">+ New Ticket</button>
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
                <div class="actions">
                  <button (click)="editTicket(ticket)">Edit</button>
                  <button class="danger" (click)="deleteTicket(ticket.id!)">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div *ngIf="loading()">Loading tickets...</div>

      <!-- Create Modal Overlay -->
      <div class="edit-overlay" *ngIf="isCreating()">
        <div class="edit-modal">
          <h2>Create New Ticket</h2>
          <div class="form-group">
            <label>Name</label>
            <input type="text" [(ngModel)]="newTicket().name" placeholder="Enter ticket name">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="newTicket().description" placeholder="Enter ticket description"></textarea>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select [(ngModel)]="newTicket().status">
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div class="modal-actions">
            <button (click)="saveNewTicket()" [disabled]="isSaving()">
              {{ isSaving() ? 'Creating...' : 'Create Ticket' }}
            </button>
            <button class="secondary" (click)="cancelCreate()">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Edit Modal Overlay -->
      <div class="edit-overlay" *ngIf="editingTicket()">
        <div class="edit-modal">
          <h2>Edit Ticket</h2>
          <div class="form-group">
            <label>Name</label>
            <input type="text" [(ngModel)]="editingTicket()!.name">
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="editingTicket()!.description"></textarea>
          </div>
          <div class="form-group">
            <label>Status</label>
            <select [(ngModel)]="editingTicket()!.status">
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>
          <div class="modal-actions">
            <button (click)="saveEdit()" [disabled]="isSaving()">
              {{ isSaving() ? 'Saving...' : 'Save Changes' }}
            </button>
            <button class="secondary" (click)="cancelEdit()">Cancel</button>
          </div>
        </div>
      </div>
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
  editingTicket = signal<Ticket | null>(null);
  isCreating = signal<boolean>(false);
  newTicket = signal<Ticket>({ name: '', description: '', status: 'OPEN' });
  isSaving = signal<boolean>(false);

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

  openCreateModal(): void {
    this.newTicket.set({ name: '', description: '', status: 'OPEN' });
    this.isCreating.set(true);
  }

  saveNewTicket(): void {
    const ticket = this.newTicket();
    if (ticket.name && ticket.description) {
      this.isSaving.set(true);
      this.ticketService.createTicket(ticket).subscribe({
        next: () => {
          this.loadTickets();
          this.isCreating.set(false);
          this.isSaving.set(false);
          alert('Ticket created successfully!');
        },
        error: () => {
          this.error.set('Failed to create ticket');
          this.isSaving.set(false);
        }
      });
    } else {
      alert('Please fill in all fields');
    }
  }

  cancelCreate(): void {
    this.isCreating.set(false);
  }

  editTicket(ticket: Ticket): void {
    // Create a deep copy to avoid modifying the list item before saving
    this.editingTicket.set({ ...ticket });
  }

  saveEdit(): void {
    const ticket = this.editingTicket();
    if (ticket && ticket.id) {
      this.isSaving.set(true);
      this.ticketService.updateTicket(ticket.id, ticket).subscribe({
        next: () => {
          this.loadTickets();
          this.editingTicket.set(null);
          this.isSaving.set(false);
          alert('Ticket updated successfully!');
        },
        error: () => {
          this.error.set('Failed to update ticket');
          this.isSaving.set(false);
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingTicket.set(null);
  }
}
