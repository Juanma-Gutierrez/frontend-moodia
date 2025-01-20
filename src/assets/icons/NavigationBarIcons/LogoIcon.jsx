import PropTypes from "prop-types";

export const LogoIcon = ({ stroke }) => (
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="100.000000pt"
    height="100.000000pt"
    viewBox="0 0 100.000000 100.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g transform="translate(0.000000,100.000000) scale(0.0100000,-0.0100000)" fill={stroke} stroke="none">
      <path
        d="M4420 8893 c-92 -16 -142 -49 -165 -107 -36 -88 -8 -160 195 -506
227 -388 400 -797 459 -1085 128 -633 82 -1384 -134 -2169 -149 -544 -328
-940 -613 -1361 -340 -504 -609 -741 -1427 -1265 -156 -99 -219 -162 -241
-237 -31 -107 8 -193 113 -247 202 -102 671 -61 1153 101 720 242 1291 592
1834 1123 638 624 989 1313 1112 2186 21 152 30 576 15 744 -56 633 -259 1165
-654 1715 -166 229 -431 510 -627 661 -289 224 -592 389 -787 429 -79 16 -197
25 -233 18z"
      />
      <path
        d="M2650 6904 c-202 -59 -360 -182 -465 -362 -234 -400 -77 -885 330
-1019 68 -22 98 -26 200 -26 78 0 144 6 188 17 155 37 319 140 423 265 66 80
148 240 170 336 22 93 22 251 -1 335 -59 224 -239 403 -461 460 -114 29 -272
27 -384 -6z"
      />
      <path
        d="M8790 6909 c-208 -54 -377 -185 -487 -377 -91 -161 -125 -361 -89
-532 48 -231 230 -424 456 -486 78 -21 255 -24 344 -5 277 59 524 300 602 586
24 91 29 236 10 325 -50 240 -243 439 -481 495 -88 21 -263 18 -355 -6z"
      />
      <path
        d="M2009 4630 c-243 -38 -457 -201 -574 -434 -64 -129 -80 -197 -80
-341 0 -98 4 -133 23 -190 58 -174 180 -319 332 -394 461 -226 1019 109 1082
650 10 83 9 110 -6 186 -58 302 -312 518 -621 528 -55 2 -125 0 -156 -5z"
      />
      <path
        d="M8113 4625 c-272 -49 -503 -256 -598 -535 -87 -255 -29 -514 156
-699 125 -125 252 -179 439 -188 96 -4 129 -2 200 16 345 86 609 417 610 767
0 186 -55 319 -190 455 -69 69 -101 94 -170 127 -139 68 -285 86 -447 57z"
      />
    </g>
  </svg>
);

LogoIcon.propTypes = {
  stroke: PropTypes.string,
};
