import { Link } from "react-router-dom";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground">Explore Categories</h3>
      <div className="grid grid-cols-4 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-heritage transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
              {category.icon}
            </div>
            <span className="text-xs font-medium text-center text-foreground leading-tight">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
