package padrao_de_projeto.companhia_aerea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
public class CompanhiaAereaApplication {

	public static void main(String[] args) {
		SpringApplication.run(CompanhiaAereaApplication.class, args);
	}

}
