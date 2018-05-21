package com.llj.web.service.demo.impl;

import org.springframework.stereotype.Service;

import com.llj.web.api.demo.DemoTestService;

@Service
public class DemoTestServiceImpl implements DemoTestService {

    @Override
    public String sayHello(String message) {
        return "Hello!" + message;
    }

}
