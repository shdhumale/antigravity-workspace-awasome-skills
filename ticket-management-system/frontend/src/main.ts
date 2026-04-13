import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TicketDashboardComponent } from './app/components/ticket-dashboard/ticket-dashboard.component';

bootstrapApplication(TicketDashboardComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations()
  ]
}).catch(err => console.error(err));
