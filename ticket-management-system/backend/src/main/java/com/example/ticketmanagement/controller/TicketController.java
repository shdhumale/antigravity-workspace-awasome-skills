package com.example.ticketmanagement.controller;

import com.example.ticketmanagement.model.Ticket;
import com.example.ticketmanagement.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "${cors.allowed.origins}")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicketById(id);
        return ticket != null ? ResponseEntity.ok(ticket) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public Ticket createTicket(@Valid @RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(
            @PathVariable Long id,
            @RequestBody(required = false) Ticket ticketDetails,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) String status) {

        Ticket details = ticketDetails != null ? ticketDetails : new Ticket();
        if (name != null)
            details.setName(name);
        if (description != null)
            details.setDescription(description);
        if (status != null)
            details.setStatus(status);

        Ticket updatedTicket = ticketService.updateTicket(id, details);
        return updatedTicket != null ? ResponseEntity.ok(updatedTicket) : ResponseEntity.notFound().build();
    }

    @GetMapping("/search")
    public List<Ticket> searchTickets(@RequestParam String query) {
        return ticketService.searchTickets(query);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
}
