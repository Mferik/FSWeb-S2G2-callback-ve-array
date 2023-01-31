const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */
	const dünyaKupasiFinali2014=fifaData.filter(finaliFiltrele);
	function finaliFiltrele(mac){
		return mac["Year"] === 2014 && mac["Stage"] === "Final";
	}
	console.log(dünyaKupasiFinali2014)

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
let evSahibiTakim=dünyaKupasiFinali2014[0]["Home Team Name"];
console.log(evSahibiTakim);


//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
let deplasmanTakim = dünyaKupasiFinali2014[0]["Away Team Name"];
console.log(deplasmanTakim)
//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
let evSahibiTakimGol=dünyaKupasiFinali2014[0]["Home Team Goals"] ;
console.log(evSahibiTakimGol)
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
let deplasmanTakimGol = dünyaKupasiFinali2014[0]["Away Team Goals"];
console.log(deplasmanTakimGol)
//(e) 2014 Dünya kupası finali kazananı*/
let dünyaKupasiFinali2014Kazanan=dünyaKupasiFinali2014[0]["Win conditions"];
console.log(dünyaKupasiFinali2014Kazanan)


/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(fifaData) {
	let finalMatches= fifaData.filter((mac) => {
		return mac.Stage==="Final";
	});
	return finalMatches
    }
	console.log(Finaller(fifaData))

/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(fifaData,callback) {
	let years=callback(fifaData).map((mac)=> {
		return mac.Year
	});
	return years
}
console.log(Yillar(fifaData,Finaller));


/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(fifaData,callback) {
	let kazananlar=[];
	let finalMatches = callback(fifaData);
	for(let i = 0; i < finalMatches.length; i++){
		if(finalMatches[i]["Home Team Goals"] > finalMatches[i]["Away Team Goals"]){
			kazananlar.push(finalMatches[i]["Home Team Name"])
		} else {
			kazananlar.push(finalMatches[i]["Away Team Name"])
		}
	}
	return kazananlar;
}
console.log(Kazananlar(fifaData,Finaller));



/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(fifaData,CallbackFinaller,CallbackYillar,CallbackKazananlar) {
	let kazananlarList=[];
	for (let i = 0; i < (CallbackYillar(fifaData,CallbackFinaller)).length; i++){
		kazananlarList.push(`${CallbackYillar(fifaData,CallbackFinaller)[i]} yılında, ${CallbackKazananlar(fifaData,CallbackFinaller)[i]} dünya kupasını kazandı!`)
	}
	return kazananlarList
  }
  console.log(YillaraGoreKazananlar(fifaData,Finaller,Yillar,Kazananlar))
  
  

/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/

function OrtalamaGolSayisi(Finaller) {
	
	let toplamGol= Finaller.reduce((toplamGol,fifaData) =>{
		return toplamGol + fifaData["Home Team Goals"] + fifaData["Away Team Goals"];
	},0)
	let ortalamaGol= ((toplamGol/Finaller.length).toFixed(2));
	return ortalamaGol;
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)))


/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/

function UlkelerinKazanmaSayilari(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
