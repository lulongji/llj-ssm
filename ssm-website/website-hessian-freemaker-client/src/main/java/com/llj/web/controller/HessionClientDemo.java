package com.llj.web.controller;

import com.caucho.hessian.client.HessianProxyFactory;
import com.llj.web.api.demo.DemoTestService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
public class HessionClientDemo {


    @RequestMapping("/hession/test")
    public String DemoTest() throws MalformedURLException {
        DemoTestService demoTestService = null;
        try {
            String url = "http://localhost:8080/hessian-server/remote/demotest";
            HessianProxyFactory factory = new HessianProxyFactory();
            demoTestService = (DemoTestService) factory.create(DemoTestService.class, url);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return demoTestService.sayHello("远程调用方式1");

    }

    public static void main(String[] args) throws MalformedURLException {
        String url = "http://localhost:8080/hessian-server/remote/demotest";
        HessianProxyFactory factory = new HessianProxyFactory();
        DemoTestService demoTestService = (DemoTestService) factory.create(DemoTestService.class, url);
        System.out.println("message from hessian : " + demoTestService.sayHello("远程调用方式"));

    }
}
