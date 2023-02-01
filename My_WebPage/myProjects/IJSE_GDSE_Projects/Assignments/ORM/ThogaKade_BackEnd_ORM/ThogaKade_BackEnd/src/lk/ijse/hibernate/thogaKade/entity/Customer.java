package lk.ijse.hibernate.thogaKade.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Customer {

    @Id
    private String cId;
    private String name;
    private String address;
    private String phoneNumber;

    @OneToMany(mappedBy = "customer")
    private List<Order> orderList=new ArrayList<>();

    public Customer() {
    }

    public Customer(String cId, String name, String address, String phoneNumber, List<Order> orderList) {
        this.cId = cId;
        this.name = name;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.orderList = orderList;
    }

    public String getcId() {
        return cId;
    }

    public void setcId(String cId) {
        this.cId = cId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<Order> getOrderList() {
        return orderList;
    }

    public void setOrderList(List<Order> orderList) {
        this.orderList = orderList;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "cId='" + cId + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", orderList=" + orderList +
                '}';
    }
}
