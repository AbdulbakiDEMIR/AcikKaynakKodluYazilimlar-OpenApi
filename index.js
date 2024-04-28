const express = require("express");
const app = express();
const PORT = 5000;

var setOrderID = 0;
var orders = [];

app.use(express.json());

//create
app.post("/",(req,res)=>{
    if (!req.body.customer || !req.body.products) {
        return res.status(400).send({message:"Hatalı veri girişi"});
    }
    else{
        const {customer, products} = req.body;
        var total =  0;
        var error = true;
        products.forEach(e => {
            if(!e.name || !e.price || !e.piece){
                error = false;
            }
            total = total + e.piece*e.price;
        });
        if(error){
            var orderDate = new Date();
            var order = {
                orderID: setOrderID,
                orderDate: orderDate,
                customer: customer,
                total: total,
                products: products,
                state: "Sipariş Alındı",
            } 
            orders.push(order);
            setOrderID++;
            return res.status(201).send(order);
        }
        else{
            return res.status(400).send({message:"Hatalı veri girişi"});
        }
    }
});

//list
app.get("/",(req,res)=>{
    if(orders.length === 0) res.status(404).send({message:"Sipariş yok"});
    else res.status(200).send(orders);
});

//read
app.get("/:id",(req,res)=>{
    const {id} = req.params;
    if(orders.length === 0) res.status(404).send({message:"Sipariş bulunamadı"});
    else{
        var i = 0;
        var readIndex = -1; 
        for (i<0 ; i<orders.length;i++){
            if(orders[i].orderID === parseInt(id)){
                readIndex = i;
            }
        }
        if(readIndex < 0) res.status(404).send({message:`${id} id değerine sahip sipariş bulunamadı`});
        else res.status(200).send(orders[readIndex]);
    }
});

//delete
app.delete("/:id",(req,res)=>{
    const {id} = req.params;
    if(orders.length == 0) res.status(404).send({message:"Silinebilecek kayıtlı sipariş bulunmamakta"});
    else{
        var ordersLength = orders.length;
        orders = orders.filter(item => item.orderID !== parseInt(id));
        if (ordersLength > orders.length) res.status(200).send({message:`${id} id değerine sahip sipariş silindi`});
        else res.status(404).send({message:`${id} id değerine sahip sipariş bulunamadı`});
    }
});

//update
app.put("/:id",(req,res)=>{
    const {id} = req.params;
    const {newState} = req.body;
    if(orders.length == 0) res.status(404).send({message:"Güncellenecek kayıtlı sipariş bulunmamakta"});
    var i = 0;
    var updateIndex = -1;
    for(i = 0; i < orders.length; i++){
        if(orders[i].orderID === parseInt(id)){
            orders[i].state = newState;
            updateIndex = 1;
        }
    }
    if(updateIndex < 0) res.status(404).send({message:`${id} id değerine sahip sipariş bulunamadı`});
    else res.status(200).send({message:`${id} id değerine sahip sipariş '${newState}' durumuna güncellendi`});
});


app.listen(
    PORT,
    ()=> console.log(`it's slive on http://localhost:${PORT}`)
)
