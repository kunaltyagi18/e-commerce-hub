import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product._id);
  const inCart = isInCart(product._id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/products/${product._id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {discount > 0 && (
              <Badge variant="destructive" className="text-xs">
                -{discount}%
              </Badge>
            )}
            {product.isDigital && (
              <Badge variant="secondary" className="text-xs">
                Digital
              </Badge>
            )}
            {product.stock < 10 && product.stock > 0 && (
              <Badge variant="outline" className="bg-background text-xs">
                Low Stock
              </Badge>
            )}
            {product.stock === 0 && (
              <Badge variant="destructive" className="text-xs">
                Out of Stock
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <Button
            variant="secondary"
            size="icon"
            className={cn(
              "absolute right-2 top-2 h-8 w-8 rounded-full opacity-0 transition-all group-hover:opacity-100",
              inWishlist && "opacity-100 bg-red-100 text-red-600 hover:bg-red-200"
            )}
            onClick={handleWishlistClick}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </Button>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-background/95 p-2 backdrop-blur transition-transform group-hover:translate-y-0">
            <Button
              className="w-full"
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0 || inCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {inCart ? 'In Cart' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
          
          {/* Title */}
          <h3 className="font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.numReviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
