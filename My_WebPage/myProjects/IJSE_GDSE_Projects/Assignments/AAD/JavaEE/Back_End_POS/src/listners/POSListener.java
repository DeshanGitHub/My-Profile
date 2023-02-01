package listners;

import org.apache.commons.dbcp2.BasicDataSource;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener
public class POSListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("POS Listener Invoked");

        BasicDataSource bds = new BasicDataSource();
        bds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        bds.setUrl("jdbc:mysql://localhost:3306/javaee_pos");
        bds.setUsername("root");
        bds.setPassword("1234");
        bds.setMaxTotal(2);
        bds.setInitialSize(2);
        ServletContext servletContext = servletContextEvent.getServletContext();
        servletContext.setAttribute("dbcp",bds);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
