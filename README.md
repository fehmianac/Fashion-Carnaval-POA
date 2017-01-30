# Fashion Carnaval POA

Proje NodeJs ve ionic gereksinimi vardır. Projeyi çekmeden önce NodeJS ve ionic kurunuz. 
http://ionicframework.com/docs/guide/installation.html

1-) Kurulumlar tamamlandıktan sonra projenin root klasöründe "npm install" çalıştırınız. Bu komut projenin ihtiyacı olan npm paketlerinin indirilmesini ve kurulmasını sağlayacaktır.

2-) Npm install tamamlandıktan sonra "ionic serve" komutu ile browser üzerinde uygulamayı test edebilirsiniz. (Eğer ionic deploy plugin'i aktif değil gibi bir hata alıyorsanız. F12 ile developer console'a geçiniz ve tekrar deneyiniz)

3-) Yukarıdaki adımlar tamamlandıktan sonra projeyi Typescript ve Ionic stadartlarında geliştirmeye devam edebilirsiniz.


IONIC DEPLOY

Uygulamayı store'a versiyon çıkmadan güncellemek mevcuttur. Bu mekanizmanın çalışma prensibi; Uygulama her ana sayfa açıldığında https://ionic.io/cloud üzerindeki bir adrese yeni versiyon mevcutmu diye çağrı atar.
Bu servis ionic tarafından sağlanmaktadır. Eğer uygulamanın yeni versiyonu mecvutsa karşıdan dosyaları indirir ve uygulamayı yeniden başlatır bu şekilde kullanıcı insiyatifine bırakmadan uygulamayı güncellmek mümkündür.

NOT: Deploy edeceğiniz versiyonda herhangi bir hata olması durumunda güncelleme alan uygulamalar otomatik devre dışı kalabilir. Bu tip durumlarda uygulamanın ilk versiyonunun store dan çekilmesi gerekmektedir.


1-) Projenin root klasöründe console üzerinde "ionic upload" komutunu çalıştırınız. Bu komut çalıştığında https://apps.ionic.io sisteminindeki kullanıcı bilgilerinizi isteyecektir.
bilgiler girildikten sonra sistem uygulama yüklendi mesajını verecektir. Bu konut ile ionic view uygulamasında görünen uygulamalar güncellenir.

2-) Yükleme işlemi tamamlandıktan sonra https://apps.ionic.io adresine giriniz ve Fashion-Carnaval-POA uygulamasının detayına giriniz. Sayfada deploy segmesine geliniz.
Burada siste'e yapılan yüklemeler listelenmektedir. En son yapılan yükleme en üstte olacaktır. 

3-) Listede bulunan ve uygulamalara gönderilmesini istediğiniz versiyonu seçerek deploy dümesine basınız. Bu aşamadan sonra uygulamalar ilk açılmalarında update olacaklardır.


