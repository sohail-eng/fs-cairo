import { config } from '@/config';
import { IOrderController } from './interfaces/i-order.controller';
import { OrderController } from './order.controller';
import { OrderControllerDecorator } from './order.controller.decorator';
import { IRestaurantController } from './interfaces/i-restaurant.controller';
import { RestaurantController } from './restaurant.controller';
import { RestaurantControllerDecorator } from './restaurant.controller.decorator';
import { IProductController } from './interfaces/i-product.controller';
import { ProductController } from './product.controller';
import { ProductControllerDecorator } from './product.controller.decorator';

let orderController: IOrderController;

if (config.controllerImplementation === 'decorator') {
  orderController = new OrderControllerDecorator();
} else {
  orderController = new OrderController();
}

export const AppOrderController = orderController;

let restaurantController: IRestaurantController;

if (config.controllerImplementation === 'decorator') {
  restaurantController = new RestaurantControllerDecorator();
} else {
  restaurantController = new RestaurantController();
}

export const AppRestaurantController = restaurantController;

let productController: IProductController;

if (config.controllerImplementation === 'decorator') {
  productController = new ProductControllerDecorator();
} else {
  productController = new ProductController();
}

export const AppProductController = productController;