# **Sipariş Takip API**

Bu API, bir sipariş takip sistemi için oluşturulmuş bir RESTful servistir. Bu servis, sipariş oluşturma, listeleme, okuma, güncelleme ve silme gibi temel işlemleri gerçekleştirmek için HTTP metotları kullanır.
## **Kurulum**
Apiyi kurmak için öncekile bu repoyu indirmelisin.
```bash
git clone https://github.com/AbdulbakiDEMIR/AcikKaynakKodluYazilimlar-OpenApi.git
``` 
Apiyi indirdikten sonra bu klasörün içerisine girip dosyanın içerisindeki dosyalardan bir imaj oluşturmalısın.
```bash
cd AcikKaynakKodluYazilimlar-OpenApi
```
Aşağıdaki kodda bir imaj oluşturuyoruz `siparis-takip-api-imaj` yazılı alan oluşturulan imajın ismidir. Buraya istediğimiz adı yazabiliriz.
```bash
docker build -t siparis-takip-api-imaj .
```
Bu adımdan sonra imaj ile bir container oluşturuyoruz. `--name` etiketinden sonra gelen `siparis-api` değeri oluşan containerın ismidir. `siparis-takip-api-imaj` ise container oluşturulurken kullanılan imajın ismidir. `127.0.0.1:3000` ifadesi container ile local hostun 3000 numaralı portu üzerinden iletişim kurulucağını belirdir. 5000 değeri ise container içerisindeki uygulamanın local hostun 5000 numaralı portundan haberleştiğini gösterir.  
```bash
docker run -dp 127.0.0.1:3000:5000 --name siparis-api siparis-takip-api-imaj
```
Bu adımlardan sonra api docker üzerinden kurulup çalışmaya başlamıştır.Çalışan containerı durdurmak için docker stop, tekrar başlatmak için docker start komutu kullanılır.
```bash
docker stop siparis-api
```
```bash
docker start siparis-api
```
## **Kullanım**

Bu API'yi kullanmak için bir HTTP istemcisi (örneğin, Postman veya cURL) veya bir uygulama geliştirebilirsiniz. Aşağıda API'nin kullanımına ilişkin örnekler bulunmaktadır:

### **Sipariş Oluşturma (POST)**

#### **Request**

İsteğin gövdesinde aşağıdaki JSON formatında veri gönderilmelidir: İsteğin `http://localhost:3000` adresine gönderilmesi gerekiyor.
```json
{
    "customer": "Müşteri Adı",
    "products": [
        {"name": "Ürün 1", "price": 10, "piece": 2},
        {"name": "Ürün 2", "price": 20, "piece": 1}
    ]
}
```
#### **Response**

İstek geçerli ise `201` durum kodu ile aşağıdaki içeriğe benzer bir içerik döndürülür.
```json
{
    "orderID": 0,
    "orderDate": "2024-04-28T17:57:11.393Z",
    "customer": "Abdülbaki Demir",
    "total": 35,
    "products": [
        {
            "name": "Kalem",
            "price": 15,
            "piece": 2
        },
        {
            "name": "Silgi",
            "price": 5,
            "piece": 1
        }
    ],
    "state": "Sipariş Alındı"
}
```
Yeni sipariş oluşturulurken hatalı içerik yazılırsa `400` durum koduyla  aşağıdaki hata mesajı döndürülür.
```json
{
    "message": "Hatalı veri girişi"
}
```

### **Sipariş Listeleme (GET)**
Okuşturulan tüm siparişlerin ve sipariş özelliklerinin listelenmesi için aşağıdaki adımları takip edebilirsin

#### **Request**

Bu işlem için isteğin `http://localhost:3000` adresine get fonksiyonu ile istek gönderilmesi gerekiyor. Bu işlem sırasında isteğin body alanına herhangi bir içeriğin yazılmasına gerek yoktur.

#### **Response**
Eğer daha önce oluşturulmuş siparişler varsa `200` durum koduyla o ana kadar oluşturulan tüm siparişleri listeler
```json
[
    {
        "orderID": 0,
        "orderDate": "2024-04-28T18:14:09.873Z",
        "customer": "Abdülbaki Demir",
        "total": 125,
        "products": [
            {
                "name": "Kalem",
                "price": 15,
                "piece": 2
            },
            {
                "name": "Silgi",
                "price": 5,
                "piece": 1
            },
            {
                "name": "defter",
                "price": 30,
                "piece": 3
            }
        ],
        "state": "Sipariş Alındı"
    },
    {
        "orderID": 1,
        "orderDate": "2024-04-28T18:14:54.171Z",
        "customer": "Fatma Okur",
        "total": 5,
        "products": [
            {
                "name": "Silgi",
                "price": 5,
                "piece": 1
            }
        ],
        "state": "Sipariş Alındı"
    },
    {
        "orderID": 2,
        "orderDate": "2024-04-28T18:15:51.812Z",
        "customer": "Emre Dağ",
        "total": 100,
        "products": [
            {
                "name": "Dolma Kalem",
                "price": 100,
                "piece": 1
            }
        ],
        "state": "Sipariş Alındı"
    }
]
```
Eğer daha önce bir sipariş oluşturulmamışsa `404` durum kodyla aşağıdaki içerik gönderilir.
```json
{
    "message":"Sipariş yok"
}
```

