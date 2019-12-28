const express = require('express');
const app = express();
const mongoose = require('mongoose');

const Product = mongoose.model('product');
const Variant = mongoose.model('variant');

//Returns list of “purchasable” items
app.get('/list', async (req, res) =>{
    try{
        let search = (req.query.search ) ? req.query.search : "";
        let filters = (req.query.filters) ? req.query.filters : [];
        let purchasableList = [];

        if(search || (filters && filters.length > 0)){
           //Send purchasable items according to search and filters
           let [ productList, variantList] = await Promise.all([
               Product.find({
                   isPurchasable: true,
                   name:{'$regex' : search, '$options' : 'i' }
                }),
               Variant.find({
                   productName:{'$regex' : search, '$options' : 'i' }
               })
           ]);
            productList.forEach(product =>{
                purchasableList.push({
                    id : product._id,
                    price : product.price,
                    discountedPrice : product.discountedPrice,
                    name : product.name,
                    images : product.images,
                    description : product.description,
                    type: "product"
                })
            })

            variantList.forEach( variant =>{
                //For filtering
                if(filters && filters.length > 0){
                    let filterNotPresentInVariantName = 0;
                    filters.forEach( filter =>{
                        if(!variant.variantName.toLowerCase().includes(filter.toLowerCase())){
                            filterNotPresentInVariantName = 1;
                        }
                    })

                    if(filterNotPresentInVariantName == 0){
                        //Send the variant name only if the variant name contains all the filter elements
                        purchasableList.push({
                            id : variant._id,
                            price : variant.price,
                            discountedPrice : variant.discountedPrice,
                            name : `${variant.productName} ${variant.variantName}`,
                            images : variant.images,
                            description : variant.description,
                            productId: variant.productId,
                            type: "productVariant"
                        })
                    }
                }else{
                    //If there are no filters
                    purchasableList.push({
                        id : variant._id,
                        price : variant.price,
                        discountedPrice : variant.discountedPrice,
                        name : `${variant.productName} ${variant.variantName}`,
                        images : variant.images,
                        description : variant.description,
                        productId: variant.productId,
                        type: "productVariant"
                    })
                }
            });

        }else{
            //Send all the purchasable items
            let [ productList, variantList]  = await Promise.all([
                Product.find({
                    isPurchasable: true,
                    isDeleted: false
                }),
                Variant.find({ isDeleted: false })
            ]);


            productList.forEach( product =>{
                purchasableList.push({
                    id : product._id,
                    price : product.price,
                    discountedPrice : product.discountedPrice,
                    name : product.name,
                    images : product.images,
                    description : product.description,
                    type: "product"
                })
            });

            variantList.forEach( variant =>{
                purchasableList.push({
                    id : variant._id,
                    price : variant.price,
                    discountedPrice : variant.discountedPrice,
                    name : `${variant.productName} ${variant.variantName}`,
                    images : variant.images,
                    description : variant.description,
                    productId: variant.productId,
                    type: "productVariant"
                })
            });
        }

        res.send({purchasableList});

    }catch(e){
        console.log(e);
        res.send({error: e.message})
    }
});

app.get('/details/:id', async(req, res) =>{
    try{
        let purchasableId = req.params.id;
        let variant;
        let variantList;
        let purchasableProductId;

        let product = await Product.findById(purchasableId);

        if(!product){
            //The id must be of a variant
            variant = await Variant.findById(purchasableId);

            if(variant){
                purchasableProductId = variant.productId;

                [product, variantList] = await Promise.all([
                    Product.findById(purchasableProductId),
                    Variant.find({productId : purchasableProductId})
                ]);

            }
        }else{
            //The id must be of a variant
            let purchasableProductId = product.id;
            variantList = await Variant.find({productId : purchasableProductId});
        }

        res.send({
            product,
            variantList
        });

    }catch(e){
        console.log(e);
        res.send({error : e.message})
    }
});


module.exports = app;