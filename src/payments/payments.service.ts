import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
    private readonly stripe = new Stripe(envs.stripeSecret)


   async createPaymentSession(){
 
    const session = await this.stripe.checkout.sessions.create({
        //colocar aqui el Id de la orden
     payment_intent_data:{
        metadata: {
            
        }
     },
     line_items: [{
        price_data: {
            currency: 'usd',
            product_data: {
                name: 'Calcetines Gamer'
            },
            unit_amount: 2000 //20 dollares// 2000 /100 =20.00 esto es en dollares stripe usa dos decimales
        },quantity: 2
     }],
     mode: 'payment',
     success_url: 'http://localhost:3000/success',
     cancel_url: 'http://localhost:3000/cancel'
    })
    return session
    }
}
