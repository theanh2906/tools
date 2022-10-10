package com.example.backend.rest;

import com.example.backend.dtos.Message;
import com.example.backend.dtos.OutputMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@RequestMapping("/api")
public class SocketController {
    @MessageMapping("/chat")
    @SendTo("/topic/message")
    public OutputMessage send(final Message message) {
        final String time = new SimpleDateFormat("HH:mm:ss").format(new Date());
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }
}
