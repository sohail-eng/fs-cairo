import { notFound } from "next/navigation";
import RestaurantCategories from "./components/categories";
import RestaurantHeader from "./components/header";
import { RestaurantController } from "@/controllers/restaurant.controller";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ orderType: string }>;
}

const isOrderTypeValid = (orderType: string) => {
  return ["DINEIN", "TAKEAWAY"].includes(orderType.toUpperCase());
};

const restaurantController = new RestaurantController();

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { orderType } = await searchParams;

  if (!isOrderTypeValid(orderType)) {
    return notFound();
  }

  const { success, restaurant } = await restaurantController.getRestaurantWithCategories(slug);

  if (!success || !restaurant) {
    return notFound();
  }

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
); };

export default RestaurantMenuPage;