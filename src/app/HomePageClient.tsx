"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCallRequestModal } from "@/components/CallRequestModalContext";
import { PORTFOLIO_ITEMS } from "@/data/portfolio";
import { HOME_PORTFOLIO_PREVIEW_IDS, HOME_PORTFOLIO_PREVIEW_IDS_3COL } from "@/data/portfolio-order";
import { SERVICES } from "@/data/services";

// Выбираем 12 работ для превью — для сеток 2 и 4 в ряд (пары по категориям)
const PORTFOLIO_PREVIEW = (() => {
  const byId = new Map(PORTFOLIO_ITEMS.map((item) => [item.id, item]));
  const prioritized = HOME_PORTFOLIO_PREVIEW_IDS.map((id) => byId.get(id)).filter(
    (item): item is (typeof PORTFOLIO_ITEMS)[number] => Boolean(item)
  );
  const used = new Set(prioritized.map((item) => item.id));
  const fallback = PORTFOLIO_ITEMS.filter((item) => !used.has(item.id));
  return [...prioritized, ...fallback].slice(0, 12);
})();

// 12 работ для сетки 3 в ряд (тройки по категориям, 640–1023px)
const PORTFOLIO_PREVIEW_3COL = (() => {
  const byId = new Map(PORTFOLIO_ITEMS.map((item) => [item.id, item]));
  const prioritized = HOME_PORTFOLIO_PREVIEW_IDS_3COL.map((id) => byId.get(id)).filter(
    (item): item is (typeof PORTFOLIO_ITEMS)[number] => Boolean(item)
  );
  const used = new Set(prioritized.map((item) => item.id));
  const fallback = PORTFOLIO_ITEMS.filter((item) => !used.has(item.id));
  return [...prioritized, ...fallback].slice(0, 12);
})();

// Приоритетные услуги для главной
const PRIORITY_SERVICES = SERVICES.filter((s) => s.priority).slice(0, 3);

