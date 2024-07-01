package org.example.backend.controller;

import org.example.backend.entity.Result;
import org.example.backend.entity.Speciality;
import org.example.backend.service.SpecialityService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/speciality")
public class SpecialityController {
    SpecialityService service;
    public SpecialityController(SpecialityService service) {
        this.service = service;
    }
    @GetMapping("/list")
    public Result<List<Speciality>> list() {
        return service.getSpecialities();
    }
}
