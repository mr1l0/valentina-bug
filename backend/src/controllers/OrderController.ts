import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Order} from "../entity/Order";
import { OrderItem } from "../entity/OrderItem";

export class OrderController {

    //private userRepository = getRepository(User);

    static async all(request: Request, response: Response, next: NextFunction) {
        const orderRepository = getRepository(Order);
        return response.send(await orderRepository.find());
    }

    static async one(request: Request, response: Response, next: NextFunction) {
        const orderRepository = getRepository(Order);
        return response.send(await orderRepository.findOne(request.params.id));
    }

    static async save(request: Request, response: Response, next: NextFunction) {
        const orderRepository = getRepository(Order);        
        const orderItemRepository = getRepository(OrderItem);        

        let order = await orderRepository.save<Order>(request.body);
        
        request.body.orderItem.forEach(async item => {
            const orderItem: OrderItem = {order, ...item};            
            
            return await orderItemRepository.save<OrderItem>(orderItem);            
        });
        
        return response.send(order);
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        const orderRepository = getRepository(Order);
        let userToRemove = await orderRepository.findOne(request.params.id);
        await orderRepository.remove(userToRemove);
    }

}