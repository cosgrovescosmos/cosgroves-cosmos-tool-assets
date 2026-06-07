(function () {
  "use strict";

  const SNAPSHOT_LIB_URL = "https://cdn.jsdelivr.net/npm/html-to-image@1.11.11/dist/html-to-image.min.js";
  let snapshotLibPromise = null;
  const curveKeyCache = new WeakMap();

  const MODES = [
    { id: "osc_narrowband", label: "OSC + Dual/Narrowband Filter", cameraType: "osc", filterTypes: ["dualband", "triband"] },
    { id: "osc_lp", label: "OSC + Broadband LP Filter", cameraType: "osc", filterTypes: ["lp_broadband"] },
    { id: "osc_broadband", label: "OSC Broadband", cameraType: "osc", filterTypes: ["clear"] },
    { id: "broadband_mono", label: "Mono LRGB", cameraType: "mono", filterTypes: ["lrgb"] },
    { id: "narrowband_mono", label: "Mono SHO / Narrowband", cameraType: "mono", filterTypes: ["sho"] }
  ];

  const SPECTRAL_LINES = [
    { id: "hb", label: "Hβ", nm: 486.1, modes: ["osc_narrowband", "narrowband_mono"] },
    { id: "oiii495", label: "OIII", nm: 495.9, modes: ["osc_narrowband", "narrowband_mono"] },
    { id: "oiii501", label: "OIII", nm: 500.7, modes: ["osc_narrowband", "narrowband_mono"] },
    { id: "sodium", label: "Na", nm: 589.0, modes: ["osc_lp", "broadband_mono", "osc_broadband"] },
    { id: "ha", label: "Hα", nm: 656.3, modes: ["osc_narrowband", "narrowband_mono"] },
    { id: "sii672", label: "SII", nm: 671.6, modes: ["osc_narrowband", "narrowband_mono"] },
    { id: "sii673", label: "SII", nm: 673.1, modes: ["osc_narrowband", "narrowband_mono"] },
    { id: "mercury", label: "Hg", nm: 546.1, modes: ["broadband_mono", "osc_broadband"] }
  ];

  const CAMERAS = [
    {
      id: "asi2600mc_pro", name: "ZWO ASI2600MC Pro", type: "osc", sensor: "Sony IMX571", pixelSizeMicrons: 3.76, estimated: true,
      qeCurve: averageBayerCurves({
        red: { 400: 0, 450: 2, 500: 3, 550: 8, 580: 38, 610: 76, 640: 88, 656: 86, 680: 78, 720: 62, 760: 49, 800: 42, 850: 34 },
        green: { 400: 0, 450: 20, 480: 68, 510: 94, 535: 98, 560: 82, 600: 40, 640: 20, 672: 15, 700: 26, 750: 30, 800: 34, 850: 35 },
        blue: { 400: 8, 425: 42, 450: 78, 475: 70, 500: 45, 525: 18, 550: 6, 600: 3, 656: 5, 700: 7, 750: 5, 800: 22, 850: 36 }
      }),
      bayerCurves: {
        r: pctCurve({ 400: 0, 450: 2, 500: 3, 550: 8, 580: 38, 610: 76, 640: 88, 656: 86, 680: 78, 720: 62, 760: 49, 800: 42, 850: 34 }),
        g: pctCurve({ 400: 0, 450: 20, 480: 68, 510: 94, 535: 98, 560: 82, 600: 40, 640: 20, 672: 15, 700: 26, 750: 30, 800: 34, 850: 35 }),
        b: pctCurve({ 400: 8, 425: 42, 450: 78, 475: 70, 500: 45, 525: 18, 550: 6, 600: 3, 656: 5, 700: 7, 750: 5, 800: 22, 850: 36 })
      }
    },
    {
      id: "asi533mc_pro", name: "ZWO ASI533MC Pro", type: "osc", sensor: "Sony IMX533", pixelSizeMicrons: 3.76, estimated: true,
      qeCurve: averageBayerCurves({
        red: { 400: 2, 450: 8, 500: 16, 550: 28, 600: 45, 650: 63, 700: 55, 750: 24, 800: 8 },
        green: { 400: 7, 450: 29, 500: 58, 550: 75, 600: 62, 650: 25, 700: 7, 750: 1, 800: 0 },
        blue: { 400: 30, 450: 62, 500: 48, 550: 18, 600: 5, 650: 1, 700: 0, 750: 0, 800: 0 }
      }),
      bayerCurves: {
        r: pctCurve({ 400: 2, 450: 8, 500: 16, 550: 28, 600: 45, 650: 63, 700: 55, 750: 24, 800: 8 }),
        g: pctCurve({ 400: 7, 450: 29, 500: 58, 550: 75, 600: 62, 650: 25, 700: 7, 750: 1, 800: 0 }),
        b: pctCurve({ 400: 30, 450: 62, 500: 48, 550: 18, 600: 5, 650: 1, 700: 0, 750: 0, 800: 0 })
      }
    },
    {
      id: "asi585mc_pro", name: "ZWO ASI585MC Pro", type: "osc", sensor: "Sony IMX585", pixelSizeMicrons: 2.9, estimated: true,
      qeCurve: averageBayerCurves({
        red: { 400: 0, 450: 2, 500: 3, 550: 8, 600: 52, 656: 80, 672: 78, 700: 72, 750: 62, 800: 50, 850: 35 },
        green: { 400: 0, 450: 10, 500: 82, 550: 91, 600: 43, 656: 14, 672: 13, 700: 20, 750: 22, 800: 25, 850: 22 },
        blue: { 400: 0, 450: 70, 500: 57, 550: 10, 600: 5, 656: 5, 672: 5, 700: 5, 750: 8, 800: 14, 850: 15 }
      }),
      bayerCurves: {
        r: pctCurve({ 400: 0, 450: 2, 500: 3, 550: 8, 600: 52, 656: 80, 672: 78, 700: 72, 750: 62, 800: 50, 850: 35 }),
        g: pctCurve({ 400: 0, 450: 10, 500: 82, 550: 91, 600: 43, 656: 14, 672: 13, 700: 20, 750: 22, 800: 25, 850: 22 }),
        b: pctCurve({ 400: 0, 450: 70, 500: 57, 550: 10, 600: 5, 656: 5, 672: 5, 700: 5, 750: 8, 800: 14, 850: 15 })
      }
    },
    {
      id: "asi2600mm_pro", name: "ZWO ASI2600MM Pro", type: "mono", sensor: "Sony IMX571", pixelSizeMicrons: 3.76, estimated: true,
      qeCurve: { 400: 0.55, 450: 0.86, 490: 0.91, 520: 0.89, 550: 0.84, 600: 0.73, 656: 0.60, 672: 0.56, 700: 0.48, 720: 0.42 },
      bayerCurves: null
    },
    {
      id: "asi6200mm_pro", name: "ZWO ASI6200MM Pro", type: "mono", sensor: "Sony IMX455", pixelSizeMicrons: 3.76, estimated: true,
      qeCurve: { 400: 0.50, 450: 0.87, 500: 0.91, 550: 0.87, 600: 0.78, 656: 0.68, 672: 0.63, 700: 0.55, 720: 0.48 },
      bayerCurves: null
    },
    {
      id: "asi183mm_pro", name: "ZWO ASI183MM Pro", type: "mono", sensor: "Sony IMX183", pixelSizeMicrons: 2.4, estimated: true,
      qeCurve: { 400: 0.44, 450: 0.78, 500: 0.84, 550: 0.80, 600: 0.70, 656: 0.58, 672: 0.52, 700: 0.42, 720: 0.34 },
      bayerCurves: null
    }
  ];

  CAMERAS.push(
    cameraFromTool("asi6200mc_pro", "ZWO ASI6200MC Pro", "osc", "Sony IMX455", 3.76, {
      red: { 400: 3, 430: 5, 460: 6, 490: 7, 520: 8, 550: 12, 580: 35, 620: 62, 656: 70, 680: 68, 700: 50, 750: 28, 800: 14 },
      green: { 400: 8, 430: 18, 460: 38, 490: 62, 520: 80, 550: 82, 580: 45, 620: 18, 656: 9, 680: 7, 700: 5, 750: 3, 800: 2 },
      blue: { 400: 48, 430: 68, 460: 72, 490: 52, 520: 22, 550: 8, 580: 4, 620: 3, 656: 3, 680: 2, 700: 2, 750: 1, 800: 1 }
    }),
    cameraFromTool("qhy600m", "QHY600M (IMX455)", "mono", "Sony IMX455", 3.76, { 400: 68, 450: 83, 500: 88, 530: 91, 550: 90, 600: 84, 656: 74, 700: 55, 750: 35, 800: 18 }),
    cameraFromTool("asi1600mm_pro", "ZWO ASI1600MM Pro", "mono", "Panasonic MN34230", 3.8, { 400: 16, 450: 34, 500: 48, 550: 57, 600: 60, 650: 57, 700: 48, 750: 32, 800: 16 }),
    cameraFromTool("asi1600mc_pro", "ZWO ASI1600MC Pro", "osc", "Panasonic MN34230", 3.8, {
      red: { 400: 1, 450: 5, 500: 12, 550: 24, 600: 38, 650: 52, 700: 44, 750: 20, 800: 6 },
      green: { 400: 4, 450: 18, 500: 36, 550: 48, 600: 40, 650: 16, 700: 5, 750: 1, 800: 0 },
      blue: { 400: 18, 450: 45, 500: 34, 550: 12, 600: 3, 650: 0, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("asi183mc_pro", "ZWO ASI183MC Pro", "osc", "Sony IMX183", 2.4, {
      red: { 400: 1, 430: 2, 460: 4, 500: 8, 550: 15, 600: 62, 650: 76, 680: 72, 700: 58, 750: 28, 800: 10 },
      green: { 400: 6, 430: 15, 460: 32, 500: 58, 530: 84, 550: 80, 600: 42, 650: 18, 680: 8, 700: 4, 750: 2, 800: 1 },
      blue: { 400: 38, 430: 68, 460: 84, 500: 56, 530: 20, 550: 8, 600: 3, 650: 1, 680: 0, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("asi071mc_pro", "ZWO ASI071MC Pro", "osc", "Sony IMX071", 4.78, {
      red: { 400: 1, 430: 2, 460: 4, 500: 9, 550: 18, 600: 36, 650: 55, 680: 58, 700: 46, 750: 22, 800: 8 },
      green: { 400: 6, 430: 16, 460: 32, 500: 48, 530: 53, 550: 50, 600: 34, 650: 14, 680: 6, 700: 3, 750: 1, 800: 0 },
      blue: { 400: 24, 430: 42, 460: 50, 500: 34, 530: 14, 550: 6, 600: 2, 650: 0, 680: 0, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("qhy071c", "QHY071C (IMX071)", "osc", "Sony IMX071", 4.78, {
      red: { 400: 1, 430: 2, 460: 4, 500: 9, 550: 18, 600: 36, 650: 55, 680: 58, 700: 46, 750: 22, 800: 8 },
      green: { 400: 6, 430: 16, 460: 32, 500: 48, 530: 53, 550: 50, 600: 34, 650: 14, 680: 6, 700: 3, 750: 1, 800: 0 },
      blue: { 400: 24, 430: 42, 460: 50, 500: 34, 530: 14, 550: 6, 600: 2, 650: 0, 680: 0, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("asi294mm_pro", "ZWO ASI294MM Pro", "mono", "Sony IMX492", 4.63, { 400: 22, 450: 46, 500: 74, 550: 86, 600: 90, 650: 88, 700: 74, 750: 50, 800: 26 }),
    cameraFromTool("asi294mc_pro", "ZWO ASI294MC Pro", "osc", "Sony IMX294", 4.63, {
      red: { 400: 2, 450: 9, 500: 18, 550: 31, 600: 49, 650: 68, 700: 58, 750: 26, 800: 8 },
      green: { 400: 7, 450: 28, 500: 57, 550: 73, 600: 60, 650: 24, 700: 7, 750: 1, 800: 0 },
      blue: { 400: 30, 450: 61, 500: 47, 550: 17, 600: 5, 650: 1, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("asi533mm_pro", "ZWO ASI533MM Pro", "mono", "Sony IMX533", 3.76, { 400: 18, 450: 42, 500: 71, 550: 83, 600: 90, 650: 91, 700: 79, 750: 56, 800: 32 }),
    cameraFromTool("asi2400mc_pro", "ZWO ASI2400MC Pro", "osc", "Sony IMX410", 5.94, {
      red: { 400: 2, 430: 3, 460: 5, 500: 9, 550: 18, 600: 42, 650: 68, 680: 70, 700: 58, 750: 30, 800: 10 },
      green: { 400: 8, 430: 18, 460: 34, 500: 56, 550: 78, 600: 62, 650: 24, 680: 10, 700: 6, 750: 2, 800: 1 },
      blue: { 400: 36, 430: 62, 460: 80, 500: 58, 550: 18, 600: 5, 650: 1, 680: 0, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("seestar_s30", "ZWO Seestar S30 (IMX662)", "osc", "Sony IMX662", 2.9, {
      red: { 450: 4, 500: 5, 550: 10, 600: 55, 656: 84, 672: 82, 700: 74, 750: 60, 800: 48, 850: 32, 900: 18, 950: 8 },
      green: { 450: 12, 500: 85, 550: 88, 600: 42, 656: 12, 672: 11, 700: 18, 750: 20, 800: 22, 850: 18, 900: 10, 950: 4 },
      blue: { 450: 68, 500: 50, 550: 9, 600: 4, 656: 3, 672: 3, 700: 4, 750: 8, 800: 14, 850: 12, 900: 7, 950: 3 }
    }),
    cameraFromTool("seestar_s50", "ZWO Seestar S50 (IMX462)", "osc", "Sony IMX462", 2.9, {
      red: { 450: 4, 500: 6, 550: 12, 600: 48, 656: 78, 672: 76, 700: 68, 750: 62, 800: 55, 850: 48, 900: 38, 950: 25 },
      green: { 450: 14, 500: 78, 550: 74, 600: 36, 656: 10, 672: 9, 700: 16, 750: 22, 800: 28, 850: 26, 900: 18, 950: 9 },
      blue: { 450: 60, 500: 42, 550: 8, 600: 3, 656: 2, 672: 2, 700: 3, 750: 10, 800: 20, 850: 25, 900: 17, 950: 8 }
    }),
    cameraFromTool("qhy268m", "QHY268M (IMX571)", "mono", "Sony IMX571", 3.76, { 400: 18, 450: 42, 500: 71, 550: 83, 600: 90, 650: 91, 700: 79, 750: 56, 800: 32 }),
    cameraFromTool("qhy268c", "QHY268C (IMX571)", "osc", "Sony IMX571", 3.76, {
      red: { 400: 2, 450: 8, 500: 16, 550: 28, 600: 45, 650: 63, 700: 55, 750: 24, 800: 8 },
      green: { 400: 7, 450: 29, 500: 58, 550: 75, 600: 62, 650: 25, 700: 7, 750: 1, 800: 0 },
      blue: { 400: 30, 450: 62, 500: 48, 550: 18, 600: 5, 650: 1, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("asi585mm_pro", "ZWO ASI585MM Pro", "mono", "Sony IMX585", 2.9, {
      400: 58, 450: 78, 500: 88, 530: 91, 550: 90, 600: 88, 656: 82, 672: 79, 700: 72, 750: 60, 800: 45, 850: 31, 900: 18, 950: 9
    }),
    cameraFromTool("playerone_poseidon_m_pro", "Player One Poseidon-M Pro (IMX571)", "mono", "Sony IMX571", 3.76, {
      400: 18, 450: 42, 500: 71, 550: 83, 600: 90, 650: 91, 700: 79, 750: 56, 800: 32
    }),
    cameraFromTool("playerone_poseidon_c_pro", "Player One Poseidon-C Pro (IMX571)", "osc", "Sony IMX571", 3.76, {
      red: { 400: 2, 450: 9, 500: 17, 550: 30, 600: 48, 650: 67, 700: 59, 750: 26, 800: 9 },
      green: { 400: 7, 450: 31, 500: 62, 550: 80, 600: 66, 650: 27, 700: 7, 750: 1, 800: 0 },
      blue: { 400: 32, 450: 66, 500: 51, 550: 19, 600: 5, 650: 1, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("playerone_artemis_c_pro", "Player One Artemis-C Pro (IMX294)", "osc", "Sony IMX294", 4.63, {
      red: { 400: 2, 450: 9, 500: 19, 550: 32, 600: 51, 650: 71, 700: 60, 750: 27, 800: 8 },
      green: { 400: 7, 450: 29, 500: 59, 550: 76, 600: 62, 650: 25, 700: 7, 750: 1, 800: 0 },
      blue: { 400: 31, 450: 64, 500: 49, 550: 18, 600: 5, 650: 1, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("playerone_ares_m_pro", "Player One Ares-M Pro (IMX533)", "mono", "Sony IMX533", 3.76, {
      400: 18, 450: 42, 500: 71, 550: 83, 600: 90, 650: 91, 700: 79, 750: 56, 800: 32
    }),
    cameraFromTool("playerone_ares_c_pro", "Player One Ares-C Pro (IMX533)", "osc", "Sony IMX533", 3.76, {
      red: { 400: 2, 450: 9, 500: 17, 550: 30, 600: 48, 650: 67, 700: 59, 750: 26, 800: 9 },
      green: { 400: 7, 450: 31, 500: 62, 550: 80, 600: 66, 650: 27, 700: 7, 750: 1, 800: 0 },
      blue: { 400: 32, 450: 66, 500: 51, 550: 19, 600: 5, 650: 1, 700: 0, 750: 0, 800: 0 }
    }),
    cameraFromTool("playerone_uranus_m_pro", "Player One Uranus-M Pro (IMX585)", "mono", "Sony IMX585", 2.9, {
      400: 58, 450: 78, 500: 88, 530: 91, 550: 90, 600: 88, 656: 82, 672: 79, 700: 72, 750: 60, 800: 45, 850: 31, 900: 18, 950: 9
    }),
    cameraFromTool("playerone_uranus_c_pro", "Player One Uranus-C Pro (IMX585)", "osc", "Sony IMX585", 2.9, {
      red: { 450: 2, 500: 3, 550: 8, 600: 52, 656: 80, 672: 78, 700: 72, 750: 62, 800: 50, 850: 35, 900: 18, 950: 8 },
      green: { 450: 10, 500: 82, 550: 91, 600: 43, 656: 14, 672: 13, 700: 20, 750: 22, 800: 25, 850: 22, 900: 12, 950: 5 },
      blue: { 450: 70, 500: 57, 550: 10, 600: 5, 656: 5, 672: 5, 700: 5, 750: 8, 800: 14, 850: 15, 900: 8, 950: 3 }
    })
  );

  const FILTER_SETS = [
    {
      id: "optolong_lextreme", name: "Optolong L-eXtreme (Ha/OIII 7nm)", type: "dualband", estimated: true,
      channels: {
        combined: peaks([{ c: 500.7, w: 7, t: 0.92 }, { c: 656.3, w: 7, t: 0.92 }])
      },
      note: "Adapted from compact Ha/OIII control points used in the comparison tool."
    },
    {
      id: "antlia_alpt_5nm", name: "Antlia ALP-T 5nm Ha/OIII", type: "dualband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 5, t: 0.84 }, { c: 656.3, w: 5, t: 0.90 }]) },
      note: "Narrower OSC dual-band educational approximation."
    },
    {
      id: "antlia_alpt_3nm", name: "Antlia ALP-T 3nm Ha/OIII", type: "dualband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 3, t: 0.82 }, { c: 656.3, w: 3, t: 0.90 }]) },
      note: "Ultra-narrow OSC dual-band approximation from the comparison catalog."
    },
    {
      id: "antlia_alpt_3nm_combo", name: "Antlia ALP-T 3nm + SII/Hb combo", type: "triband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 3, t: 0.82 }, { c: 656.3, w: 3, t: 0.90 }, { c: 672.4, w: 3.5, t: 0.90 }, { c: 486.1, w: 3.5, t: 0.78 }]) },
      note: "Paired Antlia OSC workflow represented through Ha/OIII/SII plus H-beta passband context."
    },
    {
      id: "antlia_alpt_5nm_combo", name: "Antlia ALP-T 5nm combo", type: "triband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 5, t: 0.84 }, { c: 656.3, w: 5, t: 0.90 }, { c: 672.4, w: 5, t: 0.90 }, { c: 486.1, w: 5, t: 0.78 }]) },
      note: "Paired Antlia OSC workflow represented through Ha/OIII/SII plus H-beta passband context."
    },
    {
      id: "optolong_lultimate", name: "Optolong L-Ultimate (Ha/OIII 3nm)", type: "dualband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 3, t: 0.90 }, { c: 656.3, w: 3, t: 0.90 }]) },
      note: "Tight OSC dual-band approximation from the comparison catalog."
    },
    {
      id: "optolong_lenhance", name: "Optolong L-eNhance (Ha + Hb/OIII)", type: "dualband", estimated: true,
      channels: { combined: mergeCurves([peaks([{ c: 656.3, w: 10, t: 0.88 }]), plateau(484, 516, 0.90, 4)]) },
      note: "Wider dual-band / tri-line approximation including H-beta/OIII."
    },
    {
      id: "idas_nbz_ii", name: "IDAS NBZ-II (Ha 9.5nm / OIII 8nm)", type: "dualband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 8, t: 0.88 }, { c: 656.3, w: 9.5, t: 0.88 }]) },
      note: "Wider fast-optics-friendly OSC dual-band approximation."
    },
    {
      id: "askar_super_d1", name: "Askar Super D1 (OIII / Ha)", type: "dualband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 6.5, t: 0.86 }, { c: 656.3, w: 8.5, t: 0.86 }]) },
      note: "Askar Colour Magic D1 compact planning curve."
    },
    {
      id: "askar_super_d2", name: "Askar Super D2 (OIII 6.5nm / SII 8.5nm)", type: "dualband", estimated: true,
      channels: {
        combined: mergeCurves([
          pctCurve({ 497.0: 0, 497.9: 18, 498.8: 62, 499.5: 82, 500.1: 85, 500.7: 86, 501.3: 85, 501.9: 82, 502.6: 62, 503.5: 18, 504.4: 0 }),
          pctCurve({ 666.5: 0, 667.5: 18, 668.6: 62, 669.6: 82, 670.4: 85, 672.0: 86, 673.6: 85, 674.4: 82, 675.4: 62, 676.5: 18, 677.5: 0 })
        ])
      },
      note: "Askar Colour Magic D2 compact OIII/SII planning curves imported from the comparison catalog."
    },
    {
      id: "askar_super_d1_d2", name: "Askar Super D1 + D2 combo (Ha/OIII/SII)", type: "triband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 6.5, t: 0.86 }, { c: 656.3, w: 8.5, t: 0.86 }, { c: 672.4, w: 8.5, t: 0.86 }]) },
      note: "Paired OSC combo represented through Ha/OIII/SII."
    },
    {
      id: "radian_triad_ultra", name: "Radian Triad Ultra (Ha/OIII/SII 4nm)", type: "triband", estimated: true,
      channels: { combined: peaks([{ c: 500.7, w: 4, t: 0.97 }, { c: 656.3, w: 4, t: 0.90 }, { c: 671.6, w: 4, t: 0.90 }]) },
      note: "OSC tri/quad-band approximation; H-beta passband is not scored independently."
    },
    {
      id: "antlia_triband_rgb_ultra", name: "Antlia Triband RGB Ultra II", type: "triband", estimated: true,
      channels: { combined: peaks([{ c: 440, w: 58, t: 0.90 }, { c: 510, w: 80, t: 0.88 }, { c: 656.3, w: 22, t: 0.90 }]) },
      note: "Broad hybrid windows, treated as provisional LP / hybrid behavior."
    },
    {
      id: "zwo_lrgb_gen2", name: "ZWO Gen II LRGB", type: "lrgb", estimated: true,
      channels: {
        l: smoothBandpass(400, 700, 0.94, 12),
        r: smoothBandpass(590, 700, 0.92, 12),
        g: smoothBandpass(500, 585, 0.92, 10),
        b: smoothBandpass(410, 505, 0.90, 10)
      },
      note: "Broadband LRGB approximation."
    },
    {
      id: "antlia_lrgb_vpro", name: "Antlia LRGB-V Pro", type: "lrgb", estimated: true,
      channels: {
        l: smoothBandpass(400, 690, 0.96, 10),
        r: smoothBandpass(595, 690, 0.94, 10),
        g: smoothBandpass(505, 585, 0.94, 10),
        b: smoothBandpass(420, 500, 0.93, 10)
      },
      note: "Premium LRGB educational approximation."
    },
    {
      id: "baader_cmos_lrgb", name: "Baader CMOS LRGB", type: "lrgb", estimated: true,
      channels: {
        l: smoothBandpass(430, 685, 0.98, 10),
        r: smoothBandpass(600, 688, 0.97, 8),
        g: smoothBandpass(495, 578, 0.97, 8),
        b: smoothBandpass(410, 508, 0.97, 10)
      },
      note: "Baader CMOS LRGB compact approximation from the comparison catalog."
    },
    {
      id: "chroma_lrgb", name: "Chroma LRGB", type: "lrgb", estimated: true,
      channels: {
        l: smoothBandpass(410, 700, 0.97, 10),
        r: smoothBandpass(610, 698, 0.97, 10),
        g: smoothBandpass(510, 598, 0.97, 10),
        b: smoothBandpass(405, 498, 0.97, 10)
      },
      note: "Chroma broadband compact approximation from the comparison catalog."
    },
    {
      id: "astronomik_deepsky_l1", name: "Astronomik Deep-Sky RGB + L-1", type: "lrgb", estimated: true,
      channels: {
        l: pctCurve({ 385: 0, 395: 8, 410: 96, 500: 97, 600: 97, 690: 96, 705: 10, 715: 0 }),
        r: pctCurve({ 585: 0, 600: 5, 605: 95, 630: 96, 660: 95, 675: 90, 690: 5, 700: 0 }),
        g: pctCurve({ 490: 0, 500: 5, 505: 95, 530: 96, 555: 97, 565: 96, 575: 5, 585: 0 }),
        b: pctCurve({ 410: 0, 420: 5, 425: 95, 450: 96, 480: 96, 495: 95, 505: 5, 515: 0 })
      },
      note: "Astronomik Deep-Sky RGB + L-1 compact control points imported from the comparison catalog."
    },
    {
      id: "astronomik_deepsky_l2", name: "Astronomik Deep-Sky RGB + L-2", type: "lrgb", estimated: true,
      channels: {
        l: pctCurve({ 395: 0, 405: 8, 420: 96, 500: 97, 600: 97, 680: 96, 695: 10, 705: 0 }),
        r: pctCurve({ 585: 0, 600: 5, 605: 95, 630: 96, 660: 95, 675: 90, 690: 5, 700: 0 }),
        g: pctCurve({ 490: 0, 500: 5, 505: 95, 530: 96, 555: 97, 565: 96, 575: 5, 585: 0 }),
        b: pctCurve({ 410: 0, 420: 5, 425: 95, 450: 96, 480: 96, 495: 95, 505: 5, 515: 0 })
      },
      note: "Astronomik Deep-Sky RGB + L-2 compact control points imported from the comparison catalog."
    },
    {
      id: "astronomik_deepsky_l3", name: "Astronomik Deep-Sky RGB + L-3", type: "lrgb", estimated: true,
      channels: {
        l: pctCurve({ 405: 0, 415: 8, 430: 96, 500: 97, 600: 97, 670: 96, 685: 10, 695: 0 }),
        r: pctCurve({ 585: 0, 600: 5, 605: 95, 630: 96, 660: 95, 675: 90, 690: 5, 700: 0 }),
        g: pctCurve({ 490: 0, 500: 5, 505: 95, 530: 96, 555: 97, 565: 96, 575: 5, 585: 0 }),
        b: pctCurve({ 410: 0, 420: 5, 425: 95, 450: 96, 480: 96, 495: 95, 505: 5, 515: 0 })
      },
      note: "Astronomik Deep-Sky RGB + L-3 compact control points imported from the comparison catalog."
    },
    {
      id: "astronomik_6nm_sho", name: "Astronomik 6nm SHO", type: "sho", estimated: true,
      channels: {
        ha: pctCurve({ 649: 0, 650: 4.4, 651: 8.2, 652: 18.6, 653: 38.9, 654: 73.7, 655: 94.0, 656: 98.0, 657: 98.0, 658: 97.6, 659: 88.1, 660: 62.4, 661: 31.2, 662: 15.7, 663: 7.7, 664: 4.4, 665: 0 }),
        oiii: pctCurve({ 495: 0, 496: 3.8, 497: 11.5, 498: 40.0, 499: 83.4, 500: 94.0, 501: 94.2, 502: 92.5, 503: 63.9, 504: 25.4, 505: 7.7, 506: 0 }),
        sii: pctCurve({ 665: 0, 666: 4.0, 667: 6.9, 668: 14.2, 669: 30.3, 670: 61.9, 671: 88.5, 672: 97.6, 673: 97.8, 674: 97.6, 675: 93.8, 676: 75.2, 677: 42.5, 678: 21.7, 679: 10.4, 680: 6.0, 681: 3.8, 682: 0 })
      },
      note: "Dense Astronomik 6nm curves imported from the comparison catalog. OIII is one passband centered near 500.7nm; H-beta is excluded."
    },
    {
      id: "chroma_3nm_sho", name: "Chroma 3nm SHO", type: "sho", estimated: true,
      channels: {
        ha: peaks([{ c: 656.3, w: 3, t: 0.94 }]),
        oiii: peaks([{ c: 500.7, w: 3, t: 0.93 }]),
        sii: peaks([{ c: 672.4, w: 3, t: 0.90 }])
      },
      note: "Ultra-narrow line-filter approximation. The OIII filter is modeled as one 500.7nm passband; the 495.9nm OIII line is kept as a spectral landmark, not a separate 3nm filter peak."
    },
    {
      id: "chroma_5nm_sho", name: "Chroma 5nm SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 5, t: 0.97 }]), oiii: peaks([{ c: 500.7, w: 5, t: 0.97 }]), sii: peaks([{ c: 672.4, w: 5, t: 0.97 }]) },
      note: "Chroma 5nm SHO compact approximation from the comparison catalog."
    },
    {
      id: "chroma_8nm_sho", name: "Chroma 8nm SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 8, t: 0.97 }]), oiii: peaks([{ c: 500.7, w: 8, t: 0.97 }]), sii: peaks([{ c: 672.4, w: 8, t: 0.97 }]) },
      note: "Chroma 8nm SHO compact approximation from the comparison catalog."
    },
    {
      id: "zwo_7nm_sho", name: "ZWO 7nm SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 7, t: 0.91 }]), oiii: peaks([{ c: 500.7, w: 7, t: 0.90 }]), sii: peaks([{ c: 672.4, w: 7, t: 0.90 }]) },
      note: "ZWO SHO 7nm compact approximation."
    },
    {
      id: "astronomik_12nm_sho", name: "Astronomik 12nm SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 12, t: 0.97 }]), oiii: peaks([{ c: 500.7, w: 12, t: 0.97 }]), sii: peaks([{ c: 672.4, w: 12, t: 0.96 }]) },
      note: "Wider SHO set for brighter targets and faster systems."
    },
    {
      id: "astronomik_4nm_sho", name: "Astronomik 4nm SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 4, t: 0.96 }]), oiii: peaks([{ c: 500.7, w: 4, t: 0.96 }]), sii: peaks([{ c: 672.4, w: 4, t: 0.96 }]) },
      note: "Tight Astronomik SHO approximation."
    },
    {
      id: "baader_3nm_sho", name: "Baader 3.5/4nm SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 3.5, t: 0.97 }]), oiii: peaks([{ c: 500.7, w: 4, t: 0.97 }]), sii: peaks([{ c: 672.4, w: 4, t: 0.97 }]) },
      note: "Baader ultra-narrow SHO compact approximation."
    },
    {
      id: "baader_6nm_sho", name: "Baader 6.5nm SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 6.5, t: 0.97 }]), oiii: peaks([{ c: 500.7, w: 6.5, t: 0.97 }]), sii: peaks([{ c: 672.4, w: 6.5, t: 0.97 }]) },
      note: "Baader 6.5nm SHO compact approximation."
    },
    {
      id: "antlia_3nm_sho", name: "Antlia 3nm Pro SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 3, t: 0.91 }]), oiii: peaks([{ c: 500.7, w: 3, t: 0.91 }]), sii: peaks([{ c: 672.4, w: 3, t: 0.91 }]) },
      note: "Antlia 3nm Pro SHO compact approximation."
    },
    {
      id: "antlia_4p5nm_sho", name: "Antlia 4.5nm EDGE SHO", type: "sho", estimated: true,
      channels: { ha: peaks([{ c: 656.3, w: 4.5, t: 0.93 }]), oiii: peaks([{ c: 500.7, w: 4.5, t: 0.90 }]), sii: peaks([{ c: 672.4, w: 4.5, t: 0.93 }]) },
      note: "Antlia 4.5nm EDGE SHO compact approximation."
    },
    {
      id: "no_filter", name: "No strong LP filter / clear window", type: "clear", estimated: true,
      channels: { combined: { 350: 0.98, 850: 0.98 } },
      note: "Represents OSC broadband without a strong spectral rejection filter; modeled UV/IR response remains available."
    },
    {
      id: "optolong_lpro", name: "Optolong L-Pro broadband LP", type: "lp_broadband", estimated: true,
      channels: { combined: notchFilter() },
      note: "Dense L-Pro control-point model imported from the comparison catalog, including detailed mercury, sodium, and red-region notches."
    },
    {
      id: "antlia_triband_rgb_ultra_lp", name: "Antlia Triband RGB Ultra II (LP / hybrid)", type: "lp_broadband", estimated: true,
      channels: { combined: antliaTribandLpFilter() },
      note: "Comparison-tool LP / hybrid model. Broader and less aggressive than narrowband; treated as provisional for broadband city-light work."
    },
    {
      id: "antlia_quad_band_lp", name: "Antlia Quad Band (LP / hybrid)", type: "lp_broadband", estimated: true,
      channels: {
        combined: pctCurve({ 400: 0, 410: 88, 450: 92, 482: 90, 490: 72, 500: 20, 506: 0, 522: 62, 540: 88, 560: 90, 575: 78, 588: 18, 596: 0, 606: 66, 624: 88, 650: 90, 656: 90, 670: 88, 676: 58, 684: 16, 690: 0, 704: 54, 725: 70, 760: 62, 800: 50 })
      },
      note: "Antlia Quad Band compact LP / hybrid planning curve imported from the comparison catalog."
    },
    {
      id: "seestar_lp_broadband", name: "Seestar LP Filter (Ha 20nm / OIII 30nm)", type: "dualband", estimated: true,
      channels: { combined: mergeCurves([peaks([{ c: 500.7, w: 30, t: 0.90 }]), peaks([{ c: 656.3, w: 20, t: 0.92 }])]) },
      note: "Seestar built-in LP filter approximation from the comparison catalog."
    }
  ];

  FILTER_SETS.forEach((filter) => {
    filter.includesUvIrBlocking = filter.id !== "no_filter";
  });

  const ADDITIONAL_FILTERS = [
    {
      id: "none",
      name: "None",
      type: "cleanup",
      description: "No additional optical cleanup filter is applied.",
      curve: { 350: 1, 850: 1 }
    },
    {
      id: "generic_uv_ir_cut",
      name: "Generic UV/IR Cut",
      type: "cleanup",
      dataQuality: "generic relative model",
      description: "Passes the visible band and blocks out-of-band ultraviolet and infrared light.",
      curve: pctCurve({ 350: 0, 370: 0, 380: 5, 390: 50, 400: 95, 450: 97, 500: 98, 550: 98, 600: 98, 650: 97, 680: 95, 700: 50, 720: 5, 740: 0, 760: 0, 850: 0 })
    }
  ];

  const TARGETS = [
    { id: "emission_nebula", name: "Emission Nebula", kind: "line", lines: { hb: 0.25, oiii495: 0.45, oiii501: 0.95, ha: 1.0, sii672: 0.38, sii673: 0.34 }, continuum: 0.05 },
    { id: "planetary_nebula", name: "Planetary Nebula", kind: "line", lines: { hb: 0.42, oiii495: 0.72, oiii501: 1.0, ha: 0.55, sii672: 0.18, sii673: 0.15 }, continuum: 0.04 },
    { id: "supernova_remnant", name: "Supernova Remnant", kind: "line", lines: { hb: 0.18, oiii495: 0.55, oiii501: 0.75, ha: 0.92, sii672: 0.72, sii673: 0.66 }, continuum: 0.08 },
    { id: "galaxy", name: "Galaxy", kind: "broadband", temp: 5200, redBias: 0.16 },
    { id: "reflection_nebula", name: "Reflection Nebula", kind: "broadband", temp: 8200, blueBias: 0.28 },
    { id: "star_cluster", name: "Star Cluster", kind: "broadband", temp: 6200 },
    { id: "broadband_star_field", name: "Broadband Star Field", kind: "broadband", temp: 5800 }
  ];

  const LP_PRESETS = [
    { id: "rural", name: "Rural / Mostly Natural Airglow", mix: { natural: 1.0, warmLed: 0.05, coolLed: 0.02, sodium: 0.04, mercury: 0.02, metal: 0.01 } },
    { id: "mixed_suburban", name: "Suburban Mixed Lighting", mix: { natural: 0.5, warmLed: 0.45, coolLed: 0.32, sodium: 0.26, mercury: 0.14, metal: 0.12 } },
    { id: "warm_led", name: "Warm LED Dominant", mix: { natural: 0.35, warmLed: 0.85, coolLed: 0.12, sodium: 0.1, mercury: 0.04, metal: 0.05 } },
    { id: "cool_led", name: "Cool LED Dominant", mix: { natural: 0.32, warmLed: 0.22, coolLed: 0.85, sodium: 0.08, mercury: 0.08, metal: 0.12 } },
    { id: "sodium_heavy", name: "Sodium Heavy", mix: { natural: 0.35, warmLed: 0.12, coolLed: 0.06, sodium: 0.95, lowSodium: 0.48, mercury: 0.04, metal: 0.05 } },
    { id: "sodium_mercury_mix", name: "Mixed Sodium Vapor + Mercury", mix: { natural: 0.35, warmLed: 0.08, coolLed: 0.04, sodium: 0.76, lowSodium: 0.22, mercury: 0.68, metal: 0.08 } },
    { id: "mercury_old", name: "Mercury / Older Street Lighting Mix", mix: { natural: 0.35, warmLed: 0.12, coolLed: 0.1, sodium: 0.25, mercury: 0.82, metal: 0.18 } },
    { id: "commercial", name: "Commercial / Parking Lot Mix", mix: { natural: 0.28, warmLed: 0.32, coolLed: 0.56, sodium: 0.2, mercury: 0.2, metal: 0.55 } },
    { id: "custom", name: "Custom Mix", mix: { natural: 0.5, warmLed: 0.45, coolLed: 0.32, sodium: 0.26, lowSodium: 0.08, mercury: 0.14, metal: 0.12 } }
  ];

  const state = {
    mode: "osc_narrowband",
    camera: "asi2600mc_pro",
    filter: "optolong_lextreme",
    additionalFilter: "none",
    target: "emission_nebula",
    bortle: 6,
    lp: "mixed_suburban",
    tab: "overview",
    view: "story",
    takeawayOpen: true,
    focusMode: false,
    overlay: { qe: false, filter: true, cleanup: false, effective: false, bayer: true, target: true, sky: true, signal: false, background: false },
    overlaySplit: {
      sourceTarget: true,
      sourceSky: true,
      sourceCombined: true,
      captureFilter: true,
      captureCamera: true,
      captureCombined: true,
      finalTarget: true,
      finalBackground: true
    },
    advanced: {
      centerShift: 0,
      transmissionScale: 100,
      moonPhase: 15,
      haze: 20,
      normalizeRows: true,
      showAllLabels: false,
      extendRange: false,
      customMix: { warmLed: 45, coolLed: 32, sodium: 26, lowSodium: 8, mercury: 14, metal: 12, natural: 50 }
    }
  };

  const MODE_CONTROL_LABELS = {
    osc_narrowband: {
      cameraLabel: "2. Camera / OSC Sensor",
      primaryFilterLabel: "3. Dual-Band / Narrowband Filter",
      primaryFilterHelper: "Passes selected emission-line regions such as OIII/Hβ and Hα.",
      additionalFilterLabel: "4. Additional Optical Filter"
    },
    osc_lp: {
      cameraLabel: "2. Camera / OSC Sensor",
      primaryFilterLabel: "3. Broadband LP Filter",
      primaryFilterHelper: "Suppresses selected light-pollution regions while preserving broader RGB signal.",
      additionalFilterLabel: "4. Additional Optical Filter"
    },
    osc_broadband: {
      cameraLabel: "2. Camera / OSC Sensor",
      primaryFilterLabel: "3. Primary Filter",
      primaryFilterHelper: "Usually none for simple OSC broadband imaging.",
      additionalFilterLabel: "4. Additional Optical Filter"
    },
    broadband_mono: {
      cameraLabel: "2. Camera / Mono Sensor",
      primaryFilterLabel: "3. LRGB Filter Set",
      primaryFilterHelper: "Defines luminance and color-channel passbands.",
      additionalFilterLabel: "4. Additional Optical Filter"
    },
    narrowband_mono: {
      cameraLabel: "2. Camera / Mono Sensor",
      primaryFilterLabel: "3. SHO / Narrowband Filter Set",
      primaryFilterHelper: "Isolates emission lines such as Hα, OIII, and SII.",
      additionalFilterLabel: "4. Additional Optical Filter"
    }
  };

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "details", label: "Line / Channel Details" },
    { id: "sky", label: "Sky Leakage" },
    { id: "color", label: "Color Balance" },
    { id: "notes", label: "Data Notes" }
  ];

  function $(id) { return document.getElementById(id); }
  function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function formatPct(v) { return `${Math.round(clamp(v, 0, 1) * 100)}%`; }
  function formatIndex(v) { return Number(v || 0).toFixed(v >= 10 ? 0 : 2); }
  function curveKeys(curve) {
    if (!curveKeyCache.has(curve)) curveKeyCache.set(curve, Object.keys(curve).map(Number).sort((a, b) => a - b));
    return curveKeyCache.get(curve);
  }

  function curveValue(curve, key) {
    if (Object.prototype.hasOwnProperty.call(curve, key)) return Number(curve[key]) || 0;
    const fixed = Number(key).toFixed(1);
    if (Object.prototype.hasOwnProperty.call(curve, fixed)) return Number(curve[fixed]) || 0;
    return 0;
  }

  function pctCurve(curve) {
    const out = {};
    Object.keys(curve).forEach((key) => { out[key] = Number(curve[key]) / 100; });
    return out;
  }

  function averageBayerCurves(curves) {
    const keys = new Set();
    Object.values(curves).forEach((curve) => Object.keys(curve).forEach((key) => keys.add(key)));
    const out = {};
    Array.from(keys).sort((a, b) => Number(a) - Number(b)).forEach((key) => {
      const nm = Number(key);
      const red = controlPointValue(curves.red, nm);
      const green = controlPointValue(curves.green, nm);
      const blue = controlPointValue(curves.blue, nm);
      out[key] = (0.25 * red + 0.50 * green + 0.25 * blue) / 100;
    });
    return out;
  }

  function cameraFromTool(id, name, type, sensor, pixelSizeMicrons, qe) {
    if (type === "osc") {
      const bayerCurves = { r: pctCurve(qe.red), g: pctCurve(qe.green), b: pctCurve(qe.blue) };
      return { id, name, type, sensor, pixelSizeMicrons, estimated: true, qeCurve: averageBayerCurves(qe), bayerCurves };
    }
    return { id, name, type, sensor, pixelSizeMicrons, estimated: true, qeCurve: pctCurve(qe), bayerCurves: null };
  }

  function controlPointValue(curve, nm) {
    const keys = curveKeys(curve);
    if (!keys.length) return 0;
    if (nm <= keys[0]) return curveValue(curve, keys[0]);
    if (nm >= keys[keys.length - 1]) return curveValue(curve, keys[keys.length - 1]);
    for (let i = 1; i < keys.length; i += 1) {
      if (nm <= keys[i]) {
        const a = keys[i - 1];
        const b = keys[i];
        return lerp(curveValue(curve, a), curveValue(curve, b), (nm - a) / (b - a));
      }
    }
    return 0;
  }

  function smoothControlPointValue(curve, nm) {
    const keys = curveKeys(curve);
    if (keys.length < 3 || nm <= keys[0] || nm >= keys[keys.length - 1]) return controlPointValue(curve, nm);
    const values = keys.map((key) => controlPointValue(curve, key));
    for (let i = 1; i < keys.length; i += 1) {
      if (nm <= keys[i]) {
        const x0 = keys[i - 1];
        const x1 = keys[i];
        const y0 = values[i - 1];
        const y1 = values[i];
        const prev = Math.max(0, i - 2);
        const next = Math.min(keys.length - 1, i + 1);
        const m0 = (values[i] - values[prev]) / Math.max(keys[i] - keys[prev], 1e-6);
        const m1 = (values[next] - values[i - 1]) / Math.max(keys[next] - keys[i - 1], 1e-6);
        const t = (nm - x0) / (x1 - x0);
        const t2 = t * t;
        const t3 = t2 * t;
        const value = (2 * t3 - 3 * t2 + 1) * y0
          + (t3 - 2 * t2 + t) * (x1 - x0) * m0
          + (-2 * t3 + 3 * t2) * y1
          + (t3 - t2) * (x1 - x0) * m1;
        return clamp(value, Math.min(y0, y1), Math.max(y0, y1));
      }
    }
    return controlPointValue(curve, nm);
  }

  function plateau(start, end, top, edge) {
    return { [start - edge]: 0, [start]: top, [end]: top, [end + edge]: 0 };
  }

  function smoothBandpass(start, end, top, edge) {
    const out = {};
    for (let nm = start - edge * 2; nm <= end + edge * 2; nm += 2) {
      const rise = 1 / (1 + Math.exp(-(nm - start) / Math.max(edge / 2, 1)));
      const fall = 1 / (1 + Math.exp((nm - end) / Math.max(edge / 2, 1)));
      const crown = 0.985 + 0.015 * Math.cos(((nm - (start + end) / 2) / Math.max(end - start, 1)) * Math.PI);
      out[nm] = clamp(top * rise * fall * crown, 0, top);
    }
    return out;
  }

  function peaks(items) {
    const out = {};
    items.forEach((p) => {
      const half = p.w / 2;
      out[(p.c - half - 1.4).toFixed(1)] = 0;
      out[(p.c - half).toFixed(1)] = 0.25 * p.t;
      out[(p.c - half / 2).toFixed(1)] = 0.72 * p.t;
      out[p.c.toFixed(1)] = p.t;
      out[(p.c + half / 2).toFixed(1)] = 0.72 * p.t;
      out[(p.c + half).toFixed(1)] = 0.25 * p.t;
      out[(p.c + half + 1.4).toFixed(1)] = 0;
    });
    return out;
  }

  function mergeCurves(curves) {
    const out = {};
    for (let nm = 350; nm <= 850; nm += 1) {
      out[nm] = Math.max(...curves.map((curve) => controlPointValue(curve, nm)));
    }
    return out;
  }

  function notchFilter() {
    return pctCurve({
      400: 0, 408: 70, 420: 90, 430: 95, 434: 66, 435.2: 40, 435.8: 22, 436.4: 34, 438: 58, 442: 88,
      450: 96, 470: 96, 485: 94, 500: 92, 512: 90, 520: 92, 530: 94, 540: 88, 544.8: 56, 545.5: 34,
      546.1: 24, 546.7: 34, 548: 58, 552: 84, 560: 96, 570: 96, 575: 94, 576.7: 68, 577.5: 46,
      578.3: 40, 579.1: 44, 580.0: 58, 582: 82, 586: 78, 587.5: 46, 588.3: 28, 589.0: 16,
      589.6: 16, 590.2: 22, 591.0: 34, 592.0: 48, 594: 70, 598: 88, 606: 94, 620: 95, 640: 95,
      654: 95, 656: 95, 660: 92, 667: 84, 669.0: 64, 670.0: 40, 671.0: 32, 672.0: 40, 674.0: 58,
      678: 78, 684: 90, 690: 86, 705: 84, 720: 80, 760: 70, 800: 60
    });
  }

  function antliaTribandLpFilter() {
    return pctCurve({
      400: 0, 410: 82, 420: 90, 430: 94, 434: 76, 435.2: 58, 435.8: 42, 436.4: 50, 438: 68, 442: 88,
      450: 95, 470: 95, 485: 94, 500: 93, 512: 92, 520: 94, 530: 94, 540: 90, 544.8: 64, 545.5: 46,
      546.1: 34, 546.7: 46, 548: 66, 552: 86, 560: 94, 570: 95, 575: 94, 576.7: 80, 577.5: 66,
      578.3: 60, 579.1: 64, 580.0: 74, 582: 86, 586: 80, 587.5: 54, 588.3: 38, 589.0: 28,
      589.6: 28, 590.2: 34, 591.0: 44, 592.0: 56, 594: 74, 598: 88, 606: 94, 620: 95, 640: 94,
      656: 94, 666: 92, 669.0: 74, 670.0: 55, 671.0: 46, 672.0: 54, 674.0: 66, 678: 80,
      684: 88, 690: 80, 700: 72, 715: 80, 735: 74, 760: 66, 800: 54
    });
  }

  function grid() {
    const min = state.advanced.extendRange ? 380 : 400;
    const max = state.advanced.extendRange ? 850 : 720;
    return rangeGrid(min, max);
  }

  function rangeGrid(min, max) {
    const out = [];
    for (let nm = min; nm <= max; nm += 0.25) out.push(Number(nm.toFixed(2)));
    return out;
  }

  function getMode() { return MODES.find((m) => m.id === state.mode); }
  function getCamera() { return CAMERAS.find((c) => c.id === state.camera); }
  function getFilter() { return FILTER_SETS.find((f) => f.id === state.filter); }
  function getAdditionalFilter() { return ADDITIONAL_FILTERS.find((f) => f.id === state.additionalFilter) || ADDITIONAL_FILTERS[0]; }
  function getTarget() { return TARGETS.find((t) => t.id === state.target); }
  function getLpPreset() { return LP_PRESETS.find((p) => p.id === state.lp); }

  function curveProvenance(item, kind) {
    if (!item) return "relative model";
    const text = `${item.name || ""} ${item.note || ""}`.toLowerCase();
    if (item.dataQuality) return item.dataQuality;
    if (item.id === "no_filter") return "generic clear-window model";
    if (kind === "camera") return "manufacturer-published QE curve, digitized approximation";
    if (text.includes("generic")) return "generic relative model";
    if (text.includes("compact") || text.includes("approximation") || text.includes("planning curve") || text.includes("provisional")) {
      return "compact educational approximation";
    }
    if (text.includes("imported") || text.includes("dense") || text.includes("zwo") || text.includes("optolong") || text.includes("astronomik") || text.includes("chroma") || text.includes("baader") || text.includes("antlia")) {
      return "manufacturer-published transmission curve, digitized approximation";
    }
    return "relative educational model";
  }

  function channelList(mode, camera, filter) {
    if (mode.id === "broadband_mono") return ["l", "r", "g", "b"];
    if (mode.id === "narrowband_mono") return ["ha", "oiii", "sii"];
    if (camera.type === "osc") return ["r", "g", "b"];
    return Object.keys(filter.channels);
  }

  function cameraResponse(camera, nm, channel) {
    if (camera.type === "mono") return smoothControlPointValue(camera.qeCurve, nm);
    const curves = camera.bayerCurves || CAMERAS[0].bayerCurves;
    if (channel && curves[channel]) return smoothControlPointValue(curves[channel], nm);
    return smoothControlPointValue(camera.qeCurve, nm);
  }

  function filterResponse(filter, nm, channel) {
    const shift = Number(state.advanced.centerShift) || 0;
    const scale = (Number(state.advanced.transmissionScale) || 100) / 100;
    const shifted = nm - shift;
    const curve = filter.channels[channel] || filter.channels.combined || averageCurves(filter.channels);
    return clamp(controlPointValue(curve, shifted) * scale, 0, 1);
  }

  function effectiveFilterResponse(filter, nm, channels) {
    const primary = filter.channels.combined
      ? filterResponse(filter, nm, "combined")
      : Math.max(...channels.map((ch) => filterResponse(filter, nm, filter.channels[ch] ? ch : "combined")), 0);
    return primary * additionalFilterResponse(filter, nm);
  }

  function additionalFilterResponse(primaryFilter, nm) {
    const additional = getAdditionalFilter();
    if (additional.id === "none" || primaryFilter.includesUvIrBlocking) return 1;
    return controlPointValue(additional.curve, nm);
  }

  function effectiveChannelResponse(filter, nm, channel) {
    const primaryChannel = filter.channels[channel] ? channel : "combined";
    return filterResponse(filter, nm, primaryChannel) * additionalFilterResponse(filter, nm);
  }

  function averageCurves(channels) {
    const out = {};
    grid().forEach((nm) => {
      const values = Object.values(channels).map((c) => controlPointValue(c, nm));
      out[nm] = values.reduce((a, b) => a + b, 0) / Math.max(values.length, 1);
    });
    return out;
  }

  function targetSpectrum(target, nm) {
    if (target.kind === "line") {
      let value = target.continuum || 0;
      SPECTRAL_LINES.forEach((line) => {
        const strength = target.lines[line.id] || 0;
        if (strength) value += strength * Math.exp(-0.5 * Math.pow((nm - line.nm) / 1.25, 2));
      });
      return value;
    }
    const center = target.temp > 7000 ? 455 : target.temp > 6000 ? 520 : 610;
    const width = target.temp > 7000 ? 170 : 210;
    let value = 0.2 + 0.8 * Math.exp(-0.5 * Math.pow((nm - center) / width, 2));
    value += (target.blueBias || 0) * Math.exp(-0.5 * Math.pow((nm - 440) / 70, 2));
    value += (target.redBias || 0) * Math.exp(-0.5 * Math.pow((nm - 660) / 80, 2));
    return value;
  }

  function skySpectrum(nm, bortle = state.bortle) {
    const preset = getLpPreset();
    const mix = preset.id === "custom" ? customMixAsUnit() : preset.mix;
    return skySpectrumFromMix(nm, mix, bortle);
  }

  function skySpectrumFromMix(nm, mix, bortle = state.bortle) {
    const bortleScale = Math.pow(1.55, bortle - 4);
    const moon = 1 + (Number(state.advanced.moonPhase) || 0) / 130;
    const haze = 1 + (Number(state.advanced.haze) || 0) / 180;
    let value = 0;
    value += (mix.natural || 0) * (0.22 + 0.20 * Math.exp(-0.5 * Math.pow((nm - 558) / 80, 2)) + 0.18 * Math.exp(-0.5 * Math.pow((nm - 630) / 120, 2)));
    value += (mix.warmLed || 0) * (0.18 + 0.82 * Math.exp(-0.5 * Math.pow((nm - 610) / 115, 2)));
    value += (mix.coolLed || 0) * (0.28 + 0.85 * Math.exp(-0.5 * Math.pow((nm - 455) / 42, 2)) + 0.45 * Math.exp(-0.5 * Math.pow((nm - 565) / 120, 2)));
    value += (mix.sodium || 0) * (1.5 * Math.exp(-0.5 * Math.pow((nm - 589) / 2.2, 2)) + 0.35 * Math.exp(-0.5 * Math.pow((nm - 570) / 14, 2)));
    value += (mix.lowSodium || 0) * 1.75 * Math.exp(-0.5 * Math.pow((nm - 589) / 1.1, 2));
    value += (mix.mercury || 0) * (0.7 * Math.exp(-0.5 * Math.pow((nm - 436) / 1.5, 2)) + 1.0 * Math.exp(-0.5 * Math.pow((nm - 546) / 1.8, 2)) + 0.42 * Math.exp(-0.5 * Math.pow((nm - 578) / 1.8, 2)));
    value += (mix.metal || 0) * (0.28 + 0.62 * Math.exp(-0.5 * Math.pow((nm - 520) / 90, 2)) + 0.36 * Math.exp(-0.5 * Math.pow((nm - 610) / 95, 2)));
    return value * bortleScale * moon * haze;
  }

  function customMixAsUnit() {
    const raw = state.advanced.customMix;
    const out = {};
    Object.keys(raw).forEach((key) => { out[key] = Number(raw[key]) / 100; });
    return out;
  }

  function normalize(series) {
    const max = Math.max(...series.map((p) => p.y), 1e-9);
    return series.map((p) => ({ ...p, y: p.y / max }));
  }

  function integrate(series) {
    let area = 0;
    for (let i = 1; i < series.length; i += 1) {
      const a = series[i - 1];
      const b = series[i];
      area += (b.x - a.x) * (Math.max(0, a.y) + Math.max(0, b.y)) / 2;
    }
    return area;
  }

  function averageSeries(series) {
    const span = Math.max(series[series.length - 1].x - series[0].x, 1e-6);
    return integrate(series) / span;
  }

  function compute() {
    const wavelengths = grid();
    const mode = getMode();
    let camera = getCamera();
    let filter = getFilter();
    const target = getTarget();

    if (!camera || camera.type !== mode.cameraType) camera = CAMERAS.find((c) => c.type === mode.cameraType);
    if (!filter || !mode.filterTypes.includes(filter.type)) filter = FILTER_SETS.find((f) => mode.filterTypes.includes(f.type));
    state.camera = camera.id;
    state.filter = filter.id;

    const channels = channelList(mode, camera, filter);
    const targetBase = wavelengths.map((nm) => ({ x: nm, y: targetSpectrum(target, nm) }));
    const skyBase = wavelengths.map((nm) => ({ x: nm, y: skySpectrum(nm) }));
    const selectedMix = getLpPreset().id === "custom" ? customMixAsUnit() : getLpPreset().mix;
    const naturalSkyBase = wavelengths.map((nm) => ({ x: nm, y: skySpectrumFromMix(nm, { natural: selectedMix.natural || 0 }, state.bortle) }));
    const lpOnlyBase = wavelengths.map((nm) => ({ x: nm, y: skySpectrumFromMix(nm, { ...selectedMix, natural: 0 }, state.bortle) }));
    const skyReference = wavelengths.map((nm) => ({ x: nm, y: skySpectrum(nm, 9) }));
    const qeEnvelope = { label: "Sensor QE envelope", color: "#f8f0c8", points: wavelengths.map((nm) => ({ x: nm, y: cameraResponse(camera, nm) })) };
    const cameraCurves = channels.map((ch) => ({ id: ch, label: channelLabel(ch), color: channelColor(ch), points: wavelengths.map((nm) => ({ x: nm, y: cameraResponse(camera, nm, ch) })) }));
    const filterCurves = channels.map((ch) => ({ id: ch, label: channelLabel(ch), color: channelColor(ch), points: wavelengths.map((nm) => ({ x: nm, y: filterResponse(filter, nm, filter.channels[ch] ? ch : "combined") })) }));
    const primaryFilterCurve = { label: "Primary imaging filter", color: "#65d7f0", points: wavelengths.map((nm) => ({ x: nm, y: filter.channels.combined ? filterResponse(filter, nm, "combined") : Math.max(...channels.map((ch) => filterResponse(filter, nm, filter.channels[ch] ? ch : "combined"))) })) };
    const additionalFilterCurve = { label: "Additional UV/IR cut", color: "#b994ff", points: wavelengths.map((nm) => ({ x: nm, y: additionalFilterResponse(filter, nm) })) };
    const activeFilterCurve = { label: "Effective transmission", color: "#65d7f0", points: wavelengths.map((nm) => ({ x: nm, y: effectiveFilterResponse(filter, nm, channels) })) };
    const combinedCurves = channels.map((ch) => {
      const points = wavelengths.map((nm) => {
        return { x: nm, y: effectiveChannelResponse(filter, nm, ch) * cameraResponse(camera, nm, ch) * channelSiteFraction(camera, ch) };
      });
      return { id: ch, label: `${channelLabel(ch)}${camera.type === "osc" ? ` • ${Math.round(channelSiteFraction(camera, ch) * 100)}% sites` : ""}`, color: channelColor(ch), points };
    });

    const signalCurves = channels.map((ch) => {
      const points = wavelengths.map((nm) => {
        return { x: nm, y: targetSpectrum(target, nm) * effectiveChannelResponse(filter, nm, ch) * cameraResponse(camera, nm, ch) * channelSiteFraction(camera, ch) };
      });
      return { id: ch, label: channelLabel(ch), color: channelColor(ch), points };
    });
    const backgroundCurves = channels.map((ch) => {
      const points = wavelengths.map((nm) => {
        return { x: nm, y: skySpectrum(nm) * effectiveChannelResponse(filter, nm, ch) * cameraResponse(camera, nm, ch) * channelSiteFraction(camera, ch) };
      });
      return { id: ch, label: channelLabel(ch), color: channelColor(ch), points };
    });
    const backgroundReferenceCurves = channels.map((ch) => {
      const points = wavelengths.map((nm) => {
        return { x: nm, y: skySpectrum(nm, 9) * effectiveChannelResponse(filter, nm, ch) * cameraResponse(camera, nm, ch) * channelSiteFraction(camera, ch) };
      });
      return { id: ch, label: channelLabel(ch), color: channelColor(ch), points };
    });
    const unfilteredSignalCurves = channels.map((ch) => ({
      id: ch,
      points: wavelengths.map((nm) => ({ x: nm, y: targetSpectrum(target, nm) * cameraResponse(camera, nm, ch) * channelSiteFraction(camera, ch) }))
    }));
    const unfilteredBackgroundCurves = channels.map((ch) => ({
      id: ch,
      points: wavelengths.map((nm) => ({ x: nm, y: skySpectrum(nm) * cameraResponse(camera, nm, ch) * channelSiteFraction(camera, ch) }))
    }));
    const filterTargetKept = integrate(wavelengths.map((nm) => ({ x: nm, y: targetSpectrum(target, nm) * effectiveFilterResponse(filter, nm, channels) })))
      / Math.max(integrate(targetBase), 1e-6);
    const filterSkyAdmitted = integrate(wavelengths.map((nm) => ({ x: nm, y: skySpectrum(nm) * effectiveFilterResponse(filter, nm, channels) })))
      / Math.max(integrate(skyBase), 1e-6);
    const skyFilterCurves = [
      { label: "Representative sky / LP spectrum", color: "#ffd16f", points: normalize(skyBase) },
      activeFilterCurve
    ];
    const idealBayerCurve = { label: "Ideal all-pixel response through filter", color: "#f8f0c8", points: wavelengths.map((nm) => ({ x: nm, y: effectiveFilterResponse(filter, nm, channels) * idealOscResponse(camera, nm) })) };
    const actualBayerCurve = { label: "Actual RGGB-weighted response", color: "#65d7f0", points: wavelengths.map((nm) => ({ x: nm, y: combinedCurves.reduce((sum, curve) => sum + controlPointFromSeries(curve.points, nm), 0) })) };
    const idealBayerTarget = wavelengths.map((nm) => ({ x: nm, y: targetSpectrum(target, nm) * effectiveFilterResponse(filter, nm, channels) * idealOscResponse(camera, nm) }));
    const totalSignal = sumCurves(signalCurves, wavelengths);
    const totalBackground = sumCurves(backgroundCurves, wavelengths);
    const efficiency = wavelengths.map((nm, i) => ({ x: nm, y: totalSignal[i].y / (totalBackground[i].y + 0.025 * Math.max(...totalBackground.map((p) => p.y), 1e-6)) }));
    const integratedSourceCurves = [
      { label: "Incoming target", color: "#f0a12a", points: targetBase },
      { label: "Incoming sky / LP", color: "#ffd16f", points: skyBase }
    ];
    const integratedCaptureCurves = [
      { label: "Incoming target", color: "rgba(240,161,42,0.72)", points: targetBase },
      { label: "Incoming sky / LP", color: "rgba(255,209,111,0.62)", points: skyBase },
      { label: "Captured target signal", color: "#65d7f0", points: totalSignal },
      { label: "Captured sky background", color: "#f0a12a", points: totalBackground }
    ];
    const rejectedLightCurves = [
      { label: "Rejected target signal", color: "#ff756c", points: wavelengths.map((nm) => ({ x: nm, y: targetSpectrum(target, nm) * (1 - effectiveFilterResponse(filter, nm, channels)) })) },
      { label: "Rejected sky / LP", color: "#ffd16f", points: wavelengths.map((nm) => ({ x: nm, y: skySpectrum(nm) * (1 - effectiveFilterResponse(filter, nm, channels)) })) }
    ];
    const metrics = buildMetrics(channels, signalCurves, backgroundCurves, filterCurves, cameraCurves, efficiency, unfilteredSignalCurves, unfilteredBackgroundCurves, {
      filterTargetKept,
      filterSkyAdmitted,
      bayerUtilization: camera.type === "osc" ? integrate(totalSignal) / Math.max(integrate(idealBayerTarget), 1e-6) : 1
    });
    const plotScales = {
      sky: Math.max(...skyReference.map((p) => p.y), 1),
      background: Math.max(...sumCurves(backgroundReferenceCurves, wavelengths).map((p) => p.y), 1)
    };
    return { wavelengths, mode, camera, filter, additionalFilter: getAdditionalFilter(), target, channels, targetBase, skyBase, naturalSkyBase, lpOnlyBase, qeEnvelope, primaryFilterCurve, additionalFilterCurve, activeFilterCurve, cameraCurves, filterCurves, combinedCurves, signalCurves, backgroundCurves, integratedSourceCurves, integratedCaptureCurves, rejectedLightCurves, skyFilterCurves, idealBayerCurve, actualBayerCurve, efficiency, metrics, plotScales };
  }

  function sumCurves(curves, wavelengths) {
    return wavelengths.map((nm, i) => ({ x: nm, y: curves.reduce((sum, c) => sum + c.points[i].y, 0) }));
  }

  function channelLabel(ch) {
    return { l: "L", r: "R / Ha", g: "G / OIII", b: "B / OIII", ha: "Ha", oiii: "OIII", sii: "SII", combined: "Combined" }[ch] || ch.toUpperCase();
  }

  function channelColor(ch) {
    return { l: "#f8f0c8", r: "#ff756c", g: "#7fe0b6", b: "#6fb3ff", ha: "#ff756c", oiii: "#65d7f0", sii: "#f0a12a", combined: "#f0a12a" }[ch] || "#ffffff";
  }

  function channelSiteFraction(camera, channel) {
    if (camera.type !== "osc") return 1;
    return { r: 0.25, g: 0.50, b: 0.25 }[channel] || 0;
  }

  function idealOscResponse(camera, nm) {
    if (camera.type !== "osc") return cameraResponse(camera, nm);
    return Math.max(cameraResponse(camera, nm, "r"), cameraResponse(camera, nm, "g"), cameraResponse(camera, nm, "b"));
  }

  function buildMetrics(channels, signalCurves, backgroundCurves, filterCurves, cameraCurves, efficiency, unfilteredSignalCurves, unfilteredBackgroundCurves, comparisons) {
    const channelStats = channels.map((ch, i) => {
      const signal = integrate(signalCurves[i].points);
      const sky = integrate(backgroundCurves[i].points);
      const filterAvg = averageSeries(filterCurves[i].points);
      const cameraAvg = averageSeries(cameraCurves[i].points);
      return { id: ch, label: channelLabel(ch), signal, sky, ratio: signal / Math.max(sky, 1e-6), filterAvg, cameraAvg };
    });
    const maxSignal = Math.max(...channelStats.map((c) => c.signal), 1e-6);
    const maxSky = Math.max(...channelStats.map((c) => c.sky), 1e-6);
    channelStats.forEach((c) => {
      c.signalNorm = c.signal / maxSignal;
      c.skyNorm = c.sky / maxSky;
      c.weight = maxSignal / Math.max(c.signal, maxSignal * 0.08);
    });
    const totalSignal = channelStats.reduce((s, c) => s + c.signal, 0);
    const totalSky = channelStats.reduce((s, c) => s + c.sky, 0);
    const unfilteredSignal = unfilteredSignalCurves.reduce((sum, curve) => sum + integrate(curve.points), 0);
    const unfilteredSky = unfilteredBackgroundCurves.reduce((sum, curve) => sum + integrate(curve.points), 0);
    const weakest = [...channelStats].sort((a, b) => a.signalNorm - b.signalNorm)[0];
    const strongest = [...channelStats].sort((a, b) => b.signalNorm - a.signalNorm)[0];
    const filteredRatio = totalSignal / Math.max(totalSky, 1e-6);
    const unfilteredRatio = unfilteredSignal / Math.max(unfilteredSky, 1e-6);
    return {
      channelStats,
      targetIndex: totalSignal,
      skyIndex: totalSky,
      sbIndex: filteredRatio,
      rejectionScore: 1 / Math.max(totalSky / Math.max(totalSignal, 1e-6), 0.03),
      efficiencyIndex: integrate(normalize(efficiency)),
      targetRetention: clamp(totalSignal / Math.max(unfilteredSignal, 1e-6), 0, 1),
      skyBlocked: clamp(1 - totalSky / Math.max(unfilteredSky, 1e-6), 0, 1),
      contrastGain: filteredRatio / Math.max(unfilteredRatio, 1e-6),
      strongestShare: totalSignal ? strongest.signal / totalSignal : 0,
      filterTargetKept: comparisons.filterTargetKept,
      filterSkyAdmitted: comparisons.filterSkyAdmitted,
      bayerUtilization: comparisons.bayerUtilization,
      bayerCollectionPenalty: 1 / Math.max(comparisons.bayerUtilization, 1e-6),
      weakest,
      strongest
    };
  }

  function render() {
    const result = compute();
    syncSelectValues();
    renderRibbon(result);
    if (state.view === "story") renderStory(result);
    else renderOverlay(result);
    renderMetrics(result);
    renderInterpretation(result);
    renderTabs(result);
    syncViewControls();
    $("activeSummary").textContent = `${result.camera.name} • ${result.filter.name}${cleanupIsActive(result) ? " • Generic UV/IR Cut" : ""}`;
    $("storyTitle").textContent = `${result.mode.label} Response`;
    $("targetBadge").innerHTML = `<b>${result.target.name}</b><span>${result.target.kind === "line" ? "Line-dominated source: Hβ, OIII, Hα, SII" : "Broadband continuum source with color shaped by sky and capture response"}</span><small>Try this → choose another source and watch the spectral shape change.</small>`;
  }

  function renderRibbon(result) {
    const strength = result.metrics.strongest.label;
    $("storyRibbon").innerHTML = [
      ["Source", `${result.target.name}: ${result.target.kind === "line" ? "line-dominated target light" : "broadband continuum"}`],
      ["Sky", `Bortle ${state.bortle} ${getLpPreset().name}: modeled background arriving with the target`],
      ["Capture", `${result.mode.label}: ${result.filter.name}${cleanupIsActive(result) ? " + Generic UV/IR Cut" : ""} with ${result.camera.name}`],
      ["Result", `${strength} leads; ${result.metrics.weakest.label} needs the most care`]
    ].map(([title, text], i) => `<article class="ribbon-card"><b>${i + 1}</b><div><span>${title}</span><p>${text}</p></div></article>`).join("");
  }

  function renderStory(result) {
    const cleanupWavelengths = cleanupIsActive(result) ? rangeGrid(380, 850) : result.wavelengths;
    const cleanupTransmissionCurve = {
      label: "Generic UV/IR Cut",
      color: "#b994ff",
      points: cleanupWavelengths.map((nm) => ({ x: nm, y: additionalFilterResponse(result.filter, nm) }))
    };
    const filterWindowCurves = filterCurvesForStory(result, cleanupTransmissionCurve);
    const cleanupOnlyPrimary = state.mode === "osc_broadband" && result.filter.id === "no_filter" && cleanupIsActive(result);
    const targetRow = {
      id: "target", kicker: "ACT 1 · SOURCE STACK", title: "Target Signal",
      text: "This is the useful light from the selected object before the sky or camera system affects it.",
      hint: "Try this → choose another source and watch the spectral shape change.",
      takeaway: result.target.kind === "line" ? "Emission targets are dominated by narrow spectral lines. H-alpha and OIII often drive much of the usable signal." : "Broadband targets emit across a wide wavelength range, so filters affect them differently from emission nebulae.",
      curves: [{ label: result.target.name, color: "#f0a12a", points: result.targetBase }]
    };
    const skyRow = {
      id: "sky", yMax: result.plotScales.sky, yUnit: "rel sky", kicker: "ACT 1 · SOURCE STACK", title: "Sky + Light Pollution",
      text: `This is the unwanted background arriving with the target light. ${lpDescription(getLpPreset())}`,
      hint: "Try this → change Bortle and watch the background rise.",
      takeaway: "Bortle controls how much background is present. The light-pollution preset controls where that background lives spectrally.",
      curves: [{ label: `${getLpPreset().name}, Bortle ${state.bortle}`, color: "#ffd16f", points: result.skyBase }]
    };
    const filterRow = {
      id: "filterGate", yMax: 1, kicker: "ACT 2 · CAPTURE STACK", title: cleanupOnlyPrimary ? "UV/IR Cleanup Filter" : "Filter Window",
      text: `The filter decides which wavelengths are allowed to reach the camera. ${filterDescription(result)}`,
      hint: "Try this → choose another filter and compare which windows stay open.",
      visual: cleanupIsActive(result) ? `<div class="cleanup-band"><span>Blocked UV</span><strong>Passed visible band</strong><span>Blocked IR</span></div>` : state.mode === "osc_narrowband" ? `<div class="window-labels"><span class="gb-window">OIII / Hβ window</span><span class="red-window">Hα window</span></div>` : "",
      takeaway: filterTakeaway(result), note: cleanupIsActive(result) ? "This cleanup-specific plot expands to 380–850 nm so both cutoff transitions remain visible." : "", wavelengths: cleanupOnlyPrimary ? cleanupWavelengths : result.wavelengths, curves: filterWindowCurves
    };
    const cameraRow = {
      id: result.camera.type === "osc" ? "bayer" : "qe", yMax: 1, kicker: "ACT 2 · CAPTURE STACK", title: "Camera / Bayer Response",
      text: "The sensor does not respond equally to all wavelengths.",
      hint: result.camera.type === "osc" ? "Try this → switch OSC cameras and watch the RGB curves move." : "Try this → switch mono cameras and compare QE at Hα, OIII, and SII.",
      visual: result.camera.type === "osc" ? `<div class="mini-bayer-badge" aria-label="RGGB Bayer pattern"><i>R</i><i>G</i><i>G</i><i>B</i><span>RGGB sensor mosaic</span></div>` : "",
      takeaway: result.camera.type === "osc" ? "An OSC camera routes wavelengths into red, green, and blue pixel responses. This becomes especially important with dual-band filters." : "A mono camera uses every pixel at each wavelength, but its QE still changes across the spectrum.",
      curves: result.camera.type === "osc" ? result.cameraCurves : [result.qeEnvelope]
    };
    const systemWindowRow = {
      id: "combined", yMax: 1, kicker: "ACT 2 · CAPTURE STACK", title: "System Window",
      text: "This is the combined filter and camera response before target or sky brightness is applied.",
      hint: "Try this → compare this with the filter and camera plots above.",
      takeaway: state.mode === "narrowband_mono" ? "Narrow emission lines aligned with narrow filter windows reject broad sky glow and create cleaner contrast." : "The system window shows where the complete capture stack can collect light efficiently.",
      note: "This plot uses a fixed 0–1 response scale, so lower or flatter curves represent lower modeled throughput rather than auto-normalized peaks.",
      curves: result.combinedCurves
    };
    const totalSignalCurve = { label: "Total captured target signal", color: "#7fe0b6", points: sumCurves(result.signalCurves, result.wavelengths) };
    const totalBackgroundCurve = { label: "Total captured background leakage", color: "#ff756c", points: sumCurves(result.backgroundCurves, result.wavelengths) };
    const signalRow = {
      id: "signal", kicker: "ACT 3 · FINAL CAPTURE", title: "Captured Target Signal",
      text: "This is the useful target light that survives the complete capture path.",
      hint: "Try this → change the target and watch which useful peaks survive.",
      takeaway: "This total curve shows the retained useful signal. The channel detail below shows how individual channels or lines contribute.", curves: [totalSignalCurve]
    };
    const backgroundRow = {
      id: "background", yMax: result.plotScales.background, yUnit: "rel sky", kicker: "ACT 3 · FINAL CAPTURE", title: "Captured Background Leakage",
      text: "This is the unwanted sky and light-pollution background that survives the same path.",
      hint: "Try this → raise Bortle and watch background leakage grow.",
      takeaway: "A strong passband is useful only when it keeps more target signal than sky background. The channel detail below shows where leakage lands.", curves: [totalBackgroundCurve]
    };
    const signalChannels = { id: "signalChannels", title: "Captured Target by Channel / Line", text: "See how the total useful signal is distributed among the available channels or emission lines.", curves: result.signalCurves };
    const backgroundChannels = { id: "backgroundChannels", yMax: result.plotScales.background, yUnit: "rel sky", title: "Captured Background by Channel / Line", text: "See which channels or lines admit the most modeled background.", curves: result.backgroundCurves };
    const sourceOverlay = { id: "sourceOverlay", title: "Target vs Sky / LP Overlap", text: "See where useful target light and unwanted background occupy the same wavelengths.", curves: result.integratedSourceCurves };
    const skyComponents = { id: "skyComponents", yMax: result.plotScales.sky, yUnit: "rel sky", title: "Natural Sky vs Human-Made Light Pollution", text: "Natural sky glow forms a broad baseline. The selected lighting preset adds its own continuum and lamp-line fingerprint.", takeaway: "Bortle scales the total modeled background. The LP preset changes the spectral shape and relative lamp features.", curves: [{ label: "Natural sky component", color: "#65d7f0", points: result.naturalSkyBase }, { label: "Human-made LP component", color: "#ffd16f", points: result.lpOnlyBase }] };
    const skyFilter = { id: "skyfilter", yMax: 1, title: "Filter vs Sky / LP", text: "See whether the filter closes where the selected sky is bright.", stats: [["Target light kept", result.metrics.filterTargetKept, "#65d7f0"], ["Sky background admitted", result.metrics.filterSkyAdmitted, "#ffd16f"]], curves: result.skyFilterCurves };
    const extendedQeCurve = { label: "No-filter camera response", color: "#f8f0c8", points: cleanupWavelengths.map((nm) => ({ x: nm, y: cameraResponse(result.camera, nm) })) };
    const cleanedSensorCurve = { label: "Final cleaned sensor response", color: "#7fe0b6", points: cleanupWavelengths.map((nm) => ({ x: nm, y: cameraResponse(result.camera, nm) * additionalFilterResponse(result.filter, nm) })) };
    const cleanupView = { id: "cleanupView", yMax: 1, title: "UV/IR Cleanup View", text: "Compare the camera's no-filter response with the cleanup window and the final cleaned visible-band response.", takeaway: "A UV/IR cut filter is not mainly a speed or light-pollution filter. It removes wavelengths that may not focus cleanly or contribute useful visible RGB color.", wavelengths: cleanupWavelengths, curves: [extendedQeCurve, cleanupTransmissionCurve, cleanedSensorCurve] };
    const filterDeepRows = cleanupOnlyPrimary ? [cleanupView] : [skyFilter];
    const efficiencyRow = { id: "efficiency", help: 5, title: "Useful Signal Advantage", text: "This compares captured target signal against captured background at each wavelength. Higher regions mean the model sees more useful target light relative to unwanted sky leakage.", hint: "Try this → read it as a vulnerability map, not an exposure calculator.", note: "Relative educational index, not calibrated SNR. It highlights favorable and vulnerable wavelength regions rather than predicting a final image.", curves: [{ label: "Relative signal advantage", color: "#b994ff", points: result.efficiency }] };

    $("storyStack").innerHTML = `
      ${storyStepperHtml(result)}
      ${storyStepHtml(1, "target-step", "Target", "First, identify the useful astronomical light.", plotRowHtml(targetRow, result))}
      ${storyStepHtml(2, "sky-step", "Sky", "Now isolate and explain the unwanted light arriving with it.", plotRowHtml(skyRow, result), deepenHtml("Sky context: source overlap and LP components", [skyComponents, sourceOverlay], result))}
      ${storyStepHtml(3, "filter-step", cleanupOnlyPrimary ? "UV/IR Filter" : "Filter", "See the spectral gates selected by the filter.", plotRowHtml(filterRow, result), deepenHtml(cleanupOnlyPrimary ? "UV/IR cleanup context" : "Filter and sky context", filterDeepRows, result))}
      ${storyStepHtml(4, "camera-step", "Camera", "See what the sensor and Bayer matrix can detect.", plotRowHtml(cameraRow, result))}
      ${state.mode === "osc_narrowband"
        ? storyStepHtml(5, "sampling-step", "OSC Sampling", "See how dual-band wavelengths route into the Bayer matrix, then into the resulting system window.", `${oscSamplingHtml(result)}${plotRowHtml(systemWindowRow, result)}`)
        : storyStepHtml(5, "system-step", "System Window", "Combine the capture layers only after understanding them separately.", plotRowHtml(systemWindowRow, result))}
      ${storyStepHtml(6, "captured-step", "Captured", "Keep useful signal and unwanted leakage visually separate.", `<div class="captured-pair">${plotRowHtml(signalRow, result)}${plotRowHtml(backgroundRow, result)}</div>`, deepenHtml("Captured channel detail", [signalChannels, backgroundChannels, efficiencyRow], result))}
      ${storyStepHtml(7, "result-step", "Result", "Tie the source, sky, filter, and camera behavior into a practical conclusion.", practicalResultHtml(result))}
    `;
    bindSectionHelp();
    setupStoryStepper();
    attachPlotTooltips(result);
  }

  function storyStepperHtml(result) {
    const fifth = state.mode === "osc_narrowband" ? ["sampling-step", "OSC Sampling"] : ["system-step", "System Window"];
    const steps = [["target-step", "Target"], ["sky-step", "Sky"], ["filter-step", "Filter"], ["camera-step", "Camera"], fifth, ["captured-step", "Captured"], ["result-step", "Result"]];
    return `<nav class="story-stepper" aria-label="Photon story steps">${steps.map(([id, label], i) => `<button type="button" data-story-target="${id}" class="${i === 0 ? "active" : ""}"><b>${i + 1}</b><span>${label}</span></button>`).join("")}</nav>`;
  }

  function storyStepHtml(number, id, title, subtitle, content, deep = "") {
    const help = number <= 2 ? 1 : number <= 4 ? 2 : number === 5 ? (id === "sampling-step" ? 4 : 2) : number === 6 ? 3 : 5;
    return `<section id="${id}" class="storyboard-step" data-story-step="${id}">
      <header><div class="story-step-number">${number}</div><div><span class="eyebrow">Photon Story</span><h2>${title}</h2><p>${subtitle}</p></div><button type="button" class="section-help" data-help-step="${help}" aria-label="Learn about ${title}">?</button></header>
      ${content}${deep}
    </section>`;
  }

  function filterCurvesForStory(result, cleanupTransmissionCurve) {
    if (state.mode === "osc_broadband" && result.filter.id === "no_filter" && cleanupIsActive(result)) return [cleanupTransmissionCurve];
    if (result.filter.type === "lrgb" || result.filter.type === "sho") return result.filterCurves;
    return [result.activeFilterCurve];
  }

  function filterTakeaway(result) {
    if (cleanupIsActive(result)) return "This cleanup filter slightly reduces total admitted light compared with no filter, but it can improve practical image quality by blocking out-of-band UV/IR leakage.";
    if (state.mode === "osc_narrowband") return "This filter passes the blue-green OIII/H-beta region and the red H-alpha region while suppressing much of the broadband sky glow.";
    if (state.mode === "narrowband_mono") return "Each narrowband window isolates a small emission-line region while rejecting most broadband sky glow.";
    if (state.mode === "osc_lp") return "A broadband LP filter attempts to reduce selected lamp features while preserving much of the target continuum.";
    return result.filter.id === "no_filter" ? "With no active filter, the camera receives the broadest target and sky spectrum." : "The selected filter shapes which parts of the target and sky can reach the detector.";
  }

  function lpDescription(preset) {
    const descriptions = {
      rural: "This preset is mostly natural airglow with only weak human-made lighting features.",
      mixed_suburban: "This preset blends LED continuum with sodium and mercury features typical of many suburban skies.",
      warm_led: "This preset emphasizes broad warm LED continuum, which is harder to reject cleanly than a few narrow lamp lines.",
      cool_led: "This preset adds stronger blue-green LED structure, often making OIII and blue broadband data more vulnerable.",
      sodium_heavy: "This preset emphasizes sodium lamp features, including the familiar yellow sodium region.",
      sodium_mercury_mix: "This preset combines older sodium vapor and mercury-vapor line features.",
      mercury_old: "This preset emphasizes older mercury-vapor street-light lines.",
      commercial: "This preset mixes cool LED, metal-halide, and parking-lot style lighting features.",
      custom: "This preset uses the custom slider mix from the Advanced section."
    };
    return descriptions[preset.id] || "This preset is a relative educational sky model.";
  }

  function filterDescription(result) {
    if (result.filter.id === "no_filter") return "No strong imaging filter is active, so the model leaves the camera's broad response mostly open.";
    if (result.filter.type === "dualband") return "This dual-band filter opens selected emission-line regions, usually OIII/H-beta and H-alpha.";
    if (result.filter.type === "triband") return "This multi-band filter opens several selected emission or hybrid color regions while suppressing much of the continuum.";
    if (result.filter.type === "lp_broadband") return "This broadband LP filter tries to reduce selected lamp features while keeping much of the visible continuum available.";
    if (result.filter.type === "lrgb") return "This LRGB set divides broadband light into luminance, red, green, and blue channels.";
    if (result.filter.type === "sho") return "This SHO set isolates narrow Ha, OIII, and SII emission-line windows.";
    return "This filter is modeled as a relative transmission window.";
  }

  function cleanupIsActive(result) {
    return result.additionalFilter.id === "generic_uv_ir_cut" && !result.filter.includesUvIrBlocking;
  }

  function plotRowHtml(row, result) {
    return `<article class="plot-row role-${row.id}${row.hero ? " hero-plot-row" : ""}">
      <div class="row-copy">
        ${row.kicker ? `<div class="row-kicker">${row.kicker}</div>` : ""}
        <div class="row-title-line"><h3>${row.title}</h3>${row.help !== undefined ? `<button type="button" class="section-help" data-help-step="${row.help}" aria-label="Learn about ${row.title}">?</button>` : ""}</div>
        <p>${row.text}</p>
        ${row.hint ? `<p class="plot-hint">${row.hint}</p>` : ""}
        <div class="row-legend">${row.curves.map((c) => `<span class="legend-chip" style="--chip-color:${c.color}">${c.label}</span>`).join("")}</div>
        ${row.visual || ""}
        ${row.takeaway ? `<div class="practical-takeaway compact"><b>Practical takeaway</b><p>${row.takeaway}</p></div>` : ""}
        ${row.note ? `<div class="context-note">${row.note}</div>` : ""}
        ${row.stats ? `<div class="plot-stat-bars">${row.stats.map(([label, value, color]) => `<div><span>${label}<b>${formatPct(value)}</b></span><i><em style="width:${clamp(value, 0, 1) * 100}%;background:${color}"></em></i></div>`).join("")}</div>` : ""}
      </div>
      <div class="plot-wrap">${renderSvg(row.curves, row.wavelengths || result.wavelengths, row.id, row.yMax, row.yUnit)}</div>
    </article>`;
  }

  function deepenHtml(title, rows, result) {
    return `<section class="supporting-act"><header><h3>${title}</h3><span>Supporting story detail</span></header><div class="deep-rows">${rows.map((row) => plotRowHtml(row, result)).join("")}</div></section>`;
  }

  function oscSamplingHtml(result) {
    const utilization = clamp(result.metrics.bayerUtilization, 0, 1);
    return `<section class="osc-sampling-bridge">
      <header><div><span class="eyebrow">Special Teaching Section</span><h2>How OSC Samples Narrowband Light</h2><p>A dual-band filter passes spectral regions, but the Bayer matrix decides which pixels can actually collect them.</p></div><button type="button" class="section-help" data-help-step="4" aria-label="Learn how OSC samples narrowband light">?</button></header>
      <div class="osc-routing-visual">
        <div class="routing-passbands">
          <div class="passband gb-pass"><b>Hβ / OIII</b><span>486–501 nm</span><i>mostly G + B response</i></div>
          <div class="routing-arrow">→</div>
          <div class="routing-bayer-grid"><i>R</i><i>G</i><i>G</i><i>B</i></div>
          <div class="routing-arrow">←</div>
          <div class="passband red-pass"><b>Hα</b><span>656.3 nm</span><i>mostly red response</i></div>
        </div>
        <div class="sampling-comparison simple"><article><span>Ideal all-pixel capture</span><strong>Every pixel could contribute</strong><p>At the useful wavelength.</p></article><article><span>Actual OSC Bayer sampling</span><strong>Matching color sites contribute most</strong><p>At each selected wavelength.</p></article></div>
      </div>
      <p class="osc-explanation">A dual-band filter does not create separate Ha and OIII files. It passes selected wavelength regions. The OSC camera's Bayer matrix then determines how those wavelengths are sampled by red, green, and blue pixels. H-alpha usually lands mostly in red pixels. OIII and H-beta are shared mainly through green and blue response.</p>
      <div class="sampling-meaning">
        <div><span>Modeled OSC sampling comparison</span><strong>${formatPct(utilization)}</strong><i><em style="width:${utilization * 100}%"></em></i></div>
        <p><b>What this means:</b> compared with an idealized mono-like sensor where every pixel can use the strongest color response at each useful wavelength, the modeled RGGB sensor collects about ${formatPct(utilization)} as much target signal through this filter. It does not mean that ${formatPct(1 - utilization)} of every real exposure is simply lost.</p>
      </div>
      <div class="practical-takeaway"><b>Practical takeaway</b><p>OSC dual-band imaging can be very effective, but it does not collect Ha and OIII the same way a mono camera with separate filters does. Channel balance, exposure weighting, and processing strategy matter.</p></div>
      <div class="context-note">This is a relative educational comparison. It shows why OSC dual-band sampling differs from mono narrowband capture; it is not a complete exposure-time or SNR prediction.</div>
      ${deepenHtml("OSC sampling detail", [{ id: "bayerReality", yMax: 1, title: "Ideal All-Pixel Capture vs Actual OSC Bayer Sampling", text: "The richer spectral comparison behind the simplified sampling summary.", curves: [result.idealBayerCurve, result.actualBayerCurve] }], result)}
    </section>`;
  }

  function practicalResultHtml(result) {
    const m = result.metrics;
    const t = evaluationTakeaways(result);
    const greenNote = state.mode === "osc_narrowband" && m.strongest.id === "g"
      ? `<div class="result-context"><b>Why G / OIII leads here</b><p>In this selected educational target model, OIII plus green Bayer sampling produces the strongest modeled captured channel. Many real emission-nebula datasets still appear red-dominant when H-alpha is intrinsically stronger, OIII is weaker, or processing emphasizes Ha. Target line balance strongly affects whether Ha or OIII dominates.</p></div>` : "";
    return `<section class="evaluation-takeaways">
      <div class="evaluation-heading"><span class="eyebrow">Evaluation Takeaways</span><h3>What This Run Says</h3><p>What this run says about the target, the sky, and the selected capture system.</p><p class="plot-hint">Try this → change one setup choice, then see which takeaway changes first.</p></div>
      <article class="bottom-line-card"><span>Bottom line</span><strong>${t.verdict}</strong></article>
      <div class="takeaway-grid">
        ${takeawayCard("TARGET VS SKY", t.targetSky.status, t.targetSky.text, "source")}
        ${takeawayCard("CAPTURE SYSTEM", t.capture.status, t.capture.text, "capture")}
        ${takeawayCard("WEAK LINK", t.weak.status, t.weak.text, "weak")}
        ${takeawayCard("PRACTICAL STRATEGY", t.strategy.status, t.strategy.text, "strategy")}
      </div>
      <article class="main-driver-card"><span>Main driver</span><p>${t.driver}</p></article>
    </section>${greenNote}`;
  }

  function takeawayCard(title, status, text, tone) {
    return `<article class="takeaway-card tone-${tone}"><span>${title}</span><strong>${status}</strong><p>${text}</p></article>`;
  }

  function evaluationTakeaways(result) {
    const mode = state.mode;
    const target = result.target;
    const targetKind = target.kind;
    const lp = getLpPreset().name;
    const filter = result.filter.name;
    const camera = result.camera.name;
    const m = result.metrics;
    const fit = practicalFit(m);
    const brightSky = state.bortle >= 7;
    const moderateSky = state.bortle >= 5 && state.bortle <= 6;
    const ledLike = ["mixed_suburban", "cool_led", "warm_led", "commercial"].includes(state.lp);
    const cleanup = cleanupIsActive(result);
    const weakLabel = evaluationChannelLabel(m.weakest);
    const strongLabel = evaluationChannelLabel(m.strongest);

    if (mode === "osc_narrowband") {
      return {
        verdict: `This is a useful emission-nebula setup for Bortle ${state.bortle} ${lp.toLowerCase()}, but the final result will be shaped by OSC Bayer sampling and ${weakLabel} handling.`,
        targetSky: {
          status: targetKind === "line" ? "Good spectral separation" : "Mixed separation",
          text: targetKind === "line"
            ? `The selected target is line-dominated, with useful modeled signal concentrated around Hβ/OIII and Hα. The sky model is broader, so the dual-band passbands have real background to reject.`
            : `This target is more broadband than a classic emission nebula, so the narrow passbands may reject useful continuum along with sky background.`
        },
        capture: {
          status: fit.label === "Strong match" ? "Strong match, with OSC tradeoffs" : "Good match, with OSC tradeoffs",
          text: `${filter} passes the main emission regions while blocking much of the modeled broadband sky glow. ${camera} can capture both regions, but the Bayer matrix means Hα and OIII are sampled differently.`
        },
        weak: {
          status: m.weakest.id === "b" ? "Blue/OIII needs the most care" : `${weakLabel} needs the most care`,
          text: `${strongLabel} is strongest in this educational model, but ${weakLabel} is weakest. Treat that channel or line carefully during capture, extraction, color balance, and stretching.`
        },
        strategy: {
          status: "Use the filter, but manage channel balance",
          text: `This setup should work well for emission nebulae under suburban-style sky glow. Expect channel balancing to matter; Hα may dominate many real targets, while OIII often needs more integration or gentler processing.`
        },
        driver: `The main driver is not camera QE alone. The result is mostly shaped by the interaction between the emission-line target, the dual-band passbands, the Bortle ${state.bortle} sky model, and OSC Bayer sampling.`
      };
    }

    if (mode === "osc_lp") {
      return {
        verdict: `This is a broadband color setup with some LP rejection, but its value depends on whether ${lp.toLowerCase()} has spectral features the filter can reject without losing too much target continuum.`,
        targetSky: {
          status: ledLike ? "Mixed separation" : "Good spectral separation",
          text: ledLike
            ? `The selected sky model includes broad LED-like continuum that overlaps useful broadband target light. That makes clean rejection harder than older line-rich lighting.`
            : `The selected LP model has more line-like structure, so the broadband LP filter has clearer unwanted light to suppress while keeping much of the target continuum.`
        },
        capture: {
          status: m.contrastGain >= 1.25 ? "Useful but compromised" : "Mostly color-balancing role",
          text: `${filter} can reduce selected LP regions, but it also reshapes broadband target color. Read this as target continuum kept versus sky background admitted, not as a pure speed improvement.`
        },
        weak: {
          status: ledLike ? "LED continuum limitation" : "Color balance compromise",
          text: `${weakLabel} is the weakest modeled channel. Under broadband LP filtering, the weak link is often color balance and continuum overlap rather than a single isolated emission line.`
        },
        strategy: {
          status: brightSky ? "Use darker nights for broadband when possible" : "Use as a comparison, not a cure-all",
          text: `This mode is useful for seeing whether the filter helps enough under the selected sky. For galaxies and reflection targets, darker transparent nights may matter more than a stronger LP notch.`
        },
        driver: ledLike ? "The main driver is LP spectral overlap: LED-rich continuum overlaps the target continuum, so the filter has less clean rejection leverage." : "The main driver is filter passband shape versus sodium/mercury LP structure."
      };
    }

    if (mode === "osc_broadband") {
      return {
        verdict: `This is a straightforward OSC broadband setup; it preserves broad target color, but sky brightness and RGB channel balance will define how clean the result feels.`,
        targetSky: {
          status: brightSky ? "Broadband-limited" : "Mixed separation",
          text: `Broadband targets and broadband sky share much of the same spectral space. The model therefore shows less spectral separation than narrowband emission work.`
        },
        capture: {
          status: cleanup ? "Cleanup role only" : "Open capture path",
          text: cleanup
            ? `The Generic UV/IR Cut is acting as spectral cleanup: it limits out-of-band UV/IR while leaving most of the visible band open. It is not a major LP filter.`
            : `With no strong spectral cleanup filter active, the camera sees its full modeled range, including possible out-of-band response.`
        },
        weak: {
          status: m.weakest.id === "b" ? "Blue channel weakness" : `${weakLabel} is the weak channel`,
          text: `${weakLabel} is weakest in the modeled capture. Under brighter or LED-rich skies, blue/green background often becomes the first place broadband OSC data looks noisy.`
        },
        strategy: {
          status: "Prioritize sky quality and cleanup",
          text: `Use broadband OSC for galaxies, clusters, and star fields when the sky is transparent. UV/IR cut is useful cleanup, while true light-pollution control mostly requires darker sky or different target/filter strategy.`
        },
        driver: `The main driver is broadband sky load: target continuum and sky continuum overlap, so raw camera sensitivity is less important than sky brightness and cleanup choices.`
      };
    }

    if (mode === "broadband_mono") {
      return {
        verdict: `This Mono LRGB run captures broadband targets efficiently, but luminance and blue-channel sky load are the places to watch under Bortle ${state.bortle}.`,
        targetSky: {
          status: targetKind === "broadband" ? "Broadband-limited" : "Mixed separation",
          text: `Broadband target light overlaps broad sky glow, so spectral separation is limited. The result depends on managing sky background while preserving natural color.`
        },
        capture: {
          status: "Good broadband match",
          text: `${filter} provides defined LRGB windows for ${camera}. Luminance gathers strong signal, but it also admits the most modeled background.`
        },
        weak: {
          status: m.weakest.id === "b" ? "Blue channel weakness" : `${weakLabel} needs attention`,
          text: `${weakLabel} is weakest in this modeled LRGB balance. Blue and luminance commonly need extra care when sky glow is high.`
        },
        strategy: {
          status: "Use darker nights for broadband detail",
          text: `Treat RGB weighting as a starting point, then adjust for target color and gradients. Broadband detail benefits strongly from transparency and darker sky.`
        },
        driver: `The main driver is broadband sky load through LRGB windows, especially luminance collection versus background admission.`
      };
    }

    return {
      verdict: `This Mono SHO run isolates emission lines well, but ${weakLabel} is the line most likely to need extra integration or processing care.`,
      targetSky: {
        status: targetKind === "line" ? "Strong spectral separation" : "Mixed separation",
        text: targetKind === "line"
          ? `The selected target is line-dominated, and the sky model is broader. Narrowband isolation gives the filter stack strong background-rejection leverage.`
          : `This target is not primarily line dominated, so SHO filters may reject useful continuum along with the sky.`
      },
      capture: {
        status: "Strong match",
        text: `${filter} isolates Ha/OIII/SII regions with a mono camera, so every pixel can contribute behind each selected narrowband filter.`
      },
      weak: {
        status: weakLabel.includes("SII") ? "SII weakness" : weakLabel.includes("OIII") ? "OIII vulnerability" : `${weakLabel} needs the most care`,
        text: `${strongLabel} is strongest in the modeled line response, while ${weakLabel} is weakest. Use the suggested weighting as a relative starting point rather than a prescription.`
      },
      strategy: {
        status: "Balance integration by line response",
        text: `Narrowband should work well under the selected sky. Plan to balance weaker lines with more integration, careful stretching, or processing choices.`
      },
      driver: moderateSky || brightSky ? "The main driver is narrowband sky rejection: the filters isolate emission lines while excluding much of the broad background." : "The main driver is target line balance plus filter throughput at Ha/OIII/SII."
    };
  }

  function evaluationChannelLabel(stat) {
    if (state.mode === "osc_narrowband") return stat.label;
    if (state.mode === "narrowband_mono") return stat.label;
    if (state.mode === "broadband_mono") return ({ l: "Luminance", r: "Red", g: "Green", b: "Blue" }[stat.id] || stat.label);
    if (["osc_lp", "osc_broadband"].includes(state.mode)) return ({ r: "Red", g: "Green", b: "Blue" }[stat.id] || stat.label);
    return stat.label;
  }

  function setupStoryStepper() {
    const buttons = Array.from(document.querySelectorAll("[data-story-target]"));
    const steps = Array.from(document.querySelectorAll("[data-story-step]"));
    buttons.forEach((button) => button.addEventListener("click", () => document.getElementById(button.dataset.storyTarget)?.scrollIntoView({ behavior: "auto", block: "start" })));
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      buttons.forEach((button) => button.classList.toggle("active", button.dataset.storyTarget === visible.target.id));
    }, { rootMargin: "-18% 0px -62% 0px", threshold: [0.05, 0.2, 0.5] });
    steps.forEach((step) => observer.observe(step));
  }

  function renderOverlay(result) {
    const scaleSeries = (series, scale) => series.map((p) => ({ x: p.x, y: p.y / Math.max(scale, 1e-6) }));
    const maxSeriesValue = (curves) => Math.max(...curves.flatMap((curve) => curve.points.map((p) => p.y)), 1);
    const normalizedTarget = normalize(result.targetBase);
    const scaledSky = scaleSeries(result.skyBase, result.plotScales.sky);
    const combinedSource = sumCurves([{ points: normalizedTarget }, { points: scaledSky }], result.wavelengths);
    const sourceOptions = [
      ["sourceTarget", `${result.target.name} shape`, { label: `${result.target.name} shape`, color: "#f0a12a", points: normalizedTarget }],
      ["sourceSky", `Sky / LP, Bortle ${state.bortle}`, { label: `Sky / LP, Bortle ${state.bortle}`, color: "#ffd16f", points: scaledSky }],
      ["sourceCombined", "Combined incoming light", { label: "Combined incoming light", color: "#f8f0c8", points: combinedSource }]
    ];
    const captureCameraCurves = result.camera.type === "osc" ? result.cameraCurves : [result.qeEnvelope];
    const captureCombinedCurve = { label: "Combined system window", color: "#f8f0c8", points: sumCurves(result.combinedCurves, result.wavelengths) };
    const captureOptions = [
      ["captureFilter", "Primary filter", result.primaryFilterCurve],
      ["captureCamera", result.camera.type === "osc" ? "Bayer RGB" : "Camera QE", captureCameraCurves],
      ["captureCombined", "Combined system window", captureCombinedCurve]
    ];
    const finalOptions = [
      ["finalTarget", "Captured target signal shape", { label: "Captured target signal shape", color: "#7fe0b6", points: normalize(sumCurves(result.signalCurves, result.wavelengths)) }],
      ["finalBackground", `Captured background, Bortle ${state.bortle}`, { label: `Captured background, Bortle ${state.bortle}`, color: "#ff756c", points: scaleSeries(sumCurves(result.backgroundCurves, result.wavelengths), result.plotScales.background) }]
    ];
    const optionCurves = (options) => options.filter(([key]) => state.overlaySplit[key]).flatMap(([, , item]) => Array.isArray(item) ? item : [item]);
    const controlsFor = (options) => options.map(([key, label]) => `<label><input type="checkbox" data-overlay-split="${key}" ${state.overlaySplit[key] ? "checked" : ""}> ${label}</label>`).join("");
    const overlayVerdicts = overlapVerdicts(result);
    const overlayCard = (title, text, verdict, options, note, hint, id, yMax) => {
      const curves = optionCurves(options);
      const visibleCurves = curves.length ? curves : [{ label: "No curves selected", color: "rgba(255,255,255,0.35)", points: result.wavelengths.map((nm) => ({ x: nm, y: 0 })) }];
      return `<article class="overlay-plot overlay-split"><header><h3>${title}</h3><p>${text}</p><div class="overlay-verdict">${verdict}</div><p class="plot-hint">${hint}</p></header><div class="row-legend">${visibleCurves.map((c) => `<span class="legend-chip" style="--chip-color:${c.color}">${c.label}</span>`).join("")}</div>${renderSvg(visibleCurves, result.wavelengths, id, yMax, "rel")}<div class="overlay-note">${note}</div><div class="overlay-controls overlay-controls-inline">${controlsFor(options)}</div></article>`;
    };
    const sourceScale = maxSeriesValue(sourceOptions.flatMap(([, , item]) => Array.isArray(item) ? item : [item]));
    const finalScale = maxSeriesValue(finalOptions.flatMap(([, , item]) => Array.isArray(item) ? item : [item]));
    $("storyStack").innerHTML = `<div class="story-section overlay-heading"><div><span class="eyebrow">Overlap View</span><h3>Where the Layers Collide</h3><p>Story View teaches each layer separately. Overlap View shows where useful signal, unwanted background, filter windows, and camera response occupy the same spectral territory.</p><ul class="overlap-questions"><li>Where does target signal compete with sky background?</li><li>Where do filter windows meet camera/Bayer response?</li><li>Where does useful signal survive better than background leakage?</li></ul></div></div>
      ${overlayCard("1. Source Conflict", "Useful target shape beside the modeled sky and light-pollution background.", overlayVerdicts.source, sourceOptions, "All curves in this panel share one scale. The combined incoming-light curve is the sum of the displayed target shape and sky / LP curve.", "Try this → toggle combined incoming light to see the stack.", "overlaySource", sourceScale)}
      ${overlayCard("2. Capture Gate", result.camera.type === "osc" ? "Filter windows with Bayer RGB channel routing. This intentionally does not show a fake bare OSC QE curve." : "Filter windows with the mono camera QE curve.", overlayVerdicts.capture, captureOptions, result.camera.type === "osc" ? "All curves in this panel share a 0-1 response scale. The combined system window folds filter transmission and Bayer response together." : "All curves in this panel share a 0-1 response scale. The combined system window multiplies filter transmission and camera QE.", "Try this → leave only the combined system window visible.", "overlayCapture", 1)}
      ${overlayCard("3. Final Tradeoff", "The retained target signal shape compared with admitted background leakage.", overlayVerdicts.final, finalOptions, "All curves in this panel share one scale. Captured target is normalized for shape; captured background is scaled against the Bortle 9 reference model so sky-brightness changes stay visible.", "Try this → change Bortle and watch captured background.", "overlayFinal", finalScale)}`;
    $("storyStack").querySelectorAll("[data-overlay-split]").forEach((input) => input.addEventListener("change", () => {
      state.overlaySplit[input.dataset.overlaySplit] = input.checked;
      render();
    }));
    attachPlotTooltips(result);
  }

  function overlapVerdicts(result) {
    const targetPhrase = result.target.kind === "line" ? "narrow-line" : "broad-continuum";
    const skyPhrase = ["cool_led", "warm_led", "mixed_suburban", "commercial"].includes(state.lp) ? "LED-continuum-heavy" : state.lp === "sodium_mercury_mix" || state.lp === "sodium_heavy" || state.lp === "mercury_old" ? "line-rich" : "broad";
    const separation = result.target.kind === "line" && state.mode.includes("narrowband") ? "good" : result.target.kind === "broadband" && state.bortle >= 6 ? "mixed" : "useful";
    const strong = result.metrics.strongest.label;
    const weak = result.metrics.weakest.label;
    return {
      source: `${result.target.name} is ${targetPhrase}, while the selected sky model is ${skyPhrase}. This creates ${separation} spectral separation.`,
      capture: result.camera.type === "osc"
        ? `The selected filter opens ${filterPassbandPhrase(result)}, and the OSC Bayer matrix samples those windows unevenly. The system favors ${strong}.`
        : `The selected filter opens ${filterPassbandPhrase(result)}, and the mono camera response shapes throughput across those windows. The system favors ${strong}.`,
      final: `Useful signal survives most strongly around ${strong}, while ${weak} is the main vulnerability to watch.`
    };
  }

  function filterPassbandPhrase(result) {
    if (result.filter.type === "dualband") return "OIII/Hβ and Hα windows";
    if (result.filter.type === "triband") return "multiple emission windows";
    if (result.filter.type === "sho") return "Ha, OIII, and SII windows";
    if (result.filter.type === "lrgb") return "LRGB broadband windows";
    if (result.filter.type === "lp_broadband") return "a broad visible window with LP notches";
    if (cleanupIsActive(result)) return "a visible-band cleanup window";
    return "the available camera window";
  }

  function renderSvg(curves, wavelengths, rowId, fixedYMax, yUnit) {
    const w = 1040;
    const h = 240;
    const pad = { l: 48, r: 18, t: 18, b: 34 };
    const min = wavelengths[0];
    const max = wavelengths[wavelengths.length - 1];
    const sourceCurves = state.advanced.normalizeRows && !fixedYMax ? curves.map((c) => ({ ...c, points: normalize(c.points) })) : curves;
    const maxY = fixedYMax || Math.max(...sourceCurves.flatMap((c) => c.points.map((p) => p.y)), 1e-9);
    const x = (nm) => pad.l + ((nm - min) / (max - min)) * (w - pad.l - pad.r);
    const y = (v) => pad.t + (1 - clamp(v / maxY, 0, 1)) * (h - pad.t - pad.b);
    const axis = [400, 450, 500, 550, 600, 650, 700, 750, 800].filter((v) => v >= min && v <= max);
    const yTicks = [0, 0.25, 0.5, 0.75, 1];
    const spectrumBands = [
      [400, 450, "rgba(78,92,255,0.13)"],
      [450, 500, "rgba(78,170,255,0.10)"],
      [500, 570, "rgba(88,225,155,0.11)"],
      [570, 610, "rgba(255,210,90,0.10)"],
      [610, 720, "rgba(255,82,78,0.12)"]
    ].filter(([a, b]) => b > min && a < max).map(([a, b, color]) => {
      const x1 = x(Math.max(a, min));
      const x2 = x(Math.min(b, max));
      return `<rect x="${x1}" y="${pad.t}" width="${Math.max(0, x2 - x1)}" height="${h - pad.t - pad.b}" fill="${color}"/>`;
    }).join("");
    const lineLabelY = (line) => {
      if (line.id === "hb" || line.id === "sii672" || line.id === "sii673" || line.id === "sii") return pad.t + 24;
      return pad.t + 11;
    };
    const lines = visibleLines(rowId).map((line) => `
      <g>
        <line x1="${x(line.nm)}" y1="${pad.t}" x2="${x(line.nm)}" y2="${h - pad.b}" stroke="rgba(255,255,255,0.22)" stroke-dasharray="3 4"/>
        <text x="${x(line.nm) + 3}" y="${lineLabelY(line)}" class="line-label">${line.label}</text>
      </g>
    `).join("");
    const paths = sourceCurves.map((curve) => {
      const d = curve.points.map((p, i) => `${i ? "L" : "M"} ${x(p.x).toFixed(1)} ${y(p.y).toFixed(1)}`).join(" ");
      return `
        <path d="${d}" fill="none" stroke="${curve.color}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round" opacity="0.16"/>
        <path d="${d}" fill="none" stroke="${curve.color}" stroke-width="3.1" stroke-linejoin="round" stroke-linecap="round"/>
        <path d="${d}" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="0.8" stroke-linejoin="round" stroke-linecap="round" opacity="0.45"/>
      `;
    }).join("");
    const fills = ["signal", "background", "target", "sky", "filterGate", "sourceHero", "finalHero"].includes(rowId)
      ? sourceCurves.map((curve) => {
        const d = curve.points.map((p, i) => `${i ? "L" : "M"} ${x(p.x).toFixed(1)} ${y(p.y).toFixed(1)}`).join(" ");
        return `<path d="${d} L ${x(max)} ${h - pad.b} L ${x(min)} ${h - pad.b} Z" fill="${curve.color}" opacity="0.13"/>`;
      }).join("")
      : "";
    const efficiencyZones = rowId === "efficiency" ? `
      <rect x="${pad.l}" y="${pad.t}" width="${w - pad.l - pad.r}" height="${(h - pad.t - pad.b) / 3}" fill="rgba(127,224,182,0.07)"/>
      <rect x="${pad.l}" y="${pad.t + (h - pad.t - pad.b) / 3}" width="${w - pad.l - pad.r}" height="${(h - pad.t - pad.b) / 3}" fill="rgba(240,161,42,0.055)"/>
      <rect x="${pad.l}" y="${pad.t + 2 * (h - pad.t - pad.b) / 3}" width="${w - pad.l - pad.r}" height="${(h - pad.t - pad.b) / 3}" fill="rgba(255,117,108,0.055)"/>
      <text x="${w - 112}" y="${pad.t + 14}" class="zone-label">HIGH EFFICIENCY</text>
      <text x="${w - 86}" y="${pad.t + (h - pad.t - pad.b) / 2 + 4}" class="zone-label">MODERATE</text>
      <text x="${w - 86}" y="${h - pad.b - 8}" class="zone-label">VULNERABLE</text>` : "";
    const cleanupZones = ["filterGate", "cleanupView"].includes(rowId) && min <= 380 && max >= 740 ? `
      <rect x="${x(min)}" y="${pad.t}" width="${x(400) - x(min)}" height="${h - pad.t - pad.b}" fill="rgba(185,148,255,0.13)"/>
      <rect x="${x(720)}" y="${pad.t}" width="${x(max) - x(720)}" height="${h - pad.t - pad.b}" fill="rgba(185,148,255,0.13)"/>
      <text x="${x(383)}" y="${pad.t + 14}" class="cleanup-zone-label">UV BLOCKED</text>
      <text x="${x(505)}" y="${pad.t + 14}" class="cleanup-zone-label visible-zone-label">VISIBLE BAND PASSES</text>
      <text x="${x(765)}" y="${pad.t + 14}" class="cleanup-zone-label">IR BLOCKED</text>` : "";
    return `
      <svg class="plot-svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet" data-row="${rowId}" data-min="${min}" data-max="${max}">
        ${spectrumBands}
        ${efficiencyZones}
        ${cleanupZones}
        ${yTicks.map((tick) => `<g><line x1="${pad.l}" y1="${y(tick * maxY)}" x2="${w - pad.r}" y2="${y(tick * maxY)}" stroke="rgba(255,255,255,0.08)"/><text x="12" y="${y(tick * maxY) + 4}" class="axis-value">${fixedYMax ? (tick * maxY).toFixed(maxY >= 10 ? 0 : 1) : Math.round(tick * 100)}</text></g>`).join("")}
        ${yUnit ? `<text x="${pad.l}" y="11" class="axis-value">${yUnit}</text>` : ""}
        <line x1="${pad.l}" y1="${h - pad.b}" x2="${w - pad.r}" y2="${h - pad.b}" stroke="rgba(255,255,255,0.22)"/>
        ${axis.map((nm) => `<g><line x1="${x(nm)}" y1="${pad.t}" x2="${x(nm)}" y2="${h - pad.b}" stroke="rgba(255,255,255,0.07)"/><text x="${x(nm) - 15}" y="${h - 7}" class="axis-label">${nm} nm</text></g>`).join("")}
        ${lines}
        ${fills}
        ${paths}
        <rect x="${pad.l}" y="${pad.t}" width="${w - pad.l - pad.r}" height="${h - pad.t - pad.b}" fill="transparent" data-hit="${rowId}"/>
      </svg>`;
  }

  function visibleLines(rowId) {
    if (rowId === "camera" || rowId === "qe") return [];
    if (state.advanced.showAllLabels) return SPECTRAL_LINES;
    const grouped = [
      { id: "hb", label: "Hβ", nm: 486.1, modes: ["osc_narrowband", "narrowband_mono"] },
      { id: "oiii", label: "OIII", nm: 500.7, modes: ["osc_narrowband", "narrowband_mono"] },
      { id: "sodium", label: "Na", nm: 589.0, modes: ["osc_lp", "broadband_mono", "osc_broadband"] },
      { id: "ha", label: "Hα", nm: 656.3, modes: ["osc_narrowband", "narrowband_mono"] },
      { id: "sii", label: "SII", nm: 672.4, modes: ["osc_narrowband", "narrowband_mono"] },
      { id: "mercury", label: "Hg", nm: 546.1, modes: ["broadband_mono", "osc_broadband", "osc_lp"] }
    ];
    return grouped.filter((line) => line.modes.includes(state.mode));
  }

  function attachPlotTooltips(result) {
    const tooltip = $("tooltip");
    document.querySelectorAll(".plot-svg").forEach((svg) => {
      svg.addEventListener("mousemove", (event) => {
        const rect = svg.getBoundingClientRect();
        const min = Number(svg.dataset.min) || result.wavelengths[0];
        const max = Number(svg.dataset.max) || result.wavelengths[result.wavelengths.length - 1];
        const nm = Math.round(min + clamp((event.clientX - rect.left) / rect.width, 0, 1) * (max - min));
        const nearest = SPECTRAL_LINES.find((line) => Math.abs(line.nm - nm) <= 2.5);
        const f = effectiveFilterResponse(result.filter, nm, result.channels);
        const c = cameraResponse(result.camera, nm, result.channels[0]);
        const signal = result.signalCurves.reduce((sum, curve) => sum + controlPointFromSeries(curve.points, nm), 0);
        tooltip.style.display = "block";
        tooltip.style.left = `${event.clientX + 12}px`;
        tooltip.style.top = `${event.clientY + 12}px`;
        tooltip.innerHTML = `<strong>${nm} nm${nearest ? ` • ${nearest.label}` : ""}</strong><br>Filter: ${formatPct(f)}<br>Camera: ${formatPct(c)}<br>Final relative signal: ${formatIndex(signal)}`;
      });
      svg.addEventListener("mouseleave", () => { tooltip.style.display = "none"; });
    });
  }

  function controlPointFromSeries(series, nm) {
    const item = series.find((p) => p.x === nm);
    return item ? item.y : 0;
  }

  function renderMetrics(result) {
    const m = result.metrics;
    const fit = practicalFit(m);
    const skyChallenge = state.bortle <= 3 ? "Low" : state.bortle <= 6 ? "Moderate" : "High";
    const cards = [
      ["Overall spectral fit", fit.label, fit.text, "relative educational assessment"],
      ["Target light retained", formatPct(m.targetRetention), "Of the target light this camera could detect without the active filter.", "relative model estimate"],
      ["Sky glow blocked", formatPct(m.skyBlocked), "Of the modeled sky background the active filter prevents from reaching the camera.", "relative model estimate"],
      ["Contrast improvement", `${m.contrastGain.toFixed(1)}x`, "Useful target separation versus using the same camera without the active filter.", "relative educational index"],
      ["Dominant captured signal", m.strongest.label, `${formatPct(m.strongestShare)} of the modeled captured target signal lands here.`, "selected target model"],
      ["Background challenge", skyChallenge, `Bortle ${state.bortle} with ${getLpPreset().name}. ${m.weakest.label} is the channel or line most likely to need extra care.`, "relative sky model"]
    ];
    if (state.mode === "osc_broadband") {
      cards.splice(4, 0,
        ["Visible-band throughput", cleanupIsActive(result) ? "High" : "Open", cleanupIsActive(result) ? "Most modeled visible RGB light remains available." : "No additional visible-band cleanup filter is active.", "relative model estimate"],
        ["UV/IR leakage control", cleanupIsActive(result) ? "Strong" : "Camera-dependent", cleanupIsActive(result) ? "Out-of-band UV and IR are strongly reduced in the generic cleanup model." : "Out-of-band response depends on the camera window and sensor package.", "relative cleanup estimate"],
        ["Light-pollution rejection", "Minimal", "UV/IR cut is a spectral cleanup filter, not a broadband light-pollution filter.", "educational role"],
        ["Image-quality role", "Spectral cleanup", "Blocks out-of-band light that may not focus cleanly or contribute useful RGB color.", "educational role"]
      );
    }
    if (state.mode === "osc_narrowband") {
      cards.splice(4, 0, ["Bayer capture utilization", formatPct(m.bayerUtilization), `Actual RGGB-weighted target collection versus an ideal detector where every pixel can use the best response. Relative collection penalty: ${m.bayerCollectionPenalty.toFixed(1)}x.`, "relative OSC sampling comparison"]);
    }
    $("metricCards").innerHTML = cards.map(([label, value, text, estimate]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong><small>${estimate}</small><p>${text}</p></div>`).join("");
    $("channelCards").innerHTML = m.channelStats.map((c) => `<article class="channel-card"><div class="channel-dot" style="--channel:${channelColor(c.id)}"></div><h3>${c.label}</h3><strong>${formatPct(c.signalNorm)} of strongest captured signal</strong><p>${formatPct(c.skyNorm)} of highest channel background • start near ${c.weight.toFixed(1)}x integration</p><div class="dual-bar"><i style="width:${c.signalNorm * 100}%"></i><em style="width:${c.skyNorm * 100}%"></em></div></article>`).join("");
  }

  function practicalFit(metrics) {
    if (metrics.contrastGain >= 2.5 && metrics.targetRetention >= 0.25) return { label: "Strong match", text: "The filter removes substantially more modeled sky than useful target light." };
    if (metrics.contrastGain >= 1.25) return { label: "Helpful", text: "The active filter improves target separation, with a meaningful target-light tradeoff." };
    if (metrics.contrastGain >= 0.9) return { label: "Mostly neutral", text: "The active filter changes the spectral balance more than it improves target separation." };
    return { label: "Challenging match", text: "The active filter removes too much useful target light for this target and sky combination." };
  }

  function renderInterpretation(result) {
    const m = result.metrics;
    const t = evaluationTakeaways(result);
    const driver = t.driver.replace(/^The main driver is /, "");
    const watch = watchOut(result);
    const greenOiiiContext = state.mode === "osc_narrowband" && m.strongest.id === "g"
      ? [["G / OIII note", "This selected target model lets green/OIII lead. See the Evaluation Takeaways for the full context."]]
      : [];
    $("interpretationCards").innerHTML = [
      ["Best strength", `${m.strongest.label} is the strongest modeled useful-signal channel or line.`],
      ["Main weakness", `${m.weakest.label} is the weakest modeled channel or line.`],
      ["Primary driver", driver],
      ["Watch-out", watch],
      ...greenOiiiContext
    ].map(([title, text]) => `<article class="interpretation-card"><h3>${title}</h3><p>${text}</p></article>`).join("");
  }

  function suggestedStrategy(result) {
    const weights = result.metrics.channelStats.map((c) => `${c.label}: ${c.weight.toFixed(1)}x`).join(" • ");
    if (state.mode === "osc_lp") return `Read this as a target-continuum-kept versus sky-background-admitted tradeoff. Use channel balance only as a starting point: ${weights}.`;
    if (state.mode === "osc_narrowband") return `Expect red-channel dominance when H-alpha is strong. Use the channel balance cards as a starting point: ${weights}.`;
    if (state.mode === "narrowband_mono") return `Use relative integration weighting as a starting point: ${weights}. Tight filters help most as sky brightness rises.`;
    return `Use the suggested channel weighting as a starting point: ${weights}. Better transparency and darker sky will matter more than small QE differences.`;
  }

  function watchOut(result) {
    if (state.lp.includes("led") || state.lp === "mixed_suburban" || state.lp === "commercial") return "LED-rich lighting behaves more like a broad continuum, so broadband LP filters have less clean notch leverage than they do against sodium-heavy lighting.";
    if (state.bortle >= 7) return "The modeled sky penalty is high. Broadband targets remain possible, but gradients and blue-channel noise will need extra attention.";
    return `${result.metrics.weakest.label} is the weakest modeled channel or line. This is the one to inspect first when color balance or narrowband mapping looks uneven.`;
  }

  function renderTabs(result) {
    $("tabButtons").innerHTML = TABS.map((tab) => `<button type="button" class="${state.tab === tab.id ? "active" : ""}" data-tab="${tab.id}">${tab.label}</button>`).join("");
    $("tabButtons").querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => {
      state.tab = btn.dataset.tab;
      renderTabs(compute());
    }));
    const stats = result.metrics.channelStats;
    if (state.tab === "details") {
      $("tabBody").innerHTML = `<div class="tab-explainer"><h3>How to read these channel / line details</h3><p><b>Relative captured signal</b> compares each channel with the strongest channel in this selected setup. <b>Camera response</b> and <b>filter transmission</b> are averages weighted by the selected target spectrum, not peak specifications. Use these cards to understand why one channel or emission line contributes more strongly than another.</p></div><div class="detail-grid">${stats.map(detailCard).join("")}</div>`;
    } else if (state.tab === "sky") {
      $("tabBody").innerHTML = `
        <p>Rejected light is filter-side context: it shows what never reaches the detector. Good rejection removes substantially more sky than useful target signal.</p>
        <div class="detail-plot-heading">
          <div>
            <h3>Rejected Light by Wavelength</h3>
            <p>Higher curves indicate more light blocked by the active filter.</p>
          </div>
          <div class="row-legend sky-leakage-legend">
            ${result.rejectedLightCurves.map((curve) => `<span class="legend-chip" style="--chip-color:${curve.color}">${curve.label}</span>`).join("")}
          </div>
        </div>
        <div class="detail-plot">${renderSvg(result.rejectedLightCurves, result.wavelengths, "rejected", result.plotScales.sky, "rel rejected")}</div>
        <div class="sky-admitted-key"><strong>Admitted background by channel</strong><span>The cards below show sky / LP light that passed through and entered the captured data.</span></div>
        <div class="detail-grid">${stats.map((c) => skyCard(c)).join("")}</div>`;
    } else if (state.tab === "color") {
      $("tabBody").innerHTML = `<p>${colorText(result)}</p><div class="detail-grid">${stats.map((c) => balanceCard(c)).join("")}</div>`;
    } else if (state.tab === "notes") {
      $("tabBody").innerHTML = `<p>Camera QE and many named filter curves are digitized approximations of manufacturer-published plots imported from the Astro System Explorer / System Comparison Tool data style. Some filters, especially provisional hybrid, generic, or simplified narrowband entries, remain compact educational approximations and are labeled that way in the setup notes. Bayer response curves use manufacturer-style channel data where available and estimated channel curves where not available. Generic UV/IR Cut uses a relative educational transmission curve; actual filters differ in cut-on wavelength, cut-off wavelength, peak transmission, angle shift, and blocking depth. Some OSC cameras or protective windows may already include UV/IR blocking. OSC captured-signal and background calculations apply an RGGB site-area model: 25% red, 50% green, and 25% blue. Calculations use a shared ${result.wavelengths[0]}-${result.wavelengths[result.wavelengths.length - 1]} nm wavelength grid sampled every 0.25 nm.</p>`;
    } else {
      $("tabBody").innerHTML = `<p>${result.camera.name} with ${result.filter.name}${cleanupIsActive(result) ? " plus Generic UV/IR Cut" : ""}, ${result.target.name}, Bortle ${state.bortle}, and ${getLpPreset().name}. Final target signal is computed as target spectrum x effective transmission x camera response; final background uses sky / LP spectrum x effective transmission x camera response.</p>`;
    }
  }

  function detailCard(c) {
    return `<article class="detail-card"><h4>${c.label}</h4><p><b>Relative captured signal:</b> ${formatPct(c.signalNorm)} of the strongest channel</p><div class="bar"><i style="width:${c.signalNorm * 100}%"></i></div><p><b>Target-weighted camera response:</b> ${formatPct(c.cameraAvg)}<br><b>Target-weighted filter transmission:</b> ${formatPct(c.filterAvg)}</p></article>`;
  }

  function skyCard(c) {
    return `<article class="detail-card"><h4>${c.label}</h4><p>Sky leakage ${formatPct(c.skyNorm)}</p><div class="bar"><i style="width:${c.skyNorm * 100}%"></i></div><p>Signal/background ${formatIndex(c.ratio)}</p></article>`;
  }

  function balanceCard(c) {
    return `<article class="detail-card"><h4>${c.label}</h4><p>Suggested weight ${c.weight.toFixed(1)}x</p><div class="bar"><i style="width:${Math.min(c.weight / 2.5, 1) * 100}%"></i></div><p>Relative useful signal ${formatPct(c.signalNorm)}</p></article>`;
  }

  function colorText(result) {
    if (state.mode === "osc_lp") return "Broadband LP color balance depends on target continuum kept versus sky color admitted. LED-rich sky often makes the blue-green background harder to suppress cleanly.";
    if (state.mode === "osc_narrowband") return "H-alpha tends to drive the red channel. OIII lands mainly in green with some blue contribution, so extracting a balanced dual-band image often requires protecting the weaker blue-green signal.";
    if (state.mode === "narrowband_mono") return "For SHO work, the visual palette is a processing choice, but the capture balance still depends on Ha, OIII, and SII line efficiency.";
    return "Broadband color balance is shaped by target continuum, sky color, filter windows, and detector response. The weights below are only a starting point.";
  }

  function syncViewControls() {
    $("storyViewBtn").classList.toggle("active", state.view === "story");
    $("overlayViewBtn").classList.toggle("active", state.view === "overlay");
    $("overlayControls").hidden = true;
    $("overlayControls").innerHTML = "";
    $("workspace").classList.toggle("takeaway-hidden", !state.takeawayOpen);
    $("workspace").classList.toggle("focus-mode", state.focusMode);
    $("workspace").classList.toggle("story-full", state.view === "story");
    $("focusModeBtn").classList.toggle("active", state.focusMode);
    $("focusModeBtn").textContent = state.focusMode ? "Show Controls" : "Focus on Story";
    $("takeawayPanel").hidden = !state.takeawayOpen;
    $("showTakeaway").hidden = state.takeawayOpen;
  }

  function setTakeaway(open) {
    state.takeawayOpen = open;
    syncViewControls();
  }

  function bindSectionHelp() {
    document.querySelectorAll("[data-help-step]").forEach((button) => button.addEventListener("click", () => openHelp(Number(button.dataset.helpStep))));
  }

  const HELP_SLIDES = [
    {
      title: "The Big Picture", summary: "Your final image data is created when light from the sky passes through your filter and camera system.",
      graphic: photonDiagram(),
      cards: [["Target light", "Useful astronomical signal from nebulae, galaxies, stars, or dust."], ["Sky background", "Natural sky glow and human-made light pollution arrive with the target."], ["Capture system", "The filter and camera reshape what reaches your data."]]
    },
    {
      title: "Source Stack", summary: "This is the light arriving before your camera system touches it.",
      graphic: sourceDiagram(),
      cards: [["Target signal", "Emission targets are line dominated; galaxies and clusters are broadband."], ["Sky brightness", "Bortle class changes how much background rides along."], ["Light pollution", "LED, sodium, and mercury have different spectral fingerprints."]],
      note: "Try changing the Bortle class or LP preset and watch the sky layer change."
    },
    {
      title: "Capture Stack", summary: "This is how your equipment admits, blocks, routes, and detects incoming light.",
      graphic: captureDiagram(),
      cards: [["Camera QE", "Shows how efficiently the sensor detects each wavelength."], ["Bayer matrix", "For OSC cameras, wavelengths route into red, green, and blue responses."], ["Filter", "Chooses which wavelengths are allowed through before the final combined response."]],
      note: "Try switching from OSC to mono and notice how the Bayer layer disappears."
    },
    {
      title: "Where Source Meets System", summary: "The final captured result comes from multiplying the source stack by the capture stack.",
      graphic: mergeDiagram(),
      cards: [["Useful signal", "Target light that survives filter and camera response."], ["Background leakage", "Sky and LP signal that survives the same path."], ["Efficiency", "Where useful signal survives better than unwanted background."]],
      note: "Compare Captured Target Signal with Captured Background Leakage. That comparison is the heart of the tool."
    },
    {
      title: "How OSC Samples Narrowband Light", summary: "A dual-band filter passes spectral regions, but the OSC Bayer matrix determines which pixels collect those wavelengths efficiently.",
      graphic: oscDiagram(),
      cards: [["H-alpha", "Usually lands strongly in the red response."], ["OIII / H-beta", "Shared mostly through green and blue Bayer response."], ["Practical result", "OSC dual-band data is not the same as separate mono Ha and OIII captures."]],
      note: "The ideal-versus-actual comparison is a relative teaching model, not a complete exposure-time or SNR prediction."
    },
    {
      title: "What the Results Mean", summary: "The summary compares the selected setup with the same camera operating without the active filter.",
      graphic: metricDiagram(),
      cards: [["Target light retained", "The percentage of camera-detectable target light that survives the active filter."], ["Sky glow blocked", "The percentage of modeled sky background prevented from reaching the camera."], ["Contrast improvement", "How much more clearly target signal separates from background with the active filter."]],
      note: "Real results also depend on atmosphere, optics, calibration, exposure strategy, and processing."
    },
    {
      title: "How to Read the Spectral Plots", summary: "Read wavelength left to right, then compare landmarks, windows, response, and final captured peaks.",
      graphic: plotDiagram(),
      cards: [["Landmark pins", "Hβ, OIII, Na, Hα, and SII locate important wavelengths."], ["Curves and windows", "Their height shows relative response or modeled intensity."], ["Captured result", "Peaks show where useful signal or background survives."]]
    },
    {
      title: "What a UV/IR Cut Filter Does", summary: "A UV/IR cut filter is a spectral cleanup filter, not primarily a light-pollution or speed filter.",
      graphic: uvIrDiagram(),
      cards: [["Passes visible light", "The main RGB imaging band remains mostly open."], ["Blocks out-of-band light", "Ultraviolet and infrared response are reduced before reaching the sensor."], ["Improves cleanup", "Out-of-band light that may soften stars or contaminate color is reduced."]],
      note: "Some cameras or protective windows already include UV/IR blocking, so an external cleanup filter can be redundant."
    }
  ];

  const FAQ_GROUPS = [
    {
      title: "About the Tool",
      items: [
        ["What is Astro Spectral Explorer?", "Astro Spectral Explorer is an interactive educational tool that shows how target light, sky glow, light pollution, filters, camera sensitivity, and OSC Bayer response combine to create the spectral signal that ends up in your astrophotography data."],
        ["Is this an exposure calculator?", "No. This is not a full exposure-time or calibrated SNR calculator. It is a relative spectral modeling tool designed to help you understand what your system passes, blocks, detects, and records."],
        ["Why should I care about spectral response?", "Because your camera records target light plus sky background after both have passed through your filters and sensor response. Understanding that chain helps explain weak channels, filter behavior, and why more total light is not always better data."],
        ["Why are the numbers relative?", "The tool uses simplified relative models so users can compare spectral behavior. Real data also depends on telescope optics, atmosphere, target brightness, exposure length, gain, calibration, processing, transparency, moonlight, and local sky conditions."]
      ]
    },
    {
      title: "How to Read the Results",
      items: [
        ["What does “captured target signal” mean?", "Captured target signal is the modeled useful light that survives the selected filter and camera response. For OSC cameras, it is also shaped by the Bayer color filter array."],
        ["What does “captured background leakage” mean?", "Captured background leakage is the unwanted sky glow and light pollution that passes through the same filter and camera path. A filter can pass useful signal and still admit background in the same spectral region."],
        ["Why does the app show Story and Overlap views?", "Story View teaches one layer at a time with supporting context included where it helps. Overlap View gives three focused layer comparisons: source conflict, capture gate, and final tradeoff."],
        ["Why is “more light” not always better?", "More photons can include more unwanted photons. A filter that slightly reduces total light can still improve useful contrast if it blocks more sky background than target signal."],
        ["What should I do with the suggested channel weighting?", "Treat it as a starting point only. It reflects the selected relative model, not a prescription. Actual exposure balance depends on your target, sky, optical system, camera settings, and processing style."]
      ]
    },
    {
      title: "Filters and Cameras",
      items: [
        ["What does a UV/IR cut filter do?", "A UV/IR cut filter is a spectral cleanup filter. It passes the visible band while blocking ultraviolet and infrared light outside the intended imaging range. It is not mainly a light-pollution filter, but it can reduce out-of-band signal that may not focus cleanly or contribute useful RGB color."],
        ["Can I use this to choose the best filter?", "Use it as an educational comparison tool, not as a final buying recommendation. It can show how filters interact with your camera and sky model, but real-world choice also depends on optics, targets, local conditions, budget, and processing goals."],
        ["Are the camera and filter curves exact?", "No. Camera QE curves and many named filter curves are digitized approximations of manufacturer-published plots, not laboratory-certified transfer functions. Some entries are compact educational or generic approximations, and the tool identifies those where appropriate."]
      ]
    },
    {
      title: "OSC / Bayer / Dual-Band Imaging",
      items: [
        ["Why is OSC dual-band imaging different from mono narrowband?", "A dual-band filter passes selected spectral regions, but an OSC camera still samples that light through red, green, and blue Bayer pixels. H-alpha usually lands mostly in red pixels, while OIII and H-beta are shared mainly through green and blue response. A mono camera can use every pixel behind each dedicated narrowband filter."],
        ["Why does the tool sometimes show OIII or green as dominant?", "The result depends on the selected target model, filter, camera response, and Bayer sampling. Some educational target models may show OIII plus green Bayer sampling as dominant. Many real emission nebula images still appear red-heavy when H-alpha is intrinsically stronger or emphasized during processing."]
      ]
    },
    {
      title: "Sky, Light Pollution, and Model Limits",
      items: [
        ["Why do light-pollution filters work differently under LED lighting?", "Older light pollution often had strong narrow emission lines from sodium or mercury lamps. Many modern LED sources include broader continuum light that overlaps useful astronomical signal, making LED-rich skies harder to reject cleanly with simple notch-style filters."]
      ]
    }
  ];

  const APPENDIX_SECTIONS = [
    { id: "purpose", title: "A. Model Purpose", body: `<p>Astro Spectral Explorer is a relative educational spectral model. It shows how target light, sky background, light pollution, filters, camera sensitivity, and OSC Bayer response interact. It is not a calibrated photometric simulator, exposure-time calculator, or full signal-to-noise model.</p>` },
    { id: "grid", title: "B. Wavelength Grid", body: `<p>The model evaluates spectral curves on a common wavelength grid. The visible Story view normally focuses on 400–720 nm. Extended sensor and UV/IR cleanup views use 380–850 nm where appropriate.</p><div class="equation-strip">Current evaluation grid: 0.25 nm sampling for rendered and integrated relative curves</div>` },
    { id: "targets", title: "C. Target Spectrum Models", body: `<p>Target spectra are simplified educational approximations. Emission nebula models emphasize major lines; broadband targets use simplified continuum shapes. They are not calibrated object-specific flux spectra.</p><div class="data-labels"><span>H-beta 486.1 nm</span><span>OIII 495.9 / 500.7 nm</span><span>H-alpha 656.3 nm</span><span>SII 671.6 / 673.1 nm</span></div>` },
    { id: "sky", title: "D. Sky and Light-Pollution Models", body: `<p>Sky and light-pollution curves are simplified relative models. Bortle class changes modeled background amplitude. The light-pollution preset changes where that background is distributed spectrally. Rural, LED-dominant, sodium-heavy, mercury-rich, and mixed suburban presets teach spectral behavior rather than reproduce a measured local sky spectrum.</p><p>LED-rich lighting is modeled as broader continuum-like background than older sodium or mercury-dominated lighting. This is why broadband LP rejection is often less clean under LED-heavy skies.</p>` },
    { id: "camera", title: "E. Camera QE and Bayer Response", body: `<p>Camera response is represented with relative sensor sensitivity curves. ZWO, QHY, Player One, and related camera curves are stored as digitized approximations of manufacturer-published QE plots or imported comparison-tool control tables, not laboratory-certified transfer functions.</p><p>For OSC cameras, Bayer red, green, and blue response curves are used when available or approximated when unavailable. Red-sensitive wavelengths mostly contribute through red pixels. Blue-green wavelengths such as OIII and H-beta are shared mainly through green and blue response.</p>` },
    { id: "filters", title: "F. Filter Transmission", body: `<p>Filter transmission curves are relative passband functions. Many named filter families are digitized approximations of manufacturer-published transmission plots; other entries are compact educational approximations used when the current app only needs the major passband behavior. Generic filters are marked as generic relative models.</p><p>The generic UV/IR cut filter is a broad visible-band cleanup model. Actual filters vary in cut-on wavelength, cut-off wavelength, peak transmission, angle shift, and blocking depth.</p>` },
    { id: "equations", title: "G. Core Model Equations", body: `<p>The same capture path is applied separately to useful target light and unwanted background.</p><div class="equation-strip">Captured Target = Target Spectrum × Effective Filter Transmission × Camera Response</div><div class="equation-strip">Captured Background = Sky / LP Spectrum × Effective Filter Transmission × Camera Response</div><div class="equation-strip">OSC R/G/B = Source Spectrum × Effective Filter Transmission × Bayer R/G/B Response</div><div class="equation-strip">Effective Filter Transmission = Primary Filter × Additional Optical Filter</div><p>An additional optical filter is applied only when appropriate. The model avoids double-counting UV/IR blocking when the primary filter already defines it.</p>` },
    { id: "metrics", title: "H. Signal / Background and Efficiency Metrics", body: `<p>Signal/background and efficiency values are relative educational indices. They compare modeled useful target signal against modeled background leakage after the selected capture stack is applied. They are not calibrated SNR values.</p><p>The model does not include read noise, shot noise, dark current, gain setting, exposure duration, sky transparency variation, seeing, guiding, aperture, focal ratio, or processing behavior unless explicitly stated elsewhere.</p>` },
    { id: "osc", title: "I. OSC Narrowband / Dual-Band Approximation", body: `<p>OSC dual-band modeling treats the filter as a spectral passband selector and the Bayer matrix as the color-channel sampling structure. H-alpha generally maps most strongly into red response. OIII and H-beta map mostly into green and blue response. The model estimates relative channel capture; it is not a full demosaicing, stacking, calibration, or SNR simulation.</p><p>The ideal all-pixel comparison is a teaching aid. It illustrates that an OSC camera does not sample every narrowband wavelength with every pixel as a mono camera can behind a dedicated filter. It is not a universal exposure-time penalty.</p>` },
    { id: "uvir", title: "J. UV/IR Cut Modeling", body: `<p>The generic UV/IR cut option shows the difference between admitting the full modeled camera range and limiting the system mostly to the visible imaging band. It is a cleanup filter rather than a major light-pollution or speed filter.</p><p>Some cameras or protective windows already include UV/IR blocking. An external UV/IR cut filter may therefore be redundant in practice. The model avoids double-counting blocking when the selected primary filter already defines the relevant passband.</p>` },
    { id: "limits", title: "K. What the Model Does Not Include", body: `<p>This model does not fully simulate:</p><ul><li>telescope aperture</li><li>focal ratio</li><li>optical transmission by element</li><li>central obstruction</li><li>seeing and guiding</li><li>focus quality</li><li>sensor gain and read noise</li><li>dark current and shot noise</li><li>exposure length</li><li>stacking statistics</li><li>flat-field and calibration quality</li><li>atmospheric extinction by altitude</li><li>moon spectrum and geometry</li><li>target surface brightness</li><li>object-specific line ratios</li><li>demosaicing and processing choices</li></ul><p>Those factors matter in real imaging. This tool focuses on spectral behavior so the camera/filter/sky interaction remains understandable.</p>` },
    { id: "quality", title: "L. Data Quality Labels", body: `<p>Data quality labels distinguish digitized manufacturer-published curves from compact educational placeholders. Digitized curves are better than hand-shaped placeholders, but they are still approximations and may differ from calibrated device measurements by several percentage points.</p><div class="data-labels"><span>manufacturer-published plot, digitized approximation</span><span>comparison-tool control table</span><span>compact educational approximation</span><span>generic relative model</span><span>provisional planning curve</span></div>` },
    { id: "use", title: "M. Intended Use", body: `<p>Use this tool to understand spectral behavior, compare configurations, and build intuition about how target light, sky background, filters, and camera response interact. Do not use it as the sole basis for purchasing decisions, exposure planning, or scientific measurement.</p>` },
    { id: "copyright", title: "N. Copyright and Use", body: `<div class="legal-callout"><p><strong>© 2026 Patrick A. Cosgrove. All rights reserved.</strong></p><p>Astro Spectral Explorer, including its interface design, explanatory text, educational structure, visualizations, and compiled relative model data, is provided as part of Cosgrove's Cosmos for educational use. The tool and its contents may not be copied, republished, redistributed, or incorporated into another product without permission.</p><p>Manufacturer names, camera names, filter names, and related trademarks belong to their respective owners and are used here for identification and educational comparison only.</p></div>` }
  ];

  let helpStep = 0;
  let helpReturnFocus = null;
  let infoReturnFocus = null;

  function helpFlow(items, result) {
    return `<div class="help-flow">${items.map((item, i) => `<div class="${i === result ? "result" : ""}"><b>${item}</b></div>${i < items.length - 1 ? "<span>→</span>" : ""}`).join("")}</div>`;
  }
  function photonDiagram() { return helpFlow(["Deep-Sky Target", "Sky + LP", "Filter", "Camera / Bayer", "Captured Data"], 4); }
  function sourceDiagram() { return `<div class="mini-spectrum"><i class="line oiii"></i><i class="line ha"></i><i class="line sii"></i><span class="sky-glow"></span><b>Target lines + broadband sky + lamp features</b></div>`; }
  function captureDiagram() { return `<div class="capture-diagram"><div class="filter-windows"><i></i><i></i></div><div class="qe-arc"></div><div class="rgb-curves"><i></i><i></i><i></i></div><b>Filter windows × QE × color response</b></div>`; }
  function uvIrDiagram() { return `<div class="uvir-help-diagram"><div class="blocked">UV BLOCKED</div><div class="visible">VISIBLE LIGHT PASSES</div><div class="blocked">IR BLOCKED</div><p>More photons are not always better. Useful photons become clean visible-band image data.</p></div>`; }
  function mergeDiagram() { return `<div class="merge-diagram"><div>SOURCE STACK</div><b>×</b><div>CAPTURE STACK</div><strong>↓<br>USEFUL SIGNAL + BACKGROUND LEAKAGE</strong></div>`; }
  function oscDiagram() { return `<div class="osc-help-exhibit"><div class="osc-diagram"><div><b>OIII / Hβ passband</b><span>486–501 nm</span><i class="gb">G + B response</i></div><div class="bayer-grid"><i>R</i><i>G</i><i>G</i><i>B</i></div><div><b>Hα passband</b><span>656.3 nm</span><i class="red">R response</i></div></div><div class="help-sampling-pair"><div><b>IDEAL ALL-PIXEL</b><span>Every pixel can contribute</span></div><strong>versus</strong><div><b>ACTUAL OSC RGGB</b><span>Matching color sites contribute most</span></div></div><p>A dual-band filter selects spectral regions. The Bayer matrix decides how those photons are sampled.</p></div>`; }
  function metricDiagram() { return `<div class="metric-diagram">${[72, 88, 64, 54].map((v, i) => `<div><span>${["Target light retained", "Sky glow blocked", "Contrast improvement", "Channel balance effort"][i]}</span><i><b style="width:${v}%"></b></i></div>`).join("")}</div>`; }
  function plotDiagram() { return `<div class="annotated-plot"><span class="pin p1">OIII</span><span class="pin p2">Hα</span><i class="window w1"></i><i class="window w2"></i><svg viewBox="0 0 600 180"><path d="M0 165 C140 165 160 32 185 165 C350 165 410 165 455 24 C480 165 540 165 600 165" fill="none" stroke="#f0a12a" stroke-width="5"/></svg></div>`; }

  function setupHelpModal() {
    document.querySelectorAll("[data-help-close]").forEach((item) => item.addEventListener("click", closeHelp));
    $("helpPrev").addEventListener("click", () => showHelp(helpStep - 1));
    $("helpNext").addEventListener("click", () => helpStep === HELP_SLIDES.length - 1 ? closeHelp() : showHelp(helpStep + 1));
    document.addEventListener("keydown", (event) => {
      if ($("helpModal").getAttribute("aria-hidden") === "true") return;
      if (event.key === "Escape") closeHelp();
      if (event.key === "ArrowLeft") showHelp(helpStep - 1);
      if (event.key === "ArrowRight") showHelp(helpStep + 1);
      if (event.key === "Tab") trapHelpFocus(event);
    });
  }

  function openHelp(step) {
    helpReturnFocus = document.activeElement;
    $("helpModal").setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    showHelp(step);
    document.querySelector(".cc-help-close").focus();
  }

  function closeHelp() {
    $("helpModal").setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    if (helpReturnFocus) helpReturnFocus.focus();
  }

  function showHelp(step) {
    helpStep = clamp(step, 0, HELP_SLIDES.length - 1);
    const slide = HELP_SLIDES[helpStep];
    $("helpSteps").innerHTML = HELP_SLIDES.map((s, i) => `<button type="button" data-step="${i}" class="${i === helpStep ? "active" : ""}">${i + 1}. ${s.title}</button>`).join("");
    $("helpSteps").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => showHelp(Number(button.dataset.step))));
    $("helpStage").innerHTML = `<article class="help-slide"><span class="eyebrow">Step ${helpStep + 1} of ${HELP_SLIDES.length}</span><h3>${slide.title}</h3><p class="help-summary">${slide.summary}</p><div class="help-graphic">${slide.graphic}</div><div class="help-callouts">${slide.cards.map(([title, text]) => `<div><h4>${title}</h4><p>${text}</p></div>`).join("")}</div>${slide.note ? `<div class="try-note">${slide.note}</div>` : ""}</article>`;
    $("helpDots").innerHTML = HELP_SLIDES.map((_, i) => `<i class="${i === helpStep ? "active" : ""}"></i>`).join("");
    $("helpPrev").disabled = helpStep === 0;
    $("helpNext").textContent = helpStep === HELP_SLIDES.length - 1 ? "Done" : "Next";
  }

  function trapHelpFocus(event) {
    const focusable = Array.from(document.querySelectorAll("#helpModal button:not([disabled])"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function renderPublicationSupport() {
    $("faqBody").innerHTML = FAQ_GROUPS.map((group) => `<section class="faq-category"><h3>${group.title}</h3>${group.items.map(([question, answer]) => `<details class="faq-item"><summary>${question}</summary><p>${answer}</p></details>`).join("")}</section>`).join("");
    $("appendixNav").innerHTML = APPENDIX_SECTIONS.map((section, index) => `<button type="button" data-appendix-target="${section.id}" class="${index === 0 ? "active" : ""}">${section.title}</button>`).join("");
    $("appendixBody").innerHTML = APPENDIX_SECTIONS.map((section) => `<section id="appendix-${section.id}" class="appendix-section"><span class="eyebrow">Technical Appendix</span><h3>${section.title}</h3>${section.body}</section>`).join("");
    $("appendixNav").querySelectorAll("button").forEach((button) => button.addEventListener("click", () => {
      $("appendixNav").querySelectorAll("button").forEach((item) => item.classList.toggle("active", item === button));
      const target = $(`appendix-${button.dataset.appendixTarget}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
  }

  function setupInfoModals() {
    renderPublicationSupport();
    [["openFaqFooter", "faqModal"], ["openAppendixFooter", "appendixModal"], ["openFaqHelp", "faqModal"], ["openAppendixHelp", "appendixModal"]].forEach(([buttonId, modalId]) => {
      $(buttonId).addEventListener("click", () => openInfoModal(modalId));
    });
    document.querySelectorAll("[data-info-close]").forEach((item) => item.addEventListener("click", () => closeInfoModal(item.dataset.infoClose)));
    document.addEventListener("keydown", (event) => {
      const modal = document.querySelector('.cc-info-modal[aria-hidden="false"]');
      if (!modal) return;
      if (event.key === "Escape") closeInfoModal(modal.id);
      if (event.key === "Tab") trapInfoFocus(event, modal);
    });
  }

  function openInfoModal(modalId) {
    const modal = $(modalId);
    if (!modal) return;
    const helpWasOpen = $("helpModal").getAttribute("aria-hidden") === "false";
    infoReturnFocus = helpWasOpen ? $("openHelp") : document.activeElement;
    $("helpModal").setAttribute("aria-hidden", "true");
    document.querySelectorAll(".cc-info-modal").forEach((item) => item.setAttribute("aria-hidden", item === modal ? "false" : "true"));
    document.body.classList.add("modal-open");
    if (modalId === "appendixModal") {
      $("appendixBody").scrollTop = 0;
      $("appendixNav").scrollLeft = 0;
      $("appendixNav").querySelectorAll("button").forEach((button, index) => button.classList.toggle("active", index === 0));
    }
    const closeButton = modal.querySelector(".cc-info-close");
    if (closeButton) closeButton.focus();
  }

  function closeInfoModal(modalId) {
    const modal = $(modalId);
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    if (!document.querySelector('.cc-info-modal[aria-hidden="false"]') && $("helpModal").getAttribute("aria-hidden") === "true") document.body.classList.remove("modal-open");
    if (infoReturnFocus) infoReturnFocus.focus();
  }

  function trapInfoFocus(event, modal) {
    const focusable = Array.from(modal.querySelectorAll("button:not([disabled]), summary"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function populateControls() {
    $("modeBar").innerHTML = MODES.map((m) => `<button type="button" data-mode="${m.id}">${m.label}</button>`).join("");
    $("modeBar").querySelectorAll("button").forEach((btn) => btn.addEventListener("click", () => {
      state.mode = btn.dataset.mode;
      setDefaultsForMode();
      populateDynamicSelects();
      render();
    }));
    $("modeSelect").innerHTML = MODES.map((m) => `<option value="${m.id}">${m.label}</option>`).join("");
    $("targetSelect").innerHTML = TARGETS.map((t) => `<option value="${t.id}">${t.name}</option>`).join("");
    $("bortleSelect").innerHTML = Array.from({ length: 9 }, (_, i) => `<option value="${i + 1}">Bortle ${i + 1}</option>`).join("");
    $("lpSelect").innerHTML = LP_PRESETS.map((p) => `<option value="${p.id}">${p.name}</option>`).join("");
    $("additionalFilterSelect").innerHTML = ADDITIONAL_FILTERS.map((f) => `<option value="${f.id}">${f.name}</option>`).join("");
    buildCustomMix();
    ["modeSelect", "cameraSelect", "filterSelect", "additionalFilterSelect", "targetSelect", "bortleSelect", "lpSelect"].forEach((id) => {
      $(id).addEventListener("change", (event) => {
        const value = event.target.value;
        if (id === "modeSelect") { state.mode = value; setDefaultsForMode(); populateDynamicSelects(); }
        if (id === "cameraSelect") state.camera = value;
        if (id === "filterSelect") { state.filter = value; applyAdditionalFilterRules(); }
        if (id === "additionalFilterSelect") state.additionalFilter = value;
        if (id === "targetSelect") state.target = value;
        if (id === "bortleSelect") state.bortle = Number(value);
        if (id === "lpSelect") state.lp = value;
        render();
      });
    });
    ["centerShift", "transmissionScale", "moonPhase", "haze"].forEach((id) => {
      $(id).addEventListener("input", (event) => { state.advanced[id] = Number(event.target.value); render(); });
    });
    ["normalizeRows", "showAllLabels", "extendRange"].forEach((id) => {
      $(id).addEventListener("change", (event) => { state.advanced[id] = event.target.checked; render(); });
    });
    $("resetBtn").addEventListener("click", reset);
    $("openHelp").addEventListener("click", () => openHelp(0));
    $("exportBtn").addEventListener("click", exportState);
    $("captureBtn").addEventListener("click", exportFullPageCapture);
    $("printBtn").addEventListener("click", printFullPageReport);
    $("storyViewBtn").addEventListener("click", () => { state.view = "story"; render(); });
    $("overlayViewBtn").addEventListener("click", () => { state.view = "overlay"; render(); });
    $("focusModeBtn").addEventListener("click", () => { state.focusMode = !state.focusMode; syncViewControls(); });
    $("toggleTakeaway").addEventListener("click", () => setTakeaway(false));
    $("showTakeaway").addEventListener("click", () => setTakeaway(true));
    setupHelpModal();
    setupInfoModals();
    populateDynamicSelects();
  }

  function populateDynamicSelects() {
    const mode = getMode();
    const cameras = CAMERAS.filter((c) => c.type === mode.cameraType);
    const filters = FILTER_SETS.filter((f) => mode.filterTypes.includes(f.type));
    $("cameraSelect").innerHTML = cameras.map((c) => `<option value="${c.id}">${c.name}</option>`).join("");
    $("filterSelect").innerHTML = filters.map((f) => `<option value="${f.id}">${f.name}</option>`).join("");
    if (!cameras.some((c) => c.id === state.camera)) state.camera = cameras[0].id;
    if (!filters.some((f) => f.id === state.filter)) state.filter = filters[0].id;
    applyAdditionalFilterRules();
  }

  function applyAdditionalFilterRules() {
    const filter = getFilter();
    if (filter && filter.includesUvIrBlocking) state.additionalFilter = "none";
  }

  function setDefaultsForMode() {
    if (state.mode === "osc_lp") Object.assign(state, { camera: "asi2600mc_pro", filter: "optolong_lpro", additionalFilter: "none", target: "galaxy" });
    if (state.mode === "osc_narrowband") Object.assign(state, { camera: "asi2600mc_pro", filter: "optolong_lextreme", additionalFilter: "none", target: "emission_nebula" });
    if (state.mode === "broadband_mono") Object.assign(state, { camera: "asi2600mm_pro", filter: "zwo_lrgb_gen2", additionalFilter: "none", target: "galaxy" });
    if (state.mode === "narrowband_mono") Object.assign(state, { camera: "asi2600mm_pro", filter: "astronomik_6nm_sho", additionalFilter: "none", target: "emission_nebula" });
    if (state.mode === "osc_broadband") Object.assign(state, { camera: "asi2600mc_pro", filter: "no_filter", additionalFilter: "generic_uv_ir_cut", target: "galaxy" });
  }

  function syncSelectValues() {
    $("modeSelect").value = state.mode;
    $("cameraSelect").value = state.camera;
    $("filterSelect").value = state.filter;
    $("additionalFilterSelect").value = state.additionalFilter;
    $("targetSelect").value = state.target;
    $("bortleSelect").value = String(state.bortle);
    $("lpSelect").value = state.lp;
    ["centerShift", "transmissionScale", "moonPhase", "haze"].forEach((id) => { $(id).value = state.advanced[id]; });
    ["normalizeRows", "showAllLabels", "extendRange"].forEach((id) => { $(id).checked = state.advanced[id]; });
    $("modeBar").querySelectorAll("button").forEach((btn) => btn.classList.toggle("active", btn.dataset.mode === state.mode));
    const camera = getCamera();
    const filter = getFilter();
    const additional = getAdditionalFilter();
    const controlLabels = MODE_CONTROL_LABELS[state.mode] || MODE_CONTROL_LABELS.osc_narrowband;
    $("cameraControlLabel").textContent = controlLabels.cameraLabel;
    $("filterControlLabel").textContent = controlLabels.primaryFilterLabel;
    $("filterHelper").textContent = controlLabels.primaryFilterHelper;
    $("additionalFilterControlLabel").textContent = controlLabels.additionalFilterLabel;
    $("additionalFilterHelper").textContent = "Optional cleanup filter applied in addition to the primary imaging filter.";
    $("cameraNote").textContent = `${camera.sensor}, ${camera.pixelSizeMicrons} micron pixels • ${curveProvenance(camera, "camera")}`;
    $("filterNote").textContent = `${filter.note} • ${curveProvenance(filter, "filter")}`;
    $("additionalFilterSelect").disabled = filter.includesUvIrBlocking;
    $("additionalFilterNote").textContent = filter.includesUvIrBlocking
      ? "The selected primary filter already defines visible or narrowband blocking, so an additional UV/IR cut filter is not applied in this model."
      : additional.id === "generic_uv_ir_cut"
        ? "Spectral cleanup active: visible light passes while modeled UV/IR leakage is reduced. Generic relative approximation."
        : "No cleanup filter selected. The camera can see its full modeled spectral range, including possible out-of-band UV/IR response.";
    $("centerShiftValue").textContent = `${Number(state.advanced.centerShift).toFixed(1)} nm`;
    $("transmissionScaleValue").textContent = `${Math.round(state.advanced.transmissionScale)}%`;
    $("moonPhaseValue").textContent = `${Math.round(state.advanced.moonPhase)}%`;
    $("hazeValue").textContent = `${Math.round(state.advanced.haze)}%`;
  }

  function buildCustomMix() {
    const labels = { warmLed: "Warm LED", coolLed: "Cool LED", sodium: "High Pressure Sodium", lowSodium: "Low Pressure Sodium", mercury: "Mercury Vapor", metal: "Metal Halide", natural: "Natural Airglow" };
    $("customMix").innerHTML = Object.keys(labels).map((key) => `<label><span>${labels[key]}</span><input type="range" min="0" max="100" value="${state.advanced.customMix[key]}" data-mix="${key}"></label>`).join("");
    $("customMix").querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", (event) => {
        state.advanced.customMix[event.target.dataset.mix] = Number(event.target.value);
        state.lp = "custom";
        render();
      });
    });
  }

  function reset() {
    Object.assign(state, { mode: "osc_narrowband", camera: "asi2600mc_pro", filter: "optolong_lextreme", additionalFilter: "none", target: "emission_nebula", bortle: 6, lp: "mixed_suburban", tab: "overview", view: "story", takeawayOpen: true });
    Object.assign(state.advanced, { centerShift: 0, transmissionScale: 100, moonPhase: 15, haze: 20, normalizeRows: true, showAllLabels: false, extendRange: false });
    populateDynamicSelects();
    render();
  }

  function exportState() {
    const payload = JSON.stringify({ ...state, exportedAt: new Date().toISOString(), app: "Astro Spectral Explorer v1.0" }, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "astro-spectral-explorer-state.json";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function ensureSnapshotLibrary() {
    if (window.htmlToImage && typeof window.htmlToImage.toBlob === "function") {
      return Promise.resolve(window.htmlToImage);
    }
    if (snapshotLibPromise) return snapshotLibPromise;
    snapshotLibPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SNAPSHOT_LIB_URL;
      script.async = true;
      script.onload = () => {
        if (window.htmlToImage && typeof window.htmlToImage.toBlob === "function") {
          resolve(window.htmlToImage);
        } else {
          reject(new Error("the snapshot helper failed to initialize"));
        }
      };
      script.onerror = () => reject(new Error("the snapshot helper could not be loaded"));
      document.head.appendChild(script);
    });
    return snapshotLibPromise;
  }

  async function waitForCaptureLayout() {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (_error) {
        // Continue with available fonts.
      }
    }
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function exportFullPageCapture() {
    const button = $("captureBtn");
    const target = document.querySelector(".app-shell");
    if (!button || !target) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Preparing Capture...";
    document.body.classList.add("capture-mode");

    try {
      const htmlToImage = await ensureSnapshotLibrary();
      await waitForCaptureLayout();
      button.textContent = "Rendering PNG...";
      const blob = await htmlToImage.toBlob(target, {
        cacheBust: true,
        backgroundColor: "#070a10",
        pixelRatio: 1,
        width: target.scrollWidth,
        height: target.scrollHeight
      });
      if (!blob) throw new Error("the browser could not encode the PNG");
      const date = new Date().toISOString().slice(0, 10);
      downloadBlob(blob, `astro-spectra-explorer-full-page-${date}.png`);
    } catch (error) {
      snapshotLibPromise = null;
      alert(`Full-page capture failed because ${error.message}. Chrome's Developer Tools "Capture full size screenshot" is a reliable fallback.`);
    } finally {
      document.body.classList.remove("capture-mode");
      button.disabled = false;
      button.textContent = originalText;
    }
  }

  async function printFullPageReport() {
    const button = $("printBtn");
    if (!button) return;

    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Preparing PDF...";
    document.body.classList.add("print-mode");

    const restore = () => {
      document.body.classList.remove("print-mode");
      button.disabled = false;
      button.textContent = originalText;
      window.removeEventListener("afterprint", restore);
    };

    window.addEventListener("afterprint", restore);
    await waitForCaptureLayout();
    button.textContent = "Opening Print Dialog...";
    window.print();
  }

  populateControls();
  render();
}());
