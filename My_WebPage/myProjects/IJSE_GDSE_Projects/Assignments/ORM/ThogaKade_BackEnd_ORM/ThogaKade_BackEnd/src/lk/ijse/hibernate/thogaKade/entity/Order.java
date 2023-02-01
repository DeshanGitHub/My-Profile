package lk.ijse.hibernate.thogaKade.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "`Order`")
public class Order {

    @Id
    private String oId;
    private String oDate;
    private String oTime;
    private double oCost;

    @ManyToOne
    private Customer customer;
    @OneToMany(mappedBy = "order")
    private List<OrderDetail> orderDetailList=new ArrayList<>();

    public Order() {
    }

    public Order(String oId, String oDate, String oTime, double oCost, Customer customer, List<OrderDetail> orderDetailList) {
        this.oId = oId;
        this.oDate = oDate;
        this.oTime = oTime;
        this.oCost = oCost;
        this.customer = customer;
        this.orderDetailList = orderDetailList;
    }

    public String getoId() {
        return oId;
    }

    public void setoId(String oId) {
        this.oId = oId;
    }

    public String getoDate() {
        return oDate;
    }

    public void setoDate(String oDate) {
        this.oDate = oDate;
    }

    public String getoTime() {
        return oTime;
    }

    public void setoTime(String oTime) {
        this.oTime = oTime;
    }

    public double getoCost() {
        return oCost;
    }

    public void setoCost(double oCost) {
        this.oCost = oCost;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<OrderDetail> getOrderDetailList() {
        return orderDetailList;
    }

    public void setOrderDetailList(List<OrderDetail> orderDetailList) {
        this.orderDetailList = orderDetailList;
    }

    @Override
    public String toString() {
        return "Order{" +
                "oId='" + oId + '\'' +
                ", oDate='" + oDate + '\'' +
                ", oTime='" + oTime + '\'' +
                ", oCost=" + oCost +
                ", customer=" + customer +
                ", orderDetailList=" + orderDetailList +
                '}';
    }
}