// Преимущества (порядок: доверие → возможности → удобство → скорость)
const ADVANTAGES = [
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
        <g transform="translate(0,512) scale(0.1,-0.1)">
          <path d="M2440 5113 c-8 -3 -105 -41 -215 -84 -905 -351 -1732 -683 -1769 -708 -105 -72 -171 -186 -186 -322 -29 -253 1 -757 71 -1169 222 -1322 907 -2292 1932 -2735 247 -107 317 -110 526 -23 247 102 527 268 741 438 210 167 458 439 620 680 387 577 623 1321 690 2174 13 166 13 608 0 676 -23 120 -114 247 -218 302 -26 14 -342 142 -702 283 -360 142 -785 309 -945 373 l-290 115 -120 3 c-66 2 -127 1 -135 -3z m1130 -508 c514 -202 955 -378 980 -390 58 -30 103 -77 132 -140 22 -47 23 -65 26 -285 5 -356 -23 -680 -89 -1025 -242 -1265 -897 -2152 -1891 -2561 -80 -33 -104 -38 -168 -38 -67 0 -87 5 -184 47 -1136 489 -1805 1555 -1948 3102 -7 77 -13 266 -13 420 l0 280 33 67 c19 39 49 80 70 98 24 19 128 66 287 129 674 266 1616 637 1660 653 104 38 82 45 1105 -357z" />
          <path d="M2430 4577 c-36 -14 -386 -151 -779 -306 -456 -180 -729 -293 -758 -313 -55 -40 -117 -132 -131 -195 -19 -84 -24 -262 -13 -458 16 -271 28 -355 53 -382 44 -47 121 -16 122 48 0 19 -6 99 -14 179 -7 80 -13 237 -13 350 0 228 7 264 71 323 22 21 231 108 793 329 712 280 767 300 814 296 56 -5 1477 -559 1554 -606 31 -19 53 -43 70 -77 24 -45 26 -62 30 -198 6 -270 -25 -598 -84 -893 -116 -572 -350 -1062 -670 -1402 -41 -44 -79 -91 -84 -106 -20 -51 16 -96 76 -96 21 0 42 15 91 68 509 540 794 1332 819 2277 6 249 -2 337 -37 410 -30 62 -90 127 -146 157 -27 14 -384 157 -794 318 -724 285 -747 293 -825 297 -66 3 -91 0 -145 -20z" />
          <path d="M2388 3675 c-98 -16 -241 -61 -320 -101 -265 -133 -481 -384 -571 -664 -70 -217 -68 -475 5 -695 112 -339 405 -620 751 -719 432 -124 898 24 1182 376 84 105 175 287 212 423 23 89 26 119 27 270 0 143 -3 184 -22 258 -108 433 -434 750 -867 843 -102 22 -293 26 -397 9z m400 -165 c349 -85 616 -349 714 -706 28 -105 31 -343 5 -446 -62 -248 -206 -456 -410 -592 -298 -198 -668 -217 -984 -51 -446 235 -636 765 -442 1231 61 145 174 292 302 391 118 91 301 169 452 193 87 13 267 4 363 -20z" />
          <path d="M2918 3126 c-26 -7 -55 -18 -65 -26 -10 -7 -117 -113 -238 -237 l-220 -224 -60 54 c-86 77 -136 100 -215 101 -107 1 -199 -56 -246 -150 -30 -61 -27 -185 6 -243 30 -52 360 -339 430 -373 62 -30 158 -30 221 0 31 15 146 121 366 337 362 355 377 375 376 491 0 43 -7 77 -22 107 -25 52 -106 132 -155 152 -50 21 -126 26 -178 11z m141 -164 c61 -45 82 -123 47 -173 -8 -12 -154 -158 -324 -324 -330 -323 -339 -330 -403 -301 -41 18 -349 278 -366 309 -35 63 3 146 75 168 51 15 72 4 169 -79 148 -128 158 -124 445 177 117 123 227 230 243 237 36 17 81 11 114 -14z" />
          <path d="M860 2680 c-28 -28 -26 -68 15 -227 231 -904 742 -1546 1480 -1859 139 -59 224 -68 325 -34 182 60 557 273 580 329 20 50 -16 101 -71 101 -13 0 -48 -17 -79 -39 -126 -88 -367 -213 -484 -251 -60 -19 -121 -7 -245 48 -688 309 -1155 912 -1365 1767 -40 161 -54 185 -107 185 -16 0 -38 -9 -49 -20z" />
        </g>
      </svg>
    ),
    title: "Опыт с 2007 года",
    description: "19 лет на рынке. Сотни реализованных проектов и довольных клиентов.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
        <g transform="translate(0,512) scale(0.1,-0.1)">
          <path d="M404 4540 c-29 -14 -49 -34 -64 -63 -21 -41 -23 -81 -100 -1902 -43 -1023 -79 -1861 -79 -1862 -1 -2 -26 -3 -56 -3 -46 0 -60 -4 -80 -25 -32 -31 -32 -69 0 -100 l24 -25 2511 0 2511 0 24 25 c32 31 32 69 0 100 -20 21 -34 25 -80 25 l-55 0 0 694 c0 686 0 694 -21 720 -20 26 -21 26 -160 26 l-139 0 0 174 c0 160 -2 175 -21 200 -14 18 -30 26 -52 26 -18 0 -217 -78 -459 -179 l-428 -179 0 153 c0 139 -2 155 -21 179 -14 18 -30 26 -52 26 -19 0 -208 -74 -451 -175 -231 -96 -423 -175 -427 -175 -4 0 -9 69 -11 154 -3 174 -12 196 -73 196 -17 0 -132 -42 -256 -94 -123 -51 -225 -91 -226 -87 -1 3 -20 465 -43 1026 -45 1119 -42 1082 -108 1133 -35 27 -36 27 -226 30 -105 2 -205 1 -223 -3 -41 -7 -92 -50 -109 -91 -10 -23 -26 -332 -60 -1160 -25 -621 -47 -1135 -50 -1141 -2 -10 -41 -13 -147 -13 l-144 0 -6 61 c-3 37 -12 68 -23 80 -23 26 -85 26 -109 -1 -17 -19 -18 -36 -11 -233 3 -116 9 -269 13 -339 l6 -128 -288 0 -288 0 6 103 c4 56 27 613 53 1237 25 624 47 1141 49 1148 3 9 49 12 185 12 l180 0 0 -22 c0 -13 14 -360 31 -773 34 -837 29 -797 102 -803 53 -5 77 23 77 91 0 28 -18 460 -39 959 -43 1020 -35 952 -121 996 -41 20 -57 22 -235 22 -171 0 -194 -2 -231 -20z m404 -217 l3 -83 -176 0 -175 0 0 39 c0 21 3 59 6 85 l7 46 166 -2 166 -3 3 -82z m1122 2 l0 -85 -176 0 -177 0 7 38 c3 20 6 58 6 85 l0 47 170 0 170 0 0 -85z m14 -347 c15 -260 67 -1591 64 -1634 l-3 -47 -175 -74 c-166 -69 -179 -73 -252 -73 l-78 0 0 38 c-1 70 71 1817 76 1860 l5 42 178 0 179 0 6 -112z m624 -1720 l-3 -103 -250 -3 c-151 -1 -246 1 -240 7 13 12 466 200 483 201 10 0 12 -24 10 -102z m960 0 l-3 -103 -249 -3 c-137 -1 -246 1 -242 5 10 11 468 202 484 203 10 0 12 -24 10 -102z m962 -3 l0 -105 -252 0 c-138 0 -248 3 -245 7 10 9 469 201 485 202 9 1 12 -26 12 -104z m320 -900 l0 -645 -85 0 -85 0 0 454 c0 443 0 454 -21 480 l-20 26 -515 0 c-501 0 -515 -1 -534 -20 -19 -19 -20 -33 -20 -480 l0 -460 -84 0 -84 0 -4 141 c-4 184 1 179 -183 179 l-133 0 -4 141 c-4 184 1 179 -183 179 l-133 0 -4 141 c-3 134 -4 142 -27 160 -22 18 -44 19 -371 19 -327 0 -349 -1 -371 -19 -23 -18 -24 -26 -27 -160 l-4 -141 -133 0 c-184 0 -179 5 -183 -179 l-4 -141 -133 0 c-184 0 -179 5 -183 -179 l-4 -141 -83 0 -83 0 -6 93 c-9 130 -46 1050 -46 1130 l0 67 1875 0 1875 0 0 -645z m-2242 83 l-3 -83 -245 0 -245 0 -3 83 -3 82 251 0 251 0 -3 -82z m1922 -3 l0 -85 -405 0 -405 0 0 85 0 85 405 0 405 0 0 -85z m-3560 -32 c0 -45 17 -432 25 -585 l6 -108 -325 0 -325 0 5 68 c6 100 24 538 24 605 l0 57 295 0 295 0 0 -37z m1310 -288 l0 -85 -245 0 -245 0 0 85 0 85 245 0 245 0 0 -85z m648 3 l-3 -83 -245 0 -245 0 -3 83 -3 82 251 0 251 0 -3 -82z m1602 -3 l0 -85 -405 0 -405 0 0 85 0 85 405 0 405 0 0 -85z m-2570 -320 l0 -85 -245 0 -245 0 0 85 0 85 245 0 245 0 0 -85z m648 3 l-3 -83 -247 -3 -248 -2 0 85 0 85 250 0 251 0 -3 -82z m642 -3 l0 -85 -245 0 -245 0 0 85 0 85 245 0 245 0 0 -85z m1280 0 l0 -85 -405 0 -405 0 0 85 0 85 405 0 405 0 0 -85z" />
        </g>
      </svg>
    ),
    title: "Собственное производство",
    description: "Собственный цех камнеобработки. Контроль качества на каждом этапе — без посредников.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
        <g transform="translate(0,512) scale(0.1,-0.1)">
          <path d="M2140 5102 c-15 -12 -50 -92 -104 -236 l-82 -219 -109 -38 c-61 -21 -159 -63 -220 -92 l-110 -54 -218 100 c-171 78 -224 97 -245 92 -15 -3 -62 -42 -104 -85 -68 -68 -78 -83 -78 -114 0 -45 29 -76 71 -76 23 0 44 13 89 56 l59 56 193 -87 c106 -48 205 -91 220 -95 22 -7 45 1 121 41 103 53 251 113 365 148 86 26 74 7 183 299 l64 172 325 0 325 0 64 -172 c36 -95 74 -196 86 -224 l22 -51 129 -42 c71 -23 190 -72 264 -109 74 -36 145 -65 157 -64 12 1 113 43 224 93 l201 91 230 -229 230 -230 -87 -194 c-48 -107 -91 -205 -97 -218 -7 -20 0 -42 42 -122 55 -106 114 -252 149 -367 26 -86 7 -74 299 -183 l172 -64 0 -325 0 -325 -172 -64 c-276 -103 -273 -101 -292 -157 -23 -69 -21 -119 6 -138 47 -33 94 -18 118 37 l18 41 218 82 c143 54 224 90 236 104 17 21 18 53 18 420 0 367 -1 399 -18 420 -12 14 -93 50 -236 104 l-219 83 -38 109 c-21 60 -63 159 -92 219 l-54 110 100 218 c77 171 97 224 92 245 -9 37 -550 578 -587 587 -21 5 -74 -15 -245 -92 l-218 -100 -110 54 c-60 29 -159 71 -220 92 l-109 38 -82 219 c-54 144 -89 224 -104 236 -21 17 -51 18 -420 18 -369 0 -399 -1 -420 -18z" />
          <path d="M2423 4446 c-153 -37 -308 -164 -376 -306 -40 -85 -57 -156 -57 -235 l0 -55 -71 -36 c-39 -19 -102 -56 -139 -80 l-67 -45 -144 15 c-149 14 -169 12 -196 -23 -19 -25 -15 -57 10 -87 20 -23 33 -27 95 -32 40 -2 72 -7 72 -9 0 -3 -22 -31 -48 -62 -81 -93 -136 -174 -186 -270 l-47 -91 -61 0 c-310 0 -579 -294 -554 -605 11 -138 81 -299 139 -319 36 -13 78 8 91 47 8 23 4 39 -27 100 -23 43 -42 99 -49 140 -30 182 66 364 235 447 166 81 391 33 505 -110 75 -93 112 -224 93 -331 -29 -166 -139 -293 -294 -340 -59 -19 -85 -21 -169 -16 -97 6 -100 6 -125 -19 -20 -20 -24 -31 -19 -57 4 -17 12 -38 20 -45 19 -19 80 -31 153 -32 l63 0 36 -71 c19 -39 55 -101 80 -138 l44 -66 -14 -145 c-14 -149 -12 -170 23 -197 25 -19 57 -15 87 10 23 20 27 33 32 95 2 40 7 72 9 72 2 0 37 -27 76 -61 88 -74 180 -135 275 -183 l72 -36 0 -55 c0 -249 201 -493 448 -544 194 -40 381 16 523 158 112 112 169 243 169 386 l0 55 71 36 c39 19 101 55 138 80 l66 44 145 -14 c149 -14 170 -12 197 23 19 25 15 57 -10 87 -20 23 -33 27 -95 32 -40 2 -72 7 -72 9 0 2 27 37 61 76 74 88 135 180 183 275 l36 72 61 0 c255 0 490 197 544 455 18 88 18 142 0 230 -54 258 -289 455 -542 455 l-63 0 -36 71 c-19 39 -56 102 -80 139 l-45 67 15 144 c14 149 12 169 -23 196 -25 19 -57 15 -87 -10 -23 -20 -27 -33 -32 -95 -2 -40 -7 -72 -9 -72 -2 0 -37 27 -76 61 -88 74 -180 135 -275 183 l-72 36 0 55 c0 79 -17 150 -57 235 -70 147 -234 277 -391 309 -69 14 -193 13 -259 -3z m319 -179 c92 -45 157 -112 201 -205 58 -124 46 -291 -29 -401 -30 -44 -31 -87 -2 -118 49 -52 103 -21 159 93 l31 63 40 -20 c76 -39 205 -129 273 -191 6 -5 -22 -8 -72 -7 -94 3 -123 -12 -123 -63 0 -67 29 -82 185 -93 168 -11 168 -11 202 -63 17 -26 45 -73 62 -104 l32 -56 -73 -39 c-156 -81 -263 -231 -296 -413 -14 -82 -14 -98 0 -180 33 -182 140 -332 296 -413 82 -43 80 -30 14 -142 -31 -52 -88 -131 -145 -199 -17 -20 -17 -19 -15 61 1 68 -1 86 -17 103 -24 26 -78 27 -104 1 -21 -21 -25 -42 -41 -221 -6 -63 -14 -117 -18 -120 -24 -17 -95 -61 -143 -89 l-56 -31 -33 67 c-48 98 -161 209 -260 256 -229 108 -473 66 -651 -112 -52 -52 -86 -97 -109 -144 l-33 -67 -56 31 c-83 47 -150 92 -210 144 l-54 46 81 -2 c93 -3 122 12 122 63 0 67 -29 82 -185 93 -168 11 -168 11 -202 63 -17 26 -45 73 -62 104 l-32 56 73 39 c155 81 264 232 296 413 14 82 14 98 0 180 -33 182 -140 332 -295 413 l-73 38 21 40 c39 77 129 206 191 274 5 6 8 -22 7 -72 -3 -94 12 -123 63 -123 67 0 82 29 93 185 11 168 11 168 63 202 26 17 72 44 103 62 l56 31 33 -67 c48 -97 161 -209 260 -256 97 -46 178 -61 291 -55 76 5 94 9 115 29 29 27 31 68 5 100 -17 22 -25 23 -143 23 -123 1 -125 1 -199 38 -93 46 -158 112 -202 206 -30 62 -32 75 -32 172 0 97 2 110 32 172 53 113 137 187 258 231 38 13 73 17 141 14 82 -2 100 -7 166 -40z m1334 -1327 c262 -128 322 -467 121 -674 -206 -210 -561 -149 -683 118 -36 79 -48 163 -35 238 28 162 136 289 288 339 44 14 80 18 149 16 80 -2 99 -7 160 -37z m-1334 -1333 c92 -45 157 -112 201 -205 30 -62 32 -75 32 -172 0 -97 -2 -110 -32 -172 -44 -94 -109 -160 -202 -206 -72 -36 -79 -37 -181 -37 -102 0 -109 1 -181 37 -93 46 -158 112 -202 206 -30 62 -32 75 -32 172 0 97 2 110 32 172 53 113 137 187 258 231 38 13 73 17 141 14 82 -2 100 -7 166 -40z" />
          <path d="M2698 4103 c-13 -16 -67 -83 -118 -150 -51 -68 -95 -123 -98 -123 -3 0 -33 27 -68 60 -69 66 -94 73 -138 39 -18 -14 -26 -30 -26 -53 0 -28 15 -46 104 -135 100 -98 106 -102 143 -99 37 3 43 10 186 196 111 147 147 201 147 223 0 67 -84 93 -132 42z" />
          <path d="M4049 2788 c-9 -7 -63 -74 -119 -148 -57 -74 -104 -137 -106 -139 -2 -2 -35 24 -74 58 -39 33 -77 61 -85 61 -52 0 -94 -55 -76 -102 5 -13 53 -66 108 -116 79 -74 104 -92 128 -92 16 0 35 4 42 8 22 14 294 376 300 400 13 54 -73 106 -118 70z" />
          <path d="M2698 1443 c-13 -16 -67 -83 -118 -150 -51 -68 -95 -123 -98 -123 -3 0 -33 27 -68 60 -69 66 -94 73 -138 39 -18 -14 -26 -30 -26 -53 0 -28 15 -46 104 -135 100 -98 106 -102 143 -99 37 3 43 10 186 196 111 147 147 201 147 223 0 67 -84 93 -132 42z" />
          <path d="M565 4188 c-53 -53 -97 -105 -100 -120 -5 -21 15 -74 92 -245 l100 -218 -54 -110 c-29 -60 -71 -159 -92 -220 l-38 -109 -219 -82 c-144 -54 -224 -89 -236 -104 -17 -21 -18 -51 -18 -420 0 -369 1 -399 18 -420 12 -15 92 -50 236 -104 l219 -82 38 -109 c21 -61 63 -159 92 -220 l54 -110 -100 -218 c-77 -171 -97 -224 -92 -245 9 -37 550 -578 587 -587 21 -5 74 15 245 92 l219 99 109 -53 c61 -29 159 -71 220 -92 l109 -38 82 -219 c54 -144 89 -224 104 -236 21 -17 51 -18 420 -18 369 0 399 1 420 18 15 12 50 92 104 237 77 204 84 219 112 228 93 30 231 85 314 127 l95 47 218 -100 c171 -77 224 -97 245 -92 37 9 578 550 587 587 5 21 -15 74 -93 245 l-99 218 18 37 c36 72 12 128 -54 128 -40 0 -54 -14 -97 -96 -37 -71 -46 -34 81 -315 l82 -181 -230 -230 -231 -230 -188 85 c-271 123 -231 116 -345 57 -106 -55 -252 -114 -367 -149 -86 -26 -74 -7 -183 -298 l-64 -173 -325 0 -325 0 -64 173 c-36 94 -74 195 -87 223 l-22 52 -97 32 c-139 45 -235 84 -346 141 -96 50 -97 50 -133 35 -20 -8 -118 -52 -217 -97 l-181 -82 -230 231 -231 230 88 193 c48 107 91 206 95 221 7 22 -1 45 -41 121 -53 103 -113 251 -148 365 -26 86 -6 74 -298 183 l-173 64 0 325 0 325 173 64 c292 109 272 97 298 183 35 114 95 262 148 365 40 76 48 99 41 121 -4 15 -47 114 -95 220 l-87 194 60 61 c33 34 65 72 71 84 24 48 -14 103 -72 103 -23 0 -48 -19 -122 -92z" />
          <path d="M1362 2771 c-15 -16 -67 -83 -117 -149 -49 -67 -94 -121 -99 -122 -5 0 -37 27 -72 60 -67 64 -95 74 -133 43 -11 -10 -24 -33 -27 -51 -7 -32 -2 -38 98 -138 94 -93 110 -104 141 -104 30 0 42 7 80 53 96 114 267 348 267 366 0 10 -9 30 -21 45 -29 37 -82 36 -117 -3z" />
        </g>
      </svg>
    ),
    title: "Полный цикл работ",
    description: "От замера до монтажа. Вам не нужно координировать подрядчиков — всё возьмём на себя.",
  },
  {
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
        <g transform="translate(0,512) scale(0.1,-0.1)">
          <path d="M2380 5114 c-19 -2 -78 -9 -130 -14 -330 -36 -695 -160 -990 -336 -375 -224 -680 -529 -904 -904 -175 -292 -291 -632 -338 -990 -16 -123 -16 -497 0 -620 82 -623 356 -1150 820 -1581 256 -239 575 -425 922 -539 274 -91 491 -124 800 -124 228 0 329 9 530 50 689 141 1304 583 1674 1204 175 292 291 632 338 990 16 123 16 497 0 620 -47 358 -163 698 -338 990 -224 375 -529 680 -904 904 -289 173 -634 291 -980 336 -88 12 -438 21 -500 14z m523 -169 c537 -84 981 -308 1357 -685 339 -338 555 -733 654 -1195 42 -193 51 -281 51 -505 0 -224 -9 -312 -51 -505 -99 -462 -315 -857 -654 -1195 -384 -385 -837 -609 -1395 -691 -118 -18 -492 -18 -610 0 -558 82 -1011 306 -1395 691 -385 384 -609 837 -691 1395 -18 118 -18 492 0 610 82 558 306 1011 691 1395 252 253 543 441 860 557 217 80 373 114 660 147 75 9 430 -4 523 -19z" />
          <path d="M2410 4813 c-459 -31 -916 -210 -1268 -496 -80 -65 -98 -92 -88 -131 7 -30 58 -60 87 -51 11 4 52 32 92 64 310 246 656 395 1052 452 51 8 177 13 290 13 226 0 369 -20 575 -79 420 -121 826 -402 1089 -755 216 -290 340 -574 402 -925 19 -109 23 -165 23 -345 0 -242 -18 -378 -79 -590 -194 -675 -760 -1241 -1435 -1435 -212 -61 -348 -79 -590 -79 -242 0 -378 18 -590 79 -675 194 -1241 760 -1435 1435 -59 206 -79 349 -79 575 0 113 5 239 13 290 57 396 206 742 452 1052 69 86 75 103 54 142 -18 35 -55 49 -89 33 -48 -22 -217 -252 -309 -423 -433 -797 -348 -1779 213 -2484 830 -1040 2366 -1145 3330 -228 860 818 935 2171 172 3083 -461 552 -1166 852 -1882 803z" />
          <path d="M2523 4508 c-13 -6 -27 -26 -33 -47 -6 -23 -10 -343 -10 -863 l0 -827 -27 -15 c-127 -66 -152 -259 -47 -358 103 -97 286 -68 350 55 l15 27 677 0 c425 0 691 4 713 10 47 13 68 55 49 100 -9 21 -23 33 -49 40 -22 6 -288 10 -713 10 l-677 0 -12 23 c-17 33 -60 77 -91 93 l-28 15 0 827 c0 519 -4 840 -10 863 -14 51 -59 70 -107 47z m89 -1895 c23 -20 24 -80 1 -105 -20 -23 -80 -24 -105 -1 -23 20 -24 80 -1 105 20 23 80 24 105 1z" />
          <path d="M1588 4259 c-32 -12 -51 -59 -38 -94 18 -48 82 -60 118 -22 55 58 -4 143 -80 116z" />
          <path d="M3473 4260 c-46 -19 -57 -83 -20 -118 58 -55 142 1 116 77 -7 19 -21 33 -41 40 -17 6 -31 11 -32 10 -1 0 -11 -4 -23 -9z" />
          <path d="M898 3569 c-32 -12 -51 -59 -38 -94 18 -48 82 -60 118 -22 55 58 -4 143 -80 116z" />
          <path d="M4163 3570 c-46 -19 -57 -83 -20 -118 58 -55 142 1 116 77 -7 19 -21 33 -41 40 -17 6 -31 11 -32 10 -1 0 -11 -4 -23 -9z" />
          <path d="M626 2614 c-23 -23 -29 -59 -15 -86 16 -31 28 -38 64 -38 36 0 48 7 64 38 25 48 -9 102 -64 102 -18 0 -41 -7 -49 -16z" />
          <path d="M4396 2614 c-23 -23 -29 -59 -15 -86 16 -31 28 -38 64 -38 36 0 48 7 64 38 25 48 -9 102 -64 102 -18 0 -41 -7 -49 -16z" />
          <path d="M887 1679 c-27 -16 -38 -53 -26 -88 19 -54 102 -61 128 -12 37 67 -36 138 -102 100z" />
          <path d="M4142 1667 c-55 -58 1 -142 77 -116 54 19 61 102 12 128 -32 17 -66 13 -89 -12z" />
          <path d="M1577 989 c-27 -16 -38 -53 -26 -88 19 -54 102 -61 128 -12 37 67 -36 138 -102 100z" />
          <path d="M3452 977 c-55 -58 1 -142 77 -116 54 19 61 102 12 128 -32 17 -66 13 -89 -12z" />
          <path d="M2525 738 c-28 -16 -35 -28 -35 -65 0 -53 55 -87 102 -62 31 16 38 28 38 64 0 36 -8 48 -37 64 -27 14 -42 14 -68 -1z" />
        </g>
      </svg>
    ),
    title: "Сроки от 3 рабочих дней",
    description: "Быстрое изготовление без потери качества. Сроки фиксируем в договоре.",
  },
];

