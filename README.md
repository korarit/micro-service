# microservice 
 เป็นงานใน Dev init 2 ของ borntodev ในการเรียนรู้ เรื่องการทำ microservice
 - Framework ใช้ NestJS เป็นหลัก
 - Database ใช้ mysql หรือ marriadb
 - ใช้ Type ORM ในการ connect database

## วิธีการติดตั้ง Package ที่จำเป็น
`cd` เข้าทุก folder จากนั้น `yarn install` เพื่อติดตั้ง package ที่จำเป็น โดยต้องทำทุก folder และ แต่ล่ะ service จะมี `PORT` ตามด้านล่าง
- gateway:  เป็น `gateway` ใช้ `PORT 3000`
- Product:  เป็น `User Service` ใช้ `PORT 3011`
- order:  เป็น `Product Service` ใช้ `PORT 3012`
- Order:  เป็น `Order Service` ใช้ `PORT 3013`

## แก้ไขไฟล์ .env
โดยนี่เป็นตัวอย่างข้อมูลในไฟล์ env
```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=123
DB_NAME=microservice_task
```

## วิธีการใช้ User Service

**GET /user/:id** :id แทน user id ที่ต้องการดึงข้อมูลผู้ใช้มา ไม่มี payload <br />

**POST /user** มี payload แบบนี้
```
{
    "data": {
        "username": "test1",
        "password": "test01",
        "firstName": "testz01",
        "lastName": "testa01"
    }
}
```

**PUT /user** มี payload แบบนี้ โดยสามารถเลือกข้อมูลที่ต้องการแก้ไขได้ โดย id ใช้ในการกำหนด id user ที่ต้องการแก้ไข
```
{
    "data": {
        "id": 1
        "username": "test1"
    }
}
```
**DELETE /user/:id** :id แทน user id ที่ต้องการลบ ไม่มี payload

## วิธีการใช้ Product Service

**GET /product/:id** :id แทน user id ที่ต้องการดึงข้อมูล product นั้นๆ มา ไม่มี payload<br />

**POST /product** มี payload แบบนี้ ใช้การเพิ่ม product ลง database
```
{
    "data":{
        "name": "test1",
        "type": "type01",
        "count": 1000,
        "price": 20
    }
}
```

**PUT /product** มี payload แบบนี้ โดยสามารถเลือกข้อมูลที่ต้องการแก้ไขได้ โดย id ใช้ในการกำหนด id product ที่ต้องการแก้ไข
```
{
    "data": {
        "id": 1
        "name": "test1"
    }
}
```
**DELETE /product/:id** :id แทน product id ที่ต้องการลบ ไม่มี payload

## วิธีการใช้ Order Service

**GET /order/:id** :id แทน order id ที่ต้องการดึงข้อมูลมา ไม่มี payload <br />

**POST /order** มี payload แบบนี้ ใช้การเพิ่ม order ลง database
```
{
    "data":{
        "user_id": 1,
        "product_id": 1,
        "count": 10,
        "address": "test 00001"
    }
}
```

**PUT /product** มี payload แบบนี้ โดยสามารถเลือกข้อมูลที่ต้องการแก้ไขได้ โดย id ใช้ในการกำหนด id product ที่ต้องการแก้ไข
```
{
    "data":{
        "id": 1,
        "count": 10,
        "address": "test 00001"
    }
}
```
**DELETE /product/:id** :id แทน product id ที่ต้องการลบ ไม่มี payload
