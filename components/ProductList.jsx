import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((p) => (
        <ProductCard key={p._id} {...p} />
      ))}
    </div>
  );
}
