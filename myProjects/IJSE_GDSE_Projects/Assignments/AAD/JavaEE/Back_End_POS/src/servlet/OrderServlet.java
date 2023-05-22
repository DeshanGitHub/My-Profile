package servlet;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.json.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/purchase")
public class OrderServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try (Connection con = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {
            con.setAutoCommit(false);

            JsonReader reader = Json.createReader(req.getReader());
            JsonObject requestObject = reader.readObject();
            String orderId = requestObject.getString("oId");
            String customerId = requestObject.getString("cId");
            String orderDate = requestObject.getString("oDate");
            String orderTime = requestObject.getString("oTime");
            double orderCost = requestObject.getInt("oCost");

            PreparedStatement psmt = con.prepareStatement("INSERT INTO `order` VALUES (?,?,?,?,?)");
            psmt.setObject(1, orderId);
            psmt.setObject(2, customerId);
            psmt.setObject(3, orderDate);
            psmt.setObject(4, orderTime);
            psmt.setObject(5, orderCost);

            if (!(psmt.executeUpdate() > 0)) {
                con.rollback();
                con.setAutoCommit(true);
                throw new RuntimeException("Can't Save the Order! There is a problem with saving data to order table..");
            } else {
                JsonArray orderDetails = requestObject.getJsonArray("oDetails");
                for (JsonValue detail : orderDetails) {
                    String itemCode = detail.asJsonObject().getString("code");
                    int itemQty = Integer.parseInt(detail.asJsonObject().getString("qty"));
                    double cost = Double.parseDouble(detail.asJsonObject().getString("cost"));

                    PreparedStatement psmt2 = con.prepareStatement("INSERT INTO orderdetail VALUES(?,?,?,?)");
                    psmt2.setObject(1, orderId);
                    psmt2.setObject(2, itemCode);
                    psmt2.setObject(3, itemQty);
                    psmt2.setObject(4, cost);

                    if (!(psmt2.executeUpdate() > 0)) {
                        con.rollback();
                        con.setAutoCommit(true);
                        throw new RuntimeException("Can't Save the Order! There is a problem with saving data to orderDetail table..");
                    } else {
                        PreparedStatement psmt3 = con.prepareStatement("UPDATE item SET qty=(qty-" + itemQty + ") WHERE Code='" + itemCode + "'");
                        if (!(psmt3.executeUpdate() > 0)) {
                            con.rollback();
                            con.setAutoCommit(true);
                            throw new RuntimeException("Can't Save the Order! There is a problem with updating data to item table..");
                        }
                    }
                }
                con.commit();
                con.setAutoCommit(true);

                JsonObjectBuilder responseObject = Json.createObjectBuilder();
                responseObject.add("state", "done");
                responseObject.add("message", "Successfully Purchased.");
                responseObject.add("data", "");

                resp.getWriter().print(responseObject.build());
            }

        } catch (SQLException | RuntimeException e) {
            JsonObjectBuilder responseErrorObject = Json.createObjectBuilder();
            responseErrorObject.add("state", "error");
            responseErrorObject.add("message", e.getMessage());
            responseErrorObject.add("data", "");

            resp.getWriter().print(responseErrorObject.build());
            resp.setStatus(500);
        }
    }
}
