package com.example.ticketmanagement.service;

import com.example.ticketmanagement.model.Ticket;
import com.example.ticketmanagement.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id) {
        return ticketRepository.findById(id).orElse(null);
    }

    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(Long id, Ticket ticketDetails) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket != null) {
            ticket.setName(ticketDetails.getName());
            ticket.setDescription(ticketDetails.getDescription());
            ticket.setStatus(ticketDetails.getStatus());
            return ticketRepository.save(ticket);
        }
        return null;
    }

    public List<Ticket> searchTickets(String query) {
        return ticketRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query, query);
    }

    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
}
