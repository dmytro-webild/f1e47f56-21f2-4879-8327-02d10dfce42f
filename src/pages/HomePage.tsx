import HeroShapeSplit from "@/components/sections/hero/HeroShapeSplit";
import GalleryWordPanels from "@/components/sections/gallery/GalleryWordPanels";
import ServicesGhostList from "@/components/sections/features/ServicesGhostList";
import ProcessBentoPanels from "@/components/sections/features/ProcessBentoPanels";
import PricingEditorialGrid from "@/components/sections/pricing/PricingEditorialGrid";
import CtaFloatingScreens from "@/components/sections/statement/CtaFloatingScreens";
import TestimonialPortraitQuote from "@/components/sections/testimonial/TestimonialPortraitQuote";
import FaqHairlineIndex from "@/components/sections/faq/FaqHairlineIndex";
import ContactUnderlineForm from "@/components/sections/contact/ContactUnderlineForm";
import ModelStage from "@/components/kit/ModelStage";
import VeyroLogo3D from "@/components/models/VeyroLogo3D";
import LoaderWordmarkHandoff from "@/components/loaders/LoaderWordmarkHandoff";

export default function HomePage() {
  return (
    <>
      <ModelStage
        model={<VeyroLogo3D />}
        fixed={{
          sm: {
            y: 0.8,
            scale: 0.7
          },
          scroll: {
            rotate: 540,
            tilt: 14,
            scale: 0.08,
            x: 0.05
          }
        }}
        dpr={{
          lg: 1.5,
          sm: 1.25
        }}
      />

      <LoaderWordmarkHandoff
        brand="Fasya's Digital Agency"
      />

      <div id="hero" data-webild-section="HeroShapeSplit" data-webild-section-id="HeroShapeSplit-1" data-section="hero" className="relative z-[45] bg-transparent">
        <HeroShapeSplit
          tag="00 / INTRO"
          title="Bisnis yang baik, layak hadir dengan baik."
          description="Jasa pembuatan website profesional dengan fondasi SEO kuat untuk membangun kepercayaan bisnis."
          primaryButton={{
            text: "Lihat karya",
            href: "#gallery"
          }}
          secondaryButton={{
            text: "Layanan kami",
            href: "#services"
          }}
          scrollLabel="Gulir ke bawah"
          introDelay={1.7}
        />
      </div>

      <div id="gallery" data-webild-section="GalleryWordPanels" data-webild-section-id="GalleryWordPanels-1" data-section="gallery" className="relative z-[45] bg-transparent" data-scene>
        <GalleryWordPanels
          label="02 / Karya Pilihan"
          title=""
          items={[
            {
              title: "RESTORAN",
              category: "Desain Web Restoran",
              description: "Pengalaman digital interaktif dan menggugah selera untuk bisnis kuliner JASA.",
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-young-young-woman-sitting-modern-cafe_171337-17121.jpg",
              imageAlt: "Portrait of a young young woman sitting at the modern cafe"
            },
            {
              title: "BISNIS",
              category: "UMKM",
              description: "Website sistem informasi terstruktur berbasis solusi untuk operasional efektif.",
              imageSrc: "https://img.b2bpic.net/free-photo/company-managers-gathering-meeting-room-watching-project-presentation-computer-monitor-together-holding-paper-report-business-communication-teamwork-concept_74855-11622.jpg",
              imageAlt: "Company managers gathering in meeting room, watching project presentation on computer monitor together, holding paper report. Business communication or teamwork concept"
            },
            {
              title: "PORTOFOLIO",
              category: "Identitas Digital",
              description: "Presentasi portofolio premium dengan fokus pada tipografi editorial dan estetika bersih.",
              imageSrc: "https://img.b2bpic.net/free-photo/still-life-office-desk-mess_23-2150164797.jpg",
              imageAlt: "Still life of office desk  mess"
            },
            {
              title: "JASA",
              category: "Website Jasa",
              description: "Kehadiran digital yang kuat dan tepercaya untuk memperluas jangkauan pasar.",
              imageSrc: "https://img.b2bpic.net/free-photo/professional-programmer-working-late-dark-office_1098-18705.jpg",
              imageAlt: "Professional programmer working late in the dark office"
            },
            {
              title: "PLATFORM",
              category: "Platform Layanan",
              description: "Arsitektur informasi dan navigasi efisien untuk kenyamanan pengguna.",
              imageSrc: "https://img.b2bpic.net/free-photo/minimalist-display-ceramic-vases-white-gallery_23-2151984823.jpg",
              imageAlt: "Minimalist display of ceramic vases in a white gallery"
            }
          ]}
        />
      </div>

      <div id="services" data-webild-section="ServicesGhostList" data-webild-section-id="ServicesGhostList-1" data-section="services" className="relative z-[45] bg-transparent">
        <ServicesGhostList
          tag="Layanan Utama"
          items={[
            {
              title: "Desain Website",
              description: "Desain yang langsung ngomong 'ini serius' tanpa banyak kata.."
            },
            {
              title: "Pengembangan Web",
              description: "Website yang klien kalian bangga tunjukin ke orang."
            },
            {
              title: "Fondasi SEO",
              description: "Struktur data teroptimasi agar website bisnis Anda mudah ditemukan di Google."
            },
            {
              title: "Website Bisnis",
              description: "Solusi web profesional untuk meningkatkan kredibilitas dan kepercayaan pelanggan."
            },
            {
              title: "Optimasi Performa",
              description: "Kecepatan akses tinggi dan navigasi mulus demi kenyamanan pengunjung website.",
              button: {
                text: "Konsultasi Layanan",
                href: "#contact"
              }
            }
          ]}
          description="Solusi pembuatan website dengan estetika elegan dan fondasi SEO kuat."
        />
      </div>

      <div id="process" data-webild-section="ProcessBentoPanels" data-webild-section-id="ProcessBentoPanels-1" data-section="process" className="relative z-[45] bg-transparent">
        <ProcessBentoPanels
          tag="04 / Pendekatan"
          title="Rapi dari awal hingga rilis"
          description="Prinsip kerja terencana untuk hasilkan website yang presisi."
          items={[
            {
              title: "Pahami bisnis",
              description: "Kami mendalami tujuan bisnis dan pesan utama sebelum mulai membuat desain."
            },
            {
              title: "Desain terarah",
              description: "Merancang tata letak editorial yang rapi dan sesuai dengan identitas Anda."
            },
            {
              title: "Kode yang bersih",
              description: "Mengembangkan struktur website yang cepat, aman, dan mudah ditemukan di Google."
            },
            {
              title: "Sempurnakan detail",
              description: "Memastikan setiap elemen berfungsi baik sebelum website resmi diluncurkan."
            }
          ]}
        />
      </div>

      <div id="pricing" data-webild-section="PricingEditorialGrid" data-webild-section-id="PricingEditorialGrid-1" data-section="pricing" className="relative z-[45] bg-transparent">
        <PricingEditorialGrid />
      </div>

      <div id="cta" data-webild-section="CtaFloatingScreens" data-webild-section-id="CtaFloatingScreens-1" data-section="cta" className="relative z-[45] bg-transparent">
        <CtaFloatingScreens
          tag="Mulai Proyek"
          title="Setiap hal baik dimulai dari percakapan."
          word="KOLABORASI"
          primaryButton={{
            text: "Konsultasi Gratis",
            href: "#contact"
          }}
          secondaryButton={{
            text: "Lihat Portofolio",
            href: "#gallery"
          }}
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/background-with-simple-white-walls-furniture_23-2151020126.jpg",
              imageAlt: "Background with simple white walls and furniture"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/laptop-plant-near-notebook-smartphone_23-2147768849.jpg",
              imageAlt: "Laptop and plant near notebook and smartphone"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/examining-annual-report_1098-21565.jpg",
              imageAlt: "Examining annual report"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-beautiful-woman-posing-flowy-red-dress-with-copy-space_23-2149020831.jpg",
              imageAlt: "Portrait of beautiful woman posing in a flowy red dress with copy space"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/front-view-casual-clothes-with-vintage-suitcase_23-2148610414.jpg",
              imageAlt: "Front view casual clothes with vintage suitcase"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/top-view-epiphany-day-desserts-with-copy-space_23-2148740613.jpg",
              imageAlt: "Top view of epiphany day desserts with copy space"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/handsome-man-wearing-white-shirt-black-stylish-hat-using-wireless-internet-connection-his-mobile-phone-messaging-friends-online-via-social-networks-while-sitting-table-cozy-cafe_273609-1511.jpg",
              imageAlt: "Handsome man wearing white shirt and black stylish hat using wireless internet connection on his mobile phone, messaging friends online via social networks while sitting at table at cozy cafe"
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialPortraitQuote" data-webild-section-id="TestimonialPortraitQuote-1" data-section="testimonial" className="relative z-[45] bg-transparent">
        <TestimonialPortraitQuote
          label="Kata Klien Kami"
          title="Dipercaya Oleh Bisnis Berdedikasi"
          items={[
            {
              quote: 'Fasya\'s Digital Agency berhasil menerjemahkan identitas Euforia Eatery ke dalam website yang sangat elegan dan responsif. "Websitenya bagus, tante suka makasii yaa" Itu kata mereka. Kepercayaan pelanggan kami meningkat pesat sejak tampilan baru ini diluncurkan.',
              name: "Euforia Eatery",
              role: "Pendiri, Euforia Eatery",
              imageSrc: "https://storage.googleapis.com/webild/users/user_3MPb0JT5Eznw1anwCu1RDDh9605/uploaded-1795337990408-63slylvj.mp4",
              imageAlt: "Image of asian businesswoman in suit holding mobile phone using smartphone app smiling at camera white background"
            },
            {
              quote: "Desain minimalis dan struktur SEO yang dibangun Fasya's Digital Agency membuat produk UMKM jauh lebih mudah ditemukan di Google. Proses kerjanya sangat terstruktur dan tepat waktu.",
              name: "Budi Gunawan",
              role: "Pemilik, Studio UMKM",
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-attractive-asian-student-with-textbook-dreamily-looking-away-library-young-man-studying-university_574295-2331.jpg",
              imageAlt: "Portrait of attractive asian student with textbook dreamily looking away in library Young man studying in university"
            },
            {
              quote: "Situs bisnis kami kini terasa jauh lebih profesional dan tepercaya. Sentuhan desain editorial dari Fasya's Digital Agency benar-benar membedakan kami dari kompetitor di industri.",
              name: "Nadia Hidayat",
              role: "Founder, Brand Lokal",
              imageSrc: "https://img.b2bpic.net/free-photo/copy-space-woman-her-phone-concept_23-2148286062.jpg",
              imageAlt: "Copy space woman on her phone concept"
            }
          ]}
        />
      </div>

      <div id="faq" data-webild-section="FaqHairlineIndex" data-webild-section-id="FaqHairlineIndex-1" data-section="faq" className="relative z-[45] bg-transparent">
        <FaqHairlineIndex
          tag="06 / PERTANYAAN"
          title="Hal yang sering ditanyakan"
          items={[
            {
              title: "Mengapa website penting untuk bisnismu?",
              description: "Website adalah media resmi yang membangun kredibilitas penuh tanpa bergantung pada algoritma media sosial."
            },
            {
              title: "Bagaimana penerapan SEO foundation?",
              description: "Kami mengatur struktur HTML teknis, kecepatan muat, metadata, serta arsitektur konten agar mudah dibaca Google."
            },
            {
              title: "Berapa lama estimasi pengerjaan website?",
              description: "Proyek standar selesai dalam waktu 2 hingga 4 minggu sesuai dengan cakupan fitur yang disepakati."
            },
            {
              title: "Apakah klien bisa mengedit konten sendiri?",
              description: "Setiap website dilengkapi CMS ringkas yang mudah dikelola mandiri, lengkap dengan petunjuk penggunaan tertulis."
            },
            {
              title: "Berapa investasi pembuatan website?",
              description: "Layanan pembuatan website profesional Fasya's Digital Agency dimulai dari harga Rp 5.000.000 hingga Rp 8.500.000."
            }
          ]}
        />
      </div>

      <div id="contact" data-webild-section="ContactUnderlineForm" data-webild-section-id="ContactUnderlineForm-1" data-section="contact" className="relative z-[45] bg-transparent">
        <ContactUnderlineForm
          title="Mulai percakapan proyek Anda"
          fields={[
            {
              name: "name",
              label: "Nama Lengkap",
              placeholder: "Nama lengkap Anda",
              required: true
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              placeholder: "fasyasagency@gmail.com",
              required: true
            },
            {
              name: "message",
              label: "Detail Proyek",
              type: "textarea",
              placeholder: "Jelaskan kebutuhan website dan target bisnis Anda",
              required: true
            }
          ]}
          servicesLabel="Pilih Layanan"
          services={[
            "Desain Website",
            "Website Bisnis",
            "Website UMKM",
            "SEO Foundation"
          ]}
          button={{
            text: "Kirim Pesan"
          }}
        />
      </div>
    </>
  );
}
