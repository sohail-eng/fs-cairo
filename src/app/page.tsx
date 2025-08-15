"use client";

import { useEffect, useState } from "react";
import { Restaurant } from "@prisma/client";
import RestaurantItem from "@/components/restaurant-item";

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('/api/restaurants');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
    } };

    fetchRestaurants();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="mb-2 text-3xl font-bold">Welcome!</h1>
        <p className="mb-6 text-muted-foreground">
          Choose a restaurant and start ordering.
        </p>
        <p>Loading restaurants...</p>
      </div>
  ); }

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
); };

export default HomePage;