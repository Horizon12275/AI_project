package org.example.backend.service.Impl;

import org.example.backend.entity.Event;
import org.example.backend.entity.Result;
import org.example.backend.repository.EventRepo;
import org.example.backend.repository.UserRepo;
import org.example.backend.service.EventService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepo repo;
    private final UserRepo userRepo;
    public EventServiceImpl(EventRepo repo, UserRepo userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }
    public int getUid() {//从数据库里查询id
        //String username = ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        //return userRepo.findUserByUsername(username).getId();
        return 1;
    }
    @Override
    public int[] getNumsByMonth(int year, int month) {
        int[] res = new int[31];
        List<Event> events = repo.getEventsByDateAfterAndDateBeforeAndUserId(java.time.LocalDate.of(year, month, 1), java.time.LocalDate.of(year, month, 1).plusMonths(1), 1);
        for (Event event : events) {
            res[event.getDate().getDayOfMonth() - 1]++;
        }
        return res;
    }
    @Override
    public List<Event> getEventsByDate(LocalDate date) {
        return repo.getEventsByDateAndUserId(date, 1);
    }
    @Override
    public Result<Event> addEvent(Event event) {
        int uid = getUid();
        event.setUser(userRepo.findById(uid).orElse(null));
        repo.save(event);
        return Result.success(event);
    }
}