### **Sipariş Okuma (GET)**
Belirli bir siparişi okumak için sipaişin id değerini kullanarak o siparişin bilgilerini sunucudan alaniliriz.
#### **Request**
Belirli bir siparişin bilgilerini elde etmek için `http://localhost:3000/<id>` adresini get fonksiyonu ile istek gönderebiliriz. Bu istek için isteğin body alanına bir içerik yazılmasına gerek yoktur.
#### **Response**
Girilen id değerine uygun bir sipariş varsa `200` durum kodyla aşağıdaki içeriğe benzer bir içerik göderilir.
```json
{
    "orderID": 2,
    "orderDate": "2024-04-28T18:15:51.812Z",
    "customer": "Emre Dağ",
    "total": 100,
    "products": [
        {
            "name": "Dolma Kalem",
            "price": 100,
            "piece": 1
        }
    ],
    "state": "Sipariş Alındı"
}
```
Girilen id değerinde bir sipariş bulunamadıysa `404` durum kodyla aşağıdaki içerik gönderilir.
```json
{
    "message":"3 id değerine sahip sipariş bulunamadı"
}
```
Eğer hiç sipariş girilmemişse `404` durum kodyla aşağıdaki içerik gönderilir.
```json
{
    "message":"Sipariş bulunamadı"
}
```
### **Sipariş Güncelleme (PUT)**
Bir siparişin state, yani sipariş durumunu güncellemek istiyorsak bu metodu kullanabiliriz. 
#### **Request**
Bir siparişi güncellemek için öncelikle hangi sipaişi güncelleyeceğimizi belirlememiz gerekir. Bunun için `http://localhost:3000/<id>` adresindeki id değerini kullanacağız. id olan alana sipariş durumunu güncellemek istediğimiz siparişin id bilgisini yazıyoruz daha sonra yeni durum bilgisini aşağıdaki gibi oluşturuyoruz. Bu yeni durum bilgisini isteğin body alanında gönderiyoruz.
```json
{
    "newState":"Kargoya Verildi"
}
```
#### **Response**
Sipariş başarıyla güncellenirse `200` durum koduyla aşağıdaki içerik gönderilir.
```json
{
    "message":"1 id değerine sahip sipariş 'Kargoya Verildi' durumuna güncellendi"
}
```
Eğer bir sipariş oluşturulmadıysa `404` durum kodyla aşağıdaki içerik göderilir.
```json
{
    "message":"Güncellenecek kayıtlı sipariş bulunmamakta"
}
```
Eğer kayıtlı siparişler var ancak istenilen id değerine sahip bir sipariş yoksa `404` durum kodyla aşağıdaki içerik gönderilir.
```json
{
    "message":"Güncellenecek kayıtlı sipariş bulunmamakta"   
}
```
### **Sipariş Silme (DELETE)**
Bir siparişi silmek istediğimizde delete metodunu kullanıyoruz.
#### **Request**
Bir siparişi silmek istediğimizde öncelikle hangi siparişi silmemiz gerektiğini belirlememiz gerekir. Bunun için siparişlerin id değerlerinden yararlanıyoruz. Silmek istediğimiz siparişin id değerini seçip `http://localhost:3000/<id>` adresinde id değeri bulunan kısma ilgili id değerini giriyoruz.
#### **Response**
Eğer sipariş başarılı bir şekilde silinirse `200` durum kodyla aşağıdaki içeriğe benzer bir içerik döndürülecektir.
```json
{
    "message":"1 id değerine sahip sipariş silindi"
}
```
Eğer daha önce bir sipariş oluşturulmamışsa `404` durum koduyla aşağıdaki içerk döndürülecektir.
```json
{
    "message":"Silinebilecek kayıtlı sipariş bulunmamakta"
}
```
Eğer silinecek siparişin id de değeriyle eşleşen herhangi bir sipariş yoksa `404` durum kodyla aşağıdaki içeriğe benzer bir içerik döndürülecektir.
```json
{
    "message":"1 id değerine sahip sipariş bulunamadı"
}
```