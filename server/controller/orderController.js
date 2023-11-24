const {
    mutipleMongooseToObject,
    mongooseToObject,
  } = require("../middlerware/Mongoose");
const Order = require("../model/orderSchema");
const Product = require("../model/productSchema");


class orderController {
    async createOrder (req, res){
        try {
            //user: id
            const {orderItems, shippingAddress ,totalPrice, userId} = req.body;
            // console.log(orderItems);
            if (!shippingAddress || !totalPrice) {
                return res.status(200).json({
                    success: 'false',
                    message: 'The input is required'
                });
            }

            const promises = await orderItems.map(async (order)=>{
                // console.log('order', order);
                const productData = await Product.findByIdAndUpdate(
                    {
                        _id: order.product,
                        countInStock: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: -order.amount,
                    }},
                    {new: true}
                )
                if(productData.countInStock < 0) {
                    await Product.findByIdAndUpdate(
                        { _id: order.product},
                        {$inc: { countInStock: +order.amount }},
                        {new: true}
                    );
                    return{
                        status: 'false',
                        message: 'error',
                        id: order.product
                    }
                    
                }
                else {
                    return {
                        success: 'true',
                        message: 'SUCCESS'
                    }
                }
            })
            const results = await Promise.all(promises);
            
            const newData = results && results.filter((item) => item.id);
            
            if(newData.length) {
                const arrId = []
                newData.forEach((item) => {
                    arrId.push(item.id)
                })
                res.status(422).send({
                    success: 'false',
                    message: `San pham voi id: ${arrId.join(',')} khong du hang`,
                })
            } 
            
            else{
                const newOrder = new Order({
                    orderItems,
                    // :{
                    //     ...rest,
                    //     size: JSON.parse(size)
                    // },
                    shippingAddress,
                    totalPrice,
                    user: userId,
                });
                // console.log(newOrder);
                await newOrder.save();
                return res.status(200).json({
                    success: 'true',
                    message: 'Create order successfully',
                    data: newOrder
                });
            }
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: 'false',
                message: 'Error'
            });
        }
    }

    async getOrderDetails  (req, res){
        try {
            const orderId = req.params.id;
            if(!orderId){
                return res.status(200).json({
                    success: 'false',
                    message: 'The orderId is required'
                });
            }
            const order = await Order.findById({ _id: orderId });
            if(!order){
                return res.status(200).json({
                    success: 'false',
                    message: 'The order is not defined'
                });
            }
    
            return res.status(200).json({
                success: 'true',
                message: 'Order detail',
                data: order
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: 'false',
                message: 'Error'
            });
        }
    }

    async cancelOrderDetails (req, res){
        try {
            const data= req.body.orderItems;
            const orderId= req.body.orderId;
            if (!orderId) {
                return res.status(200).json({
                    status: 'ERR',
                    message: 'The orderId is required'
                });
            }

            let order = [];
            const promises = data.map(async(order) =>{
                const productData = await Product.findOneAndUpdate(
                    { _id: order.product},
                    {$inc: {countInStock: +order.amount}},
                    {new: true}
                );
                if(productData) {
                    order = await Order.findByIdAndDelete({_id: orderId})
                    if (order === null) {
                        res.status(200).send({
                            status: 'Err',
                            success: 'false',
                            message: 'The order is not defined'
                        });
                    }
                } 
                else {
                    return{
                        status: 'OK',
                        id: order.product
                    };
                }
            });
            const results = await Promise.all(promises);
            const newData = results && results[0] && results[0].id;
            if(newData) {
                res.status(404).send({
                    status: 'ERR',
                    message: `San pham voi id: ${newData} khong ton tai`
                });
            }
            res.status(200).send({
                status: 'OK',
                message: 'success',
                data: order
            })
        } 
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: 'false',
                message: 'Error'
            });
        }
    }

    async getAllOrderDetails  (req, res){
        const userId = req.params.id;
        if(!userId){
            return res.status(200).json({
                success: 'false',
                message: 'The userId is required'
            });
        }
        const order = await Order.find({ user: userId }).sort({
            createdAt: -1,
            updatedAt: -1
        })
        if(!order){
            return res.status(200).json({
                success: 'false',
                message: 'The order is not defined'
            });
        }

        return res.status(200).json({
            success: 'true',
            message: 'List orders',
            data: order
        });
    }

    async getAllOrder (req, res){
        try {
            const orders =  await Order.find().sort({createdAt: -1, updatedAt: -1}) 
            if(!orders){
                return res.status(200).json({
                    success: 'false',
                    message: 'Order list is empty'
                });
            }
            return res.status(200).json({
                success: 'true',
                message: 'List orders',
                data: orders
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: 'false',
                message: 'Error'
            });
        }
    }
}

module.exports = new orderController();