import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  // Получаем CSS с Google Fonts, извлекаем URL нужного шрифта (кириллица, 600)
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&subset=cyrillic&display=swap",
    { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } }
  ).then((res) => res.text());

  const fontUrl = css.match(/url\(([^)]+\.woff2)\)/)?.[1];
  const fontData = fontUrl
    ? await fetch(fontUrl).then((res) => res.arrayBuffer())
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1614",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            color: "#C9A962",
            fontSize: 22,
            fontFamily: fontData ? "Cormorant Garamond" : "Georgia, serif",
            fontWeight: 600,
            lineHeight: 1,
            marginTop: 2,
          }}
        >
          &#x041A;
        </div>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Cormorant Garamond",
                data: fontData,
                weight: 600,
                style: "normal",
              },
            ],
          }
        : {}),
    }
  );
}
