package no.ntnu.appdevapi.services;

import no.ntnu.appdevapi.entities.Product;
import no.ntnu.appdevapi.DAO.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(long id) {
        Optional<Product> p = productRepository.findById(id);
        return p.orElse(null);
    }

    public Product addProduct(Product product) {
        if (productRepository.findByName(product.getName()) == null) {
            productRepository.save(product);
        }
        return productRepository.findByName(product.getName());
    }

    public void deleteProduct(long id) {
        productRepository.deleteById(id);
    }
}