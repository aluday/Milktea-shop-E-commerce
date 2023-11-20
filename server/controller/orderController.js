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
            const {orderItems, itemPrice, shippingPrice,totalPrice, fullname,address, city,phone, user, isPaid, paidAt} = req.body;
            if (!itemPrice || !shippingPrice || !totalPrice || !fullname || !address || !city || !phone) {
                return res.status(200).json({
                    success: 'false',
                    message: 'The input is required'
                });
            }

            const promises = await orderItems.map(async (order)=>{
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
                if(productData) {
                    return {
                        success: 'true',
                        message: 'SUCCESS'
                    }
                }
                 else {
                    return{
                        status: 'false',
                        message: 'error',
                        id: order.product
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
                res.status(200).send({
                    success: 'false',
                    message: `San pham voi id: ${arrId.join(',')} khong du hang`
                })
            } 
            else{
                const newOrder = new Product({
                    orderItems,
                    shippingAddress: {
                        fullname,
                        address,
                        city,
                        phone
                    },
                    itemPrice,
                    shippingPrice,
                    totalPrice,
                    user: user,
                    isPaid,
                    paidAt,
                });
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

    // async cancelOrderDetails (req, res){
    //     try {
    //         const data= req.body.orderItems;
    //         const orderId= req.body.orderId;
    //         if (!orderId) {
    //             return res.status(200).json({
    //                 status: 'ERR',
    //                 message: 'The orderId is required'
    //             });
    //         }

    //         let order = [];
    //         const promises = data.map(async(order) =>{
    //             const productData = await Product.findOneAndUpdate(
    //                 {
    //                     _id: order.product
    //                 },
    //                 {$inc: {
    //                     countInStock: +order.amount,
    //                 }},
    //                 {new: true}
    //             );
    //             if(productData) {
    //                 order = await Order.findByIdAndDelete(id)
    //                 if (order === null) {
    //                     res.status(200).send({
    //                         status: 'Err',
    //                         success: 'false',
    //                         message: 'The order is not defined'
    //                     });
    //                 }
    //             } else {
    //                 return{
    //                     status: 'OK',
    //                     id: order.product
    //                 };
    //             }
    //         });
    //     } 
    //     catch (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             success: 'false',
    //             message: 'Error'
    //         });
    //     }
    // }

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