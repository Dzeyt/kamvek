import { CONTACTS } from "@/data/contacts";

/**
 * Компонент структурированных данных (JSON-LD) для SEO
 * Помогает Google и Яндекс показывать контакты, адрес, часы работы в результатах поиска
 */
export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "КАМВЕК",
    description:
      "Производство изделий из натурального камня. Столешницы, подоконники, лестницы, камины из мрамора, гранита, кварцита, оникса и травертина. Собственное производство в Воскресенске.",
    url: "https://kamen-veka.ru",
    telephone: CONTACTS.phones[0].display,
    email: CONTACTS.email.display,
    image: "https://kamen-veka.ru/images/og-default.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "ул. Гаражная, д. 1-А",
      addressLocality: "Воскресенск",
      addressRegion: "Московская область",
      postalCode: "140200",
      addressCountry: "RU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CONTACTS.address.yandexMapCoords.lat,
      longitude: CONTACTS.address.yandexMapCoords.lon,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    priceRange: "$$",
    foundingDate: "2007",
    areaServed: [
      {
        "@type": "City",
        name: "Москва",
      },
      {
        "@type": "AdministrativeArea",
        name: "Московская область",
      },
    ],
    sameAs: CONTACTS.messengers.map((m) => m.href),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
