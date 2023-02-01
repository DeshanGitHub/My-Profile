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
import java.sql.ResultSet;
import java.sql.SQLException;

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("item servlet doPut method invoked..");

        JsonReader reader = Json.createReader(req.getReader());
        JsonObject item = reader.readObject();

        String code = item.getString("code");
        String name = item.getString("name");
        int qty = Integer.parseInt(item.getString("qty"));
        double unitPrice = Double.parseDouble(item.getString("price"));

        try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {

            PreparedStatement psmt = connection.prepareStatement("UPDATE item SET Name=?,qty=?,price=? WHERE Code=?");
            psmt.setObject(1, name);
            psmt.setObject(2, qty);
            psmt.setObject(3, unitPrice);
            psmt.setObject(4, code);

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            if (psmt.executeUpdate() > 0) {
                objectBuilder.add("state", "done");
                objectBuilder.add("message", "Successfully Updated..");
            } else {
                objectBuilder.add("state", "Error");
                objectBuilder.add("message", "No Customer For the Given ID..!");
                resp.setStatus(400);
            }
            resp.getWriter().print(objectBuilder.build());

        } catch (SQLException e) {
            JsonObjectBuilder jsonObject = Json.createObjectBuilder();
            jsonObject.add("state", "error");
            jsonObject.add("message", e.getMessage());
            resp.getWriter().print(jsonObject.build());
            resp.setStatus(400);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("item servlet doDelete method invoked..");

        String code = req.getParameter("code");

        try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {
            PreparedStatement psmt = connection.prepareStatement("DELETE FROM item WHERE Code=?");
            psmt.setObject(1, code);

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            if (psmt.executeUpdate() > 0) {
                objectBuilder.add("state", "done");
                objectBuilder.add("message", "Successfully Deleted..");
            } else {
                objectBuilder.add("state", "error");
                objectBuilder.add("message", "No such Item to delete..");
                resp.setStatus(400);
            }

            resp.getWriter().print(objectBuilder.build());
        } catch (SQLException e) {
            JsonObjectBuilder jsonObject = Json.createObjectBuilder();
            jsonObject.add("state", "error");
            jsonObject.add("message", e.getMessage());
            resp.getWriter().print(jsonObject.build());
            resp.setStatus(400);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("item servlet doPost method invoked..");

        String code = req.getParameter("itemCode");
        String name = req.getParameter("itemName");
        int qty = Integer.parseInt(req.getParameter("itemQTY"));
        double price = Double.parseDouble(req.getParameter("itemUnitPrice"));

        try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {
            PreparedStatement psmt = connection.prepareStatement("INSERT INTO Item VALUES (?,?,?,?)");

            psmt.setObject(1, code);
            psmt.setObject(2, name);
            psmt.setObject(3, qty);
            psmt.setObject(4, price);

            if (psmt.executeUpdate() > 0) {
                System.out.println("Item Saved..");

                JsonObjectBuilder jsonObject = Json.createObjectBuilder();
                jsonObject.add("state", "success");
                jsonObject.add("message", "Item Saved");
                resp.getWriter().print(jsonObject.build());
            } else {
                JsonObjectBuilder jsonObject = Json.createObjectBuilder();
                jsonObject.add("state", "error");
                jsonObject.add("message", "Item Unsaved");
                resp.getWriter().print(jsonObject.build());
                resp.setStatus(500);
            }

        } catch (SQLException e) {
            JsonObjectBuilder jsonObject = Json.createObjectBuilder();
            jsonObject.add("state", "error");
            jsonObject.add("message", e.getMessage());
            resp.getWriter().print(jsonObject.build());
            resp.setStatus(400);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("item servlet doGet method invoked..");

        try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {

            PreparedStatement psmt = connection.prepareStatement("SELECT * FROM item");
            ResultSet rst = psmt.executeQuery();

            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

            while (rst.next()) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("itmID", rst.getString("Code"));
                objectBuilder.add("itmName", rst.getString("Name"));
                objectBuilder.add("itmQTY", rst.getInt("qty"));
                objectBuilder.add("itmPrice", rst.getDouble("price"));
                arrayBuilder.add(objectBuilder.build());
            }

            resp.setContentType("application/json");

            JsonObjectBuilder responseObject = Json.createObjectBuilder();
            responseObject.add("state", "done");
            responseObject.add("message", "successful");
            responseObject.add("data", arrayBuilder.build());
            resp.getWriter().print(responseObject.build());
        } catch (SQLException e) {
            JsonObjectBuilder jsonObject = Json.createObjectBuilder();
            jsonObject.add("state", "error");
            jsonObject.add("message", e.getMessage());
            resp.getWriter().print(jsonObject.build());
            resp.setStatus(400);
        }
    }
}
