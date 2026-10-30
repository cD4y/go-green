'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P='gg_',ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(P+k))??d}catch{return d}},sv=(k,v)=>{try{localStorage.setItem(P+k,JSON.stringify(v))}catch{}};
const el=(t,txt,cls)=>{const e=document.createElement(t);if(txt!=null)e.textContent=txt;if(cls)e.className=cls;return e};
const I18N={
'Skip to content':'Lewati ke konten','Main':'Menu utama','Toggle navigation menu':'Buka atau tutup menu navigasi','Home':'Beranda','Forest Crisis':'Krisis Hutan','Take Action':'Ambil Tindakan','About':'Tentang',
'PROTECT NATURE. INSPIRE CHANGE.':'LINDUNGI ALAM. WUJUDKAN PERUBAHAN.','Protect Our Forests, Secure Our Future.':'Lindungi Hutan, Jaga Masa Depan Kita.','Forest fires threaten our ecosystems, wildlife, and communities. Discover the issues, understand the impact, and take action for a greener Indonesia.':'Kebakaran hutan mengancam ekosistem, satwa liar, dan masyarakat. Kenali masalahnya, pahami dampaknya, dan ambil tindakan untuk Indonesia yang lebih hijau.','Explore ForestWatch':'Jelajahi ForestWatch','Start Your Green Journey':'Mulai Langkah Hijau Anda','Protect Forests':'Lindungi Hutan','Preserve Biodiversity':'Jaga Keanekaragaman Hayati','Inspire Green Action':'Dorong Aksi Hijau','Scroll down':'Gulir ke bawah',
'Alert category':'Kategori peringatan','All categories':'Semua kategori','Explore hotspots':'Jelajahi titik panas','Forest path surrounded by tropical vegetation':'Jalur hutan yang dikelilingi vegetasi tropis','Forest biodiversity and wildlife habitat':'Keanekaragaman hayati dan habitat satwa hutan','Welcome to GO GREEN':'Selamat datang di GO GREEN','GO GREEN connects environmental awareness with practical action. Explore NASA FIRMS hotspot detections for Lampung, learn about conservation, record concerns on this device, build daily habits, and estimate your personal contributions.':'GO GREEN menghubungkan kepedulian lingkungan dengan aksi nyata. Jelajahi deteksi titik panas NASA FIRMS di Lampung, pelajari konservasi, catat temuan di perangkat ini, bangun kebiasaan sehari-hari, dan perkirakan kontribusi Anda.','Ask EcoBot':'Tanya EcoBot','Our Forests Need Us.':'Hutan Kita Membutuhkan Kita.','Forests sustain biodiversity, regulate the climate, store carbon, and support communities. Forest fires and deforestation can threaten these vital ecosystems.':'Hutan menjaga keanekaragaman hayati, mengatur iklim, menyimpan karbon, dan mendukung kehidupan masyarakat. Kebakaran serta deforestasi dapat mengancam ekosistem penting ini.',
'ForestWatch: Monitor Lampung Hotspots.':'ForestWatch: Pantau Titik Panas di Lampung.','Explore NASA FIRMS satellite hotspot detections for Lampung and understand how environmental monitoring can support early awareness.':'Jelajahi deteksi titik panas satelit NASA FIRMS di Lampung dan pahami peran pemantauan lingkungan dalam meningkatkan kewaspadaan dini.','Hotspot time range':'Rentang waktu titik panas','TODAY':'HARI INI','24 HRS':'24 JAM','7 DAYS':'7 HARI','Category':'Kategori','All':'Semua','Date':'Tanggal','Choose a date':'Pilih tanggal','Reset':'Atur ulang','NASA FIRMS hotspot map':'Peta titik panas NASA FIRMS',
'EcoBot AI — Your Environmental Assistant.':'EcoBot AI — Asisten Lingkungan Anda.','Small questions. Greener decisions. Open the chat at the bottom right, or':'Pertanyaan sederhana. Pilihan lebih hijau. Buka obrolan di kanan bawah, atau','start chatting':'mulai mengobrol',
'See a Problem? Help Protect Our Environment.':'Melihat Masalah? Bantu Lindungi Lingkungan Kita.','Environmental awareness becomes more meaningful when people can document concerns and encourage responsible action.':'Kepedulian lingkungan menjadi lebih bermakna saat masyarakat dapat mencatat temuan dan mendorong tindakan yang bertanggung jawab.','Reports are saved only in this browser. They are not sent to authorities or emergency services. For urgent incidents, contact the appropriate local services directly.':'Laporan hanya disimpan di browser ini. Laporan tidak dikirim ke pihak berwenang atau layanan darurat. Untuk kejadian mendesak, hubungi layanan setempat yang berwenang.','If you encounter an active fire, stay away from danger and contact the appropriate local emergency services. Do not enter burning forest areas to collect evidence.':'Jika menemukan kebakaran aktif, jauhi lokasi berbahaya dan hubungi layanan darurat setempat. Jangan memasuki area hutan yang terbakar untuk mengumpulkan bukti.','Report title':'Judul laporan','Suspected Forest Fire':'Dugaan Kebakaran Hutan','Suspected Illegal Land Clearing':'Dugaan Pembukaan Lahan Ilegal','Waste Pollution':'Pencemaran Sampah','Water Pollution':'Pencemaran Air','Wildlife or Habitat Concern':'Masalah Satwa Liar atau Habitat','Other Environmental Concern':'Masalah Lingkungan Lainnya','Region / location description':'Wilayah / deskripsi lokasi','Date observed':'Tanggal pengamatan','Description':'Deskripsi','Photo preview (JPG, PNG, or WebP; up to 2 MB; not saved or sent)':'Pratinjau foto (JPG, PNG, atau WebP; maks. 2 MB; tidak disimpan atau dikirim)','Selected photo preview':'Pratinjau foto yang dipilih','I understand this report is stored only in this browser and is not sent to authorities.':'Saya memahami laporan ini hanya disimpan di browser ini dan tidak dikirim ke pihak berwenang.','Save report on this device':'Simpan laporan di perangkat ini','Delete all saved reports':'Hapus semua laporan tersimpan',
'Your Daily Actions Matter.':'Aksi Kecil Anda Berarti.','Small habits can inspire a greener future.':'Kebiasaan kecil dapat mewujudkan masa depan yang lebih hijau.','Your challenge progress is stored only in this browser and is not shared or ranked.':'Progres tantangan hanya disimpan di browser ini, tidak dibagikan atau diperingkat.','Reset my progress':'Atur ulang progres saya',
'Measure Your Green Impact.':'Ukur Dampak Positif Anda bagi Lingkungan.','Understand how everyday choices can contribute to a more sustainable lifestyle.':'Pahami bagaimana pilihan sehari-hari dapat mendukung gaya hidup yang lebih berkelanjutan.','Plastic reduction':'Pengurangan plastik','Items avoided per week':'Barang yang dihindari per minggu','Weeks':'Minggu','Energy saving':'Penghematan energi','kWh saved per month':'kWh dihemat per bulan','Months':'Bulan','Tree care tracker':'Pelacak perawatan pohon','Trees planted / cared for':'Pohon ditanam / dirawat','Trees still alive (optional)':'Pohon yang masih hidup (opsional)','Calculate':'Hitung','Results are self-reported estimates from your inputs. No carbon conversion is applied; tree counts are not verified carbon removal.':'Hasil adalah perkiraan berdasarkan masukan Anda. Tidak ada konversi karbon; jumlah pohon bukan ukuran penyerapan karbon yang terverifikasi.',
'Live Greener, Starting Today.':'Mulai Hidup Lebih Hijau Hari Ini.','Environmental Facts You Can Trust.':'Fakta Lingkungan yang Tepercaya.','Reliable decisions depend on transparent, verifiable data. Explore these external references; this page does not display live environmental statistics.':'Keputusan yang tepat bergantung pada data yang transparan dan dapat diverifikasi. Jelajahi sumber eksternal berikut; halaman ini tidak menampilkan statistik lingkungan secara langsung.',
'A Greener Future Starts With Us.':'Masa Depan yang Lebih Hijau Dimulai dari Kita.','GO GREEN is an environmental awareness initiative that helps people explore conservation topics, review satellite hotspot detections, record concerns on their own device, and build sustainable habits.':'GO GREEN adalah inisiatif kepedulian lingkungan yang membantu masyarakat mempelajari konservasi, meninjau deteksi titik panas satelit, mencatat temuan di perangkat sendiri, dan membangun kebiasaan berkelanjutan.','Environmental Awareness':'Kepedulian Lingkungan','Forest and Biodiversity Conservation':'Konservasi Hutan dan Keanekaragaman Hayati','Community-Driven Green Action':'Aksi Hijau Berbasis Masyarakat','How GO GREEN Supports Environmental Awareness.':'Cara GO GREEN Mendukung Kepedulian Lingkungan.','Discover environmental concerns.':'Kenali masalah lingkungan.','Explore NASA FIRMS hotspot data.':'Jelajahi data titik panas NASA FIRMS.','Ask EcoBot for explanations.':'Tanyakan penjelasan kepada EcoBot.','Record an environmental concern on this device.':'Catat temuan lingkungan di perangkat ini.','Complete a green action challenge.':'Selesaikan tantangan aksi hijau.','Calculate estimated environmental contributions.':'Hitung perkiraan kontribusi bagi lingkungan.','Why GO GREEN?':'Mengapa GO GREEN?','GO GREEN brings environmental information and practical learning activities together. Use the linked sources to verify information and contact the relevant local agencies to report incidents.':'GO GREEN menyatukan informasi lingkungan dan kegiatan pembelajaran praktis. Gunakan sumber yang tersedia untuk memverifikasi informasi dan hubungi instansi setempat terkait untuk melaporkan kejadian.',
'Small Actions, Greener Future.':'Aksi Kecil, Masa Depan Lebih Hijau.','NASA FIRMS markers are satellite hotspot detections, not confirmed fires. EcoBot uses a curated local knowledge base. Reports and challenge progress are stored in this browser only. Calculator results are self-reported estimates.':'Penanda NASA FIRMS adalah deteksi titik panas satelit, bukan konfirmasi kebakaran. EcoBot menggunakan basis pengetahuan lokal. Laporan dan progres tantangan hanya disimpan di browser ini. Hasil kalkulator merupakan perkiraan mandiri.','Clear local data':'Hapus data lokal','Open EcoBot chat':'Buka obrolan EcoBot','Small questions. Greener decisions.':'Pertanyaan sederhana. Pilihan lebih hijau.','Start a new chat':'Mulai obrolan baru','Clear':'Bersihkan','Minimize chat':'Minimalkan obrolan','Minimize':'Minimalkan','Close chat':'Tutup obrolan','Close':'Tutup','Ask about forests, climate…':'Tanyakan tentang hutan, iklim…','Message':'Pesan','Send':'Kirim','Responses come from a curated local knowledge base. EcoBot is not connected to a live AI model.':'Jawaban berasal dari basis pengetahuan lokal yang dikurasi. EcoBot tidak terhubung ke model AI langsung.','Discover More':'Pelajari Lebih Lanjut','Learn More':'Pelajari Lebih Lanjut','Language':'Bahasa',
'Forest Fires':'Kebakaran Hutan','Land clearing, deliberate burning, accidental ignition, and dry conditions can all contribute to forest and land fires.':'Pembukaan lahan, pembakaran sengaja, sumber api yang tidak disengaja, dan kondisi kering dapat menyebabkan kebakaran hutan dan lahan.','Fires can start or spread when dry vegetation meets ignition sources. Prevention relies on avoiding open burning, early reporting, and community awareness.':'Api dapat muncul atau menyebar ketika vegetasi kering bertemu sumber api. Pencegahan dilakukan dengan menghindari pembakaran terbuka, melaporkan kejadian sejak dini, dan meningkatkan kepedulian masyarakat.','Biodiversity Loss':'Hilangnya Keanekaragaman Hayati','Habitat destruction threatens wildlife, ecological balance, and vulnerable species.':'Kerusakan habitat mengancam satwa liar, keseimbangan ekologi, dan spesies yang rentan.','When forests shrink or fragment, animals lose food, shelter, and migration routes, and ecosystems become less resilient.':'Ketika hutan menyusut atau terfragmentasi, satwa kehilangan sumber makanan, tempat berlindung, dan jalur migrasi sehingga ekosistem menjadi kurang tangguh.','Climate and Air Pollution':'Perubahan Iklim dan Pencemaran Udara','Forest fires release smoke and pollutants, affect air quality, and contribute to greenhouse gas emissions.':'Kebakaran hutan menghasilkan asap dan polutan, menurunkan kualitas udara, serta berkontribusi pada emisi gas rumah kaca.','Smoke can harm health, especially for children, older adults, and people with respiratory conditions. Burning also releases carbon stored in vegetation.':'Asap dapat membahayakan kesehatan, terutama anak-anak, lansia, dan orang dengan gangguan pernapasan. Pembakaran juga melepaskan karbon yang tersimpan dalam vegetasi.',
'Plant and Care for Trees':'Tanam dan Rawat Pohon','Choose native species, water young trees, and keep checking on them.':'Pilih spesies asli, sirami pohon muda, dan rawat secara berkala.','Plant native species suited to your area, protect saplings from damage, and keep caring for them after planting.':'Tanam spesies asli yang sesuai dengan wilayah Anda, lindungi bibit dari kerusakan, dan terus rawat setelah penanaman.','Reduce, Reuse, Recycle':'Kurangi, Gunakan Kembali, Daur Ulang','Cut waste at the source first.':'Kurangi sampah dari sumbernya.','Carry a bottle and bag, repair before replacing, and separate waste so recyclables stay clean.':'Bawa botol dan tas pakai ulang, perbaiki barang sebelum menggantinya, dan pilah sampah agar bahan daur ulang tetap bersih.','Save Water and Energy':'Hemat Air dan Energi','Small daily habits add up.':'Kebiasaan kecil sehari-hari membawa dampak.','Fix leaks, shorten showers, switch off unused lights and devices, and unplug idle chargers.':'Perbaiki kebocoran, persingkat waktu mandi, matikan lampu dan perangkat yang tidak digunakan, serta cabut pengisi daya.','Protect Wildlife and Habitats':'Lindungi Satwa Liar dan Habitat','Respect wild animals and their homes.':'Hormati satwa liar dan habitatnya.','Do not buy wild-caught pets, keep distance from wildlife, avoid littering, and support conservation groups.':'Jangan membeli satwa tangkapan liar, jaga jarak dari satwa, hindari membuang sampah sembarangan, dan dukung kelompok konservasi.',
'Hotspots':'Titik Panas','Coverage':'Cakupan','Confidence (H/M/L)':'Tingkat keyakinan (H/M/L)','NASA retrieval':'Pengambilan data NASA','Map tiles are unavailable. Hotspot data can still be reviewed in the list.':'Peta tidak dapat dimuat. Data titik panas tetap dapat ditinjau pada daftar.','Map unavailable (offline or blocked). Hotspot data can still be reviewed in the list.':'Peta tidak tersedia (luring atau diblokir). Data titik panas tetap dapat ditinjau pada daftar.','Select language':'Pilih bahasa','I’m EcoBot, your environmental assistant. Ask me about forest fires, biodiversity, climate change, or sustainable living. Let’s protect our planet together.':'Saya EcoBot, asisten lingkungan Anda. Tanyakan tentang kebakaran hutan, keanekaragaman hayati, perubahan iklim, atau gaya hidup berkelanjutan. Mari jaga bumi bersama.','Try asking about forest fires, deforestation, wildlife, waste, or how to report a problem.':'Coba tanyakan tentang kebakaran hutan, deforestasi, satwa liar, sampah, atau cara melaporkan masalah.','single-use plastic items avoided (self-reported estimate)':'barang plastik sekali pakai dihindari (perkiraan mandiri)','kWh saved (self-reported estimate)':'kWh dihemat (perkiraan mandiri)','Trees recorded:':'Pohon tercatat:',' · Survival:':' · Tingkat hidup:','Choose…':'Pilih…','Titik panas':'Titik panas','Retry':'Coba lagi','Latest detection (UTC)':'Deteksi terbaru (UTC)','Connecting to NASA FIRMS…':'Menghubungkan ke NASA FIRMS…','Retry':'Coba lagi','No hotspot data available. Use Retry after checking the connection.':'Data titik panas tidak tersedia. Periksa koneksi, lalu coba lagi.','NASA FIRMS returned no hotspot records for the selected period.':'NASA FIRMS tidak menemukan data titik panas pada periode yang dipilih.','View on Map':'Lihat di Peta','Hotspot detail':'Detail titik panas','Confidence:':'Tingkat keyakinan:','Satellite:':'Satelit:','Instrument:':'Instrumen:','Day/Night:':'Siang/Malam:','Version:':'Versi:','Loading hotspot data…':'Memuat data titik panas…','Choose…':'Pilih…','Photo must be JPG, PNG or WebP and no larger than 2 MB.':'Foto harus berformat JPG, PNG, atau WebP dan berukuran maksimal 2 MB.','Please complete every required field (description: at least 10 characters).':'Lengkapi semua kolom wajib (deskripsi minimal 10 karakter).','Please confirm that this report will remain on this device and will not be sent to authorities.':'Konfirmasikan bahwa laporan ini hanya tersimpan di perangkat ini dan tidak dikirim ke pihak berwenang.','Report saved on this device':'Laporan tersimpan di perangkat ini','Delete all saved reports from this browser?':'Hapus semua laporan tersimpan dari browser ini?','Reset your challenge progress?':'Atur ulang progres tantangan Anda?','Clear all GO GREEN data saved in this browser?':'Hapus semua data GO GREEN yang tersimpan di browser ini?','No saved reports yet. Use the form to create a record on this device.':'Belum ada laporan tersimpan. Gunakan formulir untuk membuat catatan di perangkat ini.','Saved reports':'Laporan tersimpan','By category':'Berdasarkan kategori','Details':'Detail','Local record:':'Catatan lokal:','Location:':'Lokasi:','Observed:':'Diamati:','No photo selected':'Tidak ada foto yang dipilih','(image not saved)':'(gambar tidak disimpan)','This record is stored only in this browser and has not been sent.':'Catatan ini hanya tersimpan di browser ini dan belum dikirim.','Mark complete':'Tandai selesai','Completed':'Selesai','Image unavailable':'Gambar tidak tersedia','Progress':'Progres','Points':'Poin','Badge':'Lencana','You (this browser)':'Anda (browser ini)','Green Beginner':'Pemula Hijau','Eco Explorer':'Penjelajah Eco','Forest Protector':'Pelindung Hutan','Green Champion':'Juara Hijau','Enter valid non-negative numbers (alive trees cannot exceed planted trees).':'Masukkan angka nol atau lebih (pohon hidup tidak boleh melebihi pohon yang ditanam).','single-use plastic items avoided (self-reported estimate)':'barang plastik sekali pakai dihindari (perkiraan mandiri)','kWh saved (self-reported estimate)':'kWh dihemat (perkiraan mandiri)','Trees recorded:':'Pohon tercatat:',' · Survival:':' · Tingkat hidup:','Please type a question first.':'Silakan tulis pertanyaan terlebih dahulu.','EcoBot is typing…':'EcoBot sedang mengetik…','Something went wrong. Please try again.':'Terjadi kesalahan. Silakan coba lagi.','I don’t have an answer for that yet.':'Saya belum memiliki jawaban untuk pertanyaan itu.','Try asking about forest fires, deforestation, wildlife, waste, or how to report a problem.':'Coba tanyakan tentang kebakaran hutan, deforestasi, satwa liar, sampah, atau cara melaporkan masalah.','Why are forest fires dangerous?':'Mengapa kebakaran hutan berbahaya?','How can we prevent forest fires?':'Bagaimana cara mencegah kebakaran hutan?','What causes deforestation?':'Apa penyebab deforestasi?','How can I protect wildlife?':'Bagaimana cara melindungi satwa liar?','Give me a 7-day Go Green plan.':'Buatkan rencana Go Green selama 7 hari.','How can I report an environmental problem?':'Bagaimana cara melaporkan masalah lingkungan?','How do I read hotspot data?':'Bagaimana cara membaca data titik panas?','Why are hotspots important?':'Mengapa titik panas penting?','Is it safe to report a fire?':'Apakah aman melaporkan kebakaran?','How can I reduce plastic waste?':'Bagaimana cara mengurangi sampah plastik?','Loading':'Memuat','EcoBot is not connected to a live AI model.':'EcoBot tidak terhubung ke model AI langsung.',
'Bring a reusable bottle':'Bawa botol minum pakai ulang','Skip bottled drinks today.':'Hindari minuman dalam kemasan hari ini.','Reduce single-use plastics':'Kurangi plastik sekali pakai','Refuse one plastic bag, straw, or cup.':'Tolak satu kantong, sedotan, atau gelas plastik.','Save water at home':'Hemat air di rumah','Shorten a shower and fix a drip.':'Persingkat waktu mandi dan perbaiki keran yang bocor.','Switch off unnecessary lights':'Matikan lampu yang tidak diperlukan','Turn off lights in empty rooms.':'Matikan lampu di ruangan kosong.','Learn about forest conservation':'Pelajari konservasi hutan','Read one article from the sources list.':'Baca satu artikel dari daftar sumber.','Care for a plant or tree':'Rawat tanaman atau pohon','Water or tidy a plant.':'Siram atau rapikan tanaman.','Share an awareness message':'Bagikan pesan kepedulian','Tell one friend what you learned.':'Ceritakan hal yang Anda pelajari kepada seorang teman.','Items avoided per week':'Barang yang dihindari per minggu','Items avoided per week':'Barang yang dihindari per minggu','single-use plastic items avoided (self-reported estimate)':'barang plastik sekali pakai dihindari (perkiraan mandiri)','kWh saved (self-reported estimate)':'kWh dihemat (perkiraan mandiri)','Energy saving':'Penghematan energi','Trees recorded:':'Pohon tercatat:',' · Survival:':' · Tingkat hidup:','ForestWatch markers come from NASA FIRMS satellite hotspot detections. They indicate thermal anomalies, include a confidence value, and are not confirmation of a fire; ground verification is still needed.':'Penanda ForestWatch berasal dari deteksi titik panas satelit NASA FIRMS. Penanda menunjukkan anomali termal beserta tingkat keyakinannya, bukan konfirmasi kebakaran; verifikasi lapangan tetap diperlukan.','I’m EcoBot, your environmental assistant. Ask me about forest fires, biodiversity, climate change, or sustainable living. Let’s protect our planet together.':'Saya EcoBot, asisten lingkungan Anda. Tanyakan tentang kebakaran hutan, keanekaragaman hayati, perubahan iklim, atau gaya hidup berkelanjutan. Mari jaga bumi bersama.'
};
let language=ld('language','en')==='id'?'id':'en';
I18N.Chat='Obrolan';
const I18N_EN=Object.fromEntries(Object.entries(I18N).map(([english,indonesian])=>[indonesian,english]));
const translate=text=>language==='id'?(I18N[text]||text):(I18N_EN[text]||text);
const staticTextNodes=[],staticAttributes=[];
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);
while(walker.nextNode()){const node=walker.currentNode;if(!node.parentElement.closest('script,style'))staticTextNodes.push([node,node.nodeValue])}
$$('input,button,a,select,textarea,div,[role]').forEach(node=>['aria-label','title','placeholder'].forEach(attr=>{if(node.hasAttribute(attr))staticAttributes.push([node,attr,node.getAttribute(attr)])}));
function applyStaticLanguage(){staticTextNodes.forEach(([node,original])=>{const leading=original.match(/^\s*/)[0],trailing=original.match(/\s*$/)[0],content=original.slice(leading.length,original.length-trailing.length);node.nodeValue=content?leading+translate(content)+trailing:original});staticAttributes.forEach(([node,attr,original])=>node.setAttribute(attr,translate(original)));document.documentElement.lang=language;document.title=language==='id'?'GO GREEN — Lindungi Hutan, Jaga Masa Depan Kita':'GO GREEN — Protect Our Forests, Secure Our Future';const desc=document.querySelector('meta[name="description"]');if(desc)desc.content=language==='id'?'Jelajahi deteksi titik panas NASA FIRMS di Lampung, pelajari konservasi hutan, dan bangun kebiasaan ramah lingkungan bersama GO GREEN.':'Explore NASA FIRMS hotspot detections for Lampung, learn about forest conservation, and build practical environmental habits with GO GREEN.';$$('[data-lang]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.lang===language)))}
function setLanguage(next){if(!['id','en'].includes(next)||next===language)return;language=next;sv('language',language);applyStaticLanguage();refreshLanguage()}
applyStaticLanguage();
$$('.lang-switch [data-lang]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.lang)));
const mod=$('#modal');function openM(t,b){$('#mT').textContent=t;const B=$('#mB');B.replaceChildren(...(Array.isArray(b)?b:[el('p',b)]));mod.showModal()}$('#mX').onclick=()=>mod.close();
/* NAV */
$('#burger').onclick=()=>{const o=$('#menu').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
$$('#menu a').forEach(a=>a.addEventListener('click',()=>{$('#menu').classList.remove('open');$('#burger').setAttribute('aria-expanded','false')}));
addEventListener('scroll',()=>$('#nav').classList.toggle('sm',scrollY>40));
new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+e.target.id));ctx=e.target.id;chipsFor()}}),{threshold:.4}).observe&&$$('main section').forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('#menu a').forEach(a=>a.classList.toggle('on',a.getAttribute('href')=='#'+s.id));ctx=s.id;chipsFor()}}),{rootMargin:'-35% 0px -55% 0px',threshold:0}).observe(s));
/* CARDS */
const CR=[['Forest Fires','Land clearing, deliberate burning, accidental ignition, and dry conditions can all contribute to forest and land fires.','Fires can start or spread when dry vegetation meets ignition sources. Prevention relies on avoiding open burning, early reporting, and community awareness.'],
['Biodiversity Loss','Habitat destruction threatens wildlife, ecological balance, and vulnerable species.','When forests shrink or fragment, animals lose food, shelter, and migration routes, and ecosystems become less resilient.'],
['Climate and Air Pollution','Forest fires release smoke and pollutants, affect air quality, and contribute to greenhouse gas emissions.','Smoke can harm health, especially for children, older adults, and people with respiratory conditions. Burning also releases carbon stored in vegetation.']];
const ED=[['Plant and Care for Trees','Choose native species, water young trees, and keep checking on them.','Plant native species suited to your area, protect saplings from damage, and keep caring for them after planting.'],
['Reduce, Reuse, Recycle','Cut waste at the source first.','Carry a bottle and bag, repair before replacing, and separate waste so recyclables stay clean.'],
['Save Water and Energy','Small daily habits add up.','Fix leaks, shorten showers, switch off unused lights and devices, and unplug idle chargers.'],
['Protect Wildlife and Habitats','Respect wild animals and their homes.','Do not buy wild-caught pets, keep distance from wildlife, avoid littering, and support conservation groups.']];
function cards(id,arr,btn,im){const c=$(id);arr.forEach(([t,s,d],n)=>{const title=translate(t),k=el('article',null,'card im'),g=el('img');g.src=im[n];g.alt=title;const bd=el('div',null,'bd');bd.append(el('h3',title),el('p',translate(s)));const b=el('button',translate(btn),'btn dark');b.onclick=()=>openM(title,translate(d));bd.append(b);k.append(g,bd);c.append(k)})}
cards('#crisisCards',CR,'Learn More',['assets/photos/forest%20fire.jpg','assets/photos/Biodiversity%20Loss.jpg','assets/photos/Climate%20and%20Air%20Pollution.jpg']);cards('#learnCards',ED,'Discover More',['assets/photos/Plant%20and%20Care%20for%20Trees.jpg','assets/photos/Reduce%2C%20Reuse%2C%20Recycle.jpg','assets/photos/Save%20Water%20and%20Energy.jpg','assets/photos/Protect%20Wildlife%20and%20Habitats.jpg']);
$('#srcs').append(...[['Ministry of Forestry (KLHK)','https://www.menlhk.go.id'],['BNPB','https://bnpb.go.id'],['BMKG','https://www.bmkg.go.id'],['Global Forest Watch','https://www.globalforestwatch.org'],['UNEP','https://www.unep.org'],['NASA Earth','https://earth.gov']].map(([n,u])=>{const l=el('li'),a=el('a',n);a.href=u;a.target='_blank';a.rel='noopener noreferrer';l.append(a);return l}));
/* FORESTWATCH — NASA FIRMS */
let H=[];
const COL={HIGH:'#C84C42',MEDIUM:'#E98235',LOW:'#E9B635'};
let map,layer,mk={};
let fwState={loading:false,error:null,nasaMessage:null,lastUpdated:null,latestDetection:null,mapError:null,unavailableSensors:[],timeMode:'7d'};

