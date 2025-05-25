package backend;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final List<Product> products = new ArrayList<>();

    @PostMapping("/add")
    public String addProduct(@RequestBody Product product) {
        products.add(product);
        return "Product added successfully!";
    }

    @GetMapping("/list")
    public List<Product> getProducts() {
        return products;
    }

    @DeleteMapping("/delete/{title}")
    public String deleteProduct(@PathVariable String title) {
        products.removeIf(product -> product.getTitle().equalsIgnoreCase(title));
        return "Product removed!";
    }
}
