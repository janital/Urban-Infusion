package no.ntnu.appdevapi.DAO;

import no.ntnu.appdevapi.entities.OrderDetails;
import no.ntnu.appdevapi.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for order details.
 */
@Repository
public interface OrderDetailsRepository extends CrudRepository<OrderDetails, Long> {

    List<OrderDetails> findAllByUser(User user);
}
