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

@WebServlet(urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JsonReader reader = Json.createReader(req.getReader());
        JsonObject customer = reader.readObject();
        String id = customer.getString("id");
        String name = customer.getString("name");
        String address = customer.getString("address");
        String phnNum = customer.getString("phnNum");

        resp.setContentType("application/json");


        try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {

            PreparedStatement psmt2 = connection.prepareStatement("update Customer set Name=?,Address=?,PhoneNumber=? where CID=?");
            psmt2.setObject(4, id);
            psmt2.setObject(1, name);
            psmt2.setObject(2, address);
            psmt2.setObject(3, phnNum);

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();

            if (psmt2.executeUpdate() > 0) {
                System.out.println("Customer Successfully Updated");

                objectBuilder.add("state", "done");
                objectBuilder.add("message", "Customer Successfully Updated");
            } else {
                objectBuilder.add("state", "Error");
                objectBuilder.add("message", "No Customer For the Given ID..!");
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
        System.out.println("Request Received to Customer servlet doDelete method");

        String cID = req.getParameter("cID");
        System.out.println(cID);


        try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {

            PreparedStatement psmt = connection.prepareStatement("DELETE FROM Customer WHERE CID=?");
            psmt.setObject(1, cID);

            JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
            resp.setContentType("application/json");

            if (psmt.executeUpdate() > 0) {
                objectBuilder.add("state", "done");
                objectBuilder.add("message", "Successfully Deleted..");
            } else {
                objectBuilder.add("state", "error");
                objectBuilder.add("message", "No such Customer to Delete..!");
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
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Request Received to Customer servlet doGet method");

        try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {

            PreparedStatement psmt = connection.prepareStatement("SELECT * FROM Customer");
            ResultSet rst = psmt.executeQuery();
            JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();

            while (rst.next()) {
                JsonObjectBuilder objectBuilder = Json.createObjectBuilder();
                objectBuilder.add("cId", rst.getString("CID"));
                objectBuilder.add("cName", rst.getString("Name"));
                objectBuilder.add("cAddress", rst.getString("Address"));
                objectBuilder.add("cPhnNum", rst.getString("PhoneNumber"));
                arrayBuilder.add(objectBuilder.build());
            }

            resp.setContentType("application/json");

            JsonObjectBuilder responseObject = Json.createObjectBuilder();
            responseObject.add("state", "done");
            responseObject.add("message", "Successfully done");
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

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Request Received for doPost method");

        String id = req.getParameter("cID");
        String name = req.getParameter("cName");
        String address = req.getParameter("cAddress");
        String telNumber = req.getParameter("cTelNum");
        resp.setContentType("application/json");

        System.out.println("Customer is " + id + name + address + telNumber);

        if (!id.equals("")) {

            try (Connection connection = ((BasicDataSource) getServletContext().getAttribute("dbcp")).getConnection()) {

                PreparedStatement psmt1 = connection.prepareStatement("INSERT INTO customer VALUES (?,?,?,?)");
                psmt1.setObject(1, id);
                psmt1.setObject(2, name);
                psmt1.setObject(3, address);
                psmt1.setObject(4, telNumber);

                JsonObjectBuilder jsonObject = Json.createObjectBuilder();

                if (psmt1.executeUpdate() > 0) {
                    jsonObject.add("state", "done");
                    jsonObject.add("message", "successfully Saved");

                } else {
                    jsonObject.add("state", "error");
                    jsonObject.add("message", "Customer Not Saved..");
                    resp.setStatus(400);
                }
                resp.getWriter().print(jsonObject.build());

            } catch (SQLException e) {
                JsonObjectBuilder jsonObject = Json.createObjectBuilder();
                jsonObject.add("state", "error");
                jsonObject.add("message", e.getMessage());
                resp.getWriter().print(jsonObject.build());
                resp.setStatus(400);
            }

        } else {
            JsonObjectBuilder jsonObject = Json.createObjectBuilder();
            jsonObject.add("state", "error");
            jsonObject.add("message", "Please enter the Customer ID !!");
            resp.getWriter().print(jsonObject.build());
            resp.setStatus(400);
        }

    }
}
