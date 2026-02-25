import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "КАМВЕК — Изделия из натурального камня",
    short_name: "КАМВЕК",
    description:
      "Производство изделий из мрамора, гранита, кварцита. Столешницы, лестницы, камины. Собственное производство в Воскресенске.",
    start_url: "/",
    display: "standalone",
    background_color: "#1A1614",
    theme_color: "#5C4A3D",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
