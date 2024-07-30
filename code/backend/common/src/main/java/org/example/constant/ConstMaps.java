package org.example.constant;

import jakarta.annotation.PostConstruct;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;


import java.util.HashMap;
import java.util.Map;

@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ConstMaps {
    private Map<Integer,String> identityMap;
    private Map<Integer,String> sleepScheduleMap;
    private Map<Integer,String> challengeMap;
    @PostConstruct
    public void init() {
        // 添加固定的初始数据
        identityMap =new HashMap<>();
        identityMap.put(1, "Student");
        identityMap.put(2, "Office Worker");
        identityMap.put(3, "Freelancer");
        identityMap.put(4, "Homemaker");
        identityMap.put(5, "Entrepreneur");
        identityMap.put(6, "Others");

        sleepScheduleMap = new HashMap<>();
        sleepScheduleMap.put(1, "Less than 6 hours");
        sleepScheduleMap.put(2, "6-7 hours");
        sleepScheduleMap.put(3, "7-8 hours");
        sleepScheduleMap.put(4, "More than 8 hours");

        challengeMap = new HashMap<>();
        challengeMap.put(1, "Inability to concentrate");
        challengeMap.put(2, "Too many tasks");
        challengeMap.put(3, "Lack of prioritisation");
        challengeMap.put(4, "Confusing schedule");
        challengeMap.put(5, "Others");
    }
}