const FIRMS_API='/api/hotspots';
const LAMPUNG_VIEW=[-4.9,105.2];

try{
  if(!window.L)throw new Error('Leaflet unavailable');
  map=L.map('map').setView(LAMPUNG_VIEW,8);
  const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19}).addTo(map);
  tiles.on('tileerror',()=>{
    if(fwState.mapError)return;
    fwState.mapError='Map tiles are unavailable. Hotspot data can still be reviewed in the list.';
    setWatchState(fwState.mapError,'error');
  });
  layer=L.layerGroup().addTo(map);
}catch{
  map=null;
  fwState.mapError='Map unavailable (offline or blocked). Hotspot data can still be reviewed in the list.';
  $('#map').textContent=translate(fwState.mapError);
}

function normalizeConfidence(v){
  const x=String(v??'').trim().toLowerCase();
  if(x==='h'||x==='high')return 'HIGH';
  if(x==='n'||x==='nominal')return 'MEDIUM';
  if(x==='l'||x==='low')return 'LOW';
  return null;
}

function normalizeHotspot(row,i){
  const lat=Number(row.latitude),lng=Number(row.longitude);
  if(!Number.isFinite(lat)||!Number.isFinite(lng))return null;
  const d=String(row.acq_date||'').slice(0,10);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(d))return null;
  const conf=normalizeConfidence(row.confidence);
  if(!conf)return null;
  const id=[d,row.acq_time,row.latitude,row.longitude,row.satellite||row.instrument||'',i].join('_');
  const rawTime=String(row.acq_time??'').trim().padStart(4,'0');
  const timeUtc=rawTime.length===4?`${rawTime.slice(0,2)}:${rawTime.slice(2)}`:'—';
    return {id,n:'Hotspot '+(i+1),r:'Lampung',d,c:null,k:conf,sourceConfidence:normalizeConfidence(row.confidence)||'—',lat,lng,frp:Number.isFinite(Number(row.frp))?Number(row.frp):null,satellite:String(row.satellite||'—'),instrument:String(row.instrument||'—'),daynight:String(row.daynight||'—'),version:String(row.version||'—'),timeUtc,w:'A hotspot is an indication of a thermal anomaly detected by satellite, not confirmation of a fire.'};
}

