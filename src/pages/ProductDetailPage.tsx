import { useParams, Link } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShieldCheck, Star, Heart, Share2, ShoppingCart, Truck, MessageCircle } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
          <h2 className="text-xl font-bold text-foreground mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-4">This product doesn't exist.</p>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout showHeader={false}>
      <div className="pb-24">
        {/* Product Image */}
        <div className="relative aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between">
            <Link
              to="/marketplace"
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          {product.isVerified && (
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-heritage-green text-white px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Blockchain Verified</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="px-4 py-6 space-y-6">
          {/* Title & Price */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-xl font-bold text-foreground leading-tight">
                {product.name}
              </h1>
              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </p>
                <p className="text-xs text-heritage-green font-medium">
                  {product.artisanShare}% goes to artisan
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-heritage-gold text-heritage-gold" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {product.reviews} reviews
              </span>
              <span className="text-muted-foreground">•</span>
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-foreground mb-2">About this product</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Artisan Story */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-heritage-gold/10 to-primary/5 border border-heritage-gold/20">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-2xl">{product.artisan.avatar}</span>
              Meet the Artisan
            </h3>
            <div className="space-y-2">
              <p className="font-medium text-foreground">{product.artisan.name}</p>
              <p className="text-sm text-muted-foreground">{product.artisan.village}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.artisan.story}
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-3 rounded-full">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message Artisan
            </Button>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
            <Truck className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Free shipping across India</p>
              <p className="text-xs text-muted-foreground">Delivery in 5-7 business days</p>
            </div>
          </div>
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-16 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-border">
          <div className="flex gap-3 max-w-lg mx-auto">
            <Button variant="outline" size="lg" className="flex-1 rounded-xl">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <Button size="lg" className="flex-1 rounded-xl heritage-button">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
