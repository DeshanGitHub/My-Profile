package lk.ijse.hibernate.thogaKade.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class OrderDetail {
    @Id
    private String id;

    @ManyToOne
    private Order order;

    @ManyToOne
    private Item item;

    private int qty;
    private double cost;

    public OrderDetail() {
    }

    public OrderDetail(String id, Order order, Item item, int qty, double cost) {
        this.id = id;
        this.order = order;
        this.item = item;
        this.qty = qty;
        this.cost = cost;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    @Override
    public String toString() {
        return "OrderDetail{" +
                "id='" + id + '\'' +
                ", order=" + order +
                ", item=" + item +
                ", qty=" + qty +
                ", cost=" + cost +
                '}';
    }
}