function setWatchState(text,kind='info'){
  const tag=$('#watchStatus');
  if(!tag)return;
  tag.textContent=translate(text);
  tag.className='tag '+(kind==='error'?'warn':'');
}

function todayUtcDate(){return new Date().toISOString().slice(0,10)}
function detectionDateTime(h){
  const raw=String(h.d||'')+'T'+String(h.timeUtc||'00:00').padStart(5,'0')+':00Z';
  const dt=new Date(raw);
  return Number.isNaN(dt.getTime())?null:dt;
}
function dateMinusDaysLocal(date,days){
  const d=new Date(`${date}T00:00:00Z`);d.setUTCDate(d.getUTCDate()-days);return d.toISOString().slice(0,10);
}
function activePeriod(){
  const now=new Date(),today=todayUtcDate(),selected=$('#fDate')?.value||'';
  if(selected)return {label:`${language==='id'?'tanggal':'date'} ${selected}`,test:h=>h.d===selected};
  if(fwState.timeMode==='today')return {label:`${language==='id'?'hari ini':'today'} ${today}`,test:h=>h.d===today};
  if(fwState.timeMode==='24h'){
    const cutoff=new Date(now.getTime()-24*60*60*1000);
    return {label:language==='id'?'24 jam terakhir':'last 24 hours',test:h=>{const dt=detectionDateTime(h);return dt&&dt>=cutoff&&dt<=now;}};
  }
  const from=dateMinusDaysLocal(today,6);
  return {label:language==='id'?'7 hari terakhir':'last 7 days',test:h=>h.d>=from&&h.d<=today};
}
function setTimeMode(mode){
  fwState.timeMode=mode;
  const date=$('#fDate');if(date)date.value='';
  $$('.time-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  loadHotspots();
}
function renderWatch(){
  const k=$('#fCat').value,period=activePeriod();
  const D=H.filter(h=>(!k||h.k===k)&&period.test(h));
  const filterLabel=[k&&(language==='id'?`kategori ${k.toLowerCase()}`:`category ${k.toLowerCase()}`),period.label].filter(Boolean).join(' · ');
  const filterNote=filterLabel?` · ${filterLabel}`:'';
  const dist=[['HIGH','H'],['MEDIUM','M'],['LOW','L']].map(([c,l])=>`${l}:${D.filter(h=>h.k===c).length}`).join(' ');
  $('#stats').replaceChildren(
    ...[[translate('Hotspots'),D.length],[translate('Coverage'),'Lampung'],[translate('Confidence (H/M/L)'),dist],[translate('NASA retrieval'),fwState.lastUpdated||'—'],[translate('Latest detection (UTC)'),fwState.latestDetection||'—']].map(([l,v])=>{const d=el('div');d.append(el('b',v),el('span',l));return d})
  );
  const ul=$('#hotList');ul.replaceChildren();
  if(!D.length)ul.append(el('li',fwState.error?translate('No hotspot data available. Use Retry after checking the connection.'):(H.length?(language==='id'?`Tidak ada titik panas yang sesuai dengan periode pilihan${k?` dan kategori ${k.toLowerCase()}`:''}.`:`No hotspots match the selected period${k?` and ${k.toLowerCase()} category`:''}.`):translate('NASA FIRMS returned no hotspot records for the selected period.'))));
  if(D.length===0 && !fwState.error)setWatchState(language==='id'?`Data NASA FIRMS dimuat · 0 catatan sesuai filter saat ini${filterNote}.`:`NASA FIRMS data loaded · 0 records match current filters${filterNote}.`,'info');
  if(layer){layer.clearLayers();mk={}}
  D.forEach((h,idx)=>{
    const li=el('li'),s=el('span',`${language==='id'?'Titik panas':'Hotspot'} ${idx+1} · ${h.k}`);li.append(s);
    const b=el('button',translate('View on Map'));
    b.onclick=()=>{if(map){$('#map').scrollIntoView({block:'center'});map.setView([h.lat,h.lng],11);mk[h.id]?.openPopup()}else openM(translate('Hotspot detail'),h.w)};
    li.append(b);ul.append(li);
    if(layer){
      const m=L.circleMarker([h.lat,h.lng],{radius:2.2,color:COL[h.k],fillColor:COL[h.k],fillOpacity:.9,weight:0.8}).addTo(layer);
      const p=el('div','', 'fw-popup');
      p.append(el('b',`${language==='id'?'Titik panas':'Hotspot'} · ${h.k}`),el('div',`Lampung · ${h.d} ${h.timeUtc||''} UTC`),el('div',`${translate('Confidence:')} ${h.sourceConfidence}`),el('div',`${translate('Satellite:')} ${h.satellite}`),el('div',`${translate('Instrument:')} ${h.instrument}`),el('div',`FRP: ${Number.isFinite(h.frp)?h.frp+' MW':'—'}`),el('div',`${translate('Day/Night:')} ${h.daynight}`),el('div',`${translate('Version:')} ${h.version}`),el('div',language==='id'?'Titik panas adalah indikasi anomali termal dari pengamatan satelit, bukan konfirmasi kebakaran.':h.w));
      m.bindPopup(p);
      m.on('click',()=>{[...ul.children].forEach((item,j)=>item.classList.toggle('active',D[j]?.id===h.id));});
      mk[h.id]=m;
    }
  });
}

function updateWatchStatus(force=false){
  if(fwState.loading&&!force)return;
  if(fwState.error){
    const errorMessage=language==='id'&&/^NASA FIRMS request failed \((\d+)\)$/.test(fwState.error)?fwState.error.replace('NASA FIRMS request failed','Permintaan NASA FIRMS gagal'):fwState.error;
    setWatchState(`${language==='id'?'NASA FIRMS tidak tersedia':'NASA FIRMS unavailable'}: ${errorMessage}${fwState.nasaMessage?` ${fwState.nasaMessage}`:''}`,'error');
    return;
  }
  if(fwState.mapError){setWatchState(fwState.mapError,'error');return}
  const selected=$('#fDate').value,mode=selected?'date':fwState.timeMode,category=$('#fCat').value,period=activePeriod();
  const visible=H.filter(h=>(!category||h.k===category)&&period.test(h)).length;
  if(!visible){const note=[category&&(language==='id'?`kategori ${category.toLowerCase()}`:`category ${category.toLowerCase()}`),period.label].filter(Boolean).join(' · ');setWatchState(language==='id'?`Data NASA FIRMS dimuat · ${visible} catatan sesuai filter saat ini${note?` · ${note}`:''}.`:`NASA FIRMS data loaded · ${visible} records match current filters${note?` · ${note}`:''}.`);return}
  const source=mode==='date'?(language==='id'?'Data historis NASA FIRMS':'NASA FIRMS historical data'):'NASA FIRMS NRT · S-NPP + NOAA-20 + NOAA-21';
  const unavailable=fwState.unavailableSensors.length?language==='id'?` · tidak tersedia: ${fwState.unavailableSensors.join(', ')}`:` · unavailable: ${fwState.unavailableSensors.join(', ')}`:'';
  setWatchState(language==='id'?`${source} · ${H.length} catatan titik panas valid · diambil ${fwState.lastUpdated}${unavailable} · tingkat keyakinan LOW / MEDIUM / HIGH`:`${source} · ${H.length} valid hotspot records · retrieved ${fwState.lastUpdated}${unavailable} · confidence shown as LOW / MEDIUM / HIGH`);
}

async function loadHotspots(){
  if(fwState.loading)return;
  fwState.loading=true;fwState.error=null;
  const selected=$('#fDate')?.value||'';
  const mode=selected?'date':fwState.timeMode;
  const label=mode==='date'?`NASA FIRMS data for ${selected}`:mode==='today'?'NASA FIRMS data for TODAY':mode==='24h'?'NASA FIRMS data for the last 24 hours':'NASA FIRMS data for the last 7 days';
  const translatedLabel=language==='id'?mode==='date'?`data NASA FIRMS tanggal ${selected}`:mode==='today'?'data NASA FIRMS hari ini':mode==='24h'?'data NASA FIRMS 24 jam terakhir':'data NASA FIRMS 7 hari terakhir':label;
  setWatchState(`${language==='id'?'Memuat':'Loading'} ${translatedLabel}…`);
  const ul=$('#hotList');ul.replaceChildren(el('li',translate('Loading hotspot data…')));
  try{
    const params=new URLSearchParams({mode});
    if(mode==='date')params.set('date',selected);
    const r=await fetch(`${FIRMS_API}?${params.toString()}`,{headers:{Accept:'application/json'},cache:'no-store'});
    const d=await r.json().catch(()=>({}));
    if(!r.ok){
      const e=new Error(d.error||`NASA FIRMS request failed (${r.status})`);
      if(d.nasaMessage)e.nasaMessage=d.nasaMessage;
      throw e;
    }
    if(!Array.isArray(d.data))throw new Error('Invalid hotspot response structure.');
    H=d.data.map(normalizeHotspot).filter(Boolean);
    fwState.lastUpdated=d.meta?.retrievedAt?new Date(d.meta.retrievedAt).toLocaleString(language==='id'?'id-ID':'en-GB',{dateStyle:'medium',timeStyle:'short'}):new Date().toLocaleString(language==='id'?'id-ID':'en-GB',{dateStyle:'medium',timeStyle:'short'});
    fwState.latestDetection=d.meta?.latestDetectionUtc||null;
    fwState.unavailableSensors=Array.isArray(d.meta?.unavailableSensors)?d.meta.unavailableSensors:[];
    fwState.nasaMessage=null;
    renderWatch();
    if(map && H.length){
      const bounds=L.latLngBounds(H.map(h=>[h.lat,h.lng]));
      if(bounds.isValid()) map.fitBounds(bounds,{padding:[24,24],maxZoom:9});
    }
    updateWatchStatus(true);
  }catch(e){
    H=[];fwState.error=e.message||'Unknown error';fwState.latestDetection=null;
    fwState.nasaMessage=e.nasaMessage||null;renderWatch();updateWatchStatus(true);
  }finally{fwState.loading=false}
}

$('#filters').addEventListener('submit',e=>e.preventDefault());
$('#fCat').addEventListener('change',renderWatch);
$$('.time-mode').forEach(b=>b.addEventListener('click',()=>setTimeMode(b.dataset.mode)));
$('#fDate').max=todayUtcDate();
$('#fDate').addEventListener('change',()=>{
  const value=$('#fDate').value;
  if(!value){setTimeMode('7d');return;}
  fwState.timeMode='date';
  $$('.time-mode').forEach(b=>b.classList.remove('active'));
  loadHotspots();
});
$('#filters').addEventListener('reset',()=>setTimeout(()=>{
  fwState.timeMode='7d';$('#fDate').value='';$('#fCat').value='';
  $$('.time-mode').forEach(b=>b.classList.toggle('active',b.dataset.mode==='7d'));
  loadHotspots();
},0));
const retry=el('button',translate('Retry'),'btn ghost dark');retry.type='button';retry.onclick=loadHotspots;retry.style.marginTop='8px';$('#watchStatus')?.parentElement?.append(retry);
loadHotspots();
/* ECOREPORT */
const rep=()=>ld('reports',[]);
function rr(){const R=rep(),ul=$('#rList');ul.replaceChildren();
const cats={};R.forEach(r=>cats[r.cat]=(cats[r.cat]||0)+1);
$('#rStats').replaceChildren(...[[translate('Saved reports'),R.length],[translate('By category'),Object.entries(cats).map(([k,v])=>`${translate(k)} ${v}`).join(', ')||'—']].map(([l,v])=>{const d=el('div');d.append(el('b',v),el('span',l));return d}));
if(!R.length)ul.append(el('li',translate('No saved reports yet. Use the form to create a record on this device.')));
R.slice().reverse().forEach(r=>{const li=el('li');li.append(el('span',r.id+' · '+r.title));const b=el('button',translate('Details'));b.onclick=()=>openM(r.title,[el('p',`${translate('Local record:')} ${r.id}`),el('p',`${translate('Category')}: ${translate(r.cat)}`),el('p',`${translate('Location:')} ${r.loc}`),el('p',`${translate('Observed:')} ${r.date}`),el('p',r.desc),el('p',r.photo?`${language==='id'?'Foto dipilih':'Photo selected'}: ${r.photo} ${translate('(image not saved)')}`:translate('No photo selected')),el('p',translate('This record is stored only in this browser and has not been sent.'))]);li.append(b);ul.append(li)})}
$('#rDate').max=new Date().toISOString().slice(0,10);
$('#rPhoto').onchange=e=>{const f=e.target.files[0],p=$('#prev'),er=$('#rErr');p.hidden=true;er.textContent='';if(!f)return;
if(!['image/jpeg','image/png','image/webp'].includes(f.type)||f.size>2097152){er.textContent=translate('Photo must be JPG, PNG or WebP and no larger than 2 MB.');e.target.value='';return}
p.src=URL.createObjectURL(f);p.hidden=false};
$('#rform').onsubmit=e=>{e.preventDefault();const v=i=>$(i).value.trim(),er=$('#rErr');
if(!v('#rTitle')||!$('#rCat').value||!v('#rLoc')||!$('#rDate').value||v('#rDesc').length<10){er.textContent=translate('Please complete every required field (description: at least 10 characters).');return}
if(!$('#rOk').checked){er.textContent=translate('Please confirm that this report will remain on this device and will not be sent to authorities.');return}
const R=rep(),id='GG-'+Date.now().toString(36).toUpperCase();
R.push({id,title:v('#rTitle'),cat:$('#rCat').value,loc:v('#rLoc'),date:$('#rDate').value,desc:v('#rDesc'),photo:$('#rPhoto').files[0]?.name||''});sv('reports',R);
e.target.reset();$('#prev').hidden=true;er.textContent='';rr();openM(translate('Report saved on this device'),language==='id'?`Catatan lokal ${id} hanya tersimpan di browser ini. Laporan tidak dikirim kepada pihak berwenang.`:`Local record ${id} is saved in this browser only. It has not been sent to any authority.`)};
$('#rClear').onclick=()=>{if(confirm(translate('Delete all saved reports from this browser?'))){sv('reports',[]);rr()}};rr();
/* GREEN ACTION */
const DAYS=[['assets/photos/Save%20Water%20and%20Energy.jpg','Bring a reusable bottle','Skip bottled drinks today.'],['assets/photos/Reduce%2C%20Reuse%2C%20Recycle.jpg','Reduce single-use plastics','Refuse one plastic bag, straw, or cup.'],['assets/photos/Save%20Water%20and%20Energy.jpg','Save water at home','Shorten a shower and fix a drip.'],['assets/photos/Climate%20and%20Air%20Pollution.jpg','Switch off unnecessary lights','Turn off lights in empty rooms.'],['assets/photos/forest%20fire.jpg','Learn about forest conservation','Read one article from the sources list.'],['assets/photos/Plant%20and%20Care%20for%20Trees.jpg','Care for a plant or tree','Water or tidy a plant.'],['assets/photos/Protect%20Wildlife%20and%20Habitats.jpg','Share an awareness message','Tell one friend what you learned.']];
const BAD=[[0,'—'],[1,'Green Beginner'],[3,'Eco Explorer'],[5,'Forest Protector'],[7,'Green Champion']];
function ar(){const done=ld('done',[]),pts=done.length*10,bd=BAD.filter(b=>done.length>=b[0]).pop()[1];
$('#aStats').replaceChildren(...[[language==='id'?'Selesai':'Completed',done.length+'/7'],[translate('Progress'),Math.round(done.length/7*100)+'%'],[translate('Points'),pts],[translate('Badge'),`${translate(bd)} (${language==='id'?'hari':'days'} 1/3/5/7)`]].map(([l,v])=>{const d=el('div');d.append(el('b',v),el('span',l));return d}));
$('#aBar').style.width=done.length/7*100+'%';
const g=$('#days');g.replaceChildren();DAYS.forEach(([src,t,s],n)=>{const ok=done.includes(n),title=translate(t),c=el('article',null,'card'+(ok?' done':''));const media=el('div',null,'ic challenge-photo'),img=el('img');img.src=src;img.alt=title;img.loading='lazy';img.onerror=()=>{media.replaceChildren(el('span',translate('Image unavailable'),'photo-fallback'))};media.append(img);c.append(media,el('h3',`${language==='id'?'Hari ke-':'Day '}${n+1}: ${title}`),el('p',`${translate(s)} (+10 ${translate('Points').toLowerCase()})`));const b=el('button',translate(ok?'Completed':'Mark complete'),'btn dark');b.disabled=ok;b.onclick=()=>{const d=ld('done',[]);if(!d.includes(n)){d.push(n);sv('done',d)}ar()};c.append(b);g.append(c)})}
$('#aReset').onclick=()=>{if(confirm(language==='id'?'Atur ulang progres tantangan Anda?':translate('Reset your challenge progress?'))){sv('done',[]);ar()}};ar();
/* ECOIMPACT */
const CALC={plastic:(a,b)=>language==='id'?`≈ ${a*b} barang plastik sekali pakai dihindari (perkiraan mandiri)`:`≈ ${a*b} ${translate('single-use plastic items avoided (self-reported estimate)')}`,energy:(a,b)=>language==='id'?`≈ ${(a*b).toFixed(1)} kWh dihemat (perkiraan mandiri)`:`≈ ${(a*b).toFixed(1)} ${translate('kWh saved (self-reported estimate)')}`,trees:(a,b)=>`${translate('Trees recorded:')} ${a}${isNaN(b)?'':`${translate(' · Survival:')} ${(b/a*100).toFixed(0)}%`}`};
$$('.calc').forEach(f=>{f.onsubmit=e=>{e.preventDefault();const o=f.querySelector('output'),a=parseFloat(f.a.value),b=parseFloat(f.b.value);
const tr=f.dataset.c=='trees',bad=isNaN(a)||a<0||(!tr&&(isNaN(b)||b<0))||(tr&&!isNaN(b)&&(b<0||b>a||a==0));
o.textContent=bad?translate('Enter valid non-negative numbers (alive trees cannot exceed planted trees).'):CALC[f.dataset.c](a,b)};f.onreset=()=>f.querySelector('output').textContent=''});
/* RESET */
$('#resetAll').onclick=()=>{if(confirm(language==='id'?'Hapus semua data GO GREEN yang tersimpan di browser ini?':translate('Clear all GO GREEN data saved in this browser?'))){Object.keys(localStorage).filter(k=>k.startsWith(P)&&k!==P+'language').forEach(k=>localStorage.removeItem(k));rr();ar();bm.length=0;$('#msgs').replaceChildren();welcome()}};
/* ECOBOT */
const KB=[
{k:['kebakaran','fire','wildfire','dangerous','bahaya','cause','penyebab','burn','bakar'],en:'Forest fires can harm wildlife and habitats, release smoke that affects health, and emit greenhouse gases. Common contributors include land clearing, deliberate burning, accidental ignition, and dry conditions.',id:'Kebakaran hutan dapat merusak habitat satwa, menghasilkan asap yang mengganggu kesehatan, dan melepas gas rumah kaca. Penyebab umum: pembukaan lahan, pembakaran sengaja, ketidaksengajaan, dan kondisi kering.'},
{k:['prevent','cegah','pencegahan','stop','help','membantu','mencegah'],en:'Ways to help protect forests:\n1. Never burn vegetation or waste near forests.\n2. Avoid activities that could ignite dry vegetation.\n3. Share verified prevention information.\n4. Support responsible conservation programs.\n5. Report suspected illegal burning to local authorities.\n\nIf you see an active fire, keep a safe distance and contact emergency services. Do not fight a dangerous wildfire yourself.',id:'Cara membantu melindungi hutan:\n1. Jangan membakar vegetasi atau sampah dekat hutan.\n2. Hindari aktivitas yang bisa memicu api pada vegetasi kering.\n3. Bagikan informasi pencegahan yang terverifikasi.\n4. Dukung program konservasi yang bertanggung jawab.\n5. Laporkan dugaan pembakaran ilegal ke pihak berwenang setempat.\n\nJika melihat api aktif, jaga jarak aman dan hubungi layanan darurat. Jangan memadamkan kebakaran besar sendiri.'},
{k:['deforestation','deforestasi','penebangan','logging','clearing','gundul'],en:'Deforestation is driven by land conversion (agriculture, plantations, development), logging, and fire. It reduces habitat, stored carbon, and watershed protection.',id:'Deforestasi dipicu alih fungsi lahan (pertanian, perkebunan, pembangunan), penebangan, dan kebakaran. Dampaknya: hilangnya habitat, cadangan karbon, dan perlindungan daerah aliran air.'},
{k:['wildlife','satwa','animal','hewan','biodiversity','biodiversitas','orangutan','habitat'],en:'Protect wildlife: keep your distance, never buy wild-caught animals, avoid littering, support habitat conservation, and report suspected wildlife crime.',id:'Lindungi satwa: jaga jarak, jangan membeli satwa liar tangkapan, jangan buang sampah sembarangan, dukung konservasi habitat, dan laporkan dugaan kejahatan satwa.'},
{k:['plan','rencana','7-day','7 hari','week','minggu','habit','kebiasaan','challenge'],en:'7-day plan: 1 reusable bottle · 2 cut single-use plastics · 3 save water · 4 switch off lights · 5 learn about forests · 6 care for a plant · 7 share a message. Track it in Green Action!',id:'Rencana 7 hari: 1 botol minum ulang · 2 kurangi plastik sekali pakai · 3 hemat air · 4 matikan lampu · 5 belajar tentang hutan · 6 rawat tanaman · 7 bagikan pesan lingkungan. Catat di Green Action!'},
{k:['report','lapor','melapor','pelaporan','ecoreport','problem','masalah'],en:'Use EcoReport to enter a category, location, date, and description. Reports are stored only in this browser and are not sent to authorities. For real incidents, contact local emergency services or environmental agencies.',id:'Gunakan EcoReport untuk mengisi kategori, lokasi, tanggal, dan deskripsi. Laporan hanya disimpan di browser ini dan tidak dikirim ke pihak berwenang. Untuk kejadian nyata, hubungi layanan darurat atau instansi lingkungan setempat.'},
{k:['climate','iklim','warming','pemanasan','carbon','karbon','emisi'],en:'Forests store carbon and influence local climate. Burning or clearing releases carbon and weakens that role.',id:'Hutan menyimpan karbon dan memengaruhi iklim lokal. Pembakaran atau penebangan melepas karbon dan melemahkan fungsi itu.'},
{k:['smoke','asap','haze','kabut','air quality','udara','masker','mask'],en:'In heavy smoke: stay indoors with windows closed, limit outdoor activity, use a well-fitted mask (N95/KN95 type), and follow local health advice.',id:'Saat asap tebal: tetap di dalam ruangan, tutup jendela, batasi aktivitas luar, gunakan masker yang pas (jenis N95/KN95), dan ikuti arahan kesehatan setempat.'},
{k:['waste','sampah','plastic','plastik','recycle','daur'],en:'Reduce first, then reuse, then recycle. Carry a bottle and bag, separate waste, and never burn trash.',id:'Kurangi dulu, lalu pakai ulang, lalu daur ulang. Bawa botol dan tas sendiri, pilah sampah, dan jangan bakar sampah.'},
{k:['tree','pohon','plant','tanam','reforestation','restorasi'],en:'Plant native species, protect saplings, and keep caring for them afterwards. Try the Tree Care Tracker in EcoImpact.',id:'Tanam spesies asli, lindungi bibit, dan terus rawat. Coba Tree Care Tracker di EcoImpact.'},
{k:['website','navigate','menu','feature','fitur','forestwatch','about'],en:'GO GREEN has ForestWatch (NASA FIRMS hotspot map), EcoBot (me), EcoReport, Green Action, and EcoImpact. Use the top menu to jump between them.',id:'GO GREEN punya ForestWatch (NASA FIRMS), EcoBot (saya), EcoReport, Green Action, dan EcoImpact. Gunakan menu atas untuk berpindah.'},
{k:['hello','hi','halo','hai','selamat'],en:'Hello, Green Guardian! Ask me about forests, fires, wildlife, or sustainable living.',id:'Halo, Green Guardian! Tanyakan tentang hutan, kebakaran, satwa, atau hidup berkelanjutan.'}];
const ID_RE=/\b(apa|bagaimana|cara|kenapa|mengapa|hutan|yang|dan|saya|bisa|untuk|tolong|sampah|lapor|kebakaran|hewan|bahaya|rencana|dengan|itu|ini|di|ke)\b/i;
const reply=q=>{const t=q.toLowerCase(),id=language==='id'||ID_RE.test(t);let best=null,sc=0;KB.forEach(e=>{const s=e.k.reduce((a,w)=>a+(t.includes(w)?1:0),0);if(s>sc){sc=s;best=e}});
if(best&&/cegah|prevent|mencegah|help|membantu|stop/.test(t)&&/fire|api|kebakaran|hutan|forest/.test(t))best=KB[1];
return best?(id?best.id:best.en):(id?'Maaf, saya belum punya jawaban untuk itu. Coba tanyakan tentang kebakaran hutan, deforestasi, satwa, sampah, atau cara melapor.':`I don't have an answer for that yet. ${translate('Try asking about forest fires, deforestation, wildlife, waste, or how to report a problem.')}`)};
const bm=[];let ctx='home';
const CH={default:['Why are forest fires dangerous?','How can we prevent forest fires?','What causes deforestation?','How can I protect wildlife?','Give me a 7-day Go Green plan.','How can I report an environmental problem?'],
watch:['How do I read hotspot data?','Why are forest fires dangerous?','Why are hotspots important?'],report:['How can I report an environmental problem?','Is it safe to report a fire?'],action:['Give me a 7-day Go Green plan.','How can I reduce plastic waste?']};
function chipsFor(){const c=$('#chips');c.replaceChildren();(CH[ctx]||CH.default).forEach(q=>{const b=el('button',translate(q));b.type='button';b.onclick=()=>send(q);c.append(b)})}
function add(t,w){const m=el('div',t,'m '+w);$('#msgs').append(m);$('#msgs').scrollTop=1e9;return m}
function welcome(){add(language==='id'?'Halo, Green Guardian. Saya EcoBot, asisten lingkungan Anda. Tanyakan tentang kebakaran hutan, keanekaragaman hayati, perubahan iklim, atau gaya hidup berkelanjutan. Mari jaga bumi bersama.':`Hi, Green Guardian. ${translate('I’m EcoBot, your environmental assistant. Ask me about forest fires, biodiversity, climate change, or sustainable living. Let’s protect our planet together.')}`,'b')}
function send(q){q=q.trim();if(!q){$('#bin').placeholder=language==='id'?'Silakan tulis pertanyaan terlebih dahulu.':translate('Please type a question first.');return}add(q,'u');$('#bin').value='';const ty=add(translate('EcoBot is typing…'),'b');setTimeout(()=>{try{ty.textContent=/hotspot|titik panas/i.test(q)?translate('ForestWatch markers come from NASA FIRMS satellite hotspot detections. They indicate thermal anomalies, include a confidence value, and are not confirmation of a fire; ground verification is still needed.'):reply(q)}catch{ty.textContent=translate('Something went wrong. Please try again.')}$('#msgs').scrollTop=1e9},500)}
$('#bform').onsubmit=e=>{e.preventDefault();send($('#bin').value)};
const open=()=>{$('#bot').hidden=false;$('#bot').classList.remove('min');$('#bin').focus()};
$('#botBtn').onclick=()=>$('#bot').hidden?open():($('#bot').hidden=true);$('#botX').onclick=()=>$('#bot').hidden=true;$('#botMin').onclick=()=>$('#bot').classList.toggle('min');
$('#botClear').onclick=()=>{$('#msgs').replaceChildren();welcome()};$('#openBot2').onclick=open;$('[data-bot]').addEventListener('click',open);
welcome();chipsFor();

$('#openBot3').onclick=open;
$('#qbar').onsubmit=e=>{e.preventDefault();$('#fCat').value=$('#qC').value;renderWatch();$('#watch').scrollIntoView()};

function refreshLanguage(){
  $('#crisisCards').replaceChildren();$('#learnCards').replaceChildren();
  cards('#crisisCards',CR,'Learn More',['assets/photos/forest%20fire.jpg','assets/photos/Biodiversity%20Loss.jpg','assets/photos/Climate%20and%20Air%20Pollution.jpg']);
  cards('#learnCards',ED,'Discover More',['assets/photos/Plant%20and%20Care%20for%20Trees.jpg','assets/photos/Reduce%2C%20Reuse%2C%20Recycle.jpg','assets/photos/Save%20Water%20and%20Energy.jpg','assets/photos/Protect%20Wildlife%20and%20Habitats.jpg']);
  renderWatch();updateWatchStatus();rr();ar();chipsFor();
  $('#rErr').textContent=translate($('#rErr').textContent);
  const retryButton=[...$('#watchStatus').parentElement.querySelectorAll('button')].find(button=>button.type==='button');
  if(retryButton)retryButton.textContent=translate('Retry');
  if(!map&&fwState.mapError)$('#map').textContent=translate(fwState.mapError);
  $$('.calc').forEach(f=>{if(f.querySelector('output').textContent&&f.a.value)f.onsubmit({preventDefault(){}})});
  const first=$('#msgs').firstElementChild;
  if($('#msgs').children.length===1&&first?.classList.contains('b')&&(first.textContent.startsWith('Hi, Green Guardian.')||first.textContent.startsWith('Halo, Green Guardian.'))){$('#msgs').replaceChildren();welcome()}
}

/* UI ENHANCEMENT — animasi muncul saat scroll (hanya menambah class, tidak mengubah logika di atas) */
(()=>{
  const all=()=>$$('.rv,.rv-fade,.stagger');
  try{
    const STAG='#crisisCards,#learnCards,#impact .grid3,#about .grid3,.steps,#srcs';
    $$('main>section:not(.hero)').forEach(sec=>[...sec.children].forEach(ch=>{
      if(ch.matches(STAG))ch.classList.add('stagger');
      else if(ch.matches('.split'))ch.classList.add('rv-fade');
      else ch.classList.add('rv');
    }));
    if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){all().forEach(e=>e.classList.add('in'));return}
    const io=new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');o.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:0});
    all().forEach(e=>io.observe(e));
  }catch{all().forEach(e=>e.classList.add('in'))}
})();