// Этапы работы
const WORK_STEPS = [
  {
    step: 1,
    title: "Замер",
    description: "Бесплатный выезд мастера. Точные измерения и консультация на объекте.",
  },
  {
    step: 2,
    title: "Подбор камня",
    description: "Выбор материала по образцам или на складе. Расчёт стоимости проекта.",
  },
  {
    step: 3,
    title: "Изготовление",
    description: "Раскрой, обработка и полировка на современном оборудовании.",
  },
  {
    step: 4,
    title: "Монтаж",
    description: "Доставка и установка изделий. Гарантия на работы и материалы.",
  },
];

// Анимации
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function HomePageClient() {
  const { open } = useCallRequestModal();
  const shouldReduceMotion = useReducedMotion();
  const heroVariant: "v1" = "v1";


  // Если пользователь предпочитает уменьшенную анимацию
  const animationProps = shouldReduceMotion
    ? {}
    : {
      initial: "hidden",
      whileInView: "visible",
      viewport: { once: true, margin: "-50px" },
    };

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      {/* ========== HERO SECTION ========== */}
      <section className="relative h-[calc(100vh-var(--header-height))] flex items-center justify-center overflow-hidden">
        {/* Фон без фотографии — премиум градиент + мраморная текстура */}
        <div className="absolute inset-0 bg-background-dark">
          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_15%_10%,rgba(201,169,98,0.28),transparent_55%),radial-gradient(900px_circle_at_85%_20%,rgba(92,74,61,0.24),transparent_55%)]" />
          <div className="absolute inset-0 opacity-15 bg-marble" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/20 via-background-dark/45 to-background-dark/75" />
        </div>

        {/* Контент */}
        <div className="relative z-10 container text-center text-foreground-on-dark px-4 py-12 md:py-16">
          <motion.div
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } })}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Изделия из натурального камня <span className="whitespace-nowrap">под ключ</span>
            </h1>

            <p className="text-lg md:text-xl text-foreground-on-dark/80 max-w-2xl mx-auto mb-10">
              Индивидуальные решения — от проекта до монтажа.
            </p>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={open}
                className={`px-8 py-4 rounded-md transition-colors text-lg font-medium max-[440px]:w-full ${heroVariant === "v1"
                    ? "bg-accent text-foreground-on-dark hover:bg-accent-hover"
                    : heroVariant === "v2"
                      ? "bg-foreground text-background hover:bg-foreground/90"
                      : "bg-white/10 text-foreground-on-dark border border-white/20 backdrop-blur hover:bg-white/15"
                  }`}
              >
                Заказать звонок
              </button>
              <button
                onClick={scrollToPortfolio}
                className={`px-8 py-4 rounded-md transition-colors text-lg font-medium ${heroVariant === "v1"
                    ? "border border-accent/60 text-foreground-on-dark hover:bg-white/15 hover:text-foreground-on-dark"
                    : heroVariant === "v2"
                      ? "border border-foreground/40 text-foreground-on-dark hover:bg-foreground hover:text-background"
                      : "bg-white/5 text-foreground-on-dark border border-white/10 hover:bg-white/10"
                  }`}
              >
                Смотреть работы
              </button>
            </div>
          </motion.div>
        </div>

        {/* Скролл индикатор */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          {...(shouldReduceMotion
            ? {}
            : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { delay: 1, duration: 0.5 },
            })}
        >
          <button
            onClick={scrollToPortfolio}
            className="text-foreground-on-dark/60 hover:text-foreground-on-dark transition-colors"
            aria-label="Прокрутить к портфолио"
          >
            <motion.svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              {...(shouldReduceMotion
                ? {}
                : {
                  animate: { y: [0, 8, 0] },
                  transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
                })}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </button>
        </motion.div>
      </section>

      {/* ========== PORTFOLIO PREVIEW ========== */}
      <section id="portfolio" className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div {...animationProps} variants={fadeInUp} className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Наши работы
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Более 500 реализованных проектов для частных домов, квартир и общественных пространств
            </p>
          </motion.div>

          {/* Сетка фото — 2 и 4 колонки (пары по категориям) */}
          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 sm:hidden lg:grid"
          >
            {PORTFOLIO_PREVIEW.map((item, index) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Link
                  href="/portfolio"
                  className="relative aspect-square overflow-hidden rounded-lg group block cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={`Работа из портфолио ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                    loading={index < 4 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-background-dark/0 group-hover:bg-background-dark/30 transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Сетка фото — 3 колонки (тройки по категориям, 640–1023px) */}
          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="hidden sm:grid lg:hidden grid-cols-3 gap-3 md:gap-4"
          >
            {PORTFOLIO_PREVIEW_3COL.map((item, index) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Link
                  href="/portfolio"
                  className="relative aspect-square overflow-hidden rounded-lg group block cursor-pointer"
                >
                  <Image
                    src={item.src}
                    alt={`Работа из портфолио ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="33vw"
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 bg-background-dark/0 group-hover:bg-background-dark/30 transition-colors duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Кнопка "Все работы" */}
          <motion.div {...animationProps} variants={fadeInUp} className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent rounded-md hover:bg-accent hover:text-foreground-on-dark transition-colors text-lg font-medium"
            >
              Все работы
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className="py-16 md:py-24 bg-marble-light/30">
        <div className="container">
        <div className="text-center mb-12">
        <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Направления работ
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Изготавливаем изделия любой сложности из мрамора, гранита, кварцита, оникса и травертина
            </p>
          </div>

          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="grid grid-cols-1 min-[850px]:grid-cols-3 gap-6 md:gap-8"
          >
            {PRIORITY_SERVICES.map((service) => (
              <motion.article
                key={service.id}
                variants={fadeInUp}
                className="group relative flex h-full flex-col rounded-xl border border-gold/40 hover:border-gold/70 bg-surface p-6 transition-[box-shadow,border-color] hover:shadow-[var(--shadow-lg)]"
                style={{ boxShadow: "var(--shadow-sm)" }}
              >
                <div className="flex-1">
                  <div className="h-px w-10 bg-gold/60 mb-4" />
                  <h3
                    className="text-lg font-semibold text-foreground leading-tight"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-3 text-foreground-muted">{service.description}</p>
                </div>

                <div className="mt-6 border-t border-marble-vein/60 pt-4">
                  <button
                    onClick={open}
                    className="text-sm px-5 py-2.5 rounded-md border border-accent/60 text-foreground hover:bg-accent hover:text-foreground-on-dark transition-colors max-[440px]:w-full"
                  >
                    Заказать консультацию
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <motion.div {...animationProps} variants={fadeInUp} className="text-center mt-10">
            <Link
              href="/uslugi"
              className="inline-flex items-center gap-2 px-8 py-4 border border-accent text-accent rounded-md hover:bg-accent hover:text-foreground-on-dark transition-colors text-lg font-medium"
            >
              Все услуги
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== ADVANTAGES ========== */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div {...animationProps} variants={fadeInUp} className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Почему выбирают нас
            </h2>
          </motion.div>

          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {ADVANTAGES.map((advantage, index) => (
              <motion.div key={index} variants={fadeInUp} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 text-gold mb-4">
                  {advantage.icon}
                </div>
                <h3
                  className="text-xl font-semibold text-foreground mb-2"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {advantage.title}
                </h3>
                <p className="text-foreground-muted">{advantage.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HOW WE WORK ========== */}
      <section className="py-16 md:py-24 bg-marble-light">
        <div className="container">
          <motion.div {...animationProps} variants={fadeInUp} className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Как мы работаем
            </h2>
            <p className="text-foreground-muted text-lg max-w-2xl mx-auto">
              Прозрачный процесс от первого звонка до готового изделия
            </p>
          </motion.div>

          <motion.div
            {...animationProps}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {WORK_STEPS.map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative">
                {/* Линия между шагами (только на десктопе) */}
                {index < WORK_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-7 left-[calc(50%+1.75rem)] w-[calc(100%-3.5rem)] h-px bg-gold/30" />
                )}

                <div className="text-center">
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-full bg-accent text-foreground-on-dark text-xl font-semibold flex items-center justify-center leading-none"
                    style={{ fontFamily: "var(--font-primary)" }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="text-xl font-semibold text-foreground mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-foreground-muted">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container">
          <motion.div
            {...animationProps}
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center rounded-2xl border border-marble-vein/30 bg-background-dark text-foreground-on-dark px-6 py-10 md:px-10 md:py-12 shadow-[var(--shadow-lg)]"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Готовы обсудить ваш проект?
            </h2>
            <p className="text-foreground-on-dark/75 text-lg mb-10 max-w-xl mx-auto">
              Оставьте заявку, и мы перезвоним в течение рабочего дня. Бесплатная консультация и расчёт стоимости.
            </p>
            <button
              onClick={open}
              className="px-10 py-5 bg-accent text-foreground-on-dark rounded-md hover:bg-accent-hover transition-colors text-lg font-semibold max-[440px]:w-full"
            >
              Заказать звонок
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
