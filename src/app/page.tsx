import RestaurantItem from "@/components/restaurant-item";
import { RestaurantController } from "@/controllers/restaurant.controller";

const restaurantController = new RestaurantController();

const HomePage = async () => {
  const { restaurants } = await restaurantController.getAllRestaurants();

  return (
    <div className="p-6">
      <h1 className="mb-2 text-3xl font-bold">Welcome!</h1>
      <p className="mb-6 text-muted-foreground">
        Choose a restaurant and start ordering.
      </p>

      <div className="flex flex-col gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;