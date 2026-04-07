package com.example.ticketmanagement.controller;

import com.example.ticketmanagement.model.Ticket;
import com.example.ticketmanagement.service.TicketService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TicketController.class)
public class TicketControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TicketService ticketService;

    @Test
    public void testGetAllTickets() throws Exception {
        Ticket t1 = new Ticket();
        t1.setId(1L);
        t1.setName("Login Issue");
        t1.setStatus("New");
        Ticket t2 = new Ticket();
        t2.setId(2L);
        t2.setName("Database Config");
        t2.setStatus("Done");

        when(ticketService.getAllTickets()).thenReturn(Arrays.asList(t1, t2));

        mockMvc.perform(get("/api/tickets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].name").value("Login Issue"));
    }

    @Test
    public void testCreateTicket() throws Exception {
        Ticket createdTicket = new Ticket();
        createdTicket.setId(1L);
        createdTicket.setName("API Bug");

        when(ticketService.createTicket(any(Ticket.class))).thenReturn(createdTicket);

        String ticketJson = "{\"name\":\"API Bug\",\"description\":\"Fails on invalid input\",\"status\":\"New\"}";

        mockMvc.perform(post("/api/tickets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(ticketJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("API Bug"));
    }
}
