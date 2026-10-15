/*
 * KONFIGURASI CAHAYA HOME SERVICE
 * 1. Isi whatsapp dengan nomor WhatsApp internasional tanpa tanda +, spasi, atau strip.
 *    Contoh format Indonesia: 6281234567890
 * 2. Isi phone dengan nomor yang bisa ditelepon, format internasional disarankan.
 * 3. Isi address dengan alamat lengkap yang ingin ditampilkan di website.
 * 4. Isi mapUrl dengan tautan Google Maps lokasi bisnis. Jangan gunakan alamat pribadi
 *    jika tidak ingin dipublikasikan.
 */
const SITE_CONFIG = {
  whatsapp: "", // Contoh: "6281234567890"
  phone: "",    // Contoh: "+6281234567890"
  address: "",  // Contoh: "Nama jalan, kelurahan, kecamatan, kota, provinsi"
  mapUrl: ""    // Contoh: "https://maps.google.com/?q=..."
};

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  function closeMenu() {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Buka menu" : "Tutup menu");
      siteNav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    siteNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 850) closeMenu();
    });
  }

  // WhatsApp links use the configured number; otherwise they explain what to configure.
  document.querySelectorAll(".js-whatsapp").forEach(link => {
    if (SITE_CONFIG.whatsapp.trim()) {
      const message = encodeURIComponent("Halo Cahaya Home Service, saya ingin bertanya tentang layanan renovasi/perbaikan rumah.");
      link.href = `https://wa.me/${SITE_CONFIG.whatsapp.trim()}?text=${message}`;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "https://wa.me/";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Nomor WhatsApp belum diatur. Buka javascript.js, lalu isi SITE_CONFIG.whatsapp dengan nomor Anda dalam format internasional, misalnya 6281234567890.");
      });
    }
  });

  // Phone contact: don't create a fake number when configuration is blank.
  document.querySelectorAll(".js-phone").forEach(link => {
    const phone = SITE_CONFIG.phone.trim();
    if (phone) {
      link.href = `tel:${phone.replace(/[^\d+]/g, "")}`;
      link.textContent = phone;
    } else {
      link.href = "#kontak";
      link.textContent = "Nomor telepon belum diatur";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Nomor telepon belum diatur. Isi SITE_CONFIG.phone di javascript.js.");
      });
    }
  });

  document.querySelectorAll(".js-address").forEach(element => {
    element.textContent = SITE_CONFIG.address.trim() || "Alamat lengkap belum diatur";
  });

  document.querySelectorAll(".js-map").forEach(link => {
    if (SITE_CONFIG.mapUrl.trim()) {
      link.href = SITE_CONFIG.mapUrl.trim();
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#kontak";
      link.addEventListener("click", event => {
        event.preventDefault();
        alert("Tautan Google Maps belum diatur. Isi SITE_CONFIG.mapUrl di javascript.js.");
      });
    }
  });

  // Portfolio category filter.
  const filterButtons = document.querySelectorAll(".filter-button");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach(card => {
        const shouldShow = selectedFilter === "semua" || card.dataset.category === selectedFilter;
        card.hidden = !shouldShow;
      });
    });
  });
});
