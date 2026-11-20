# Ademir Dijital — kurumsal web sitesi

Samsun Atakum merkezli video prodüksiyon ve dijital pazarlama firması Ademir Dijital için statik, iki dilli (TR / EN) kurumsal site.

**Teknoloji:** SvelteKit 3 · Svelte 5 · Tailwind CSS 4 · Biome 2 · Bun · TypeScript · `adapter-static`

## Komutlar

```sh
bun install          # bağımlılıklar
bun run dev          # geliştirme sunucusu
bun run build        # statik çıktı → build/
bun run preview      # build çıktısını yerelde sunar (her build sonrası yeniden başlatın)
bun run check        # svelte-check (TypeScript)
bun run lint         # Biome lint + format kontrolü
bun run format       # Biome ile otomatik düzeltme
bun run fonts        # Archivo font alt kümelerini yeniden üretir
```

## Sayfalar ve adresler

| Sayfa                | Türkçe                       | İngilizce                          |
| -------------------- | ---------------------------- | ---------------------------------- |
| Ana sayfa            | `/`                          | `/en/`                             |
| Hizmetler            | `/hizmetler/`                | `/en/services/`                    |
| Hizmet detayları (5) | `/hizmetler/video-cekimi/` … | `/en/services/video-production/` … |
| Süreç                | `/surec/`                    | `/en/process/`                     |
| Hakkımızda           | `/hakkimizda/`               | `/en/about/`                       |
| İletişim             | `/iletisim/`                 | `/en/contact/`                     |

Ayrıca `sitemap.xml`, `robots.txt`, `manifest.webmanifest` ve bilinmeyen adresler için `404.html` üretilir.

## Nereden ne değişir?

- **Metinler:** `src/lib/content/tr.ts` ve `src/lib/content/en.ts`. İki dosya aynı `Content` tipini kullanır; bir anahtar eksik kalırsa `bun run check` hata verir.
- **Adresler (slug) ve dil eşleşmeleri:** `src/lib/i18n/index.ts`. Dil değiştirici, `hreflang` etiketleri ve sitemap bu tek haritadan üretilir.
- **İletişim bilgileri ve alan adı:** `src/lib/site.ts`. Yayına almadan önce `SITE_URL` değerini gerçek alan adıyla güncelleyin; `static/robots.txt` içindeki sitemap adresini de aynı şekilde değiştirin.
- **Görseller:** `src/lib/assets/images/`. Aynı dosya adıyla yenisini koymanız yeterli; `@sveltejs/enhanced-img` build sırasında AVIF/WebP ve farklı boyutları üretir. Kaynaklar: `src/lib/assets/images/CREDITS.md`.
- **Logo:** `src/lib/assets/brand/mark.png` (orijinal: `brand/logo.png`). Favicon ve paylaşım görseli `static/` altındadır.
- **Renk ve tipografi:** `src/routes/layout.css` içindeki `@theme` token'ları.

## SEO

- Her sayfa için ayrı `title` ve `description` (içerik dosyalarında `seo` alanları)
- `canonical`, `hreflang` (tr, en, x-default) ve Open Graph / Twitter etiketleri
- JSON-LD: `ProfessionalService` + `WebSite` (tüm sayfalar), `BreadcrumbList` (iç sayfalar), `Service` (hizmet detayları)
- Çok dilli `sitemap.xml`, `robots.txt`
- Lighthouse (yerel build): masaüstünde 4 kategoride 100; mobilde SEO, erişilebilirlik ve best practices 100, performans 96–99

Yayından sonra yapılması önerilenler: Google Search Console ve Bing Webmaster Tools'a siteyi ekleyip sitemap'i gönderin; Google İşletme Profili oluşturup web sitesi adresini bağlayın.

## Yayına alma

`bun run build` sonrası `build/` klasörü herhangi bir statik barındırmaya (Netlify, Vercel, Cloudflare Pages, GitHub Pages, cPanel/Apache) yüklenebilir. Sayfalar `klasör/index.html` biçiminde yazıldığı için ek sunucu ayarı gerekmez. Bilinmeyen adreslerde `404.html` sunulacak şekilde ayarlayın (çoğu platform bunu otomatik yapar).
