import { notFound } from "next/navigation";
import ProductDetails from "./components/productDetails";
import ProductHeader from "./components/productHeader";
import { ProductController } from "@/controllers/product.controller";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const productController = new ProductController();

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const { success, product } = await productController.getProductById(productId);

  if (!success || !product) {
    return notFound();
  }

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
); };

export default ProductPage;