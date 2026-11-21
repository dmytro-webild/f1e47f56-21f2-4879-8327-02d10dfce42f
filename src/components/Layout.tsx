import { Outlet } from "react-router-dom";
import NavbarMenuPill from "@/components/navbars/NavbarMenuPill";
import FooterWordmarkLanding from "@/components/sections/footer/FooterWordmarkLanding";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="default" data-card="filled" data-pattern="none">
      <header data-webild-section="Header">
        <NavbarMenuPill
          brand="VEYRO STUDIO"
          navItems={[
            {
              name: "Beranda",
              href: "#hero"
            },
            {
              name: "Layanan",
              href: "#services"
            },
            {
              name: "Karya",
              href: "#gallery"
            },
            {
              name: "Proses",
              href: "#process"
            },
            {
              name: "Kontak",
              href: "#contact"
            }
          ]}
          contact={{
            text: "hello@veyro.studio",
            href: "mailto:hello@veyro.studio"
          }}
        />
      </header>
      <main className="flex-grow" data-button="default" data-card="filled" data-pattern="none">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer" className="relative z-[45]">
        <FooterWordmarkLanding
          brand="VEYRO STUDIO"
          links={[
            {
              text: "Layanan",
              href: "#services"
            },
            {
              text: "Karya",
              href: "#gallery"
            },
            {
              text: "Proses",
              href: "#process"
            },
            {
              text: "Kontak",
              href: "#contact"
            }
          ]}
          tagline="Setiap hal baik dimulai dari sebuah percakapan."
          copyright="© 2026 Veyro Studio. Hak cipta dilindungi."
        />
      </footer>
    </div>
  );
}
