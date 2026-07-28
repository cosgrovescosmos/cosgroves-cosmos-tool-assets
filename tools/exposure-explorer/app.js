/* Generated from Exposure-Tradeoff-Explorer-v1.0.52.html (v1.0.52). Do not edit by hand. */
(function(){
  const embedParams = new URLSearchParams(window.location.search);
  if (embedParams.get("embed") === "1") {
    document.documentElement.classList.add("embedded-host");
    document.body.classList.add("embedded-host");
  }
  const root = document.getElementById('exposure-tool');
  if (!root) return;
  if (root.dataset.exposureExplorerMounted === '1') return;
  root.dataset.exposureExplorerMounted = '1';
  const mountScript = document.currentScript || Array.from(document.scripts).find((script) => /\/tools\/exposure-explorer\/app\.js(?:\?|$)/.test(script.src || ""));
  const appBaseUrl = mountScript?.src ? new URL("./", mountScript.src).href : new URL("./", document.baseURI).href;
  function toolAssetUrl(relativePath) {
    return new URL(relativePath, appBaseUrl).href;
  }
  root.innerHTML = `<section class="hero">
      <div class="hero-inner">
        <div class="hero-copy">
          <div class="hero-title">
            <h1>Astro Exposure Explorer</h1>
            <span class="hero-version">v1.0.53</span>
          </div>
          <p>Estimate sub-exposure regimes for a single imaging system under the selected conditions.</p>
          <div class="hero-support">Shows where read noise dominates, where efficiency improves, and where saturation or workflow cost begins to outweigh longer subs.</div>
        </div>
        <img class="hero-logo" src="./assets/logo.png" alt="Astro Exposure Explorer logo" />
      </div>
    </section>

    <div class="layout">
      <aside class="setup card" id="setupPanel"></aside>
      <main class="results" id="resultsPanel"></main>
    </div>`;

  const isEmbedMode = document.body.classList.contains("embedded-host");
  let iframeResizeTimer = 0;
  let lastSentIframeHeight = 0;
  function sendHeightToParent() {
    if (!window.parent || window.parent === window) return;
    const rootBox = root.getBoundingClientRect();
    const bodyBox = document.body.getBoundingClientRect();
    const bodyStyles = window.getComputedStyle(document.body);
    const bodyPaddingBottom = parseFloat(bodyStyles.paddingBottom || "0") || 0;
    const height = Math.ceil(isEmbedMode
      ? Math.max(rootBox.bottom - bodyBox.top + bodyPaddingBottom, root.scrollHeight || 0)
      : Math.max(
          document.documentElement?.scrollHeight || 0,
          document.body?.scrollHeight || 0,
          document.documentElement?.offsetHeight || 0,
          document.body?.offsetHeight || 0
        )
    );
    if (!height) return;
    if (Math.abs(height - lastSentIframeHeight) <= 4) return;
    lastSentIframeHeight = height;
    window.parent.postMessage({ type: "exposureExplorerResize", height }, "*");
  }
  function scheduleHeightToParent() {
    if (iframeResizeTimer) window.clearTimeout(iframeResizeTimer);
    iframeResizeTimer = window.setTimeout(() => {
      iframeResizeTimer = 0;
      sendHeightToParent();
    }, 75);
  }
  window.addEventListener("load", scheduleHeightToParent);
  window.addEventListener("resize", scheduleHeightToParent);
  if ("ResizeObserver" in window) {
    const iframeResizeObserver = new ResizeObserver(scheduleHeightToParent);
    iframeResizeObserver.observe(root);
  }
  scheduleHeightToParent();

  const DATA = {
        defaults: {
          cameraId: "zwo-asi2600mm-pro",
          modeId: "auto",
          gain: 100,
          tempC: -15,
          apertureMm: 132,
          focalLengthMm: 924,
          fRatio: 7.0,
          throughputFrac: 0.82,
          customThroughputOverrideEnabled: false,
          customThroughputOverridePct: 82,
          throughputAdvancedOpen: false,
          throughputOverrideStatus: "",
          throughputOverrideStatusLevel: "neutral",
          centralObstructionFrac: 0,
          filterSetId: "broadband-lrgb-zwo",
          selectedFilters: ["zwo-l", "zwo-r", "zwo-g", "zwo-b"],
          activeFilterId: "zwo-l",
          calibrationFilterId: "zwo-l",
          configLoadedFileName: "",
          configDirtySinceLoad: false,
          skyInputMode: "bortle",
          skySpectralProfileId: "legacy-flat",
          skyBrightnessMagPerArcsec2: 20.8,
          sqmMeasurementMagPerArcsec2: 20.8,
          locationQuery: "",
          siteLatitudeDeg: 35.3,
          siteLongitudeDeg: -80.7,
          locationLookupLabel: "Manual site entry",
          locationLookupStatus: "Location is only used for computed moon geometry.",
          locationContextType: "unknown",
          bortleClass: 5,
          seeingArcsecFwhm: 2.5,
          planningDateTimeLocal: new Date().toISOString().slice(0,16),
          targetRaHours: 5.58,
          targetDecDeg: -5.45,
          targetAltitudeDeg: 70,
          moonMode: "preset",
          moonGeometrySource: "manual",
          computedMoonOverride: false,
          sunAltitudeDeg: -30,
          darknessState: "astronomical_darkness",
          moonPreset: "moonless",
          moonIllumFrac: 0,
          moonAltitudeDeg: -20,
          moonSeparationDeg: 120,
          transparencyFactor: 1.0,
          fieldPresetId: "average_field",
          captureSequencing: "filter_blocks",
          filterBlockLengthSubs: 10,
          focusHandling: "focus_offsets_monitoring",
          ditherFrequency: "every_3",
          ditherSettleSec: 8,
          overheadAssumptionPreset: "typical",
          customEventOverheadSec: 10,
          badFrameRiskTolerance: "medium",
          fileCountPreference: "balanced",
          customFilterSwitchPenaltySec: null,
          frameOverheadSec: 8,
          rejectionRiskTolerance: "medium",
          saturationTolerance: "medium",
          subExposureStrategy: "balanced",
          exposureMode: "planning",
          readNoiseContributionTargetPct: 5,
          testExposureSec: 60,
          measuredBackgroundValue: 500,
          measuredBackgroundUnits: "adu",
          backgroundMeasurementStatus: "raw_mean",
          biasPedestalAdu: 500,
          trueGainEPerAdu: 0.27,
          bitDepthScalingMode: "native_1x",
          empiricalReadNoiseE: 0.75,
          optionalDarkCurrentEPerPxPerSec: null,
          empiricalCalibrationsByFilter: {},
          planName: "",
          planWeightPreset: "equal",
          planWeights: {},
          planStatus: "",
          planStatusLevel: "neutral",
          validationUnlocked: false,
          validationClickCount: 0,
          configIoStatus: "",
          configIoStatusLevel: "neutral",
          setupOpenSystem: true,
          setupOpenFilters: false,
          setupOpenSky: false,
          setupOpenWorkflow: false,
          setupOpenCalibration: false,
          setupOpenConfig: true,
          debugMode: true,
          activeMainTab: "recommendation"
        },
        constants: {
          readNoiseFloorFactor: 5.0,
          readNoiseFloorFactors: {
            broadband: 2.0,
            narrowband: 5.0
          },
          readNoiseContributionFactors: {
            10: 0.7,
            5: 1.0,
            2: 1.8
          },
          comfortMultipliers: {
            broadband_mono: 1.0,
            broadband_osc: 1.0,
            narrowband_6nm: 1.55,
            narrowband_3nm: 1.75
          },
          anchorBiasByBand: {
            broadband_luminance: 0.18,
            broadband_mono: 0.14,
            broadband_osc: 0.16,
            narrowband: 0.28
          },
          overheadEfficiencyTargets: {
            broadband: 0.85,
            narrowband: 0.92
          },
          saturationFractions: {
            caution: 0.65,
            hard: 0.95
          },
          skyPedestalReserveFractionsByBand: {
            broadband_luminance: {
              caution: 0.22,
              hard: 0.55
            },
            broadband_mono: {
              caution: 0.18,
              hard: 0.48
            },
            broadband_osc: {
              caution: 0.16,
              hard: 0.42
            },
            narrowband: {
              caution: 0.38,
              hard: 0.72
            }
          },
          sweetSpotCapFractionOfCaution: 0.82,
          workflowMaxSec: {
            broadband: 600,
            narrowband: 1800
          },
          captureBaseOverheadSec: 9,
          overheadAssumptionSeconds: {
            low: 5,
            typical: 10,
            high: 20
          },
          sequencingFocusSwitchPenaltySec: {
            filter_blocks: {
              refocus_every_change: 10,
              focus_offsets: 2,
              focus_offsets_monitoring: 2.5
            },
            filter_cycling: {
              refocus_every_change: 16,
              focus_offsets: 0.9,
              focus_offsets_monitoring: 1.1
            }
          },
          ditherFrequencyMultipliers: {
            off: 0,
            every_5: 0.1,
            every_3: 0.2,
            every_2: 0.34,
            every_1: 0.5
          },
          workflowCapBiasBySequencingFocus: {
            filter_blocks: {
              refocus_every_change: 1.0,
              focus_offsets: 0.98,
              focus_offsets_monitoring: 0.99
            },
            filter_cycling: {
              refocus_every_change: 1.06,
              focus_offsets: 1.0,
              focus_offsets_monitoring: 1.0
            }
          },
          fileCountPreferenceCapBias: {
            safer_shorter: 0.9,
            balanced: 1.0,
            fewer_files: 1.12
          },
          workflowAnchorBiasAdjustments: {
            filter_blocks: {
              refocus_every_change: 0.00,
              focus_offsets: -0.01,
              focus_offsets_monitoring: 0.00
            },
            filter_cycling: {
              refocus_every_change: 0.04,
              focus_offsets: 0.00,
              focus_offsets_monitoring: 0.00
            }
          },
          broadbandSkyPracticalCapLogScale: 0.12,
          broadbandSkyPracticalCapClamp: {
            min: 0.82,
            max: 1.15
          },
          broadbandSkyAnchorLogScale: 0.12,
          broadbandSkyAnchorAdjustmentClamp: {
            min: -0.06,
            max: 0.06
          },
          workflowRiskMultipliers: {
            low: 0.67,
            medium: 1.0,
            high: 1.5
          },
          saturationToleranceMultipliers: {
            low: 0.82,
            medium: 1.0,
            high: 1.18
          },
          sweetSpotCapFractions: {
            broadband: 0.94,
            narrowband: 0.82
          },
          extinctionCoefficients: {
            broadband: 0.20,
            narrowband: 0.12
          },
          skyReference: {
            fRatio: 5,
            skyBrightnessMagPerArcsec2: 21.5,
            altitudeDeg: 70,
            apertureMm: 130
          },
          referenceQe: {
            broadband: 0.75,
            narrowband: 0.60
          },
          narrowbandPracticalFloorSec: {
            aggressive: 120,
            balanced: 180,
            conservative: 240
          },
          chart: {
            targetMajorTicks: 8
          },
          gainSensitivityDamping: {
            narrowband: {
              readNoiseBoundaryScale: 8.0,
              operatingBandScale: 8.0,
              gainOnlyOperatingBandCapSec: 720,
              saturationHeadroomCapMultiplier: 1.65
            },
            broadband: {
              readNoiseBoundaryScale: 6.0,
              operatingBandScale: 6.5,
              gainOnlyOperatingBandCapSec: 360,
              saturationHeadroomCapMultiplier: 1.8
            }
          },
          chartRegimeMinWidthPct: 6
        },
        validationLimits: {
          imx571HaGain0AnchorMaxSec: 900
        },
        skyBaselines: {
          L: 0.80,
          R: 0.26,
          G: 0.33,
          B: 0.20,
          OSC_RGB: 0.24,
          Ha_6nm: 0.028,
          OIII_6nm: 0.040,
          SII_6nm: 0.018,
          Ha_3nm: 0.014,
          OIII_3nm: 0.020,
          SII_3nm: 0.009
        },
        bortleToSky: {
          1: 21.9, 2: 21.7, 3: 21.5, 4: 21.1, 5: 20.4,
          6: 19.5, 7: 18.8, 8: 18.1, 9: 17.5
        },
        skyComponents: {
          "natural-continuum": {
            id: "natural-continuum",
            label: "Natural continuum",
            kind: "continuum",
            curve: {400:0.80,430:0.88,460:0.94,500:1.00,530:0.96,560:0.90,590:0.86,620:0.88,650:0.96,680:1.00,710:0.92,750:0.84,800:0.74}
          },
          "mercury-lines": {
            id: "mercury-lines",
            label: "Mercury lines",
            kind: "lines",
            curve: {400:0.00,403.8:0.00,404.0:0.00,404.4:0.05,404.7:0.12,405.0:0.05,405.4:0.00,406.0:0.00,430:0.00,435.0:0.00,435.2:0.06,435.6:0.22,435.8:0.40,436.0:0.26,436.3:0.08,436.8:0.00,437.4:0.00,500:0.00,544.0:0.00,544.8:0.12,545.4:0.48,546.0:0.82,546.3:0.54,546.8:0.16,547.4:0.00,548.0:0.00,570:0.00,576.2:0.00,576.6:0.10,577.0:0.42,577.5:0.74,577.9:0.50,578.3:0.16,578.7:0.00,578.9:0.00,579.0:0.18,579.1:0.34,579.3:0.20,579.6:0.00,580.0:0.00,585.0:0.00,800:0.00}
          },
          "sodium-lines": {
            id: "sodium-lines",
            label: "Sodium lines",
            kind: "lines",
            curve: {400:0.00,500:0.00,585.4:0.00,586.0:0.00,586.6:0.10,587.4:0.40,588.1:0.90,588.7:1.34,589.0:1.58,589.3:1.40,589.6:1.20,589.9:0.82,590.3:0.40,591.0:0.12,591.6:0.00,592.0:0.00,614.8:0.00,615.1:0.08,615.4:0.16,615.7:0.09,616.0:0.05,616.1:0.12,616.4:0.07,616.8:0.00,800:0.00}
          },
          "led-heavy-continuum": {
            id: "led-heavy-continuum",
            label: "LED-heavy continuum",
            kind: "continuum",
            curve: {400:0.92,430:1.12,460:1.20,490:1.16,520:1.05,550:0.95,580:0.90,610:0.88,650:0.84,680:0.74,710:0.62,750:0.50,800:0.38}
          }
        },
        skyProfiles: {
          "legacy-flat": {
            id: "legacy-flat",
            label: "Legacy flat sky",
            kind: "compatibility",
            note: "Preserves the earlier scalar-only broadband path unless an LP spectral profile is selected.",
            curve: {400:1,450:1,500:1,550:1,600:1,650:1,700:1,750:1,800:1}
          },
          "dark-natural": {
            id: "dark-natural",
            label: "Dark natural sky",
            kind: "natural",
            note: "Representative dark-sky continuum with mild red/airglow weighting and very little artificial line structure.",
            components: {"natural-continuum":1.00}
          },
          "legacy-sodium-mercury": {
            id: "legacy-sodium-mercury",
            label: "Legacy sodium / mercury LP",
            kind: "urban-lines",
            note: "Older line-rich light pollution built from natural continuum plus explicit mercury and sodium lamp-line components.",
            components: {"natural-continuum":0.12,"mercury-lines":0.95,"sodium-lines":1.20}
          },
          "mixed-suburban": {
            id: "mixed-suburban",
            label: "Mixed suburban LP",
            kind: "mixed",
            note: "Representative suburban mix combining natural continuum, modest LED continuum, and weaker sodium/mercury lamp-line structure.",
            components: {"natural-continuum":0.78,"led-heavy-continuum":0.24,"mercury-lines":0.22,"sodium-lines":0.34}
          },
          "led-heavy-urban": {
            id: "led-heavy-urban",
            label: "LED-heavy urban LP",
            kind: "led",
            note: "Representative LED-dominated urban sky with broad modern-lighting continuum and modest residual lamp-line structure.",
            components: {"natural-continuum":0.34,"led-heavy-continuum":1.00,"mercury-lines":0.05,"sodium-lines":0.10}
          }
        },
        moonMultipliers: {
          moonless: { L:1.0, RGB:1.0, OSC_RGB:1.0, Ha:1.0, OIII:1.0, SII:1.0 },
          minor:    { L:1.4, RGB:1.2, OSC_RGB:1.2, Ha:1.02, OIII:1.10, SII:1.02 },
          moderate: { L:2.0, RGB:1.6, OSC_RGB:1.6, Ha:1.05, OIII:1.30, SII:1.05 },
          strong:   { L:3.5, RGB:2.4, OSC_RGB:2.4, Ha:1.10, OIII:1.70, SII:1.10 },
          severe:   { L:5.5, RGB:3.5, OSC_RGB:3.5, Ha:1.18, OIII:2.20, SII:1.15 }
        },
        scenarioPresets: {
          faint_field: {
            label: "Faint field",
            starCoreRateFactor: 0.5,
            description: "Sparse field, few bright stars"
          },
          average_field: {
            label: "Average field",
            starCoreRateFactor: 0.6,
            description: "Typical mixed field"
          },
          bright_star_field: {
            label: "Bright-star field",
            starCoreRateFactor: 1.8,
            description: "Embedded bright stars or dense stellar region"
          },
          extreme_bright_field: {
            label: "Extreme bright-star field",
            starCoreRateFactor: 3.0,
            description: "Very bright stars likely to clip quickly"
          }
        },
        filterProfiles: {
          "baader-ha-3nm": { id:"baader-ha-3nm", mode:"narrowband", label:"Baader Ha 3.5nm", line:"Ha", compatible:["mono"], curve:{649:1,653:10,655:50,656:97,658:50,660:10,663:1} },
          "baader-oiii-3nm": { id:"baader-oiii-3nm", mode:"narrowband", label:"Baader OIII 4nm", line:"OIII", compatible:["mono"], curve:{493:1,497:10,499:50,501:97,503:50,505:10,509:1} },
          "baader-sii-3nm": { id:"baader-sii-3nm", mode:"narrowband", label:"Baader SII 4nm", line:"SII", compatible:["mono"], curve:{664:1,668:10,670:50,672:97,674:50,676:10,680:1} },
          "baader-ha-6nm": { id:"baader-ha-6nm", mode:"narrowband", label:"Baader Ha 6.5nm", line:"Ha", compatible:["mono"], curve:{643:1,650:10,653:50,656:97,660:50,663:10,669:1} },
          "baader-oiii-6nm": { id:"baader-oiii-6nm", mode:"narrowband", label:"Baader OIII 6.5nm", line:"OIII", compatible:["mono"], curve:{488:1,494:10,497:50,501:97,504:50,507:10,514:1} },
          "baader-sii-6nm": { id:"baader-sii-6nm", mode:"narrowband", label:"Baader SII 6.5nm", line:"SII", compatible:["mono"], curve:{659:1,665:10,668:50,672:97,675:50,678:10,685:1} },
          "chroma-ha-3nm": {id:"chroma-ha-3nm", mode:"narrowband", label:"Chroma Ha 3nm", line:"Ha", compatible:["mono"], curve:{640:1.792e-9,640.2:1.983e-9,640.4:2.199e-9,640.6:2.444e-9,640.8:2.722e-9,641:3.038e-9,641.2:3.399e-9,641.4:3.811e-9,641.6:4.284e-9,641.8:4.826e-9,642:5.451e-9,642.2:6.173e-9,642.4:7.009e-9,642.6:7.978e-9,642.8:9.107e-9,643:1.042e-8,643.2:1.197e-8,643.4:1.377e-8,643.6:1.590e-8,643.8:1.841e-8,644:2.138e-8,644.2:2.491e-8,644.4:2.910e-8,644.6:3.411e-8,644.8:4.010e-8,645:4.729e-8,645.2:5.594e-8,645.4:6.639e-8,645.6:7.907e-8,645.8:9.450e-8,646:1.134e-7,646.2:1.366e-7,646.4:1.652e-7,646.6:2.006e-7,646.8:2.449e-7,647:3.004e-7,647.2:3.704e-7,647.4:4.594e-7,647.6:5.734e-7,647.8:7.202e-7,648:9.111e-7,648.2:1.161e-6,648.4:1.492e-6,648.6:1.934e-6,648.8:2.531e-6,649:3.344e-6,649.2:4.465e-6,649.4:6.030e-6,649.6:8.244e-6,649.8:1.142e-5,650:1.603e-5,650.2:2.282e-5,650.4:3.301e-5,650.6:4.856e-5,650.8:7.278e-5,651:1.113e-4,651.2:1.738e-4,651.4:2.780e-4,651.6:4.563e-4,651.8:7.707e-4,652:0.001343,652.2:0.002425,652.4:0.004557,652.6:0.008959,652.8:0.01856,653:0.04087,653.2:0.09682,653.4:0.2506,653.6:0.7226,653.8:2.359,654:8.353,654.2:25.29,654.4:52.25,654.6:78.8,654.8:95.28,655:99.47,655.2:99.78,655.4:99.76,655.6:99.76,655.8:99.82,656:99.9,656.2:99.94,656.4:99.89,656.6:99.81,656.8:99.68,657:97.89,657.2:88.67,657.4:68.37,657.6:41.94,657.8:18.71,658:6.511,658.2:2.219,658.4:0.8207,658.6:0.3324,658.8:0.1456,659:0.06805,659.2:0.0336,659.4:0.01738,659.6:0.009361,659.8:0.005224,660:0.00301,660.2:0.001785,660.4:0.001087,660.6:6.773e-4,660.8:4.315e-4,661:2.805e-4,661.2:1.857e-4,661.4:1.252e-4,661.6:8.571e-5,661.8:5.960e-5,662:4.203e-5,662.2:3.004e-5,662.4:2.174e-5,662.6:1.592e-5,662.8:1.178e-5,663:8.811e-6,663.2:6.654e-6,663.4:5.070e-6,663.6:3.896e-6,663.8:3.018e-6,664:2.356e-6,664.2:1.851e-6,664.4:1.464e-6,664.6:1.166e-6,664.8:9.331e-7,665:7.509e-7,665.2:6.076e-7,665.4:4.939e-7,665.6:4.033e-7,665.8:3.306e-7,666:2.721e-7,666.2:2.248e-7,666.4:1.864e-7,666.6:1.551e-7,666.8:1.294e-7,667:1.083e-7,667.2:9.093e-8,667.4:7.655e-8,667.6:6.463e-8,667.8:5.471e-8,668:4.643e-8,668.2:3.951e-8,668.4:3.371e-8,668.6:2.883e-8,668.8:2.472e-8,669:2.125e-8,669.2:1.831e-8,669.4:1.582e-8,669.6:1.370e-8,669.8:1.190e-8,670:1.035e-8,670.2:9.037e-9,670.4:7.907e-9,670.6:6.936e-9,670.8:6.100e-9,671:5.379e-9,671.2:4.755e-9,671.4:4.214e-9,671.6:3.745e-9,671.8:3.336e-9,672:2.980e-9,672.2:2.669e-9,672.4:2.396e-9,672.6:2.157e-9,672.8:1.946e-9,673:1.761e-9,673.2:1.597e-9,673.4:1.452e-9,673.6:1.323e-9,673.8:1.209e-9,674:1.107e-9,674.2:1.015e-9,674.4:9.337e-10,674.6:8.604e-10,674.8:7.943e-10,675:7.347e-10}},
          "chroma-oiii-3nm": {id:"chroma-oiii-3nm", mode:"narrowband", label:"Chroma OIII 3nm", line:"OIII", compatible:["mono"], curve:{490:1.503e-7,490.2:1.810e-7,490.4:2.226e-7,490.6:2.797e-7,490.8:3.588e-7,491:4.685e-7,491.2:6.200e-7,491.4:8.265e-7,491.6:1.101e-6,491.8:1.455e-6,492:1.893e-6,492.2:2.417e-6,492.4:3.028e-6,492.6:3.737e-6,492.8:4.577e-6,493:5.610e-6,493.2:6.937e-6,493.4:8.715e-6,493.6:1.118e-5,493.8:1.469e-5,494:1.982e-5,494.2:2.745e-5,494.4:3.898e-5,494.6:5.668e-5,494.8:8.408e-5,495:1.267e-4,495.2:1.926e-4,495.4:2.948e-4,495.6:4.524e-4,495.8:6.952e-4,496:0.001071,496.2:0.001659,496.4:0.002601,496.6:0.004151,496.8:0.006795,497:0.01149,497.2:0.02022,497.4:0.03728,497.6:0.07265,497.8:0.1512,498:0.3405,498.2:0.8455,498.4:2.364,498.6:7.443,498.8:23.2,499:53.41,499.2:83.43,499.4:97.42,499.6:99.07,499.8:99.04,500:99.2,500.2:99.28,500.4:99.21,500.6:99.07,500.8:98.94,501:98.8,501.2:98.68,501.4:98.81,501.6:94.69,501.8:74.96,502:42.72,502.2:16.02,502.4:5.044,502.6:1.758,502.8:0.7074,503:0.3195,503.2:0.1567,503.4:0.08115,503.6:0.04343,503.8:0.02368,504:0.01308,504.2:0.007308,504.4:0.004155,504.6:0.002418,504.8:0.001448,505:8.968e-4,505.2:5.765e-4,505.4:3.840e-4,505.6:2.647e-4,505.8:1.885e-4,506:1.382e-4,506.2:1.038e-4,506.4:7.944e-5,506.6:6.150e-5,506.8:4.781e-5,507:3.707e-5,507.2:2.850e-5,507.4:2.167e-5,507.6:1.629e-5,507.8:1.215e-5,508:9.026e-6,508.2:6.722e-6,508.4:5.047e-6,508.6:3.838e-6,508.8:2.966e-6,509:2.335e-6,509.2:1.875e-6,509.4:1.535e-6,509.6:1.282e-6,509.8:1.089e-6,510:9.402e-7,510.2:8.227e-7,510.4:7.266e-7,510.6:6.451e-7,510.8:5.735e-7,511:5.084e-7,511.2:4.480e-7,511.4:3.916e-7,511.6:3.393e-7,511.8:2.916e-7,512:2.493e-7,512.2:2.125e-7,512.4:1.813e-7,512.6:1.553e-7,512.8:1.340e-7,513:1.166e-7,513.2:1.025e-7,513.4:9.106e-8,513.6:8.178e-8,513.8:7.418e-8,514:6.787e-8,514.2:6.253e-8,514.4:5.788e-8,514.6:5.370e-8,514.8:4.982e-8,515:4.612e-8}},
          "chroma-sii-3nm": {id:"chroma-sii-3nm", mode:"narrowband", label:"Chroma SII 3nm", line:"SII", compatible:["mono"], curve:{655:3.716e-9,655.2:3.872e-9,655.4:4.055e-9,655.6:4.275e-9,655.8:4.545e-9,656:4.877e-9,656.2:5.287e-9,656.4:5.791e-9,656.6:6.410e-9,656.8:7.171e-9,657:8.103e-9,657.2:9.247e-9,657.4:1.065e-8,657.6:1.237e-8,657.8:1.448e-8,658:1.706e-8,658.2:2.021e-8,658.4:2.403e-8,658.6:2.866e-8,658.8:3.423e-8,659:4.087e-8,659.2:4.875e-8,659.4:5.802e-8,659.6:6.886e-8,659.8:8.148e-8,660:9.612e-8,660.2:1.131e-7,660.4:1.328e-7,660.6:1.560e-7,660.8:1.832e-7,661:2.156e-7,661.2:2.544e-7,661.4:3.014e-7,661.6:3.589e-7,661.8:4.297e-7,662:5.175e-7,662.2:6.273e-7,662.4:7.651e-7,662.6:9.390e-7,662.8:1.159e-6,663:1.439e-6,663.2:1.796e-6,663.4:2.252e-6,663.6:2.836e-6,663.8:3.586e-6,664:4.552e-6,664.2:5.804e-6,664.4:7.431e-6,664.6:9.563e-6,664.8:1.238e-5,665:1.613e-5,665.2:2.117e-5,665.4:2.805e-5,665.6:3.756e-5,665.8:5.088e-5,666:6.987e-5,666.2:9.736e-5,666.4:1.379e-4,666.6:1.987e-4,666.8:2.919e-4,667:4.377e-4,667.2:6.709e-4,667.4:0.001053,667.6:0.001694,667.8:0.002801,668:0.004771,668.2:0.008397,668.4:0.01533,668.6:0.02916,668.8:0.0582,669:0.123,669.2:0.2784,669.4:0.6853,669.6:1.859,669.8:5.475,670:15.37,670.2:33.57,670.4:55.89,670.6:77.1,670.8:92.66,671:98.89,671.2:99.79,671.4:99.81,671.6:99.79,671.8:99.76,672:99.77,672.2:99.81,672.4:99.8,672.6:99.76,672.8:99.71,673:98.04,673.2:89.83,673.4:73.17,673.6:51.73,673.8:29.45,674:12.21,674.2:4.194,674.4:1.503,674.6:0.6028,674.8:0.2694,675:0.1319,675.2:0.06959,675.4:0.03903,675.6:0.023,675.8:0.0141,676:0.008909,676.2:0.005753,676.4:0.003769,676.6:0.002489,676.8:0.001649,677:0.001093,677.2:7.229e-4,677.4:4.778e-4,677.6:3.161e-4,677.8:2.097e-4,678:1.400e-4,678.2:9.429e-5,678.4:6.417e-5,678.6:4.422e-5,678.8:3.088e-5,679:2.186e-5,679.2:1.569e-5,679.4:1.142e-5,679.6:8.422e-6,679.8:6.289e-6,680:4.752e-6,680.2:3.632e-6,680.4:2.804e-6,680.6:2.186e-6,680.8:1.718e-6,681:1.361e-6,681.2:1.085e-6,681.4:8.712e-7,681.6:7.033e-7,681.8:5.707e-7,682:4.654e-7,682.2:3.813e-7,682.4:3.138e-7,682.6:2.594e-7,682.8:2.154e-7,683:1.797e-7,683.2:1.507e-7,683.4:1.270e-7,683.6:1.076e-7,683.8:9.165e-8,684:7.855e-8,684.2:6.775e-8,684.4:5.880e-8,684.6:5.136e-8,684.8:4.516e-8,685:3.998e-8,685.2:3.562e-8,685.4:3.194e-8,685.6:2.881e-8,685.8:2.614e-8,686:2.384e-8,686.2:2.184e-8,686.4:2.009e-8,686.6:1.853e-8,686.8:1.713e-8,687:1.586e-8,687.2:1.468e-8,687.4:1.357e-8,687.6:1.253e-8,687.8:1.154e-8,688:1.060e-8,688.2:9.697e-9,688.4:8.844e-9,688.6:8.041e-9,688.8:7.291e-9,689:6.598e-9,689.2:5.963e-9,689.4:5.387e-9,689.6:4.869e-9,689.8:4.407e-9,690:3.998e-9}},
          "chroma-ha-5nm": { id:"chroma-ha-5nm", mode:"narrowband", label:"Chroma Ha 5nm", line:"Ha", compatible:["mono"], curve:{640:0,650.6:0.01,650.8:0.014,651.8:0.096,652:0.15,652.5:0.527,652.8:1.249,653.3:6.474,653.6:18.962,653.9:49.386,654.2:84.797,654.4:95.979,654.6:99.349,655.7:99.961,658.3:99.682,658.5:97.591,658.7:89.36,658.9:70.574,659.1:45.453,659.3:24.91,659.5:12.773,659.7:6.563,660.2:1.464,660.7:0.427,661.5:0.094,663.1:0.009,670:0} },
          "chroma-oiii-5nm": { id:"chroma-oiii-5nm", mode:"narrowband", label:"Chroma OIII 5nm", line:"OIII", compatible:["mono"], curve:{490:0.011,494:0.092,494.2:0.12,495.1:0.478,495.3:0.67,495.6:1.099,497:4.816,497.8:11.391,498.2:20.453,498.8:52.015,499.2:80.506,499.6:96.336,499.9:99.424,501.2:99.836,502.5:99.042,502.8:96.253,503.1:88.666,503.3:79.181,503.7:49.903,504.1:22.718,504.4:11.369,504.7:5.709,505.5:1.179,506.1:0.488,509.1:0.095,510:0.042} },
          "chroma-sii-5nm": { id:"chroma-sii-5nm", mode:"narrowband", label:"Chroma SII 5nm", line:"SII", compatible:["mono"], curve:{660:0,662.6:0.01,662.8:0.011,666.4:0.095,666.6:0.117,667.7:0.484,667.9:0.664,668.2:1.101,668.9:4.314,669.3:10.893,669.7:28.902,670:54.772,670.3:81.878,670.6:96.309,670.8:99.209,673:99.863,673.7:98.076,674:94.892,674.2:90.312,674.5:76.542,674.9:45.929,675.3:20.533,675.6:10.467,675.9:5.391,676.7:1.096,677.2:0.48,678.5:0.092,680:0.026} },
          "chroma-ha-8nm": { id:"chroma-ha-8nm", mode:"narrowband", label:"Chroma Ha 8nm", line:"Ha", compatible:["mono"], curve:{640:0.015,645.5:0.102,647.8:0.529,648.8:1.098,650.8:5.128,651.6:11.084,652.2:21.415,653:51.392,653.6:80.693,654:93.123,654.5:98.769,656.3:99.975,658.7:98.431,659.1:93.934,659.3:89.655,659.6:80.136,660.2:53.34,661.1:21.095,661.7:11.048,662.5:5.042,664.4:1.021,665.2:0.531,667.4:0.102,670:0.032} },
          "chroma-oiii-8nm": { id:"chroma-oiii-8nm", mode:"narrowband", label:"Chroma OIII 8nm", line:"OIII", compatible:["mono"], curve:{490:0.029,492.4:0.107,493.5:0.547,493.9:1.082,495.1:5.268,495.9:10.293,496.7:21.059,497.6:51.227,498.2:80.348,498.6:93.353,499.1:99.14,501.7:99.853,503.4:98.14,503.7:94.115,503.9:88.629,504.1:80.246,504.6:50.711,505.2:22.536,505.8:10.268,506.5:5.167,508.9:1.025,509.4:0.549,510:0.272} },
          "chroma-sii-8nm": { id:"chroma-sii-8nm", mode:"narrowband", label:"Chroma SII 8nm", line:"SII", compatible:["mono"], curve:{660:0.033,662.2:0.105,664.2:0.516,665:1.073,666.5:5.129,667.1:10.336,667.7:20.847,668.6:50.704,669.4:80.96,669.8:91.137,670.2:96.929,670.5:98.984,672.6:99.985,674.5:98.159,674.8:94.996,675.1:89.099,675.4:80.059,676.1:51.693,677.1:20.93,677.8:10.927,678.7:5.084,680:1.866} },
          "antlia-ha-4p5nm": { id:"antlia-ha-4p5nm", mode:"narrowband", label:"Antlia Ha 4.5nm EDGE", line:"Ha", compatible:["mono"], curve:{652.5:0,653.5:20,654.4:70,655.2:90,656.3:93,657.4:90,658.2:70,659.1:20,660.1:0} },
          "antlia-oiii-4p5nm": { id:"antlia-oiii-4p5nm", mode:"narrowband", label:"Antlia OIII 4.5nm EDGE", line:"OIII", compatible:["mono"], curve:{497.0:0,497.9:15,498.8:78,499.7:89,500.7:90,501.7:89,502.6:78,503.5:15,504.4:0} },
          "antlia-sii-4p5nm": { id:"antlia-sii-4p5nm", mode:"narrowband", label:"Antlia SII 4.5nm EDGE", line:"SII", compatible:["mono"], curve:{668.6:0,669.6:20,670.5:70,671.3:90,672.4:93,673.5:90,674.3:70,675.2:20,676.2:0} },
          "antlia-ha-3nm":   {id:"antlia-ha-3nm",   mode:"narrowband", label:"Antlia Ha 3nm Pro",   line:"Ha", compatible:["mono"], curve:{653.6:0,654.4:10,655.0:50,655.6:86,656.3:91,657.0:86,657.6:50,658.2:10,659.0:0}},
          "antlia-oiii-3nm": {id:"antlia-oiii-3nm", mode:"narrowband", label:"Antlia OIII 3nm Pro", line:"OIII", compatible:["mono"], curve:{498.0:0,498.8:10,499.4:50,500.0:86,500.7:91,501.4:86,502.0:50,502.6:10,503.4:0}},
          "antlia-sii-3nm":  {id:"antlia-sii-3nm",  mode:"narrowband", label:"Antlia SII 3nm Pro",  line:"SII", compatible:["mono"], curve:{669.7:0,670.5:10,671.1:50,671.7:86,672.4:91,673.1:86,673.7:50,674.3:10,675.1:0}},
          "baader-l": { id:"baader-l", mode:"broadband", label:"Baader L CMOS", line:"L", compatible:["mono"], curve:{410:0,420:5,430:98,500:98,600:98,675:98,685:5,695:0} },
          "baader-r": { id:"baader-r", mode:"broadband", label:"Baader R CMOS", line:"R", compatible:["mono"], curve:{585:0,595:5,600:97,640:97,680:97,688:5,695:0} },
          "baader-g": { id:"baader-g", mode:"broadband", label:"Baader G CMOS", line:"G", compatible:["mono"], curve:{480:0,490:5,495:97,530:97,570:97,578:5,585:0} },
          "baader-b": { id:"baader-b", mode:"broadband", label:"Baader B CMOS", line:"B", compatible:["mono"], curve:{390:0,400:5,410:97,450:97,500:97,508:5,515:0} },
          "chroma-l": { id:"chroma-l", mode:"broadband", label:"Chroma L", line:"L", compatible:["mono"], curve:{390:0,400:5,410:97,500:97,600:97,690:97,700:5,710:0} },
          "chroma-r": { id:"chroma-r", mode:"broadband", label:"Chroma R", line:"R", compatible:["mono"], curve:{590:0,600:5,610:97,650:97,690:97,698:5,705:0} },
          "chroma-g": { id:"chroma-g", mode:"broadband", label:"Chroma G", line:"G", compatible:["mono"], curve:{490:0,500:5,510:97,540:97,590:97,598:5,605:0} },
          "chroma-b": { id:"chroma-b", mode:"broadband", label:"Chroma B", line:"B", compatible:["mono"], curve:{385:0,395:5,405:97,450:97,490:97,498:5,505:0} },
          "antlia-lrgb-l": {id:"antlia-lrgb-l", mode:"broadband", label:"Antlia LRGB-V L", line:"L", compatible:["mono"], curve:{390:0,405:8,420:95,500:95,600:95,680:94,692:8,705:0}},
          "antlia-lrgb-r": {id:"antlia-lrgb-r", mode:"broadband", label:"Antlia LRGB-V R", line:"R", compatible:["mono"], curve:{585:0,596:5,603:95,640:95,680:94,690:8,698:0}},
          "antlia-lrgb-g": {id:"antlia-lrgb-g", mode:"broadband", label:"Antlia LRGB-V G", line:"G", compatible:["mono"], curve:{485:0,495:5,500:95,530:95,575:95,582:6,588:0}},
          "antlia-lrgb-b": {id:"antlia-lrgb-b", mode:"broadband", label:"Antlia LRGB-V B", line:"B", compatible:["mono"], curve:{395:0,405:5,415:95,450:95,505:95,512:6,518:0}},
          "zwo-lrgb-l": { id:"zwo-lrgb-l", mode:"broadband", label:"ZWO L", line:"L", compatible:["mono"], curve:{380:0,400:5,420:93,500:94,600:94,680:93,700:5,720:0} },
          "zwo-lrgb-r": { id:"zwo-lrgb-r", mode:"broadband", label:"ZWO R", line:"R", compatible:["mono"], curve:{560:0,580:5,590:92,620:93,670:92,690:5,700:0} },
          "zwo-lrgb-g": { id:"zwo-lrgb-g", mode:"broadband", label:"ZWO G", line:"G", compatible:["mono"], curve:{480:0,495:5,505:93,540:93,570:92,585:5,595:0} },
          "zwo-lrgb-b": { id:"zwo-lrgb-b", mode:"broadband", label:"ZWO B", line:"B", compatible:["mono"], curve:{390:0,405:5,420:93,450:94,500:93,515:5,525:0} },
          "astronomik-l1": { id:"astronomik-l1", mode:"broadband", label:"Astronomik L-1", line:"L", compatible:["mono"], curve:{385:0,395:8,410:96,500:97,600:97,690:96,705:10,715:0} },
          "astronomik-l2": { id:"astronomik-l2", mode:"broadband", label:"Astronomik L-2", line:"L", compatible:["mono"], curve:{395:0,405:8,420:96,500:97,600:97,680:96,695:10,705:0} },
          "astronomik-l3": { id:"astronomik-l3", mode:"broadband", label:"Astronomik L-3", line:"L", compatible:["mono"], curve:{405:0,415:8,430:96,500:97,600:97,670:96,685:10,695:0} },
          "astronomik-r": { id:"astronomik-r", mode:"broadband", label:"Astronomik Deep-Sky R", line:"R", compatible:["mono"], curve:{585:0,600:5,605:95,630:96,660:95,675:90,690:5,700:0} },
          "astronomik-g": { id:"astronomik-g", mode:"broadband", label:"Astronomik Deep-Sky G", line:"G", compatible:["mono"], curve:{490:0,500:5,505:95,530:96,555:97,565:96,575:5,585:0} },
          "astronomik-b": { id:"astronomik-b", mode:"broadband", label:"Astronomik Deep-Sky B", line:"B", compatible:["mono"], curve:{410:0,420:5,425:95,450:96,480:96,495:95,505:5,515:0} },
          "osc-broad-uvir": { id:"osc-broad-uvir", mode:"broadband", label:"OSC Broadband with UV/IR Cut", shortLabel:"OSC UV/IR-Cut Broadband", line:"OSC", compatible:["osc"], filterFamily:"osc_broadband", filterRole:"uv_ir_cut_broadband", exposureBehavior:"broadband", workflowFamily:"osc_broadband", defaultThroughput:0.94, isNarrowbandLike:false, showIrLeakWarning:false, showUvIrPresentNote:true, curve:{380:0,395:2,405:45,415:88,430:94,500:95,560:95,620:94,650:94,670:90,680:62,690:22,700:5,710:0,800:0} },
          "osc-broad-seestar-lp": { id:"osc-broad-seestar-lp", mode:"broadband", label:"Seestar LP Broadband", line:"OSC", compatible:["osc"], curve:{478:0,482:20,485.7:50,490:78,495:88,500.7:90,506:88,511:78,515.7:50,519:20,523:0,638:0,642:20,646.3:50,650:80,654:90,656.3:92,658.6:90,662:80,666.3:50,670.5:20,674.5:0} },
          "osc-baader-neodymium-moon-skyglow": { id:"osc-baader-neodymium-moon-skyglow", mode:"broadband", label:"Baader IR-Cut Moon & Skyglow Neodymium", line:"OSC", compatible:["osc"], lpStyle:true, category:"broadband-lp", curve:{390:0,400:4,410:82,430:94,450:96,480:95,500:94,520:93,540:91,555:82,570:42,585:26,595:58,610:88,630:94,656:95,680:92,695:70,705:18,715:2,750:0,800:0} },
          "osc-svbony-sv260": { id:"osc-svbony-sv260", mode:"broadband", label:"SVBONY SV260 Multi-Bandpass", line:"OSC", compatible:["osc"], lpStyle:true, provisional:true, category:"broadband-lp", curve:{350:0,390:0,400:70,420:90,450:92,480:88,492:72,500:48,510:78,530:90,545:88,560:70,570:40,580:26,589:14,600:46,615:78,630:88,656:92,672:90,690:80,705:42,720:0,800:0,900:0,1000:0} },
          "osc-broad": { id:"osc-broad", mode:"broadband", label:"OSC Broadband / Clear / No UV-IR Cut", shortLabel:"OSC Clear Broadband", line:"OSC", compatible:["osc"], filterFamily:"osc_broadband", filterRole:"clear_no_uv_ir_cut_broadband", exposureBehavior:"broadband", workflowFamily:"osc_broadband", defaultThroughput:0.97, isNarrowbandLike:false, showIrLeakWarning:true, showUvIrPresentNote:false, curve:{380:45,400:88,420:94,500:96,600:96,650:95,700:94,750:88,800:72} },
          "zwo-ha-7nm": { id:"zwo-ha-7nm", mode:"narrowband", label:"ZWO Ha 7nm", line:"Ha", compatible:["mono"], curve:{647:3.2,648:5.3,649:12.2,650:20.6,651:32.6,652:60.0,653:75.3,654:88.7,655:90.5,656:90.5,657:90.3,658:83.4,659:73.9,660:51.0,661:35.6,662:22.2,663:10.6,664:5.1,665:2.8} },
          "zwo-oiii-7nm": { id:"zwo-oiii-7nm", mode:"narrowband", label:"ZWO OIII 7nm", line:"OIII", compatible:["mono"], curve:{491:3.0,492:5.8,493:12.2,494:23.1,495:36.3,496:67.0,497:81.1,498:89.1,499:90.1,500:89.8,501:88.9,502:81.8,503:71.6,504:49.9,505:31.6,506:15.0,507:9.5,508:5.8,509:2.1} },
          "zwo-sii-7nm": { id:"zwo-sii-7nm", mode:"narrowband", label:"ZWO SII 7nm", line:"SII", compatible:["mono"], curve:{663:3.0,664:6.0,665:10.2,666:22.4,667:35.3,668:60.3,669:74.1,670:84.3,671:90.1,672:89.8,673:89.4,674:79.9,675:68.6,676:54.7,677:31.6,678:20.3,679:10.2,680:6.2,681:3.0,682:2.1} },
          "astronomik-ha-6nm": { id:"astronomik-ha-6nm", mode:"narrowband", label:"Astronomik Ha 6nm", line:"Ha", compatible:["mono"], curve:{650:4.4,651:8.2,652:18.6,653:38.9,654:73.7,655:94.0,656:98.0,657:98.0,658:97.6,659:88.1,660:62.4,661:31.2,662:15.7,663:7.7,664:4.4} },
          "astronomik-oiii-6nm": { id:"astronomik-oiii-6nm", mode:"narrowband", label:"Astronomik OIII 6nm", line:"OIII", compatible:["mono"], curve:{496:3.8,497:11.5,498:40.0,499:83.4,500:94.0,501:94.2,502:92.5,503:63.9,504:25.4,505:7.7} },
          "astronomik-sii-6nm": { id:"astronomik-sii-6nm", mode:"narrowband", label:"Astronomik SII 6nm", line:"SII", compatible:["mono"], curve:{666:4.0,667:6.9,668:14.2,669:30.3,670:61.9,671:88.5,672:97.6,673:97.8,674:97.6,675:93.8,676:75.2,677:42.5,678:21.7,679:10.4,680:6.0,681:3.8} },
          "astronomik-ha-12nm": { id:"astronomik-ha-12nm", mode:"narrowband", label:"Astronomik Ha 12nm", line:"Ha", compatible:["mono"], curve:{646:0,649:20,652:70,656:97,660:90,663:55,666:15,669:0} },
          "astronomik-oiii-12nm": { id:"astronomik-oiii-12nm", mode:"narrowband", label:"Astronomik OIII 12nm", line:"OIII", compatible:["mono"], curve:{491:0,494:25,497:80,501:97,504:95,507:72,510:20,513:0} },
          "astronomik-sii-12nm": { id:"astronomik-sii-12nm", mode:"narrowband", label:"Astronomik SII 12nm", line:"SII", compatible:["mono"], curve:{660:0,664:12,668:88,672:95,676:97,680:88,684:18,688:0} },
          "astronomik-ha-4nm": { id:"astronomik-ha-4nm", mode:"narrowband", label:"Astronomik Ha 4nm", line:"Ha", compatible:["mono"], curve:{653.3:0,654.0:6,654.7:34,655.3:76,655.8:93,656.3:96,656.8:93,657.3:76,657.9:34,658.6:6,659.3:0} },
          "astronomik-oiii-4nm": { id:"astronomik-oiii-4nm", mode:"narrowband", label:"Astronomik OIII 4nm", line:"OIII", compatible:["mono"], curve:{497.7:0,498.4:6,499.1:34,499.7:76,500.2:93,500.7:96,501.2:93,501.7:76,502.3:34,503.0:6,503.7:0} },
          "astronomik-sii-4nm": { id:"astronomik-sii-4nm", mode:"narrowband", label:"Astronomik SII 4nm", line:"SII", compatible:["mono"], curve:{669.4:0,670.1:6,670.8:34,671.4:76,671.9:93,672.4:96,672.9:93,673.4:76,674.0:34,674.7:6,675.4:0} },
          "osc-ha-duo": { id:"osc-ha-duo", mode:"narrowband", label:"Optolong L-eXtreme Ha 7nm", line:"Ha", compatible:["osc"], curve:{652.8:0,654.0:20,655.0:70,656.3:92,657.6:70,658.6:20,659.8:0} },
          "osc-oiii-duo": { id:"osc-oiii-duo", mode:"narrowband", label:"Optolong L-eXtreme OIII 7nm", line:"OIII", compatible:["osc"], curve:{497.2:0,498.4:20,499.4:70,500.7:92,502.0:70,503.0:20,504.2:0} },
          "osc-ha-svbony-sv220": { id:"osc-ha-svbony-sv220", mode:"narrowband", label:"SVBONY SV220 Ha 7nm", line:"Ha", compatible:["osc"], curve:{652.8:0,653.7:18,654.6:62,655.4:86,656.3:94,657.2:86,658.0:62,658.9:18,659.8:0} },
          "osc-oiii-svbony-sv220": { id:"osc-oiii-svbony-sv220", mode:"narrowband", label:"SVBONY SV220 OIII 7nm", line:"OIII", compatible:["osc"], curve:{497.2:0,498.1:18,499.0:62,499.8:84,500.7:90,501.6:84,502.4:62,503.3:18,504.2:0} },
          "osc-sii-svbony-sv220": { id:"osc-sii-svbony-sv220", mode:"narrowband", label:"SVBONY SV220 SII 7nm", line:"SII", compatible:["osc"], curve:{668.9:0,669.8:18,670.7:58,671.5:82,672.4:88,673.3:82,674.1:58,675.0:18,675.9:0} },
          "osc-ha-ultimate": { id:"osc-ha-ultimate", mode:"narrowband", label:"Optolong L-Ultimate Ha 3nm", line:"Ha", compatible:["osc"], curve:{654.8:0,655.4:20,655.9:70,656.3:90,656.7:70,657.2:20,657.8:0} },
          "osc-oiii-ultimate": { id:"osc-oiii-ultimate", mode:"narrowband", label:"Optolong L-Ultimate OIII 3nm", line:"OIII", compatible:["osc"], curve:{499.2:0,499.8:20,500.3:70,500.7:90,501.1:70,501.6:20,502.2:0} },
          "osc-ha-alpt5": { id:"osc-ha-alpt5", mode:"narrowband", label:"Antlia ALP-T Ha 5nm", line:"Ha", compatible:["osc"], curve:{653.3:0,653.8:20,654.3:70,654.8:88,656.3:90,657.8:88,658.3:70,658.8:20,659.3:0} },
          "osc-oiii-alpt5": { id:"osc-oiii-alpt5", mode:"narrowband", label:"Antlia ALP-T OIII 5nm", line:"OIII", compatible:["osc"], curve:{497.7:0,498.2:20,498.7:70,499.2:80,500.7:82,502.2:80,502.7:70,503.2:20,503.7:0} },
          "osc-ha-alpt3": { id:"osc-ha-alpt3", mode:"narrowband", label:"Antlia ALP-T Ha 3nm", line:"Ha", compatible:["osc"], curve:{654.3:0,654.8:20,655.1:70,655.5:88,656.3:90,657.1:88,657.5:70,657.8:20,658.3:0} },
          "osc-oiii-alpt3": { id:"osc-oiii-alpt3", mode:"narrowband", label:"Antlia ALP-T OIII 3nm", line:"OIII", compatible:["osc"], curve:{498.7:0,499.2:20,499.5:70,499.9:80,500.7:82,501.5:80,501.9:70,502.2:20,502.7:0} },
          "osc-ha-nbzii": { id:"osc-ha-nbzii", mode:"narrowband", label:"IDAS NBZ-II Ha 9.5nm", line:"Ha", compatible:["osc"], curve:{649.0:0,651.0:15,652.5:55,654.0:83,656.3:88,658.5:83,660.0:55,661.5:15,663.0:0} },
          "osc-oiii-nbzii": { id:"osc-oiii-nbzii", mode:"narrowband", label:"IDAS NBZ-II OIII 8nm", line:"OIII", compatible:["osc"], curve:{495.0:0,497.0:15,498.5:55,499.7:83,500.7:88,501.9:83,503.0:55,504.5:15,506.0:0} },
          "osc-ha-triad": { id:"osc-ha-triad", mode:"narrowband", label:"Radian Triad Ultra Ha 4nm", line:"Ha", compatible:["osc"], curve:{654.3:0,654.8:20,655.3:70,655.8:88,656.3:90,656.8:88,657.3:70,657.8:20,658.3:0} },
          "osc-oiii-triad": { id:"osc-oiii-triad", mode:"narrowband", label:"Radian Triad Ultra OIII 4nm", line:"OIII", compatible:["osc"], curve:{498.7:0,499.2:20,499.7:70,500.2:93,500.7:97,501.2:93,501.7:70,502.2:20,502.7:0} },
          "osc-sii-triad": { id:"osc-sii-triad", mode:"narrowband", label:"Radian Triad Ultra SII 4nm", line:"SII", compatible:["osc"], curve:{669.6:0,670.1:20,670.6:70,671.1:88,671.6:90,672.1:88,672.6:70,673.1:20,673.6:0} },
          "osc-ha-enhance": { id:"osc-ha-enhance", mode:"narrowband", label:"Optolong L-eNhance Ha ~10nm", line:"Ha", compatible:["osc"], curve:{648:0,650:15,652:70,653.0:90,654.0:90,656.3:88,658.0:70,660:15,662:0} },
          "osc-oiii-enhance": { id:"osc-oiii-enhance", mode:"narrowband", label:"Optolong L-eNhance Hb/OIII ~24nm", line:"OIII", compatible:["osc"], curve:{480:0,484:25,486.1:70,490:88,496:90,500.7:90,505:88,510:70,516:20,520:0} },
          "osc-lpro": { id:"osc-lpro", mode:"broadband", label:"Optolong L-Pro", line:"OSC", compatible:["osc"], lpStyle:true, category:"broadband-lp", curve:{400:0,408:70,420:90,430:95,434:66,435.2:40,435.8:22,436.4:34,438:58,442:88,450:96,470:96,485:94,500:92,512:90,520:92,530:94,540:88,544.8:56,545.5:34,546.1:24,546.7:34,548:58,552:84,560:96,570:96,575:94,576.7:68,577.5:46,578.3:40,579.1:44,580.0:58,582:82,586:78,587.5:46,588.3:28,589.0:16,589.6:16,590.2:22,591.0:34,592.0:48,594:70,598:88,606:94,620:95,640:95,654:95,656:95,660:92,667:84,669.0:64,670.0:40,671.0:32,672.0:40,674.0:58,678:78,684:90,690:86,705:84,720:80,760:70,800:60} },
          "osc-antlia-triband-rgb-ultra": { id:"osc-antlia-triband-rgb-ultra", mode:"broadband", label:"Antlia Triband RGB Ultra II", line:"OSC", compatible:["osc"], lpStyle:true, provisional:true, category:"broadband-lp", curve:{400:0,410:82,420:90,430:94,434:76,435.2:58,435.8:42,436.4:50,438:68,442:88,450:95,470:95,485:94,500:93,512:92,520:94,530:94,540:90,544.8:64,545.5:46,546.1:34,546.7:46,548:66,552:86,560:94,570:95,575:94,576.7:80,577.5:66,578.3:60,579.1:64,580.0:74,582:86,586:80,587.5:54,588.3:38,589.0:28,589.6:28,590.2:34,591.0:44,592.0:56,594:74,598:88,606:94,620:95,640:94,656:94,666:92,669.0:74,670.0:55,671.0:46,672.0:54,674.0:66,678:80,684:88,690:80,700:72,715:80,735:74,760:66,800:54} },
          "osc-sii-alpt35hb": { id:"osc-sii-alpt35hb", mode:"narrowband", label:"Antlia ALP-T SII 3.5nm (paired Hβ band not separately modeled)", line:"SII", compatible:["osc"], curve:{670.6:0,671.0:20,671.3:70,671.7:88,672.4:90,673.1:88,673.5:70,673.8:20,674.2:0} },
          "osc-sii-alpt5hb": { id:"osc-sii-alpt5hb", mode:"narrowband", label:"Antlia ALP-T SII 5nm (paired Hβ band not separately modeled)", line:"SII", compatible:["osc"], curve:{669.9:0,670.4:20,670.9:70,671.5:88,672.4:90,673.3:88,673.9:70,674.4:20,674.9:0} },
          "osc-ha-askar-d1": { id:"osc-ha-askar-d1", mode:"narrowband", label:"Askar Super D1 Ha 8.5nm", line:"Ha", compatible:["osc"], curve:{651.1:0,652.1:18,653.2:62,654.2:82,655.0:85,656.6:86,658.2:85,659.0:82,660.0:62,661.1:18,662.1:0} },
          "osc-oiii-askar-d1": { id:"osc-oiii-askar-d1", mode:"narrowband", label:"Askar Super D1 OIII 6.5nm", line:"OIII", compatible:["osc"], curve:{497.0:0,497.9:18,498.8:62,499.5:82,500.1:85,500.7:86,501.3:85,501.9:82,502.6:62,503.5:18,504.4:0} },
          "osc-sii-askar-d2": { id:"osc-sii-askar-d2", mode:"narrowband", label:"Askar Super D2 SII 8.5nm", line:"SII", compatible:["osc"], curve:{666.5:0,667.5:18,668.6:62,669.6:82,670.4:85,672.0:86,673.6:85,674.4:82,675.4:62,676.5:18,677.5:0} },
          "osc-oiii-askar-d2": { id:"osc-oiii-askar-d2", mode:"narrowband", label:"Askar Super D2 OIII 6.5nm", line:"OIII", compatible:["osc"], curve:{497.0:0,497.9:18,498.8:62,499.5:82,500.1:85,500.7:86,501.3:85,501.9:82,502.6:62,503.5:18,504.4:0} },
          "seestar-ha-lp": { id:"seestar-ha-lp", mode:"narrowband", label:"Seestar LP Filter Ha 20nm", line:"Ha", compatible:["osc"], curve:{638:0,642:20,646.3:50,650:80,654:90,656.3:92,658.6:90,662:80,666.3:50,670.5:20,674.5:0} },
          "seestar-oiii-lp": { id:"seestar-oiii-lp", mode:"narrowband", label:"Seestar LP Filter OIII 30nm", line:"OIII", compatible:["osc"], curve:{478:0,482:20,485.7:50,490:78,495:88,500.7:90,506:88,511:78,515.7:50,519:20,523:0} }
        },
        filterSets: {
          "narrowband-sho-baader-3nm": { id:"narrowband-sho-baader-3nm", label:"Mono SHO — Baader 3.5/4nm", mode:"narrowband", compatible:["mono"], filters:["baader-ha-3nm","baader-oiii-3nm","baader-sii-3nm"] },
          "narrowband-sho-baader-6nm": { id:"narrowband-sho-baader-6nm", label:"Mono SHO — Baader 6.5nm", mode:"narrowband", compatible:["mono"], filters:["baader-ha-6nm","baader-oiii-6nm","baader-sii-6nm"] },
          "narrowband-sho-chroma-3nm": { id:"narrowband-sho-chroma-3nm", label:"Mono SHO — Chroma 3nm", mode:"narrowband", compatible:["mono"], filters:["chroma-ha-3nm","chroma-oiii-3nm","chroma-sii-3nm"] },
          "narrowband-sho-chroma-5nm": { id:"narrowband-sho-chroma-5nm", label:"Mono SHO — Chroma 5nm", mode:"narrowband", compatible:["mono"], filters:["chroma-ha-5nm","chroma-oiii-5nm","chroma-sii-5nm"] },
          "narrowband-sho-chroma-8nm": { id:"narrowband-sho-chroma-8nm", label:"Mono SHO — Chroma 8nm", mode:"narrowband", compatible:["mono"], filters:["chroma-ha-8nm","chroma-oiii-8nm","chroma-sii-8nm"] },
          "narrowband-sho-antlia-4p5nm": { id:"narrowband-sho-antlia-4p5nm", label:"Mono SHO — Antlia 4.5nm EDGE", mode:"narrowband", compatible:["mono"], filters:["antlia-ha-4p5nm","antlia-oiii-4p5nm","antlia-sii-4p5nm"] },
          "narrowband-sho-antlia-3nm": { id:"narrowband-sho-antlia-3nm", mode:"narrowband", compatible:["mono"], label:"Mono SHO — Antlia 3nm Pro", filters:["antlia-ha-3nm","antlia-oiii-3nm","antlia-sii-3nm"] },
          "narrowband-sho-zwo": { id:"narrowband-sho-zwo", label:"Mono SHO — ZWO 7nm", mode:"narrowband", compatible:["mono"], filters:["zwo-ha-7nm","zwo-oiii-7nm","zwo-sii-7nm"] },
          "narrowband-sho-astronomik-6nm": { id:"narrowband-sho-astronomik-6nm", label:"Mono SHO — Astronomik 6nm", mode:"narrowband", compatible:["mono"], filters:["astronomik-ha-6nm","astronomik-oiii-6nm","astronomik-sii-6nm"] },
          "narrowband-sho-astronomik-12nm": { id:"narrowband-sho-astronomik-12nm", label:"Mono SHO — Astronomik 12nm", mode:"narrowband", compatible:["mono"], filters:["astronomik-ha-12nm","astronomik-oiii-12nm","astronomik-sii-12nm"] },
          "narrowband-sho-astronomik-4nm": { id:"narrowband-sho-astronomik-4nm", label:"Mono SHO — Astronomik 4nm", mode:"narrowband", compatible:["mono"], filters:["astronomik-ha-4nm","astronomik-oiii-4nm","astronomik-sii-4nm"] },
          "broadband-lrgb-baader": { id:"broadband-lrgb-baader", label:"Mono LRGB — Baader CMOS", mode:"broadband", compatible:["mono"], filters:["baader-l","baader-r","baader-g","baader-b"] },
          "broadband-lrgb-chroma": { id:"broadband-lrgb-chroma", label:"Mono LRGB — Chroma", mode:"broadband", compatible:["mono"], filters:["chroma-l","chroma-r","chroma-g","chroma-b"] },
          "broadband-lrgb-antlia": { id:"broadband-lrgb-antlia", mode:"broadband", compatible:["mono"], label:"Mono LRGB — Antlia LRGB-V Pro", filters:["antlia-lrgb-l","antlia-lrgb-r","antlia-lrgb-g","antlia-lrgb-b"] },
          "broadband-lrgb-zwo": { id:"broadband-lrgb-zwo", label:"Mono LRGB — ZWO", mode:"broadband", compatible:["mono"], filters:["zwo-lrgb-l","zwo-lrgb-r","zwo-lrgb-g","zwo-lrgb-b"] },
          "broadband-rgb-astronomik-l1": { id:"broadband-rgb-astronomik-l1", label:"Mono LRGB — Astronomik RGB + L-1", mode:"broadband", compatible:["mono"], filters:["astronomik-l1","astronomik-r","astronomik-g","astronomik-b"] },
          "broadband-rgb-astronomik": { id:"broadband-rgb-astronomik", label:"Mono LRGB — Astronomik RGB + L-2", mode:"broadband", compatible:["mono"], filters:["astronomik-l2","astronomik-r","astronomik-g","astronomik-b"] },
          "broadband-rgb-astronomik-l3": { id:"broadband-rgb-astronomik-l3", label:"Mono LRGB — Astronomik RGB + L-3", mode:"broadband", compatible:["mono"], filters:["astronomik-l3","astronomik-r","astronomik-g","astronomik-b"] },
          "broadband-osc-uvir": { id:"broadband-osc-uvir", label:"OSC Broadband with UV/IR Cut", mode:"broadband", compatible:["osc"], filters:["osc-broad-uvir"] },
          "broadband-osc": { id:"broadband-osc", label:"OSC Broadband / Clear / No UV-IR Cut", mode:"broadband", compatible:["osc"], filters:["osc-broad"] },
          "broadband-osc-lpro": { id:"broadband-osc-lpro", label:"OSC Broadband — Optolong L-Pro", mode:"broadband", compatible:["osc"], filters:["osc-lpro"] },
          "broadband-osc-antlia-triband-rgb-ultra": { id:"broadband-osc-antlia-triband-rgb-ultra", label:"OSC Broadband — Antlia Triband RGB Ultra II (LP / hybrid)", mode:"broadband", compatible:["osc"], filters:["osc-antlia-triband-rgb-ultra"], provisional:true },
          "broadband-osc-baader-neodymium-moon-skyglow": { id:"broadband-osc-baader-neodymium-moon-skyglow", label:"OSC Broadband — Baader Moon & Skyglow Neodymium", mode:"broadband", compatible:["osc"], filters:["osc-baader-neodymium-moon-skyglow"] },
          "broadband-osc-svbony-sv260": { id:"broadband-osc-svbony-sv260", label:"OSC Broadband — SVBONY SV260 Multi-Bandpass", mode:"broadband", compatible:["osc"], filters:["osc-svbony-sv260"], provisional:true },
          "broadband-osc-seestar-lp": { id:"broadband-osc-seestar-lp", label:"Seestar LP Filter (broadband deep-sky)", mode:"broadband", compatible:["osc"], filters:["osc-broad-seestar-lp"], allowedCameraIds:["zwo-seestar-s30","zwo-seestar-s50"] },
          "narrowband-osc-duoband": { id:"narrowband-osc-duoband", label:"Optolong L-eXtreme (Ha/OIII 7nm)", mode:"narrowband", compatible:["osc"], filters:["osc-ha-duo","osc-oiii-duo"] },
          "narrowband-osc-svbony-sv220-haoiii": { id:"narrowband-osc-svbony-sv220-haoiii", label:"SVBONY SV220 Ha/OIII 7nm", mode:"narrowband", compatible:["osc"], filters:["osc-ha-svbony-sv220","osc-oiii-svbony-sv220"] },
          "narrowband-osc-svbony-sv220-siioiii": { id:"narrowband-osc-svbony-sv220-siioiii", label:"SVBONY SV220 SII/OIII 7nm", mode:"narrowband", compatible:["osc"], filters:["osc-sii-svbony-sv220","osc-oiii-svbony-sv220"] },
          "narrowband-osc-svbony-sv220-combo": { id:"narrowband-osc-svbony-sv220-combo", label:"SVBONY SV220 Ha/OIII + SII/OIII combo", mode:"narrowband", compatible:["osc"], filters:["osc-ha-svbony-sv220","osc-oiii-svbony-sv220","osc-sii-svbony-sv220"] },
          "narrowband-osc-ultimate": { id:"narrowband-osc-ultimate", label:"Optolong L-Ultimate (Ha/OIII 3nm)", mode:"narrowband", compatible:["osc"], filters:["osc-ha-ultimate","osc-oiii-ultimate"] },
          "narrowband-osc-alpt5": { id:"narrowband-osc-alpt5", label:"Antlia ALP-T 5nm (Ha/OIII)", mode:"narrowband", compatible:["osc"], filters:["osc-ha-alpt5","osc-oiii-alpt5"] },
          "narrowband-osc-alpt3": { id:"narrowband-osc-alpt3", label:"Antlia ALP-T 3nm (Ha/OIII)", mode:"narrowband", compatible:["osc"], filters:["osc-ha-alpt3","osc-oiii-alpt3"] },
          "narrowband-osc-alpt35-combo": { id:"narrowband-osc-alpt35-combo", mode:"narrowband", label:"Antlia ALP-T 3nm + 3.5nm combo (Ha/OIII/SII; Hβ passband present)", compatible:["osc"], filters:["osc-ha-alpt3","osc-oiii-alpt3","osc-sii-alpt35hb"] },
          "narrowband-osc-alpt5-combo": { id:"narrowband-osc-alpt5-combo", mode:"narrowband", label:"Antlia ALP-T 5nm combo (Ha/OIII/SII; Hβ passband present)", compatible:["osc"], filters:["osc-ha-alpt5","osc-oiii-alpt5","osc-sii-alpt5hb"] },
          "narrowband-osc-askar-d1": { id:"narrowband-osc-askar-d1", mode:"narrowband", label:"Askar Super D1 (OIII 6.5nm / Ha 8.5nm)", compatible:["osc"], filters:["osc-ha-askar-d1","osc-oiii-askar-d1"] },
          "narrowband-osc-askar-d2": { id:"narrowband-osc-askar-d2", mode:"narrowband", label:"Askar Super D2 (OIII 6.5nm / SII 8.5nm)", compatible:["osc"], filters:["osc-oiii-askar-d2","osc-sii-askar-d2"] },
          "narrowband-osc-askar-d1d2-combo": { id:"narrowband-osc-askar-d1d2-combo", mode:"narrowband", label:"Askar Super D1 + D2 combo (Ha/OIII/SII)", compatible:["osc"], filters:["osc-ha-askar-d1","osc-oiii-askar-d1","osc-sii-askar-d2"] },
          "narrowband-osc-nbzii": { id:"narrowband-osc-nbzii", label:"IDAS NBZ-II (Ha 9.5nm / OIII 8nm)", mode:"narrowband", compatible:["osc"], filters:["osc-ha-nbzii","osc-oiii-nbzii"] },
          "narrowband-osc-seestar-lp": { id:"narrowband-osc-seestar-lp", label:"Seestar LP Filter (Ha 20nm / OIII 30nm)", mode:"narrowband", compatible:["osc"], filters:["seestar-ha-lp","seestar-oiii-lp"], allowedCameraIds:["zwo-seestar-s30","zwo-seestar-s50"] },
          "narrowband-osc-triad": { id:"narrowband-osc-triad", label:"Radian Triad Ultra (Ha/OIII/SII 4nm)", mode:"narrowband", compatible:["osc"], filters:["osc-ha-triad","osc-oiii-triad","osc-sii-triad"] },
          "narrowband-osc-enhance": { id:"narrowband-osc-enhance", label:"Optolong L-eNhance (Ha + Hb/OIII)", mode:"narrowband", compatible:["osc"], filters:["osc-ha-enhance","osc-oiii-enhance"] }
        },
        cameras: [
          {
            cameraId: "zwo-asi2400mc-pro",
            name: "ASI2400MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX410",
            colorType: "osc",
            pixelSizeUm: 5.94,
            resolution: { widthPx: 6072, heightPx: 4042 },
            adcBits: 14,
            qeModel: {
              type: "table",
              wavelengthNm: [400,430,460,500,550,600,650,680,700,750,800],
              relativeQe: [0.15,0.28,0.40,0.41,0.38,0.36,0.31,0.27,0.21,0.11,0.04]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 450 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 140 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,6.4],[80,3.6],[140,1.1],[300,1.1],[450,1.1]] },
                  fullWellE: { interpolation: "linear", points: [[0,100000],[80,56000],[140,20000],[300,19000],[450,18000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.50],[80,0.88],[140,0.35],[300,0.18],[450,0.11]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,13.9],[80,13.9],[140,14.2],[300,14.1],[450,14.0]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0008],[-10,0.0015],[0,0.0035],[10,0.0080]] }
                },
                recommendedPresets: [0,140]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "partial",
              curveSource: "System Compare ASI2400MC Pro import using ZWO IMX410 specs and compact OSC QE control points",
              lastVerified: "2026-05-21"
            }
          },
          {
            cameraId: "zwo-asi071mc-pro",
            name: "ASI071MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX071",
            colorType: "osc",
            pixelSizeUm: 4.78,
            resolution: { widthPx: 4944, heightPx: 3284 },
            adcBits: 14,
            qeModel: {
              type: "table",
              wavelengthNm: [400,430,460,500,530,550,600,650,680,700,750,800],
              relativeQe: [0.09,0.19,0.30,0.35,0.31,0.31,0.27,0.21,0.18,0.13,0.06,0.02]
            },
            modes: [
              {
                modeId: "unity_curve",
                modeName: "Unity gain planning curve",
                gainRange: { min: 0, max: 240 },
                modeSwitchBehavior: { hcgActive: false },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,4.8],[30,4.2],[60,3.7],[90,3.2],[120,2.8],[180,2.5],[240,2.3]] },
                  fullWellE: { interpolation: "linear", points: [[0,46300],[30,35000],[60,25500],[90,18500],[120,13000],[180,8200],[240,5600]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,2.2],[60,1.4],[90,1.0],[120,0.72],[180,0.44],[240,0.31]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,13.9],[30,13.5],[60,13.1],[90,12.7],[120,12.2],[180,11.5],[240,10.9]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-15,0.0025],[-10,0.0032],[-5,0.0044],[0,0.0063],[5,0.0092],[10,0.0135],[15,0.020],[20,0.030],[25,0.045]] }
                },
                recommendedPresets: [0,90]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 8 },
            dataQuality: {
              level: "partial",
              curveSource: "System Comparison ASI071MC Pro import using compact Sony IMX071 OSC family curves",
              lastVerified: "2026-06-02"
            }
          },
          {
            cameraId: "zwo-asi2600mm-pro",
            name: "ASI2600MM Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX571",
            colorType: "mono",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 6248, heightPx: 4176 },
            adcBits: 16,
            qeModel: {
              type: "table",
              wavelengthNm: [450,500,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.90,0.90,0.84,0.73,0.60,0.56,0.48,0.36,0.29,0.21,0.15,0.09]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 100 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.0],[100,0.75],[300,0.72]] },
                  fullWellE: { interpolation: "linear", points: [[0,50000],[100,17000],[300,16000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.78],[100,0.27],[300,0.10]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.6],[100,13.0],[300,11.4]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0008],[0,0.0018],[10,0.0040]] }
                },
                recommendedPresets: [0,100]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "full-modeled",
              curveSource: "Published gain/read-noise behavior with interpolated companion curves",
              lastVerified: "2026-04-06"
            }
          },
          {
            cameraId: "zwo-asi2600mc-pro",
            name: "ASI2600MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX571",
            colorType: "osc",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 6248, heightPx: 4176 },
            adcBits: 16,
            qeModel: {
              type: "table",
              wavelengthNm: [450,500,550,600,656,700,800,900],
              relativeQe: [0.48,0.50,0.56,0.52,0.34,0.34,0.33,0.26]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 100 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.0],[100,1.0],[300,1.0]] },
                  fullWellE: { interpolation: "linear", points: [[0,51000],[100,19000],[300,19000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.82],[100,0.29],[300,0.11]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.3],[100,12.9],[300,11.2]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0005],[-10,0.0009],[0,0.0020],[10,0.0044]] }
                },
                recommendedPresets: [0,100]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "full-modeled",
              curveSource: "Published gain/read-noise behavior with OSC-averaged QE reference",
              lastVerified: "2026-04-06"
            }
          },
          {
            cameraId: "zwo-asi533mm-pro",
            name: "ASI533MM Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX533",
            colorType: "mono",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 3008, heightPx: 3008 },
            adcBits: 14,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.18,0.42,0.71,0.83,0.90,0.91,0.79,0.56,0.32]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 100 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,2.8],[100,0.7],[300,0.7]] },
                  fullWellE: { interpolation: "linear", points: [[0,50000],[100,20000],[300,20000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.80],[100,0.28],[300,0.10]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.4],[100,13.2],[300,11.4]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0007],[0,0.0016],[10,0.0038]] }
                },
                recommendedPresets: [0,100]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "full-modeled",
              curveSource: "Published behavior with interpolated secondary curves",
              lastVerified: "2026-04-06"
            }
          },
          {
            cameraId: "zwo-asi183mm-pro",
            name: "ASI183MM Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX183CLK-J",
            colorType: "mono",
            pixelSizeUm: 2.4,
            resolution: { widthPx: 5496, heightPx: 3672 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,430,460,500,530,550,600,650,680,700,750,800],
              relativeQe: [0.12,0.28,0.52,0.74,0.84,0.84,0.80,0.72,0.62,0.52,0.28,0.10]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Gain curve",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: null },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.0],[50,2.6],[100,2.2],[150,2.0],[200,1.85],[250,1.75],[270,1.68],[300,1.6]] },
                  fullWellE: { interpolation: "linear", points: [[0,15000],[50,8000],[100,5000],[150,2800],[200,1500],[250,900],[270,700],[300,450]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,3.6],[50,2.1],[100,1.15],[120,1.0],[150,0.65],[200,0.35],[250,0.22],[300,0.12]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,12.2],[50,11.6],[100,11.0],[150,10.4],[200,9.7],[250,9.0],[270,8.7],[300,8.2]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-15,0.0030],[-10,0.0037],[-5,0.0050],[0,0.0068],[5,0.0098],[10,0.0156],[15,0.025],[20,0.040],[25,0.060]] }
                },
                recommendedPresets: [0,120]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 10 },
            dataQuality: {
              level: "partial",
              curveSource: "System Comparison ASI183MM Pro import using ZWO IMX183 specs and compact mono QE control points",
              lastVerified: "2026-05-29"
            }
          },
          {
            cameraId: "zwo-asi183mc-pro",
            name: "ASI183MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX183CQJ-J",
            colorType: "osc",
            pixelSizeUm: 2.4,
            resolution: { widthPx: 5496, heightPx: 3672 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,430,460,500,530,550,600,650,680,700,750,800],
              relativeQe: [0.13,0.25,0.38,0.33,0.50,0.46,0.37,0.28,0.22,0.17,0.08,0.03]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Gain curve",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: null },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.0],[50,2.6],[100,2.2],[150,2.0],[200,1.85],[250,1.75],[270,1.68],[300,1.6]] },
                  fullWellE: { interpolation: "linear", points: [[0,15000],[50,8000],[100,5000],[150,2800],[200,1500],[250,900],[270,700],[300,450]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,3.6],[50,2.1],[100,1.15],[120,1.0],[150,0.65],[200,0.35],[250,0.22],[300,0.12]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,12.2],[50,11.6],[100,11.0],[150,10.4],[200,9.7],[250,9.0],[270,8.7],[300,8.2]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-15,0.0030],[-10,0.0037],[-5,0.0050],[0,0.0068],[5,0.0098],[10,0.0156],[15,0.025],[20,0.040],[25,0.060]] }
                },
                recommendedPresets: [0,120]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 10 },
            dataQuality: {
              level: "partial",
              curveSource: "System Comparison ASI183MC Pro import using ZWO IMX183 specs and compact OSC QE control points",
              lastVerified: "2026-05-29"
            }
          },
          {
            cameraId: "zwo-asi533mc-pro",
            name: "ASI533MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX533",
            colorType: "osc",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 3008, heightPx: 3008 },
            adcBits: 14,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.20,0.37,0.41,0.40,0.37,0.30,0.21,0.08,0.03]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 100 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.0],[100,0.7],[300,0.7]] },
                  fullWellE: { interpolation: "linear", points: [[0,50000],[100,20000],[300,20000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.82],[100,0.28],[300,0.10]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.2],[100,13.0],[300,11.3]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0005],[-10,0.0008],[0,0.0018],[10,0.0040]] }
                },
                recommendedPresets: [0,100]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "full-modeled",
              curveSource: "Published behavior with OSC-averaged QE reference",
              lastVerified: "2026-04-06"
            }
          },
          {
            cameraId: "zwo-asi6200mm-pro",
            name: "ASI6200MM Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX455",
            colorType: "mono",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 9576, heightPx: 6388 },
            adcBits: 16,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,530,550,600,656,700,750,800],
              relativeQe: [0.68,0.83,0.88,0.91,0.90,0.84,0.74,0.55,0.35,0.18]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 100 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.3],[100,0.86],[300,0.86]] },
                  fullWellE: { interpolation: "linear", points: [[0,51000],[100,18000],[300,18000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.79],[100,0.28],[300,0.10]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.6],[100,13.0],[300,11.4]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0009],[0,0.0019],[10,0.0043]] }
                },
                recommendedPresets: [0,100]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "partial",
              curveSource: "Published read-noise behavior with estimated companion curves",
              lastVerified: "2026-04-06"
            }
          },
          {
            cameraId: "zwo-asi6200mc-pro",
            name: "ASI6200MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX455",
            colorType: "osc",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 9576, heightPx: 6388 },
            adcBits: 16,
            qeModel: {
              type: "table",
              wavelengthNm: [400,430,460,490,520,550,580,620,656,680,700,750,800],
              relativeQe: [0.20,0.30,0.39,0.40,0.37,0.34,0.28,0.28,0.27,0.26,0.19,0.11,0.06]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 100 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.5],[100,0.86],[300,0.86]] },
                  fullWellE: { interpolation: "linear", points: [[0,51000],[100,18000],[300,18000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.79],[100,0.28],[300,0.10]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.3],[100,12.9],[300,11.3]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0009],[0,0.0019],[10,0.0043]] }
                },
                recommendedPresets: [0,100]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "partial",
              curveSource: "Published gain/read-noise behavior with OSC-averaged QE reference",
              lastVerified: "2026-04-24"
            }
          },
          {
            cameraId: "zwo-asi1600mm-pro",
            name: "ASI1600MM Pro",
            manufacturer: "ZWO",
            sensor: "Panasonic MN34230",
            colorType: "mono",
            pixelSizeUm: 3.8,
            resolution: { widthPx: 4656, heightPx: 3520 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.16,0.34,0.48,0.57,0.60,0.57,0.48,0.32,0.16]
            },
            modes: [
              {
                modeId: "unity",
                modeName: "Unity / HCG-leaning",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 139 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.8],[76,2.4],[139,1.8],[200,1.6],[300,1.5]] },
                  fullWellE: { interpolation: "linear", points: [[0,20000],[76,12000],[139,8000],[200,6000],[300,4500]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.20],[76,0.65],[139,0.48],[200,0.36],[300,0.24]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,12.2],[76,11.8],[139,11.2],[200,10.6],[300,9.8]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0025],[-10,0.0045],[0,0.0100],[10,0.0220]] }
                },
                recommendedPresets: [76,139,200]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 21 },
            dataQuality: {
              level: "partial",
              curveSource: "Published gain/read-noise behavior with approximate secondary curves",
              lastVerified: "2026-04-06"
            }
          },
          {
            cameraId: "zwo-asi1600mc-pro",
            name: "ASI1600MC Pro",
            manufacturer: "ZWO",
            sensor: "Panasonic MN34230",
            colorType: "osc",
            pixelSizeUm: 3.8,
            resolution: { widthPx: 4656, heightPx: 3520 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.08,0.23,0.27,0.28,0.27,0.23,0.16,0.07,0.02]
            },
            modes: [
              {
                modeId: "unity",
                modeName: "Unity / HCG-leaning",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 139 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,4.0],[76,2.6],[139,2.0],[200,1.8]] },
                  fullWellE: { interpolation: "linear", points: [[0,20000],[76,12000],[139,8000],[200,6000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.20],[76,0.65],[139,0.48],[200,0.36]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,12.0],[76,11.6],[139,11.0],[200,10.4]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0025],[-10,0.0045],[0,0.0100],[10,0.0220]] }
                },
                recommendedPresets: [76,139,200]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 21 },
            dataQuality: {
              level: "generic",
              curveSource: "MN34230-derived generic OSC model",
              lastVerified: "2026-04-24"
            }
          },
          {
            cameraId: "zwo-asi294mm-pro",
            name: "ASI294MM Pro (Bin 2 mode)",
            manufacturer: "ZWO",
            sensor: "Sony IMX294 / IMX492",
            colorType: "mono",
            pixelSizeUm: 4.63,
            resolution: { widthPx: 4144, heightPx: 2822 },
            adcBits: 14,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.22,0.46,0.74,0.86,0.90,0.88,0.74,0.50,0.26]
            },
            modes: [
              {
                modeId: "high_gain",
                modeName: "High gain / HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 120 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,7.3],[50,6.5],[120,1.2],[200,1.1]] },
                  fullWellE: { interpolation: "linear", points: [[0,66000],[120,14000],[200,13000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.18],[120,0.46],[200,0.32]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,13.0],[120,12.0],[200,11.3]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0009],[-10,0.0016],[0,0.0038],[10,0.0085]] }
                },
                recommendedPresets: [120]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "partial",
              curveSource: "ZWO ASI294MM Pro Bin 2 / 11.7MP readout mode with official full-well/read-noise behavior and compact QE curve",
              lastVerified: "2026-07-27"
            }
          },
          {
            cameraId: "zwo-asi294mm-pro-bin1",
            name: "ASI294MM Pro (Bin 1 mode)",
            manufacturer: "ZWO",
            sensor: "Sony IMX492 / IMX294",
            colorType: "mono",
            pixelSizeUm: 2.315,
            resolution: { widthPx: 8288, heightPx: 5644 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.22,0.46,0.74,0.86,0.90,0.88,0.74,0.50,0.26]
            },
            modes: [
              {
                modeId: "high_gain",
                modeName: "High gain / Bin 1 readout",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 120 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,7.3],[50,6.5],[120,1.2],[200,1.1]] },
                  fullWellE: { interpolation: "linear", points: [[0,14000],[120,4500],[200,3200]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.30],[120,0.12],[200,0.08]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,10.9],[120,11.9],[200,11.5]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0009],[-10,0.0016],[0,0.0038],[10,0.0085]] }
                },
                recommendedPresets: [120]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "partial",
              curveSource: "ZWO ASI294MM Pro Bin 1 / 47MP readout mode; true camera mode, not ordinary software binning",
              lastVerified: "2026-07-27"
            }
          },
          {
            cameraId: "zwo-asi294mc-pro",
            name: "ASI294MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX294",
            colorType: "osc",
            pixelSizeUm: 4.63,
            resolution: { widthPx: 4144, heightPx: 2822 },
            adcBits: 14,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.13,0.33,0.41,0.40,0.38,0.31,0.22,0.09,0.03]
            },
            modes: [
              {
                modeId: "high_gain",
                modeName: "High gain / HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 120 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,7.3],[50,6.5],[120,1.2],[200,1.1]] },
                  fullWellE: { interpolation: "linear", points: [[0,66000],[120,14000],[200,13000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.18],[120,0.46],[200,0.32]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,12.8],[120,11.8],[200,11.1]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0009],[-10,0.0016],[0,0.0038],[10,0.0085]] }
                },
                recommendedPresets: [120]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "generic",
              curveSource: "IMX294-derived generic OSC model",
              lastVerified: "2026-04-24"
            }
          },
          {
            cameraId: "zwo-asi585mm-pro",
            name: "ASI585MM Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX585",
            colorType: "mono",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 3840, heightPx: 2160 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,530,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.58,0.78,0.88,0.91,0.90,0.88,0.82,0.79,0.72,0.60,0.45,0.31,0.18,0.09]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 400 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 252 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,6.4],[120,3.8],[252,0.7],[400,0.7]] },
                  fullWellE: { interpolation: "linear", points: [[0,47000],[120,18000],[252,11000],[400,10000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.25],[120,0.55],[252,0.18],[400,0.11]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,13.2],[120,12.1],[252,11.0],[400,10.2]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0008],[0,0.0018],[10,0.0042]] }
                },
                recommendedPresets: [0,252]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "partial",
              curveSource: "System Compare 585-series import with estimated companion curves for exposure modeling",
              lastVerified: "2026-05-21"
            }
          },
          {
            cameraId: "zwo-asi585mc-pro",
            name: "ASI585MC Pro",
            manufacturer: "ZWO",
            sensor: "Sony IMX585",
            colorType: "osc",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 3840, heightPx: 2160 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [450,500,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.27,0.47,0.36,0.33,0.33,0.32,0.32,0.31,0.30,0.24,0.13,0.05]
            },
            modes: [
              {
                modeId: "auto",
                modeName: "Auto HCG transition",
                gainRange: { min: 0, max: 400 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 252 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,6.67],[120,3.8],[252,0.7],[400,0.7]] },
                  fullWellE: { interpolation: "linear", points: [[0,47000],[120,18000],[252,11000],[400,10000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.25],[120,0.55],[252,0.18],[400,0.11]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,13.0],[120,11.9],[252,10.9],[400,10.1]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0008],[0,0.0018],[10,0.0042]] }
                },
                recommendedPresets: [0,252]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 50 },
            dataQuality: {
              level: "generic",
              curveSource: "System Compare 585-series import with OSC-averaged QE and estimated companion curves",
              lastVerified: "2026-05-21"
            }
          },
          {
            cameraId: "zwo-asi678mm",
            name: "ASI678MM",
            manufacturer: "ZWO",
            sensor: "Sony IMX678",
            colorType: "mono",
            pixelSizeUm: 2.0,
            resolution: { widthPx: 3840, heightPx: 2160 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,530,550,600,656,700,750,800,850],
              relativeQe: [0.42,0.65,0.78,0.83,0.82,0.78,0.65,0.52,0.36,0.22,0.12]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG / low-noise planning curve",
              gainRange: { min: 0, max: 300 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 182 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,2.7],[100,1.6],[182,0.8],[300,0.6]] },
                fullWellE: { interpolation: "linear", points: [[0,11270],[100,6500],[182,3400],[300,2200]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,0.42],[100,0.24],[182,0.13],[300,0.08]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,12.0],[100,12.0],[182,12.1],[300,11.8]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-10,0.0015],[0,0.0035],[10,0.008],[20,0.020]] }
              },
              recommendedPresets: [0,182]
            }],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: { level: "partial", curveSource: "Official ZWO ASI678 operating specs plus compact IMX678 mono QE curve", lastVerified: "2026-07-27" }
          },
          {
            cameraId: "zwo-asi678mc",
            name: "ASI678MC",
            manufacturer: "ZWO",
            sensor: "Sony IMX678",
            colorType: "osc",
            pixelSizeUm: 2.0,
            resolution: { widthPx: 3840, heightPx: 2160 },
            adcBits: 12,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,530,550,600,656,700,750,800,850],
              relativeQe: [0.10,0.30,0.42,0.38,0.32,0.29,0.23,0.16,0.10,0.05,0.02]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG / low-noise planning curve",
              gainRange: { min: 0, max: 300 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 182 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,2.7],[100,1.6],[182,0.8],[300,0.6]] },
                fullWellE: { interpolation: "linear", points: [[0,11270],[100,6500],[182,3400],[300,2200]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,0.42],[100,0.24],[182,0.13],[300,0.08]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,12.0],[100,12.0],[182,12.1],[300,11.8]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-10,0.0015],[0,0.0035],[10,0.008],[20,0.020]] }
              },
              recommendedPresets: [0,182]
            }],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: { level: "partial", curveSource: "Official ZWO ASI678 operating specs plus compact IMX678 OSC QE proxy", lastVerified: "2026-07-27" }
          },
          {
            cameraId: "playerone-poseidon-m-pro",
            name: "Poseidon-M Pro",
            manufacturer: "Player One",
            sensor: "Sony IMX571",
            colorType: "mono",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 6252, heightPx: 4176 },
            adcBits: 16,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.18,0.42,0.71,0.83,0.90,0.91,0.79,0.56,0.32]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG transition",
              gainRange: { min: 0, max: 200 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 125 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,3.96],[26,2.80],[60,2.05],[125,1.36],[200,1.20]] },
                fullWellE: { interpolation: "linear", points: [[0,71700],[26,52000],[60,34000],[125,16600],[200,9000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.09],[26,0.79],[60,0.52],[125,0.25],[200,0.14]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,14.26],[26,14.00],[60,13.82],[125,13.58],[200,12.1]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.00011],[-15,0.00021],[-10,0.00040],[-5,0.00071],[0,0.00118],[5,0.00205],[10,0.0036],[15,0.0062],[20,0.0105]] }
              },
              recommendedPresets: [0,125]
            }],
            offsetSupport: { supported: true, defaultOffset: 20 },
            dataQuality: { level: "partial", curveSource: "Official Player One operating data plus compact Sony IMX571-family QE curve", lastVerified: "2026-06-04" }
          },
          {
            cameraId: "playerone-poseidon-c-pro",
            name: "Poseidon-C Pro",
            manufacturer: "Player One",
            sensor: "Sony IMX571",
            colorType: "osc",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 6252, heightPx: 4176 },
            adcBits: 16,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.14,0.35,0.43,0.43,0.40,0.32,0.22,0.09,0.03]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG transition",
              gainRange: { min: 0, max: 200 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 125 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,3.90],[26,2.85],[60,2.10],[125,1.00],[200,0.92]] },
                fullWellE: { interpolation: "linear", points: [[0,71700],[26,52000],[60,34000],[125,16600],[200,9000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.09],[26,0.79],[60,0.52],[125,0.25],[200,0.14]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,14.26],[26,14.00],[60,13.82],[125,13.58],[200,12.0]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.000105],[-15,0.00021],[-10,0.00043],[-5,0.00072],[0,0.001178],[5,0.0020],[10,0.0035],[15,0.0060],[20,0.0100]] }
              },
              recommendedPresets: [0,125]
            }],
            offsetSupport: { supported: true, defaultOffset: 20 },
            dataQuality: { level: "partial", curveSource: "Official Player One operating data plus compact Sony IMX571-family OSC QE curve", lastVerified: "2026-06-04" }
          },
          {
            cameraId: "playerone-artemis-c-pro",
            name: "Artemis-C Pro",
            manufacturer: "Player One",
            sensor: "Sony IMX294",
            colorType: "osc",
            pixelSizeUm: 4.63,
            resolution: { widthPx: 4144, heightPx: 2822 },
            adcBits: 14,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.13,0.34,0.42,0.42,0.39,0.32,0.22,0.09,0.03]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG transition",
              gainRange: { min: 0, max: 200 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 120 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,7.8],[60,5.0],[120,1.2],[200,1.1]] },
                fullWellE: { interpolation: "linear", points: [[0,65800],[60,38000],[120,14500],[200,9000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.50],[60,0.88],[120,0.36],[200,0.22]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,13.0],[60,12.9],[120,12.97],[200,11.9]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0015],[-15,0.0024],[-10,0.0038],[-5,0.0058],[0,0.0086],[5,0.0130],[10,0.0190],[15,0.0280],[20,0.0400]] }
              },
              recommendedPresets: [0,120]
            }],
            offsetSupport: { supported: true, defaultOffset: 20 },
            dataQuality: { level: "partial", curveSource: "Official Player One operating data plus compact Sony IMX294-family OSC QE curve", lastVerified: "2026-06-04" }
          },
          {
            cameraId: "playerone-ares-m-pro",
            name: "Ares-M Pro",
            manufacturer: "Player One",
            sensor: "Sony IMX533",
            colorType: "mono",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 3008, heightPx: 3008 },
            adcBits: 14,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.18,0.42,0.71,0.83,0.90,0.91,0.79,0.56,0.32]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG transition",
              gainRange: { min: 0, max: 200 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 125 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,4.46],[26,3.20],[60,2.20],[125,1.00],[200,0.92]] },
                fullWellE: { interpolation: "linear", points: [[0,73000],[26,54000],[60,36000],[125,20000],[200,11000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.10],[26,0.82],[60,0.55],[125,0.30],[200,0.17]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,14.1],[26,13.9],[60,13.6],[125,13.2],[200,12.3]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.00004],[-15,0.00008],[-10,0.00015],[-5,0.00028],[0,0.00050],[5,0.00090],[10,0.0016],[15,0.0028],[20,0.0048]] }
              },
              recommendedPresets: [0,125]
            }],
            offsetSupport: { supported: true, defaultOffset: 20 },
            dataQuality: { level: "partial", curveSource: "Official Player One operating data plus compact Sony IMX533-family QE curve", lastVerified: "2026-06-04" }
          },
          {
            cameraId: "playerone-ares-c-pro",
            name: "Ares-C Pro",
            manufacturer: "Player One",
            sensor: "Sony IMX533",
            colorType: "osc",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 3008, heightPx: 3008 },
            adcBits: 14,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.14,0.35,0.43,0.43,0.40,0.32,0.22,0.09,0.03]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG transition",
              gainRange: { min: 0, max: 200 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 125 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,4.46],[26,3.20],[60,2.20],[125,1.00],[200,0.92]] },
                fullWellE: { interpolation: "linear", points: [[0,73000],[26,54000],[60,36000],[125,20000],[200,11000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.10],[26,0.82],[60,0.55],[125,0.30],[200,0.17]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,14.1],[26,13.9],[60,13.6],[125,13.2],[200,12.3]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.00004],[-15,0.00008],[-10,0.00015],[-5,0.00028],[0,0.00050],[5,0.00090],[10,0.0016],[15,0.0028],[20,0.0048]] }
              },
              recommendedPresets: [0,125]
            }],
            offsetSupport: { supported: true, defaultOffset: 20 },
            dataQuality: { level: "partial", curveSource: "Official Player One operating data plus compact Sony IMX533-family OSC QE curve", lastVerified: "2026-06-04" }
          },
          {
            cameraId: "playerone-uranus-m-pro",
            name: "Uranus-M Pro",
            manufacturer: "Player One",
            sensor: "Sony IMX585",
            colorType: "mono",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 3840, heightPx: 2160 },
            adcBits: 12,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,530,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.58,0.78,0.88,0.91,0.90,0.88,0.82,0.79,0.72,0.60,0.45,0.31,0.18,0.09]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG transition",
              gainRange: { min: 0, max: 400 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 210 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,6.50],[120,3.90],[210,0.70],[300,0.70],[400,0.70]] },
                fullWellE: { interpolation: "linear", points: [[0,47000],[120,22000],[210,11000],[300,7000],[400,4500]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.40],[120,0.65],[210,0.28],[300,0.18],[400,0.11]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,13.4],[120,12.8],[210,12.4],[300,11.8],[400,11.0]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-15,0.0007],[-10,0.0012],[-5,0.0021],[0,0.0050],[5,0.0090],[10,0.016],[15,0.028],[20,0.046]] }
              },
              recommendedPresets: [0,210]
            }],
            offsetSupport: { supported: true, defaultOffset: 20 },
            dataQuality: { level: "partial", curveSource: "Official Player One operating data plus compact Sony IMX585-family QE curve", lastVerified: "2026-06-04" }
          },
          {
            cameraId: "playerone-uranus-c-pro",
            name: "Uranus-C Pro",
            manufacturer: "Player One",
            sensor: "Sony IMX585",
            colorType: "osc",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 3840, heightPx: 2160 },
            adcBits: 12,
            qeModel: {
              type: "reference",
              wavelengthNm: [450,500,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.27,0.47,0.36,0.33,0.33,0.32,0.32,0.31,0.30,0.24,0.13,0.05]
            },
            modes: [{
              modeId: "hcg",
              modeName: "HCG transition",
              gainRange: { min: 0, max: 400 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 210 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,7.20],[120,4.10],[210,0.70],[300,0.70],[400,0.70]] },
                fullWellE: { interpolation: "linear", points: [[0,47000],[120,22000],[210,11000],[300,7000],[400,4500]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.40],[120,0.65],[210,0.28],[300,0.18],[400,0.11]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,13.4],[120,12.8],[210,12.4],[300,11.8],[400,11.0]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-15,0.0007],[-10,0.0012],[-5,0.0021],[0,0.0050],[5,0.0090],[10,0.016],[15,0.028],[20,0.046]] }
              },
              recommendedPresets: [0,210]
            }],
            offsetSupport: { supported: true, defaultOffset: 20 },
            dataQuality: { level: "partial", curveSource: "Official Player One operating data plus compact Sony IMX585-family OSC QE curve", lastVerified: "2026-06-04" }
          },
          {
            cameraId: "qhy600m",
            name: "QHY600M",
            manufacturer: "QHY",
            sensor: "Sony IMX455",
            colorType: "mono",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 9576, heightPx: 6388 },
            adcBits: 16,
            gainDefault: 56,
            hcgGain: 56,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,530,550,600,656,700,750,800],
              relativeQe: [0.68,0.83,0.88,0.91,0.90,0.84,0.74,0.55,0.35,0.18]
            },
            modes: [
              {
                modeId: "photographic",
                modeName: "Photographic / HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 56 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.7],[56,1.0],[200,1.1]] },
                  fullWellE: { interpolation: "linear", points: [[0,51000],[56,22000],[200,18000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.80],[56,0.38],[200,0.12]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.5],[56,13.3],[200,11.6]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0009],[0,0.0019],[10,0.0043]] }
                },
                recommendedPresets: [0,56],
                presetLabels: {
                  0: "Photographic mode / maximum full well",
                  56: "High-gain mode"
                }
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "partial",
              curveSource: "Published read-noise behavior with estimated companion curves",
              lastVerified: "2026-04-24"
            }
          },
          {
            cameraId: "qhy268m",
            name: "QHY268M",
            manufacturer: "QHY",
            sensor: "Sony IMX571",
            colorType: "mono",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 6280, heightPx: 4210 },
            adcBits: 16,
            gainDefault: 56,
            hcgGain: 56,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.18,0.42,0.71,0.83,0.90,0.91,0.79,0.56,0.32]
            },
            modes: [
              {
                modeId: "photographic",
                modeName: "Photographic / HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 56 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,3.56],[26,2.50],[56,1.59],[60,1.52],[100,1.40],[200,1.20]] },
                  fullWellE: { interpolation: "linear", points: [[0,50462],[26,36000],[56,20971],[100,15000],[200,8000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,0.77],[26,0.56],[56,0.32],[100,0.22],[200,0.12]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.0],[26,13.6],[56,13.0],[100,12.3],[200,11.4]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0005],[-15,0.0008],[-10,0.0012],[-5,0.0019],[0,0.0030],[5,0.0048],[10,0.0075],[15,0.011],[20,0.016]] }
                },
                recommendedPresets: [0,56],
                presetLabels: {
                  0: "Photographic mode / maximum full well",
                  56: "High-gain mode"
                }
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "partial",
              curveSource: "Official QHY operating data plus compact shared Sony IMX571-family QE curve",
              lastVerified: "2026-06-12"
            }
          },
          {
            cameraId: "qhy268c",
            name: "QHY268C",
            manufacturer: "QHY",
            sensor: "Sony IMX571",
            colorType: "osc",
            pixelSizeUm: 3.76,
            resolution: { widthPx: 6280, heightPx: 4210 },
            adcBits: 16,
            gainDefault: 56,
            hcgGain: 56,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,450,500,550,600,650,700,750,800],
              relativeQe: [0.20,0.39,0.43,0.42,0.39,0.32,0.22,0.08,0.03]
            },
            modes: [
              {
                modeId: "photographic",
                modeName: "Photographic / HCG transition",
                gainRange: { min: 0, max: 300 },
                modeSwitchBehavior: { hcgActive: false, switchGain: 56 },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,4.17],[26,3.05],[56,1.91],[60,1.82],[100,1.60],[200,1.30]] },
                  fullWellE: { interpolation: "linear", points: [[0,90438],[26,64000],[56,38010],[100,22000],[200,11000]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,1.38],[26,0.92],[56,0.58],[100,0.34],[200,0.18]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,14.4],[26,14.1],[56,13.8],[100,12.9],[200,11.8]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0015],[-15,0.0026],[-10,0.0047],[-5,0.0075],[0,0.011],[5,0.017],[10,0.025],[15,0.037],[20,0.054]] }
                },
                recommendedPresets: [0,56],
                presetLabels: {
                  0: "Photographic mode / maximum full well",
                  56: "High-gain mode"
                }
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "partial",
              curveSource: "Official QHY operating data plus compact shared Sony IMX571-family QE curve",
              lastVerified: "2026-06-12"
            }
          },
          {
            cameraId: "qhy071c",
            name: "QHY071C (IMX071)",
            manufacturer: "QHY",
            sensor: "Sony IMX071",
            colorType: "osc",
            pixelSizeUm: 4.78,
            resolution: { widthPx: 4944, heightPx: 3284 },
            adcBits: 14,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,430,460,500,530,550,600,650,680,700,750,800],
              relativeQe: [0.09,0.19,0.30,0.35,0.31,0.31,0.27,0.21,0.18,0.13,0.06,0.02]
            },
            modes: [
              {
                modeId: "unity_curve",
                modeName: "Unity gain planning curve",
                gainRange: { min: 0, max: 240 },
                modeSwitchBehavior: { hcgActive: false },
                curves: {
                  readNoiseE: { interpolation: "linear", points: [[0,4.8],[30,4.2],[60,3.7],[90,3.2],[120,2.8],[180,2.5],[240,2.3]] },
                  fullWellE: { interpolation: "linear", points: [[0,46300],[30,35000],[60,25500],[90,18500],[120,13000],[180,8200],[240,5600]] },
                  systemGainEPerAdu: { interpolation: "linear", points: [[0,2.2],[60,1.4],[90,1.0],[120,0.72],[180,0.44],[240,0.31]] },
                  dynamicRangeStops: { interpolation: "linear", points: [[0,13.9],[30,13.5],[60,13.1],[90,12.7],[120,12.2],[180,11.5],[240,10.9]] },
                  darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-15,0.0025],[-10,0.0032],[-5,0.0044],[0,0.0063],[5,0.0092],[10,0.0135],[15,0.020],[20,0.030],[25,0.045]] }
                },
                recommendedPresets: [0,90]
              }
            ],
            offsetSupport: { supported: true, defaultOffset: 8 },
            dataQuality: {
              level: "partial",
              curveSource: "System Comparison QHY071C import using compact Sony IMX071 OSC family proxy curves",
              lastVerified: "2026-06-02"
            }
          },
          {
            cameraId: "qhy247c",
            name: "QHY247C (weak QE proxy)",
            manufacturer: "QHY",
            sensor: "Sony IMX193",
            colorType: "osc",
            pixelSizeUm: 3.91,
            resolution: { widthPx: 6024, heightPx: 4024 },
            adcBits: 14,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,430,460,500,530,550,600,650,680,700,750,800],
              relativeQe: [0.10,0.22,0.32,0.38,0.35,0.35,0.33,0.27,0.23,0.18,0.09,0.03]
            },
            modes: [{
              modeId: "unity_curve",
              modeName: "QHY247C weak-proxy planning curve",
              gainRange: { min: 0, max: 3000 },
              modeSwitchBehavior: { hcgActive: false },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,2.7],[1200,2.2],[2200,1.5],[3000,1.0]] },
                fullWellE: { interpolation: "linear", points: [[0,36000],[2200,14000],[3000,9000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.5],[2200,0.55],[3000,0.34]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,13.7],[2200,13.2],[3000,12.4]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-15,0.0012],[-5,0.0024],[5,0.0048],[15,0.010]] }
              },
              recommendedPresets: [0,2200]
            }],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: {
              level: "weak",
              curveSource: "Official QHY247C operating specs; QE uses weak APS-C Sony OSC proxy because no adequate QHY/IMX193 curve was found",
              lastVerified: "2026-07-27"
            }
          },
          {
            cameraId: "qhy183c",
            name: "QHY183C",
            manufacturer: "QHY",
            sensor: "Sony IMX183",
            colorType: "osc",
            pixelSizeUm: 2.4,
            resolution: { widthPx: 5544, heightPx: 3684 },
            adcBits: 12,
            qeModel: {
              type: "reference",
              wavelengthNm: [400,430,460,500,530,550,600,650,680,700,750,800],
              relativeQe: [0.15,0.28,0.40,0.41,0.37,0.34,0.27,0.18,0.11,0.07,0.03,0.01]
            },
            modes: [{
              modeId: "unity",
              modeName: "QHY unity planning curve",
              gainRange: { min: 0, max: 20 },
              modeSwitchBehavior: { hcgActive: false },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,2.7],[5,1.8],[10,1.0],[20,1.0]] },
                fullWellE: { interpolation: "linear", points: [[0,15500],[10,5000],[20,2500]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,3.6],[10,1.0],[20,0.45]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,12.5],[10,12.3],[20,11.3]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-15,0.0024],[-5,0.0050],[5,0.010],[15,0.025]] }
              },
              recommendedPresets: [0,10]
            }],
            offsetSupport: { supported: true, defaultOffset: 8 },
            dataQuality: {
              level: "partial",
              curveSource: "Official QHY183C operating specs plus compact IMX183 OSC family QE proxy",
              lastVerified: "2026-07-27"
            }
          },
          {
            cameraId: "qhy-minicam8m",
            name: "QHY MiniCam8M",
            manufacturer: "QHY",
            sensor: "Sony IMX585",
            colorType: "mono",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 3856, heightPx: 2180 },
            adcBits: 12,
            qeModel: {
              type: "table",
              wavelengthNm: [400,450,500,530,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.58,0.78,0.88,0.91,0.92,0.88,0.81,0.79,0.72,0.60,0.45,0.31,0.18,0.09]
            },
            modes: [{
              modeId: "low_noise",
              modeName: "Low-noise IMX585 planning curve",
              gainRange: { min: 0, max: 400 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 210 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,7.8],[120,4.0],[210,0.76],[400,0.76]] },
                fullWellE: { interpolation: "linear", points: [[0,54000],[120,26000],[210,12000],[400,6000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.5],[120,0.70],[210,0.32],[400,0.16]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,12.8],[120,12.7],[210,13.0],[400,12.4]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0012],[0,0.0050],[10,0.016],[20,0.046]] }
              },
              recommendedPresets: [0,210]
            }],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: { level: "partial", curveSource: "Official QHY MiniCam8 IMX585 specs plus compact manufacturer-family QE curve", lastVerified: "2026-07-27" }
          },
          {
            cameraId: "qhy-minicam8c",
            name: "QHY MiniCam8C",
            manufacturer: "QHY",
            sensor: "Sony IMX585",
            colorType: "osc",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 3856, heightPx: 2180 },
            adcBits: 12,
            qeModel: {
              type: "reference",
              wavelengthNm: [450,500,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.27,0.47,0.36,0.34,0.34,0.33,0.32,0.31,0.30,0.24,0.13,0.06]
            },
            modes: [{
              modeId: "low_noise",
              modeName: "Low-noise IMX585 planning curve",
              gainRange: { min: 0, max: 400 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 210 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,7.8],[120,4.0],[210,0.76],[400,0.76]] },
                fullWellE: { interpolation: "linear", points: [[0,54000],[120,26000],[210,12000],[400,6000]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.5],[120,0.70],[210,0.32],[400,0.16]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,12.8],[120,12.7],[210,13.0],[400,12.4]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-20,0.0004],[-10,0.0012],[0,0.0050],[10,0.016],[20,0.046]] }
              },
              recommendedPresets: [0,210]
            }],
            offsetSupport: { supported: true, defaultOffset: 30 },
            dataQuality: { level: "partial", curveSource: "Official QHY MiniCam8 IMX585 specs plus compact OSC family QE curve", lastVerified: "2026-07-27" }
          },
          {
            cameraId: "zwo-seestar-s30",
            name: "Seestar S30",
            manufacturer: "ZWO",
            sensor: "Sony IMX662",
            colorType: "osc",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 1920, heightPx: 1080 },
            adcBits: 12,
            integratedSystem: { apertureMm: 30, fRatio: 5, focalLengthMm: 150, preferredSets: { broadband: "broadband-osc", broadbandFiltered: "broadband-osc-seestar-lp", narrowband: "narrowband-osc-seestar-lp" } },
            qeModel: {
              type: "reference",
              wavelengthNm: [450,500,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.28,0.47,0.36,0.35,0.35,0.34,0.34,0.32,0.32,0.25,0.12,0.05]
            },
            modes: [{
              modeId: "integrated_auto",
              modeName: "Integrated Seestar planning curve",
              gainRange: { min: 0, max: 400 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 252 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,3.2],[120,1.9],[252,0.8],[400,0.8]] },
                fullWellE: { interpolation: "linear", points: [[0,11000],[120,7000],[252,3500],[400,2500]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.0],[120,0.55],[252,0.25],[400,0.14]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,11.7],[120,11.2],[252,10.6],[400,10.0]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-10,0.004],[0,0.010],[10,0.024],[20,0.060],[30,0.140]] }
              },
              recommendedPresets: [0,252]
            }],
            offsetSupport: { supported: false, defaultOffset: 0 },
            dataQuality: { level: "partial", curveSource: "Official Seestar S30 optical specs plus compact Sony IMX662-family QE proxy; uncooled thermal behavior is approximate", lastVerified: "2026-06-12" }
          },
          {
            cameraId: "zwo-seestar-s50",
            name: "Seestar S50",
            manufacturer: "ZWO",
            sensor: "Sony IMX462",
            colorType: "osc",
            pixelSizeUm: 2.9,
            resolution: { widthPx: 1920, heightPx: 1080 },
            adcBits: 12,
            integratedSystem: { apertureMm: 50, fRatio: 5, focalLengthMm: 250, preferredSets: { broadband: "broadband-osc", broadbandFiltered: "broadband-osc-seestar-lp", narrowband: "narrowband-osc-seestar-lp" } },
            qeModel: {
              type: "reference",
              wavelengthNm: [450,500,550,600,656,672,700,750,800,850,900,950],
              relativeQe: [0.26,0.42,0.32,0.29,0.30,0.29,0.29,0.32,0.35,0.35,0.27,0.15]
            },
            modes: [{
              modeId: "integrated_auto",
              modeName: "Integrated Seestar planning curve",
              gainRange: { min: 0, max: 400 },
              modeSwitchBehavior: { hcgActive: false, switchGain: 252 },
              curves: {
                readNoiseE: { interpolation: "linear", points: [[0,3.5],[120,2.1],[252,0.8],[400,0.8]] },
                fullWellE: { interpolation: "linear", points: [[0,11000],[120,7000],[252,3500],[400,2500]] },
                systemGainEPerAdu: { interpolation: "linear", points: [[0,1.0],[120,0.55],[252,0.25],[400,0.14]] },
                dynamicRangeStops: { interpolation: "linear", points: [[0,11.6],[120,11.1],[252,10.6],[400,10.0]] },
                darkCurrentEPerPxPerSec: { interpolation: "linear", points: [[-10,0.004],[0,0.010],[10,0.024],[20,0.060],[30,0.140]] }
              },
              recommendedPresets: [0,252]
            }],
            offsetSupport: { supported: false, defaultOffset: 0 },
            dataQuality: { level: "partial", curveSource: "Official Seestar S50 optical specs plus compact Sony IMX462-family QE proxy; uncooled thermal behavior is approximate", lastVerified: "2026-06-12" }
          }
        ]
      };
  
      function cloneData(data) {
        return JSON.parse(JSON.stringify(data));
      }
  
      const appState = cloneData(DATA.defaults);
      const CONFIG_SCHEMA = "astro-exposure-explorer-config";
      const CONFIG_VERSION = 3;
      const EMPIRICAL_CAL_KEYS = [
        "testExposureSec",
        "measuredBackgroundValue",
        "measuredBackgroundUnits",
        "backgroundMeasurementStatus",
        "biasPedestalAdu",
        "trueGainEPerAdu",
        "bitDepthScalingMode",
        "empiricalReadNoiseE",
        "optionalDarkCurrentEPerPxPerSec"
      ];
      const CONFIG_EXPORT_KEYS = Object.keys(DATA.defaults).filter((key) => ![
        "debugMode",
        "activeMainTab",
        "planStatus",
        "planStatusLevel",
        "configIoStatus",
        "configIoStatusLevel",
        "throughputAdvancedOpen",
        "throughputOverrideStatus",
        "throughputOverrideStatusLevel",
        "configLoadedFileName",
        "configDirtySinceLoad",
        "setupOpenSystem",
        "setupOpenFilters",
        "setupOpenSky",
        "setupOpenWorkflow",
        "setupOpenCalibration",
        "setupOpenConfig"
      ].includes(key));
  
      function getCamera(cameraId) {
        return DATA.cameras.find((camera) => camera.cameraId === cameraId) || DATA.cameras[0];
      }
  
      function cameraHcgSwitchGain(camera, mode = camera?.modes?.[0]) {
        if (Number.isFinite(camera?.hcgGain)) return camera.hcgGain;
        if (Number.isFinite(mode?.modeSwitchBehavior?.switchGain)) return mode.modeSwitchBehavior.switchGain;
        const presets = Array.isArray(mode?.recommendedPresets) ? mode.recommendedPresets : [];
        const highGainPreset = presets.find((value) => Number.isFinite(value) && value > 0);
        return Number.isFinite(highGainPreset) ? highGainPreset : null;
      }
  
      function recommendedDefaultGain(camera) {
        const mode = camera?.modes?.[0];
        const presets = Array.isArray(mode?.recommendedPresets) ? mode.recommendedPresets : [];
        if (Number.isFinite(camera?.gainDefault)) return camera.gainDefault;
        const switchGain = cameraHcgSwitchGain(camera, mode);
        if (Number.isFinite(switchGain) && presets.includes(switchGain)) return switchGain;
        const nonZeroPreset = presets.find((value) => Number.isFinite(value) && value > 0);
        if (Number.isFinite(nonZeroPreset)) return nonZeroPreset;
        return Number.isFinite(presets[0]) ? presets[0] : 0;
      }
  
      function gainPresetLabel(camera, value) {
        const mode = camera?.modes?.[0];
        const presetLabel = mode?.presetLabels?.[value];
        if (presetLabel) return `${presetLabel} (${value})`;
        const switchGain = cameraHcgSwitchGain(camera, mode);
        if (Number.isFinite(switchGain) && value === switchGain) {
          return `HCG / default ${value}`;
        }
        if (value === 0) return "Low gain 0";
        if (Number.isFinite(switchGain) && value > switchGain) return `High gain ${value}`;
        return `Gain ${value}`;
      }
  
      function gainBehaviorNote(camera) {
        const mode = camera?.modes?.[0];
        const switchGain = cameraHcgSwitchGain(camera, mode);
        if (Number.isFinite(switchGain)) {
          return `This camera has a modeled high-gain / HCG switch at gain ${switchGain}: read noise drops there, while full-well headroom is lower. The camera does not change gain during capture.`;
        }
        return "Gain changes read noise, full well, and system gain according to the selected camera model.";
      }
  
      function defaultEmpiricalCalibrationRecord() {
        const record = {};
        EMPIRICAL_CAL_KEYS.forEach((key) => {
          record[key] = cloneData(DATA.defaults[key]);
        });
        return record;
      }
  
      function getCalibrationFilterId() {
        return appState.calibrationFilterId || appState.activeFilterId || appState.selectedFilters[0] || null;
      }
  
      function getEmpiricalCalibrationRecord(filterId) {
        const hasPerFilterStore = !!Object.keys(appState.empiricalCalibrationsByFilter || {}).length;
        const legacy = defaultEmpiricalCalibrationRecord();
        if (!hasPerFilterStore) {
          EMPIRICAL_CAL_KEYS.forEach((key) => {
            legacy[key] = cloneData(appState[key]);
          });
        }
        const stored = cloneData((appState.empiricalCalibrationsByFilter || {})[filterId] || {});
        return {
          ...defaultEmpiricalCalibrationRecord(),
          ...legacy,
          ...stored
        };
      }
  
      function flatEmpiricalLooksCustomized() {
        return EMPIRICAL_CAL_KEYS.some((key) => JSON.stringify(appState[key]) !== JSON.stringify(DATA.defaults[key]));
      }
  
      function hasUsableEmpiricalCalibration(filterId) {
        const store = appState.empiricalCalibrationsByFilter || {};
        const stored = store[filterId];
        if (stored && Number.isFinite(stored.testExposureSec) && stored.testExposureSec > 0
          && Number.isFinite(stored.measuredBackgroundValue) && stored.measuredBackgroundValue > 0) {
          return true;
        }
        if (!Object.keys(store).length && flatEmpiricalLooksCustomized()) {
          return Number.isFinite(appState.testExposureSec) && appState.testExposureSec > 0
            && Number.isFinite(appState.measuredBackgroundValue) && appState.measuredBackgroundValue > 0;
        }
        return false;
      }
  
      function syncActiveFilterCalibrationToFlatFields() {
        const filterId = getCalibrationFilterId();
        if (!filterId) return;
        const record = getEmpiricalCalibrationRecord(filterId);
        EMPIRICAL_CAL_KEYS.forEach((key) => {
          appState[key] = cloneData(record[key]);
        });
      }
  
      function persistActiveFilterCalibration() {
        const filterId = getCalibrationFilterId();
        if (!filterId) return;
        if (!appState.empiricalCalibrationsByFilter || typeof appState.empiricalCalibrationsByFilter !== "object") {
          appState.empiricalCalibrationsByFilter = {};
        }
        const filter = resolveFilter(filterId);
        const camera = getCamera(appState.cameraId);
        const captureModeId = appState.modeId === "auto" ? camera.modes[0].modeId : appState.modeId;
        appState.empiricalCalibrationsByFilter[filterId] = {
          ...getEmpiricalCalibrationRecord(filterId),
          ...Object.fromEntries(EMPIRICAL_CAL_KEYS.map((key) => [key, cloneData(appState[key])])),
          captureCameraId: appState.cameraId,
          captureModeId,
          captureGain: appState.gain,
          captureTempC: appState.tempC,
          captureFilterId: filterId,
          captureFilterName: filter?.name || filterId
        };
      }
  
      function markConfigDirty() {
        if (appState.configLoadedFileName) {
          appState.configDirtySinceLoad = true;
        }
      }
  
      function getCalculatedThroughputFrac() {
        return clamp(Number(appState.throughputFrac) || DATA.defaults.throughputFrac, 0.3, 0.99);
      }
  
      function hasValidCustomThroughputPct() {
        const pct = Number(appState.customThroughputOverridePct);
        return Number.isFinite(pct) && pct >= 30 && pct <= 99;
      }
  
      function getActiveThroughputFrac() {
        if (!appState.customThroughputOverrideEnabled || !hasValidCustomThroughputPct()) return getCalculatedThroughputFrac();
        return appState.customThroughputOverridePct / 100;
      }
  
      function getThroughputUiState() {
        const calculatedPct = Math.round(getCalculatedThroughputFrac() * 100);
        const activePct = Math.round(getActiveThroughputFrac() * 100);
        const usingCustom = !!appState.customThroughputOverrideEnabled;
        const customInvalid = usingCustom && !hasValidCustomThroughputPct();
        const advisoryMessage = appState.throughputOverrideStatus || (
          customInvalid
            ? "Enter a custom optics + filter throughput between 30% and 99%."
            : usingCustom
            ? activePct > 95
              ? "Values above 95% are uncommon for a full optical/filter train and may overstate system performance."
              : activePct < 60
                ? "Values below 60% may be valid for obstructed, dusty, heavily filtered, or complex optical systems, but should be checked."
                : "Changing this value directly affects modeled signal and sky background. Most users should leave this set to the calculated estimate unless they have measured system throughput or a strong reason to override it."
            : calculatedPct < 88
              ? "Full-system throughput can look lower than expected because small losses multiply across the optical path."
              : ""
        );
        const advisoryLevel = appState.throughputOverrideStatus
          ? (appState.throughputOverrideStatusLevel || "neutral")
          : customInvalid
            ? "error"
            : usingCustom
            ? activePct > 95 || activePct < 60
              ? "warn"
              : "neutral"
            : "neutral";
        return {
          calculatedPct,
          activePct,
          usingCustom,
          statusLabel: usingCustom ? "Custom" : "Calculated",
          advisoryMessage,
          advisoryLevel
        };
      }
  
        function currentToolVersion() {
            return "v1.0.53";
        }
  
      function buildConfigFileName() {
        const camera = getCamera(appState.cameraId);
        const filterTagSource = appState.selectedFilters.length > 1
          ? (appState.filterSetId || "filter-set")
          : (appState.activeFilterId || "config");
        const filterTag = filterTagSource.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
        const cameraTag = `${camera.manufacturer}-${camera.name}`.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
        return `${cameraTag || "astro-exposure"}-${filterTag || "config"}.json`;
      }
  
      function serializeConfiguration() {
        const configuration = {};
        CONFIG_EXPORT_KEYS.forEach((key) => {
          configuration[key] = cloneData(appState[key]);
        });
        return {
          schema: CONFIG_SCHEMA,
          schemaVersion: CONFIG_VERSION,
          tool: "Astro Exposure Explorer",
          toolVersion: currentToolVersion(),
          exportedAt: new Date().toISOString(),
          configuration
        };
      }
  
      function applyImportedConfiguration(payload, sourceName = "") {
        const imported = payload && typeof payload === "object" && payload.configuration && typeof payload.configuration === "object"
          ? payload.configuration
          : payload;
        const importKind = payload && typeof payload === "object" ? (payload.exportType || payload.schema || "") : "";
        if (!imported || typeof imported !== "object") {
          throw new Error("JSON file does not contain a configuration object.");
        }
        const nextState = cloneData(DATA.defaults);
        CONFIG_EXPORT_KEYS.forEach((key) => {
          if (Object.prototype.hasOwnProperty.call(imported, key)) {
            nextState[key] = cloneData(imported[key]);
          }
        });
        Object.assign(appState, nextState, {
          configIoStatus: importKind === "filter-set-plan"
            ? "Setup restored from a saved plan JSON. Full system state was reapplied."
            : "Setup loaded from JSON file.",
          configIoStatusLevel: "success",
          configLoadedFileName: sourceName || appState.configLoadedFileName || "",
          configDirtySinceLoad: false
        });
        syncCameraDependentState();
      }
  
      function downloadConfigurationJson() {
        try {
          const payload = serializeConfiguration();
          const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement("a");
          anchor.href = url;
          anchor.download = buildConfigFileName();
          document.body.appendChild(anchor);
          anchor.click();
          anchor.remove();
          URL.revokeObjectURL(url);
          appState.configIoStatus = "Configuration exported as a JSON download.";
          appState.configIoStatusLevel = "success";
          appState.configDirtySinceLoad = false;
        } catch (error) {
          appState.configIoStatus = "Configuration export failed.";
          appState.configIoStatusLevel = "error";
        }
        rerender();
      }
  
      function importConfigurationFile(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const parsed = JSON.parse(String(reader.result || "{}"));
            applyImportedConfiguration(parsed, file.name || "");
            rerender();
          } catch (error) {
            appState.configIoStatus = error?.message || "Configuration import failed.";
            appState.configIoStatusLevel = "error";
            rerender();
          }
        };
        reader.onerror = () => {
          appState.configIoStatus = "Configuration import failed while reading the file.";
          appState.configIoStatusLevel = "error";
          rerender();
        };
        reader.readAsText(file);
      }
  
      function downloadTextFile(contents, filename, mimeType = "text/plain") {
        const blob = new Blob([contents], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      }
  
      async function copyTextToClipboard(text) {
        if (navigator.clipboard?.writeText) {
          try {
            await navigator.clipboard.writeText(text);
            return true;
          } catch (error) {
            // Fall through to the legacy copy path below.
          }
        }
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "readonly");
        textarea.style.position = "fixed";
        textarea.style.top = "-9999px";
        textarea.style.left = "-9999px";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        let copied = false;
        try {
          copied = document.execCommand("copy");
        } catch (error) {
          copied = false;
        }
        textarea.remove();
        return copied;
      }
  
      function downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(url);
      }
  
      function drawRoundedRect(ctx, x, y, width, height, radius, fillStyle, strokeStyle = null, lineWidth = 1) {
        const r = Math.min(radius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + height, r);
        ctx.arcTo(x + width, y + height, x, y + height, r);
        ctx.arcTo(x, y + height, x, y, r);
        ctx.arcTo(x, y, x + width, y, r);
        ctx.closePath();
        if (fillStyle) {
          ctx.fillStyle = fillStyle;
          ctx.fill();
        }
        if (strokeStyle) {
          ctx.lineWidth = lineWidth;
          ctx.strokeStyle = strokeStyle;
          ctx.stroke();
        }
      }
  
      function traceRoundedRectPath(ctx, x, y, width, height, radius) {
        const r = Math.min(radius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + height, r);
        ctx.arcTo(x + width, y + height, x, y + height, r);
        ctx.arcTo(x, y + height, x, y, r);
        ctx.arcTo(x, y, x + width, y, r);
        ctx.closePath();
      }
  
      function createZoneGradient(ctx, zoneName, x, width) {
        const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
        const stops = {
          too_short: ["#7d8fc6", "#6374a9"],
          lower_floor_gap: ["#96a3b4", "#75879a"],
          lean_workable: ["#43ade8", "#2f8fcd"],
          sweet_spot: ["#60d98d", "#43ba74"],
          long_risky: ["#efd158", "#d4ad29"],
          too_long: ["#ef8a4b", "#c45c2f"]
        }[zoneName] || ["#7d8fc6", "#6374a9"];
        gradient.addColorStop(0, stops[0]);
        gradient.addColorStop(1, stops[1]);
        return gradient;
      }
  
      function wrapCanvasText(ctx, text, maxWidth) {
        const words = String(text || "").split(/\s+/).filter(Boolean);
        if (!words.length) return [""];
        const lines = [];
        let current = words.shift();
        words.forEach((word) => {
          const next = `${current} ${word}`;
          if (ctx.measureText(next).width <= maxWidth) {
            current = next;
          } else {
            lines.push(current);
            current = word;
          }
        });
        lines.push(current);
        return lines;
      }
  
      function drawCanvasWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
        const lines = wrapCanvasText(ctx, text, maxWidth).slice(0, maxLines);
        lines.forEach((line, index) => ctx.fillText(line, x, y + index * lineHeight));
        return lines.length;
      }
  
      function drawCanvasPill(ctx, text, x, y, maxWidth, tone = "dark") {
        ctx.save();
        ctx.font = "600 18px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        const label = String(text || "");
        const textWidth = Math.min(ctx.measureText(label).width, maxWidth - 28);
        const width = Math.min(maxWidth, Math.max(82, textWidth + 28));
        const palette = tone === "accent"
          ? { fill: "#203744", stroke: "#4b9eb7", text: "#d8f4ff" }
          : { fill: "#111827", stroke: "rgba(245, 210, 84, 0.25)", text: "#f8fafc" };
        drawRoundedRect(ctx, x - width / 2, y, width, 30, 15, palette.fill, palette.stroke, 1.2);
        ctx.fillStyle = palette.text;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, x, y + 15);
        ctx.restore();
      }
  
      function drawThresholdMarker(ctx, x, railTop, barHeight, label) {
        ctx.save();
        drawCanvasPill(ctx, label, x, railTop - 52, 150);
        ctx.strokeStyle = "rgba(255,255,255,0.28)";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(x, railTop - 16);
        ctx.lineTo(x, railTop + barHeight + 8);
        ctx.stroke();
        ctx.restore();
      }
  
      function drawHeroExportCanvas(results) {
        const multiFilterMode = results.length > 1;
        const camera = getCamera(appState.cameraId);
        const canvasWidth = 1800;
        const panelPadding = 36;
        const outerPadding = 28;
        const rowHeight = multiFilterMode ? 210 : 300;
        const titleHeight = 84;
        const legendHeight = 88;
        const axisHeight = 56;
        const canvasHeight = outerPadding * 2 + titleHeight + results.length * rowHeight + legendHeight + axisHeight + 12;
        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext("2d");
  
        ctx.fillStyle = "#0b1220";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        const bgGradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
        bgGradient.addColorStop(0, "#13263a");
        bgGradient.addColorStop(1, "#0f1727");
        drawRoundedRect(ctx, outerPadding, outerPadding, canvasWidth - outerPadding * 2, canvasHeight - outerPadding * 2, 26, bgGradient, "rgba(112, 201, 193, 0.22)", 2);
  
        ctx.fillStyle = "#f2cb62";
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
        ctx.font = "900 34px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillText("EXPOSURE RECOMMENDATIONS", outerPadding + panelPadding, outerPadding + 48);
        ctx.font = "400 22px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillStyle = "#a8bbd3";
        ctx.fillText(
          multiFilterMode
            ? "Shared-scale filter plan across the active set"
            : `${results[0].input.filter.name} recommendation overview`,
          outerPadding + panelPadding,
          outerPadding + 78
        );
  
        const displayThresholds = results.map((result) => displayThresholdsForResult(result));
        const domainBase = multiFilterMode
          ? Math.max(...displayThresholds.map((thresholds) => thresholds.hardMaxSec * 1.08), 120)
          : Math.max(displayThresholds[0].hardMaxSec * 1.08, displayThresholds[0].sweetSpotMaxSec * 1.15, 120);
        const axis = buildAxisTicks(domainBase);
        const maxDomain = axis.majorTicks[axis.majorTicks.length - 1];
        const barStartX = outerPadding + panelPadding + 360;
        const barEndX = canvasWidth - outerPadding - panelPadding - 160;
        const barWidth = barEndX - barStartX;
        const posX = (value) => barStartX + clamp(value / maxDomain, 0, 1) * barWidth;
  
        results.forEach((result, index) => {
          const displayT = displayThresholdsForResult(result);
          const y = outerPadding + titleHeight + index * rowHeight;
          const cardX = outerPadding + panelPadding;
          const cardY = y + 10;
          const cardWidth = canvasWidth - (outerPadding + panelPadding) * 2;
          const cardHeight = multiFilterMode ? 178 : 250;
          const cardGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY + cardHeight);
          cardGradient.addColorStop(0, "#142436");
          cardGradient.addColorStop(1, "#13202e");
          drawRoundedRect(ctx, cardX, cardY, cardWidth, cardHeight, 22, cardGradient, "rgba(112, 201, 193, 0.18)", 2);
  
          ctx.textAlign = "left";
          ctx.textBaseline = "alphabetic";
          ctx.fillStyle = "#f8fafc";
          ctx.font = "700 24px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
          ctx.fillText(result.input.filter.name, cardX + 22, cardY + 34);
          ctx.fillStyle = "#bfd0e5";
          ctx.font = "600 14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
          drawCanvasWrappedText(
            ctx,
            `Lower-bound source: ${result.thresholds.lowerBoundSource === "measured" ? "Measured calibration" : "Modeled planning sky"} · ${result.synthesis.upperBoundDrivers[0]?.label || "Bright-star saturation"} · Weight 1×`,
            cardX + 22,
            cardY + 62,
            300,
            22,
            4
          );
  
          ctx.textAlign = "right";
          ctx.fillStyle = "#f8fafc";
          ctx.font = "700 22px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
          ctx.fillText(fmtSeconds(result.headlineRecommendation.anchorSec), cardX + cardWidth - 22, cardY + 34);
          ctx.fillStyle = "#bfd0e5";
          ctx.font = "600 14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
          ctx.fillText(fmtRange(displayT.sweetSpotMinSec, displayT.sweetSpotMaxSec), cardX + cardWidth - 22, cardY + 62);
          ctx.textAlign = "left";
  
          const railTop = cardY + 56;
          const barHeight = 64;
          drawRoundedRect(ctx, barStartX, railTop, barWidth, barHeight, 28, "#0c1420", "rgba(255,255,255,0.16)", 1.5);
          const zones = buildDisplayRailZones(result);
          ctx.save();
          traceRoundedRectPath(ctx, barStartX, railTop, barWidth, barHeight, 28);
          ctx.clip();
          zones.forEach((zone) => {
            const zoneStart = posX(zone.startSec);
            const zoneEnd = zone.endSec == null ? barEndX : posX(zone.endSec);
            const width = Math.max(4, zoneEnd - zoneStart);
            ctx.fillStyle = createZoneGradient(ctx, zone.name, zoneStart, width);
            ctx.fillRect(zoneStart, railTop, width, barHeight);
            const names = zoneNames(zone.name);
            if (width > 150) {
              ctx.fillStyle = zone.name === "too_short" || zone.name === "lower_floor_gap" ? "#0b1320" : "#f8fafc";
              ctx.font = "700 18px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(names.short, zoneStart + width / 2, railTop + barHeight / 2);
            }
          });
          ctx.restore();
  
          const sweetStartX = posX(displayT.sweetSpotMinSec);
          const sweetEndX = posX(displayT.sweetSpotMaxSec);
          drawRoundedRect(ctx, sweetStartX, railTop + 8, Math.max(6, sweetEndX - sweetStartX), barHeight - 16, 20, null, "rgba(255,255,255,0.92)", 3);
  
          const anchorX = posX(result.headlineRecommendation.anchorSec);
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(anchorX, railTop - 2);
          ctx.lineTo(anchorX, railTop + barHeight + 16);
          ctx.stroke();
          drawRoundedRect(ctx, anchorX - 2, railTop - 2, 4, barHeight + 16, 2, "rgba(255,255,255,0.95)");
  
          const markers = [
            { label: "Op start", value: displayT.sweetSpotMinSec },
            ...(result.thresholds.skyPedestalCautionSec <= maxDomain * 1.02 ? [{ label: "Sky", value: result.thresholds.skyPedestalCautionSec }] : []),
            { label: "Sat", value: result.thresholds.saturationCautionSec },
            { label: "Ceiling", value: displayT.hardMaxSec }
          ];
          markers.forEach((marker) => {
            drawThresholdMarker(ctx, posX(marker.value), railTop, barHeight, marker.label);
          });
        });
  
        const axisY = outerPadding + titleHeight + results.length * rowHeight + 8;
        ctx.strokeStyle = "rgba(196, 210, 226, 0.75)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(barStartX, axisY);
        ctx.lineTo(barEndX, axisY);
        ctx.stroke();
        axis.minorTicks.forEach((tick) => {
          const x = posX(tick);
          ctx.strokeStyle = "rgba(196, 210, 226, 0.28)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, axisY - 10);
          ctx.lineTo(x, axisY + 10);
          ctx.stroke();
        });
        axis.majorTicks.forEach((tick) => {
          const x = posX(tick);
          ctx.strokeStyle = "rgba(220, 231, 243, 0.72)";
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(x, axisY - 18);
          ctx.lineTo(x, axisY + 18);
          ctx.stroke();
          ctx.fillStyle = "#d8e4f1";
          ctx.font = "700 15px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
          ctx.textAlign = tick === 0 ? "left" : tick === maxDomain ? "right" : "center";
          ctx.fillText(`${tick}s`, x, axisY + 42);
        });
        ctx.textAlign = "right";
        ctx.fillStyle = "#c5d3e2";
        ctx.font = "700 18px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        ctx.fillText("exposure time", barEndX, axisY + 78);
  
        const legendItems = [
          ["Read Noise Regime", "#7386bf"],
          ["Operational Overhead Floor", "#8393a4"],
          ["Practical Operating Band", "#4cc67b"],
          ["Saturation / Workflow Risk", "#deb939"],
          ["Hard Ceiling", "#db713d"]
        ];
        let legendX = outerPadding + panelPadding;
        let legendY = axisY + 92;
        legendItems.forEach(([label, color]) => {
          ctx.font = "600 18px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
          const pillWidth = ctx.measureText(label).width + 52;
          if (legendX + pillWidth > canvasWidth - outerPadding - panelPadding) {
            legendX = outerPadding + panelPadding;
            legendY += 48;
          }
          drawRoundedRect(ctx, legendX, legendY - 24, pillWidth, 38, 18, "rgba(255,255,255,0.06)", "rgba(255,255,255,0.16)", 1.2);
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(legendX + 20, legendY - 5, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#e5edf6";
          ctx.textAlign = "left";
          ctx.fillText(label, legendX + 36, legendY);
          legendX += pillWidth + 14;
        });
  
        return canvas;
      }
  
      function inlineComputedStyles(source, target) {
        const computed = window.getComputedStyle(source);
        const styleText = Array.from(computed)
          .map((property) => `${property}:${computed.getPropertyValue(property)};`)
          .join("");
        target.setAttribute("style", styleText);
      }
  
      function cloneNodeWithInlineStyles(node) {
        if (node.nodeType === Node.TEXT_NODE) {
          return document.createTextNode(node.textContent || "");
        }
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return document.createTextNode("");
        }
        const sourceEl = node;
        const clone = sourceEl.cloneNode(false);
        inlineComputedStyles(sourceEl, clone);
        if (clone instanceof HTMLElement && sourceEl instanceof HTMLInputElement) {
          clone.setAttribute("value", sourceEl.value);
        }
        Array.from(sourceEl.childNodes).forEach((child) => {
          clone.appendChild(cloneNodeWithInlineStyles(child));
        });
        return clone;
      }
  
      async function renderElementToPngBlob(element, { scale = 2 } = {}) {
        if (!element) throw new Error("Export target not found.");
        const rect = element.getBoundingClientRect();
        const width = Math.ceil(rect.width);
        const height = Math.ceil(rect.height);
        if (!width || !height) throw new Error("Export target has no visible size.");
  
        const cloned = cloneNodeWithInlineStyles(element);
        cloned.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        cloned.style.margin = "0";
        cloned.style.width = `${width}px`;
        cloned.style.height = `${height}px`;
        cloned.style.boxSizing = "border-box";
  
        const wrapper = document.createElement("div");
        wrapper.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
        wrapper.style.width = `${width}px`;
        wrapper.style.height = `${height}px`;
        wrapper.style.margin = "0";
        wrapper.style.padding = "0";
        wrapper.style.background = "transparent";
        wrapper.appendChild(cloned);
  
        const svgMarkup = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width * scale}" height="${height * scale}" viewBox="0 0 ${width} ${height}">
            <foreignObject x="0" y="0" width="${width}" height="${height}">
              ${new XMLSerializer().serializeToString(wrapper)}
            </foreignObject>
          </svg>
        `;
        const blob = new Blob([svgMarkup], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        try {
          const image = await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("DOM capture image decode failed."));
            img.src = url;
          });
          const canvas = document.createElement("canvas");
          canvas.width = width * scale;
          canvas.height = height * scale;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          const pngBlob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
          if (!pngBlob) throw new Error("PNG export failed.");
          return pngBlob;
        } finally {
          URL.revokeObjectURL(url);
        }
      }
  
      async function renderHeroGraphicBlob(results) {
        if (!Array.isArray(results) || !results.length) throw new Error("No results available for hero export.");
        if (document.fonts?.ready) {
          try {
            await document.fonts.ready;
          } catch (error) {
            // Continue even if font readiness is unavailable.
          }
        }
        const liveHero = document.getElementById("heroRecommendation");
        if (liveHero) {
          try {
            return await renderElementToPngBlob(liveHero, { scale: 2 });
          } catch (error) {
            console.warn("Live hero capture failed, falling back to canvas redraw.", error);
          }
        }
        const canvas = drawHeroExportCanvas(results);
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
        if (!blob) throw new Error("PNG export failed.");
        return blob;
      }
  
      
    function collectPrintableStyles() {
      const inlineStyles = Array.from(document.querySelectorAll("style"))
        .map((style) => style.outerHTML)
        .join("\n");
      const linkedCss = Array.from(document.styleSheets || [])
        .map((sheet) => {
          try {
            return Array.from(sheet.cssRules || []).map((rule) => rule.cssText).join("\n");
          } catch (error) {
            return "";
          }
        })
        .filter(Boolean)
        .map((cssText) => `<style>\n${cssText}\n</style>`)
        .join("\n");
      return [inlineStyles, linkedCss].filter(Boolean).join("\n");
    }
  
    function absolutizeAppendixAssets(node) {
      const clone = node.cloneNode(true);
      clone.querySelectorAll("img[src]").forEach((img) => {
        const src = img.getAttribute("src");
        if (!src) return;
        try {
          img.setAttribute("src", new URL(src, document.baseURI).href);
        } catch (error) {
          // Leave the original source in place if URL resolution fails.
        }
      });
      return clone;
    }
  
    function exportAppendixPdf() {
      const appendixPanel = document.querySelector('[data-panel="appendix"] .ap-paper');
      if (!appendixPanel) return;
      const styles = collectPrintableStyles();
      const appendixExportNode = absolutizeAppendixAssets(appendixPanel);
      const title = `Astro Exposure Explorer Technical Appendix ${currentToolVersion()}`;
      const printableHtml = `
        <!doctype html>
        <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>${title}</title>
          ${styles}
          <style>
            @page{
              size:auto;
              margin:0.55in;
            }
            *{
              -webkit-print-color-adjust:exact !important;
              print-color-adjust:exact !important;
            }
            body.appendix-export{
              margin:0;
              padding:20px 20px 28px;
              background:#ffffff;
              color:#111827;
              font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            }
            .appendix-export-toolbar{
              position:sticky;
              top:0;
              z-index:10;
              display:flex;
              align-items:center;
              justify-content:space-between;
              gap:12px;
              margin:0 auto 16px;
              max-width:1080px;
              padding:10px 12px;
              border:1px solid rgba(15,23,42,.12);
              border-radius:12px;
              background:#f8fafc;
              color:#334155;
            }
            .appendix-export-toolbar-text{
              font-size:0.84rem;
              line-height:1.45;
            }
            .appendix-export-toolbar button{
              appearance:none;
              border:none;
              cursor:pointer;
              padding:10px 14px;
              border-radius:10px;
              background:#0f172a;
              color:#ffffff;
              font-weight:800;
              font-size:0.82rem;
            }
            .appendix-export .ap-paper{
              max-width:1080px;
              margin:0 auto;
              background:#ffffff;
              border:none;
              box-shadow:none;
              padding:0;
              gap:18px;
            }
            .appendix-export .ap-header,
            .appendix-export .ap-toc,
            .appendix-export .ap-section,
            .appendix-export .ap-figure,
            .appendix-export .ap-eqn-block,
            .appendix-export .ap-block,
            .appendix-export .ap-method-group,
            .appendix-export .ap-ref-intro,
            .appendix-export .ap-ref-item,
            .appendix-export .ap-callout,
            .appendix-export .ap-takeaway{
              background:#ffffff !important;
              color:#111827 !important;
              border:1px solid rgba(15,23,42,.16) !important;
              box-shadow:none !important;
            }
            .appendix-export .ap-figure-frame,
            .appendix-export .ap-eqn-display{
              background:#f8fafc !important;
              border:1px solid rgba(15,23,42,.12) !important;
            }
            .appendix-export .ap-figure{
              page-break-inside:avoid;
              break-inside:avoid;
            }
            .appendix-export .ap-figure-frame{
              padding:14px;
            }
            .appendix-export .ap-figure svg{
              width:100%;
              height:auto;
            }
            .appendix-export svg[aria-label="Conceptual exposure regimes"] text,
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] text,
            .appendix-export svg[aria-label="Conceptual noise terms diagram"] text,
            .appendix-export svg[aria-label="Conceptual exposure tradeoff figure"] text{
              font-size:.88em !important;
              fill:#0f172a !important;
              font-weight:700 !important;
            }
            .appendix-export svg[aria-label="Planning mode versus empirical calibration mode schematic"] text{
              font-size:.84em !important;
              fill:#0f172a !important;
              font-weight:700 !important;
            }
            .appendix-export svg[aria-label="Conceptual exposure regimes"] line,
            .appendix-export svg[aria-label="Conceptual exposure regimes"] path,
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] line,
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] path,
            .appendix-export svg[aria-label="Planning mode versus empirical calibration mode schematic"] line,
            .appendix-export svg[aria-label="Planning mode versus empirical calibration mode schematic"] path,
            .appendix-export svg[aria-label="Conceptual exposure tradeoff figure"] line,
            .appendix-export svg[aria-label="Conceptual exposure tradeoff figure"] path{
              stroke-opacity:1 !important;
            }
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] text,
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] tspan{
              fill:#0f172a !important;
            }
            .appendix-export svg[aria-label="Conceptual exposure regimes"] text,
            .appendix-export svg[aria-label="Conceptual exposure regimes"] tspan,
            .appendix-export svg[aria-label="Conceptual noise terms diagram"] text,
            .appendix-export svg[aria-label="Conceptual noise terms diagram"] tspan,
            .appendix-export svg[aria-label="Conceptual exposure tradeoff figure"] text,
            .appendix-export svg[aria-label="Conceptual exposure tradeoff figure"] tspan,
            .appendix-export svg[aria-label="Planning mode versus empirical calibration mode schematic"] text,
            .appendix-export svg[aria-label="Planning mode versus empirical calibration mode schematic"] tspan{
              fill:#0f172a !important;
            }
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] [fill="rgba(255,255,255,.02)"]{
              fill:#ffffff !important;
            }
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] [stroke="rgba(255,255,255,.08)"]{
              stroke:rgba(15,23,42,.14) !important;
            }
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] text[fill="#d6e7f4"],
            .appendix-export svg[aria-label="Lower-bound sensitivity plot"] text[fill="#dfeffc"]{
              fill:#0f172a !important;
            }
            .appendix-export .ap-kicker,
            .appendix-export .ap-subhead,
            .appendix-export .ap-eqn-title{
              color:#8a6508 !important;
            }
            .appendix-export .ap-title,
            .appendix-export .ap-section-title,
            .appendix-export .ap-block-title,
            .appendix-export .ap-method-name,
            .appendix-export .ap-ref-item a,
            .appendix-export .ap-takeaway,
            .appendix-export .ap-callout,
            .appendix-export .ap-eqn-display,
            .appendix-export .ap-eqn-defs li strong,
            .appendix-export .ap-figure-title{
              color:#0f172a !important;
            }
            .appendix-export .ap-subtitle,
            .appendix-export .ap-meta,
            .appendix-export .ap-section-body,
            .appendix-export .ap-section-label,
            .appendix-export .ap-eqn-lead,
            .appendix-export .ap-eqn-note,
            .appendix-export .ap-eqn-defs,
            .appendix-export .ap-bullets,
            .appendix-export .ap-steps,
            .appendix-export .ap-method-desc,
            .appendix-export .ap-ref-summary,
            .appendix-export .ap-figure-caption,
            .appendix-export .ap-toc-title,
            .appendix-export .ap-toc ol,
            .appendix-export .ap-toc a{
              color:#334155 !important;
            }
            .appendix-export .ap-block-value{
              color:#0f172a !important;
            }
            .appendix-export .ap-block-note{
              color:#475569 !important;
            }
            .appendix-export .ap-method-desc strong,
            .appendix-export .ap-callout strong,
            .appendix-export .ap-block strong,
            .appendix-export .ap-figure-caption strong,
            .appendix-export .ap-meta strong{
              color:#0f172a !important;
            }
            .appendix-export .ap-header-actions,
            .appendix-export .ghost,
            .appendix-export .ap-paper button{
              display:none !important;
            }
            .appendix-export .ap-logo{
              border-color:rgba(15,23,42,.16);
              box-shadow:none;
            }
            @media print{
              body.appendix-export{
                padding:0;
              }
              .appendix-export-toolbar{
                display:none !important;
              }
              .appendix-export .ap-paper{
                max-width:none;
              }
            }
          </style>
        </head>
        <body class="appendix-export">
          <div class="appendix-export-toolbar">
            <div class="appendix-export-toolbar-text">Use your browser’s print dialog to save this appendix as a PDF.</div>
            <button type="button" onclick="window.print()">Print / Save PDF</button>
          </div>
          ${appendixExportNode.outerHTML}
          <script>
            window.__appendixPrintTriggered = false;
            function triggerAppendixPrintOnce() {
              if (window.__appendixPrintTriggered) return;
              window.__appendixPrintTriggered = true;
              window.setTimeout(() => { window.print(); }, 650);
            }
            window.addEventListener('load', () => {
              triggerAppendixPrintOnce();
            }, { once: true });
            window.addEventListener('pageshow', () => {
              triggerAppendixPrintOnce();
            });
          <\/script>
        </body>
        </html>
      `;
      const blob = new Blob([printableHtml], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const exportWindow = window.open(url, "_blank", "width=1180,height=920");
      if (!exportWindow) {
        URL.revokeObjectURL(url);
        appState.planStatus = "Popup blocked. Allow popups to export the appendix as PDF.";
        appState.planStatusLevel = "error";
        renderResults();
        return;
      }
      window.setTimeout(() => {
        exportWindow.focus();
      }, 120);
      window.setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 12000);
      appState.planStatus = "Appendix export opened in print view. Choose Save as PDF in the print dialog.";
      appState.planStatusLevel = "success";
      renderResults();
    }
  
    function escapeHtml(value) {
        return String(value ?? "")
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;");
      }
  
      function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
      }
  
      function lerp(a, b, t) {
        return a + (b - a) * t;
      }
  
      function geometricMean(a, b) {
        return Math.sqrt(Math.max(a, 0) * Math.max(b, 0));
      }
  
      function weightedGeometricPoint(minValue, maxValue, upperWeight) {
        const safeMin = Math.max(minValue, 1e-6);
        const safeMax = Math.max(maxValue, safeMin + 1e-6);
        const weight = clamp(upperWeight, 0, 1);
        return Math.exp((1 - weight) * Math.log(safeMin) + weight * Math.log(safeMax));
      }
  
      function roundExposure(seconds) {
        if (!isFinite(seconds) || seconds <= 0) return 0;
        if (seconds < 30) return Math.max(5, Math.round(seconds / 5) * 5);
        if (seconds <= 180) return Math.round(seconds / 5) * 5;
        if (seconds <= 600) return Math.round(seconds / 30) * 30;
        return Math.round(seconds / 60) * 60;
      }
  
      function fmtSeconds(seconds) {
        if (!isFinite(seconds)) return "—";
        if (seconds >= 3600) return `${(seconds / 3600).toFixed(seconds >= 7200 ? 1 : 2)} h`;
        if (seconds >= 120) return `${Math.round(seconds)} s`;
        return `${seconds.toFixed(seconds >= 10 ? 0 : 1)} s`;
      }
  
      function fmtRange(minSec, maxSec) {
        if (!isFinite(minSec) || !isFinite(maxSec)) return "Constrained";
        return `${fmtSeconds(minSec)} to ${fmtSeconds(maxSec)}`;
      }
  
      function fmtNumber(value, digits = 2) {
        return isFinite(value) ? Number(value).toFixed(digits) : "—";
      }
  
      function fmtPercentFromRatio(ratio, digits = 1) {
        if (!isFinite(ratio)) return "—";
        const pct = ratio * 100;
        const threshold = Math.pow(10, -digits);
        if (pct > 0 && pct < threshold) return `<${threshold.toFixed(digits)}%`;
        return `${pct.toFixed(digits)}%`;
      }
  
      function helpBadge(text) {
        const safe = text.replace(/"/g, "&quot;");
        return `<span class="help" tabindex="0" role="note" aria-label="${safe}" data-help="${safe}">?</span>`;
      }
  
      function renderHeroPlotHelpPopover() {
        return `
          <details class="hero-help">
            <summary aria-label="Explain the hero exposure plot" title="Explain the hero exposure plot">?</summary>
            <div class="hero-help-popover">
              <div class="hero-help-title">How to read this plot</div>
              <div class="hero-help-copy">
                <p class="hero-help-line gray"><strong>Left side (grays)</strong> is the too-short region. Subs here are still limited by the fixed read-noise penalty of each frame, and very short exposures can also become inefficient because overhead like dithering, download time, filter changes, and focus runs starts to matter too much.</p>
                <p class="hero-help-line green"><strong>Middle (green band)</strong> is the preferred working range. This is the balance point where noise efficiency, headroom, and practical workflow are all most favorable.</p>
                <p class="hero-help-line gold"><strong>Right side (yellow)</strong> is the caution region. Longer subs can still work here, but bright stars, sky pedestal growth, and lost-frame cost begin to make the trade less forgiving.</p>
                <p class="hero-help-line orange"><strong>Far right (orange)</strong> is the terminal cap region. At that point, saturation or workflow penalties are becoming dominant enough that longer subs are usually unattractive under the current assumptions.</p>
                <p class="hero-help-line"><strong>The white marker</strong> is a suggested starting point inside the band. It is a strong default anchor, not a claim that one exact sub length is uniquely optimal.</p>
              </div>
              <div class="hero-help-tip"><strong>Tip:</strong> Use the green band as your main working zone, then bias shorter for more headroom or longer for fewer files if the upper-side risks still look acceptable.</div>
            </div>
          </details>
        `;
      }
  
      function contributionTargetFactor(filter, targetPct) {
        const base = getReadNoiseFloorFactor(filter);
        const multiplier = DATA.constants.readNoiseContributionFactors[targetPct]
          || DATA.constants.readNoiseContributionFactors[5];
        return base * multiplier;
      }
  
      function contributionTargetLabel(targetPct) {
        return `${targetPct}% read-noise contribution target`;
      }
  
      function bitDepthScaleMultiplier(mode) {
        return ({
          native_1x: 1,
          bit14_to_16: 4,
          bit12_to_16: 16
        })[mode] || 1;
      }
  
      function empiricalBackgroundRate(input, cameraState) {
        const calibration = input.calibration || {};
        const exposureSec = Math.max(0.1, calibration.testExposureSec || 0);
        const measuredValue = Math.max(0, calibration.measuredBackgroundValue || 0);
        const units = calibration.measuredBackgroundUnits || "adu";
        const status = calibration.backgroundMeasurementStatus || "raw_mean";
        const referenceState = calibration.referenceCameraState || cameraState;
        const trueGain = Math.max(1e-6, referenceState.systemGainEPerAdu || cameraState.systemGainEPerAdu || 1);
        const scale = bitDepthScaleMultiplier(calibration.bitDepthScalingMode || "native_1x");
        const pedestal = status === "raw_mean" && units === "adu" ? Math.max(0, calibration.biasPedestalAdu || 0) : 0;
        const darkCurrentOverride = Number.isFinite(calibration.optionalDarkCurrentEPerPxPerSec)
          ? calibration.optionalDarkCurrentEPerPxPerSec
          : null;
        const darkCurrentRate = Math.max(0, (darkCurrentOverride ?? referenceState.darkCurrentEPerPxPerSec ?? cameraState.darkCurrentEPerPxPerSec ?? 0));
        let correctedElectrons = 0;
        if (units === "adu") {
          const correctedAdu = Math.max(0, measuredValue - pedestal);
          correctedElectrons = (correctedAdu / scale) * trueGain;
        } else {
          correctedElectrons = measuredValue;
        }
        if (status === "raw_mean") {
          correctedElectrons = Math.max(0, correctedElectrons - darkCurrentRate * exposureSec);
        }
        const rate = correctedElectrons / exposureSec;
        const correctedAdu = units === "adu" ? Math.max(0, measuredValue - pedestal) : null;
        const warnings = [];
        if (units === "adu" && status === "raw_mean" && correctedAdu != null && correctedAdu < 5) {
          warnings.push(`Corrected background is only ${fmtNumber(correctedAdu, 2)} ADU above pedestal. That is unusually small and can indicate a pedestal/status/units mismatch.`);
        }
        return {
          source: "measured",
          units,
          status,
          exposureSec,
          measuredValue,
          correctedAdu,
          correctedElectrons,
          rateEPerPxPerSec: Math.max(0.000001, rate),
          pedestalAdu: pedestal,
          trueGainEPerAdu: trueGain,
          bitDepthScale: scale,
          darkCurrentRateEPerPxPerSec: darkCurrentRate,
          warnings
        };
      }
  
      function summarizeLowerBoundAudit(lowerBoundBackground, modeledSkyRate) {
        if (lowerBoundBackground.source !== "measured") {
          return {
            sourceLabel: "Modeled fallback",
            short: `Modeled lower bound ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s`,
            warning: ""
          };
        }
        const ratioToModeled = modeledSkyRate > 0 ? lowerBoundBackground.rateEPerPxPerSec / modeledSkyRate : 1;
        const mismatchWarning = ratioToModeled < 0.1
          ? `The saved test frame is much darker than the current planning sky: ${fmtNumber(ratioToModeled * 100, 1)}% of the planning-sky rate. That is not automatically wrong, but it usually means the frame came from darker conditions or used different pedestal handling.`
          : ratioToModeled > 10
            ? `The saved test frame is much brighter than the current planning sky: ${fmtNumber(ratioToModeled, 1)}× the planning-sky rate. That can be real, but it is worth double-checking the frame conditions, units, and pedestal handling if it seems unexpected.`
            : "";
        const rawWarning = (lowerBoundBackground.warnings || [])[0] || "";
        const warning = rawWarning || mismatchWarning;
        return {
          sourceLabel: "Measured calibration",
          short: `Empirical lower bound ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s`,
          warning,
          warningChip: warning
            ? ratioToModeled < 0.1
              ? `Test frame darker than planning sky`
              : ratioToModeled > 10
                ? `Test frame brighter than planning sky`
                : "Calibration audit note"
            : ""
        };
      }
  
      const DEG2RAD = Math.PI / 180;
      const RAD2DEG = 180 / Math.PI;
      const J1970 = 2440588;
      const J2000 = 2451545;
      const E = DEG2RAD * 23.4397;
  
      function toJulian(date) {
        return date.valueOf() / 86400000 - 0.5 + J1970;
      }
  
      function toDays(date) {
        return toJulian(date) - J2000;
      }
  
      function rightAscension(l, b) {
        return Math.atan2(Math.sin(l) * Math.cos(E) - Math.tan(b) * Math.sin(E), Math.cos(l));
      }
  
      function declination(l, b) {
        return Math.asin(Math.sin(b) * Math.cos(E) + Math.cos(b) * Math.sin(E) * Math.sin(l));
      }
  
      function azimuth(H, phi, dec) {
        return Math.atan2(Math.sin(H), Math.cos(H) * Math.sin(phi) - Math.tan(dec) * Math.cos(phi));
      }
  
      function altitude(H, phi, dec) {
        return Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(H));
      }
  
      function siderealTime(d, lw) {
        return DEG2RAD * (280.16 + 360.9856235 * d) - lw;
      }
  
      function solarMeanAnomaly(d) {
        return DEG2RAD * (357.5291 + 0.98560028 * d);
      }
  
      function eclipticLongitude(M) {
        const C = DEG2RAD * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M));
        const P = DEG2RAD * 102.9372;
        return M + C + P + Math.PI;
      }
  
      function sunCoords(d) {
        const M = solarMeanAnomaly(d);
        const L = eclipticLongitude(M);
        return {
          dec: declination(L, 0),
          ra: rightAscension(L, 0)
        };
      }
  
      function moonCoords(d) {
        const L = DEG2RAD * (218.316 + 13.176396 * d);
        const M = DEG2RAD * (134.963 + 13.064993 * d);
        const F = DEG2RAD * (93.272 + 13.22935 * d);
        const l = L + DEG2RAD * 6.289 * Math.sin(M);
        const b = DEG2RAD * 5.128 * Math.sin(F);
        const dt = 385001 - 20905 * Math.cos(M);
        return {
          ra: rightAscension(l, b),
          dec: declination(l, b),
          dist: dt
        };
      }
  
      function getMoonPositionInfo(date, latDeg, lonDeg) {
        const lw = DEG2RAD * -lonDeg;
        const phi = DEG2RAD * latDeg;
        const d = toDays(date);
        const c = moonCoords(d);
        const H = siderealTime(d, lw) - c.ra;
        return {
          altitudeDeg: altitude(H, phi, c.dec) * RAD2DEG,
          azimuthDeg: azimuth(H, phi, c.dec) * RAD2DEG,
          raRad: c.ra,
          decRad: c.dec,
          distanceKm: c.dist
        };
      }
  
      function getMoonIlluminationInfo(date) {
        const d = toDays(date);
        const s = sunCoords(d);
        const m = moonCoords(d);
        const sdist = 149598000;
        const phi = Math.acos(Math.sin(s.dec) * Math.sin(m.dec) + Math.cos(s.dec) * Math.cos(m.dec) * Math.cos(s.ra - m.ra));
        const inc = Math.atan2(sdist * Math.sin(phi), m.dist - sdist * Math.cos(phi));
        return {
          fraction: (1 + Math.cos(inc)) / 2
        };
      }
  
      function parseLocalDateTime(value) {
        const parsed = value ? new Date(value) : new Date();
        return Number.isNaN(parsed.valueOf()) ? new Date() : parsed;
      }
  
      function normalizeRaHours(hours) {
        const wrapped = ((hours % 24) + 24) % 24;
        return wrapped * 15 * DEG2RAD;
      }
  
      function getTargetAltitudeInfo(date, latDeg, lonDeg, targetRaHours, targetDecDeg) {
        const lw = DEG2RAD * -lonDeg;
        const phi = DEG2RAD * latDeg;
        const d = toDays(date);
        const ra = normalizeRaHours(targetRaHours);
        const dec = targetDecDeg * DEG2RAD;
        const H = siderealTime(d, lw) - ra;
        return {
          altitudeDeg: altitude(H, phi, dec) * RAD2DEG,
          raRad: ra,
          decRad: dec
        };
      }
  
      function angularSeparationDeg(ra1, dec1, ra2, dec2) {
        return Math.acos(
          Math.sin(dec1) * Math.sin(dec2) +
          Math.cos(dec1) * Math.cos(dec2) * Math.cos(ra1 - ra2)
        ) * RAD2DEG;
      }
  
      function computeSunAltitudeDeg(date, latDeg, lonDeg) {
        const lw = DEG2RAD * -lonDeg;
        const phi = DEG2RAD * latDeg;
        const d = toDays(date);
        const s = sunCoords(d);
        const H = siderealTime(d, lw) - s.ra;
        return altitude(H, phi, s.dec) * RAD2DEG;
      }
  
      function darknessLabel(sunAltitudeDeg) {
        if (sunAltitudeDeg <= -18) return "astronomical_darkness";
        if (sunAltitudeDeg <= -12) return "astronomical_twilight";
        if (sunAltitudeDeg <= -6) return "nautical_twilight";
        return "bright_twilight_or_day";
      }
  
      function computeMoonGeometry(state) {
        const date = parseLocalDateTime(state.planningDateTimeLocal);
        const lat = Number(state.siteLatitudeDeg);
        const lon = Number(state.siteLongitudeDeg);
        const moon = getMoonPositionInfo(date, lat, lon);
        const target = getTargetAltitudeInfo(date, lat, lon, Number(state.targetRaHours), Number(state.targetDecDeg));
        const illum = getMoonIlluminationInfo(date);
        const sunAltitudeDeg = computeSunAltitudeDeg(date, lat, lon);
        return {
          date,
          moonIllumFrac: clamp(illum.fraction, 0, 1),
          moonAltitudeDeg: moon.altitudeDeg,
          targetAltitudeDeg: target.altitudeDeg,
          moonSeparationDeg: angularSeparationDeg(moon.raRad, moon.decRad, target.raRad, target.decRad),
          sunAltitudeDeg,
          darknessState: darknessLabel(sunAltitudeDeg)
        };
      }
  
      function skyBrightnessSourceLabel(state) {
        const mode = state.skyInputMode === "measured" ? "manual" : state.skyInputMode;
        return mode === "sqm"
            ? "measured SQM"
            : mode === "bortle"
              ? "Bortle-derived"
              : "manual";
      }
  
      function lowerBoundSourceLabel(result) {
        return result.lowerBoundBackground.source === "measured" ? "measured image background" : "modeled background";
      }
  
      function skyHeadroomSourceLabel(result) {
        return result.thresholds.skyPedestalSource === "measured_test_frame"
          ? "Measured sky from test frame"
          : "Planned sky estimate";
      }
  
      function captureSequencingLabel(value) {
        return value === "filter_cycling" ? "Filter cycling" : "Filter blocks";
      }
  
      function focusHandlingLabel(value, hasFilterSequencing = false) {
        const normalized = value === "refocus_on_degradation" ? "focus_offsets_monitoring" : value;
        return ({
          refocus_every_change: "On filter change",
          focus_offsets: hasFilterSequencing ? "Filter offsets + refocus when needed" : "Periodic / temperature-based",
          focus_offsets_monitoring: hasFilterSequencing ? "Filter offsets + refocus when needed" : "Periodic / temperature-based",
          manual_not_modeled: "Manual / not modeled"
        })[normalized] || "Periodic / temperature-based";
      }
  
      function ditherFrequencyLabel(value) {
        return ({
          off: "Not modeled",
          every_5: "Every 5 frames",
          every_3: "Every 3 frames",
          every_2: "Every 2 frames",
          every_1: "Every frame"
        })[value] || "Every 3 frames";
      }
  
      function overheadAssumptionSeconds(state) {
        const preset = state.overheadAssumptionPreset || "typical";
        if (preset === "custom") {
          return clamp(Number.isFinite(state.customEventOverheadSec) ? state.customEventOverheadSec : 10, 0, 120);
        }
        return DATA.constants.overheadAssumptionSeconds[preset] ?? DATA.constants.overheadAssumptionSeconds.typical;
      }
  
      function overheadAssumptionLabel(state) {
        const preset = state.overheadAssumptionPreset || "typical";
        if (preset === "custom") return `Custom ${fmtSeconds(overheadAssumptionSeconds(state))}`;
        return ({
          low: "Low",
          typical: "Typical",
          high: "High"
        })[preset] || "Typical";
      }
  
      function workflowFamilyForState(state = appState) {
        const camera = getCamera(state.cameraId);
        const filterSet = resolveFilterSet(state.filterSetId, camera);
        const selected = normalizeSelectedFilters(camera, state.selectedFilters);
        if (camera.colorType === "mono") {
          return selected.length > 1 ? "mono_filter_set" : "mono_single_filter";
        }
        const selectedProfiles = selected.map((filterId) => getFilterProfile(filterId)).filter(Boolean);
        const hasLpStyleFilter = selectedProfiles.some((profile) => profile.lpStyle || profile.provisional);
        if (filterSet?.mode === "narrowband" || hasLpStyleFilter) return "osc_filtered";
        if (selected.length > 1 && filterSet?.mode !== "narrowband") return "osc_with_filter_changes";
        return "osc_broadband";
      }
  
      function workflowFamilyMeta(family) {
        return ({
          mono_filter_set: {
            sectionTitle: "Filter Workflow",
            sectionSubtitle: "Filter sequencing, dithering, overhead, and focus handling",
            topHeading: "Suggested Starts by Filter",
            planHeading: "Filter Set Plan"
          },
          mono_single_filter: {
            sectionTitle: "Capture Workflow",
            sectionSubtitle: "Dithering, overhead, and focus handling",
            topHeading: "Suggested Start",
            planHeading: "Capture Plan"
          },
          osc_broadband: {
            sectionTitle: "OSC Workflow",
            sectionSubtitle: "Dithering, overhead, and focus handling",
            topHeading: "Suggested OSC Start",
            planHeading: "OSC Capture Plan"
          },
          osc_filtered: {
            sectionTitle: "Filtered OSC Workflow",
            sectionSubtitle: "Dithering, overhead, and focus handling for filtered OSC capture",
            topHeading: "Suggested Filtered OSC Start",
            planHeading: "Filtered OSC Plan"
          },
          osc_with_filter_changes: {
            sectionTitle: "OSC Filter Workflow",
            sectionSubtitle: "Simple filter sequencing, dithering, overhead, and focus handling",
            topHeading: "Suggested Starts by Filter",
            planHeading: "OSC Filter Plan"
          }
        })[family] || {
          sectionTitle: "Capture Workflow",
          sectionSubtitle: "Dithering, overhead, and focus handling",
          topHeading: "Suggested Start",
          planHeading: "Capture Plan"
        };
      }
  
      function workflowHasFilterSequencing(family) {
        return family === "mono_filter_set" || family === "osc_with_filter_changes";
      }
  
      function fileCountPreferenceLabel(value) {
        return ({
          safer_shorter: "Prefer shorter safer subs",
          balanced: "Balanced",
          fewer_files: "Prefer fewer files"
        })[value] || "Balanced";
      }
  
      function workflowLevelFromScore(score) {
        if (score >= 2.0) return "High";
        if (score >= 1.3) return "Moderate";
        return "Low";
      }
  
      function deriveWorkflowSettings(state) {
        const workflowFamily = workflowFamilyForState(state);
        const hasFilterSequencing = workflowHasFilterSequencing(workflowFamily);
        const captureSequencing = hasFilterSequencing ? (state.captureSequencing || "filter_blocks") : "filter_blocks";
        const filterBlockLengthSubs = clamp(
          Number.isFinite(state.filterBlockLengthSubs) ? state.filterBlockLengthSubs : 10,
          1,
          50
        );
        const requestedFocusHandling = state.focusHandling === "manual_not_modeled"
          ? "manual_not_modeled"
          : state.focusHandling === "refocus_every_change"
            ? "refocus_every_change"
            : "focus_offsets_monitoring";
        const focusHandling = hasFilterSequencing ? requestedFocusHandling : (requestedFocusHandling === "manual_not_modeled" ? "manual_not_modeled" : "focus_offsets_monitoring");
        const ditherFrequency = state.ditherFrequency || "every_3";
        const perEventOverheadSec = overheadAssumptionSeconds(state);
        const badFrameRiskTolerance = state.badFrameRiskTolerance || state.rejectionRiskTolerance || "medium";
        const fileCountPreference = state.fileCountPreference || "balanced";
        const saturationTolerance = state.saturationTolerance || "medium";
        const customFilterSwitchPenaltySec = hasFilterSequencing && Number.isFinite(state.customFilterSwitchPenaltySec) ? state.customFilterSwitchPenaltySec : null;
        const switchPenaltyPerEventSec = !hasFilterSequencing
          ? 0
          : customFilterSwitchPenaltySec != null
          ? customFilterSwitchPenaltySec
          : (
            DATA.constants.sequencingFocusSwitchPenaltySec[captureSequencing]?.[focusHandling]
            ?? DATA.constants.sequencingFocusSwitchPenaltySec.filter_blocks.focus_offsets
          );
        const perSubSwitchPenaltySec = captureSequencing === "filter_blocks"
          ? switchPenaltyPerEventSec / filterBlockLengthSubs
          : switchPenaltyPerEventSec;
        const ditherMultiplier = DATA.constants.ditherFrequencyMultipliers[ditherFrequency] ?? 1;
        const ditherOverheadContributionSec = perEventOverheadSec * ditherMultiplier;
        const baseCaptureOverheadSec = DATA.constants.captureBaseOverheadSec;
        const effectiveFrameOverheadSec = baseCaptureOverheadSec + ditherOverheadContributionSec + perSubSwitchPenaltySec;
        const focusInterruptionCost = focusHandling === "refocus_every_change"
          ? "High"
          : focusHandling === "manual_not_modeled"
            ? "Not modeled"
          : "Low";
        const blockPenaltyScale = captureSequencing === "filter_blocks"
          ? clamp(10 / filterBlockLengthSubs, 0.2, 2.0)
          : 1;
        const switchingPenalty = workflowLevelFromScore(
          (hasFilterSequencing ? (captureSequencing === "filter_cycling" ? 1.05 : 0.75) : 0.35)
          + (focusHandling === "refocus_every_change" ? 1.0 : 0.22) * blockPenaltyScale
        );
        const favorsSharedExposure = captureSequencing === "filter_cycling"
          ? "Shared exposure can be practical"
          : hasFilterSequencing ? "Per-filter starts can stay distinct" : "No filter sequencing needed";
        const advisory = customFilterSwitchPenaltySec != null
          ? `A custom filter-switch penalty of ${fmtSeconds(customFilterSwitchPenaltySec)} is overriding the built-in workflow assumption.`
          : !hasFilterSequencing
          ? `${ditherFrequencyLabel(ditherFrequency)} dithering and ${overheadAssumptionLabel(state).toLowerCase()} overhead are included as practical assumptions.`
          : captureSequencing === "filter_cycling" && focusHandling === "refocus_every_change"
          ? "Cycling keeps filter coverage balanced, but refocusing on every filter change makes the switching overhead more noticeable."
          : captureSequencing === "filter_cycling"
            ? "Cycling keeps filter coverage balanced. Without refocus-on-change, it should usually nudge the recommendation only modestly."
            : `${fmtNumber(filterBlockLengthSubs, 0)}-sub filter blocks keep switching overhead low. Cycling can still be a reasonable choice if even filter coverage matters more.`;
        return {
          workflowFamily,
          hasFilterSequencing,
          captureSequencing,
          filterBlockLengthSubs,
          focusHandling,
          ditherFrequency,
          ditherSettleSec: perEventOverheadSec,
          overheadAssumptionPreset: state.overheadAssumptionPreset || "typical",
          customEventOverheadSec: Number.isFinite(state.customEventOverheadSec) ? state.customEventOverheadSec : 10,
          perEventOverheadSec,
          baseCaptureOverheadSec,
          ditherOverheadContributionSec,
          badFrameRiskTolerance,
          fileCountPreference,
          saturationTolerance,
          customFilterSwitchPenaltySec,
          switchPenaltyPerEventSec,
          perSubSwitchPenaltySec,
          frameOverheadSec: effectiveFrameOverheadSec,
          rejectionRiskTolerance: badFrameRiskTolerance,
          subExposureStrategy: fileCountPreference === "fewer_files" ? "conservative" : fileCountPreference === "safer_shorter" ? "aggressive" : "balanced",
          switchingPenalty,
          focusInterruptionCost,
          favorsSharedExposure,
          advisory
        };
      }
  
      function planFamilyCode(result) {
        const family = (result.input.filter.family || "").toUpperCase();
        if (family === "HA") return "Ha";
        if (family === "OIII") return "OIII";
        if (family === "SII") return "SII";
        if (family === "L") return "L";
        if (family === "R") return "R";
        if (family === "G") return "G";
        if (family === "B") return "B";
        return result.input.filter.name;
      }
  
      function formatPlanFamilyCodeHtml(code) {
        const channelClassMap = {
          L: "l",
          R: "r",
          G: "g",
          B: "b",
          Ha: "ha",
          OIII: "oiii",
          SII: "sii"
        };
        const channelClass = channelClassMap[code] ? ` ${channelClassMap[code]}` : "";
        return `<span class="plan-channel-code${channelClass}">${code}</span>`;
      }
  
      function formatSuggestedStartToken(result) {
        return `${formatPlanFamilyCodeHtml(planFamilyCode(result))} <span class="plan-channel-value">${fmtSeconds(result.headlineRecommendation.anchorSec)}</span>`;
      }
  
      function suggestedPlanName(results) {
        const filterSet = resolveFilterSet(appState.filterSetId, getCamera(appState.cameraId));
        return filterSet?.label?.replace(/^Mono\s+/i, "").replace(/\s+—\s+/g, " ") || `${results.length}-filter plan`;
      }
  
      function effectivePlanName(results) {
        const typed = (appState.planName || "").trim();
        return typed || suggestedPlanName(results);
      }
  
      function planFamilySet(results) {
        return new Set(results.map((result) => planFamilyCode(result)));
      }
  
      function availablePlanWeightPresets(results) {
        const codes = planFamilySet(results);
        const options = [
          { value: "equal", label: "Equal weighting" }
        ];
        if (codes.has("Ha") && codes.has("OIII")) options.push({ value: "hoo", label: "HOO weighting" });
        if (codes.has("Ha") && codes.has("SII")) options.push({ value: "hss", label: "HSS weighting" });
        if (codes.has("Ha") && codes.has("OIII") && codes.has("SII")) options.push({ value: "sho", label: "SHO equal weighting" });
        options.push({ value: "custom", label: "Custom weighting" });
        return options;
      }
  
      function sanitizePlanWeightPreset(results) {
        const allowed = new Set(availablePlanWeightPresets(results).map((option) => option.value));
        if (!allowed.has(appState.planWeightPreset)) {
          appState.planWeightPreset = "equal";
        }
        return appState.planWeightPreset;
      }
  
      function normalizedPlanWeights(results) {
        const preset = sanitizePlanWeightPreset(results);
        const weights = {};
        results.forEach((result) => {
          const code = planFamilyCode(result);
          let value = appState.planWeights?.[result.filterId];
          if (!Number.isFinite(value)) {
            if (preset === "equal") value = 1;
            else if (preset === "hoo") value = code === "Ha" ? 2 : code === "OIII" ? 1 : 0;
            else if (preset === "hss") value = code === "Ha" ? 1 : code === "SII" ? 2 : 0;
            else if (preset === "sho") value = ["Ha", "OIII", "SII"].includes(code) ? 1 : 0;
            else value = 1;
          }
          weights[result.filterId] = Math.max(0, Math.round(value));
        });
        return weights;
      }
  
      function weightLabelForPreset(preset) {
        return ({
          equal: "Equal weighting",
          hoo: "HOO weighting",
          hss: "HSS weighting",
          sho: "SHO equal weighting",
          custom: "Custom weighting"
        })[preset] || "Custom weighting";
      }
  
      function isBroadbandPlan(results) {
        return results.every((result) => result.input.filter.bandType === "broadband");
      }
  
      function filterToneClass(filter) {
        const family = (filter.family || filter.familyKey || "").toUpperCase();
        if (family === "L") return "filter-l";
        if (family === "R") return "filter-r";
        if (family === "G") return "filter-g";
        if (family === "B") return "filter-b";
        if (family === "HA") return "filter-ha";
        if (family === "OIII") return "filter-oiii";
        if (family === "SII") return "filter-sii";
        return "";
      }
  
      function oscBroadbandFilterNotice(filter) {
        if (!filter || filter.family !== "OSC_RGB" || filter.bandType !== "broadband") return "";
        if (filter.showUvIrPresentNote || filter.filterRole === "uv_ir_cut_broadband") {
          return "Broadband OSC with UV/IR cut blocks out-of-band UV and near-IR while passing the visible spectrum. This is modeled as normal broadband OSC with UV/IR blocking, not as a narrowband or LP filter.";
        }
        if (filter.showIrLeakWarning || filter.filterRole === "clear_no_uv_ir_cut_broadband") {
          return "Clear/no UV-IR-cut OSC imaging may allow out-of-band near-IR to reach the sensor. This can increase star bloat and affect color if the camera window or another filter does not already block UV/IR.";
        }
        return "";
      }
  
      function renderOscBroadbandFilterNotice(filter) {
        const notice = oscBroadbandFilterNotice(filter);
        if (!notice) return "";
        const warningClass = filter.showIrLeakWarning || filter.filterRole === "clear_no_uv_ir_cut_broadband" ? "warning" : "small-note";
        return `<div class="${warningClass}" style="margin-top:8px">${notice}</div>`;
      }
  
      function classifyBand(filter) {
        if (filter.bandType === "narrowband") return "narrowband";
        if (filter.family === "L") return "broadband_luminance";
        return filter.comfortKey === "broadband_osc" ? "broadband_osc" : "broadband_mono";
      }
  
      function getReadNoiseFloorFactor(filter) {
        return DATA.constants.readNoiseFloorFactors[filter.bandType === "narrowband" ? "narrowband" : "broadband"]
          || DATA.constants.readNoiseFloorFactor;
      }
  
      function evaluateThermalContribution(cameraState, skyRateEPerPxPerSec) {
        const darkRate = Math.max(0, cameraState.darkCurrentEPerPxPerSec || 0);
        const skyRate = Math.max(0.000001, skyRateEPerPxPerSec || 0);
        const ratio = darkRate / skyRate;
        const level = ratio < 0.03 ? "negligible" : ratio < 0.12 ? "minor" : ratio < 0.35 ? "meaningful" : "strong";
        const explanation = level === "negligible"
          ? "Temperature has very little effect here because dark current is tiny compared with the sky background."
          : level === "minor"
            ? "Temperature has some effect here, but sky background still dominates the noise budget."
            : level === "meaningful"
              ? "Temperature is now a meaningful part of the noise budget and can shift the lower recommendation."
              : "Temperature is a strong contributor here and can materially change the recommended exposure regimes.";
        return {
          darkRateEPerPxPerSec: darkRate,
          ratioToSky: ratio,
          level,
          explanation
        };
      }
  
      function niceTickStep(maxValue, targetTicks = 8) {
        const rough = Math.max(1, maxValue / Math.max(2, targetTicks));
        const power = Math.pow(10, Math.floor(Math.log10(rough)));
        const normalized = rough / power;
        const stepNormalized = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
        return stepNormalized * power;
      }
  
      function buildAxisTicks(maxValue) {
        const step = niceTickStep(maxValue, DATA.constants.chart.targetMajorTicks);
        const majorTicks = [];
        for (let value = 0; value <= maxValue + step * 0.2; value += step) {
          majorTicks.push(Math.round(value));
        }
        const minorStep = step / 2;
        const minorTicks = [];
        for (let value = minorStep; value < maxValue; value += step) {
          minorTicks.push(value);
        }
        return { step, majorTicks, minorTicks };
      }
  
      function dampThreshold(rawSec, floorSec, scale, capSec) {
        if (!isFinite(rawSec)) return floorSec;
        if (rawSec <= floorSec) return rawSec;
        const damped = floorSec + Math.sqrt(Math.max(0, rawSec - floorSec)) * scale;
        return Math.min(damped, capSec || damped);
      }
  
      function computeDisplayZoneWidths(zones, maxDomain, options = {}) {
        const applyMinWidth = options.applyMinWidth !== false;
        const raw = zones.map((zone) => {
          const start = zone.startSec;
          const end = zone.endSec == null ? maxDomain : Math.min(zone.endSec, maxDomain);
          const pct = clamp(((end - start) / maxDomain) * 100, 0, 100);
          return { zone, start, end, pct };
        });
        const minPct = DATA.constants.chartRegimeMinWidthPct || 6;
        const visible = raw.map((entry) => ({
          ...entry,
          displayPct: applyMinWidth && entry.pct > 0 && entry.pct < minPct ? minPct : entry.pct
        }));
        let total = visible.reduce((sum, entry) => sum + entry.displayPct, 0);
        if (total > 100) {
          const largest = visible.reduce((best, entry, index) => entry.displayPct > visible[best].displayPct ? index : best, 0);
          visible[largest].displayPct = Math.max(minPct, visible[largest].displayPct - (total - 100));
        }
        total = visible.reduce((sum, entry) => sum + entry.displayPct, 0);
        if (total < 100) {
          const largest = visible.reduce((best, entry, index) => entry.displayPct > visible[best].displayPct ? index : best, 0);
          visible[largest].displayPct += 100 - total;
        }
        let cursor = 0;
        return visible.map((entry) => {
          const displayStartPct = cursor;
          cursor += entry.displayPct;
          return { ...entry, displayStartPct };
        });
      }
  
      function interpolateCurve(points, x) {
        if (!Array.isArray(points) || !points.length) return null;
        const sorted = [...points].sort((a, b) => a[0] - b[0]);
        if (x <= sorted[0][0]) return sorted[0][1];
        if (x >= sorted[sorted.length - 1][0]) return sorted[sorted.length - 1][1];
        for (let index = 0; index < sorted.length - 1; index += 1) {
          const [x0, y0] = sorted[index];
          const [x1, y1] = sorted[index + 1];
          if (x >= x0 && x <= x1) {
            const t = (x - x0) / (x1 - x0 || 1);
            return lerp(y0, y1, t);
          }
        }
        return sorted[sorted.length - 1][1];
      }
  
      function interpolateQe(qeModel, wavelengthNm) {
        if (!qeModel || !qeModel.wavelengthNm || !qeModel.relativeQe) return 0.6;
        const points = qeModel.wavelengthNm.map((nm, index) => [nm, qeModel.relativeQe[index]]);
        return interpolateCurve(points, wavelengthNm) || 0.6;
      }
  
      function imageScaleArcsecPerPx(pixelSizeUm, focalLengthMm) {
        return 206.265 * pixelSizeUm / Math.max(1, focalLengthMm);
      }
  
      function computeAirmass(altitudeDeg) {
        const alt = clamp(altitudeDeg, 5, 89.9);
        const zenithDeg = 90 - alt;
        const zenithRad = zenithDeg * Math.PI / 180;
        return 1 / (Math.cos(zenithRad) + 0.50572 * Math.pow(96.07995 - zenithDeg, -1.6364));
      }
  
      function deriveMoonSeverity({ moonIllumFrac, moonAltitudeDeg, moonSeparationDeg }) {
        if (moonAltitudeDeg <= -5 || moonIllumFrac <= 0.02) return "moonless";
        const illum = moonIllumFrac;
        const altitudeBoost = moonAltitudeDeg > 55 ? 1.2 : moonAltitudeDeg > 25 ? 1.0 : 0.7;
        const separationPenalty = moonSeparationDeg < 45 ? 1.2 : moonSeparationDeg < 80 ? 1.0 : moonSeparationDeg < 120 ? 0.8 : 0.55;
        const severityScore = illum * altitudeBoost * separationPenalty;
        if (severityScore < 0.12) return "minor";
        if (severityScore < 0.32) return "moderate";
        if (severityScore < 0.58) return "strong";
        return "severe";
      }
  
      function resolveSkyBrightness(state) {
        if (state.skyInputMode === "sqm") return state.sqmMeasurementMagPerArcsec2;
        if (state.skyInputMode === "measured") return state.skyBrightnessMagPerArcsec2;
        if (state.skyInputMode === "manual") return state.skyBrightnessMagPerArcsec2;
        return DATA.bortleToSky[state.bortleClass] || DATA.bortleToSky[4];
      }
  
      function getFilterProfile(filterId) {
        return DATA.filterProfiles[filterId] || null;
      }
  
      function extractFirstNumericFamily(text) {
        const match = String(text || "").match(/(\d+(?:\.\d+)?)/);
        return match ? Number(match[1]) : Number.POSITIVE_INFINITY;
      }
  
      function cameraFamilyPrefix(camera) {
        const name = String(camera?.name || "");
        if (/ASI/i.test(name)) return "ASI";
        if (/QHY/i.test(name)) return "QHY";
        return name.split(/\s+/)[0] || "";
      }
  
      function cameraFamilyNumber(camera) {
        const name = String(camera?.name || "");
        const asiMatch = name.match(/ASI\s*(\d{3,4})/i);
        if (asiMatch) return Number(asiMatch[1]);
        const qhyMatch = name.match(/QHY\s*(\d{3,4})/i);
        if (qhyMatch) return Number(qhyMatch[1]);
        return extractFirstNumericFamily(name);
      }
  
      function cameraColorSortKey(camera) {
        const name = String(camera?.name || "");
        if (/MM/i.test(name)) return 0;
        if (/MC/i.test(name)) return 1;
        return 2;
      }
  
      function compareCamerasForUi(a, b) {
        const vendorCompare = String(a.manufacturer || "").localeCompare(String(b.manufacturer || ""), undefined, { sensitivity: "base" });
        if (vendorCompare !== 0) return vendorCompare;
        const familyPrefixCompare = cameraFamilyPrefix(a).localeCompare(cameraFamilyPrefix(b), undefined, { sensitivity: "base" });
        if (familyPrefixCompare !== 0) return familyPrefixCompare;
        const familyNumberCompare = cameraFamilyNumber(a) - cameraFamilyNumber(b);
        if (familyNumberCompare !== 0) return familyNumberCompare;
        const colorCompare = cameraColorSortKey(a) - cameraColorSortKey(b);
        if (colorCompare !== 0) return colorCompare;
        return String(a.name || "").localeCompare(String(b.name || ""), undefined, { sensitivity: "base", numeric: true });
      }
  
      function filterSetVendorLabel(filterSet) {
        const label = String(filterSet?.label || "");
        if (label.includes("—")) {
          return label.split("—").slice(1).join("—").trim();
        }
        if (/^OSC Broadband$/i.test(label)) return "Broadband";
        return label;
      }
  
      function filterSetModeSortKey(filterSet) {
        return filterSet?.mode === "broadband" ? 0 : 1;
      }
  
      function filterSetVendorKey(filterSet) {
        const vendorLabel = filterSetVendorLabel(filterSet);
        return vendorLabel.split(/\s+/)[0] || vendorLabel;
      }
  
      function filterSetCutWidthKey(filterSet) {
        const label = filterSetVendorLabel(filterSet);
        const nmMatch = label.match(/(\d+(?:\.\d+)?)\s*nm/i);
        if (nmMatch) return Number(nmMatch[1]);
        const lCutMatch = label.match(/\bL-(\d+)\b/i);
        if (lCutMatch) return Number(lCutMatch[1]);
        return Number.POSITIVE_INFINITY;
      }
  
      function compareFilterSetsForUi(a, b) {
        const oscPriority = {
          "broadband-osc-uvir": 0,
          "broadband-osc": 1
        };
        const aOscPriority = a?.compatible?.includes("osc") ? oscPriority[a.id] : undefined;
        const bOscPriority = b?.compatible?.includes("osc") ? oscPriority[b.id] : undefined;
        if (aOscPriority !== undefined || bOscPriority !== undefined) {
          return (aOscPriority ?? 99) - (bOscPriority ?? 99);
        }
        const modeCompare = filterSetModeSortKey(a) - filterSetModeSortKey(b);
        if (modeCompare !== 0) return modeCompare;
        const vendorCompare = filterSetVendorKey(a).localeCompare(filterSetVendorKey(b), undefined, { sensitivity: "base" });
        if (vendorCompare !== 0) return vendorCompare;
        const cutCompare = filterSetCutWidthKey(a) - filterSetCutWidthKey(b);
        if (cutCompare !== 0) return cutCompare;
        return String(a.label || "").localeCompare(String(b.label || ""), undefined, { sensitivity: "base", numeric: true });
      }
  
      function compatibleFilterSets(camera) {
        return Object.values(DATA.filterSets).filter((set) => {
          if (!set.compatible.includes(camera.colorType)) return false;
          if (Array.isArray(set.allowedCameraIds) && !set.allowedCameraIds.includes(camera.cameraId)) return false;
          return true;
        });
      }
  
      function isFilterSetCompatibleWithCamera(setId, camera) {
        const set = DATA.filterSets[setId];
        if (!set || !camera) return false;
        if (!set.compatible.includes(camera.colorType)) return false;
        if (Array.isArray(set.allowedCameraIds) && !set.allowedCameraIds.includes(camera.cameraId)) return false;
        return true;
      }
  
      function activeFilterMode(camera = getCamera(appState.cameraId)) {
        return resolveFilterSet(appState.filterSetId, camera)?.mode || "broadband";
      }
  
      function defaultFilterSetId(camera, preferredMode = null) {
        const preferred = camera.colorType === "osc" ? "broadband-osc-uvir" : "narrowband-sho-astronomik-6nm";
        const compatible = compatibleFilterSets(camera);
        return compatible.find((set) => set.id === preferred)?.id || compatible[0]?.id || null;
      }
  
      function resolveFilterSet(setId, camera) {
        const compatible = compatibleFilterSets(camera);
        return compatible.find((set) => set.id === setId) || compatible[0] || null;
      }
  
      function filterCurvePoints(filterProfile) {
        return Object.entries(filterProfile?.curve || {})
          .map(([nm, value]) => [Number(nm), Number(value)])
          .filter(([nm, value]) => Number.isFinite(nm) && Number.isFinite(value))
          .sort((a, b) => a[0] - b[0]);
      }
  
      const DEFAULT_SKY_PROFILE_ID = "legacy-flat";
      const skyCurveCache = new Map();
      const skyNormalizationCache = new Map();
      const skyDisplayReferencePeakCache = new Map();
  
      function sampleObjectCurve(curve, wavelengthNm) {
        const points = Object.entries(curve || {})
          .map(([nm, value]) => [Number(nm), Number(value)])
          .filter(([nm, value]) => Number.isFinite(nm) && Number.isFinite(value))
          .sort((a, b) => a[0] - b[0]);
        if (!points.length) return 0;
        return Math.max(0, interpolateCurve(points, wavelengthNm) || 0);
      }
  
      function normalizeSkyProfileId(profileId) {
        return DATA.skyProfiles[profileId] ? profileId : DEFAULT_SKY_PROFILE_ID;
      }
  
      function skyProfileCurve(profileId) {
        const normalizedId = normalizeSkyProfileId(profileId);
        if (skyCurveCache.has(normalizedId)) return skyCurveCache.get(normalizedId);
        const profile = DATA.skyProfiles[normalizedId] || DATA.skyProfiles[DEFAULT_SKY_PROFILE_ID];
        if (profile.curve) {
          skyCurveCache.set(normalizedId, profile.curve);
          return profile.curve;
        }
        const components = profile.components || {};
        const wavelengths = new Set([400, 430, 460, 490, 500, 520, 550, 580, 590, 610, 620, 650, 680, 710, 750, 800]);
        Object.keys(components).forEach((componentId) => {
          Object.keys(DATA.skyComponents[componentId]?.curve || {}).forEach((nm) => wavelengths.add(Number(nm)));
        });
        const curve = {};
        [...wavelengths]
          .filter((nm) => Number.isFinite(nm))
          .sort((a, b) => a - b)
          .forEach((nm) => {
            let value = 0;
            Object.entries(components).forEach(([componentId, weight]) => {
              value += Number(weight || 0) * sampleObjectCurve(DATA.skyComponents[componentId]?.curve, nm);
            });
            curve[nm] = Math.max(0, value);
          });
        skyCurveCache.set(normalizedId, curve);
        return curve;
      }
  
      function skyProfileNormalization(profileId) {
        const normalizedId = normalizeSkyProfileId(profileId);
        if (skyNormalizationCache.has(normalizedId)) return skyNormalizationCache.get(normalizedId);
        const curve = skyProfileCurve(normalizedId);
        const points = [];
        for (let nm = 400; nm <= 800; nm += 2) {
          points.push([nm, sampleObjectCurve(curve, nm)]);
        }
        const normalization = Math.max(0.001, trapezoidIntegral(points) / 400);
        skyNormalizationCache.set(normalizedId, normalization);
        return normalization;
      }
  
      function normalizedSkyProfileShape(profileId, wavelengthNm) {
        const normalizedId = normalizeSkyProfileId(profileId);
        return sampleObjectCurve(skyProfileCurve(normalizedId), wavelengthNm) / skyProfileNormalization(normalizedId);
      }
  
      function skyProfileArtificialFraction(profileId, bortleClass) {
        const profile = DATA.skyProfiles[normalizeSkyProfileId(profileId)];
        const kind = profile?.kind || "compatibility";
        if (kind === "compatibility") return 0;
        if (kind === "natural") return 1;
        const b = clamp(Number(bortleClass || 5), 1, 9);
        const t = clamp((b - 1) / 8, 0, 1);
        if (kind === "urban-lines") return clamp(0.04 + 0.96 * Math.pow(t, 1.15), 0, 1);
        if (kind === "mixed") return clamp(0.08 + 0.92 * Math.pow(t, 1.00), 0, 1);
        if (kind === "led") return clamp(0.10 + 0.90 * Math.pow(t, 0.95), 0, 1);
        return t;
      }
  
      function effectiveSkyProfileShape(profileId, bortleClass, wavelengthNm) {
        const normalizedId = normalizeSkyProfileId(profileId);
        if (normalizedId === DEFAULT_SKY_PROFILE_ID || normalizedId === "dark-natural") {
          return normalizedSkyProfileShape(normalizedId, wavelengthNm);
        }
        const artificial = skyProfileArtificialFraction(normalizedId, bortleClass);
        const naturalShape = normalizedSkyProfileShape("dark-natural", wavelengthNm);
        const selectedShape = normalizedSkyProfileShape(normalizedId, wavelengthNm);
        return Math.max(0.02, lerp(naturalShape, selectedShape, artificial));
      }
  
      function skyDisplayReferencePeak(profileIdOrIds) {
        const ids = Array.isArray(profileIdOrIds)
          ? profileIdOrIds.map(normalizeSkyProfileId)
          : [normalizeSkyProfileId(profileIdOrIds || DEFAULT_SKY_PROFILE_ID)];
        const cacheKey = ids.slice().sort().join("|");
        if (skyDisplayReferencePeakCache.has(cacheKey)) return skyDisplayReferencePeakCache.get(cacheKey);
        let peak = 1e-9;
        ids.forEach((profileId) => {
          for (let nm = 400; nm <= 800; nm += 0.5) {
            peak = Math.max(peak, Math.max(0, effectiveSkyProfileShape(profileId, 9, nm)));
          }
        });
        skyDisplayReferencePeakCache.set(cacheKey, peak);
        return peak;
      }
  
      function skyDisplayAmplitudeFactor(bortleClass) {
        const b = clamp(Number(bortleClass || 5), 1, 9);
        const t = (b - 1) / 8;
        return 0.18 + 0.82 * Math.pow(t, 0.85);
      }
  
      function skyDisplaySampleValue(profileId, bortleClass, wavelengthNm, referenceProfiles = null) {
        const profile = normalizeSkyProfileId(profileId);
        const scaleProfiles = Array.isArray(referenceProfiles) && referenceProfiles.length
          ? referenceProfiles.map(normalizeSkyProfileId)
          : [profile];
        const referencePeak = Math.max(1e-9, skyDisplayReferencePeak(scaleProfiles));
        const amplitude = Math.max(0, skyDisplayAmplitudeFactor(bortleClass));
        return (Math.max(0, effectiveSkyProfileShape(profile, bortleClass, wavelengthNm)) * amplitude) / referencePeak;
      }
  
      function skyDisplaySamples(profileId, bortleClass, referenceProfiles = null, stepNm = 1) {
        const normalizedId = normalizeSkyProfileId(profileId);
        const sampleWavelengths = new Set();
        for (let nm = 400; nm <= 800; nm += stepNm) {
          sampleWavelengths.add(Number(nm.toFixed(3)));
        }
        Object.keys(skyProfileCurve(normalizedId)).forEach((nm) => {
          const value = Number(nm);
          if (Number.isFinite(value) && value >= 400 && value <= 800) sampleWavelengths.add(value);
        });
        return [...sampleWavelengths]
          .sort((a, b) => a - b)
          .map((nm) => ({
            nm,
            value: skyDisplaySampleValue(normalizedId, bortleClass, nm, referenceProfiles)
          }));
      }
  
      function filteredSkyDisplaySamples(profileId, bortleClass, filterProfile, referenceProfiles = null, stepNm = 1) {
        return skyDisplaySamples(profileId, bortleClass, referenceProfiles, stepNm)
          .map((sample) => ({
            ...sample,
            value: sample.value * filterTransmissionAt(filterProfile, sample.nm)
          }));
      }
  
      function isSpectralSkyProfileActive(profileId) {
        return normalizeSkyProfileId(profileId) !== DEFAULT_SKY_PROFILE_ID;
      }
  
      function filterTransmissionAt(filterProfile, wavelengthNm) {
        return clamp(sampleObjectCurve(filterProfile?.curve, wavelengthNm) / 100, 0, 1.2);
      }
  
      function renderSkySpectralProfilePlot(profileId, bortleClass) {
        const normalizedId = normalizeSkyProfileId(profileId);
        const profile = DATA.skyProfiles[normalizedId] || DATA.skyProfiles[DEFAULT_SKY_PROFILE_ID];
        const width = 420;
        const height = 92;
        const pad = { left: 28, right: 10, top: 10, bottom: 20 };
        const samples = skyDisplaySamples(normalizedId, bortleClass);
        const xFor = (nm) => pad.left + ((nm - 400) / 400) * (width - pad.left - pad.right);
        const yFor = (value) => pad.top + (1 - clamp(value, 0, 1)) * (height - pad.top - pad.bottom);
        const path = samples.map((sample, index) => `${index ? "L" : "M"} ${xFor(sample.nm).toFixed(1)} ${yFor(sample.value).toFixed(1)}`).join(" ");
        const fillPath = `${path} L ${xFor(800).toFixed(1)} ${height - pad.bottom} L ${xFor(400).toFixed(1)} ${height - pad.bottom} Z`;
        const tickLabels = [400, 500, 600, 700, 800].map((nm) => `
          <line x1="${xFor(nm)}" y1="${pad.top}" x2="${xFor(nm)}" y2="${height - pad.bottom}" stroke="rgba(255,255,255,.07)" />
          <text x="${xFor(nm)}" y="${height - 5}" text-anchor="middle" fill="rgba(210,226,242,.75)" font-size="9">${nm}</text>
        `).join("");
        return `
          <div class="sky-profile-plot">
            <div class="sky-profile-plot-head">
              <span>${profile.label}</span>
              <span>Effective sky background · Bortle ${fmtNumber(bortleClass, 0)}</span>
            </div>
            <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Representative sky spectral profile">
              <rect x="0" y="0" width="${width}" height="${height}" rx="8" fill="rgba(4,8,14,.42)" />
              ${tickLabels}
              <line x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}" stroke="rgba(255,255,255,.22)" />
              <path d="${fillPath}" fill="rgba(110,193,255,.14)" />
              <path d="${path}" fill="none" stroke="rgba(132,240,207,.88)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              <text x="${pad.left}" y="10" fill="rgba(210,226,242,.68)" font-size="9">compressed preview height</text>
              <text x="${width - pad.right}" y="${height - 5}" text-anchor="end" fill="rgba(210,226,242,.55)" font-size="9">nm</text>
            </svg>
            <div class="sky-profile-plot-note">Shape comes from the selected sky profile; height also follows Bortle on a compressed preview scale for readability. ${profile.note || "Representative profile used only where spectral LP modeling is relevant."}</div>
          </div>
        `;
      }
  
      function spectralStorySeriesYMax(series, fallback = 100) {
        let peak = 0;
        (series || []).forEach((item) => {
          (item.points || []).forEach((point) => {
            if (Number.isFinite(point[1])) peak = Math.max(peak, point[1]);
          });
        });
        if (!(peak > 0)) return fallback;
        return Math.max(fallback * 0.65, Math.min(100, peak * 1.08));
      }
  
      function spectralLineCenter(line) {
        const key = String(line || "").toUpperCase();
        if (key === "HA") return 656.3;
        if (key === "OIII") return 500.7;
        if (key === "SII") return 672.4;
        if (key === "HB") return 486.1;
        return 550;
      }
  
      function spectralStoryColor(label) {
        const key = String(label || "").toLowerCase();
        if (key === "l" || key.includes("mono")) return "#d8dee9";
        if (key === "r" || key.includes("red")) return "#ff8a8a";
        if (key === "g" || key.includes("green")) return "#7ce0a0";
        if (key === "b" || key.includes("blue")) return "#78b8ff";
        if (key.includes("ha")) return "#ff7373";
        if (key.includes("oiii")) return "#66d9ef";
        if (key.includes("sii")) return "#f0a35e";
        if (key.includes("sky")) return "#f0c95f";
        if (key.includes("filter")) return "#78c8ff";
        return "#f0c95f";
      }
  
      function cfaDisplayWeight(channel, wavelengthNm) {
        const key = String(channel || "").toLowerCase();
        const curves = {
          red: [[400,0],[500,0.02],[540,0.12],[580,0.55],[620,1.00],[670,0.92],[710,0.35],[760,0.05],[800,0]],
          green: [[400,0],[450,0.12],[480,0.50],[510,0.92],[540,1.00],[575,0.72],[610,0.18],[660,0.02],[800,0]],
          blue: [[400,0.50],[430,0.95],[460,1.00],[490,0.65],[520,0.22],[560,0.05],[620,0],[800,0]]
        };
        return clamp(interpolateCurve(curves[key] || curves.green, wavelengthNm) || 0, 0, 1);
      }
  
      function sensorStoryResponse(cameraModel, channel, wavelengthNm) {
        const qe = clamp(interpolateQe(cameraModel?.qeModel, wavelengthNm), 0, 1.25);
        if (cameraModel?.colorType !== "osc") return qe * 100;
        return qe * cfaDisplayWeight(channel, wavelengthNm) * 100;
      }
  
      function filterStoryProfilesForResult(result) {
        const camera = getCamera(appState.cameraId);
        const selected = normalizeSelectedFilters(camera, appState.selectedFilters);
        const ids = selected.length ? selected : [result.input.filter.profileId || result.input.filter.filterId];
        return ids.map(getFilterProfile).filter(Boolean);
      }
  
      function filterStoryTransmissionEnvelope(profiles, wavelengthNm) {
        if (!profiles.length) return 1;
        return clamp(Math.max(...profiles.map((profile) => filterTransmissionAt(profile, wavelengthNm))), 0, 1.2);
      }
  
      function spectralStoryRange(profiles) {
        const resolved = (profiles || []).filter(Boolean);
        if (!resolved.length) return { xMin: 400, xMax: 800, xTickStep: 50, stepNm: 1 };
        const narrowOnly = resolved.every((profile) => profile.mode === "narrowband");
        if (!narrowOnly) return { xMin: 400, xMax: 800, xTickStep: 50, stepNm: 1 };
        const centers = resolved.map((profile) => deriveFilterMetrics(profile).peakNm).filter(Number.isFinite);
        if (!centers.length) return { xMin: 480, xMax: 690, xTickStep: 25, stepNm: 0.5 };
        const min = Math.min(...centers);
        const max = Math.max(...centers);
        if (max - min < 45) {
          return {
            xMin: Math.max(380, Math.floor((min - 18) / 5) * 5),
            xMax: Math.min(820, Math.ceil((max + 18) / 5) * 5),
            xTickStep: 5,
            stepNm: 0.25
          };
        }
        return {
          xMin: Math.max(380, Math.floor((min - 22) / 10) * 10),
          xMax: Math.min(820, Math.ceil((max + 22) / 10) * 10),
          xTickStep: 25,
          stepNm: 0.5
        };
      }
  
      function spectralStoryPoints(xMin, xMax, stepNm, sampleFn) {
        const points = [];
        for (let nm = xMin; nm <= xMax + 1e-9; nm += stepNm) {
          points.push([Number(nm.toFixed(3)), sampleFn(nm)]);
        }
        return points;
      }
  
      function spectralStoryMarkers(profiles) {
        const lines = new Set((profiles || [])
          .filter((profile) => profile.mode === "narrowband")
          .map((profile) => profile.line)
          .filter((line) => ["Ha", "OIII", "SII"].includes(line)));
        return [...lines].map((line) => ({
          x: spectralLineCenter(line),
          label: line,
          color: spectralStoryColor(line)
        }));
      }
  
      function makeSpectralStoryPlotSvg(series, opts = {}) {
        const width = opts.width || 900;
        const height = opts.height || 260;
        const pad = { left: 46, right: 16, top: 18, bottom: 54 };
        const xMin = opts.xMin ?? 400;
        const xMax = opts.xMax ?? 800;
        const yMax = opts.yMax ?? spectralStorySeriesYMax(series, 100);
        const xFor = (value) => pad.left + ((value - xMin) / Math.max(1, xMax - xMin)) * (width - pad.left - pad.right);
        const yFor = (value) => pad.top + (1 - (clamp(value, 0, yMax) / Math.max(1, yMax))) * (height - pad.top - pad.bottom);
        const ticks = yMax > 20 ? [0,25,50,75,100].filter((value) => value <= yMax + 1e-9) : [0, yMax * 0.5, yMax];
        const grid = ticks.map((value) => `<line x1="${pad.left}" y1="${yFor(value).toFixed(1)}" x2="${width - pad.right}" y2="${yFor(value).toFixed(1)}" stroke="rgba(255,255,255,.07)" stroke-width="0.8"/>`).join("");
        const xStep = opts.xTickStep || 50;
        const xStart = Math.ceil(xMin / xStep) * xStep;
        const xTicks = [];
        for (let tick = xStart; tick <= xMax + 1e-9; tick += xStep) {
          xTicks.push(`<line x1="${xFor(tick).toFixed(1)}" y1="${yFor(0).toFixed(1)}" x2="${xFor(tick).toFixed(1)}" y2="${(yFor(0) + 6).toFixed(1)}" stroke="rgba(255,255,255,.18)" stroke-width="0.8"/><text x="${xFor(tick).toFixed(1)}" y="${(yFor(0) + 19).toFixed(1)}" text-anchor="middle" font-size="11" fill="#aeb8c8" font-family="-apple-system,sans-serif">${tick} nm</text>`);
        }
        const yTicks = ticks.map((value) => `<text x="${pad.left - 6}" y="${(yFor(value) + 4).toFixed(1)}" text-anchor="end" font-size="11" fill="#aeb8c8" font-family="-apple-system,sans-serif">${value.toFixed(0)}</text>`).join("");
        const markers = (opts.markers || []).map((marker) => {
          if (marker.x < xMin || marker.x > xMax) return "";
          const x = xFor(marker.x);
          return `<line x1="${x.toFixed(1)}" y1="${pad.top}" x2="${x.toFixed(1)}" y2="${yFor(0).toFixed(1)}" stroke="${marker.color || "rgba(255,209,102,.82)"}" stroke-width="1.1" stroke-dasharray="4 4"/><text x="${x.toFixed(1)}" y="${pad.top + 11}" text-anchor="middle" font-size="10" fill="${marker.color || "rgba(255,209,102,.92)"}" font-family="-apple-system,sans-serif">${escapeHtml(marker.label || "")}</text>`;
        }).join("");
        const curves = (series || []).map((item) => {
          const points = (item.points || []).map(([x, y]) => `${xFor(x).toFixed(1)},${yFor(y).toFixed(1)}`).join(" ");
          if (!points) return "";
          const firstX = item.points[0][0];
          const lastX = item.points[item.points.length - 1][0];
          const area = item.fill ? `<polygon fill="${item.color}" opacity="${item.fillOpacity ?? 0.12}" points="${xFor(firstX).toFixed(1)},${yFor(0).toFixed(1)} ${points} ${xFor(lastX).toFixed(1)},${yFor(0).toFixed(1)}"/>` : "";
          return `${area}<polyline fill="none" stroke="${item.color}" stroke-width="${item.width || 2.2}" opacity="${item.opacity ?? 0.95}" stroke-linecap="round" stroke-linejoin="round" ${item.dash ? `stroke-dasharray="${item.dash}"` : ""} points="${points}"/>`;
        }).join("");
        const legend = (series || []).map((item) => `
          <span class="spectral-story-legend-item">
            <span class="spectral-story-legend-line" style="border-top-color:${item.color};border-top-style:${item.dash ? "dashed" : "solid"};opacity:${item.opacity ?? 0.95}"></span>${escapeHtml(item.label)}
          </span>
        `).join("");
        return `
          <div>
            <svg class="spectral-story-svg" viewBox="0 0 ${width} ${height}" aria-label="${escapeHtml(opts.ariaLabel || "Spectral plot")}">
              ${grid}
              ${markers}
              <line x1="${pad.left}" y1="${pad.top}" x2="${pad.left}" y2="${yFor(0).toFixed(1)}" stroke="rgba(255,255,255,.24)" stroke-width="1"/>
              <line x1="${pad.left}" y1="${yFor(0).toFixed(1)}" x2="${width - pad.right}" y2="${yFor(0).toFixed(1)}" stroke="rgba(255,255,255,.24)" stroke-width="1"/>
              ${curves}
              ${xTicks.join("")}
              ${yTicks}
            </svg>
            ${legend ? `<div class="spectral-story-legend">${legend}</div>` : ""}
          </div>
        `;
      }
  
      function renderSpectralStoryCard(kicker, title, copy, plot, note = "", prominent = false) {
        return `
          <div class="spectral-story-card ${prominent ? "prominent" : ""}">
            <div class="spectral-story-head">
              <div class="spectral-story-kicker">${escapeHtml(kicker)}</div>
              <div class="spectral-story-title">${escapeHtml(title)}</div>
              <div class="spectral-story-copy">${copy}</div>
            </div>
            ${plot}
            ${note ? `<div class="spectral-story-note">${note}</div>` : ""}
          </div>
        `;
      }
  
      function renderSpectralStoryPanel(result) {
        const camera = getCamera(appState.cameraId);
        const profiles = filterStoryProfilesForResult(result);
        const range = spectralStoryRange(profiles);
        const markers = spectralStoryMarkers(profiles);
        const isOsc = camera.colorType === "osc";
        const isNarrowband = profiles.some((profile) => profile.mode === "narrowband");
        const lpRelevant = profiles.some((profile) => broadbandLpFilterProfile(profile)) || (profiles.some((profile) => profile.mode === "broadband" && profile.line === "OSC") && isSpectralSkyProfileActive(appState.skySpectralProfileId));
  
        const sensorSeries = isOsc
          ? [
              { label: "Red QE", color: spectralStoryColor("red"), points: spectralStoryPoints(400, 800, 2, (nm) => sensorStoryResponse(camera, "red", nm)) },
              { label: "Green QE", color: spectralStoryColor("green"), points: spectralStoryPoints(400, 800, 2, (nm) => sensorStoryResponse(camera, "green", nm)) },
              { label: "Blue QE", color: spectralStoryColor("blue"), points: spectralStoryPoints(400, 800, 2, (nm) => sensorStoryResponse(camera, "blue", nm)) }
            ]
          : [{ label: "Mono QE", color: "#d8dee9", points: spectralStoryPoints(400, 800, 2, (nm) => sensorStoryResponse(camera, "mono", nm)) }];
  
        const filterSeries = profiles.map((profile) => ({
          label: `${profile.line || "Filter"} transmission`,
          color: spectralStoryColor(profile.line || profile.label),
          points: spectralStoryPoints(range.xMin, range.xMax, range.stepNm, (nm) => filterTransmissionAt(profile, nm) * 100),
          opacity: 0.95
        }));
  
        const combinedSeries = isOsc
          ? [
              { label: "Effective Red", color: spectralStoryColor("red"), points: spectralStoryPoints(range.xMin, range.xMax, range.stepNm, (nm) => sensorStoryResponse(camera, "red", nm) * filterStoryTransmissionEnvelope(profiles, nm)) },
              { label: "Effective Green", color: spectralStoryColor("green"), points: spectralStoryPoints(range.xMin, range.xMax, range.stepNm, (nm) => sensorStoryResponse(camera, "green", nm) * filterStoryTransmissionEnvelope(profiles, nm)) },
              { label: "Effective Blue", color: spectralStoryColor("blue"), points: spectralStoryPoints(range.xMin, range.xMax, range.stepNm, (nm) => sensorStoryResponse(camera, "blue", nm) * filterStoryTransmissionEnvelope(profiles, nm)) }
            ]
          : profiles.map((profile) => ({
              label: `Effective ${profile.line || "filter"}`,
              color: spectralStoryColor(profile.line || profile.label),
              points: spectralStoryPoints(range.xMin, range.xMax, range.stepNm, (nm) => sensorStoryResponse(camera, "mono", nm) * filterTransmissionAt(profile, nm)),
              opacity: 0.95
            }));
  
        const sensorPlot = makeSpectralStoryPlotSvg(sensorSeries, { ariaLabel: "Sensor response", xMin: 400, xMax: 800, xTickStep: 50, yMax: spectralStorySeriesYMax(sensorSeries, 100) });
        const filterPlot = makeSpectralStoryPlotSvg(filterSeries, { ariaLabel: "Filter transmission", xMin: range.xMin, xMax: range.xMax, xTickStep: range.xTickStep, yMax: 100, markers });
        const combinedPlot = makeSpectralStoryPlotSvg(combinedSeries, { ariaLabel: "Combined response", xMin: range.xMin, xMax: range.xMax, xTickStep: range.xTickStep, yMax: spectralStorySeriesYMax(combinedSeries, 100), markers });
  
        const filterCopy = isOsc
          ? (isNarrowband ? "Only the selected OSC dual-band, tri-band, or multi-band transmission path is shown here. Sensor response is deliberately left out." : "Only the selected external broadband or LP-filter transmission is shown here. Sensor response is deliberately left out.")
          : (isNarrowband ? "Only the selected mono narrowband filter transmissions are shown here, with emission-line markers where they help." : "Only the selected mono broadband filter transmissions are shown here. Detector QE is deliberately left out.");
        const combinedTitle = isOsc ? "Combined effective RGB response" : (isNarrowband ? "Combined line response" : "Combined channel response");
        const combinedCopy = isOsc
          ? "This is the practical answer plot for OSC: representative RGB sensor response multiplied by the selected filter path."
          : "This is the practical answer plot for mono: detector QE multiplied by the selected filter transmission curves.";
        const combinedNote = "Read the sensor and filter cards as the ingredients. Read this combined response card as the acquisition-chain answer.";
  
        const cards = [
          renderSpectralStoryCard(
            "Sensor view",
            "What does the sensor itself contribute?",
            isOsc
              ? "Only detector response is shown here. For OSC cameras the curves are representative red, green, and blue channel-response displays used for interpretation, not a separate exposure-model input."
              : "Only the detector QE curve is shown here. No filter transmission or sky-background story is mixed into this card.",
            sensorPlot
          ),
          renderSpectralStoryCard(
            "Filter view",
            "What does the chosen capture path pass?",
            filterCopy,
            filterPlot
          ),
          renderSpectralStoryCard(
            "Combined response",
            combinedTitle,
            combinedCopy,
            combinedPlot,
            combinedNote,
            true
          )
        ];
  
        if (lpRelevant) {
          const skyProfileId = normalizeSkyProfileId(appState.skySpectralProfileId);
          const skyProfile = DATA.skyProfiles[skyProfileId] || DATA.skyProfiles[DEFAULT_SKY_PROFILE_ID];
          const rawSky = skyDisplaySamples(skyProfileId, appState.bortleClass, [skyProfileId], 1).map((sample) => [sample.nm, sample.value * 100]);
          const filteredSky = skyDisplaySamples(skyProfileId, appState.bortleClass, [skyProfileId], 1).map((sample) => [sample.nm, sample.value * 100 * filterStoryTransmissionEnvelope(profiles, sample.nm)]);
          const skyPlot = makeSpectralStoryPlotSvg([
            { label: "Effective sky", color: spectralStoryColor("sky"), points: rawSky, fill: true, fillOpacity: 0.12, width: 1.7 }
          ], { ariaLabel: "Effective sky background", xMin: 400, xMax: 800, xTickStep: 50, yMax: 100 });
          const filteredSkyPlot = makeSpectralStoryPlotSvg([
            { label: "Raw sky", color: spectralStoryColor("sky"), points: rawSky, fill: true, fillOpacity: 0.10, width: 1.5, opacity: 0.78 },
            { label: "Filtered sky", color: "#78c8ff", points: filteredSky, width: 1.6, opacity: 0.95 }
          ], { ariaLabel: "Filtered sky background", xMin: 400, xMax: 800, xTickStep: 50, yMax: 100 });
          const targetRatio = result.sourceScenario?.broadbandTargetSignalRatio;
          const skyRatio = result.sky?.breakdown?.lpSkyTransmissionRatio;
          const ratioNote = broadbandLpFilterProfile(profiles[0])
            ? ` Target continuum kept: <strong>${fmtNumber((targetRatio ?? 1) * 100, 0)}%</strong>. Modeled sky background admitted: <strong>${skyRatio == null ? "not active" : `${fmtNumber(skyRatio * 100, 0)}%`}</strong>.`
            : "";
          cards.push(renderSpectralStoryCard(
            "Sky view",
            "What kind of sky/background is being assumed?",
            `This separates the sky-background assumption from the sensor and filter stories. Shape comes from <strong>${escapeHtml(skyProfile.label)}</strong>; height follows Bortle on a compressed preview scale.`,
            skyPlot,
            "Representative profile only. It is not a site-specific spectrometer reading."
          ));
          cards.push(renderSpectralStoryCard(
            "Filtered sky",
            "What unwanted background survives after the active filter?",
            "Raw sky is shown in gold; the surviving background after the selected filter path is shown in blue.",
            filteredSkyPlot,
            `LP-style filters help this exposure model only when they reject more structured sky background than target continuum.${ratioNote}`
          ));
        }
  
        if (isOsc && isNarrowband) {
          const rows = ["Ha", "OIII", "SII"].map((line) => {
            const nm = spectralLineCenter(line);
            const trans = filterStoryTransmissionEnvelope(profiles, nm);
            const r = sensorStoryResponse(camera, "red", nm) * trans;
            const g = sensorStoryResponse(camera, "green", nm) * trans;
            const b = sensorStoryResponse(camera, "blue", nm) * trans;
            const total = r + g + b;
            if (!(total > 0.6)) {
              return `<tr><td><span class="spectral-story-line-chip">${line}</span></td><td colspan="3">Not materially passed in this capture path.</td></tr>`;
            }
            const dominant = [["Red", r], ["Green", g], ["Blue", b]].sort((a, bEntry) => bEntry[1] - a[1])[0][0];
            return `<tr><td><span class="spectral-story-line-chip">${line}</span></td><td>${dominant}</td><td>${Math.round((r / total) * 100)} / ${Math.round((g / total) * 100)} / ${Math.round((b / total) * 100)}</td><td>${fmtNumber(total, 1)}</td></tr>`;
          }).join("");
          cards.push(`
            <div class="spectral-story-card">
              <div class="spectral-story-head">
                <div class="spectral-story-kicker">OSC narrowband summary</div>
                <div class="spectral-story-title">How do emission lines map into RGB capture?</div>
                <div class="spectral-story-copy">This line-centered table is intentionally simpler than another overlay. It shows where each line mostly lands after the selected OSC filter path.</div>
              </div>
              <div class="spectral-story-subpanel">
                <div class="spectral-story-subtitle">${escapeHtml(result.input.filter.name)}</div>
                <table class="spectral-story-line-table">
                  <thead><tr><th>Line</th><th>Mostly lands in</th><th>R / G / B share</th><th>Net response</th></tr></thead>
                  <tbody>${rows}</tbody>
                </table>
              </div>
            </div>
          `);
        }
  
        return `<div class="spectral-story-stack">${cards.join("")}</div>`;
      }
  
      function trapezoidIntegral(points) {
        let total = 0;
        for (let index = 0; index < points.length - 1; index += 1) {
          const [x0, y0] = points[index];
          const [x1, y1] = points[index + 1];
          total += (x1 - x0) * ((y0 + y1) / 2);
        }
        return total;
      }
  
      function deriveFilterMetrics(filterProfile) {
        const points = filterCurvePoints(filterProfile);
        if (!points.length) {
          return {
            peakFrac: 0.9,
            peakNm: 550,
            effectiveBandwidthNm: filterProfile?.mode === "narrowband" ? 6 : 90
          };
        }
        const peakPoint = points.reduce((best, point) => point[1] > best[1] ? point : best, points[0]);
        const peakFrac = Math.max(0.01, peakPoint[1] / 100);
        const areaFracNm = trapezoidIntegral(points.map(([nm, value]) => [nm, value / 100]));
        const effectiveBandwidthNm = Math.max(0.5, areaFracNm / peakFrac);
        return {
          peakFrac,
          peakNm: peakPoint[0],
          effectiveBandwidthNm
        };
      }
  
      function bandwidthClassKey(filterProfile, metrics) {
        if (filterProfile.mode === "broadband") return filterProfile.line === "OSC" ? "broadband_osc" : "broadband_mono";
        return metrics.effectiveBandwidthNm <= 4.5 ? "narrowband_3nm" : "narrowband_6nm";
      }
  
      function skyFamilyKey(filterProfile) {
        return filterProfile.line === "OSC" ? "OSC_RGB" : filterProfile.line;
      }
  
      function normalizedSkyBaseline(filterProfile, metrics) {
        const family = skyFamilyKey(filterProfile);
        if (filterProfile.mode === "broadband") {
          const base = DATA.skyBaselines[family] || DATA.skyBaselines.OSC_RGB;
          if (filterProfile.filterRole === "uv_ir_cut_broadband") return base * 0.94;
          return base;
        }
        if (family === "OSC_RGB") {
          const refRate = DATA.skyBaselines.OSC_RGB || 0.24;
          const broadbandBandwidthNm = 110;
          const referencePeakFrac = 0.9;
          return refRate * (metrics.effectiveBandwidthNm / broadbandBandwidthNm) * (metrics.peakFrac / referencePeakFrac);
        }
        const refFamily6 = `${family}_6nm`;
        const refFamily3 = `${family}_3nm`;
        const refKey = metrics.effectiveBandwidthNm <= 4.5 ? refFamily3 : refFamily6;
        const fallbackKey = metrics.effectiveBandwidthNm <= 4.5 ? refFamily6 : refFamily3;
        const refRate = DATA.skyBaselines[refKey] || DATA.skyBaselines[fallbackKey] || 0.03;
        const refBandwidth = refKey.endsWith("_3nm") ? 3 : 6;
        const refPeakFrac = refKey.endsWith("_3nm") ? 0.92 : 0.90;
        return refRate * (metrics.effectiveBandwidthNm / refBandwidth) * (metrics.peakFrac / refPeakFrac);
      }
  
      function broadbandLpFilterProfile(filterProfile) {
        return !!(filterProfile && filterProfile.mode === "broadband" && filterProfile.line === "OSC" && filterProfile.lpStyle);
      }
  
      function spectralSkyRelevantForFilter(filterProfile, conditions) {
        return !!(
          filterProfile
          && filterProfile.mode === "broadband"
          && filterProfile.line === "OSC"
          && (broadbandLpFilterProfile(filterProfile) || isSpectralSkyProfileActive(conditions?.skySpectralProfileId))
        );
      }
  
      function lpComparableTransmission(filterProfile, wavelengthNm, referenceProfile = null) {
        const transmission = filterTransmissionAt(filterProfile, wavelengthNm);
        if (!broadbandLpFilterProfile(filterProfile) || !referenceProfile) return transmission;
        return Math.min(transmission, filterTransmissionAt(referenceProfile, wavelengthNm));
      }
  
      function integrateBroadbandSkyResponse(cameraModel, filterProfile, skyProfileId, bortleClass, referenceProfile = null) {
        if (!cameraModel || !filterProfile) return 0;
        let total = 0;
        const stepNm = 0.5;
        for (let nm = 400; nm <= 800; nm += stepNm) {
          const qe = clamp(interpolateQe(cameraModel.qeModel, nm), 0, 1.25);
          const transmission = lpComparableTransmission(filterProfile, nm, referenceProfile);
          const skyShape = effectiveSkyProfileShape(skyProfileId, bortleClass, nm);
          total += qe * transmission * skyShape * stepNm;
        }
        return total;
      }
  
      function integrateBroadbandTargetResponse(cameraModel, filterProfile, referenceProfile = null) {
        if (!cameraModel || !filterProfile) return 0;
        let total = 0;
        const stepNm = 0.5;
        for (let nm = 400; nm <= 800; nm += stepNm) {
          const qe = clamp(interpolateQe(cameraModel.qeModel, nm), 0, 1.25);
          const transmission = lpComparableTransmission(filterProfile, nm, referenceProfile);
          total += qe * transmission * stepNm;
        }
        return total;
      }
  
      function broadbandTargetSignalRatioForFilter(filter, cameraState) {
        const filterProfile = getFilterProfile(filter?.profileId);
        if (!broadbandLpFilterProfile(filterProfile)) return 1;
        const cameraModel = getCamera(cameraState?.cameraId);
        const referenceProfile = DATA.filterProfiles["osc-broad"];
        const activeIntegral = integrateBroadbandTargetResponse(cameraModel, filterProfile, referenceProfile);
        const referenceIntegral = integrateBroadbandTargetResponse(cameraModel, referenceProfile);
        if (!(activeIntegral > 0) || !(referenceIntegral > 0)) return 1;
        return clamp(activeIntegral / referenceIntegral, 0.35, 1.15);
      }
  
      function spectralSkyBaselineForFilter(filter, conditions, cameraState) {
        const filterProfile = getFilterProfile(filter?.profileId);
        if (!spectralSkyRelevantForFilter(filterProfile, conditions)) return null;
        const cameraModel = getCamera(cameraState?.cameraId);
        const referenceProfile = DATA.filterProfiles["osc-broad"];
        const skyProfileId = normalizeSkyProfileId(conditions?.skySpectralProfileId);
        const activeIntegral = integrateBroadbandSkyResponse(cameraModel, filterProfile, skyProfileId, conditions?.bortleClass, referenceProfile);
        const referenceIntegral = integrateBroadbandSkyResponse(cameraModel, referenceProfile, skyProfileId, conditions?.bortleClass);
        if (!(activeIntegral > 0) || !(referenceIntegral > 0)) return null;
        const ratio = clamp(activeIntegral / referenceIntegral, 0.05, 1.35);
        const profile = DATA.skyProfiles[skyProfileId] || DATA.skyProfiles[DEFAULT_SKY_PROFILE_ID];
        return {
          baseline: (DATA.skyBaselines.OSC_RGB || 0.24) * ratio,
          ratio,
          profileId: skyProfileId,
          profileLabel: profile.label
        };
      }
  
      function resolveFilter(filterId) {
        const profile = getFilterProfile(filterId);
        if (!profile) return null;
        const metrics = deriveFilterMetrics(profile);
        const familyKey = skyFamilyKey(profile) === "OSC_RGB" ? "OSC_RGB" : (profile.line === "L" ? "L" : (["R","G","B"].includes(profile.line) ? "RGB" : profile.line));
        return {
          filterId: profile.id,
          profileId: profile.id,
          name: profile.label,
          family: skyFamilyKey(profile),
          bandType: profile.mode,
          bandwidthNm: Number(metrics.effectiveBandwidthNm.toFixed(2)),
          transmissionPeakFrac: Number(metrics.peakFrac.toFixed(3)),
          skyKey: profile.mode === "broadband" ? skyFamilyKey(profile) : `${skyFamilyKey(profile)}_${metrics.effectiveBandwidthNm <= 4.5 ? "3nm" : "6nm"}`,
          comfortKey: bandwidthClassKey(profile, metrics),
          familyKey,
          referenceNm: metrics.peakNm,
          compatible: [...(profile.compatible || [])],
          lpStyle: !!profile.lpStyle,
          provisional: !!profile.provisional,
          category: profile.category || "",
          filterFamily: profile.filterFamily || "",
          filterRole: profile.filterRole || "",
          exposureBehavior: profile.exposureBehavior || profile.mode,
          workflowFamily: profile.workflowFamily || "",
          defaultThroughput: Number.isFinite(profile.defaultThroughput) ? profile.defaultThroughput : null,
          isNarrowbandLike: !!profile.isNarrowbandLike,
          showIrLeakWarning: !!profile.showIrLeakWarning,
          showUvIrPresentNote: !!profile.showUvIrPresentNote,
          skyBaselineEPerPxPerSec: normalizedSkyBaseline(profile, metrics),
          sourceLabel: profile.label
        };
      }
  
      function normalizeSelectedFilters(camera, selectedFilters) {
        const filterSet = resolveFilterSet(appState.filterSetId, camera);
        const compatible = (filterSet?.filters || []).filter((filterId) => !!getFilterProfile(filterId));
        const next = (selectedFilters || []).filter((filterId) => compatible.includes(filterId));
        if (next.length) return next;
        return compatible.length ? compatible : [];
      }
  
      function resolveCameraState(cameraModel, selectedGain, selectedModeId, tempC) {
        const mode = cameraModel.modes.find((entry) => entry.modeId === selectedModeId)
          || cameraModel.modes[0];
        const gain = clamp(selectedGain, mode.gainRange.min, mode.gainRange.max);
        const readNoiseE = interpolateCurve(mode.curves.readNoiseE.points, gain);
        const fullWellE = interpolateCurve(mode.curves.fullWellE.points, gain);
        const systemGainEPerAdu = interpolateCurve(mode.curves.systemGainEPerAdu.points, gain);
        const dynamicRangeStops = interpolateCurve(mode.curves.dynamicRangeStops.points, gain);
        const darkCurrentEPerPxPerSec = interpolateCurve(mode.curves.darkCurrentEPerPxPerSec.points, tempC);
        const authoritativeHcgGain = cameraHcgSwitchGain(cameraModel, mode);
        const hcgActive = authoritativeHcgGain != null
          ? gain >= authoritativeHcgGain
          : !!mode.modeSwitchBehavior?.hcgActive;
        const switchGain = authoritativeHcgGain;
        const switchReferenceFullWellE = switchGain != null
          ? interpolateCurve(mode.curves.fullWellE.points, switchGain)
          : fullWellE;
        return {
          cameraId: cameraModel.cameraId,
          modeId: mode.modeId,
          gain,
          tempC,
          readNoiseE,
          fullWellE,
          systemGainEPerAdu,
          darkCurrentEPerPxPerSec,
          dynamicRangeStops,
          pixelSizeUm: cameraModel.pixelSizeUm,
          colorType: cameraModel.colorType,
          hcgActive,
          switchReferenceFullWellE,
          dataQuality: cameraModel.dataQuality.level,
          cameraName: `${cameraModel.manufacturer} ${cameraModel.name}`
        };
      }
  
      function estimateSkyRate(input) {
        const { optics, filter, conditions, cameraState } = input;
        const ref = DATA.constants.skyReference;
        const spectralSkyBaseline = spectralSkyBaselineForFilter(filter, conditions, cameraState);
        const baseline = spectralSkyBaseline?.baseline || filter.skyBaselineEPerPxPerSec || DATA.skyBaselines[filter.skyKey] || 0.03;
        const fScale = Math.pow(ref.fRatio / Math.max(1.4, optics.fRatio), 2);
        const skyScale = Math.pow(10, -0.4 * (conditions.skyBrightnessMagPerArcsec2 - ref.skyBrightnessMagPerArcsec2));
        const airmass = computeAirmass(conditions.targetAltitudeDeg);
        const extinctionKey = filter.bandType === "narrowband" ? "narrowband" : "broadband";
        const k = DATA.constants.extinctionCoefficients[extinctionKey];
        const altitudeScale = Math.pow(10, 0.4 * k * (airmass - 1));
        const moonSeverity = conditions.moonSeverity;
        const familyKey = filter.familyKey || filter.family;
        const moonMap = DATA.moonMultipliers[moonSeverity] || DATA.moonMultipliers.moonless;
        const moonScale = moonMap[familyKey] || moonMap[filter.family] || 1;
        const qeReference = filter.bandType === "narrowband" ? DATA.constants.referenceQe.narrowband : DATA.constants.referenceQe.broadband;
        const qeNorm = clamp(interpolateQe(getCamera(cameraState.cameraId).qeModel, filter.referenceNm) / qeReference, 0.75, 1.25);
        const obstructionFactor = 1 - Math.pow(clamp(optics.centralObstructionFrac || 0, 0, 0.8), 2);
        const throughputScale = (optics.throughputFrac * obstructionFactor) / 0.82;
        const skyRateEPerPxPerSec = baseline * fScale * skyScale * altitudeScale * moonScale * conditions.transparencyFactor * qeNorm * throughputScale;
        return {
          skyRateEPerPxPerSec,
          breakdown: {
            baseline,
            fScale,
            skyScale,
            altitudeScale,
            moonScale,
            transparencyFactor: conditions.transparencyFactor,
            qeNorm,
            throughputScale,
            airmass,
            moonSeverity,
            skySpectralProfileId: spectralSkyBaseline?.profileId || normalizeSkyProfileId(conditions.skySpectralProfileId),
            skySpectralProfileLabel: spectralSkyBaseline?.profileLabel || DATA.skyProfiles[normalizeSkyProfileId(conditions.skySpectralProfileId)]?.label || "Legacy flat sky",
            lpSkyTransmissionRatio: spectralSkyBaseline?.ratio ?? null
          }
        };
      }
  
      function estimateSourceScenario(input) {
        const { optics, filter, conditions, cameraState, derived, scenarioPreset } = input;
        const obstructionFactor = 1 - Math.pow(clamp(optics.centralObstructionFrac || 0, 0, 0.8), 2);
        const areaScale = Math.pow(optics.apertureMm / DATA.constants.skyReference.apertureMm, 2) * obstructionFactor;
        const airmass = computeAirmass(conditions.targetAltitudeDeg);
        const k = filter.bandType === "narrowband" ? 0.12 : 0.20;
        const sourceAltitudeTransmission = Math.pow(10, -0.4 * k * (airmass - 1));
        const qeReference = filter.bandType === "narrowband" ? DATA.constants.referenceQe.narrowband : DATA.constants.referenceQe.broadband;
        const qeNorm = clamp(interpolateQe(getCamera(cameraState.cameraId).qeModel, filter.referenceNm) / qeReference, 0.7, 1.3);
        const baseByFamily = {
          L: 112,
          R: 62,
          G: 72,
          B: 52,
          OSC_RGB: 78,
          Ha: 22,
          OIII: 18,
          SII: 17
        };
        const referenceCoreAreaPx = 5.5;
        const actualCoreAreaPx = Math.max(1.2, derived.starCoreAreaPx);
        const coreCompression = referenceCoreAreaPx / actualCoreAreaPx;
        const narrowPenalty = filter.bandType === "narrowband" && cameraState.colorType === "osc" ? 0.78 : 1;
        const broadbandTargetSignalRatio = broadbandTargetSignalRatioForFilter(filter, cameraState);
        const representativeStarCoreRateEPerSec =
          (baseByFamily[filter.familyKey] || baseByFamily[filter.family] || 80)
          * areaScale
          * optics.throughputFrac / 0.82
          * conditions.transparencyFactor
          * sourceAltitudeTransmission
          * qeNorm
          * coreCompression
          * filter.transmissionPeakFrac / 0.9
          * broadbandTargetSignalRatio
          * scenarioPreset.starCoreRateFactor
          * narrowPenalty;
  
        return {
          representativeStarCoreRateEPerSec,
          explanationTags: [
            `${scenarioPreset.label.toLowerCase()} preset`,
            areaScale > 1.1 ? "larger aperture pushes bright-star saturation earlier" : "aperture near reference",
            actualCoreAreaPx > referenceCoreAreaPx ? "seeing spreads stars over more pixels" : "tight seeing concentrates star cores",
            broadbandTargetSignalRatio !== 1 ? `LP target-side ratio ${fmtNumber(broadbandTargetSignalRatio, 2)}x` : "",
            cameraState.hcgActive ? "selected gain is in HCG territory" : "selected gain stays in lower-conversion behavior"
          ].filter(Boolean),
          broadbandTargetSignalRatio
        };
      }
  
      function computeThresholds(input) {
        const { cameraState, filter, workflow, sky, sourceScenario, lowerBoundBackground, calibration } = input;
        const empiricalReferenceState = calibration.referenceCameraState || cameraState;
        const rn = Math.max(0.1, calibration.exposureMode === "empirical"
          ? (empiricalReferenceState.readNoiseE || cameraState.readNoiseE)
          : cameraState.readNoiseE);
        const lowerBoundRate = Math.max(0.0001, lowerBoundBackground.rateEPerPxPerSec);
        const planningSkyRate = Math.max(0.0001, sky.skyRateEPerPxPerSec);
        const bandClass = classifyBand(filter);
        const damping = DATA.constants.gainSensitivityDamping[filter.bandType === "narrowband" ? "narrowband" : "broadband"];
        const readNoiseFloorFactor = contributionTargetFactor(filter, calibration.readNoiseContributionTargetPct);
        const readNoiseFloorSec = (readNoiseFloorFactor * rn * rn) / lowerBoundRate;
        const comfortMultiplier = DATA.constants.comfortMultipliers[filter.comfortKey] || 1.7;
        const rawComfortFloorSec = comfortMultiplier * readNoiseFloorSec;
        const eta = DATA.constants.overheadEfficiencyTargets[filter.bandType === "narrowband" ? "narrowband" : "broadband"];
        const overheadFloorSec = (eta / (1 - eta)) * workflow.frameOverheadSec;
        const practicalFloorSec = filter.bandType === "narrowband"
          ? (DATA.constants.narrowbandPracticalFloorSec[workflow.subExposureStrategy] || DATA.constants.narrowbandPracticalFloorSec.balanced)
          : 0;
        const moderatedReadNoiseFloorSec = dampThreshold(
          readNoiseFloorSec,
          filter.bandType === "narrowband" ? practicalFloorSec : overheadFloorSec,
          damping.readNoiseBoundaryScale,
          damping.gainOnlyOperatingBandCapSec
        );
        const comfortFloorSec = dampThreshold(
          rawComfortFloorSec,
          Math.max(overheadFloorSec, practicalFloorSec),
          damping.operatingBandScale,
          damping.gainOnlyOperatingBandCapSec
        );
        const practicalLowerFloorSec = filter.bandType === "narrowband"
          ? Math.max(moderatedReadNoiseFloorSec, overheadFloorSec, practicalFloorSec)
          : Math.max(moderatedReadNoiseFloorSec, overheadFloorSec);
        const saturationMultiplier = DATA.constants.saturationToleranceMultipliers[workflow.saturationTolerance] || 1;
        const effectiveFullWellE = Math.min(
          cameraState.fullWellE,
          Math.max(
            cameraState.switchReferenceFullWellE || cameraState.fullWellE,
            (cameraState.switchReferenceFullWellE || cameraState.fullWellE) * damping.saturationHeadroomCapMultiplier
          )
        );
        const useMeasuredSkyPedestal = calibration.exposureMode === "empirical" && lowerBoundBackground.source === "measured";
        const skyPedestalRateEPerPxPerSec = useMeasuredSkyPedestal ? lowerBoundRate : planningSkyRate;
        const cautionFullWell = DATA.constants.saturationFractions.caution * effectiveFullWellE * saturationMultiplier;
        const hardFullWell = DATA.constants.saturationFractions.hard * effectiveFullWellE * saturationMultiplier;
        const skyPedestalReserveFractions = DATA.constants.skyPedestalReserveFractionsByBand[bandClass]
          || DATA.constants.skyPedestalReserveFractionsByBand[filter.bandType === "narrowband" ? "narrowband" : "broadband_mono"];
        const skyHeadroomReserveE = Math.max(250, effectiveFullWellE - cautionFullWell);
        const skyPedestalBudgetCautionE = skyHeadroomReserveE * skyPedestalReserveFractions.caution;
        const skyPedestalBudgetHardE = skyHeadroomReserveE * skyPedestalReserveFractions.hard;
        const skyPedestalCautionSec = skyPedestalBudgetCautionE / skyPedestalRateEPerPxPerSec;
        const skyPedestalHardSec = skyPedestalBudgetHardE / skyPedestalRateEPerPxPerSec;
        const starRate = Math.max(0.001, sourceScenario.representativeStarCoreRateEPerSec);
        const saturationCautionSec = cautionFullWell / starRate;
        const saturationHardSec = hardFullWell / starRate;
        const baseWorkflowMaxSec = DATA.constants.workflowMaxSec[filter.bandType === "narrowband" ? "narrowband" : "broadband"]
          * (DATA.constants.workflowRiskMultipliers[workflow.rejectionRiskTolerance] || 1);
        const skyLogTerm = clamp(
          -Math.log10(Math.max(sky.breakdown?.skyScale || 1, 0.05)),
          -0.5,
          0.6
        );
        const broadbandSkyPracticalCapScale = filter.bandType === "broadband"
          ? clamp(
              1 + skyLogTerm * DATA.constants.broadbandSkyPracticalCapLogScale,
              DATA.constants.broadbandSkyPracticalCapClamp.min,
              DATA.constants.broadbandSkyPracticalCapClamp.max
            )
          : 1;
        const workflowMaxSec = baseWorkflowMaxSec * broadbandSkyPracticalCapScale;
        const broadbandSkyAnchorAdjustment = filter.bandType === "broadband"
          ? clamp(
              skyLogTerm * DATA.constants.broadbandSkyAnchorLogScale,
              DATA.constants.broadbandSkyAnchorAdjustmentClamp.min,
              DATA.constants.broadbandSkyAnchorAdjustmentClamp.max
            )
          : 0;
        const preferredStartSec = filter.bandType === "narrowband"
          ? Math.max(comfortFloorSec, overheadFloorSec, practicalFloorSec)
          : Math.max(comfortFloorSec, overheadFloorSec);
        const sweetCapFraction = DATA.constants.sweetSpotCapFractions[filter.bandType === "narrowband" ? "narrowband" : "broadband"]
          || DATA.constants.sweetSpotCapFractionOfCaution;
        const skyPedestalLimitSec = skyPedestalCautionSec;
        const workflowHardSec = 1.5 * workflowMaxSec;
        const sweetSpotMaxRaw = Math.min(sweetCapFraction * saturationCautionSec, workflowMaxSec, skyPedestalLimitSec);
        const hardMaxSec = Math.min(saturationHardSec, workflowHardSec, skyPedestalHardSec);
        const collapsed = sweetSpotMaxRaw <= practicalLowerFloorSec;
        const collapsedStartSec = Math.min(practicalLowerFloorSec, hardMaxSec);
        const sweetSpotMaxSec = collapsed ? Math.max(collapsedStartSec, Math.min(hardMaxSec, Math.max(overheadFloorSec, 0.9 * hardMaxSec))) : sweetSpotMaxRaw;
        const lowerBoundSec = collapsed ? Math.min(practicalLowerFloorSec, collapsedStartSec) : practicalLowerFloorSec;
        return {
          bandClass,
          readNoiseContributionTargetPct: calibration.readNoiseContributionTargetPct,
          lowerBoundSource: lowerBoundBackground.source,
          lowerBoundBackgroundRateEPerPxPerSec: lowerBoundRate,
          planningSkyRateEPerPxPerSec: planningSkyRate,
          skyPedestalSource: useMeasuredSkyPedestal ? "measured_test_frame" : "planning_sky",
          effectiveReadNoiseE: rn,
          readNoiseFloorFactor,
          readNoiseFloorSec,
          moderatedReadNoiseFloorSec,
          rawComfortFloorSec,
          comfortFloorSec,
          overheadFloorSec,
          practicalFloorSec,
          effectiveFullWellE,
          skyPedestalRateEPerPxPerSec,
          skyHeadroomReserveE,
          skyPedestalBudgetCautionE,
          skyPedestalBudgetHardE,
          skyPedestalBudgetFraction: skyPedestalReserveFractions.caution,
          skyPedestalHardFraction: skyPedestalReserveFractions.hard,
          skyPedestalCautionSec,
          skyPedestalHardSec,
          saturationCautionSec,
          saturationHardSec,
          baseWorkflowMaxSec,
          workflowMaxSec,
          workflowHardSec,
          broadbandSkyPracticalCapScale,
          broadbandSkyAnchorAdjustment,
          preferredStartSec,
          sweetSpotMinSec: collapsed ? collapsedStartSec : Math.max(practicalLowerFloorSec, preferredStartSec),
          sweetSpotMaxSec,
          hardMaxSec,
          lowerBoundSec,
          collapsed,
          workflowSwitchingPenalty: workflow.switchingPenalty,
          workflowFocusInterruptionCost: workflow.focusInterruptionCost,
          workflowFavors: workflow.favorsSharedExposure,
          workflowAdvisory: workflow.advisory
        };
      }
  
      function synthesizeRecommendation(thresholds) {
        const tlower = thresholds.lowerBoundSec;
        const tsweetMin = thresholds.sweetSpotMinSec;
        const tsweetMax = thresholds.sweetSpotMaxSec;
        const thardMax = Math.max(tsweetMax, thresholds.hardMaxSec);
        const upperLimitDriver = thresholds.skyPedestalCautionSec <= Math.min(thresholds.saturationCautionSec, thresholds.workflowMaxSec)
          ? "sky"
          : thresholds.saturationCautionSec <= thresholds.workflowMaxSec
            ? "saturation"
            : "workflow";
        const skyClampAdjustment = upperLimitDriver === "sky"
          ? -0.04
          : 0;
        const compressionAdjustment = clamp(
          Math.log10(Math.max(tsweetMax, tsweetMin + 1) / Math.max(tsweetMin, 5)) * 0.06,
          -0.03,
          0.05
        );
        const anchorWeight = clamp(
          (DATA.constants.anchorBiasByBand[thresholds.bandClass] ?? DATA.constants.anchorBiasByBand.narrowband)
            + (thresholds.broadbandSkyAnchorAdjustment || 0)
            + compressionAdjustment
            + skyClampAdjustment,
          0.1,
          0.85
        );
        const anchorSec = roundExposure(weightedGeometricPoint(Math.max(tsweetMin, 5), Math.max(tsweetMax, tsweetMin + 5), anchorWeight));
  
        const lowerDrivers = [
          { label: "Read noise", raw: thresholds.readNoiseFloorSec, side: "lower_bound" },
          { label: "Frame overhead", raw: thresholds.overheadFloorSec, side: "lower_bound" },
          { label: "Practical floor", raw: thresholds.practicalFloorSec || 0, side: "lower_bound" },
          { label: "Comfort margin", raw: thresholds.comfortFloorSec - tlower, side: "lower_bound", secondary: true }
        ].sort((a, b) => b.raw - a.raw);
  
        const upperDrivers = [
          { label: "Bright-star saturation", raw: thresholds.saturationCautionSec, side: "upper_bound" },
          { label: "Sky-pedestal headroom", raw: thresholds.skyPedestalCautionSec, side: "upper_bound" },
          { label: "Workflow hard max", raw: thresholds.workflowMaxSec, side: "upper_bound" },
          { label: "Sky-pedestal hard cap", raw: thresholds.skyPedestalHardSec, side: "upper_bound", secondary: true },
          { label: "Bright-star hard ceiling", raw: thresholds.saturationHardSec, side: "upper_bound", secondary: true }
        ].sort((a, b) => a.raw - b.raw);
  
        const lowerTop = lowerDrivers.slice(0, 2).map((entry, index) => ({
          type: entry.side,
          label: entry.label,
          impact: index === 0 ? "high" : entry.raw >= tlower * 0.6 ? "medium" : "low"
        }));
  
        const upperTop = upperDrivers.slice(0, 2).map((entry, index) => ({
          type: entry.side,
          label: entry.label,
          impact: index === 0 ? "high" : entry.raw <= upperDrivers[0].raw * 1.35 ? "medium" : "low"
        }));
  
        const zones = [
          {
            name: "too_short",
            startSec: 0,
            endSec: tlower,
            reason: "The sub-exposure remains read-noise limited."
          },
          {
            name: "lean_workable",
            startSec: tlower,
            endSec: tsweetMin,
            reason: "The read-noise criterion has cleared, but operational overhead or comfort-margin penalties still keep the setup below the practical operating band."
          },
          {
            name: "sweet_spot",
            startSec: tsweetMin,
            endSec: tsweetMax,
            reason: thresholds.collapsed
              ? "The system is tightly constrained, so the practical operating band narrows to a slim band."
              : "This is the practical operating band where noise efficiency, overhead, and headroom are best balanced."
          },
          {
            name: "long_risky",
            startSec: tsweetMax,
            endSec: thardMax,
            reason: "Additional exposure time brings diminishing benefit while saturation and workflow risk rise."
          },
          {
            name: "too_long",
            startSec: thardMax,
            endSec: null,
            reason: "This is the model hard ceiling, a warning threshold rather than a universal prohibition."
          }
        ];
  
        return {
          zones,
          anchorSec,
          lowerBoundDrivers: lowerTop,
          upperBoundDrivers: upperTop
        };
      }
  
      function buildPracticalExposureGuidance(input, thresholds, synthesis) {
        return null;
      }
  
      function displayThresholdsForResult(result) {
        return result.thresholds;
      }
  
      function buildExplanation(payload) {
        const { filter, cameraState, thresholds, synthesis, sky, sourceScenario, thermal, lowerBoundBackground } = payload;
        const lowerLeader = synthesis.lowerBoundDrivers[0]?.label || "Read noise";
        const upperLeader = synthesis.upperBoundDrivers[0]?.label || "Bright-star saturation";
        const lowerRegime = zoneNames("too_short").full;
        const middleRegime = zoneNames("lower_floor_gap").full;
        const operatingBand = zoneNames("sweet_spot").full;
        const riskRegime = zoneNames("long_risky").full;
        const hardCeiling = zoneNames("too_long").full;
        const gainSentence = cameraState.hcgActive
          ? `At gain ${Math.round(cameraState.gain)}, the camera is modeled on its higher-conversion side. That directionally helps the read-noise floor, but it also trims practical headroom.`
          : `At gain ${Math.round(cameraState.gain)}, the camera keeps more headroom, but the model leaves the read-noise floor higher than it would be after the HCG transition.`;
        const overheadSentence = thresholds.practicalFloorSec > 0
          ? `For narrowband, the tool also applies a practical floor of ${fmtSeconds(thresholds.practicalFloorSec)} in ${payload.workflow.subExposureStrategy} mode so the recommendation does not become unrealistically eager about very short subs.`
          : thresholds.overheadFloorSec > thresholds.readNoiseFloorSec * 0.8
            ? "Short subs still pay a visible overhead penalty, so the practical range starts a bit later than the pure read-noise floor."
            : "Frame overhead is present, but it is not the main thing pushing the recommendation upward.";
        const upperSentence = upperLeader === "Workflow hard max"
          ? "The upper edge is being capped more by workflow risk than by immediate clipping, so treat it as a practical limit rather than a physical cliff."
          : upperLeader === "Sky-pedestal headroom"
            ? "The upper edge is being capped more by sky-pedestal headroom than by immediate bright-star clipping, so longer subs are becoming less forgiving for faint-background contrast."
          : "The upper edge depends mostly on preset-based bright-star saturation, so it should be treated as a cautious planning limit rather than a target-specific clipping prediction.";
        const lowerBoundSentence = lowerBoundBackground.source === "measured"
          ? thresholds.skyPedestalSource === "measured_test_frame"
            ? `The lower-bound path is calibrated from a measured background rate of ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s using a ${contributionTargetLabel(thresholds.readNoiseContributionTargetPct)}. In Empirical Calibration Mode that same measured frame is also used for the sky-pedestal headroom estimate, so Bortle and SQM do not separately tug the upper side for this calibrated filter.`
            : `The lower-bound path is calibrated from a measured background rate of ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s using a ${contributionTargetLabel(thresholds.readNoiseContributionTargetPct)}. That anchors the lower side, but the upper-side sky-pedestal headroom still follows the current planning sky at ${fmtNumber(thresholds.skyPedestalRateEPerPxPerSec, 4)} e-/px/s.`
          : filter.bandType === "narrowband"
            ? `The lower-bound path uses a modeled ${filter.name} background rate of ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 3)} e-/px/s with a ${contributionTargetLabel(thresholds.readNoiseContributionTargetPct)}. That model is heuristic, so treat it as planning guidance.`
            : `The lower-bound path uses a modeled sky background of ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 3)} e-/px/s with a ${contributionTargetLabel(thresholds.readNoiseContributionTargetPct)}. That keeps broadband recommendations from running too long, but the lower bound still reflects modeled assumptions.`;
        const thermalSentence = `Dark current is ${fmtNumber(thermal.darkRateEPerPxPerSec, 4)} e-/px/s versus lower-bound background ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s, or about ${fmtPercentFromRatio(thermal.ratioToSky, 1)} of that background. ${thermal.explanation}`;
        const anchorSentence = thresholds.collapsed
          ? `The anchor lands at ${fmtSeconds(synthesis.anchorSec)} because the workable window is narrow under the current assumptions, not because the tool believes that number is exact.`
          : filter.bandType === "broadband"
            ? `The suggested starting sub length lands at ${fmtSeconds(synthesis.anchorSec)} because broadband recommendations are intentionally biased toward the lower side of the operating band once the lower floor is cleared.`
            : `The suggested starting sub length lands at ${fmtSeconds(synthesis.anchorSec)} because it sits inside the current operating band rather than at a single claimed optimum.`;
        const sourceSentence = `The upper bound depends on both a ${payload.scenarioPreset.label.toLowerCase()} preset with an estimated star-core rate of about ${fmtNumber(sourceScenario.representativeStarCoreRateEPerSec, 1)} e-/s and a sky/background pedestal of ${fmtNumber(thresholds.skyPedestalRateEPerPxPerSec, 4)} e-/px/s from ${thresholds.skyPedestalSource === "measured_test_frame" ? "the measured test frame" : "the current planning sky"}, not on target-specific star catalogs or image analysis.`;
        return {
          lead: `This is a directional recommendation. The lower side is calibrated to a ${contributionTargetLabel(thresholds.readNoiseContributionTargetPct)} and stays in the ${lowerRegime.toLowerCase()} until about ${fmtSeconds(thresholds.lowerBoundSec)}. The upper side is constrained mostly by ${upperLeader.toLowerCase()}.`,
          bullets: [
            "The read-noise contribution target calibrates the lower bound. The operating band is a broader trade study.",
            `The ${middleRegime} extends until the ${operatingBand} begins.`,
            `The ${operatingBand} is where the trade between noise efficiency, overhead, and headroom is most balanced.`,
            `The ${riskRegime} begins where extra exposure time brings diminishing benefit and growing clipping or frame-loss cost.`,
            `The ${hardCeiling} is a model-based warning threshold, not a universal prohibition.`,
            lowerBoundSentence,
            thermalSentence,
            overheadSentence,
            upperSentence,
            gainSentence,
            anchorSentence,
            sourceSentence
          ]
        };
      }
  
      function describeSkySourceForUser(result) {
        if (result.thresholds.skyPedestalSource === "measured_test_frame") {
          return `This filter is anchored by a measured test frame instead of the planning sky estimate. That means changing Bortle or SQM should not move the lower side very much unless you replace the calibration frame.`;
        }
        return `This filter is using your planned sky estimate, so Bortle, SQM, moon, transparency, and altitude can move both the lower side and the sky-headroom limit on the upper side.`;
      }
  
      function explainLowerDriverForUser(result) {
        const driver = result.synthesis.lowerBoundDrivers[0]?.label || "Read noise";
        const t = result.thresholds;
        if (driver === "Frame overhead") {
          return `Shorter subs would spend too much of the night in overhead instead of collecting signal. That is why the tool does not call this filter comfortably workable until about ${fmtSeconds(t.lowerBoundSec)}.`;
        }
        if (driver === "Practical floor") {
          return `For this narrowband filter, the tool is steering away from very short subs that may work on paper but are usually awkward in real imaging. In plain terms, it treats about ${fmtSeconds(t.lowerBoundSec)} as the first comfortably practical sub length.`;
        }
        return `The filter mainly needs a little more exposure time to get clear of the read-noise penalty. For this setup, that happens at about ${fmtSeconds(t.lowerBoundSec)}.`;
      }
  
      function explainUpperDriverForUser(result) {
        const driver = result.synthesis.upperBoundDrivers[0]?.label || "Bright-star saturation";
        const t = result.thresholds;
        if (driver === "Sky-pedestal headroom") {
          return `The sky background is building up enough that longer subs become less forgiving. In plain terms, the background itself is using too much of the sensor’s headroom.`;
        }
        if (driver === "Workflow hard max") {
          return `Longer subs are becoming unattractive mostly for operational reasons. They may still be physically possible, but each lost frame would cost too much time and flexibility.`;
        }
        return `Bright stars are the main reason not to keep stretching this sub length. They start running into the model’s caution zone before sky background or workflow becomes the first limit.`;
      }
  
      function buildNetEffectSummary(result) {
        const lowerDriver = result.synthesis.lowerBoundDrivers[0]?.label || "Read noise";
        const upperDriver = result.synthesis.upperBoundDrivers[0]?.label || "Bright-star saturation";
        const lowerPhrase = lowerDriver === "Practical floor"
          ? "the shortest comfortably practical narrowband sub"
          : lowerDriver === "Frame overhead"
            ? "capture overhead"
            : "read-noise clearance";
        const upperPhrase = upperDriver === "Bright-star saturation"
          ? "bright-star saturation"
          : upperDriver === "Sky-pedestal headroom"
            ? "sky-background headroom"
            : "workflow limits";
        return `A good first try is about ${fmtSeconds(result.headlineRecommendation.anchorSec)}. Shorter subs start running into ${lowerPhrase}, and longer subs become less forgiving near ${fmtSeconds(result.thresholds.sweetSpotMaxSec)} because of ${upperPhrase}.`;
      }
  
      function driverLabelForDisplay(result, label) {
        return label;
      }
  
      function cameraProvenanceDetails(camera) {
        const id = camera?.cameraId || "";
        const level = camera?.dataQuality?.level || "generic";
        const sensorFamily = camera?.sensor || camera?.sensorFamily || "sensor family";
        let operatingData = camera?.dataQuality?.curveSource || "Planning-grade camera model";
        let qeSource = "Planning-grade QE curve";
        let note = "Treat this as a practical planning model, not a laboratory calibration file.";
  
        if (id.startsWith("playerone-")) {
          operatingData = "Official Player One gain, read-noise, full-well, dynamic-range, and dark-current data";
          qeSource = `Generic ${sensorFamily} sensor-family QE curve because Player One does not publish a camera-specific QE curve`;
          note = "This follows the catalog policy: use manufacturer-published QE when available; otherwise use the generic sensor-family curve and mark the model as partial.";
        } else if (id === "qhy071c") {
          operatingData = "Compact QHY071C planning import";
          qeSource = "Generic Sony IMX071-family OSC QE proxy; QHY-specific lab QE tables are not stored here";
          note = "This entry is intentionally labeled as a same-silicon planning proxy until stronger QHY071-specific public source material is available.";
        } else if (id === "qhy268m" || id === "qhy268c") {
          operatingData = "Official QHY operating data imported from the System Comparison catalog";
          qeSource = "Compact shared Sony IMX571-family QE curve";
          note = "The operating model is QHY-specific, while the spectral response remains a compact family curve.";
        } else if (id.startsWith("zwo-")) {
          if (id === "zwo-asi294mm-pro" || id === "zwo-asi294mc-pro" || id === "zwo-asi533mm-pro" || id === "zwo-asi533mc-pro") {
            operatingData = "Official ZWO operating data";
            qeSource = "QE-peak-anchored compact ZWO-family curve";
            note = "ZWO source material supports the operating model, but the QE curve is peak-anchored rather than a full-resolution lab table.";
          } else {
            operatingData = "Official ZWO published specifications and gain/read-noise behavior";
            qeSource = "ZWO-published camera QE curve or compact digitization from ZWO material";
            note = "This is a stronger source path because the camera maker publishes its own spectral response material.";
          }
        } else if (id.startsWith("qhy")) {
          operatingData = "QHY-family operating data";
          qeSource = "Compact Sony-family QE approximation";
          note = "The model remains planning-grade because not every QHY source provides a complete camera-specific QE curve.";
        }
  
        const levelLabel = level === "full-modeled"
          ? "Full-modeled"
          : level === "partial"
            ? "Partial"
            : "Generic";
        return { level, levelLabel, operatingData, qeSource, note, rawSource: camera?.dataQuality?.curveSource || "" };
      }
  
      function renderCameraProvenanceCard(camera) {
        const prov = cameraProvenanceDetails(camera);
        return `
          <div class="provenance-card">
            <div class="provenance-title">
              <span>Camera Data Provenance</span>
              <span class="confidence-pill ${levelClass(prov.level === "full-modeled" ? "high" : prov.level === "partial" ? "medium" : "low")}">${prov.levelLabel}</span>
            </div>
            <div class="provenance-grid">
              <div class="provenance-item"><div class="k">Operating data</div><div class="v">${prov.operatingData}</div></div>
              <div class="provenance-item"><div class="k">QE / spectral response</div><div class="v">${prov.qeSource}</div></div>
            </div>
            <div class="provenance-note">${prov.note}</div>
          </div>
        `;
      }
  
      function summarizeWorkflowDisplay(workflow, results) {
        if (!workflow) {
          return {
            headline: "Workflow effect is minor",
            advisory: "Workflow settings mainly tune convenience and simplification, not the underlying physics."
          };
        }
        const family = workflow.workflowFamily || workflowFamilyForState(appState);
        if (family === "mono_single_filter") {
          return {
            headline: "Simple mono workflow",
            advisory: "No filter sequencing is needed. Main workflow costs are dithering, settling, focus events, and rejected-frame risk."
          };
        }
        if (family === "osc_broadband") {
          return {
            headline: "OSC-friendly workflow",
            advisory: "No filter cycling is required. Main workflow costs are download time, dithering, settling, focus events, and rejected-frame risk."
          };
        }
        if (family === "osc_filtered") {
          return {
            headline: "Filtered OSC workflow",
            advisory: "Dual-band or tri-band filters reduce sky background and may support longer subs, but star headroom and rejected-frame cost still matter."
          };
        }
        if (family === "osc_with_filter_changes") {
          return {
            headline: "Simple filter workflow",
            advisory: "Fewer filter changes than mono, but separate OSC filters may still need different exposure ranges and bright-star saturation checks."
          };
        }
        const multiFilter = Array.isArray(results) && results.length > 1;
        const anchors = multiFilter ? results.map((result) => result.headlineRecommendation.anchorSec) : [];
        const anchorSpread = anchors.length ? Math.max(...anchors) - Math.min(...anchors) : 0;
        const sharedFeasible = multiFilter && anchorSpread <= 120;
  
        if (workflow.captureSequencing === "filter_cycling" && workflow.focusHandling === "refocus_every_change") {
          return {
            headline: "Cycling gives even coverage",
            advisory: "Cycling filters spreads data across the filter set, but may increase switching and focus overhead depending on your sequence."
          };
        }
        if (workflow.captureSequencing === "filter_cycling") {
          return {
            headline: "Cycling gives even coverage",
            advisory: "Cycling filters spreads data across the filter set, but may increase switching and focus overhead depending on your sequence."
          };
        }
        return {
          headline: "Filter sequencing matters",
          advisory: "Per-filter starts and headroom limits may differ. Blocks reduce switching overhead; cycling gives more even filter coverage if conditions change."
        };
      }
  
      function computeConfidence(input, result) {
        const cameraLevel = input.cameraState.dataQuality === "full-modeled"
          ? "high"
          : input.cameraState.dataQuality === "partial"
            ? "medium"
            : "low";
        const skyLevel = input.calibration.exposureMode === "empirical"
          ? "high"
          : input.conditions.skyInputMode === "sqm"
            ? "medium"
            : input.conditions.skyInputMode === "measured" || input.conditions.skyInputMode === "manual"
                ? "medium"
            : "low";
        const saturationLevel = input.scenarioPreset ? "medium" : "low";
        const scoreMap = { low: 1, medium: 2, high: 3 };
        const overallScore = (scoreMap[cameraLevel] + scoreMap[skyLevel] + scoreMap[saturationLevel]) / 3;
        const overall = overallScore >= 2.45 ? "high" : overallScore >= 1.7 ? "medium" : "low";
        const cameraProvenance = cameraProvenanceDetails(getCamera(input.cameraState.cameraId));
        const explanation = overall === "high"
          ? "The camera model is relatively strong, but the sky and bright-star saturation layers are still approximate. Use this as a practical starting point."
          : overall === "medium"
            ? "The result should be directionally useful, but the heuristic sky model and preset-based saturation model mean it should not be treated as exact."
            : "This is best treated as a rough planning guide. The uncertainty is too high for confident fine-grained recommendations.";
        return {
          cameraModel: input.cameraState.dataQuality,
          cameraProvenance,
          cameraConfidence: cameraLevel,
          skyModel: input.calibration.exposureMode === "empirical"
            ? "measured background calibration"
            : input.conditions.skyInputMode === "sqm"
              ? "SQM sky-brightness measurement"
              : input.conditions.skyInputMode === "measured" || input.conditions.skyInputMode === "manual"
              ? "manual sky brightness"
              : "Bortle-derived heuristic",
          skyConfidence: skyLevel,
          saturationModel: "preset-based",
          saturationConfidence: saturationLevel,
          overall,
          explanation
        };
      }
  
      function buildEngineInput(filterId) {
        const camera = getCamera(appState.cameraId);
        const selectedModeId = appState.modeId === "auto" ? camera.modes[0].modeId : appState.modeId;
        const cameraState = resolveCameraState(camera, appState.gain, selectedModeId, appState.tempC);
        const empiricalCalibration = getEmpiricalCalibrationRecord(filterId);
        const empiricalCalibrationActive = appState.exposureMode === "empirical" && hasUsableEmpiricalCalibration(filterId);
        const calibrationModeId = empiricalCalibration.captureModeId || selectedModeId;
        const calibrationGain = Number.isFinite(empiricalCalibration.captureGain) ? empiricalCalibration.captureGain : appState.gain;
        const calibrationTempC = Number.isFinite(empiricalCalibration.captureTempC) ? empiricalCalibration.captureTempC : appState.tempC;
        const calibrationCameraState = resolveCameraState(camera, calibrationGain, calibrationModeId, calibrationTempC);
        const filter = resolveFilter(filterId);
        const focalLengthMm = appState.focalLengthMm;
        const apertureMm = appState.apertureMm;
        const fRatio = appState.fRatio;
        const skyBrightnessMagPerArcsec2 = resolveSkyBrightness(appState);
        const computedGeometry = computeMoonGeometry(appState);
        const geometryAuto = appState.moonGeometrySource === "computed" && !appState.computedMoonOverride;
        const targetAltitudeDeg = geometryAuto ? computedGeometry.targetAltitudeDeg : appState.targetAltitudeDeg;
        const moonIllumFrac = geometryAuto ? computedGeometry.moonIllumFrac : appState.moonIllumFrac;
        const moonAltitudeDeg = geometryAuto ? computedGeometry.moonAltitudeDeg : appState.moonAltitudeDeg;
        const moonSeparationDeg = geometryAuto ? computedGeometry.moonSeparationDeg : appState.moonSeparationDeg;
        const sunAltitudeDeg = geometryAuto ? computedGeometry.sunAltitudeDeg : appState.sunAltitudeDeg;
        const darknessState = geometryAuto ? computedGeometry.darknessState : appState.darknessState;
        const moonSeverity = appState.moonMode === "preset"
          ? appState.moonPreset
          : deriveMoonSeverity({ moonIllumFrac, moonAltitudeDeg, moonSeparationDeg });
        const imageScale = imageScaleArcsecPerPx(camera.pixelSizeUm, focalLengthMm);
        const seeingPxFwhm = appState.seeingArcsecFwhm / Math.max(0.01, imageScale);
        const photometricAreaPx = Math.max(4, Math.PI * Math.pow(Math.max(seeingPxFwhm, 1.1), 2));
        const starCoreAreaPx = Math.max(1.2, 0.82 * Math.pow(Math.max(seeingPxFwhm, 1.0), 2));
        const scenarioPreset = DATA.scenarioPresets[appState.fieldPresetId] || DATA.scenarioPresets.average_field;
  
        return {
          cameraState,
          optics: {
            apertureMm,
            focalLengthMm,
            fRatio,
            centralObstructionFrac: appState.centralObstructionFrac,
            throughputFrac: getActiveThroughputFrac()
          },
          filter,
          conditions: {
            skyInputMode: appState.skyInputMode,
            skySpectralProfileId: appState.skySpectralProfileId,
            skyBrightnessMagPerArcsec2,
            seeingArcsecFwhm: appState.seeingArcsecFwhm,
            targetAltitudeDeg,
            moonIllumFrac,
            moonAltitudeDeg,
            moonSeparationDeg,
            transparencyFactor: appState.transparencyFactor,
            bortleClass: appState.bortleClass,
            moonSeverity,
            skySourceLabel: skyBrightnessSourceLabel(appState),
            moonGeometrySource: appState.moonGeometrySource,
            sunAltitudeDeg,
            darknessState
          },
          workflow: deriveWorkflowSettings(appState),
          calibration: {
            exposureMode: appState.exposureMode,
            empiricalCalibrationActive,
            readNoiseContributionTargetPct: appState.readNoiseContributionTargetPct,
            testExposureSec: empiricalCalibration.testExposureSec,
            measuredBackgroundValue: empiricalCalibration.measuredBackgroundValue,
            measuredBackgroundUnits: empiricalCalibration.measuredBackgroundUnits,
            backgroundMeasurementStatus: empiricalCalibration.backgroundMeasurementStatus,
            biasPedestalAdu: empiricalCalibration.biasPedestalAdu,
            trueGainEPerAdu: empiricalCalibration.trueGainEPerAdu,
            bitDepthScalingMode: empiricalCalibration.bitDepthScalingMode,
            empiricalReadNoiseE: empiricalCalibration.empiricalReadNoiseE,
            optionalDarkCurrentEPerPxPerSec: empiricalCalibration.optionalDarkCurrentEPerPxPerSec,
            captureModeId: calibrationModeId,
            captureGain: calibrationGain,
            captureTempC: calibrationTempC,
            captureFilterId: empiricalCalibration.captureFilterId || filterId,
            captureFilterName: empiricalCalibration.captureFilterName || filter?.name || filterId,
            referenceCameraState: calibrationCameraState
          },
          derived: {
            imageScaleArcsecPerPx: imageScale,
            seeingPxFwhm,
            photometricAreaPx,
            starCoreAreaPx
          },
          scenarioPreset,
          computedGeometry
        };
      }
  
      function evaluateFilter(filterId) {
        const input = buildEngineInput(filterId);
        const sky = estimateSkyRate(input);
        const lowerBoundBackground = input.calibration.exposureMode === "empirical" && input.calibration.empiricalCalibrationActive
          ? empiricalBackgroundRate(input, input.cameraState)
          : {
              source: "modeled",
              rateEPerPxPerSec: sky.skyRateEPerPxPerSec,
              exposureSec: null
            };
        const sourceScenario = estimateSourceScenario({ ...input, sky });
        const thresholds = computeThresholds({ ...input, sky, sourceScenario, lowerBoundBackground });
        const synthesis = synthesizeRecommendation(thresholds);
        const thermal = evaluateThermalContribution(input.cameraState, lowerBoundBackground.rateEPerPxPerSec);
        const lowerBoundAudit = summarizeLowerBoundAudit(lowerBoundBackground, sky.skyRateEPerPxPerSec);
        if (thresholds.skyPedestalSource === "measured_test_frame") {
          lowerBoundAudit.warning = "";
          lowerBoundAudit.warningChip = "";
        }
        const confidence = computeConfidence(input, { thresholds, synthesis });
        const explanation = buildExplanation({ ...input, sky, sourceScenario, thresholds, synthesis, thermal, lowerBoundBackground });
        const practicalGuidance = buildPracticalExposureGuidance(input, thresholds, synthesis);
        return {
          filterId,
          input,
          derived: {
            ...input.derived,
            skyRateEPerPxPerSec: sky.skyRateEPerPxPerSec
          },
          sky,
          lowerBoundBackground,
          thermal,
          lowerBoundAudit,
          sourceScenario,
          thresholds,
          zones: synthesis.zones,
          theoreticalRecommendation: {
            rangeSec: [thresholds.sweetSpotMinSec, thresholds.sweetSpotMaxSec],
            anchorSec: synthesis.anchorSec,
            summary: `A ${fmtSeconds(synthesis.anchorSec)} sub is the computed theoretical starting sub length for this ${input.filter.name} setup.`
          },
          headlineRecommendation: {
            rangeSec: practicalGuidance?.rangeSec ?? [thresholds.sweetSpotMinSec, thresholds.sweetSpotMaxSec],
            anchorSec: practicalGuidance?.anchorSec ?? synthesis.anchorSec,
            summary: practicalGuidance?.summary ?? `A ${fmtSeconds(synthesis.anchorSec)} sub is a suggested starting sub length for this ${input.filter.name} setup.`
          },
          practicalGuidance,
          drivers: [...synthesis.lowerBoundDrivers, ...synthesis.upperBoundDrivers],
          synthesis,
          confidence,
          explanation
        };
      }
  
      function computeAllResults() {
        const camera = getCamera(appState.cameraId);
        appState.selectedFilters = normalizeSelectedFilters(camera, appState.selectedFilters);
        if (!appState.selectedFilters.includes(appState.activeFilterId)) {
          appState.activeFilterId = appState.selectedFilters[0];
        }
        return appState.selectedFilters.map((filterId) => evaluateFilter(filterId));
      }
  
      function displayResultsForWorkflow(results) {
        const family = workflowFamilyForState(appState);
        if (family !== "osc_filtered" || !Array.isArray(results) || results.length <= 1) return results;
        return [buildFilteredOscCompositeResult(results)];
      }
  
      function buildFilteredOscCompositeResult(results) {
        const camera = getCamera(appState.cameraId);
        const filterSet = resolveFilterSet(appState.filterSetId, camera);
        const lowerDriverResult = results.reduce((best, result) => result.thresholds.sweetSpotMinSec > best.thresholds.sweetSpotMinSec ? result : best, results[0]);
        const upperDriverResult = results.reduce((best, result) => result.thresholds.sweetSpotMaxSec < best.thresholds.sweetSpotMaxSec ? result : best, results[0]);
        const anchorDriverResult = results.reduce((best, result) => result.headlineRecommendation.anchorSec > best.headlineRecommendation.anchorSec ? result : best, results[0]);
        const composite = cloneData(anchorDriverResult);
        const sweetMin = Math.max(...results.map((result) => result.thresholds.sweetSpotMinSec));
        const sweetMax = Math.min(...results.map((result) => result.thresholds.sweetSpotMaxSec));
        const hardMax = Math.min(...results.map((result) => result.thresholds.hardMaxSec));
        const lowerBound = Math.max(...results.map((result) => result.thresholds.lowerBoundSec));
        const readNoiseFloor = Math.max(...results.map((result) => result.thresholds.readNoiseFloorSec));
        const moderatedReadNoiseFloor = Math.max(...results.map((result) => result.thresholds.moderatedReadNoiseFloorSec));
        const saturationCaution = Math.min(...results.map((result) => result.thresholds.saturationCautionSec));
        const saturationHard = Math.min(...results.map((result) => result.thresholds.saturationHardSec));
        const skyPedestalCaution = Math.min(...results.map((result) => result.thresholds.skyPedestalCautionSec));
        const skyPedestalHard = Math.min(...results.map((result) => result.thresholds.skyPedestalHardSec));
        const anchorSec = roundExposure(clamp(
          Math.max(...results.map((result) => result.headlineRecommendation.anchorSec)),
          sweetMin,
          Math.max(sweetMin, sweetMax)
        ));
        const filterLabel = filterSet?.label || "Filtered OSC";
        composite.filterId = filterSet?.id || "filtered-osc";
        composite.componentFilterIds = results.map((result) => result.filterId);
        composite.componentResults = results;
        composite.input.filter.filterId = composite.filterId;
        composite.input.filter.profileId = composite.filterId;
        composite.input.filter.name = filterLabel;
        composite.input.filter.sourceLabel = filterLabel;
        composite.thresholds = {
          ...composite.thresholds,
          lowerBoundSec: lowerBound,
          readNoiseFloorSec: readNoiseFloor,
          moderatedReadNoiseFloorSec: moderatedReadNoiseFloor,
          sweetSpotMinSec: sweetMin,
          sweetSpotMaxSec: sweetMax,
          hardMaxSec: hardMax,
          saturationCautionSec: saturationCaution,
          saturationHardSec: saturationHard,
          skyPedestalCautionSec: skyPedestalCaution,
          skyPedestalHardSec: skyPedestalHard
        };
        composite.synthesis = {
          ...composite.synthesis,
          anchorSec,
          lowerBoundDrivers: lowerDriverResult.synthesis.lowerBoundDrivers,
          upperBoundDrivers: upperDriverResult.synthesis.upperBoundDrivers
        };
        composite.theoreticalRecommendation = {
          rangeSec: [sweetMin, sweetMax],
          anchorSec,
          summary: `A ${fmtSeconds(anchorSec)} sub is the computed theoretical starting sub length for this ${filterLabel} setup.`
        };
        composite.headlineRecommendation = {
          rangeSec: [sweetMin, sweetMax],
          anchorSec,
          summary: `A ${fmtSeconds(anchorSec)} sub is a suggested starting sub length for this ${filterLabel} setup.`
        };
        composite.explanation = {
          ...composite.explanation,
          lead: `This is a combined filtered OSC recommendation for the physical ${filterLabel} filter. The internal passbands are checked separately, then collapsed to one practical sub length.`
        };
        return composite;
      }
  
      function zoneClass(name) {
        return ({
          too_short: "short",
          lower_floor_gap: "floorgap",
          lean_workable: "lean",
          sweet_spot: "sweet",
          long_risky: "risk",
          too_long: "long"
        })[name] || "short";
      }
  
      function zoneNames(name) {
        return ({
          too_short: { full: "Read Noise Regime", short: "Read Noise" },
          lower_floor_gap: { full: "Operational Overhead Floor", short: "Operations" },
          lean_workable: { full: "Operational Transition", short: "Transition" },
          sweet_spot: { full: "Practical Operating Band", short: "Operating Band" },
          long_risky: { full: "Saturation / Workflow Risk", short: "Sat/Workflow Risk" },
          too_long: { full: "Hard Ceiling", short: "Ceiling" }
        })[name] || { full: name, short: name };
      }
  
      function levelClass(level) {
        return level === "high" ? "high" : level === "medium" ? "medium" : level === "low" ? "low" : "heuristic";
      }
  
      function zoneColor(name) {
        return ({
          too_short: "var(--zone-short)",
          lower_floor_gap: "#6f8196",
          lean_workable: "var(--zone-lean)",
          sweet_spot: "var(--zone-sweet)",
          long_risky: "var(--zone-risk)",
          too_long: "var(--zone-long)"
        })[name] || "var(--zone-short)";
      }
  
      function buildDisplayRailZones(result) {
        const t = displayThresholdsForResult(result);
        const rnDisplayEnd = clamp(Math.max(0, t.moderatedReadNoiseFloorSec || t.readNoiseFloorSec), 0, t.hardMaxSec);
        const operationalEnd = Math.max(rnDisplayEnd, t.sweetSpotMinSec);
        const zones = [];
        const pushZone = (name, startSec, endSec, reason) => {
          if (endSec == null || endSec - startSec > 0.5) {
            zones.push({ name, startSec, endSec, reason });
          }
        };
        pushZone("too_short", 0, rnDisplayEnd, "The sub-exposure remains below the displayed read-noise criterion.");
        if (operationalEnd > rnDisplayEnd + 0.5) {
          pushZone("lower_floor_gap", rnDisplayEnd, operationalEnd, "Read noise has cleared, but short subs still carry operational overhead or comfort-margin penalties.");
        }
        pushZone("sweet_spot", t.sweetSpotMinSec, t.sweetSpotMaxSec, "This is the practical operating band where noise efficiency, overhead, and headroom are best balanced.");
        pushZone("long_risky", t.sweetSpotMaxSec, t.hardMaxSec, "Additional exposure time brings diminishing benefit while saturation and workflow risk rise.");
        pushZone("too_long", t.hardMaxSec, null, "This is the model hard ceiling, a warning threshold rather than a universal prohibition.");
        return zones;
      }
  
      function getSweetCapFraction(filter) {
        return DATA.constants.sweetSpotCapFractions[filter.bandType === "narrowband" ? "narrowband" : "broadband"]
          || DATA.constants.sweetSpotCapFractionOfCaution;
      }
  
      function getThresholdPlacementClass(value, maxDomain) {
        const frac = clamp(value / Math.max(1, maxDomain), 0, 1);
        if (frac < 0.09) return "edge-left";
        if (frac > 0.91) return "edge-right";
        return "";
      }
  
      function assignThresholdRows(markers, maxDomain) {
        const sorted = markers
          .map((marker) => ({ ...marker, frac: clamp(marker.value / Math.max(1, maxDomain), 0, 1) }))
          .sort((a, b) => a.value - b.value);
        const rowLastFrac = [-1, -1, -1];
        return sorted.map((marker) => {
          const minGap = marker.key === "hard" ? 0.12 : 0.16;
          let row = rowLastFrac.findIndex((lastFrac) => marker.frac - lastFrac >= minGap);
          if (row === -1) {
            row = rowLastFrac.indexOf(Math.min(...rowLastFrac));
          }
          rowLastFrac[row] = marker.frac;
          return { ...marker, rowClass: `row-${row}` };
        });
      }
  
      function applyComputedGeometryToState(force = false) {
        if (appState.moonGeometrySource !== "computed") return computeMoonGeometry(appState);
        const computed = computeMoonGeometry(appState);
        if (force || !appState.computedMoonOverride) {
          appState.targetAltitudeDeg = Number(computed.targetAltitudeDeg.toFixed(1));
          appState.moonIllumFrac = Number(computed.moonIllumFrac.toFixed(3));
          appState.moonAltitudeDeg = Number(computed.moonAltitudeDeg.toFixed(1));
          appState.moonSeparationDeg = Number(computed.moonSeparationDeg.toFixed(1));
          appState.sunAltitudeDeg = Number(computed.sunAltitudeDeg.toFixed(1));
          appState.darknessState = computed.darknessState;
        }
        return computed;
      }
  
      async function geocodeLocationQuery() {
        const query = (appState.locationQuery || "").trim();
        if (!query) {
          appState.locationLookupStatus = "Enter a location or address first.";
          rerender();
          return;
        }
        appState.locationLookupStatus = "Geocoding...";
        rerender();
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`;
          const response = await fetch(url, { headers: { "Accept": "application/json" } });
          const data = await response.json();
          const best = Array.isArray(data) ? data[0] : null;
          if (!best) throw new Error("No location match.");
          appState.siteLatitudeDeg = Number(best.lat);
          appState.siteLongitudeDeg = Number(best.lon);
          appState.locationLookupLabel = best.display_name || query;
          appState.locationContextType = best.type || "unknown";
          appState.locationLookupStatus = "Location resolved for computed moon geometry. Enter sky brightness manually or from SQM.";
          applyComputedGeometryToState(false);
        } catch (error) {
          appState.locationLookupStatus = "Geocoding unavailable. Enter latitude/longitude manually.";
        }
        rerender();
      }
  
      function useCurrentDateTime() {
        const now = new Date();
        const offsetMs = now.getTimezoneOffset() * 60000;
        appState.planningDateTimeLocal = new Date(now.getTime() - offsetMs).toISOString().slice(0,16);
        appState.computedMoonOverride = false;
        applyComputedGeometryToState(true);
        rerender();
      }
  
      function useCurrentLocation() {
        if (!navigator.geolocation) {
          appState.locationLookupStatus = "Browser location is unavailable.";
          rerender();
          return;
        }
        appState.locationLookupStatus = "Getting current location...";
        rerender();
        navigator.geolocation.getCurrentPosition((position) => {
          appState.siteLatitudeDeg = Number(position.coords.latitude.toFixed(5));
          appState.siteLongitudeDeg = Number(position.coords.longitude.toFixed(5));
          appState.locationLookupLabel = "Current device location";
          appState.locationContextType = "unknown";
          appState.locationLookupStatus = "Location captured for computed moon geometry. Enter sky brightness manually or from SQM.";
          appState.computedMoonOverride = false;
          applyComputedGeometryToState(true);
          rerender();
        }, () => {
          appState.locationLookupStatus = "Browser location permission failed.";
          rerender();
        }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 });
      }
  
      function renderSetupPanel() {
        const camera = getCamera(appState.cameraId);
        const compatibleSets = compatibleFilterSets(camera);
        const activeFilterSet = resolveFilterSet(appState.filterSetId, camera);
        const activeFilterMembers = (activeFilterSet?.filters || []).map((filterId) => resolveFilter(filterId)).filter(Boolean);
        const calibrationFilterId = getCalibrationFilterId();
        const calibrationFilter = resolveFilter(calibrationFilterId);
        const activeCalibration = getEmpiricalCalibrationRecord(calibrationFilterId);
        const activeCalibrationModeId = activeCalibration.captureModeId || (appState.modeId === "auto" ? camera.modes[0].modeId : appState.modeId);
        const activeCalibrationGain = Number.isFinite(activeCalibration.captureGain) ? activeCalibration.captureGain : appState.gain;
        const activeCalibrationTempC = Number.isFinite(activeCalibration.captureTempC) ? activeCalibration.captureTempC : appState.tempC;
        const activeCalibrationModeName = camera.modes.find((mode) => mode.modeId === activeCalibrationModeId)?.modeName
          || camera.modes[0]?.modeName
          || "Current mode";
        const activeCalibrationReferenceState = resolveCameraState(camera, activeCalibrationGain, activeCalibrationModeId, activeCalibrationTempC);
        const calibrationDiffersFromCurrent =
          calibrationFilterId
          && (
            activeCalibration.captureModeId && activeCalibration.captureModeId !== (appState.modeId === "auto" ? camera.modes[0].modeId : appState.modeId)
            || Number.isFinite(activeCalibration.captureGain) && activeCalibration.captureGain !== appState.gain
            || Number.isFinite(activeCalibration.captureTempC) && activeCalibration.captureTempC !== appState.tempC
          );
        const workflowModel = deriveWorkflowSettings(appState);
        const workflowFamily = workflowModel.workflowFamily;
        const workflowMeta = workflowFamilyMeta(workflowFamily);
        const showFilterSequencing = workflowHasFilterSequencing(workflowFamily);
        const helpText = {
          planningMode: "Uses modeled sky/background assumptions to estimate exposure regimes before capture.",
          empiricalMode: "Uses a real test exposure and measured image background to calibrate the lower-bound regime more directly.",
          rnTarget: "Sets the tolerated contribution from read noise relative to the minimum achievable stack noise. Lower percentages require longer exposures. Based on the read-noise contribution approach described by Robin Glover / SharpCap.",
          filterSet: "Selects a real named filter set built from the filter-curve library imported from the system comparison tool. The exposure model then uses the resolved member filters rather than a generic band placeholder.",
          sqm: "Use a measured sky-brightness reading when available. This is stronger than a generic planning estimate.",
          skySpectralProfile: "Bortle or SQM sets how bright the sky is. This setting describes what kind of light pollution spectrum is in that brightness, which matters most for LP-style broadband filters.",
          measuredBackground: "Mean sky/background level from a real test exposure. This anchors the lower-bound calculation more directly than a modeled sky-rate estimate.",
          biasPedestal: "Required only if the measured background is entered in ADU space and has not already been bias-corrected.",
          trueGain: "Looked-up camera conversion gain in e-/ADU from the saved calibration capture settings. This is not the driver gain setting.",
          bitDepth: "Needed only when converting measured ADU values into a common working scale.",
          darkCurrentOverride: "Optional manual override. Leave blank to use the looked-up dark current from the saved calibration capture settings for this filter.",
          moonGeometry: "Computes moon phase, moon altitude, and moon-target geometry from the selected site and time.",
          computedMoonUse: "Computed values are used to estimate lunar impact in Planning Mode.",
          fieldPreset: "Sets the representative bright-star pressure used for the bright-star saturation side estimate.",
          throughput: "Estimated fraction of light transmitted through the optical train and filter before it reaches the camera sensor. This is not sensor QE and is not just the telescope objective. It may include losses from correctors, reducers, flatteners, filters, windows, coatings, and other optical elements. Small losses multiply across the full system, so values in the 80–90% range can be realistic.",
          operatingBand: "Operating band = the recommended interval after the lower floor is cleared but before headroom/workflow penalties dominate.",
          hardCeiling: "Hard ceiling = the terminal cap from saturation-hard and workflow-hard limits. Exposures beyond this point are outside the recommended range under the current assumptions.",
          workflowCap: "Upper workflow limit derived from filter class and bad-frame-risk tolerance.",
          captureSequencing: "Filter blocks reduce switching overhead. Filter cycling spreads coverage across filters but may increase switching and focus overhead.",
          filterBlocksLength: "How many subs you usually take before changing filters when using Filter blocks. Longer blocks reduce per-sub switching cost.",
          ditherCadence: "How often the sequence dithers. Dithering every frame improves pattern-noise control but increases overhead, especially with short subs.",
          perEventOverhead: "Estimated time not collecting light around events such as download, dither, settle, and similar sequence overhead.",
          focusHandling: "Focus events can interrupt imaging time. For mono filter sets, filter offsets plus refocus when needed means using offsets during cycling while letting your capture software trigger autofocus when focus trends worse.",
          testFilter: "Choose which filter you are entering a measured test frame for. Calibration is stored separately for each filter.",
          backgroundMeasurementType: "Use raw mean for an uncorrected frame. Use bias/dark-subtracted mean only if the value already has pedestal and dark signal removed.",
          frameOverhead: "Frame overhead is an estimated per-sub practical cost: baseline capture overhead, dither/settle cost averaged by cadence, and any filter-switch cost spread across the sequence. It is not exposure time on target."
        };
        const setupGroup = (id, title, subtitle, body, extraClass = "") => `
          <section class="setup-group ${extraClass} ${appState[id] ? "open" : ""}">
            <button type="button" class="setup-group-head" data-setup-toggle="${id}">
              <div class="setup-group-title">
                <strong>${title}</strong>
                <span>${subtitle}</span>
              </div>
              <span class="setup-group-chevron">▾</span>
            </button>
            <div class="setup-group-body">${body}</div>
          </section>
        `;
        const computedPreview = computeMoonGeometry(appState);
        const cameraOptions = [...DATA.cameras]
          .sort(compareCamerasForUi)
          .map((entry) => `<option value="${entry.cameraId}" ${entry.cameraId === appState.cameraId ? "selected" : ""}>${entry.manufacturer} ${entry.name}</option>`)
          .join("");
        const modeOptions = camera.modes
          .map((mode) => `<option value="${mode.modeId}" ${mode.modeId === appState.modeId || (appState.modeId === "auto" && mode === camera.modes[0]) ? "selected" : ""}>${mode.modeName}</option>`)
          .join("");
        const modeField = camera.modes.length > 1
          ? `<select id="modeId">${modeOptions}</select>`
          : "";
        const filterSetOptions = [...compatibleSets]
          .sort(compareFilterSetsForUi)
          .map((set) => `<option value="${set.id}" ${set.id === activeFilterSet?.id ? "selected" : ""}>${set.label}</option>`)
          .join("");
        const filterPills = activeFilterMembers.map((filter) => {
          const active = appState.selectedFilters.includes(filter.filterId);
          return `
            <label class="pill ${active ? "active" : ""}">
              <input type="checkbox" data-filter-toggle="${filter.filterId}" ${active ? "checked" : ""}/>
              <span>${filter.name}</span>
            </label>
          `;
        }).join("");
        const recommendedGains = camera.modes[0].recommendedPresets.map((value) => `
              <button type="button" class="ghost" data-gain-preset="${value}">${gainPresetLabel(camera, value)}</button>
            `).join("");
        const throughputUi = getThroughputUiState();
  
        document.getElementById("setupPanel").innerHTML = `
          ${setupGroup("setupOpenConfig", "Saved setups", "Save, load, and track complete system setups", `
            <div class="actions">
              <button type="button" class="primary" id="saveConfigJson">Save Setup (JSON)</button>
              <button type="button" class="ghost" id="loadConfigJson">Load Setup (JSON)</button>
            </div>
            <input id="configFileInput" type="file" accept=".json,application/json" style="display:none" />
            ${appState.configLoadedFileName ? `
              <div class="config-meta ${appState.configDirtySinceLoad ? "dirty" : ""}">
                <div><strong>Active configuration:</strong> ${escapeHtml(appState.configLoadedFileName)}</div>
                <div><strong>Status:</strong> ${appState.configDirtySinceLoad ? "Changed since load" : "Matches loaded file state"}</div>
              </div>
            ` : ""}
            ${appState.configIoStatus ? `<div class="config-status ${appState.configIoStatusLevel || ""}">${appState.configIoStatus}</div>` : ""}
            <div class="config-helper">JSON stores the full setup, selected filters, workflow choices, and any per-filter empirical calibration records.</div>
          `)}
  
          ${setupGroup("setupOpenSystem", "System", "Camera, optics, and sensor settings", `
            <div class="field-grid-full">
              <div class="field">
                <label>Operating mode</label>
                <div class="mode-toggle">
                  <button type="button" class="toggle-chip ${appState.exposureMode === "planning" ? "active" : ""}" data-exposure-mode="planning">Planning Mode ${helpBadge(helpText.planningMode)}</button>
                  <button type="button" class="toggle-chip ${appState.exposureMode === "empirical" ? "active" : ""}" data-exposure-mode="empirical">Empirical Calibration ${helpBadge(helpText.empiricalMode)}</button>
                </div>
                <div class="mode-note">Planning mode estimates the lower bound from modeled sky/background assumptions. Empirical calibration anchors it from a measured test frame.</div>
              </div>
            </div>
            <div class="field-grid">
              <div class="field field-span-2 camera-select-field"><label>Camera</label><select id="cameraId">${cameraOptions}</select></div>
              ${modeField ? `<div class="field"><label>Camera mode</label>${modeField}</div>` : ""}
              <div class="field">
                <label>Gain</label>
                <input id="gain" type="number" inputmode="numeric" min="0" max="400" step="1" value="${appState.gain}">
              </div>
              <div class="field">
                <label>Sensor temp (°C)</label>
                <input id="tempC" type="number" inputmode="numeric" min="-30" max="25" step="1" value="${appState.tempC}">
              </div>
              <div class="field"><label>Aperture (mm)</label><input id="apertureMm" type="number" inputmode="numeric" min="40" max="500" step="1" value="${appState.apertureMm}"></div>
              <div class="field"><label>Focal length (mm)</label><input id="focalLengthMm" type="number" inputmode="numeric" min="100" max="5000" step="1" value="${appState.focalLengthMm}"></div>
              <div class="field"><label>Focal ratio</label><input id="fRatio" type="number" inputmode="decimal" min="1.5" max="15" step="0.1" value="${appState.fRatio}"></div>
              <div class="field"><label>Central obstruction (% of aperture diameter)</label><input id="centralObstructionFrac" type="number" inputmode="decimal" min="0" max="70" step="1" value="${fmtNumber(appState.centralObstructionFrac * 100, 0)}"></div>
              <div class="field"><label>Read-noise contribution target ${helpBadge(helpText.rnTarget)}</label>
                <select id="readNoiseContributionTargetPct">
                  ${[10,5,2].map((value) => `<option value="${value}" ${value === appState.readNoiseContributionTargetPct ? "selected" : ""}>${value}%</option>`).join("")}
                </select>
              </div>
            </div>
            <div class="throughput-stack">
              <div class="throughput-head">
                <div class="throughput-label">Estimated Optics + Filter Throughput ${helpBadge(helpText.throughput)}</div>
                <div class="throughput-value-row">
                  <div class="throughput-value">${throughputUi.activePct}%</div>
                  <div class="throughput-status-pill ${throughputUi.usingCustom ? "custom" : ""}">${throughputUi.statusLabel}</div>
                </div>
              </div>
              <div class="throughput-helper">This is a cascaded estimate for the optical train and filter, not just the telescope objective. It is used with sensor QE to estimate detected signal and sky background.</div>
              <div class="throughput-breakdown"><strong>Throughput estimate:</strong> Combined estimate based on selected optical and filter assumptions.</div>
              ${!throughputUi.usingCustom && throughputUi.calculatedPct < 88 ? `<div class="throughput-mini-note">Full-system throughput can look lower than expected because small losses multiply across the optical path.</div>` : ``}
              <details class="throughput-advanced" id="throughputAdvanced" ${appState.throughputAdvancedOpen ? "open" : ""}>
                <summary>Advanced</summary>
                <div class="throughput-advanced-body">
                  <label class="throughput-checkbox">
                    <input id="customThroughputOverrideEnabled" type="checkbox" ${appState.customThroughputOverrideEnabled ? "checked" : ""}>
                    <span>Use custom optics + filter throughput</span>
                  </label>
                  <div class="field-grid">
                    <div class="field ${appState.customThroughputOverrideEnabled ? "" : "inactive"}">
                      <label>Custom optics + filter throughput</label>
                      <input id="customThroughputOverridePct" type="number" inputmode="decimal" min="30" max="99" step="1" value="${fmtNumber(appState.customThroughputOverridePct, 0)}" ${appState.customThroughputOverrideEnabled ? "" : "disabled"}>
                    </div>
                    <div class="field">
                      <label>Status</label>
                      <div class="readonly-value">${throughputUi.usingCustom ? "Custom override" : "Calculated estimate"}</div>
                    </div>
                  </div>
                  <div class="throughput-advanced-actions">
                    <button type="button" class="throughput-reset" id="resetThroughputEstimate">Reset to calculated estimate</button>
                  </div>
                  <div class="throughput-warning ${throughputUi.advisoryLevel}">${throughputUi.advisoryMessage || "Changing this value directly affects modeled signal and sky background. Most users should leave this set to the calculated estimate unless they have measured system throughput or a strong reason to override it."}</div>
                </div>
              </details>
            </div>
            <div class="actions">${recommendedGains}</div>
            <div class="micro-note" style="margin-top:6px">Gain presets are camera-specific shortcuts, not universal recommendations. ${gainBehaviorNote(camera)}</div>
            <div class="small-note" style="margin-top:8px">${camera.manufacturer} ${camera.name} ${camera.dataQuality.level === "full-modeled" ? "is <strong>fully modeled</strong>" : camera.dataQuality.level === "partial" ? "uses a <strong>partial camera model</strong>" : "uses a <strong>generic camera model</strong>"}. Pixel size: ${fmtNumber(camera.pixelSizeUm, 2)} µm.</div>
            ${renderCameraProvenanceCard(camera)}
          `)}
          ${setupGroup("setupOpenFilters", "Filter Set", "Select a filter set and active filters", `
            <div class="field-grid-full" style="margin-bottom:8px">
              <div class="field">
                <label>Filter set ${helpBadge(helpText.filterSet)}</label>
                <select id="filterSetId">${filterSetOptions}</select>
              </div>
            </div>
            <div class="pill-row">${filterPills}</div>
            <div class="small-note" style="margin-top:8px"><strong>${activeFilterSet?.label || "—"}</strong>${activeFilterMembers.length ? ` · ${activeFilterMembers.map((filter) => filter.name).join(", ")}` : ""}</div>
            ${activeFilterMembers.length === 1 ? renderOscBroadbandFilterNotice(activeFilterMembers[0]) : ""}
          `)}
  
          ${setupGroup("setupOpenSky", "Sky + Field", "Planning assumptions, location, geometry, and field pressure", `
            <div class="setup-subgroup sky-source">
              <div class="setup-subgroup-head">
                <div class="setup-subgroup-title">Sky source</div>
                <div class="setup-subgroup-note">Choose the sky estimate you trust most. Editing one of the source fields below makes it active.</div>
              </div>
              <div class="field-grid">
                <div class="field"><label>Sky brightness source</label>
                  <select id="skyInputMode">
                    <option value="manual" ${appState.skyInputMode === "manual" ? "selected" : ""}>Manual sky brightness</option>
                    <option value="sqm" ${appState.skyInputMode === "sqm" ? "selected" : ""}>SQM measurement</option>
                    <option value="bortle" ${appState.skyInputMode === "bortle" ? "selected" : ""}>Bortle-derived</option>
                  </select>
                </div>
                <div class="field ${appState.skyInputMode === "manual" ? "" : "inactive"}"><label>Manual sky brightness (mag/arcsec²)</label><input id="skyBrightnessMagPerArcsec2" type="number" inputmode="decimal" min="17" max="22.5" step="0.1" value="${appState.skyBrightnessMagPerArcsec2}"></div>
                <div class="field ${appState.skyInputMode === "sqm" ? "" : "inactive"}"><label>SQM measurement (mag/arcsec²) ${helpBadge(helpText.sqm)}</label><input id="sqmMeasurementMagPerArcsec2" type="number" inputmode="decimal" min="17" max="22.5" step="0.1" value="${appState.sqmMeasurementMagPerArcsec2}"></div>
                <div class="field ${appState.skyInputMode === "bortle" ? "" : "inactive"}"><label>Bortle class</label>
                  <select id="bortleClass">${Object.keys(DATA.bortleToSky).map((key) => `<option value="${key}" ${Number(key) === appState.bortleClass ? "selected" : ""}>Bortle ${key}</option>`).join("")}</select>
                </div>
                <div class="field field-span-2">
                  <label>Sky spectral profile ${helpBadge(helpText.skySpectralProfile)}</label>
                  <select id="skySpectralProfileId">${Object.values(DATA.skyProfiles).map((profile) => `<option value="${profile.id}" ${profile.id === appState.skySpectralProfileId ? "selected" : ""}>${profile.label}</option>`).join("")}</select>
                  <div class="field-note">Use Legacy flat sky for the original scalar behavior. The preview shows effective modeled sky background on a compressed display scale, not a calibrated spectrum.</div>
                </div>
              </div>
              ${renderSkySpectralProfilePlot(appState.skySpectralProfileId, appState.bortleClass)}
            </div>
  
            <div class="setup-subgroup location">
              <div class="setup-subgroup-head">
                <div class="setup-subgroup-title">Site and time</div>
                <div class="setup-subgroup-note">Used for computed geometry.</div>
              </div>
              <div class="field-grid">
                <div class="field"><label>Location / address / ZIP</label><input id="locationQuery" type="text" value="${appState.locationQuery}"><div class="field-note">Press Enter or use Resolve location.</div></div>
                <div class="field"><label>Planning date/time</label><input id="planningDateTimeLocal" type="datetime-local" value="${appState.planningDateTimeLocal}"></div>
                <div class="field"><label>Latitude (deg)</label><input id="siteLatitudeDeg" type="number" inputmode="decimal" min="-90" max="90" step="0.0001" value="${appState.siteLatitudeDeg}"></div>
                <div class="field"><label>Longitude (deg)</label><input id="siteLongitudeDeg" type="number" inputmode="decimal" min="-180" max="180" step="0.0001" value="${appState.siteLongitudeDeg}"></div>
                <div class="field field-span-2">
                  <label>Location helpers</label>
                  <div class="actions compact-actions">
                    <button type="button" class="ghost" id="resolveLocation">Resolve location</button>
                    <button type="button" class="ghost" id="useMyLocation">Use my location</button>
                    <button type="button" class="ghost" id="useCurrentDateTime">Use current date/time</button>
                  </div>
                </div>
              </div>
            </div>
  
            <div class="setup-subgroup target">
              <div class="setup-subgroup-head">
                <div class="setup-subgroup-title">Target and field</div>
                <div class="setup-subgroup-note">Target position and field assumptions.</div>
              </div>
              <div class="field-grid">
                <div class="field"><label>Seeing FWHM (arcsec)</label><input id="seeingArcsecFwhm" type="number" inputmode="decimal" min="1" max="8" step="0.1" value="${appState.seeingArcsecFwhm}"></div>
                <div class="field"><label>Transparency factor</label><input id="transparencyFactor" type="number" inputmode="decimal" min="0.4" max="1.2" step="0.01" value="${appState.transparencyFactor}"></div>
                <div class="field"><label>Target RA (hours)</label><input id="targetRaHours" type="number" inputmode="decimal" min="0" max="24" step="0.01" value="${appState.targetRaHours}"></div>
                <div class="field"><label>Target Dec (deg)</label><input id="targetDecDeg" type="number" inputmode="decimal" min="-90" max="90" step="0.1" value="${appState.targetDecDeg}"></div>
                <div class="field"><label>Target altitude (deg)</label><input id="targetAltitudeDeg" type="number" inputmode="numeric" min="10" max="90" step="1" value="${appState.targetAltitudeDeg}"></div>
                <div class="field"><label>Field preset ${helpBadge(helpText.fieldPreset)}</label>
                  <select id="fieldPresetId">${Object.entries(DATA.scenarioPresets).map(([key, preset]) => `<option value="${key}" ${key === appState.fieldPresetId ? "selected" : ""}>${preset.label}</option>`).join("")}</select>
                </div>
              </div>
            </div>
  
            <div class="setup-subgroup moon">
              <div class="setup-subgroup-head">
                <div class="setup-subgroup-title">Moon geometry</div>
                <div class="setup-subgroup-note">Manual or computed moon geometry.</div>
              </div>
              <div class="field-grid">
                <div class="field"><label>Moon/geometry source ${helpBadge(helpText.moonGeometry)}</label>
                  <select id="moonGeometrySource">
                    <option value="manual" ${appState.moonGeometrySource === "manual" ? "selected" : ""}>Manual</option>
                    <option value="computed" ${appState.moonGeometrySource === "computed" ? "selected" : ""}>Computed from site/time/target</option>
                  </select>
                </div>
                <div class="field"><label>Moon input</label>
                  <select id="moonMode">
                    <option value="preset" ${appState.moonMode === "preset" ? "selected" : ""}>Severity preset</option>
                    <option value="manual" ${appState.moonMode === "manual" ? "selected" : ""}>Manual moon inputs</option>
                  </select>
                </div>
                <div class="field"><label>Moon severity</label>
                  <select id="moonPreset">
                    ${["moonless","minor","moderate","strong","severe"].map((level) => `<option value="${level}" ${level === appState.moonPreset ? "selected" : ""}>${level[0].toUpperCase()}${level.slice(1)}</option>`).join("")}
                  </select>
                </div>
                <div class="field"><label>Moon illumination</label><input id="moonIllumFrac" type="number" inputmode="decimal" min="0" max="1" step="0.01" value="${appState.moonIllumFrac}"></div>
                <div class="field"><label>Moon altitude (deg)</label><input id="moonAltitudeDeg" type="number" inputmode="numeric" min="-30" max="90" step="1" value="${appState.moonAltitudeDeg}"></div>
                <div class="field"><label>Moon separation (deg)</label><input id="moonSeparationDeg" type="number" inputmode="numeric" min="0" max="180" step="1" value="${appState.moonSeparationDeg}"></div>
              </div>
              <div class="actions" style="margin-top:10px">
                ${appState.moonGeometrySource === "computed" ? `<button type="button" class="ghost" id="resetComputedGeometry">Reset to computed values</button>` : ""}
              </div>
            </div>
  
            <div class="micro-note">Sky source: <strong>${skyBrightnessSourceLabel(appState)}</strong>. Moon geometry: <strong>${appState.moonGeometrySource === "computed" ? "computed" : "manual"}</strong>.</div>
            <div class="small-note" style="margin-top:6px">${appState.locationLookupStatus}</div>
            ${appState.moonGeometrySource === "computed" ? `
              <div class="source-summary">
                <div class="source-card"><div class="k">Computed moon illumination</div><div class="v">${fmtNumber(computedPreview.moonIllumFrac * 100, 1)}%</div></div>
                <div class="source-card"><div class="k">Computed moon altitude</div><div class="v">${fmtNumber(computedPreview.moonAltitudeDeg, 1)}°</div></div>
                <div class="source-card"><div class="k">Computed target altitude</div><div class="v">${fmtNumber(computedPreview.targetAltitudeDeg, 1)}°</div></div>
                <div class="source-card"><div class="k">Moon-target separation</div><div class="v">${fmtNumber(computedPreview.moonSeparationDeg, 1)}°</div></div>
              </div>
              <div class="micro-note">Sun altitude: ${fmtNumber(computedPreview.sunAltitudeDeg, 1)}°. Darkness: ${computedPreview.darknessState}.</div>
            ` : ""}
          `, "sky-field-group")}
  
          ${setupGroup("setupOpenWorkflow", workflowMeta.sectionTitle, workflowMeta.sectionSubtitle, `
            <div class="field-grid-full">
              ${showFilterSequencing ? `
                <div class="field">
                  <label>Filter strategy ${helpBadge(helpText.captureSequencing)}</label>
                  <div class="mode-toggle">
                    <button type="button" class="toggle-chip ${appState.captureSequencing === "filter_blocks" ? "active" : ""}" data-capture-sequencing="filter_blocks">Filter blocks</button>
                    <button type="button" class="toggle-chip ${appState.captureSequencing === "filter_cycling" ? "active" : ""}" data-capture-sequencing="filter_cycling">Filter cycling</button>
                  </div>
                  <div class="mode-note">${appState.captureSequencing === "filter_blocks" ? "Capture many subs with one filter before switching." : "Rotate through filters in short repeating cycles."}</div>
                  ${appState.captureSequencing === "filter_blocks" ? `
                    <div class="field-grid" style="margin-top:10px">
                      <div class="field">
                        <label>Block size ${helpBadge(helpText.filterBlocksLength)}</label>
                        <select id="filterBlockLengthPreset">
                          ${[5,10,20].map((value) => `<option value="${value}" ${Number(appState.filterBlockLengthSubs) === value ? "selected" : ""}>${value} subs</option>`).join("")}
                          <option value="custom" ${[5,10,20].includes(Number(appState.filterBlockLengthSubs)) ? "" : "selected"}>Custom</option>
                        </select>
                      </div>
                      <div class="field ${[5,10,20].includes(Number(appState.filterBlockLengthSubs)) ? "inactive" : ""}">
                        <label>Custom block size</label>
                        <input id="filterBlockLengthSubs" type="number" inputmode="numeric" min="1" max="50" step="1" value="${appState.filterBlockLengthSubs}">
                      </div>
                    </div>
                  ` : ""}
                </div>
              ` : ""}
              <div class="field-grid">
                <div class="field"><label>Dither cadence ${helpBadge(helpText.ditherCadence)}</label>
                  <select id="ditherFrequency">
                    ${[
                      ["every_1","Every frame"],
                      ["every_2","Every 2 frames"],
                      ["every_3","Every 3 frames"],
                      ["every_5","Every 5 frames"],
                      ["off","Not modeled"]
                    ].map(([value,label]) => `<option value="${value}" ${value === appState.ditherFrequency ? "selected" : ""}>${label}</option>`).join("")}
                  </select>
                </div>
                <div class="field"><label>Per-event overhead ${helpBadge(helpText.perEventOverhead)}</label>
                  <select id="overheadAssumptionPreset">
                    ${[
                      ["low","Low"],
                      ["typical","Typical"],
                      ["high","High"],
                      ["custom","Custom"]
                    ].map(([value,label]) => `<option value="${value}" ${value === appState.overheadAssumptionPreset ? "selected" : ""}>${label}</option>`).join("")}
                  </select>
                </div>
                <div class="field ${appState.overheadAssumptionPreset === "custom" ? "" : "inactive"}">
                  <label>Custom overhead seconds</label>
                  <input id="customEventOverheadSec" type="number" inputmode="numeric" min="0" max="120" step="1" value="${appState.customEventOverheadSec}">
                </div>
              </div>
              <div class="field">
                <label>Focus handling ${helpBadge(helpText.focusHandling)}</label>
                <div class="mode-toggle">
                  ${showFilterSequencing ? `<button type="button" class="toggle-chip ${appState.focusHandling === "refocus_every_change" ? "active" : ""}" data-focus-handling="refocus_every_change">On filter change</button>` : ""}
                  <button type="button" class="toggle-chip ${appState.focusHandling !== "refocus_every_change" && appState.focusHandling !== "manual_not_modeled" ? "active" : ""}" data-focus-handling="focus_offsets_monitoring">${showFilterSequencing ? "Filter offsets + refocus when needed" : "Periodic / temperature-based"}</button>
                  <button type="button" class="toggle-chip ${appState.focusHandling === "manual_not_modeled" ? "active" : ""}" data-focus-handling="manual_not_modeled">Manual / not modeled</button>
                </div>
                <div class="mode-note">Focus handling is a practical workflow factor here, not a full autofocus scheduler.</div>
              </div>
            </div>
            <div class="small-note" style="margin-top:10px"><strong>Effective overhead estimate ${helpBadge(helpText.frameOverhead)}</strong>: <strong>${fmtSeconds(workflowModel.frameOverheadSec)}</strong> per sub after baseline capture overhead, dither cadence, and any filter-switch assumption. This is an estimate, not a full sequencing model.</div>
            ${appState.overheadAssumptionPreset === "custom" && workflowModel.perEventOverheadSec > 60 ? `<div class="warning" style="margin-top:8px">Large overhead values can strongly favor longer subs. Use only if this reflects your actual sequence behavior.</div>` : ""}
            <div class="cards-3" style="margin-top:12px">
              <div class="mini-card">
                <h4>Workflow impact</h4>
                <div class="muted">${showFilterSequencing ? "Switching penalty" : "Workflow cost"}</div>
                <div class="big-number" style="font-size:1.45rem">${workflowModel.switchingPenalty}</div>
              </div>
              <div class="mini-card">
                <h4>&nbsp;</h4>
                <div class="muted">Dither cadence</div>
                <div class="big-number" style="font-size:1.02rem;line-height:1.15">${ditherFrequencyLabel(workflowModel.ditherFrequency)}</div>
              </div>
              <div class="mini-card">
                <h4>&nbsp;</h4>
                <div class="muted">Focus interruption cost</div>
                <div class="big-number" style="font-size:1.45rem">${workflowModel.focusInterruptionCost}</div>
              </div>
            </div>
            <div class="small-note" style="margin-top:8px">${workflowModel.advisory}</div>
            <details class="collapsible-secondary workflow-refinements">
              <summary><span>Additional practical limits</span><span class="summary-meta">Rejected-frame risk, file count, and optional switch penalty</span></summary>
              <div class="collapsible-secondary-body">
                <div class="field-grid">
                  <div class="field"><label>Bad-frame risk tolerance</label>
                    <select id="badFrameRiskTolerance">
                      ${["low","medium","high"].map((level) => `<option value="${level}" ${level === appState.badFrameRiskTolerance ? "selected" : ""}>${level[0].toUpperCase()}${level.slice(1)}</option>`).join("")}
                    </select>
                  </div>
                  <div class="field"><label>File-count / data-volume preference</label>
                    <select id="fileCountPreference">
                      ${[
                        ["safer_shorter","Prefer shorter safer subs"],
                        ["balanced","Balanced"],
                        ["fewer_files","Prefer fewer files"]
                      ].map(([value,label]) => `<option value="${value}" ${value === appState.fileCountPreference ? "selected" : ""}>${label}</option>`).join("")}
                    </select>
                  </div>
                  ${showFilterSequencing ? `<div class="field"><label>Optional custom filter-switch penalty (s)</label><input id="customFilterSwitchPenaltySec" type="number" inputmode="numeric" min="0" max="120" step="1" value="${appState.customFilterSwitchPenaltySec ?? ""}"></div>` : ""}
                </div>
                <div class="small-note" style="margin-top:8px">These settings shape the practical recommendation, not the physics floor.</div>
                <div class="small-note" style="margin-top:6px">This same overhead estimate is what the tool uses when it decides whether very short subs are becoming operationally wasteful.</div>
              </div>
            </details>
          `)}
  
          ${setupGroup("setupOpenCalibration", "Calibration", "Empirical inputs and example presets", `
            ${appState.exposureMode === "empirical" ? `
              <div class="small-note">Enter one measured test frame per filter to anchor the lower bound.</div>
              <details class="collapsible-secondary" style="margin-top:10px">
                <summary><span>How to collect calibration data</span><span class="summary-meta">Show steps</span></summary>
                <div class="collapsible-secondary-body">
                  <ol>
                    <li>Capture a representative test sub with the same camera, gain, mode, filter, and optical setup.</li>
                    <li>Measure a clean background region, avoiding bright stars, nebula cores, and gradients.</li>
                    <li>Note whether the value is raw or already bias/dark-subtracted.</li>
                    <li>Enter the measured value and test exposure time here.</li>
                  </ol>
                </div>
              </details>
              ${appState.selectedFilters.length > 1 ? `
                <div class="field-grid-full" style="margin-top:10px">
                  <div class="field">
                    <label>Test filter ${helpBadge(helpText.testFilter)}</label>
                    <select id="calibrationFilterId">
                      ${appState.selectedFilters.map((filterId) => {
                        const filter = resolveFilter(filterId);
                        return `<option value="${filterId}" ${filterId === calibrationFilterId ? "selected" : ""}>${filter?.name || filterId}</option>`;
                      }).join("")}
                    </select>
                    <div class="field-note">Choose which filter’s calibration you are editing.</div>
                  </div>
                </div>
              ` : ""}
              <div class="small-note" style="margin-top:10px">Each filter keeps its own calibration record. You are editing <strong>${calibrationFilter?.name || calibrationFilterId || "current filter"}</strong>.</div>
              ${hasUsableEmpiricalCalibration(calibrationFilterId) ? `<div class="field-note" style="margin-top:6px">A usable empirical record is saved for this filter and will drive the lower-bound path while Empirical Calibration Mode is active.</div>` : `<div class="warning" style="margin-top:8px">No saved empirical calibration is available yet for this filter. Until you enter and save a real test exposure and background value here, the tool will fall back to the modeled lower-bound path for this filter.</div>`}
              <div class="field-note" style="margin-top:6px">Step through each filter here, then use <strong>Save Setup (JSON)</strong> in Saved setups to keep the full calibration set together.</div>
              <div class="micro-note" style="margin-top:6px">Saved calibration capture settings: <strong>${activeCalibrationModeName}</strong> · <strong>gain ${activeCalibrationGain}</strong> · <strong>${activeCalibrationTempC}°C</strong>${activeCalibration.captureFilterName ? ` · <strong>${activeCalibration.captureFilterName}</strong>` : ""}</div>
              ${calibrationDiffersFromCurrent ? `<div class="small-note" style="margin-top:6px">Your current camera settings differ from the saved calibration capture settings, so this filter is still using its saved calibration values.</div>` : ""}
              <div class="field-grid" style="margin-top:10px">
                <div class="field"><label>Test exposure time (s)</label><input id="testExposureSec" type="number" inputmode="decimal" min="0.1" max="3600" step="0.1" value="${activeCalibration.testExposureSec}"></div>
                <div class="field"><label>Measured background value ${helpBadge(helpText.measuredBackground)}</label><input id="measuredBackgroundValue" type="number" inputmode="decimal" min="0" max="65535" step="0.1" value="${activeCalibration.measuredBackgroundValue}"></div>
                <div class="field"><label>Measurement units</label>
                  <select id="measuredBackgroundUnits">
                    <option value="adu" ${activeCalibration.measuredBackgroundUnits === "adu" ? "selected" : ""}>ADU</option>
                    <option value="electrons" ${activeCalibration.measuredBackgroundUnits === "electrons" ? "selected" : ""}>e-/px</option>
                  </select>
                </div>
                <div class="field"><label>Background measurement type ${helpBadge(helpText.backgroundMeasurementType)}</label>
                  <select id="backgroundMeasurementStatus">
                    <option value="raw_mean" ${activeCalibration.backgroundMeasurementStatus === "raw_mean" ? "selected" : ""}>raw mean</option>
                    <option value="corrected_mean" ${activeCalibration.backgroundMeasurementStatus === "corrected_mean" ? "selected" : ""}>bias/dark-subtracted mean</option>
                  </select>
                </div>
                <div class="field"><label>Bias / pedestal / master bias mean ${helpBadge(helpText.biasPedestal)}</label><input id="biasPedestalAdu" type="number" inputmode="decimal" min="0" max="65535" step="0.1" value="${activeCalibration.biasPedestalAdu}"></div>
                <div class="field"><label>True gain (e-/ADU) ${helpBadge(helpText.trueGain)}</label><input id="trueGainEPerAdu" type="number" inputmode="decimal" step="0.001" value="${fmtNumber(activeCalibrationReferenceState.systemGainEPerAdu, 3)}" readonly></div>
                <div class="field"><label>Read noise at selected gain (e-)</label><input id="empiricalReadNoiseE" type="number" inputmode="decimal" step="0.01" value="${fmtNumber(activeCalibrationReferenceState.readNoiseE, 2)}" readonly></div>
                <div class="field"><label>Looked-up dark current (e-/px/s)</label><input type="number" inputmode="decimal" step="0.0001" value="${fmtNumber(activeCalibrationReferenceState.darkCurrentEPerPxPerSec, 4)}" readonly></div>
                <div class="field"><label>Bit-depth scaling ${helpBadge(helpText.bitDepth)}</label>
                  <select id="bitDepthScalingMode">
                    <option value="native_1x" ${activeCalibration.bitDepthScalingMode === "native_1x" ? "selected" : ""}>Native / 1×</option>
                    <option value="bit14_to_16" ${activeCalibration.bitDepthScalingMode === "bit14_to_16" ? "selected" : ""}>14-bit to 16-bit / 4×</option>
                    <option value="bit12_to_16" ${activeCalibration.bitDepthScalingMode === "bit12_to_16" ? "selected" : ""}>12-bit to 16-bit / 16×</option>
                  </select>
                </div>
                <div class="field"><label>Dark current override (e-/px/s) ${helpBadge(helpText.darkCurrentOverride)}</label><input id="optionalDarkCurrentEPerPxPerSec" type="number" inputmode="decimal" min="0" max="1" step="0.0001" value="${Number.isFinite(activeCalibration.optionalDarkCurrentEPerPxPerSec) ? activeCalibration.optionalDarkCurrentEPerPxPerSec : ""}" placeholder="Use looked-up value"></div>
              </div>
            ` : `<div class="small-note">Empirical calibration fields appear here when Empirical Calibration Mode is active.</div>`}
            <div class="actions">
              <button type="button" class="primary" id="loadMonoExample">Load mono empirical example</button>
              <button type="button" class="ghost" id="loadOscExample">Load OSC empirical example</button>
              <button type="button" class="ghost" id="resetDefaults">Reset</button>
            </div>
            <div class="small-note" style="margin-top:8px">These buttons load sample empirical calibration values and keep the tool in Empirical Calibration Mode so you can inspect how the measured path works.</div>
          `)}
        `;
        attachSetupEvents();
      }
  
      function renderFilterTabs(results) {
        if (results.length <= 1) return "";
        return `
          <div class="tabs">
            ${results.map((result) => `
              <button type="button" class="tab ${filterToneClass(result.input.filter)} ${result.filterId === appState.activeFilterId ? "active" : ""}" data-activate-filter="${result.filterId}">
                ${result.input.filter.name}
              </button>
            `).join("")}
          </div>
        `;
      }
  
      function renderMainTabs() {
        const tabs = [
          ["recommendation", "Recommendation"],
          ["faq", "FAQ"],
          ["appendix", "Technical Appendix"]
        ];
        if (appState.validationUnlocked) {
          tabs.push(["validation", "Validation"]);
        }
        return `
          <div class="main-tabs">
            ${tabs.map(([value, label]) => `
              <button type="button" class="tab ${appState.activeMainTab === value ? "active" : ""}" data-main-tab="${value}">${label}</button>
            `).join("")}
          </div>
        `;
      }
  
      function renderReleaseNotes() {
        return `
          <details class="release-notes-card">
            <summary>
              <div>
                <div class="release-notes-title">What’s New</div>
                <div class="release-notes-meta">${currentToolVersion()} · recent camera, filter, and workflow-model updates</div>
              </div>
              <div class="summary-meta">Show release notes</div>
            </summary>
              <div class="release-notes-body">
              <div class="release-notes-intro">Recent releases added new camera support, throughput clarification, cleaner sorting, and a first LP-aware sky-spectrum path so the tool is easier to scan and closer to how real systems are configured.</div>
              <div class="release-notes-grid">
                <div class="release-note-block">
                  <h4>New cameras</h4>
                  <ul>
                    <li>ZWO ASI071MC Pro</li>
                    <li>ZWO ASI2400MC Pro</li>
                    <li>QHY071C</li>
                    <li>ZWO ASI183MM Pro</li>
                    <li>ZWO ASI183MC Pro</li>
                    <li>ZWO ASI585MM Pro</li>
                    <li>ZWO ASI585MC Pro</li>
                    <li>ZWO ASI678MM and ASI678MC</li>
                    <li>ZWO ASI294MM Pro Bin 1 and Bin 2 readout modes</li>
                    <li>QHY183C</li>
                    <li>QHY247C, marked as weak QE-proxy support</li>
                    <li>QHY MiniCam8M and MiniCam8C</li>
                    <li>Player One Poseidon-M Pro and Poseidon-C Pro</li>
                    <li>Player One Artemis-C Pro</li>
                    <li>Player One Ares-M Pro and Ares-C Pro</li>
                    <li>Player One Uranus-M Pro and Uranus-C Pro</li>
                  </ul>
                </div>
                <div class="release-note-block">
                  <h4>New filter support</h4>
                  <ul>
                    <li>Mono LRGB — Antlia LRGB-V Pro</li>
                    <li>Mono SHO — Antlia 3nm Pro</li>
                    <li>Mono SHO — Antlia 4.5nm EDGE</li>
                    <li>Generic OSC Broadband with UV/IR Cut, plus explicit Clear / No UV-IR Cut broadband</li>
                    <li>OSC LP broadband — Optolong L-Pro</li>
                    <li>OSC LP broadband — Baader Moon & Skyglow Neodymium</li>
                    <li>OSC LP / hybrid broadband — SVBONY SV260 Multi-Bandpass, marked provisional</li>
                    <li>OSC LP / hybrid broadband — Antlia Triband RGB Ultra II, marked provisional</li>
                    <li>OSC narrowband — Antlia ALP-T 3nm/3.5nm and 5nm combos</li>
                    <li>OSC narrowband — Askar Super D1, D2, and D1 + D2 combo</li>
                    <li>OSC narrowband — SVBONY SV220 Ha/OIII, SII/OIII, and combo workflows</li>
                    <li>Chroma 3nm SHO curves updated from denser System Comparison control points</li>
                  </ul>
                </div>
                <div class="release-note-block">
                  <h4>Other recent improvements</h4>
                  <ul>
                    <li>Optics + Filter Throughput is now explained and can be overridden in Advanced mode</li>
                    <li>Filter-set dropdowns now group broadband before narrowband, then sort by maker and cut width</li>
                    <li>Hero plots now keep raw read-noise diagnostics out of the main regime bar so the displayed zones match the active recommendation boundary</li>
                    <li>Single-filter hero plots now use the same clear operating-band outline treatment as filter-set rows, with the outline contained inside the displayed green band</li>
                    <li>Hero plots restore the two-stage lower-side story: read-noise criterion first, then operational overhead/comfort floor before the green band</li>
                    <li>FAQ and Technical Appendix now explain why shot noise is part of the model but not a separate plotted recommendation zone</li>
                    <li>Sky + Field now separates sky brightness from representative sky spectrum for LP-style broadband filters</li>
                    <li>Sky + Field now includes a compact spectral profile plot so LP profile choices are visible rather than hidden in a dropdown</li>
                    <li>The compact spectral profile plot now samples narrow sodium and mercury line features densely enough to show multiple peaks.</li>
                    <li>LP sky previews now show effective modeled sky background with compressed Bortle-aware display scaling instead of normalized spectral shape alone.</li>
                    <li>Default camera temperature is now -15°C, and OSC Broadband stays first in the OSC filter-set dropdown.</li>
                    <li>Selected Filter Detail now includes a Spectral detail panel with separate sensor, filter, combined-response, and LP sky views.</li>
                    <li>FAQ and Technical Appendix now clarify why LP filters can improve final image quality more than they change the suggested sub length.</li>
                    <li>Bright-star saturation language now clarifies that saturation caution is not the first clipped star in a real target field</li>
                    <li>Camera changes now switch to that camera’s recommended gain preset, so HCG defaults like ASI2400MC Pro gain 140 are not silently compared at the previous camera’s gain</li>
                    <li>Gain preset buttons now use camera-specific labels such as Low gain and HCG/default instead of implying that Gain 0 and Gain 100 are universal choices</li>
                    <li>Broadband recommendations are now less over-conservative at low gain, especially for ASI2600MC-style OSC broadband workflows</li>
                    <li>ASI2600MC Pro gain-0 read noise now uses the same IMX571-class baseline as the ASI2600MM Pro; OSC signal efficiency remains modeled separately.</li>
                    <li>Main hero plots now keep colored regimes on the true time axis so the suggested-start marker lands in the same visual band described by the operating-band numbers.</li>
                    <li>The camera setup no longer shows a misleading single camera “Mode” field; HCG behavior is now explained beside gain instead.</li>
                    <li>Workflow controls are now context-sensitive for mono filter sets, single-filter mono capture, OSC broadband, and filtered OSC workflows.</li>
                    <li>Filtered OSC sets now display one combined recommendation for the physical filter instead of separate Ha/OIII/SII passband rows.</li>
                    <li>Mono filter workflow now names the common filter-offsets plus refocus-when-needed approach, and default overhead wiring is less aggressive for normal LRGB sequencing.</li>
                    <li>Filter-set overview rows now align their shared bottom time axis to the same plot rectangle used by the colored recommendation bars.</li>
                    <li>Camera provenance is now shown explicitly, separating official operating data from manufacturer-published or generic sensor-family QE curves.</li>
                    <li>The camera dropdown now gives long camera names more room, including the newer Player One models.</li>
                    <li>QHY268M, QHY268C, and QHY600M now use gain 56 as the explicit high-gain / HCG transition point.</li>
                    <li>FAQ and Technical Appendix updated to reflect the newer support model</li>
                  </ul>
                </div>
              </div>
            </div>
          </details>
        `;
      }
  
      function renderExposureZoneBar(result) {
        const tDisplay = displayThresholdsForResult(result);
        const maxDomainBase = Math.max(tDisplay.hardMaxSec * 1.08, tDisplay.sweetSpotMaxSec * 1.15, 120);
        const axis = buildAxisTicks(maxDomainBase);
        const maxDomain = axis.majorTicks[axis.majorTicks.length - 1];
        const pos = (value) => `${clamp((value / maxDomain) * 100, 0, 100)}%`;
        const lowerBoundOpStartGapSec = Math.abs(tDisplay.sweetSpotMinSec - tDisplay.lowerBoundSec);
        const showLowerBoundMarker = lowerBoundOpStartGapSec > Math.max(8, maxDomain * 0.015);
        const lowerBoundDriver = result.thresholds.practicalFloorSec > result.thresholds.overheadFloorSec
          ? "practical floor"
          : result.thresholds.overheadFloorSec > result.thresholds.moderatedReadNoiseFloorSec
            ? "overhead floor"
            : "read-noise criterion";
        const thresholdMarkersRaw = [
          { key: "overhead", label: "Overhead floor", longLabel: "Overhead floor threshold", value: result.thresholds.overheadFloorSec },
          { key: "comfort", label: "Op start", longLabel: "Operating-band start threshold", value: tDisplay.sweetSpotMinSec },
          ...(result.thresholds.skyPedestalCautionSec <= maxDomain * 1.02 ? [{
            key: "sky",
            label: "Sky pedestal",
            longLabel: "Sky-pedestal headroom threshold",
            value: result.thresholds.skyPedestalCautionSec
          }] : []),
          { key: "caution", label: "Bright-star saturation", longLabel: "Bright-star saturation threshold", value: result.thresholds.saturationCautionSec },
          { key: "hard", label: "Hard ceiling", longLabel: "Hard-ceiling threshold", value: tDisplay.hardMaxSec }
        ];
        const overheadComfortGapSec = Math.abs(tDisplay.sweetSpotMinSec - result.thresholds.overheadFloorSec);
        const thresholdMarkers = assignThresholdRows(
          overheadComfortGapSec <= Math.max(18, maxDomain * 0.025)
            ? thresholdMarkersRaw.filter((marker) => marker.key !== "overhead")
            : thresholdMarkersRaw,
          maxDomain
        );
        const displayZones = computeDisplayZoneWidths(buildDisplayRailZones(result), maxDomain, { applyMinWidth: false });
        const zoneInteriorLabelMinPct = {
          too_short: 999,
          lower_floor_gap: 999,
          lean_workable: 22,
          sweet_spot: 40,
          long_risky: 36,
          too_long: 999
        };
        const interiorZoneLabels = displayZones.map((entry) => ({
          ...entry,
          showInside: entry.pct >= (zoneInteriorLabelMinPct[entry.zone.name] ?? 20)
        }));
        const sweetEntry = interiorZoneLabels.find((entry) => entry.zone.name === "sweet_spot");
        const riskEntry = interiorZoneLabels.find((entry) => entry.zone.name === "long_risky");
        if (sweetEntry && riskEntry && sweetEntry.showInside && riskEntry.showInside) {
          const combinedPct = sweetEntry.pct + riskEntry.pct;
          if (combinedPct < 84) {
            if (sweetEntry.pct <= riskEntry.pct) {
              sweetEntry.showInside = false;
            } else {
              riskEntry.showInside = false;
            }
          }
        }
        const lowerDriverLabel = result.synthesis.lowerBoundDrivers.slice(0, 2).map((driver) => driverLabelForDisplay(result, driver.label)).join(" + ");
        const upperDriverLabel = result.synthesis.upperBoundDrivers.slice(0, 2).map((driver) => driverLabelForDisplay(result, driver.label)).join(" + ");
        const anchorNearThreshold = thresholdMarkers.some((marker) => Math.abs(marker.value - result.headlineRecommendation.anchorSec) <= Math.max(50, maxDomain * 0.06));
        const sweetDisplayEntry = interiorZoneLabels.find((entry) => entry.zone.name === "sweet_spot");
        const sweetBandLeft = sweetDisplayEntry ? `calc(${sweetDisplayEntry.displayStartPct}% + 4px)` : pos(tDisplay.sweetSpotMinSec);
        const sweetBandWidth = sweetDisplayEntry ? `calc(${Math.max(sweetDisplayEntry.displayPct, 1.2)}% - 8px)` : `${clamp(((tDisplay.sweetSpotMaxSec - tDisplay.sweetSpotMinSec) / maxDomain) * 100, 1.2, 100)}%`;
        return `
          <div class="zone-panel card">
            <div class="zone-meta">
              <div>
                <div class="zone-title-row">
                  <div class="zone-title">${result.input.filter.name}</div>
                  ${renderHeroPlotHelpPopover()}
                </div>
                <div class="zone-sub">${result.headlineRecommendation.summary}</div>
                <div class="zone-context">Filter set: <strong>${resolveFilterSet(appState.filterSetId, getCamera(appState.cameraId))?.label || "—"}</strong> · Mode: <strong>${result.input.calibration.exposureMode === "empirical" ? "Empirical calibration" : "Planning"}</strong> · RN target: <strong>${contributionTargetLabel(result.thresholds.readNoiseContributionTargetPct)}</strong> · Sky source: <strong>${skyHeadroomSourceLabel(result)}</strong></div>
              </div>
              <div class="zone-scale">Display scale: 0 to ${fmtSeconds(maxDomain)}</div>
            </div>
            <div class="chart-telemetry">
              <div class="chart-chip focus"><strong>Suggested start</strong><span>${fmtSeconds(result.headlineRecommendation.anchorSec)}</span></div>
              <div class="chart-chip"><strong>Operating band</strong><span>${fmtRange(tDisplay.sweetSpotMinSec, tDisplay.sweetSpotMaxSec)}</span></div>
              <div class="chart-chip"><strong>Lower driver</strong><span>${lowerDriverLabel}</span></div>
              <div class="chart-chip"><strong>Upper driver</strong><span>${upperDriverLabel}</span></div>
            </div>
            <div class="lower-floor-readout">
              <span class="lower-floor-key"><span class="lower-floor-swatch practical"></span><span>Lighter gray zone = <strong>operational overhead floor</strong></span></span>
              <span class="lower-floor-key"><span class="lower-floor-swatch practical"></span><span>Read-noise criterion clears at <strong>${fmtSeconds(result.thresholds.lowerBoundSec)}</strong>; green begins at <strong>${fmtSeconds(result.thresholds.sweetSpotMinSec)}</strong></span></span>
              <span class="lower-floor-key"><span class="lower-floor-swatch risk"></span><span>Sky-pedestal caution <strong>${fmtSeconds(result.thresholds.skyPedestalCautionSec)}</strong></span></span>
            </div>
            <div class="instrument">
              <div class="instrument-top">
                ${thresholdMarkers.map((marker) => `
                  <div class="threshold ${marker.key} ${marker.rowClass} ${getThresholdPlacementClass(marker.value, maxDomain)}" style="left:${pos(marker.value)}">
                    <div class="threshold-label" title="${marker.longLabel}">${marker.label} ${fmtSeconds(marker.value)}</div>
                    <div class="threshold-line"></div>
                  </div>
                `).join("")}
              </div>
              <div class="instrument-middle">
                <div class="anchor-value-pill ${anchorNearThreshold ? "raised" : ""}" style="left:${pos(result.headlineRecommendation.anchorSec)}">${fmtSeconds(result.headlineRecommendation.anchorSec)}</div>
                ${showLowerBoundMarker ? `<div class="floor-marker practical" style="left:${pos(tDisplay.lowerBoundSec)}">
                  <div class="floor-marker-label">Lower bound</div>
                  <div class="floor-marker-line"></div>
                </div>` : ""}
                <div class="zone-bar">
                  ${interiorZoneLabels.map(({ zone, showInside, displayPct }) => {
                    const names = zoneNames(zone.name);
                    return `<div class="zone ${zoneClass(zone.name)}" style="width:${displayPct}%" title="${names.full}: ${zone.reason}"><span class="${showInside ? "" : "zone-label-hidden"}">${names.short}</span></div>`;
                  }).join("")}
                  <div class="sweet-band" style="left:${sweetBandLeft}; width:${sweetBandWidth}"></div>
                </div>
                
                <div class="anchor-marker" style="left:${pos(result.headlineRecommendation.anchorSec)}"></div>
              </div>
              <div class="instrument-bottom">
                <div class="axis-line"></div>
                ${axis.minorTicks.map((tick) => `<div class="minor-tick" style="left:${pos(tick)}"></div>`).join("")}
                ${axis.majorTicks.map((tick) => `
                  <div class="axis-tick" style="left:${pos(tick)}"></div>
                  <div class="axis-label" style="left:${pos(tick)}">${tick}s</div>
                `).join("")}
              </div>
            </div>
            <div class="hero-legend" aria-label="Exposure regime legend">
              <span class="hero-legend-item"><span class="hero-legend-swatch short"></span><span>Calculated Read Noise Domain</span></span>
              <span class="hero-legend-item"><span class="hero-legend-swatch floorgap"></span><span>Operational Overhead Floor</span></span>
              <span class="hero-legend-item"><span class="hero-legend-swatch sweet"></span><span>Practical Operating Band</span></span>
              <span class="hero-legend-item"><span class="hero-legend-swatch risk"></span><span>Saturation / Workflow Risk</span></span>
              <span class="hero-legend-item"><span class="hero-legend-swatch long"></span><span>Hard Ceiling</span></span>
            </div>
          </div>
        `;
      }
  
      function formatPlanLine(result, seconds) {
        return `${result.input.filter.name}: ${fmtSeconds(seconds)}, band ${fmtRange(result.thresholds.sweetSpotMinSec, result.thresholds.sweetSpotMaxSec)}`;
      }
  
      function buildSingleCompromisePlan(results) {
        const overlapStart = Math.max(...results.map((result) => result.thresholds.sweetSpotMinSec));
        const overlapEnd = Math.min(...results.map((result) => result.thresholds.sweetSpotMaxSec));
        if (overlapStart <= overlapEnd) {
          return {
            value: roundExposure((overlapStart + overlapEnd) / 2),
            feasible: true,
            note: `Shared overlap ${fmtRange(overlapStart, overlapEnd)}`
          };
        }
        const anchors = results.map((result) => result.headlineRecommendation.anchorSec).sort((a, b) => a - b);
        const mid = anchors[Math.floor(anchors.length / 2)];
        return {
          value: roundExposure(mid),
          feasible: false,
          note: "No full overlap; median compromise"
        };
      }
  
      function buildPlanAdvisory(results) {
        if (!Array.isArray(results) || results.length < 2) return "";
        const workflow = deriveWorkflowSettings(appState);
        if (!workflow.hasFilterSequencing) return workflow.advisory || "";
        const overlapStart = Math.max(...results.map((result) => result.thresholds.sweetSpotMinSec));
        const overlapEnd = Math.min(...results.map((result) => result.thresholds.sweetSpotMaxSec));
        const anchors = results.map((result) => result.headlineRecommendation.anchorSec);
        const anchorSpread = Math.max(...anchors) - Math.min(...anchors);
        if (workflow.captureSequencing === "filter_cycling" && workflow.focusHandling === "refocus_every_change") {
          return "Cycling keeps filter coverage balanced, but full refocus on each filter change makes switching overhead more noticeable.";
        }
        if (workflow.favorsSharedExposure === "Shared exposure can be practical" && anchorSpread <= 120) {
          return "The filter spread is small, and this workflow keeps a shared exposure reasonably practical if you want to simplify.";
        }
        if (workflow.favorsSharedExposure === "Per-filter starts can stay distinct" && anchorSpread > 60) {
          return "The current block-style workflow slightly favors keeping the starts distinct, but this is a convenience preference rather than a hard constraint.";
        }
        if (anchorSpread <= 60) {
          return "Per-filter spread is small; a shared exposure may be practical.";
        }
        if (overlapStart <= overlapEnd && (overlapEnd - overlapStart) >= 90) {
          return `Selected filters share an overlap of ${fmtRange(overlapStart, overlapEnd)}, so a shared exposure may be feasible.`;
        }
        return "";
      }
  
      function contextSummaryLine(results) {
        const family = workflowFamilyForState(appState);
        const starts = results.map((result) => `${planFamilyCode(result)} ${fmtSeconds(result.headlineRecommendation.anchorSec)}`).join(" · ");
        const first = results[0];
        if (family === "osc_broadband") {
          return `Suggested OSC start: ${fmtSeconds(first.headlineRecommendation.anchorSec)}. No filter cycling is required; main workflow costs are dithering, settling, focus events, and rejected-frame risk.`;
        }
        if (family === "osc_filtered") {
          const componentNote = first.componentFilterIds?.length > 1 ? " Internal passbands are checked together for one physical filter." : "";
          return `Suggested filtered OSC start: ${fmtSeconds(first.headlineRecommendation.anchorSec)}. Reduced sky background may support longer subs, but headroom and rejected-frame cost still set practical limits.${componentNote}`;
        }
        if (family === "mono_single_filter") {
          return `Suggested start: ${fmtSeconds(first.headlineRecommendation.anchorSec)}. No filter sequencing is needed; main workflow costs are dithering, settling, focus events, and rejected-frame risk.`;
        }
        return `Suggested starts by filter: ${starts}.`;
      }
  
      function buildPlanExportText(results) {
        const camera = getCamera(appState.cameraId);
        const filterSet = resolveFilterSet(appState.filterSetId, camera);
        const weights = normalizedPlanWeights(results);
        const planName = effectivePlanName(results);
        const setOperatingSpan = fmtRange(
          Math.min(...results.map((result) => result.thresholds.sweetSpotMinSec)),
          Math.max(...results.map((result) => result.thresholds.sweetSpotMaxSec))
        );
        const advisory = buildPlanAdvisory(results);
        const workflow = deriveWorkflowSettings(appState);
        return [
          `${planName} — ${filterSet?.label || "Custom set"}`,
          `Camera: ${camera.manufacturer} ${camera.name}`,
          `Mode: ${appState.exposureMode === "empirical" ? "Empirical calibration" : "Planning"} · RN target: ${appState.readNoiseContributionTargetPct}%`,
          `Weighting: ${weightLabelForPreset(appState.planWeightPreset)} · ${results.map((result) => `${planFamilyCode(result)}×${weights[result.filterId]}`).join(" · ")}`,
          `Workflow: ${workflowFamilyMeta(workflow.workflowFamily).sectionTitle} · ${ditherFrequencyLabel(workflow.ditherFrequency)} · ${overheadAssumptionLabel(appState)} overhead · ${focusHandlingLabel(workflow.focusHandling, workflow.hasFilterSequencing)}`,
          "",
          contextSummaryLine(results),
          `Set operating range: ${setOperatingSpan}`,
          advisory,
          advisory ? "" : null,
          ...results.map((result) => `- ${formatPlanLine(result, result.headlineRecommendation.anchorSec)}`),
          `Saved on: ${new Date().toLocaleString()}`
        ].filter(Boolean).join("\n");
      }
  
      function buildPlanExportPayload(results) {
        const camera = getCamera(appState.cameraId);
        const filterSet = resolveFilterSet(appState.filterSetId, camera);
        const weights = normalizedPlanWeights(results);
        const planName = effectivePlanName(results);
        const savedAt = new Date().toISOString();
        const serializedConfiguration = serializeConfiguration();
        const operatingRange = {
          startSec: Math.min(...results.map((result) => result.thresholds.sweetSpotMinSec)),
          endSec: Math.max(...results.map((result) => result.thresholds.sweetSpotMaxSec))
        };
        return {
          schema: CONFIG_SCHEMA,
          schemaVersion: CONFIG_VERSION,
          tool: "Astro Exposure Explorer",
          version: currentToolVersion(),
          exportType: "filter-set-plan",
          savedAt,
          planName,
          configuration: serializedConfiguration.configuration,
          filterSet: {
            id: filterSet?.id || appState.filterSetId || "custom",
            label: filterSet?.label || "Custom set"
          },
          camera: {
            id: camera.cameraId,
            manufacturer: camera.manufacturer,
            name: camera.name
          },
          mode: appState.exposureMode === "empirical" ? "Empirical calibration" : "Planning",
          readNoiseContributionTargetPct: appState.readNoiseContributionTargetPct,
          weighting: {
            preset: appState.planWeightPreset,
            label: weightLabelForPreset(appState.planWeightPreset),
            perFilter: results.map((result) => ({
              filterId: result.filterId,
              filter: result.input.filter.name,
              familyCode: planFamilyCode(result),
              weight: weights[result.filterId]
            }))
          },
          workflow: {
            family: workflow.workflowFamily,
            familyLabel: workflowFamilyMeta(workflow.workflowFamily).sectionTitle,
            captureSequencing: appState.captureSequencing,
            captureSequencingLabel: captureSequencingLabel(appState.captureSequencing),
            focusHandling: appState.focusHandling,
            focusHandlingLabel: focusHandlingLabel(appState.focusHandling, workflow.hasFilterSequencing),
            ditherFrequency: workflow.ditherFrequency,
            ditherFrequencyLabel: ditherFrequencyLabel(workflow.ditherFrequency),
            overheadAssumptionPreset: appState.overheadAssumptionPreset,
            overheadAssumptionLabel: overheadAssumptionLabel(appState),
            perEventOverheadSec: workflow.perEventOverheadSec
          },
          operatingRange,
          advisory: buildPlanAdvisory(results) || "",
          summaryText: buildPlanExportText(results),
          filters: results.map((result) => ({
            filterId: result.filterId,
            filter: result.input.filter.name,
            suggestedStartSec: result.headlineRecommendation.anchorSec,
            operatingBandStartSec: result.thresholds.sweetSpotMinSec,
            operatingBandEndSec: result.thresholds.sweetSpotMaxSec,
            hardCeilingSec: result.thresholds.hardMaxSec,
            lowerDriver: result.synthesis.lowerBoundDrivers[0]?.label || "",
            upperDriver: result.synthesis.upperBoundDrivers[0]?.label || ""
          }))
        };
      }
  
      function buildHeroExportFileName(results) {
        const camera = getCamera(appState.cameraId);
        const filterSet = resolveFilterSet(appState.filterSetId, camera);
        const baseLabel = filterSet?.label
          || (results.length === 1 ? results[0].input.filter.name : effectivePlanName(results))
          || "exposure-recommendations";
        const safeBase = String(baseLabel)
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/^-+|-+$/g, "")
          .toLowerCase();
        return `${safeBase || "exposure-recommendations"}-exposure-recommendations.png`;
      }
  
      function renderPlanControls(results, { showWeightPreset = true } = {}) {
        const activePreset = sanitizePlanWeightPreset(results);
        const weightOptions = availablePlanWeightPresets(results);
        return `
          <div class="plan-actions">
            ${showWeightPreset ? `
              <select id="planWeightPreset">
                ${weightOptions.map((option) => `<option value="${option.value}" ${activePreset === option.value ? "selected" : ""}>${option.label}</option>`).join("")}
              </select>
            ` : ""}
            <button type="button" class="ghost" id="copyPlanSummary">Copy Summary</button>
            <button type="button" class="ghost" id="exportPlanSummary">Export Summary (TXT)</button>
            <button type="button" class="ghost" id="exportPlanJson">Export Summary (JSON)</button>
            <button type="button" class="ghost" id="copyHeroGraphic">Copy Hero Graphic</button>
            <button type="button" class="ghost" id="exportHeroGraphic">Export Hero Graphic (PNG)</button>
          </div>
        `;
      }
  
      function renderPlanStatus(results, fallbackText = "") {
        const activePreset = sanitizePlanWeightPreset(results);
        const weights = normalizedPlanWeights(results);
        const weightSummary = results
          .filter((result) => weights[result.filterId] > 0)
          .map((result) => `${planFamilyCode(result)}×${weights[result.filterId]}`)
          .join(" · ");
        const advisory = buildPlanAdvisory(results);
        return appState.planStatus ? appState.planStatus : (fallbackText || `${weightLabelForPreset(activePreset)} · ${weightSummary || "No active weighted filters"}${advisory ? ` · ${advisory}` : ""}`);
      }
  
      function renderSetPlan(results) {
        const workflowMeta = workflowFamilyMeta(workflowFamilyForState(appState));
        const activePreset = sanitizePlanWeightPreset(results);
        const maxDomainBase = Math.max(...results.map((result) => result.thresholds.hardMaxSec * 1.08), 120);
        const axis = buildAxisTicks(maxDomainBase);
        const maxDomain = axis.majorTicks[axis.majorTicks.length - 1];
        const pos = (value) => clamp((value / maxDomain) * 100, 0, 100);
        const weights = normalizedPlanWeights(results);
        const weightSummary = results
          .filter((result) => weights[result.filterId] > 0)
          .map((result) => `${planFamilyCode(result)}×${weights[result.filterId]}`)
          .join(" · ");
        const setOperatingSpan = fmtRange(
          Math.min(...results.map((result) => result.thresholds.sweetSpotMinSec)),
          Math.max(...results.map((result) => result.thresholds.sweetSpotMaxSec))
        );
        const advisory = buildPlanAdvisory(results);
        return `
          <section class="card section section-quiet">
            <div class="section-label section-label-major">${workflowMeta.planHeading}</div>
            <div class="plan-shell">
              <div class="plan-toolbar">
                ${renderPlanControls(results, { showWeightPreset: true })}
                <div class="plan-status">${renderPlanStatus(results, `${weightLabelForPreset(activePreset)} · ${weightSummary || "No active weighted filters"}${advisory ? ` · ${advisory}` : ""}`)}</div>
              </div>
              <div class="set-overview">
                <div class="set-overview-head">
                  <div>
                    <div class="set-overview-title-row">
                      <div class="set-overview-title">Exposure Recommendations</div>
                      ${renderHeroPlotHelpPopover()}
                    </div>
                    <div class="set-overview-sub">Compare suggested starts, operating bands, and hard ceilings across the active set on one time axis.</div>
                  </div>
                  <div class="set-overview-scale">Shared scale: 0 to ${fmtSeconds(maxDomain)}</div>
                </div>
                <div class="set-legend" aria-label="Shared overview regime legend">
                  <span class="hero-legend-item"><span class="hero-legend-swatch short"></span><span>Read Noise Regime</span></span>
                  <span class="hero-legend-item"><span class="hero-legend-swatch floorgap"></span><span>Operational Overhead Floor</span></span>
                  <span class="hero-legend-item"><span class="hero-legend-swatch sweet"></span><span>Practical Operating Band</span></span>
                  <span class="hero-legend-item"><span class="hero-legend-swatch risk"></span><span>Saturation / Workflow Risk</span></span>
                  <span class="hero-legend-item"><span class="hero-legend-swatch long"></span><span>Hard Ceiling</span></span>
                </div>
                <div class="set-rows">
                  ${results.map((result) => {
                    const zones = computeDisplayZoneWidths(buildDisplayRailZones(result), maxDomain, { applyMinWidth: false });
                    const thresholdMarkers = assignThresholdRows([
                      { key: "overhead", label: "Overhead", value: result.thresholds.overheadFloorSec },
                      { key: "comfort", label: "Op start", value: result.thresholds.sweetSpotMinSec },
                      ...(result.thresholds.skyPedestalCautionSec <= maxDomain * 1.02 ? [{ key: "sky", label: "Sky", value: result.thresholds.skyPedestalCautionSec }] : []),
                      { key: "caution", label: "Sat", value: result.thresholds.saturationCautionSec },
                      { key: "hard", label: "Ceiling", value: result.thresholds.hardMaxSec }
                    ], maxDomain);
                    const labeledZones = (() => {
                      const sweetEntry = zones.find((entry) => entry.zone.name === "sweet_spot");
                      const riskEntry = zones.find((entry) => entry.zone.name === "long_risky");
                      let showSweet = !!sweetEntry && sweetEntry.pct >= 18;
                      let showRisk = !!riskEntry && riskEntry.pct >= 14;
                      if (showSweet && showRisk) {
                        const combinedPct = sweetEntry.pct + riskEntry.pct;
                        if (combinedPct < 62 || sweetEntry.pct < 24 || riskEntry.pct < 22) {
                          if (riskEntry.pct >= sweetEntry.pct) showSweet = false;
                          else showRisk = false;
                        }
                      }
                      if (!showSweet && !showRisk) {
                        if (riskEntry && riskEntry.pct >= 10) showRisk = true;
                        else if (sweetEntry && sweetEntry.pct >= 10) showSweet = true;
                        else if (riskEntry && riskEntry.displayPct >= 12) showRisk = true;
                        else if (sweetEntry && sweetEntry.displayPct >= 12) showSweet = true;
                      }
                      const rendered = zones.map((entry) => {
                        const names = zoneNames(entry.zone.name);
                        let show = false;
                        if (entry.zone.name === "sweet_spot") show = showSweet;
                        else if (entry.zone.name === "long_risky") show = showRisk;
                        return { entry, show, label: names.short };
                      });
                      const hiddenNotes = rendered
                        .filter(({ entry, show }) => {
                          if (show) return false;
                          if (["sweet_spot", "long_risky"].includes(entry.zone.name)) return entry.displayPct >= 5;
                          if (["too_long", "lower_floor_gap"].includes(entry.zone.name)) return entry.displayPct > 0 && entry.displayPct < 13;
                          return entry.pct >= 8 || (entry.displayPct > 0 && entry.displayPct < 13);
                        })
                        .map(({ entry, label }) => ({ key: entry.zone.name, label }));
                      return { rendered, hiddenNotes };
                    })();
                    return `
                      <button type="button" class="set-row ${result.filterId === appState.activeFilterId ? "active" : ""}" data-activate-filter="${result.filterId}">
                        <div class="set-row-main">
                          <div class="set-row-name">${result.input.filter.name}</div>
                          <div class="field-note" style="margin-top:2px"><strong>Lower-bound source:</strong> ${result.lowerBoundAudit.sourceLabel}</div>
                          <div class="set-row-driver">${result.lowerBoundAudit.short} · Sky source: ${skyHeadroomSourceLabel(result)} · ${result.synthesis.upperBoundDrivers[0]?.label || "Upper bound"} · Weight ${weights[result.filterId]}×</div>
                          ${result.lowerBoundAudit.warning ? `
                            <div class="set-row-audit" title="${escapeHtml(result.lowerBoundAudit.warning)}">
                              <span class="set-row-audit-chip">
                                <span class="dot"></span>
                                <span>${escapeHtml(result.lowerBoundAudit.warningChip || "Calibration audit note")}</span>
                              </span>
                            </div>
                          ` : ""}
                        </div>
                        <div>
                          <div class="set-thresholds">
                            ${thresholdMarkers.map((marker) => `
                              <div class="set-threshold ${marker.key}" style="left:${pos(marker.value)}%">
                                <div class="set-threshold-label">${marker.label}</div>
                                <div class="set-threshold-line"></div>
                              </div>
                            `).join("")}
                          </div>
                          <div class="set-track">
                            ${labeledZones.rendered.map(({ entry, show, label }) => `<div class="set-zone ${zoneClass(entry.zone.name)}" style="left:${entry.displayStartPct}%; width:${entry.displayPct}%">${show ? label : ""}</div>`).join("")}
                          <div class="set-sweet" style="left:${pos(result.thresholds.sweetSpotMinSec)}%; width:${clamp(((result.thresholds.sweetSpotMaxSec - result.thresholds.sweetSpotMinSec) / maxDomain) * 100, 1.2, 100)}%"></div>
                          <div class="set-marker" style="left:${pos(result.headlineRecommendation.anchorSec)}%"></div>
                          </div>
                          ${labeledZones.hiddenNotes.length ? `<div class="set-zone-notes">${labeledZones.hiddenNotes.map((item) => `<span class="set-zone-note ${zoneClass(item.key)}"><span class="dot"></span><span>${item.label}</span></span>`).join("")}</div>` : ""}
                        </div>
                        <div class="set-row-meta">
                          <div class="v">${fmtSeconds(result.headlineRecommendation.anchorSec)}</div>
                          <div class="k">${fmtRange(result.thresholds.sweetSpotMinSec, result.thresholds.sweetSpotMaxSec)}</div>
                        </div>
                      </button>
                    `;
                  }).join("")}
                </div>
                <div class="set-axis">
                  ${axis.minorTicks.map((tick) => `<div class="set-axis-minor" style="left:${pos(tick)}%"></div>`).join("")}
                  ${axis.majorTicks.map((tick) => `<div class="set-axis-tick" style="left:${pos(tick)}%"></div><div class="set-axis-label" style="left:${pos(tick)}%">${tick}s</div>`).join("")}
                </div>
              </div>
            </div>
          </section>
        `;
      }
  
      function renderFilterDifferenceCard(result, allResults) {
        if (!Array.isArray(allResults) || allResults.length <= 1) return "";
        const peers = allResults.filter((entry) => entry.filterId !== result.filterId);
        if (!peers.length) return "";
        const luminancePeer = peers.find((entry) => planFamilyCode(entry) === "L");
        const rgbPeer = peers.find((entry) => ["R", "G", "B"].includes(planFamilyCode(entry)));
        let reference = null;
        const code = planFamilyCode(result);
        if (code === "L") {
          reference = rgbPeer || peers[0];
        } else if (["R", "G", "B"].includes(code)) {
          reference = luminancePeer || peers[0];
        } else if (code === "Ha") {
          reference = peers.find((entry) => ["OIII", "SII"].includes(planFamilyCode(entry))) || peers[0];
        } else if (code === "OIII") {
          reference = peers.find((entry) => ["Ha", "SII"].includes(planFamilyCode(entry))) || peers[0];
        } else if (code === "SII") {
          reference = peers.find((entry) => ["Ha", "OIII"].includes(planFamilyCode(entry))) || peers[0];
        } else {
          reference = peers[0];
        }
        if (!reference) return "";
  
        const anchorDelta = result.headlineRecommendation.anchorSec - reference.headlineRecommendation.anchorSec;
        const lowerDelta = result.thresholds.lowerBoundSec - reference.thresholds.lowerBoundSec;
        const upperDelta = result.thresholds.sweetSpotMaxSec - reference.thresholds.sweetSpotMaxSec;
        const skyRatio = result.derived.skyRateEPerPxPerSec / Math.max(0.0001, reference.derived.skyRateEPerPxPerSec);
        const skyPedestalRatio = result.thresholds.skyPedestalCautionSec / Math.max(0.0001, reference.thresholds.skyPedestalCautionSec);
        const starRatio = result.sourceScenario.representativeStarCoreRateEPerSec / Math.max(0.0001, reference.sourceScenario.representativeStarCoreRateEPerSec);
        const startLead = Math.abs(anchorDelta) < 10
          ? `Suggested start is about the same as ${reference.input.filter.name}: ${fmtSeconds(result.headlineRecommendation.anchorSec)} vs ${fmtSeconds(reference.headlineRecommendation.anchorSec)}.`
          : anchorDelta > 0
            ? `Suggested start lands later than ${reference.input.filter.name}: ${fmtSeconds(result.headlineRecommendation.anchorSec)} vs ${fmtSeconds(reference.headlineRecommendation.anchorSec)}.`
            : `Suggested start lands earlier than ${reference.input.filter.name}: ${fmtSeconds(result.headlineRecommendation.anchorSec)} vs ${fmtSeconds(reference.headlineRecommendation.anchorSec)}.`;
  
        const backgroundLead = skyRatio < 0.9
          ? `Its background builds more slowly: ${fmtNumber(result.derived.skyRateEPerPxPerSec, 3)} vs ${fmtNumber(reference.derived.skyRateEPerPxPerSec, 3)} e-/px/s (${fmtNumber(skyRatio, 2)}×). That usually pushes the lower side later.`
          : skyRatio > 1.1
            ? `Its background builds faster: ${fmtNumber(result.derived.skyRateEPerPxPerSec, 3)} vs ${fmtNumber(reference.derived.skyRateEPerPxPerSec, 3)} e-/px/s (${fmtNumber(skyRatio, 2)}×). That usually clears the lower side sooner.`
            : `Its background rate is similar: ${fmtNumber(result.derived.skyRateEPerPxPerSec, 3)} vs ${fmtNumber(reference.derived.skyRateEPerPxPerSec, 3)} e-/px/s, so the lower-side difference is not mainly coming from sky rate alone.`;
  
        const lowerLead = Math.abs(lowerDelta) < 10
          ? `The lower floor clears at about the same point: ${fmtSeconds(result.thresholds.lowerBoundSec)} vs ${fmtSeconds(reference.thresholds.lowerBoundSec)}.`
          : lowerDelta > 0
            ? `The lower floor clears later: ${fmtSeconds(result.thresholds.lowerBoundSec)} vs ${fmtSeconds(reference.thresholds.lowerBoundSec)}.`
            : `The lower floor clears sooner: ${fmtSeconds(result.thresholds.lowerBoundSec)} vs ${fmtSeconds(reference.thresholds.lowerBoundSec)}.`;
  
        const upperLead = skyPedestalRatio < 0.9
          ? `Background headroom closes earlier: ${fmtSeconds(result.thresholds.skyPedestalCautionSec)} vs ${fmtSeconds(reference.thresholds.skyPedestalCautionSec)} (${fmtNumber(skyPedestalRatio, 2)}×). In practice, the sky pedestal is eating usable headroom sooner.`
          : starRatio > 1.1
            ? `Bright-structure pressure is higher: ${fmtNumber(result.sourceScenario.representativeStarCoreRateEPerSec, 1)} vs ${fmtNumber(reference.sourceScenario.representativeStarCoreRateEPerSec, 1)} e-/s (${fmtNumber(starRatio, 2)}×). That pushes the upper side shorter.`
            : starRatio < 0.9
              ? `Bright-structure pressure is lower: ${fmtNumber(result.sourceScenario.representativeStarCoreRateEPerSec, 1)} vs ${fmtNumber(reference.sourceScenario.representativeStarCoreRateEPerSec, 1)} e-/s (${fmtNumber(starRatio, 2)}×). That leaves more room on the upper side.`
              : `Bright-structure pressure is similar: ${fmtNumber(result.sourceScenario.representativeStarCoreRateEPerSec, 1)} vs ${fmtNumber(reference.sourceScenario.representativeStarCoreRateEPerSec, 1)} e-/s, so the upper-side difference is being driven by something subtler.`;
  
        const bandLead = Math.abs(upperDelta) < 10
          ? `The usable upper edge ends at about the same point: ${fmtSeconds(result.thresholds.sweetSpotMaxSec)} vs ${fmtSeconds(reference.thresholds.sweetSpotMaxSec)}.`
          : upperDelta > 0
            ? `The usable upper edge closes later: ${fmtSeconds(result.thresholds.sweetSpotMaxSec)} vs ${fmtSeconds(reference.thresholds.sweetSpotMaxSec)}.`
            : `The usable upper edge closes earlier: ${fmtSeconds(result.thresholds.sweetSpotMaxSec)} vs ${fmtSeconds(reference.thresholds.sweetSpotMaxSec)}.`;
  
        return `
          <div class="mini-card">
            <h3>Why This Filter Differs</h3>
            <div class="comparison-list">
              <div class="lead"><strong>Reference filter:</strong> ${reference.input.filter.name}</div>
              <ul class="comparison-bullets">
                <li>${startLead}</li>
                <li>${backgroundLead}</li>
                <li>${lowerLead}</li>
                <li>${upperLead}</li>
                <li>${bandLead}</li>
              </ul>
            </div>
          </div>
        `;
      }
  
      function renderSelectedFilterDetail(result) {
        const titleToneClass = filterToneClass(result.input.filter);
        const allResults = computeAllResults();
        return `
          <section class="card section section-quiet">
            <div class="detail-shell">
              <div class="detail-head">
                <div>
                  <div class="section-label section-label-major">Selected Filter Detail</div>
                  <div class="detail-title ${titleToneClass}">${result.input.filter.name}</div>
                  <div class="detail-sub">Only one filter’s technical detail is shown at a time. Click a row in the set overview or a tab to switch filters.</div>
                  ${renderOscBroadbandFilterNotice(result.input.filter)}
                </div>
                ${renderFilterTabs(allResults)}
              </div>
              <section class="interpret-strip" style="margin-bottom:12px">
                <div class="interpret-item">
                  <div class="k">Why not shorter</div>
                  <div class="v">${explainLowerDriverForUser(result)}</div>
                </div>
                <div class="interpret-item">
                  <div class="k">Why not longer</div>
                  <div class="v">${explainUpperDriverForUser(result)}</div>
                </div>
                <div class="interpret-item">
                  <div class="k">How sky matters</div>
                  <div class="v">${describeSkySourceForUser(result)}</div>
                </div>
              </section>
              <section class="thresholds-section">
                ${renderThresholdCards(result)}
                <div class="compact-note">${buildNetEffectSummary(result)}</div>
              </section>
              ${allResults.length > 1 ? `
                <details class="collapsible-secondary" style="margin-top:12px">
                  <summary><span>Compare with nearby filter</span><span class="summary-meta">Show why this filter lands differently from the others</span></summary>
                  <div class="collapsible-secondary-body">
                    ${renderFilterDifferenceCard(result, allResults)}
                  </div>
                </details>
              ` : ""}
              <details class="collapsible-secondary drivers-section" style="margin-top:12px">
                <summary><span>Driver detail</span><span class="summary-meta">Show the deeper lower-side and upper-side mechanics</span></summary>
                <div class="collapsible-secondary-body">
                  ${renderDriverCards(result)}
                </div>
              </details>
              <details class="collapsible-secondary" style="margin-top:12px">
                <summary><span>Spectral detail</span><span class="summary-meta">Show sensor, filter, combined response, and LP sky views</span></summary>
                <div class="collapsible-secondary-body">
                  ${renderSpectralStoryPanel(result)}
                </div>
              </details>
              ${renderRegimeDefinitions(result)}
              <details class="collapsible-secondary">
                <summary><span>Assumptions + sky-rate breakdown</span><span class="summary-meta">Show supporting planning inputs</span></summary>
                <div class="collapsible-secondary-body">
                  <section class="cards-2">
                    ${renderAssumptionsPanel(result)}
                    <div class="mini-card">
                      <h3>Sky-rate breakdown</h3>
                      <div class="assumption-list">
                        <div class="assumption"><div class="k">Baseline</div><div class="v">${fmtNumber(result.sky.breakdown.baseline, 3)}</div></div>
                        <div class="assumption"><div class="k">f-ratio scale</div><div class="v">${fmtNumber(result.sky.breakdown.fScale, 2)}×</div></div>
                        <div class="assumption"><div class="k">Sky brightness scale</div><div class="v">${fmtNumber(result.sky.breakdown.skyScale, 2)}×</div></div>
                        <div class="assumption"><div class="k">Altitude scale</div><div class="v">${fmtNumber(result.sky.breakdown.altitudeScale, 2)}×</div></div>
                        <div class="assumption"><div class="k">Moon scale</div><div class="v">${fmtNumber(result.sky.breakdown.moonScale, 2)}×</div></div>
                        <div class="assumption"><div class="k">QE normalization</div><div class="v">${fmtNumber(result.sky.breakdown.qeNorm, 2)}×</div></div>
                      </div>
                    </div>
                  </section>
                </div>
              </details>
            </div>
          </section>
        `;
      }
  
      function renderRegimeDefinitions(result) {
        const t = result.thresholds;
        const sweetCapFraction = getSweetCapFraction(result.input.filter);
        const readFloor = t.moderatedReadNoiseFloorSec || t.readNoiseFloorSec;
        const overheadFloor = t.overheadFloorSec;
        const lowerBound = t.lowerBoundSec;
        const operatingStart = t.sweetSpotMinSec;
        const operatingEnd = t.sweetSpotMaxSec;
        const hardMax = t.hardMaxSec;
        const satCaution = t.saturationCautionSec;
        const workflowCap = t.workflowMaxSec;
        const definitions = [
          {
            key: "too_short",
            dominant: "sky/background signal has not yet cleared the current lower-floor threshold.",
            criterion: `t < max(${fmtSeconds(readFloor)} read-noise criterion at ${t.readNoiseContributionTargetPct}%, ${fmtSeconds(overheadFloor)} overhead floor)`,
            bound: `0 s-${fmtSeconds(lowerBound)}, ending at max(read-noise criterion ${fmtSeconds(readFloor)}, overhead floor ${fmtSeconds(overheadFloor)})`
          },
          {
            key: "lower_floor_gap",
            dominant: "the read-noise criterion has cleared, but operational overhead or comfort margin still argues against treating this as the preferred operating band.",
            criterion: `${fmtSeconds(lowerBound)} <= t < ${fmtSeconds(operatingStart)}`,
            bound: `${fmtSeconds(lowerBound)}-${fmtSeconds(operatingStart)}`
          },
          {
            key: "sweet_spot",
            dominant: "lower-floor constraints are cleared and the operating-band end has not yet been reached.",
            criterion: `${fmtSeconds(operatingStart)} <= t <= ${fmtSeconds(operatingEnd)}`,
            bound: `${fmtSeconds(operatingStart)}-${fmtSeconds(operatingEnd)}, where t_operating_end = min(${fmtNumber(sweetCapFraction, 2)} x sat caution ${fmtSeconds(satCaution)}, workflow cap ${fmtSeconds(workflowCap)})`
          },
          {
            key: "long_risky",
            dominant: "the operating band has been exceeded and saturation risk or workflow cost is now the controlling penalty.",
            criterion: `${fmtSeconds(operatingEnd)} < t < ${fmtSeconds(hardMax)}`,
            bound: `${fmtSeconds(operatingEnd)}-${fmtSeconds(hardMax)}`
          },
          {
            key: "too_long",
            dominant: "the model terminal cap has been reached; exposures beyond this point are outside the recommended range under the current assumptions.",
            criterion: `t >= ${fmtSeconds(hardMax)}`,
            bound: `>= ${fmtSeconds(hardMax)}, where t_hard_max = min(saturation hard ${fmtSeconds(t.saturationHardSec)}, 1.5 x workflow cap ${fmtSeconds(1.5 * workflowCap)})`
          }
        ];
        return `
          <details class="collapsible-secondary regime-definitions">
            <summary>
              <span>Regime Definitions</span>
              <span class="summary-meta">${t.lowerBoundSource === "measured" ? "Measured lower-bound path" : "Modeled lower-bound path"} · ${contributionTargetLabel(t.readNoiseContributionTargetPct)}</span>
            </summary>
            <div class="collapsible-secondary-body">
              <div class="definition-grid">
                ${definitions.map((item) => `
                  <div class="definition-card">
                    <h4>${zoneNames(item.key).full}</h4>
                    <div class="definition-list">
                      <div class="definition-line"><strong>Dominant condition:</strong> ${item.dominant}</div>
                      <div class="definition-line"><strong>Criterion:</strong> ${item.criterion}</div>
                      <div class="definition-line"><strong>Bound:</strong> ${item.bound}</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </details>
        `;
      }
  
      function renderFaq(result) {
        const t = result.thresholds;
        const oscSupported = Object.values(DATA.cameras || {}).some((camera) => Array.isArray(camera.compatibleFilterModes) && camera.compatibleFilterModes.includes("osc"));
        const faqSections = [
          {
            title: "Using the result",
            items: [
              {
                q: "Why does the tool show a range instead of one optimal sub-exposure?",
                a: "Because several constraints matter at once. The lower side is driven by read noise, overhead, and practical workflow limits. The upper side is driven by headroom and frame-loss cost. A range is more honest than one supposedly exact exposure."
              },
              {
                q: "How should I use the anchor recommendation?",
                a: "Treat it as a starting point inside the operating band. If your stars clip less than expected, your sky is darker, or you prefer fewer files, you may choose longer. If your field is harsher than the preset suggests, you may choose shorter."
              },
              {
                q: "What do the suggested starts by filter mean?",
                a: "They are the direct computed starting points for each active filter. In multi-filter work this is the main output, because it shows what the model actually computed instead of hiding real filter differences."
              },
              {
                q: "What does Set operating range mean?",
                a: "It is the full operating-band extent across the active filter set, from the earliest operating-band start to the latest operating-band end. It does not mean every selected filter shares that whole interval."
              },
              {
                q: "How should I choose one shared sub length when my filters are close but not identical?",
                a: "Start by checking whether the suggested starts cluster tightly and whether the filters still overlap in their operating bands. If they do, pick a value near the middle of that cluster and verify that none of the channels are being pushed hard into clipping or inefficiency."
              },
              {
                q: "When is it reasonable to standardize on one sub length across the set?",
                a: "It is usually reasonable when the per-filter starts are close enough that the convenience gain is larger than the modeling difference. If the spread is small and the operating bands overlap well, standardizing is often practical."
              },
              {
                q: "What does it mean if different filters have overlapping operating bands?",
                a: "It means the set has a shared interval where multiple filters remain workable at the same sub length. That does not force one common exposure, but it tells you a unified choice may be reasonable if operational simplicity matters."
              },
              {
                q: "What if my mount or guiding cannot reliably support the suggested start?",
                a: "Use a shorter sub that your system can actually hold consistently. Total usable integration time is worth more than chasing a suggested start you cannot execute reliably."
              },
              {
                q: "Does total integration time matter more than fine-tuning sub length?",
                a: "Usually yes, once you are in a sensible range. Small differences in sub length matter less than collecting more clean, usable integration with good stars and low reject rates."
              }
            ]
          },
          {
            title: "Planning vs calibration",
            items: [
              {
                q: "What is the difference between Planning Mode and Empirical Calibration Mode?",
                a: "Planning Mode estimates the lower bound from modeled sky/background assumptions. Empirical Calibration Mode uses a measured test-frame background to calibrate the lower-bound side more directly. In both modes the operating band and upper regimes still depend on headroom, field, and workflow assumptions."
              },
              {
                q: "When should I trust Planning Mode, and when should I bother with Empirical Calibration?",
                a: "Planning Mode is usually good enough for estimating a starting range before a session. Use Empirical Calibration when you want a stronger lower-bound anchor for a specific filter, gain, and sky condition, especially in darker or narrowband cases."
              },
              {
                q: "Should I recalibrate empirical mode every time I change gain, filter, or sky condition?",
                a: "Recalibrate whenever one of those changes materially alters the background path. Filter and gain changes matter directly. Sky changes matter when they are large enough that the measured background no longer represents the session you are planning."
              },
              {
                q: "What should I do if my measured background changes during the night?",
                a: "If the change is modest, keep imaging and treat the recommendation as a planning guide. If moon, altitude, haze, or sky brightness shift a lot, take a new representative test frame and update the empirical calibration."
              },
              {
                q: "If I measured one filter empirically, can the tool infer the others?",
                a: "No. The tool does not assume one filter’s measured background applies to another. Other filters without saved measured entries fall back to the modeled path."
              },
              {
                q: "In Empirical Calibration Mode, is the calibration stored per filter?",
                a: "Yes. Each active filter keeps its own test exposure, measured background, gain conversion, read-noise entry, and optional dark-current entry. The empirical lower-bound path uses that saved filter-specific capture state instead of forcing every filter to reuse one global calibration record."
              },
              {
                q: "If I change Bortle or SQM in Empirical Calibration Mode, what should move?",
                a: "If that filter has a saved empirical calibration, the measured test frame now anchors both the lower-bound side and the sky-pedestal headroom term for that filter. In that case changing Bortle or SQM should no longer tug the calibrated filter’s hero result very much. Bortle and SQM still matter in Planning Mode, and they still matter for any filter that does not yet have a usable empirical calibration."
              },
              {
                q: "What does “Sky source” mean in the result?",
                a: "It tells you which background source is currently driving the sky-pedestal headroom side of the recommendation. In Planning Mode that is the planned sky estimate. In Empirical Calibration Mode, if a filter has a saved measured test frame, that same measured frame is reused there so the result does not mix one measured sky with a different estimated sky."
              }
            ]
          },
          {
            title: "Physics and regimes",
            items: [
              {
                q: "Is this tool physics-based or tuned?",
                a: "Both. Image scale, seeing footprint, sky-rate scaling, read noise, gain state, and simplified bright-star saturation math are physics-informed. The operating-band recommendation also uses practical heuristics so the output stays believable in field use instead of pretending there is one exact sacred exposure."
              },
              {
                q: "What does the read-noise contribution target mean?",
                a: `It sets the tolerated read-noise penalty relative to the minimum achievable stack noise. The current setup is using ${contributionTargetLabel(t.readNoiseContributionTargetPct)}. Lower percentages require longer exposures and move the lower-bound thresholds later.`
              },
              {
                q: "Why does the throughput value look lower than I expected?",
                a: "The throughput value is an estimate for the full optical and filter path, not just the telescope objective. Even high-quality refractors, correctors, reducers, filters, camera windows, and other optical surfaces introduce small losses. These losses multiply through the system. For example, several 95–98% transmission elements can easily produce an overall optical/filter throughput in the 80–90% range.<br><br>This value is separate from camera quantum efficiency. Throughput estimates how much light reaches the sensor. Quantum efficiency estimates how efficiently the sensor converts that arriving light into electrons."
              },
              {
                q: "Does a UV/IR-cut filter change the exposure recommendation?",
                a: "A UV/IR-cut filter is treated as a broadband OSC filter. It blocks ultraviolet and near-infrared light while passing the visible spectrum. In most cases it only modestly changes the exposure recommendation, because it is not a narrowband or dual-band filter. Its larger practical benefit is star and color control: blocking out-of-band IR can reduce bloated stars and improve color behavior in broadband OSC imaging.<br><br>For this tool, generic UV/IR cut is modeled as broadband OSC with a modest throughput/passband adjustment."
              },
              {
                q: "What does the Read Noise Regime mean?",
                a: `It covers exposures below the lower bound of ${fmtSeconds(t.lowerBoundSec)} for the current setup. The raw crossover uses the active ${contributionTargetLabel(t.readNoiseContributionTargetPct)}, which maps to ${fmtNumber(t.readNoiseFloorFactor, 1)} × RN² and lands at ${fmtSeconds(t.readNoiseFloorSec)} before moderation.`
              },
              {
                q: "What does shot noise mean here?",
                a: "Shot noise means Poisson noise from the photons and electrons actually collected. Read noise is paid every frame, but shot noise is tied to real signal and improves mainly by collecting more total photons across the whole stack. Longer individual subs help until read noise and overhead stop wasting efficiency, but after that point shot noise does not create a new sub-exposure boundary by itself."
              },
              {
                q: "Should the chart show a shot-noise zone?",
                a: "Not as a separate colored zone. The chart draws boundaries where the recommended sub-exposure behavior changes: read noise, operational overhead, practical operating band, and upper-side risk. Shot noise is already inside the read-noise criterion, because that criterion asks when real background/source signal has become large enough that read noise is only a small contributor. Once that is true, more total integration is what mainly improves shot-noise statistics."
              },
              {
                q: "What about sensor thermal noise?",
                a: `Thermal noise in this tool comes from dark current. For the current setup the camera dark current is ${fmtNumber(result.input.cameraState.darkCurrentEPerPxPerSec, 4)} e-/px/s versus sky background ${fmtNumber(result.derived.skyRateEPerPxPerSec, 4)} e-/px/s. Dark current is tracked, but it usually does not set its own dominant boundary unless it approaches the sky background.`
              },
              {
                q: "Why does changing sensor temperature sometimes do almost nothing?",
                a: `Because for many modern cooled cameras dark current is tiny compared with sky background. In the current setup it is about ${fmtPercentFromRatio(result.thermal.ratioToSky, 1)} of sky. Temperature matters much more when dark current approaches the background, which is more likely with narrowband filters, warmer operation, darker skies, or longer subs.`
              },
              {
                q: "Why can the operational overhead zone be narrow?",
                a: `Because the read-noise criterion and operating-band start can be close. In the current setup that span is ${fmtSeconds(Math.max(0, t.sweetSpotMinSec - t.lowerBoundSec))}. When the gap is small, the model is saying the system moves quickly from read-noise-limited territory into the preferred operating band.`
              },
              {
                q: "How is the Practical Operating Band defined?",
                a: `The lower edge is max(comfort ${fmtSeconds(t.comfortFloorSec)}, overhead ${fmtSeconds(t.overheadFloorSec)}${t.practicalFloorSec ? `, practical ${fmtSeconds(t.practicalFloorSec)}` : ""}) = ${fmtSeconds(t.sweetSpotMinSec)}. The upper edge is min(sweet-cap fraction × bright-star saturation caution, sky-pedestal caution, workflow max) = ${fmtSeconds(t.sweetSpotMaxSec)}.`
              },
              {
                q: "What is the sky-pedestal headroom threshold?",
                a: `It is the point where accumulated sky/background charge has used up too much of the headroom reserve that remains after the representative bright-star caution point. In the current setup that caution threshold is ${fmtSeconds(t.skyPedestalCautionSec)} from background ${fmtNumber(t.skyPedestalRateEPerPxPerSec, 4)} e-/px/s using ${fmtNumber(t.skyPedestalBudgetFraction * 100, 0)}% of a ${fmtNumber(t.skyHeadroomReserveE, 0)} e- reserve. It matters most in brighter skies and usually much later under narrowband or dark-sky conditions.`
              },
              {
                q: "Does bright-star saturation mean no stars are clipping before that point?",
                a: `No. Some very bright stars may clip at almost any useful exposure. The bright-star saturation threshold is a planning caution point, not a first-clipped-pixel detector. The model estimates when a representative bright-star core reaches a meaningful fraction of usable full well; in the current setup that caution point is ${fmtSeconds(t.saturationCautionSec)}. Past that area, longer subs can still work, but more stars and brighter structures are likely to lose color, core detail, or processing flexibility.`
              },
              {
                q: "How is Saturation / Workflow Risk defined?",
                a: `It starts at ${fmtSeconds(t.sweetSpotMaxSec)} because beyond that point extra sub length is giving flatter returns. The upper limit of that regime is the hard ceiling at ${fmtSeconds(t.hardMaxSec)}.`
              },
              {
                q: "What exactly is the Hard Ceiling?",
                a: `It is a model warning threshold, not a prohibition. For this setup it is min(saturation hard ${fmtSeconds(t.saturationHardSec)}, sky-pedestal hard ${fmtSeconds(t.skyPedestalHardSec)}, workflow hard ${fmtSeconds(t.workflowHardSec)}) = ${fmtSeconds(t.hardMaxSec)}.`
              },
              {
                q: "Why do gain changes matter but not fully determine the recommendation?",
                a: "Gain changes alter read noise and headroom. The tool intentionally damps that effect so gain shifts the recommendation in a believable way without letting the read-noise term dominate everything."
              }
            ]
          },
          {
            title: "Workflow and real-world capture",
            items: [
              {
                q: "What do Capture sequencing and Focus handling change?",
                a: "They model operational overhead and convenience, not sensor physics. Capture sequencing, block length, and focus handling change the practical recommendation, filter-set planning guidance, and switching cost, but they do not redefine the raw read-noise floor."
              },
              {
                q: "Can I use either focus strategy with either sequencing style?",
                a: "Yes. The tool allows that on purpose because it is a trade-study calculator. Filter blocks and filter cycling can each be paired with either full refocus on filter change or a lighter focus-when-needed strategy, so you can see the impact of both sensible and less-sensible capture choices."
              },
              {
                q: "What does Frame overhead mean?",
                a: "It means the non-imaging time wrapped around each sub: download time, dither and settle time, filter-switch cost spread across the sequence, and any autofocus interruption cost implied by the current workflow. It is not exposure time on target. The tool uses it because very short subs can waste too much session time in this dead-time budget."
              },
              {
                q: "How does dithering frequency affect the recommendation?",
                a: "More frequent dithering increases per-sub overhead and can make shorter subs less efficient. Less frequent dithering reduces that overhead, but only if it still meets your tracking and pattern-noise goals."
              },
              {
                q: "What happens if my autofocus strategy changes during the session?",
                a: "Update the workflow settings to match what you are actually doing. Changing from focus offsets to full autofocus on each filter change raises switching cost and can make shared exposure choices less attractive."
              },
              {
                q: "Why does the tool care about workflow at all instead of just physics?",
                a: "Because imaging sessions are constrained by overhead, rejected frames, autofocus interruptions, and file count. Physics can set a lower bound, but practical capture decisions still depend on how expensive longer or more fragmented subs are for your setup."
              },
              {
                q: "What if I deliberately want shorter subs for rejection robustness or seeing control?",
                a: "That is a valid choice. Stay above a sensible lower bound, then bias shorter if protecting against frame loss, wind, seeing variation, or guiding problems matters more than squeezing out a longer single-sub recommendation."
              },
              {
                q: "How should I use this if I care more about protecting bright stars than maximizing faint signal?",
                a: "Bias toward the lower side of the operating band or even below the anchor if needed. The tool is allowed to suggest a start, but you can intentionally trade some efficiency for more headroom in bright stars."
              }
            ]
          },
          {
            title: "Common disagreements and edge cases",
            items: [
              {
                q: "Why can accepted-practice sub lengths sit outside the green band?",
                a: "Because the green band is the preferred operating band under the selected assumptions, not a universal commandment. Longer subs may still be common when users accept more clipping risk, different field content, or different workflow tradeoffs."
              },
              {
                q: "Why does the tool sometimes disagree with accepted-practice sub lengths?",
                a: "Because it is a planning and calibration guide, not a universal oracle. Common practice may reflect different skies, different tolerance for clipping, or different operational priorities than the assumptions currently selected."
              },
              {
                q: "Why does the tool sometimes recommend shorter broadband subs than I expected?",
                a: "Broadband often hits bright-star saturation and sky-pedestal headroom sooner than people expect, especially with faster optics, bright fields, or bright urban sky. In this tool the background can influence both the lower-bound side and the upper practical side, because a rising sky pedestal can consume usable headroom before bright-star clipping becomes the first limit."
              },
              {
                q: "Why does changing Bortle or SQM sometimes move the lower bound more than the rest of the recommendation?",
                a: "Because sky brightness is the strongest direct input to the lower-bound background rate, so that side often moves first and most visibly. But it can also tighten the upper practical side through the sky-pedestal headroom threshold when the background is bright enough to consume usable dynamic range. If you do not see much upper-side motion, that usually means bright-star saturation or workflow is still the first controlling limit."
              },
              {
                q: "What does the calibration audit note mean in Empirical Calibration Mode?",
                a: "It is not an engine error. It means the saved test-frame background looks very different from the current planning-sky estimate. That can be perfectly real if the frame came from different conditions, but it is a prompt to double-check units, pedestal handling, and whether the test frame still matches the session you are planning."
              },
              {
                q: "Why does the tool sometimes recommend longer subs than common online advice?",
                a: "Some online advice is intentionally simple and conservative. If your current RN target, sky, and gain state imply that the lower floor clears later, the tool may recommend longer starts than a generic rule of thumb."
              },
              {
                q: "How should I interpret a very narrow operating band?",
                a: "It means the model sees only a small interval where lower-bound clearance and upper-side headroom are both favorable. That often indicates a filter or field that is tightly constrained by bright-star saturation, workflow, or both."
              },
              {
                q: "Does this tool assume sky-background-limited imaging is always the goal?",
                a: "No. It uses read-noise contribution as the lower-bound calibration framework, then adds practical operating logic for headroom, overhead, workflow, and convenience. Sky brightness is important, but clearing the lower bound is not the same as solving the whole planning problem."
              },
              {
                q: "Why did you add a sky spectral profile for LP filters?",
                a: "Bortle or SQM tells the tool how bright the sky is, but not what wavelengths make up that brightness. LP-style broadband filters such as Optolong L-Pro can reject some sodium or mercury line structure while passing much of the target and star continuum. The spectral profile lets the model estimate the sky background admitted by those filters without pretending the site spectrum is known exactly. The small preview shows effective modeled sky background, so its shape comes from the selected profile and its height also follows Bortle. The height is compressed for readability; it is not a calibrated photometric plot."
              },
              {
                q: "What is the Spectral detail panel showing?",
                a: "It separates the spectral story into smaller questions. Sensor view shows detector response only. Filter view shows the selected filter transmission only. Combined response multiplies those ingredients so you can see what the acquisition chain actually responds to. When LP spectral-sky modeling is relevant, separate sky and filtered-sky views show the assumed background and what survives the selected filter path."
              },
              {
                q: "Will an LP filter always allow much longer exposures in bright sky?",
                a: "Not necessarily. LP filters can improve the final capture by rejecting light that is not part of the target, which can help cleanliness, gradients, and color separation. This tool is narrower: it asks how the filter changes the exposure-length boundaries, especially read-noise clearance, operational floor, sky pedestal, saturation caution, and hard ceiling. If bright-star saturation, sky-pedestal headroom, or workflow remains the limiting factor, the recommended sub length may move only modestly even though the filter is still useful for image quality."
              },
              {
                q: "Why can an LP filter help the image but not change the exposure recommendation much?",
                a: "Because exposure length is only one part of capture quality. A filter may remove unwanted sodium, mercury, LED, or broadband sky glow and make the stack easier to process, but the sub length is still bounded by the criteria this tool models. Once the lower side is acceptable, longer subs may be limited by saturated stars, sky pedestal, rejected-frame cost, or workflow. The tool is therefore LP-aware, but it is not trying to score every aesthetic or processing benefit of the filter."
              },
              ...(oscSupported ? [{
                q: "Can I use this tool with OSC cameras the same way as mono plus filters?",
                a: "Mostly yes, but interpret the result as one combined color path rather than separate mono channels. The lower-bound and upper-side logic still apply, but you will not get independent per-filter recommendations the way you do with a mono filter set."
              }] : [])
            ]
          }
        ];
        return `
          <section class="card section tab-panel ${appState.activeMainTab === "faq" ? "active" : ""}" data-panel="faq">
            <div class="section-label">FAQ</div>
            <div class="small-note" style="margin-bottom:10px">Practical questions about what the regimes mean, what criteria set the boundaries, and how to interpret the result.</div>
            ${faqSections.map((section) => `
              <div class="faq-section">
                <div class="faq-section-head">
                  <div class="faq-section-title">${section.title}</div>
                  <div class="faq-section-count">${section.items.length} questions</div>
                </div>
                <div class="driver-list">
                  ${section.items.map((item) => `
                    <details>
                      <summary><strong>${item.q}</strong></summary>
                      <div class="small-note" style="margin-top:10px">${item.a}</div>
                    </details>
                  `).join("")}
                </div>
              </div>
            `).join("")}
          </section>
        `;
      }
  
      function renderThresholdCards(result) {
        const t = displayThresholdsForResult(result);
        return `
          <div class="cards-4">
            <div class="mini-card"><h4>${zoneNames("too_short").full} ${helpBadge("Read-noise floor = the lower-bound threshold driven by the active read-noise contribution target and any overhead/practical floor. Based on the Robin Glover / SharpCap style lower-bound framework.")}</h4><div class="big-number">${fmtSeconds(t.lowerBoundSec)}</div><div class="muted">${t.practicalFloorSec ? "max(read-noise, overhead, practical floor)" : "max(read-noise, overhead floor)"}</div></div>
            <div class="mini-card"><h4>Operating band start ${helpBadge("Operating band = the recommended interval after the lower floor is cleared but before bright-star saturation, sky-pedestal, or workflow penalties dominate.")}</h4><div class="big-number">${fmtSeconds(t.sweetSpotMinSec)}</div><div class="muted">operating-band lower boundary</div></div>
            <div class="mini-card"><h4>Operating band end ${helpBadge("The operating band ends at the earliest practical upper-side caution: bright-star saturation, sky-pedestal headroom, or workflow cap.")}</h4><div class="big-number">${fmtSeconds(t.sweetSpotMaxSec)}</div><div class="muted">min(bright-star saturation caution, sky-pedestal caution, workflow cap)</div></div>
            <div class="mini-card"><h4>${zoneNames("too_long").full} ${helpBadge("Hard ceiling = the terminal cap from saturation-hard, sky-pedestal-hard, and workflow-hard limits. Exposures beyond this point are outside the recommended range under the current assumptions.")}</h4><div class="big-number">${fmtSeconds(t.hardMaxSec)}</div><div class="muted">terminal cap under current saturation/sky/workflow assumptions</div></div>
          </div>
        `;
      }
  
      function renderDriverCards(result) {
        const t = result.thresholds;
        const starRate = result.sourceScenario.representativeStarCoreRateEPerSec;
        const thermal = result.thermal;
        const lowerRate = result.lowerBoundBackground.rateEPerPxPerSec;
        const lower = result.synthesis.lowerBoundDrivers.map((driver) => `
          <div class="driver">
            <div class="driver-top"><strong>${driverLabelForDisplay(result, driver.label)}</strong><span class="impact ${driver.impact}">${driver.impact}</span></div>
            <div class="driver-copy">${driver.label === "Read noise"
              ? `Read noise is the main thing setting the lower edge. With a lower-bound background of ${fmtNumber(lowerRate, 4)} e-/px/s and a ${contributionTargetLabel(t.readNoiseContributionTargetPct)}, the unmoderated read-noise estimate lands near ${fmtSeconds(t.readNoiseFloorSec)} and the displayed read-noise criterion lands near ${fmtSeconds(t.moderatedReadNoiseFloorSec)}.`
              : driver.label === "Frame overhead"
                ? `Frame overhead is pushing the lower side upward. With about ${fmtSeconds(result.input.workflow.frameOverheadSec)} of dead time per sub, the tool waits until roughly ${fmtSeconds(t.overheadFloorSec)} before calling the exposure operationally worthwhile.`
                : driver.label === "Practical floor"
                  ? `A practical narrowband floor is active here. The tool is deliberately preventing unrealistically short narrowband subs, so it keeps the lower side near ${fmtSeconds(t.practicalFloorSec)} even if the pure physics floor would be a little earlier.`
                : `A comfort floor is smoothing the start of the working range. The raw comfort point is ${fmtSeconds(t.rawComfortFloorSec)}, which becomes about ${fmtSeconds(t.comfortFloorSec)} after moderation.`}</div>
          </div>
        `).join("");
        const upper = result.synthesis.upperBoundDrivers.map((driver) => `
          <div class="driver">
            <div class="driver-top"><strong>${driverLabelForDisplay(result, driver.label)}</strong><span class="impact ${driver.impact}">${driver.impact}</span></div>
            <div class="driver-copy">${driver.label === "Bright-star saturation"
              ? `Bright structures are setting the main caution point. The representative star-core model reaches its caution zone around ${fmtSeconds(t.saturationCautionSec)}, so the tool treats longer subs as increasingly less forgiving above that area unless another cap closes earlier.`
              : driver.label === "Sky-pedestal headroom"
                ? `Sky background is becoming the first upper-side limit. At the current sky source of ${fmtNumber(t.skyPedestalRateEPerPxPerSec, 4)} e-/px/s, the background pedestal starts consuming too much usable headroom around ${fmtSeconds(t.skyPedestalCautionSec)}. This is about lost headroom for faint background structure, not immediate star clipping.`
              : driver.label === "Workflow hard max"
                ? `Workflow is setting the upper practical cap. The current workflow settings make long subs expensive enough that the tool starts treating them as less attractive around ${fmtSeconds(t.workflowMaxSec)} and fully capped near ${fmtSeconds(t.workflowHardSec)}.`
                : driver.label === "Sky-pedestal hard cap"
                  ? `The sky pedestal reaches the model’s hard background cap near ${fmtSeconds(t.skyPedestalHardSec)}. Past that point the background itself is consuming too much of the remaining headroom, so the hard ceiling lands at ${fmtSeconds(t.hardMaxSec)} after all caps are combined.`
                  : `Bright structures reach the model’s hard headroom threshold near ${fmtSeconds(t.saturationHardSec)}. After combining that with sky-saturation and workflow caps, the hard ceiling for this setup lands at ${fmtSeconds(t.hardMaxSec)}.`}</div>
          </div>
        `).join("");
        return `
          <div class="cards-2">
            <div class="mini-card">
              <h3>Lower-side mechanics</h3>
              <div class="warning" style="margin-bottom:10px">These are the specific terms that keep the tool from recommending shorter subs. For this filter the active background is ${result.lowerBoundBackground.source === "measured" ? "measured" : "modeled"} at ${fmtNumber(lowerRate, 4)} e-/px/s, the RN target is <strong>${contributionTargetLabel(t.readNoiseContributionTargetPct)}</strong>, and temperature is a <strong>${thermal.level}</strong> contributor because dark current is ${fmtPercentFromRatio(thermal.ratioToSky, 1)} of that background.</div>
              <div class="driver-list">${lower}</div>
            </div>
            <div class="mini-card">
              <h3>Upper-side mechanics</h3>
              <div class="warning" style="margin-bottom:10px">These are the specific terms that make longer subs less attractive. It depends on representative bright-structure pressure (${fmtNumber(starRate, 1)} e-/s), the active sky source (${fmtNumber(t.skyPedestalRateEPerPxPerSec, 4)} e-/px/s), and the chosen bright-star saturation and workflow tolerances. Treat it as a planning bound, not a target-specific clipping prediction.</div>
              <div class="driver-list">${upper}</div>
            </div>
          </div>
        `;
      }
  
      function renderConfidenceCard(result) {
        const confidence = result.confidence;
        const prov = confidence.cameraProvenance;
        return `
          <div class="mini-card">
            <h3>Confidence</h3>
            <div class="confidence-list">
              <div><span class="confidence-pill ${levelClass(confidence.cameraConfidence)}">${confidence.cameraConfidence}</span> <span class="muted">Camera model: ${confidence.cameraModel}</span></div>
              <div><span class="confidence-pill ${levelClass(confidence.skyConfidence)}">${confidence.skyConfidence}</span> <span class="muted">Sky model: ${confidence.skyModel}</span></div>
              <div><span class="confidence-pill ${levelClass(confidence.saturationConfidence)}">${confidence.saturationConfidence}</span> <span class="muted">Saturation model: ${confidence.saturationModel}</span></div>
              <div><span class="confidence-pill ${levelClass(confidence.overall)}">${confidence.overall}</span> <span class="muted">Overall confidence</span></div>
            </div>
            <div class="small-note" style="margin-top:10px">${confidence.explanation}</div>
            ${prov ? `<div class="small-note" style="margin-top:10px"><strong>Camera data provenance:</strong> ${prov.operatingData}. <strong>QE:</strong> ${prov.qeSource}.</div>` : ""}
          </div>
        `;
      }
  
      function renderAssumptionsPanel(result) {
        const input = result.input;
        const sky = result.sky.breakdown;
        const thermal = result.thermal;
        return `
          <div class="mini-card">
            <h3>Assumptions</h3>
            <div class="assumption-list">
              <div class="assumption"><div class="k">Image scale</div><div class="v">${fmtNumber(result.derived.imageScaleArcsecPerPx, 2)} arcsec/px</div></div>
              <div class="assumption"><div class="k">Seeing footprint</div><div class="v">${fmtNumber(result.derived.seeingPxFwhm, 2)} px FWHM</div></div>
              <div class="assumption"><div class="k">Sky rate</div><div class="v">${fmtNumber(result.derived.skyRateEPerPxPerSec, 3)} e-/px/s</div></div>
              <div class="assumption"><div class="k">Sky-pedestal caution</div><div class="v">${fmtSeconds(result.thresholds.skyPedestalCautionSec)}</div></div>
              <div class="assumption"><div class="k">Sky source</div><div class="v">${input.conditions.skySourceLabel}</div></div>
              <div class="assumption"><div class="k">Sky spectral profile</div><div class="v">${sky.skySpectralProfileLabel}${sky.lpSkyTransmissionRatio != null ? ` · LP sky ratio ${fmtNumber(sky.lpSkyTransmissionRatio, 2)}×` : ""}</div></div>
              <div class="assumption"><div class="k">Moon severity</div><div class="v">${input.conditions.moonSeverity}</div></div>
              <div class="assumption"><div class="k">Moon geometry source</div><div class="v">${input.conditions.moonGeometrySource === "computed" ? `computed (${input.conditions.darknessState})` : "manual"}</div></div>
              <div class="assumption"><div class="k">Air mass</div><div class="v">${fmtNumber(sky.airmass, 2)}</div></div>
              <div class="assumption"><div class="k">Scenario</div><div class="v">${input.scenarioPreset.label}</div></div>
              <div class="assumption"><div class="k">Exposure mode</div><div class="v">${input.calibration.exposureMode === "empirical" ? "Empirical Calibration" : "Planning Mode"}</div></div>
              <div class="assumption"><div class="k">RN contribution target</div><div class="v">${contributionTargetLabel(result.thresholds.readNoiseContributionTargetPct)}</div></div>
              <div class="assumption"><div class="k">Lower-bound background</div><div class="v">${result.lowerBoundBackground.source === "measured" ? `${fmtNumber(result.lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s from test frame` : `${fmtNumber(result.lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s modeled`}</div></div>
              <div class="assumption"><div class="k">Capture sequencing</div><div class="v">${captureSequencingLabel(input.workflow.captureSequencing)}</div></div>
              <div class="assumption"><div class="k">Filter block length</div><div class="v">${input.workflow.captureSequencing === "filter_blocks" ? `${fmtNumber(input.workflow.filterBlockLengthSubs, 0)} subs` : "n/a in cycling mode"}</div></div>
              <div class="assumption"><div class="k">Focus handling</div><div class="v">${focusHandlingLabel(input.workflow.focusHandling, input.workflow.hasFilterSequencing)}</div></div>
              <div class="assumption"><div class="k">Workflow impact</div><div class="v">${input.workflow.switchingPenalty} switching · ${input.workflow.focusInterruptionCost} focus cost</div></div>
              <div class="assumption"><div class="k">Refinement path</div><div class="v">${ditherFrequencyLabel(input.workflow.ditherFrequency)} dither · ${fileCountPreferenceLabel(input.workflow.fileCountPreference)}</div></div>
              <div class="assumption"><div class="k">Read noise / full well</div><div class="v">${fmtNumber(input.cameraState.readNoiseE, 2)} e- / ${Math.round(input.cameraState.fullWellE)} e-</div></div>
              <div class="assumption"><div class="k">Dark current / lower bound background</div><div class="v">${fmtNumber(thermal.darkRateEPerPxPerSec, 4)} / ${fmtNumber(result.lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s</div></div>
              <div class="assumption"><div class="k">Thermal contribution</div><div class="v">${thermal.level} (${fmtPercentFromRatio(thermal.ratioToSky, 1)} of lower-bound background)</div></div>
            </div>
          </div>
        `;
      }
  
      const VALIDATION_CASES = [
        {
          id: "imx571-ha-f7-dark",
          name: "IMX571 mono, Ha 6 nm, f/7, moonless",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            sweetMinRange: [180, 245],
            anchorRange: [240, 420],
            note: "Should not anchor near 210 s after recalibration."
          }
        },
        {
          id: "imx571-ha-brighter-sky",
          name: "Same system, brighter sky",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 19.6,
            bortleClass: 5,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            note: "The brighter-sky case should not move the lower bound earlier than the darker reference."
          }
        },
        {
          id: "imx571-ha-faster-optics",
          name: "Same system, faster optics",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 650,
            fRatio: 5,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            note: "Faster optics should generally move the floor earlier."
          }
        },
        {
          id: "gain-sensitivity-ha",
          name: "Gain sensitivity, IMX571 mono Ha 6 nm",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 0,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          compareTo: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            note: "Gain 0 should recommend somewhat longer subs than gain 100, but not explode into implausible default territory."
          }
        },
        {
          id: "fast-ha-common-practice",
          name: "Fast Ha common-practice smell check",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 155,
            focalLengthMm: 810,
            fRatio: 5.23,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [180, 420],
            sweetMinRange: [180, 260],
            note: "Real 6 nm curves should still leave this fast Ha case in a believable narrowband neighborhood, even if the operating band ends a bit below a generic 300 s rule-of-thumb."
          }
        },
        {
          id: "osc-broadband",
          name: "Broadband OSC reference",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 180],
            note: "Should behave materially differently from mono narrowband."
          }
        },
        {
          id: "osc-broadband-uvir",
          name: "Broadband OSC with UV/IR cut",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -15,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc-uvir",
            selectedFilters: ["osc-broad-uvir"],
            activeFilterId: "osc-broad-uvir",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 180],
            note: "Generic UV/IR cut should stay in the broadband OSC workflow, not filtered OSC."
          }
        },
        {
          id: "asi071mc-osc-broadband",
          name: "ASI071MC Pro broadband import sanity",
          input: {
            cameraId: "zwo-asi071mc-pro",
            modeId: "unity_curve",
            gain: 90,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 260],
            note: "Imported IMX071 OSC model should evaluate in a plausible broadband range."
          }
        },
        {
          id: "qhy071c-osc-broadband",
          name: "QHY071C broadband import sanity",
          input: {
            cameraId: "qhy071c",
            modeId: "unity_curve",
            gain: 90,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 260],
            note: "QHY071C should share the IMX071 family proxy behavior while remaining a distinct catalog entry."
          }
        },
        {
          id: "qhy247c-osc-broadband-weak-proxy",
          name: "QHY247C weak-proxy broadband import sanity",
          input: {
            cameraId: "qhy247c",
            modeId: "unity_curve",
            gain: 90,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 260],
            note: "QHY247C should evaluate in a plausible broadband range while preserving its weak-QE-proxy status in the catalog."
          }
        },
        {
          id: "qhy183c-osc-broadband",
          name: "QHY183C broadband import sanity",
          input: {
            cameraId: "qhy183c",
            modeId: "unity_curve",
            gain: 60,
            tempC: -15,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [15, 220],
            note: "QHY183C should remain in the same practical broadband neighborhood as other IMX183 OSC models."
          }
        },
        {
          id: "asi294mm-bin1-vs-bin2-import",
          name: "ASI294MM Pro Bin 1 and Bin 2 import sanity",
          input: {
            cameraId: "zwo-asi294mm-pro-bin1",
            modeId: "unity_curve",
            gain: 120,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          compareTo: {
            cameraId: "zwo-asi294mm-pro",
            modeId: "unity_curve",
            gain: 120,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [120, 720],
            note: "ASI294MM Bin 1 should run as a real alternate readout mode, with Bin 2 remaining available as the high-full-well mode."
          }
        },
        {
          id: "asi678-family-import",
          name: "ASI678 mono and OSC import sanity",
          input: {
            cameraId: "zwo-asi678mc",
            modeId: "unity_curve",
            gain: 182,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          compareTo: {
            cameraId: "zwo-asi678mm",
            modeId: "unity_curve",
            gain: 182,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [15, 220],
            note: "ASI678MC should behave as a short-pixel modern OSC camera, and the mono variant should also evaluate cleanly."
          }
        },
        {
          id: "qhy-minicam8-family-import",
          name: "QHY MiniCam8 mono and OSC import sanity",
          input: {
            cameraId: "qhy-minicam8c",
            modeId: "unity_curve",
            gain: 252,
            tempC: -15,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          compareTo: {
            cameraId: "qhy-minicam8m",
            modeId: "unity_curve",
            gain: 252,
            tempC: -15,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [15, 240],
            note: "QHY MiniCam8C and MiniCam8M should evaluate cleanly as IMX585-family cooled cameras."
          }
        },
        {
          id: "baader-neodymium-lp-import",
          name: "Baader Moon and Skyglow Neodymium import sanity",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc-baader-neodymium-moon-skyglow",
            selectedFilters: ["osc-baader-neodymium-moon-skyglow"],
            activeFilterId: "osc-baader-neodymium-moon-skyglow",
            skyInputMode: "bortle",
            skySpectralProfileId: "mixed-suburban",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 220],
            note: "Baader Moon and Skyglow should remain a broadband OSC LP-style case, not a narrowband workflow."
          }
        },
        {
          id: "svbony-sv260-lp-import",
          name: "SVBONY SV260 multi-bandpass import sanity",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc-svbony-sv260",
            selectedFilters: ["osc-svbony-sv260"],
            activeFilterId: "osc-svbony-sv260",
            skyInputMode: "bortle",
            skySpectralProfileId: "mixed-suburban",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 260],
            note: "SV260 should evaluate cleanly as a broad multi-bandpass LP filter."
          }
        },
        {
          id: "svbony-sv220-haoiii-import",
          name: "SVBONY SV220 Ha/OIII OSC import sanity",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-osc-svbony-sv220-haoiii",
            selectedFilters: ["osc-ha-svbony-sv220", "osc-oiii-svbony-sv220"],
            activeFilterId: "osc-ha-svbony-sv220",
            skyInputMode: "bortle",
            skySpectralProfileId: "mixed-suburban",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [90, 720],
            note: "SV220 Ha/OIII should behave as a 7 nm OSC narrowband path."
          }
        },
        {
          id: "svbony-sv220-siioiii-combo-import",
          name: "SVBONY SV220 SII/OIII and combo import sanity",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-osc-svbony-sv220-combo",
            selectedFilters: ["osc-ha-svbony-sv220", "osc-oiii-svbony-sv220", "osc-sii-svbony-sv220"],
            activeFilterId: "osc-sii-svbony-sv220",
            skyInputMode: "bortle",
            skySpectralProfileId: "mixed-suburban",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [90, 840],
            note: "SV220 SII/OIII and the combined set should evaluate cleanly as OSC narrowband paths."
          }
        },
        {
          id: "mono-broadband-red-common-practice",
          name: "Mono broadband red common-practice check",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 0,
            tempC: -15,
            apertureMm: 155,
            focalLengthMm: 810,
            fRatio: 5.23,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "broadband-lrgb-zwo",
            selectedFilters: ["zwo-lrgb-r"],
            activeFilterId: "zwo-lrgb-r",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [60, 150],
            sweetMinRange: [60, 120],
            note: "Fast mono broadband on this class of setup should usually recommend a materially shorter anchor than the narrowband cases while still leaving 300 s inside the broader allowable region."
          }
        },
        {
          id: "asi2600mm-ha-g100-fast",
          name: "ASI2600MM fast Ha, gain 100",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -15,
            apertureMm: 155,
            focalLengthMm: 820,
            fRatio: 5.29,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [210, 420],
            sweetMinRange: [170, 260],
            note: "Gain 100 on a fast IMX571 Ha setup should land in a common practical narrowband neighborhood."
          }
        },
        {
          id: "asi2600mm-ha-g0-fast",
          name: "ASI2600MM fast Ha, gain 0",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 0,
            tempC: -15,
            apertureMm: 155,
            focalLengthMm: 820,
            fRatio: 5.29,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [420, 900],
            sweetMinRange: [300, 720],
            note: "Gain 0 should push this case later than gain 100, but remain within a believable narrowband planning range."
          }
        },
        {
          id: "asi2600mc-osc-g100",
          name: "ASI2600MC OSC broadband, gain 100",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "average_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [20, 150],
            note: "Gain 100 OSC broadband should stay materially shorter than mono narrowband."
          }
        },
        {
          id: "asi2600mc-osc-g0",
          name: "ASI2600MC OSC broadband, gain 0",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 0,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            fRatio: 5,
            throughputFrac: 0.84,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            skyInputMode: "bortle",
            skyBrightnessMagPerArcsec2: 20.4,
            bortleClass: 5,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonPreset: "minor",
            moonIllumFrac: 0,
            moonAltitudeDeg: 0,
            moonSeparationDeg: 100,
            transparencyFactor: 0.95,
            fieldPresetId: "average_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            anchorRange: [40, 240],
            note: "Gain 0 OSC broadband should move later than gain 100, but not leave accepted-practice territory."
          }
        },
        {
          id: "oiii-strong-moon",
          name: "OIII 6 nm under strong moon",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-oiii-6nm"],
            activeFilterId: "astronomik-oiii-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "strong",
            moonIllumFrac: 0.8,
            moonAltitudeDeg: 45,
            moonSeparationDeg: 70,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            note: "OIII should react more strongly to moon pressure than Ha under the same system."
          }
        },
        {
          id: "ha-3nm-reference",
          name: "Ha 3 nm reference",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-chroma-3nm",
            selectedFilters: ["chroma-ha-3nm"],
            activeFilterId: "chroma-ha-3nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            note: "Ha 3 nm should generally push the lower bound later than Ha 6 nm on the same rig."
          }
        },
        {
          id: "rn-target-2pct",
          name: "Read-noise target tightening, 2% vs 10%",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced",
            exposureMode: "planning",
            readNoiseContributionTargetPct: 2
          },
          compareTo: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced",
            exposureMode: "planning",
            readNoiseContributionTargetPct: 10
          },
          expected: {
            note: "A stricter 2% read-noise contribution target should move the lower floor later than a 10% target."
          }
        },
        {
          id: "empirical-lower-bound",
          name: "Empirical lower-bound calibration",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced",
            exposureMode: "empirical",
            readNoiseContributionTargetPct: 5,
            testExposureSec: 120,
            measuredBackgroundValue: 21.6,
            measuredBackgroundUnits: "electrons",
            backgroundMeasurementStatus: "corrected_mean",
            trueGainEPerAdu: 0.27,
            empiricalReadNoiseE: 0.75,
            optionalDarkCurrentEPerPxPerSec: 0.0008
          },
          expected: {
            note: "Empirical mode should switch the lower-bound source to measured background while leaving the upper-bound framework intact."
          }
        },
        {
          id: "hcg-boundary",
          name: "Gain transition across HCG boundary",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 0,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          compareTo: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced"
          },
          expected: {
            note: "Lower floor may improve at gain 100, but upper headroom should tighten."
          }
        },
        {
          id: "workflow-blocks-refocus-every-change",
          name: "Workflow: filter blocks + refocus every change",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            captureSequencing: "filter_blocks",
            focusHandling: "refocus_every_change",
            ditherFrequency: "every_1",
            ditherSettleSec: 8,
            badFrameRiskTolerance: "medium",
            fileCountPreference: "balanced",
            customFilterSwitchPenaltySec: null,
            saturationTolerance: "medium"
          },
          expected: {
            note: "Blocks plus autofocus on every change should still favor distinct per-filter starts."
          }
        },
        {
          id: "workflow-cycling-refocus-every-change",
          name: "Workflow: filter cycling + refocus every change",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            captureSequencing: "filter_cycling",
            focusHandling: "refocus_every_change",
            ditherFrequency: "every_1",
            ditherSettleSec: 8,
            badFrameRiskTolerance: "medium",
            fileCountPreference: "balanced",
            customFilterSwitchPenaltySec: null,
            saturationTolerance: "medium"
          },
          expected: {
            note: "Cycling with autofocus on each change should show the highest switching burden."
          }
        },
        {
          id: "workflow-cycling-focus-table",
          name: "Workflow: filter cycling + offsets + refocus when needed",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            captureSequencing: "filter_cycling",
            focusHandling: "focus_offsets_monitoring",
            ditherFrequency: "every_1",
            ditherSettleSec: 8,
            badFrameRiskTolerance: "medium",
            fileCountPreference: "balanced",
            customFilterSwitchPenaltySec: null,
            saturationTolerance: "medium"
          },
          expected: {
            note: "Cycling with offsets plus refocus when needed should reduce switching burden relative to full autofocus on every change."
          }
        },
        {
          id: "workflow-cycling-focus-when-needed",
          name: "Workflow: filter cycling + offsets with refocus when needed",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            captureSequencing: "filter_cycling",
            focusHandling: "focus_offsets_monitoring",
            ditherFrequency: "every_1",
            ditherSettleSec: 8,
            badFrameRiskTolerance: "medium",
            fileCountPreference: "balanced",
            customFilterSwitchPenaltySec: null,
            saturationTolerance: "medium"
          },
          expected: {
            note: "Offsets plus refocus when needed should land below full autofocus on every change."
          }
        },
        {
          id: "workflow-blocks-longer-blocks",
          name: "Workflow: filter blocks with longer blocks",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            skyInputMode: "measured",
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            captureSequencing: "filter_blocks",
            filterBlockLengthSubs: 20,
            focusHandling: "refocus_every_change",
            ditherFrequency: "every_1",
            ditherSettleSec: 8,
            badFrameRiskTolerance: "medium",
            fileCountPreference: "balanced",
            customFilterSwitchPenaltySec: null,
            saturationTolerance: "medium"
          },
          expected: {
            note: "Longer filter blocks should reduce per-sub switching burden relative to shorter default blocks."
          }
        },
        {
          id: "broadband-bright-sky-pedestal",
          name: "Broadband bright sky should tighten sky-pedestal headroom",
          input: {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "broadband-lrgb-zwo",
            selectedFilters: ["zwo-l"],
            activeFilterId: "zwo-l",
            skyInputMode: "bortle",
            bortleClass: 8,
            skyBrightnessMagPerArcsec2: 18.3,
            sqmMeasurementMagPerArcsec2: 18.3,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            captureSequencing: "filter_blocks",
            filterBlockLengthSubs: 10,
            focusHandling: "focus_offsets_monitoring",
            ditherFrequency: "every_1",
            ditherSettleSec: 8,
            badFrameRiskTolerance: "medium",
            fileCountPreference: "balanced",
            customFilterSwitchPenaltySec: null,
            saturationTolerance: "medium"
          },
          expected: {
            note: "Very bright broadband sky should make the sky-pedestal threshold more relevant."
          }
        },
        {
          id: "lp-lpro-line-rich-sky",
          name: "L-Pro should reduce modeled sky background under line-rich LP",
          input: {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            fRatio: 7,
            throughputFrac: 0.82,
            centralObstructionFrac: 0,
            filterSetId: "broadband-osc-lpro",
            selectedFilters: ["osc-lpro"],
            activeFilterId: "osc-lpro",
            skyInputMode: "bortle",
            skySpectralProfileId: "legacy-sodium-mercury",
            bortleClass: 8,
            skyBrightnessMagPerArcsec2: 18.1,
            sqmMeasurementMagPerArcsec2: 18.1,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonPreset: "moonless",
            moonIllumFrac: 0,
            moonAltitudeDeg: -20,
            moonSeparationDeg: 120,
            transparencyFactor: 1,
            fieldPresetId: "average_field",
            captureSequencing: "filter_blocks",
            filterBlockLengthSubs: 10,
            focusHandling: "periodic_focus",
            ditherFrequency: "every_3",
            ditherSettleSec: 8,
            badFrameRiskTolerance: "medium",
            fileCountPreference: "balanced",
            customFilterSwitchPenaltySec: null,
            saturationTolerance: "medium"
          },
          expected: {
            note: "LP-style broadband should admit less modeled sky background than plain OSC broadband under a line-rich LP profile."
          }
        }
      ];
  
      function evaluateScenario(inputState) {
        const saved = cloneData(appState);
        Object.assign(appState, cloneData(DATA.defaults), cloneData(inputState));
        syncCameraDependentState();
        const result = evaluateFilter(appState.activeFilterId);
        Object.assign(appState, saved);
        syncCameraDependentState();
        return result;
      }
  
      function validateResultShape(result) {
        const failures = [];
        const t = result.thresholds;
        const values = [t.readNoiseFloorSec, t.comfortFloorSec, t.overheadFloorSec, t.sweetSpotMinSec, t.sweetSpotMaxSec, t.hardMaxSec];
        if (values.some((value) => !isFinite(value) || value < 0)) failures.push("Negative or invalid threshold.");
        if (t.lowerBoundSec > t.sweetSpotMinSec + 0.5) failures.push("Lower bound exceeds sweet-spot start.");
        if (t.sweetSpotMinSec > t.sweetSpotMaxSec + 1e-6) failures.push("Sweet-spot start exceeds sweet-spot end.");
        if (t.sweetSpotMaxSec > t.hardMaxSec + 1e-6) failures.push("Sweet-spot end exceeds hard max.");
        if (!["high","medium","low"].includes(result.confidence.overall)) failures.push("Invalid overall confidence label.");
        return failures;
      }
  
      function inRange(value, range) {
        if (!range) return true;
        return value >= range[0] && value <= range[1];
      }
  
      function runValidationSuite() {
        const runs = VALIDATION_CASES.map((testCase) => {
          const result = evaluateScenario(testCase.input);
          const failures = validateResultShape(result);
          if (testCase.expected?.sweetMinRange && !inRange(result.thresholds.sweetSpotMinSec, testCase.expected.sweetMinRange)) {
            failures.push(`Sweet-spot start ${Math.round(result.thresholds.sweetSpotMinSec)} s outside expected neighborhood ${testCase.expected.sweetMinRange[0]}-${testCase.expected.sweetMinRange[1]} s.`);
          }
          if (testCase.expected?.anchorRange && !inRange(result.headlineRecommendation.anchorSec, testCase.expected.anchorRange)) {
            failures.push(`Anchor ${Math.round(result.headlineRecommendation.anchorSec)} s outside expected neighborhood ${testCase.expected.anchorRange[0]}-${testCase.expected.anchorRange[1]} s.`);
          }
          if (testCase.compareTo) {
            const companionResult = evaluateScenario(testCase.compareTo);
            validateResultShape(companionResult).forEach((failure) => {
              failures.push(`Companion case: ${failure}`);
            });
          }
  
          if (testCase.id === "imx571-ha-f7-dark" && result.headlineRecommendation.anchorSec <= 220) {
            failures.push("Anchor is still too close to the original overly-short 210 s behavior.");
          }
          if (testCase.id === "imx571-ha-brighter-sky") {
            const baseline = evaluateScenario(VALIDATION_CASES[0].input);
            if (result.thresholds.lowerBoundSec + 1 < baseline.thresholds.lowerBoundSec) {
              failures.push("Brighter sky pulled the lower bound earlier when this case should be no earlier than the darker reference.");
            }
          }
          if (testCase.id === "imx571-ha-faster-optics") {
            const baseline = evaluateScenario(VALIDATION_CASES[0].input);
            if (result.thresholds.readNoiseFloorSec >= baseline.thresholds.readNoiseFloorSec) {
              failures.push("Faster optics did not move the raw read-noise floor earlier.");
            }
          }
          if (testCase.id === "osc-broadband") {
            const baseline = evaluateScenario(VALIDATION_CASES[0].input);
            if (Math.abs(result.headlineRecommendation.anchorSec - baseline.headlineRecommendation.anchorSec) < 40) {
              failures.push("Broadband OSC case is not differentiated enough from the mono narrowband reference.");
            }
            if (result.input.workflow.workflowFamily !== "osc_broadband") {
              failures.push("Clear/no UV-IR-cut OSC broadband should remain in the osc_broadband workflow family.");
            }
            if (!result.input.filter.showIrLeakWarning) {
              failures.push("Clear/no UV-IR-cut OSC broadband should carry the informational IR-leak warning flag.");
            }
          }
          if (testCase.id === "osc-broadband-uvir") {
            if (result.input.workflow.workflowFamily !== "osc_broadband") {
              failures.push("OSC Broadband with UV/IR Cut should remain in the osc_broadband workflow family.");
            }
            if (result.input.filter.showIrLeakWarning) {
              failures.push("OSC Broadband with UV/IR Cut should not carry the IR-leak warning flag.");
            }
            if (!result.input.filter.showUvIrPresentNote) {
              failures.push("OSC Broadband with UV/IR Cut should carry the UV/IR-present note flag.");
            }
            if (result.input.filter.bandType !== "broadband") {
              failures.push("OSC Broadband with UV/IR Cut should be modeled as broadband.");
            }
          }
          if (testCase.id === "mono-broadband-red-common-practice") {
            if (result.thresholds.sweetSpotMaxSec < 300) {
              failures.push("This mono broadband red case still puts 300 s beyond the operating band too aggressively.");
            }
            if (result.thresholds.hardMaxSec < 480) {
              failures.push("This mono broadband red case still produces an unrealistically short hard ceiling for accepted practice.");
            }
          }
          if (testCase.id === "asi2600mm-ha-g0-fast") {
            const comparison = evaluateScenario(VALIDATION_CASES.find((entry) => entry.id === "asi2600mm-ha-g100-fast").input);
            if (result.headlineRecommendation.anchorSec <= comparison.headlineRecommendation.anchorSec) {
              failures.push("ASI2600MM gain 0 fast Ha case did not land later than the gain 100 companion case.");
            }
          }
          if (testCase.id === "asi2600mc-osc-g0") {
            const comparison = evaluateScenario(VALIDATION_CASES.find((entry) => entry.id === "asi2600mc-osc-g100").input);
            if (result.headlineRecommendation.anchorSec <= comparison.headlineRecommendation.anchorSec) {
              failures.push("ASI2600MC gain 0 OSC case did not land later than the gain 100 companion case.");
            }
          }
          if (testCase.id === "oiii-strong-moon") {
            const baseline = evaluateScenario({
              ...testCase.input,
              moonPreset: "moonless",
              moonIllumFrac: 0,
              moonAltitudeDeg: -20,
              moonSeparationDeg: 120
            });
            if (result.thresholds.lowerBoundSec + 1 < baseline.thresholds.lowerBoundSec) {
              failures.push("Strong moon OIII case unexpectedly moved the lower bound earlier than the moonless comparison.");
            }
          }
          if (testCase.id === "ha-3nm-reference") {
            const baseline = evaluateScenario({
              ...testCase.input,
              filterSetId: "narrowband-sho-astronomik-6nm",
              selectedFilters: ["astronomik-ha-6nm"],
              activeFilterId: "astronomik-ha-6nm"
            });
            if (result.thresholds.sweetSpotMinSec <= baseline.thresholds.sweetSpotMinSec) {
              failures.push("Ha 3 nm case did not move the operating-band start later than the Ha 6 nm comparison.");
            }
          }
          if (testCase.id === "rn-target-2pct") {
            const comparison = evaluateScenario(testCase.compareTo);
            if (result.thresholds.readNoiseFloorSec <= comparison.thresholds.readNoiseFloorSec) {
              failures.push("A stricter 2% read-noise contribution target did not move the raw read-noise floor later than the 10% comparison.");
            }
          }
          if (testCase.id === "empirical-lower-bound") {
            if (result.lowerBoundBackground.source !== "measured") {
              failures.push("Empirical mode did not switch the lower-bound path to measured background.");
            }
            if (result.confidence.skyModel !== "measured background calibration") {
              failures.push("Empirical mode did not upgrade the sky/background confidence label.");
            }
          }
          if (testCase.id === "gain-sensitivity-ha") {
            const comparison = evaluateScenario(testCase.compareTo);
            if (result.headlineRecommendation.anchorSec <= comparison.headlineRecommendation.anchorSec) {
              failures.push("Gain 0 did not recommend longer subs than gain 100.");
            }
            if (result.headlineRecommendation.anchorSec > DATA.validationLimits.imx571HaGain0AnchorMaxSec) {
              failures.push(`Gain 0 anchor ${Math.round(result.headlineRecommendation.anchorSec)} s is still implausibly high for the default IMX571 Ha case.`);
            }
            if (result.thresholds.sweetSpotMinSec > DATA.validationLimits.imx571HaGain0AnchorMaxSec) {
              failures.push("Gain 0 operating-band start still runs away too far under default assumptions.");
            }
          }
          if (testCase.id === "fast-ha-common-practice") {
            if (result.thresholds.sweetSpotMaxSec < 270) {
              failures.push("This fast Ha case still puts even moderate 6 nm common-practice subs beyond the practical operating band too aggressively.");
            }
            if (result.thresholds.hardMaxSec < 450) {
              failures.push("This fast Ha case still produces an unrealistically short hard ceiling for accepted practice.");
            }
          }
          if (testCase.id === "hcg-boundary") {
            const comparison = evaluateScenario(testCase.compareTo);
            if (comparison.thresholds.readNoiseFloorSec < result.thresholds.readNoiseFloorSec) {
              // gain 100 improved the RN floor as expected
            } else {
              failures.push("Gain transition did not improve the read-noise floor across the HCG boundary.");
            }
            if (comparison.thresholds.saturationCautionSec >= result.thresholds.saturationCautionSec) {
              failures.push("Gain transition failed to tighten bright-star saturation caution as headroom dropped.");
            }
          }
          if (testCase.id === "workflow-blocks-refocus-every-change") {
            if (result.input.workflow.favorsSharedExposure !== "Per-filter starts can stay distinct") {
              failures.push("Filter blocks with autofocus on change should still favor distinct per-filter starts.");
            }
            if (result.input.workflow.switchingPenalty !== "Moderate") {
              failures.push("Filter blocks with autofocus on change should land at a moderate switching penalty.");
            }
          }
          if (testCase.id === "workflow-cycling-refocus-every-change") {
            if (result.input.workflow.switchingPenalty !== "High") {
              failures.push("Filter cycling with autofocus on every change should show a high switching penalty.");
            }
            if (result.input.workflow.favorsSharedExposure !== "Shared exposure can be practical") {
              failures.push("Filter cycling should push the workflow guidance toward a shared set exposure.");
            }
          }
          if (testCase.id === "workflow-cycling-focus-table") {
            const comparison = evaluateScenario(VALIDATION_CASES.find((entry) => entry.id === "workflow-cycling-refocus-every-change").input);
            if (result.input.workflow.switchingPenalty === "High") {
              failures.push("Cycling with offsets plus refocus when needed should reduce switching penalty below the full-autofocus cycling case.");
            }
            if (!(result.thresholds.workflowMaxSec <= comparison.thresholds.workflowMaxSec)) {
              failures.push("Cycling with offsets plus refocus when needed should not be more punitive than full autofocus on every change.");
            }
          }
          if (testCase.id === "workflow-cycling-focus-when-needed") {
            const cyclingFull = evaluateScenario(VALIDATION_CASES.find((entry) => entry.id === "workflow-cycling-refocus-every-change").input);
            const cyclingOffsets = evaluateScenario(VALIDATION_CASES.find((entry) => entry.id === "workflow-cycling-focus-table").input);
            if (result.input.workflow.switchingPenalty === "High") {
              failures.push("Offsets plus conditional refocus should reduce switching burden below full autofocus on every change.");
            }
            if (!(result.thresholds.workflowMaxSec <= cyclingFull.thresholds.workflowMaxSec)) {
              failures.push("Offsets plus conditional refocus should not be more punitive than cycling with autofocus on every filter change.");
            }
            if (Math.abs(result.thresholds.workflowMaxSec - cyclingOffsets.thresholds.workflowMaxSec) > 80) {
              failures.push("Offsets plus refocus when needed is still drifting too far from the companion workflow case.");
            }
          }
          if (testCase.id === "workflow-blocks-longer-blocks") {
            const comparison = evaluateScenario(VALIDATION_CASES.find((entry) => entry.id === "workflow-blocks-refocus-every-change").input);
            if (result.input.workflow.frameOverheadSec >= comparison.input.workflow.frameOverheadSec) {
              failures.push("Longer filter blocks did not reduce effective per-sub overhead relative to the shorter default block case.");
            }
            if (result.input.workflow.switchingPenalty === "High") {
              failures.push("Longer filter blocks should not raise switching burden into the high-penalty range.");
            }
          }
          if (testCase.id === "broadband-bright-sky-pedestal") {
            const darkerComparison = evaluateScenario({
              ...testCase.input,
              bortleClass: 2,
              skyBrightnessMagPerArcsec2: 21.9,
              sqmMeasurementMagPerArcsec2: 21.9
            });
            if (result.thresholds.skyPedestalCautionSec >= darkerComparison.thresholds.skyPedestalCautionSec) {
              failures.push("Bright broadband sky did not tighten the sky-pedestal caution threshold relative to the darker comparison.");
            }
            if (result.thresholds.sweetSpotMaxSec >= darkerComparison.thresholds.sweetSpotMaxSec) {
              failures.push("Bright broadband sky did not tighten the operating-band end relative to the darker comparison.");
            }
          }
          if (testCase.id === "lp-lpro-line-rich-sky") {
            const plainBroadband = evaluateScenario({
              ...testCase.input,
              filterSetId: "broadband-osc",
              selectedFilters: ["osc-broad"],
              activeFilterId: "osc-broad"
            });
            if (!(result.sky.skyRateEPerPxPerSec < plainBroadband.sky.skyRateEPerPxPerSec)) {
              failures.push("L-Pro did not reduce modeled sky background relative to plain OSC broadband under the line-rich LP profile.");
            }
            if (!(result.sky.breakdown.lpSkyTransmissionRatio > 0 && result.sky.breakdown.lpSkyTransmissionRatio < 1)) {
              failures.push("L-Pro spectral transmission ratio was not recorded as a plausible sub-unity LP sky ratio.");
            }
            ["dark-natural", "legacy-sodium-mercury", "mixed-suburban", "led-heavy-urban"].forEach((profileId) => {
              const peakAt = (bortle) => Math.max(...skyDisplaySamples(profileId, bortle).map((sample) => sample.value));
              const b1 = peakAt(1);
              const b5 = peakAt(5);
              const b9 = peakAt(9);
              if (!(b5 > b1 && b9 > b5)) {
                failures.push(`${profileId} preview display does not rise progressively from Bortle 1 to 5 to 9.`);
              }
            });
          }
  
          return {
            id: testCase.id,
            name: testCase.name,
            note: testCase.expected?.note || "",
            result,
            failures,
            passed: failures.length === 0
          };
        });
        return runs;
      }
  
      function renderValidationPanel(validationRuns) {
        if (!appState.debugMode) return "";
        const referenceRuns = validationRuns.filter((run) => /asi2600|common-practice|reference/.test(run.id));
        const regressionRuns = validationRuns.filter((run) => !referenceRuns.includes(run));
        const renderRunCard = (run) => `
          <div class="mini-card">
            <div class="driver-top">
              <strong>${run.name}</strong>
              <span class="confidence-pill ${run.passed ? "high" : "low"}">${run.passed ? "pass" : "fail"}</span>
            </div>
            <div class="small-note" style="margin-bottom:8px">${run.note}</div>
            <div class="assumption-list">
              <div class="assumption"><div class="k">Anchor</div><div class="v">${fmtSeconds(run.result.headlineRecommendation.anchorSec)}</div></div>
              <div class="assumption"><div class="k">Sweet start</div><div class="v">${fmtSeconds(run.result.thresholds.sweetSpotMinSec)}</div></div>
              <div class="assumption"><div class="k">Sweet end</div><div class="v">${fmtSeconds(run.result.thresholds.sweetSpotMaxSec)}</div></div>
              <div class="assumption"><div class="k">Hard max</div><div class="v">${fmtSeconds(run.result.thresholds.hardMaxSec)}</div></div>
            </div>
            ${run.failures.length ? `<div class="warning" style="margin-top:8px">${run.failures.join(" ")}</div>` : `<div class="small-note" style="margin-top:8px">All validation checks passed for this case.</div>`}
          </div>
        `;
        return `
          <section class="card section tab-panel ${appState.activeMainTab === "validation" ? "active" : ""}" data-panel="validation">
            <div class="section-label">Validation</div>
            <div class="small-note" style="margin-bottom:10px">This panel separates two jobs. Regression checks verify that the math remains ordered and stable after tuning. Reference calibration checks compare the tool to accepted-practice neighborhoods so we can judge whether the outputs remain believable to experienced imagers.</div>
            <div class="actions" style="margin-bottom:10px">
              <button type="button" class="ghost" id="rerunValidation">Rerun validation</button>
            </div>
            <div class="mini-card" style="margin-bottom:10px">
              <h3>How To Validate This Tool</h3>
              <div class="small-note">Use regression checks to catch broken math. Use reference calibration cases to compare the operating band against common field practice. The strongest future validation path is to build a library of real datasets with known workable sub lengths, measured sky backgrounds, and observed clipping behavior.</div>
            </div>
            <div class="section-label">Reference Calibration</div>
            <div class="small-note" style="margin-bottom:10px">These cases are intended to answer the practical question: does this recommendation look believable for a known class of setup and usage?</div>
            <div class="cards-2" style="margin-bottom:10px">
              ${referenceRuns.map(renderRunCard).join("")}
            </div>
            <div class="section-label">Regression Checks</div>
            <div class="small-note" style="margin-bottom:10px">These cases are directional and structural checks. They help ensure brighter sky, faster optics, gain changes, and filter width changes all move the model in the expected direction.</div>
            <div class="cards-2">
              ${regressionRuns.map(renderRunCard).join("")}
            </div>
          </section>
        `;
      }
  
      function formulaRow(label, formula, value) {
        return `<div class="assumption"><div class="k">${label}<br><span class="muted">${formula}</span></div><div class="v">${value}</div></div>`;
      }
  
      function renderAppendix(result) {
        const { input, thresholds, derived, sky, sourceScenario, lowerBoundBackground } = result;
        const camera = input.cameraState;
        const sweetCapFraction = getSweetCapFraction(input.filter);
        const backgroundSource = lowerBoundBackground.source === "measured"
          ? `measured background rate ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s from a ${fmtSeconds(lowerBoundBackground.exposureSec)} test frame`
          : `modeled background rate ${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s`;
        const planningSource = input.conditions.skySourceLabel;
        const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const liveExampleResult = result && result.input ? result : evaluateFilter(appState.activeFilterId || DATA.defaults.activeFilterId);
        const exampleResult = liveExampleResult || result;
        const exampleInput = exampleResult.input;
        const exampleThresholds = exampleResult.thresholds;
        const exampleDerived = exampleResult.derived;
        const exampleSky = exampleResult.sky;
        const exampleSourceScenario = exampleResult.sourceScenario;
        const selectedCameraModel = getCamera(input.cameraState.cameraId);
        const selectedCameraProvenance = cameraProvenanceDetails(selectedCameraModel);
        const exampleLowerBoundBackground = exampleResult.lowerBoundBackground;
        const exampleCamera = exampleInput.cameraState;
        const examplePlanningSource = exampleInput.conditions.skySourceLabel;
        const exampleBackgroundSource = exampleLowerBoundBackground.source === "measured"
          ? `measured background rate ${fmtNumber(exampleLowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s from a ${fmtSeconds(exampleLowerBoundBackground.exposureSec)} test frame`
          : `modeled background rate ${fmtNumber(exampleLowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s`;
        const exampleSweetCapFraction = getSweetCapFraction(exampleInput.filter);
        const usingDefaultTeachingExample = !result || !result.input;
        const section = (id, title, body, label = null) => `
          <section class="ap-section" id="${id}">
            <div class="ap-section-head">
              <div class="ap-section-label">${label || `Section ${id.split("-").pop()}`}</div>
              <div class="ap-section-title">${title}</div>
            </div>
            <div class="ap-section-body">${body}</div>
          </section>
        `;
        const methodRow = (name, desc) => `<div class="ap-method-row"><div class="ap-method-name">${name}</div><div class="ap-method-desc">${desc}</div></div>`;
        const formulaBox = (name, eq, note) => `
          <div class="ap-formula">
            <div class="ap-formula-name">${name}</div>
            <div class="ap-formula-eq">${eq}</div>
            <div class="ap-formula-note">${note}</div>
          </div>
        `;
        const refItem = (index, href, title, summary) => `
          <div class="ap-ref-item">
            <a href="${href}" target="_blank" rel="noopener noreferrer">${index}. ${title}</a>
            <div class="ap-ref-summary">${summary}</div>
          </div>
        `;
        const takeaway = (text) => `<div class="ap-takeaway"><strong>Takeaway:</strong> ${text}</div>`;
        const equationBlock = (index, title, lead, display, defs, note) => `
          <div class="ap-eqn-block">
            <div class="ap-eqn-title">${title}</div>
            <div class="ap-eqn-lead">${lead}</div>
            <div class="ap-eqn-display">${display}<span class="eqn-tag">(${index})</span></div>
            <ul class="ap-eqn-defs">
              ${defs.map((item) => `<li><strong>${item[0]}</strong> = ${item[1]}</li>`).join("")}
            </ul>
            ${note ? `<div class="ap-eqn-note">${note}</div>` : ``}
          </div>
        `;
        const figureBlock = (index, title, svg, caption) => `
          <figure class="ap-figure">
            <div class="ap-figure-title">Figure ${index}. ${title}</div>
            <div class="ap-figure-frame">${svg}</div>
            <figcaption class="ap-figure-caption">${caption}</figcaption>
          </figure>
        `;
        const conceptualFigure = figureBlock(
          1,
          "Conceptual exposure regimes",
          `
            <svg viewBox="0 0 980 320" role="img" aria-label="Conceptual exposure regimes">
              <defs>
                <linearGradient id="fig1-rn" x1="0" x2="1"><stop offset="0%" stop-color="#7384b2"/><stop offset="100%" stop-color="#60739a"/></linearGradient>
                <linearGradient id="fig1-floor" x1="0" x2="1"><stop offset="0%" stop-color="#b6c3d0"/><stop offset="100%" stop-color="#93a4b3"/></linearGradient>
                <linearGradient id="fig1-ss" x1="0" x2="1"><stop offset="0%" stop-color="#4ca7d9"/><stop offset="100%" stop-color="#2f8ec4"/></linearGradient>
                <linearGradient id="fig1-op" x1="0" x2="1"><stop offset="0%" stop-color="#64cf8b"/><stop offset="100%" stop-color="#47b76f"/></linearGradient>
                <linearGradient id="fig1-risk" x1="0" x2="1"><stop offset="0%" stop-color="#ddc053"/><stop offset="100%" stop-color="#c6a53a"/></linearGradient>
                <linearGradient id="fig1-hard" x1="0" x2="1"><stop offset="0%" stop-color="#de8754"/><stop offset="100%" stop-color="#cb6633"/></linearGradient>
                <pattern id="fig1-floor-pattern" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(22)">
                  <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,.16)" stroke-width="2"/>
                </pattern>
              </defs>
              <rect x="82" y="88" width="124" height="52" rx="18" fill="url(#fig1-rn)"/>
              <rect x="206" y="88" width="122" height="52" rx="0" fill="url(#fig1-floor)"/>
              <rect x="206" y="88" width="122" height="52" rx="0" fill="url(#fig1-floor-pattern)" opacity=".55"/>
              <rect x="328" y="88" width="102" height="52" rx="0" fill="url(#fig1-ss)"/>
              <rect x="430" y="88" width="244" height="52" rx="0" fill="url(#fig1-op)"/>
              <rect x="674" y="88" width="204" height="52" rx="0" fill="url(#fig1-risk)"/>
              <rect x="878" y="88" width="46" height="52" rx="0" fill="url(#fig1-hard)"/>
              <rect x="82" y="88" width="842" height="52" rx="18" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
              <g font-size="13" fill="#f3fbff" font-weight="700" text-anchor="middle">
                <text x="144" y="119">Read Noise</text>
                <text x="267" y="117">Overhead /</text>
                <text x="267" y="133">Practical Floor</text>
                <text x="379" y="117">Sensor / Shot</text>
                <text x="552" y="119">Practical Operating Band</text>
              </g>
              <g stroke="rgba(255,255,255,.45)" stroke-dasharray="5 5">
                <line x1="206" y1="48" x2="206" y2="88"/>
                <line x1="430" y1="48" x2="430" y2="88"/>
                <line x1="674" y1="48" x2="674" y2="88"/>
                <line x1="924" y1="48" x2="924" y2="88"/>
              </g>
              <g font-size="13" fill="#dfeffc" font-weight="700" text-anchor="middle">
                <text x="206" y="38">lower floor</text>
                <text x="430" y="38">operating-band start</text>
                <text x="674" y="38">operating-band end</text>
                <text x="924" y="38">hard ceiling</text>
              </g>
              <g>
              <rect x="596" y="156" width="248" height="30" rx="15" fill="#ffffff" fill-opacity=".95" stroke="#aeb7c2" stroke-width="1.4"/>
                <circle cx="628" cy="171" r="6.5" fill="url(#fig1-risk)"/>
                <text x="644" y="176" font-size="12.5" fill="#1b2432" font-weight="700">Saturation / Workflow Risk</text>
                <rect x="596" y="196" width="184" height="30" rx="15" fill="#ffffff" fill-opacity=".95" stroke="#aeb7c2" stroke-width="1.4"/>
                <circle cx="628" cy="211" r="6.5" fill="url(#fig1-hard)"/>
                <text x="644" y="216" font-size="12.5" fill="#1b2432" font-weight="700">Hard Ceiling</text>
              </g>
              <g stroke="#8291a3" stroke-width="2.4">
                <line x1="82" y1="246" x2="924" y2="246"/>
              </g>
              <g font-size="13" fill="#bdd0df" font-weight="700">
                <text x="74" y="270">0</text>
                <text x="794" y="270">exposure time</text>
              </g>
            </svg>
          `,
          "This conceptual diagram shows how the tool separates the exposure problem into lower-bound, operating-band, and upper-bound regions. The exact numeric boundaries are system-dependent, but the structure of the problem remains the same."
        );
        const sensitivityFigure = (() => {
          const rnForFigure = Math.max(0.3, thresholds.effectiveReadNoiseE);
          const targets = [10, 5, 2];
          const colors = { 10: "#79c6ff", 5: "#72d69c", 2: "#f1c86a" };
          const bgMin = 0.05;
          const bgMax = 5;
          const x = (b) => 70 + ((b - bgMin) / (bgMax - bgMin)) * 720;
          const values = [];
          targets.forEach((pct) => {
            for (let i = 0; i <= 120; i += 1) {
              const b = bgMin + ((bgMax - bgMin) * i / 120);
              const k = contributionTargetFactor(input.filter, pct);
              values.push((k * rnForFigure * rnForFigure) / b);
            }
          });
          const yMax = Math.max(...values) * 1.05;
          const y = (v) => 200 - (v / yMax) * 150;
          const paths = targets.map((pct) => {
            const k = contributionTargetFactor(input.filter, pct);
            const path = Array.from({ length: 121 }, (_, i) => {
              const b = bgMin + ((bgMax - bgMin) * i / 120);
              const tVal = (k * rnForFigure * rnForFigure) / b;
              return `${i === 0 ? "M" : "L"} ${x(b).toFixed(2)} ${y(tVal).toFixed(2)}`;
            }).join(" ");
            return `<path d="${path}" fill="none" stroke="${colors[pct]}" stroke-width="3"/>`;
          }).join("");
          return figureBlock(
            2,
            "Lower-bound sensitivity to background rate and RN target",
            `
              <svg viewBox="0 0 900 260" role="img" aria-label="Lower-bound sensitivity plot">
                <rect x="70" y="30" width="720" height="170" rx="10" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.08)"/>
                <g stroke="rgba(255,255,255,.08)">
                  ${[0.05,1,2,3,4,5].map((b) => `<line x1="${x(b)}" y1="30" x2="${x(b)}" y2="200"/>`).join("")}
                  ${[0,0.25,0.5,0.75,1].map((f) => {
                    const val = yMax * f;
                    return `<line x1="70" y1="${y(val)}" x2="790" y2="${y(val)}"/>`;
                  }).join("")}
                </g>
                ${paths}
                <g font-size="13" fill="#d6e7f4" font-weight="700">
                  ${[0.05,1,2,3,4,5].map((b) => `<text x="${x(b)}" y="222" text-anchor="middle">${b}</text>`).join("")}
                  ${[0,0.25,0.5,0.75,1].map((f) => {
                    const val = yMax * f;
                    return `<text x="58" y="${y(val)+4}" text-anchor="end">${Math.round(val)}</text>`;
                  }).join("")}
                  <text x="430" y="246" text-anchor="middle">background rate B (e-/px/s)</text>
                  <text x="18" y="120" transform="rotate(-90 18 120)" text-anchor="middle">lower-bound time t<tspan baseline-shift="sub">RN</tspan> (s)</text>
                </g>
                <g font-size="13" font-weight="700">
                  <line x1="620" y1="55" x2="652" y2="55" stroke="${colors[10]}" stroke-width="3"/><text x="662" y="59" fill="#dfeffc">10% target</text>
                  <line x1="620" y1="80" x2="652" y2="80" stroke="${colors[5]}" stroke-width="3"/><text x="662" y="84" fill="#dfeffc">5% target</text>
                  <line x1="620" y1="105" x2="652" y2="105" stroke="${colors[2]}" stroke-width="3"/><text x="662" y="109" fill="#dfeffc">2% target</text>
                </g>
              </svg>
            `,
            `This figure illustrates how the lower-bound threshold shifts with both background rate and the selected read-noise contribution target. Lower targets demand longer exposures, especially when the background is weak. The curves are shown for a fixed representative read noise of ${fmtNumber(rnForFigure, 2)} e-.`
          );
        })();
        const calibrationFigure = figureBlock(
          3,
          "Planning Mode versus Empirical Calibration Mode",
          `
            <svg viewBox="0 0 940 360" role="img" aria-label="Planning mode versus empirical calibration mode schematic">
              <defs>
                <linearGradient id="fig3-left" x1="0" x2="1"><stop offset="0%" stop-color="#346ea2"/><stop offset="100%" stop-color="#285982"/></linearGradient>
                <linearGradient id="fig3-right" x1="0" x2="1"><stop offset="0%" stop-color="#2e8c6b"/><stop offset="100%" stop-color="#256f56"/></linearGradient>
              </defs>
              <rect x="52" y="34" width="328" height="170" rx="16" fill="url(#fig3-left)" stroke="rgba(255,255,255,.14)"/>
              <rect x="560" y="34" width="328" height="170" rx="16" fill="url(#fig3-right)" stroke="rgba(255,255,255,.14)"/>
              <rect x="286" y="258" width="368" height="70" rx="16" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)"/>
              <g font-size="18" font-weight="800" fill="#f6fbff">
                <text x="216" y="72" text-anchor="middle">Planning Mode</text>
                <text x="724" y="72" text-anchor="middle">Empirical Calibration Mode</text>
                <text x="470" y="288" text-anchor="middle">Final recommendation</text>
              </g>
              <g font-size="12.2" fill="#e1eef8">
                <text x="76" y="108">• modeled sky/background assumptions</text>
                <text x="76" y="136">• lower-bound estimate</text>
                <text x="76" y="164">• operating-band and</text>
                <text x="76" y="190">  upper-bound modeling</text>
                <text x="584" y="108">• measured image background</text>
                <text x="584" y="136">  from test frame</text>
                <text x="584" y="164">• stronger lower-bound estimate</text>
                <text x="584" y="190">• operating-band and</text>
                <text x="584" y="216">  upper-bound modeling</text>
                <text x="470" y="312" text-anchor="middle">suggested start · operating band</text>
                <text x="470" y="330" text-anchor="middle">upper warning region</text>
              </g>
              <g stroke="rgba(255,255,255,.34)" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path d="M216 214 L216 238"/>
                <path d="M724 214 L724 238"/>
                <path d="M216 238 L724 238"/>
                <path d="M470 238 L470 258"/>
              </g>
            </svg>
          `,
          "Planning Mode uses modeled assumptions to estimate the lower bound, while Empirical Calibration Mode anchors the lower-bound path to a measured test frame. In both cases, the operating band and upper-bound logic remain partly modeled."
        );
        const noiseConceptFigure = figureBlock(
          4,
          "Where the main noise terms matter",
          `
            <svg viewBox="0 0 920 284" role="img" aria-label="Conceptual noise terms diagram">
              <rect x="24" y="46" width="272" height="152" rx="16" fill="rgba(76,167,217,.16)" stroke="rgba(76,167,217,.34)"/>
              <rect x="324" y="46" width="272" height="152" rx="16" fill="rgba(100,207,139,.16)" stroke="rgba(100,207,139,.34)"/>
              <rect x="624" y="46" width="272" height="152" rx="16" fill="rgba(222,135,84,.16)" stroke="rgba(222,135,84,.34)"/>
              <g font-size="16" font-weight="800" fill="#f6fbff" text-anchor="middle">
                <text x="160" y="82">Read noise</text>
                <text x="460" y="82">Shot noise</text>
                <text x="760" y="82">Thermal noise</text>
              </g>
              <g font-size="11.4" fill="#dfeffc">
                <text x="46" y="114">• strongest in very short subs</text>
                <text x="46" y="140">• strongest when the background rate is low</text>
                <text x="46" y="166">  relative to the readout penalty</text>
                <text x="346" y="114">• unavoidable fluctuation in real counts</text>
                <text x="346" y="140">• includes source and</text>
                <text x="346" y="166">  sky/background terms</text>
                <text x="646" y="114">• matters more when warm, dark,</text>
                <text x="646" y="140">  and long</text>
                <text x="646" y="166">• often secondary in cooled</text>
                <text x="646" y="192">  modern systems</text>
              </g>
            </svg>
          `,
          "This conceptual figure separates the main noise terms by where they usually matter most in practice. The exact boundaries depend on the system and sky, but the roles are different."
        );
        const tradeoffFigure = figureBlock(
          5,
          "Why long enough is not the same as good",
          `
            <svg viewBox="0 0 920 264" role="img" aria-label="Conceptual exposure tradeoff figure">
              <rect x="70" y="48" width="760" height="132" rx="16" fill="rgba(255,255,255,.02)" stroke="rgba(255,255,255,.08)"/>
              <path d="M100 156 C160 96, 210 78, 280 74" fill="none" stroke="#79c6ff" stroke-width="4"/>
              <path d="M280 74 L520 74" fill="none" stroke="#72d69c" stroke-width="4"/>
              <path d="M520 74 C620 78, 700 104, 790 152" fill="none" stroke="#ea6d40" stroke-width="4"/>
              <line x1="280" y1="60" x2="280" y2="180" stroke="rgba(255,255,255,.35)" stroke-dasharray="6 5"/>
              <line x1="520" y1="60" x2="520" y2="180" stroke="rgba(255,255,255,.35)" stroke-dasharray="6 5"/>
              <g font-size="12.6" fill="#eaf4ff" font-weight="700" text-anchor="middle">
                <text x="280" y="42">lower bound</text>
                <text x="520" y="42">upper-side penalties</text>
              </g>
              <g font-size="12.2" fill="#dfeffc" font-weight="700">
                <text x="98" y="204">very short subs</text>
                <text x="332" y="204">preferred working interval</text>
                <text x="636" y="204">increasing headroom /</text>
                <text x="692" y="222">workflow risk</text>
                <text x="706" y="244">exposure time</text>
              </g>
            </svg>
          `,
          "The lower bound answers when the sub is long enough to clear the noise floor. A good working sub also depends on saturation and workflow, so the preferred interval is usually broader than one threshold."
        );
        const tocItems = [
          ["appendix-1", "Purpose and scope"],
          ["appendix-2", "Foundations of sub-exposure choice"],
          ["appendix-3", "Problem framing"],
          ["appendix-4", "How to think about the noise terms"],
          ["appendix-5", "Long enough is not the same as good"],
          ["appendix-6", "Data-source hierarchy"],
          ["appendix-6a", "Optics + Filter Throughput"],
          ["appendix-6b", "Supported models and spectral data"],
          ["appendix-7", "How the regimes map to the problem"],
          ["appendix-8", "Core method"],
          ["appendix-9", "Current system worked example"],
          ["appendix-10", "Empirical calibration workflow"],
          ["appendix-11", "Workflow assumptions"],
          ["appendix-12", "How to use the tool in practice"],
          ["appendix-13", "Interpreting the result"],
          ["appendix-14", "References"]
        ];
        return `
          <section class="tab-panel ${appState.activeMainTab === "appendix" ? "active" : ""}" data-panel="appendix">
            <div class="ap-paper">
              <div class="ap-header">
                <div class="ap-header-top">
                  <div>
                    <div class="ap-kicker">Technical Appendix</div>
                    <div class="ap-title">Astro Exposure Explorer — Methods Paper</div>
                    <div class="ap-subtitle">This appendix documents the current exposure-tradeoff method in a paper-style format. It is meant to do two jobs at once: explain the problem domain, and show the live calculation path used by the current setup.</div>
                    <div class="ap-header-actions">
                      <button type="button" class="ghost" id="exportAppendixPdf">Export Appendix PDF</button>
                    </div>
                  </div>
                  <img class="ap-logo" src="${toolAssetUrl("./assets/logo.png")}" alt="Astro Exposure Explorer logo" />
                </div>
                <div class="ap-meta"><strong>Tool version:</strong> ${currentToolVersion()} &nbsp;·&nbsp; <strong>Generated:</strong> ${today} &nbsp;·&nbsp; <strong>Active filter:</strong> ${input.filter.name} &nbsp;·&nbsp; <strong>Mode:</strong> ${input.calibration.exposureMode === "empirical" ? "Empirical Calibration Mode" : "Planning Mode"}</div>
                <div class="ap-callout">The tool does not present one sacred exposure. It separates the problem into a <strong>lower-bound calibration question</strong>, an <strong>operating-band trade question</strong>, and an <strong>upper-bound saturation/workflow question</strong>. Those are related, but they are not identical.</div>
              </div>
  
              <div class="ap-toc">
                <div class="ap-toc-title">Contents</div>
                <ol>
                  ${tocItems.map(([id, title]) => `<li><a href="#${id}">${title}</a></li>`).join("")}
                </ol>
              </div>
  
              ${section("appendix-1", "Purpose and scope", `
                <p>This appendix explains how the Astro Exposure Explorer builds a sub-exposure recommendation. The tool does not try to produce one universally optimal number. Instead, it separates the problem into a lower-bound calibration question, a practical operating-band recommendation, and an upper-bound constraint question.</p>
                <div class="ap-callout">
                  <div class="ap-subhead" style="margin-top:0">What this tool answers</div>
                  <ul class="ap-bullets">
                    <li><strong>Lower-bound calibration:</strong> how long the exposure must be before read noise falls under the selected contribution target</li>
                    <li><strong>Operating-band recommendation:</strong> where the practical trade between efficiency, headroom, and workflow is most favorable</li>
                    <li><strong>Upper-bound constraint:</strong> where bright-star saturation, sky-pedestal headroom, or workflow penalties begin to dominate</li>
                  </ul>
                </div>
                <div class="ap-callout">
                  <div class="ap-subhead" style="margin-top:0">What this tool is</div>
                  <ul class="ap-bullets">
                    <li>Partly physics-based</li>
                    <li>Partly workflow-tuned</li>
                    <li>Not a universal oracle</li>
                  </ul>
                </div>
                <p>Planning Mode estimates the lower bound from modeled sky/background assumptions. Empirical Calibration Mode strengthens the lower-bound estimate using a measured test frame and, when that calibration is active for a filter, uses that same frame for the sky-pedestal headroom path as well.</p>
                <p>Result panels label this as <strong>Sky source</strong> so you can tell whether the upper-side sky term is being driven by a planning estimate or by a measured test frame.</p>
                <p>The references collected at the end of this appendix are part of that framing. They are not all trying to answer the exact same question, and the method used here was designed with that split in mind.</p>
              `)}
  
              ${section("appendix-2", "Foundations of sub-exposure choice", `
                <div class="ap-subhead">What problem are we actually solving?</div>
                <p>Sub-exposure choice is not one single problem. A lower-bound threshold, a useful working sub length, and a practical upper limit are related, but they are not the same quantity.</p>
                <ul class="ap-bullets">
                  <li><strong>Lower-bound problem:</strong> when is the sub long enough that read noise is no longer too large a fraction of the budget?</li>
                  <li><strong>Operating-band problem:</strong> what working interval balances efficiency, headroom, and convenience?</li>
                  <li><strong>Upper-bound problem:</strong> when do saturation or workflow penalties start to outweigh the benefit of longer subs?</li>
                </ul>
                <div class="ap-subhead">Read noise</div>
                <p>Read noise is the penalty charged each time the camera is read out. Very short subs pay that penalty over and over, so read noise matters most when the sky/background rate per pixel is low and the frame has not yet accumulated much real charge. In practical terms, “background is weak” usually means a darker sky, a narrower filter, lower throughput, or any combination that leaves few background electrons per pixel per second. Modern low-read-noise CMOS cameras shrink this problem, but they do not eliminate it.</p>
                <div class="ap-subhead">Read-noise contribution targets</div>
                <p>The tool expresses the lower-bound choice through a read-noise contribution target. A looser target such as <strong>10%</strong> accepts a larger read-noise share and therefore clears sooner. A middle setting such as <strong>5%</strong> is often a practical default. A tighter target such as <strong>2%</strong> pushes the lower bound longer and is more conservative in weak-background situations.</p>
                <ul class="ap-bullets">
                  <li><strong>10% target:</strong> shorter lower bound, more permissive, often reasonable when simplicity or shorter broadband subs are valued</li>
                  <li><strong>5% target:</strong> middle-ground default and the main planning target used by this tool unless changed</li>
                  <li><strong>2% target:</strong> stricter lower bound, more conservative, more sensitive to dark sky and narrow filters</li>
                </ul>
                <div class="ap-subhead">Shot noise</div>
                <p>Shot noise is the unavoidable statistical fluctuation in the photons or electrons actually collected. It exists in source signal and in sky/background signal. Read noise is paid every frame; shot noise is attached to real collected signal and improves mainly with total integration time. Longer individual subs help only up to the point where read noise and operational overhead are no longer wasting efficiency.</p>
                <p>The tool therefore treats shot noise as part of the lower-bound physics rather than as its own plotted regime. The read-noise criterion asks when accumulated background/source signal is large enough that read noise has become a small contributor. Past that point, the chart switches to practical operating-band and upper-headroom questions instead of drawing a separate shot-noise zone.</p>
                <div class="ap-subhead">Thermal noise / dark current</div>
                <p>Dark current is the thermally generated signal produced even with no incoming light. It matters more when the sensor is warm, the background is very dark, or the exposures are long. In many cooled modern systems it is present but often not the dominant driver under common conditions.</p>
                <div class="ap-subhead">Saturation and headroom</div>
                <p>Longer subs become unattractive when representative bright structures approach saturation or when sky background itself starts consuming too much usable headroom. Protecting bright stars, preserving faint-nebulosity contrast, and keeping processing flexibility are all legitimate reasons to prefer shorter subs than a pure lower-bound argument might suggest.</p>
                <p>The tool does not try to predict the first clipped star. In many real frames, the brightest stars may clip even at sensible exposure lengths. The upper-side bright-star threshold is a saturation caution: it estimates when representative bright-star cores have consumed enough of the modeled full-well capacity that longer subs become less forgiving, more stars begin to clip, and star color or core structure may become harder to recover.</p>
                <div class="ap-subhead">Workflow and operational tradeoffs</div>
                <p>Real imaging is not pure physics. Overhead, dithering, filter changes, autofocus behavior, file-count tolerance, and bad-frame risk all help determine what is operationally sensible. In this tool those factors shape the practical recommendation, not the raw read-noise floor. Sky brightness also matters on the upper side through the sky-pedestal headroom threshold, which asks when accumulated background charge is starting to consume too much usable headroom.</p>
                ${noiseConceptFigure}
                ${takeaway("Good sub-exposure choice is a trade study, not a single threshold. Read noise, shot noise, saturation, and workflow all matter, but they matter in different parts of the problem.")}
              `, "Teaching section")}
  
              ${section("appendix-3", "Problem framing", `
                <p>The tool’s framework is built around one practical split: first clear the lower bound, then identify a useful working interval, then mark where upper-side penalties become dominant. That split is the main reason this appendix separates calibration, recommendation, and warning logic.</p>
                <ul class="ap-bullets">
                  <li>A read-noise-clearing threshold is not the same thing as a good operating sub length</li>
                  <li>A measured background is stronger than a modeled sky estimate for lower-bound calibration</li>
                  <li>Upper-bound and workflow penalties are separate from the lower-bound mechanics, even when sky-pedestal headroom adds a background-driven upper constraint</li>
                  <li>Different references disagree because they solve minimum useful sub length, read-noise threshold, stacked-SNR behavior, or workflow/saturation compromise</li>
                </ul>
                <div class="ap-callout">Disagreement in the literature does not necessarily mean one side is wrong; it often means the authors are solving different exposure questions.</div>
                <div class="ap-subhead">Practical meaning</div>
                <ul class="ap-bullets">
                  <li>The lower bound answers “when is the exposure long enough?”</li>
                  <li>The operating band answers “what is a good working range?”</li>
                  <li>The upper bound answers “when do longer subs stop being attractive?”</li>
                </ul>
                ${conceptualFigure}
                ${takeaway("The lower bound, the operating band, and the upper limit are related but not interchangeable.")}
              `)}
  
              ${section("appendix-4", "How to think about the noise terms", `
                <div class="ap-subhead">When read noise dominates</div>
                <p>Read noise dominates in very short subs and under low-background conditions because too little real charge has been collected before the camera is read out again. The shorter the sub, the more often that fixed penalty is paid.</p>
                <div class="ap-subhead">When shot noise dominates</div>
                <p>Shot noise becomes the more relevant stochastic term once read noise is no longer the main floor. That does not automatically mean the sky is “too bright”; it means the image statistics are now being driven more by real collected signal than by the readout penalty. This is why shot noise belongs in the teaching model, but it is not shown as a separate colored chart zone: it improves mostly by adding total integration time, not by crossing a distinct per-sub exposure threshold.</p>
                <div class="ap-subhead">When thermal noise matters</div>
                <p>Thermal terms matter more with warm sensors, long narrowband subs, or very dark backgrounds. In many cooled systems they remain a secondary contributor compared with sky/background and read-noise effects, but the tool still includes them because some setups really do operate near that edge.</p>
                <div class="ap-subhead">Why none of these alone define the final recommendation</div>
                <p>No single noise term defines the final answer. Noise terms explain the lower-bound side of the problem; saturation and workflow still decide whether a sub is merely long enough or actually convenient and forgiving to use. In brighter skies, background pedestal can become part of that upper-side headroom story too.</p>
                ${takeaway("Noise terms explain why the lower bound exists, but they do not by themselves choose the final working sub length.")}
              `, "Teaching section")}
  
              ${section("appendix-5", "Long enough is not the same as good", `
                <p>“Long enough” usually means the exposure has crossed a lower-bound condition. “Good” is a narrower practical question: what working interval still gives reasonable efficiency while leaving acceptable headroom and operational cost?</p>
                <ul class="ap-bullets">
                  <li><strong>Lower bound:</strong> Have I escaped the read-noise floor enough?</li>
                  <li><strong>Operating band:</strong> What is a practical working interval?</li>
                  <li><strong>Upper bound:</strong> When do penalties outweigh the benefit of longer exposure?</li>
                </ul>
                <p>A practical working sub may be shorter than habit if bright-star saturation or sky-pedestal headroom matters, or longer than a bare lower bound if operational overhead is the bigger pain point.</p>
                ${tradeoffFigure}
                ${takeaway("The tool’s green band is a preferred working interval, not the same thing as the minimum physically useful sub.")}
              `, "Teaching section")}
  
              ${section("appendix-6", "Data-source hierarchy", `
                <p>This section explains why the tool ranks background inputs by evidential strength. The lower-bound side of the recommendation becomes more trustworthy as the background source moves from assumed site conditions toward a measured image-background rate from the actual camera and filter combination.</p>
                <p>That same background input can still matter after the lower bound is cleared. When the sky pedestal rises enough to consume meaningful headroom, it can become its own upper-side caution threshold even before bright stars are the controlling limiter.</p>
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Weakest / most estimated</div>
                    ${methodRow("Location-based sky lookup", `Helps seed Planning Mode quickly. Useful when no measured sky or image data exists. Does not replace measured calibration.`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Better planning input</div>
                    ${methodRow("Measured sky brightness / SQM", `Improves planning assumptions more than a location lookup. Reflects the actual site more directly. Still does not directly measure image-background behavior in the camera/filter system.`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Strongest lower-bound calibration input</div>
                    ${methodRow("Measured image background from a test frame", `Strongest input for calibrating the lower bound. Anchors the recommendation to the actual camera/filter/sky combination. Still does not eliminate upper-bound or workflow modeling.`)}
                  </div>
                </div>
                <p>The lower-bound estimate becomes stronger as the background source becomes more measured and less assumed. The operating-band and upper-bound logic still remain partly modeled.</p>
                <div class="ap-callout">
                  <div class="ap-subhead" style="margin-top:0">Active current-system sources</div>
                  <div class="ap-method-groups">
                    <div class="ap-method-group">
                      ${methodRow("Planning sky source", `<strong>${planningSource}</strong>`)}
                      ${methodRow("Lower-bound source", `<strong>${lowerBoundSourceLabel(result)}</strong>`)}
                      ${methodRow("Moon geometry source", `<strong>${input.conditions.moonGeometrySource === "computed" ? `computed (${input.conditions.darknessState})` : "manual"}</strong>`)}
                      ${methodRow("RN contribution target", `<strong>${contributionTargetLabel(thresholds.readNoiseContributionTargetPct)}</strong>`)}
                    </div>
                  </div>
                </div>
                ${sensitivityFigure}
                ${takeaway("The lower-bound estimate gets stronger as the background source becomes more measured and less assumed, but the operating band and upper constraints still remain partly modeled.")}
              `)}
  
              ${section("appendix-6a", "Optics + Filter Throughput", `
                <p>The model uses an estimated optics/filter throughput term to account for transmission losses before photons reach the sensor. This value represents the cascaded transmission of the optical path, including the telescope, correctors, reducers, flatteners, filters, camera window, and other relevant optical elements where applicable.</p>
                <div class="ap-callout">
                  <div class="ap-subhead" style="margin-top:0">Relationship to sensor QE</div>
                  <p>Optics + filter throughput is separate from sensor quantum efficiency. A good shorthand for the signal model is:</p>
                  <div class="ap-eqn-display">detected electrons ≈ incident photons × optics/filter throughput × sensor QE</div>
                </div>
                <p>Because throughput losses are multiplicative, several individually small losses can produce a noticeably lower combined value. For example:</p>
                <div class="ap-eqn-display">0.98 × 0.98 × 0.97 × 0.95 × 0.90 ≈ 0.80</div>
                <p>This does not imply that the telescope objective alone has poor transmission. It reflects the full modeled photon path.</p>
                <div class="ap-callout">
                  <div class="ap-subhead" style="margin-top:0">Why the default is an estimate</div>
                  <p>For most users, the calculated estimate is preferable to a manual override. True end-to-end throughput is rarely known unless measured or carefully modeled from component-level data.</p>
                </div>
                ${takeaway("The throughput term is a full optical/filter-path estimate before sensor QE, not a telescope-only transmission number.")}
              `)}
  
              ${section("appendix-6b", "Supported models and spectral data", `
                <p>The appendix should also state what the current tool actually knows about. The exposure method is only as good as the camera curves, filter curves, and support assumptions that feed it, so this section documents what “supported” means in the current implementation.</p>
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Camera library currently included</div>
                    <ul class="ap-bullets">
                      <li><strong>Mono CMOS:</strong> ZWO ASI2600MM Pro, ASI533MM Pro, ASI6200MM Pro, ASI1600MM Pro, ASI183MM Pro, ASI294MM Pro, ASI585MM Pro, QHY268M, QHY600M, Player One Poseidon-M Pro, Ares-M Pro, Uranus-M Pro</li>
                      <li><strong>OSC CMOS:</strong> ZWO ASI071MC Pro, ASI2400MC Pro, ASI2600MC Pro, ASI533MC Pro, ASI6200MC Pro, ASI1600MC Pro, ASI183MC Pro, ASI294MC Pro, ASI585MC Pro, QHY071C, QHY268C, Player One Poseidon-C Pro, Artemis-C Pro, Ares-C Pro, Uranus-C Pro</li>
                      <li><strong>Support meaning:</strong> each included camera has a gain-dependent state model for read noise, full well, system gain, dark current, and mode behavior at the selected gain and temperature</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Camera support levels</div>
                    <ul class="ap-bullets">
                      <li><strong>Full-modeled:</strong> the camera maker publishes enough camera-specific material for a comparatively strong planning model</li>
                      <li><strong>Partial:</strong> official operating data is available, but at least one major input such as QE shape uses a compact family curve or interpolated companion curve</li>
                      <li><strong>Generic:</strong> a reference-family model is adapted to a similar sensor/camera class</li>
                      <li><strong>QE policy:</strong> use manufacturer-published camera QE when available; when it is not published, use the generic sensor-family QE curve and mark that provenance clearly</li>
                    </ul>
                    ${methodRow("Current selected camera", `<strong>${camera.cameraName}</strong> · support level <strong>${selectedCameraProvenance.levelLabel}</strong>`)}
                    ${methodRow("Operating data provenance", selectedCameraProvenance.operatingData)}
                    ${methodRow("QE / spectral-response provenance", selectedCameraProvenance.qeSource)}
                    ${methodRow("Interpretation note", selectedCameraProvenance.note)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Filter and set support</div>
                    <ul class="ap-bullets">
                      <li><strong>Mono LRGB sets:</strong> ZWO, Antlia LRGB-V Pro, Chroma, Baader, Astronomik L-1 / L-2 / L-3</li>
                      <li><strong>Mono SHO sets:</strong> Astronomik 4 nm / 6 nm / 12 nm, Chroma 3 nm / 5 nm / 8 nm, Baader 3.5/4 nm and 6.5 nm, ZWO 7 nm, Antlia 3 nm Pro and 4.5 nm EDGE</li>
                      <li><strong>OSC broadband sets:</strong> generic OSC Broadband with UV/IR Cut, plus OSC Broadband / Clear / No UV-IR Cut</li>
                      <li><strong>OSC / dual- and tri-band sets:</strong> Optolong L-eXtreme, L-Ultimate, L-eNhance, Antlia ALP-T 5 nm / 3 nm, Antlia ALP-T 3 nm + 3.5 nm and 5 nm combos, Askar Super D1 / D2 / D1 + D2, IDAS NBZ-II, and Radian Triad Ultra</li>
                      <li><strong>OSC LP / hybrid broadband sets:</strong> Optolong L-Pro and Antlia Triband RGB Ultra II. Triband is treated as provisional LP / hybrid broadband support, not as a trusted OSC narrowband line-isolation model.</li>
                      <li><strong>Support meaning:</strong> the active filter is resolved from a named profile with line family, compatibility, sampled transmission curve, and derived effective bandwidth</li>
                    </ul>
                    ${methodRow("Current selected filter", `<strong>${input.filter.name}</strong> · ${input.filter.bandType} · effective bandwidth <strong>${fmtNumber(input.filter.bandwidthNm, 2)} nm</strong> · reference wavelength <strong>${fmtNumber(input.filter.referenceNm, 1)} nm</strong>`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">OSC Broadband with UV/IR Cut</div>
                    <p>The generic OSC Broadband with UV/IR Cut option represents a broadband color imaging workflow where ultraviolet and near-infrared light are blocked before reaching the sensor. This is distinct from dual-band, tri-band, or narrowband OSC filters.</p>
                    <p>The model treats UV/IR cut as a broadband passband with modest transmission loss and out-of-band blocking. It does not model individual UV/IR-cut filter brands unless the user supplies a custom throughput or filter assumption.</p>
                    <p>This option is intended to represent typical OSC broadband imaging where UV/IR blocking is present either as a separate filter, a built-in camera window, or another equivalent element in the imaging train.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">How the spectral data is represented</div>
                    <p>Filter curves and QE curves are stored as discrete wavelength samples, then interpolated for the wavelengths needed by the model. The ASI071MC Pro and QHY071C entries are compact Sony IMX071-family OSC planning models imported from the current System Comparison catalog; QHY071C intentionally uses the same family proxy because QHY-specific lab QE tables are not stored separately here. Player One Poseidon, Artemis, Ares, and Uranus entries use official Player One operating data for gain, read noise, full well, dynamic range, and dark current, paired with compact Sony-family QE curves where distinct Player One QE tables are not available. The Antlia LRGB-V Pro and 3 nm Pro entries are compact control-point approximations imported from the same catalog; the Chroma 3 nm SHO family now uses that catalog’s denser control points. This is planning-grade spectral support, not laboratory spectrophotometry.</p>
                    <ul class="ap-bullets">
                      <li>Filter transmission is sampled as wavelength/transmission pairs in nm and percent</li>
                      <li>Effective bandwidth is derived from the sampled curve using trapezoidal integration normalized by peak transmission</li>
                      <li>The representative wavelength used by the model is the sampled peak or line-centered wavelength implied by the curve</li>
                      <li>QE normalization is computed from the camera QE table at the filter’s reference wavelength</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Spectral detail panel</div>
                    <p>The in-app Spectral detail panel follows a one-plot, one-question structure adapted from the System Comparison deep dive. It replaces the old habit of stacking every spectral ingredient into one overloaded overlay.</p>
                    <ul class="ap-bullets">
                      <li><strong>Sensor view:</strong> detector response only. Mono shows one QE curve; OSC shows representative red, green, and blue channel-response displays for interpretation.</li>
                      <li><strong>Filter view:</strong> selected filter transmission only. Detector QE and sky background are deliberately excluded.</li>
                      <li><strong>Combined response:</strong> detector response multiplied by the selected filter path. This is the main interpretive acquisition-chain plot.</li>
                      <li><strong>LP support views:</strong> when spectral-sky modeling is relevant, sky and filtered-sky cards show the assumed background separately from sensor and filter response.</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">LP spectral-sky path</div>
                    <p>Bortle class or SQM still controls the overall sky brightness amplitude. The new sky spectral profile controls the wavelength mix of that brightness. For LP-style broadband filters, the tool integrates camera QE, filter transmission, and the selected representative sky spectrum to estimate how much sky background reaches the sensor relative to plain OSC broadband. The same broadband integration path is also used on the target side so LP filters can reduce sky background and target/star continuum separately rather than receiving a hand-written bonus.</p>
                    <p>That does not mean the exposure recommendation captures every reason imagers use LP filters. Many LP-filter benefits are image-quality benefits: less unwanted sky signal, cleaner gradients, better color separation, and an easier final stack. The exposure recommendation changes only when those spectral changes move the modeled sub-length boundaries: read-noise clearance, operational overhead floor, sky-pedestal headroom, saturation caution, or hard ceiling. In many real setups, saturation or workflow still controls the upper side, so a useful LP filter may improve the image more than it changes the suggested sub length.</p>
                    <ul class="ap-bullets">
                      <li><strong>Representative components:</strong> natural continuum, mercury lines, sodium lines, and LED-heavy continuum</li>
                      <li><strong>Representative profiles:</strong> dark natural, legacy sodium / mercury, mixed suburban, and LED-heavy urban, plus Legacy flat sky for compatibility</li>
                      <li><strong>Scope:</strong> this changes the modeled sky-background rate for LP-style broadband filters; it does not claim to know the exact spectrum of the user’s site</li>
                      <li><strong>Recommendation scope:</strong> the tool is LP-aware for exposure length, but it does not attempt to score all final-image benefits of rejecting unwanted light</li>
                      <li><strong>Preview display:</strong> the Sky + Field plot shows effective modeled sky background using the same effective profile logic as the LP calculation path. Bortle affects the displayed height, but that height is compressed for readability and should not be read as a calibrated photometric axis.</li>
                      <li><strong>Caveat:</strong> a small exposure-length shift is not the same thing as a useless filter; it may simply mean the current limiting condition is not the sky-background term the filter improves most</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">What this does and does not mean</div>
                    <ul class="ap-bullets">
                      <li><strong>It does mean:</strong> the tool is using real named filter families and gain-dependent camera behavior rather than generic “red / green / blue / narrowband” placeholders</li>
                      <li><strong>It does not mean:</strong> every curve is a lab-grade high-resolution spectral measurement or that every supported camera has the same evidential strength</li>
                    </ul>
                  </div>
                </div>
                ${takeaway("Support in this tool means the current camera and filter are backed by explicit curve data and derived model terms, but the evidential strength still varies by camera and curve source.")}
              `, "Implementation section")}
  
              ${section("appendix-7", "How the regimes map to the problem", `
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Read Noise Regime</div>
                    <ul class="ap-bullets">
                      <li><strong>Dominant issue:</strong> read noise is still too large a fraction of the budget</li>
                      <li><strong>Practical meaning:</strong> these subs are often too short to be efficient under the current assumptions</li>
                      <li><strong>Not saying:</strong> the image is unusable</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Operational Overhead Floor</div>
                    <ul class="ap-bullets">
                      <li><strong>Dominant issue:</strong> the read-noise criterion has cleared, but short subs still carry too much operational overhead or too little comfort margin</li>
                      <li><strong>Practical meaning:</strong> this is the gap between the calculated lower noise criterion and the preferred working interval</li>
                      <li><strong>Not saying:</strong> shot noise has disappeared or has its own separate plotted boundary</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Practical Operating Band</div>
                    <ul class="ap-bullets">
                      <li><strong>Dominant issue:</strong> balance between lower-floor mechanics, headroom, and workflow is favorable</li>
                      <li><strong>Practical meaning:</strong> best default working region for most users</li>
                      <li><strong>Not saying:</strong> every sub outside it is wrong</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Saturation / Workflow Risk</div>
                    <ul class="ap-bullets">
                      <li><strong>Dominant issue:</strong> longer subs are increasingly penalized by clipping risk or operational cost</li>
                      <li><strong>Practical meaning:</strong> usable but conditional region where bright-star saturation, sky-pedestal headroom, or workflow burden is starting to matter</li>
                      <li><strong>Important nuance:</strong> this does not mean no stars clipped earlier; it marks when clipping risk becomes a material planning tradeoff</li>
                      <li><strong>Not saying:</strong> exposures here are forbidden</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Hard Ceiling</div>
                    <ul class="ap-bullets">
                      <li><strong>Dominant issue:</strong> terminal model cap under the current assumptions</li>
                      <li><strong>Practical meaning:</strong> beyond this point the trade is usually poor</li>
                      <li><strong>Not saying:</strong> this is a universal law outside the model assumptions</li>
                    </ul>
                  </div>
                </div>
                <div class="ap-callout">
                  <div class="ap-subhead" style="margin-top:0">Saturation and workflow tradeoffs</div>
                  <p>Saturation matters because representative bright structures can hit caution or hard limits before other terms fail. Sky-pedestal headroom matters because a bright background can consume usable dynamic range before stars clip. Workflow matters because long subs are more expensive to lose and short subs are more expensive to manage. The tool combines these because all three shape the practical upper side of the recommendation.</p>
                  <p>A user may still choose to operate in the risk region deliberately, but the trade becomes less forgiving.</p>
                </div>
                ${takeaway("The colored regimes are not value judgments by themselves. They map different parts of the exposure problem to different practical questions.")}
              `, "Teaching section")}
  
              ${section("appendix-8", "Core method", `
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Step 1. Resolve camera state</div>
                    <p>The tool first resolves the active camera state at the selected gain/mode. This includes read noise, full well, dark current, and any mode-dependent behavior that changes the response of the sensor.</p>
                    ${methodRow("Resolved state", `read noise <strong>${fmtNumber(thresholds.effectiveReadNoiseE, 2)} e-</strong> · full well <strong>${Math.round(camera.fullWellE)} e-</strong> raw / <strong>${Math.round(thresholds.effectiveFullWellE)} e-</strong> effective · dark current <strong>${fmtNumber(camera.darkCurrentEPerPxPerSec, 4)} e-/px/s</strong>`)}
                    ${equationBlock(
                      1,
                      "Image scale equation",
                      "The image scale converts pixel size and focal length into angular scale on the sky.",
                      `<span><i>s</i> = 206.265 &thinsp; <i>p</i>/<i>f</i></span>`,
                      [
                        ["<i>s</i>", "image scale in arcsec/pixel"],
                        ["<i>p</i>", "pixel size in &mu;m"],
                        ["<i>f</i>", "focal length in mm"]
                      ],
                      "This scale is used to connect seeing, sampling, and per-pixel background behavior."
                    )}
                    ${equationBlock(
                      2,
                      "Seeing footprint equation",
                      "The seeing footprint translates the seeing FWHM into pixel-space blur.",
                      `<span><i>w</i><sub>px</sub> = FWHM<sub>sky</sub> / <i>s</i></span>`,
                      [
                        ["<i>w</i><sub>px</sub>", "seeing footprint in pixels FWHM"],
                        ["FWHM<sub>sky</sub>", "seeing FWHM in arcsec"],
                        ["<i>s</i>", "image scale in arcsec/pixel"]
                      ],
                      "This quantity influences how compact sources spread across pixels and helps shape upper-bound behavior."
                    )}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Step 2. Resolve background source</div>
                    <p>The tool then resolves the background source used for the lower-bound estimate. In Planning Mode this is modeled from sky assumptions. In Empirical Calibration Mode it can be anchored to a measured image background, and the same measured frame can also drive the sky-pedestal headroom term for that calibrated filter.</p>
                    <ul class="ap-bullets">
                      <li><strong>Modeled sky path:</strong> ${planningSource}</li>
                      <li><strong>Measured sky / SQM path:</strong> used to strengthen planning assumptions when selected</li>
                      <li><strong>Measured image-background path:</strong> ${lowerBoundBackground.source === "measured" ? `${fmtNumber(lowerBoundBackground.rateEPerPxPerSec, 4)} e-/px/s from a ${fmtSeconds(lowerBoundBackground.exposureSec)} test frame` : `inactive for the current filter`}</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Step 3. Compute lower bound</div>
                    <p>The lower bound is computed using the active read-noise contribution target. This answers when read noise has fallen below the chosen contribution threshold, not when the final recommended operating sub has been fully determined.</p>
                    ${equationBlock(
                      3,
                      "Lower-bound equation",
                      "The lower-bound threshold follows the selected read-noise contribution target and the active background rate.",
                      `<span><i>t</i><sub>RN</sub> = <i>k</i><sub>RN</sub> &thinsp; RN<sup>2</sup> / <i>B</i></span>`,
                      [
                        ["<i>t</i><sub>RN</sub>", "read-noise floor time in s"],
                        ["<i>k</i><sub>RN</sub>", `coefficient implied by the selected read-noise contribution target (${fmtNumber(thresholds.readNoiseFloorFactor, 2)} in the current case)`],
                        ["RN", "read noise in e<sup>-</sup>"],
                        ["<i>B</i>", "lower-bound background rate in e<sup>-</sup> px<sup>-1</sup> s<sup>-1</sup>"]
                      ],
                      "This is the lower-bound mechanics term. It does not by itself define the final operating recommendation."
                    )}
                    ${equationBlock(
                      4,
                      "Effective lower-floor equation",
                      "The effective lower floor is the larger of the noise floor and any independent operational floor such as overhead or a narrowband practical floor.",
                      `<span><i>t</i><sub>floor</sub> = max(<i>t</i><sub>RN</sub>, <i>t</i><sub>overhead</sub>, <i>t</i><sub>practical</sub>)</span>`,
                      [
                        ["<i>t</i><sub>floor</sub>", "effective lower floor"],
                        ["<i>t</i><sub>RN</sub>", "read-noise floor"],
                        ["<i>t</i><sub>overhead</sub>", "overhead-driven floor"],
                        ["<i>t</i><sub>practical</sub>", "any explicit practical floor used by the model"]
                      ],
                      "This is the boundary below which the recommendation is not allowed to begin."
                    )}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Step 4. Apply practical operating logic</div>
                    <p>The tool then applies practical operating logic. These terms shape the recommended operating band, but they do not redefine the raw lower-bound physics threshold. This is where overhead, capture sequencing, filter-block length, focus handling, and similar operational choices begin to influence the answer; Section 11 spells out those workflow assumptions explicitly.</p>
                    <ul class="ap-bullets">
                      <li>Overhead and efficiency targets</li>
                      <li>Filter-block length when using block capture</li>
                      <li>Capture sequencing and focus handling</li>
                      <li>Convenience penalties and workflow bias</li>
                    </ul>
                    ${equationBlock(
                      5,
                      "Operating-band start equation",
                      "The operating-band start is the first exposure time admitted into the recommended working interval.",
                      `<span><i>t</i><sub>start</sub> = <i>t</i><sub>floor</sub></span>`,
                      [
                        ["<i>t</i><sub>start</sub>", "operating-band start"],
                        ["<i>t</i><sub>floor</sub>", "effective lower floor"]
                      ],
                      "The operating band begins only after the active lower-floor conditions have been cleared."
                    )}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Step 5. Compute upper constraints</div>
                    <p>The upper side is determined from bright-star saturation, sky-pedestal, and workflow constraints. These include the bright-star saturation caution boundary, the sky-pedestal headroom threshold, the hard ceiling, and any workflow cap that closes the band earlier.</p>
                    ${equationBlock(
                      6,
                      "Operating-band end equation",
                      "The operating-band end is set by the earliest upper-side penalty that becomes controlling.",
                      `<span><i>t</i><sub>end</sub> = min(<i>t</i><sub>sat</sub>, <i>t</i><sub>sky</sub>, <i>t</i><sub>workflow</sub>)</span>`,
                      [
                        ["<i>t</i><sub>end</sub>", "operating-band end"],
                        ["<i>t</i><sub>sat</sub>", "bright-star saturation caution threshold"],
                        ["<i>t</i><sub>sky</sub>", "sky-pedestal headroom threshold"],
                        ["<i>t</i><sub>workflow</sub>", "workflow cap, if one is active"]
                      ],
                      "The green band ends at the earliest meaningful upper-side constraint."
                    )}
                    ${equationBlock(
                      7,
                      "Hard-ceiling equation",
                      "The hard ceiling is the terminal recommendation cap under the current assumptions.",
                      `<span><i>t</i><sub>hard</sub> = min(<i>t</i><sub>sat,hard</sub>, <i>t</i><sub>sky,hard</sub>, <i>t</i><sub>workflow,hard</sub>)</span>`,
                      [
                        ["<i>t</i><sub>hard</sub>", "hard ceiling"],
                        ["<i>t</i><sub>sat,hard</sub>", "saturation hard threshold"],
                        ["<i>t</i><sub>sky,hard</sub>", "sky-pedestal hard threshold"],
                        ["<i>t</i><sub>workflow,hard</sub>", "hard workflow cap if present"]
                      ],
                      "This is a model terminal cap, not a claim that longer exposures are universally invalid."
                    )}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Step 6. Synthesize the recommendation</div>
                    <p>The final result is synthesized from the lower bound, the practical operating logic, and the upper constraints. The tool reports a suggested start, an operating band, and where relevant a filter-set planning view.</p>
                    ${equationBlock(
                      8,
                      "Suggested-start equation",
                      "The suggested start is a practical point chosen inside the admitted operating band.",
                      `<span><i>t</i><sub>anchor</sub> = exp[(1 - <i>w</i>) ln(<i>t</i><sub>start</sub>) + <i>w</i> ln(<i>t</i><sub>end</sub>)]</span>`,
                      [
                        ["<i>t</i><sub>anchor</sub>", "suggested starting sub length"],
                        ["<i>w</i>", `the app's band-class anchor weight (${fmtNumber(DATA.constants.anchorBiasByBand[thresholds.bandClass] ?? DATA.constants.anchorBiasByBand.narrowband, 2)} in the current case)`],
                        ["<i>t</i><sub>start</sub>", "operating-band start"],
                        ["<i>t</i><sub>end</sub>", "operating-band end"]
                      ],
                      "This is a suggested starting point inside the band, not a claim that one exact sub length is uniquely optimal."
                    )}
                    ${methodRow("Current synthesized output", `suggested start <strong>${fmtSeconds(result.headlineRecommendation.anchorSec)}</strong> · operating band <strong>${fmtRange(thresholds.sweetSpotMinSec, thresholds.sweetSpotMaxSec)}</strong>`)}
                  </div>
                </div>
                ${takeaway("The recommendation is synthesized from a physics-informed lower bound, a practical operating layer, and upper constraints. Those layers are related, but they are not the same calculation.")}
              `)}
  
              ${section("appendix-9", "Current system worked example", `
                <div class="ap-callout">This section is meant to show how the abstract method becomes a concrete answer: lower-bound logic, operating-band logic, and upper-bound logic all combine to produce the final recommendation. ${usingDefaultTeachingExample ? `Default teaching example (shown because no live active example is currently selected).` : `The example below is generated from the live current state.`}</div>
                <p>This worked example is meant to be read top to bottom. First identify the live system and background state, then audit the lower-bound calculation, then see how the operating band and upper constraints shape the final recommendation.</p>
                <div class="ap-example-summary">
                  <div class="ap-block">
                    <div class="ap-block-title">Lower-Bound Threshold</div>
                    <div class="ap-block-value">${fmtSeconds(exampleThresholds.lowerBoundSec)}</div>
                    <div class="ap-block-note">${exampleResult.synthesis.lowerBoundDrivers[0]?.label || "Lower-floor synthesis"}</div>
                  </div>
                  <div class="ap-block">
                    <div class="ap-block-title">Suggested Start</div>
                    <div class="ap-block-value">${fmtSeconds(exampleResult.headlineRecommendation.anchorSec)}</div>
                    <div class="ap-block-note">Recommended starting point inside the admitted band</div>
                  </div>
                  <div class="ap-block">
                    <div class="ap-block-title">Operating Band</div>
                    <div class="ap-block-value">${fmtRange(exampleThresholds.sweetSpotMinSec, exampleThresholds.sweetSpotMaxSec)}</div>
                    <div class="ap-block-note">Preferred working interval under the active assumptions</div>
                  </div>
                  <div class="ap-block">
                    <div class="ap-block-title">Upper-Side Driver</div>
                    <div class="ap-block-value">${exampleResult.synthesis.upperBoundDrivers[0]?.label || "Upper constraint synthesis"}</div>
                    <div class="ap-block-note">Main factor currently closing or tightening the upper side</div>
                  </div>
                </div>
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Current system inputs</div>
                    ${methodRow("Mode", `<strong>${exampleInput.calibration.exposureMode === "empirical" ? "Empirical Calibration Mode" : "Planning Mode"}</strong>`)}
                    ${methodRow("RN contribution target", `<strong>${contributionTargetLabel(exampleThresholds.readNoiseContributionTargetPct)}</strong>`)}
                    ${methodRow("Camera", `<strong>${exampleCamera.cameraName}</strong>`)}
                    ${methodRow("Filter", `<strong>${exampleInput.filter.name}</strong>`)}
                    ${methodRow("Optics", `<strong>${fmtNumber(exampleInput.optics.apertureMm, 0)} mm</strong> aperture · <strong>${fmtNumber(exampleInput.optics.focalLengthMm, 0)} mm</strong> focal length · <strong>f/${fmtNumber(exampleInput.optics.fRatio, 2)}</strong>`)}
                    ${methodRow("Gain", `<strong>${exampleCamera.gain}</strong>`) }
                    ${methodRow("Cooling / sensor temp", `<strong>${fmtNumber(exampleInput.cameraState.tempC, 0)}°C</strong>`)}
                    ${methodRow("Relevant sky/background inputs", `<strong>${examplePlanningSource}</strong> · target altitude <strong>${fmtNumber(exampleInput.conditions.targetAltitudeDeg, 0)}°</strong> · moon source <strong>${exampleInput.conditions.moonGeometrySource === "computed" ? "computed" : "manual"}</strong>`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Resolved camera/background state</div>
                    ${methodRow("Read noise", `<strong>${fmtNumber(exampleThresholds.effectiveReadNoiseE, 2)} e-</strong>`)}
                    ${methodRow("Full well", `<strong>${Math.round(exampleCamera.fullWellE)} e-</strong> raw / <strong>${Math.round(exampleThresholds.effectiveFullWellE)} e-</strong> effective headroom`)}
                    ${methodRow("Dark current", `<strong>${fmtNumber(exampleCamera.darkCurrentEPerPxPerSec, 4)} e-/px/s</strong>`)}
                    ${methodRow("Background source", `<strong>${exampleBackgroundSource}</strong>`)}
                    ${methodRow("Measured vs modeled state", `<strong>${lowerBoundSourceLabel(exampleResult)}</strong>`)}
                    ${methodRow("Sky-pedestal rate", `<strong>${fmtNumber(exampleThresholds.skyPedestalRateEPerPxPerSec, 4)} e-/px/s</strong>`)}
                    ${methodRow("Representative upper-side assumption", `<strong>${fmtNumber(exampleSourceScenario.representativeStarCoreRateEPerSec, 2)} e-/s</strong> using ${exampleInput.scenarioPreset.label}`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Lower-bound calculation</div>
                    ${methodRow("Rule", `<strong>t_lower_bound = max(t_read_floor, t_overhead_floor${exampleThresholds.practicalFloorSec ? ", t_practical_floor" : ""})</strong>`)}
                    ${methodRow("Substitution", `${fmtNumber(exampleThresholds.readNoiseFloorFactor, 1)} × ${fmtNumber(exampleThresholds.effectiveReadNoiseE, 2)}² / ${fmtNumber(exampleLowerBoundBackground.rateEPerPxPerSec, 4)} = <strong>${fmtNumber(exampleThresholds.readNoiseFloorSec, 1)} s</strong>; overhead floor = <strong>${fmtNumber(exampleThresholds.overheadFloorSec, 1)} s</strong>${exampleThresholds.practicalFloorSec ? `; practical floor = <strong>${fmtNumber(exampleThresholds.practicalFloorSec, 1)} s</strong>` : ""}`)}
                    ${methodRow("Resulting lower-bound threshold", `<strong>${fmtNumber(exampleThresholds.lowerBoundSec, 1)} s</strong>`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Operating-band calculation</div>
                    ${methodRow("Start logic", exampleInput.filter.bandType === "narrowband" ? `max(comfort ${fmtNumber(exampleThresholds.comfortFloorSec, 1)} s, overhead ${fmtNumber(exampleThresholds.overheadFloorSec, 1)} s, practical ${fmtNumber(exampleThresholds.practicalFloorSec, 1)} s)` : `max(comfort ${fmtNumber(exampleThresholds.comfortFloorSec, 1)} s, overhead ${fmtNumber(exampleThresholds.overheadFloorSec, 1)} s)`)}
                    ${methodRow("Operating-band start", `<strong>${fmtNumber(exampleThresholds.sweetSpotMinSec, 1)} s</strong>${Math.abs(exampleThresholds.sweetSpotMinSec - exampleThresholds.lowerBoundSec) < 10 ? `, which is effectively the same as the lower bound.` : ``}`)}
                    ${methodRow("Operating-band end logic", `min(${fmtNumber(exampleSweetCapFraction, 2)} × bright-star saturation caution, sky-pedestal caution, workflow cap)`)}
                    ${methodRow("Operating-band end", `<strong>${fmtNumber(exampleThresholds.sweetSpotMaxSec, 1)} s</strong>${exampleThresholds.workflowMaxSec <= Math.min(exampleSweetCapFraction * exampleThresholds.saturationCautionSec, exampleThresholds.skyPedestalCautionSec) ? `, with workflow closing the band earlier.` : exampleThresholds.skyPedestalCautionSec <= exampleSweetCapFraction * exampleThresholds.saturationCautionSec ? `, with sky-pedestal headroom closing the band earlier.` : ``}`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Upper-bound calculation</div>
                    ${methodRow("Bright-star saturation", `<strong>${fmtNumber(exampleThresholds.saturationCautionSec, 1)} s</strong> from ${fmtNumber(DATA.constants.saturationFractions.caution, 2)} × ${fmtNumber(exampleThresholds.effectiveFullWellE, 0)} e- / ${fmtNumber(exampleSourceScenario.representativeStarCoreRateEPerSec, 2)} e-/s`)}
                    ${methodRow("Sky-pedestal caution", `<strong>${fmtNumber(exampleThresholds.skyPedestalCautionSec, 1)} s</strong> from ${fmtNumber(exampleThresholds.skyPedestalBudgetFraction, 2)} × remaining headroom reserve ${fmtNumber(exampleThresholds.skyHeadroomReserveE, 0)} e- / ${fmtNumber(exampleThresholds.skyPedestalRateEPerPxPerSec, 4)} e-/px/s`)}
                    ${methodRow("Workflow cap", `<strong>${fmtNumber(exampleThresholds.workflowMaxSec, 1)} s</strong>`)}
                    ${methodRow("Hard ceiling", `min(saturation hard ${fmtNumber(exampleThresholds.saturationHardSec, 1)} s, sky-pedestal hard ${fmtNumber(exampleThresholds.skyPedestalHardSec, 1)} s, workflow hard ${fmtNumber(exampleThresholds.workflowHardSec, 1)} s) = <strong>${fmtNumber(exampleThresholds.hardMaxSec, 1)} s</strong>`)}
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Final result</div>
                    ${methodRow("Suggested start", `<strong>${fmtSeconds(exampleResult.headlineRecommendation.anchorSec)}</strong>`)}
                    ${methodRow("Operating band", `<strong>${fmtRange(exampleThresholds.sweetSpotMinSec, exampleThresholds.sweetSpotMaxSec)}</strong>`)}
                    ${methodRow("Dominant lower driver", `<strong>${exampleResult.synthesis.lowerBoundDrivers[0]?.label || "—"}</strong>`)}
                    ${methodRow("Dominant upper driver", `<strong>${exampleResult.synthesis.upperBoundDrivers[0]?.label || "—"}</strong>`)}
                  </div>
                </div>
              `)}
  
              ${section("appendix-10", "Empirical calibration workflow", `
                <p>This mode is intended to strengthen the lower-bound estimate using a measured test frame.</p>
                ${calibrationFigure}
                <ol class="ap-steps">
                  <li>Capture a representative test frame using the same camera, gain, filter, and optical setup you plan to use.</li>
                  <li>Measure the background away from target cores, halos, and obvious gradients.</li>
                  <li>Record whether the background value is raw or already bias/dark-subtracted.</li>
                  <li>Enter the test exposure time and the background measurement type.</li>
                  <li>Apply the selected read-noise contribution target.</li>
                  <li>Recalibrate when gain, filter, or sky state changes materially.</li>
                </ol>
                <div class="ap-callout">Empirical calibration strengthens the lower-bound estimate. It does not eliminate upper-bound or workflow modeling.</div>
                <p>That means a measured test frame can anchor the lower side directly. In the current tool it also anchors the sky-pedestal headroom term for that calibrated filter, so the result does not mix one measured sky with a different estimated sky in the same filter recommendation.</p>
                <div class="ap-subhead">When recalibration matters most</div>
                <ul class="ap-bullets">
                  <li>changing filters materially</li>
                  <li>changing gain/mode</li>
                  <li>large change in moon/sky brightness</li>
                  <li>substantial altitude/extinction change</li>
                  <li>haze/cloud background shift</li>
                </ul>
                ${takeaway("Empirical calibration gives the strongest lower-bound anchor in this tool, but it does not replace the upper-side or workflow model.")}
              `)}
  
              ${section("appendix-11", "Workflow assumptions", `
                <p>Workflow assumptions are included because the tool is trying to recommend a workable exposure, not just document a lower-bound threshold. This section explains how the operational settings connect back to the practical operating band introduced in the core method.</p>
                <div class="ap-callout">Workflow assumptions modify the practical operating recommendation, not the raw read-noise floor.</div>
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Capture sequencing</div>
                    <ul class="ap-bullets">
                      <li><strong>Affects:</strong> filter-switch cost, the effect of block length, and whether per-filter starts or a shared sub length are more practical</li>
                      <li><strong>Does not affect:</strong> the raw lower-bound physics threshold</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Focus handling</div>
                    <ul class="ap-bullets">
                      <li><strong>Affects:</strong> interruption cost and the operational penalty of changing filters</li>
                      <li><strong>Does not affect:</strong> the noise model itself</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Dither policy</div>
                    <ul class="ap-bullets">
                      <li><strong>Affects:</strong> short-sub overhead and capture efficiency</li>
                      <li><strong>Does not affect:</strong> the sensor physics floor</li>
                    </ul>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Operational preference</div>
                    <ul class="ap-bullets">
                      <li><strong>Affects:</strong> convenience bias, file-count bias, and tolerance for longer or shorter practical starts</li>
                      <li><strong>Does not affect:</strong> the measured or modeled lower-bound mechanics</li>
                    </ul>
                  </div>
                </div>
                <p>These settings are meant to model operational overhead and convenience, not sensor physics.</p>
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">Current workflow state</div>
                    ${methodRow("Capture sequencing", `<strong>${captureSequencingLabel(exampleInput.workflow.captureSequencing)}</strong>`)}
                    ${methodRow("Filter block length", `<strong>${exampleInput.workflow.captureSequencing === "filter_blocks" ? `${fmtNumber(exampleInput.workflow.filterBlockLengthSubs, 0)} subs` : "n/a in cycling mode"}</strong>`)}
                    ${methodRow("Focus handling", `<strong>${focusHandlingLabel(exampleInput.workflow.focusHandling, exampleInput.workflow.hasFilterSequencing)}</strong>`)}
                    ${methodRow("Filter switching penalty", `<strong>${exampleInput.workflow.switchingPenalty}</strong>`)}
                    ${methodRow("Current style favors", `<strong>${exampleInput.workflow.favorsSharedExposure}</strong>`)}
                    ${methodRow("Focus interruption cost", `<strong>${exampleInput.workflow.focusInterruptionCost}</strong>`)}
                  </div>
                </div>
                ${takeaway("Workflow settings shape the practical recommendation and capture convenience, but they do not change the raw read-noise threshold.")}
              `)}
  
              ${section("appendix-12", "How to use the tool in practice", `
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If you are just planning</div>
                    <p>Start with Planning Mode. Treat the result as a reasoned initial estimate, and use the green band and suggested start as planning guidance rather than a command.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If you can measure a test frame</div>
                    <p>Use Empirical Calibration Mode. It strengthens the lower-bound side of the recommendation and uses that same measured frame for sky-pedestal headroom on that calibrated filter, while the star-side and workflow-side parts of the upper recommendation still remain modeled.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If your mount or guiding cannot support the suggestion</div>
                    <p>Use the tool as planning guidance, then adapt downward to the real platform limit.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If filters are close enough to simplify</div>
                    <p>It may be reasonable to standardize. The filter-set view is there to show when per-filter starts are materially different and when they are not.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If you care more about faint signal vs bright-star protection</div>
                    <p>Bias shorter if headroom and star protection matter more. Bias longer if overhead and file count matter more and the upper-side penalties remain acceptable.</p>
                  </div>
                </div>
                ${takeaway("Use the tool first as a planning guide, then adapt the answer to the real platform, target, and imaging priorities.")}
              `, "Teaching section")}
  
              ${section("appendix-13", "Interpreting the result", `
                <div class="ap-method-groups">
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If the suggested start is inside the green band</div>
                    <p>Use it as a reasonable starting point, not as a universal optimum.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If accepted-practice subs sit outside the green band</div>
                    <p>That does not automatically mean those subs are wrong. It means the current model places the preferred operating range elsewhere under the selected assumptions.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If filters overlap heavily</div>
                    <p>A shared exposure across the set may be practical.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If bright sky starts closing the upper side</div>
                    <p>That usually means the sky-pedestal headroom threshold is becoming competitive. In that case the background itself is consuming usable headroom, even if bright stars are not yet the first limiting factor.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If changing Bortle or SQM mostly moves the lower side</div>
                    <p>That is normal in Planning Mode because sky brightness is the strongest direct input to the modeled background rate. In Empirical Calibration Mode, filters with a saved measured test frame should move much less because the measured background is also being reused for the sky-pedestal headroom term.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If the operating band is very narrow</div>
                    <p>One or more penalties are strongly constraining the system. The suggestion should be treated as more conditional than usual.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If mount or guiding limits are lower than the suggested start</div>
                    <p>Use the tool as planning guidance, then adapt to the real platform limit.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If you care more about protecting bright stars than maximizing faint signal</div>
                    <p>Bias toward the shorter side of the operating band.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If you care more about minimizing file count or reducing overhead</div>
                    <p>Bias toward the longer side of the operating band, provided upper-risk constraints remain acceptable.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If the suggestion is shorter than common habit</div>
                    <p>That usually means the current model believes the lower floor clears earlier, or that headroom/workflow penalties begin sooner than your usual habit assumes. It is a prompt to compare assumptions, not proof that common practice is wrong.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If the suggestion is longer than common habit</div>
                    <p>That usually means the current background is weak enough that read noise still matters, or that the upper-side penalties remain permissive. In many cases total integration time still matters more than shaving small differences off the sub length.</p>
                  </div>
                  <div class="ap-method-group">
                    <div class="ap-method-group-title">If operating bands overlap across filters</div>
                    <p>Overlap means one shared sub length may be practical. Wide overlap supports simplification; narrow or non-overlapping bands argue more strongly for distinct starts.</p>
                  </div>
                </div>
                ${takeaway("Use the result as planning guidance: the green band is a preferred working interval, not a commandment, and real platform limits still matter.")}
              `)}
  
              ${section("appendix-14", "References", `
                <div class="ap-ref-intro">
                  <div class="ap-subhead" style="margin-top:0">References and context</div>
                  <p>These references do not all solve the same exposure problem. They are included because they illuminate different parts of sub-exposure choice, including read-noise contribution, empirical calibration, stacked-SNR reasoning, and practical workflow tradeoffs. Some are formal frameworks, some are practical calculators, and some are community discussions that expose the edge cases and disagreements.</p>
                </div>
                <div class="ap-ref-list">
                  ${refItem(1, "https://forums.sharpcap.co.uk/viewtopic.php?t=456", "Picking the correct exposure for Deep Sky — Robin Glover / SharpCap forum", "Explains sub-exposure as a diminishing-returns problem, derives the read-noise-squared dependence, and connects exposure choice to a tolerated increase above minimum stack noise.")}
                  ${refItem(2, "https://downloads.sharpcap.co.uk/docs/SharpCapUserManual_v40.pdf", "SharpCap User Manual — Smart Histogram / Brain", "Documents the Smart Histogram workflow: measure sky brightness, choose a read-noise limit, and inspect recommended gain/exposure while accounting for practical limits such as file count, stacking reliability, and background washout.")}
                  ${refItem(3, "https://starizona.com/blogs/tutorials/optimum-exposures", "Optimum Exposures — Starizona", "Broad tutorial on stacked SNR, sky background, object flux, and why an optimal subframe can exist in the first place.")}
                  ${refItem(4, "https://starizona.com/blogs/tutorials/ideal-exposure-calculator", "Ideal Exposure Calculator — Starizona", "Measurement-based calculator that uses a real test exposure, matching dark frame, and measured sky background value to estimate exposure from a chosen read-noise contribution percentage.")}
                  ${refItem(5, "https://www.cloudynights.com/articles/articles/astrophotography/finding-the-optimal-sub-frame-exposure-r1571/", "Finding the Optimal Sub-frame Exposure — Chuck Anstey, Cloudy Nights", "Classic article arguing that simple “overwhelm camera noise with sky noise” rules are incomplete and that target noise and stacked-SNR behavior also matter.")}
                  ${refItem(6, "https://www.cloudynights.com/forums/topic/653744-how-do-you-determine-when-you%E2%80%99ve-swamped-read-noise/", "How do you determine when you’ve swamped read noise? — Cloudy Nights", "Practical forum discussion covering the common 20× background / 5% read-noise rule of thumb and its limits, especially for narrowband or very dark skies.")}
                  ${refItem(7, "https://www.cloudynights.com/forums/topic/716347-sky-background-vs-read-noise-and-exposure-length/", "Sky Background vs Read Noise and Exposure Length — Cloudy Nights", "Useful discussion of the gap between clearing a sky/read-noise threshold and actually optimizing object signal capture.")}
                  ${refItem(8, "https://www.cloudynights.com/forums/topic/938551-snr-and-the-advantages-of-longer-subs/", "SNR and the Advantages of Longer Subs — Cloudy Nights", "Modern CMOS-oriented discussion emphasizing that minimum sub length is set by read noise, but practical penalties shift toward saturation, storage, and processing as read noise falls.")}
                  ${refItem(9, "https://www.cloudynights.com/forums/topic/925209-a-start-on-a-camera-read-and-thermal-noise-calculator-and-a-sky-brightness-model/", "A start on a camera read and thermal noise calculator (and a sky brightness model) — Cloudy Nights", "Advanced discussion showing that target shot noise can matter, especially under dark skies, so a pure sky-background criterion may not fully describe the problem.")}
                  ${refItem(10, "https://www.cloudynights.com/forums/topic/954965-exposure-times-and-signal-to-noise-ratios/", "Exposure times and signal-to-noise ratios — Cloudy Nights", "Recent discussion comparing 20:1, 10:1, and more pragmatic modern views that emphasize equipment limits and saturation once read noise is already under reasonable control.")}
                </div>
              `)}
            </div>
          </section>
        `;
      }
  
      function renderResults() {
        const rawResults = computeAllResults();
        const results = displayResultsForWorkflow(rawResults);
        const workflowMeta = workflowFamilyMeta(workflowFamilyForState(appState));
        sanitizePlanWeightPreset(results);
        if (!appState.validationUnlocked && appState.activeMainTab === "validation") {
          appState.activeMainTab = "recommendation";
        }
        const active = results.find((result) => result.filterId === appState.activeFilterId) || results[0];
        const multiFilterMode = results.length > 1;
        const activeDisplayThresholds = displayThresholdsForResult(active);
        const strictPlanLabel = multiFilterMode
          ? results.map(formatSuggestedStartToken).join(" • ")
          : "";
        const setSpanLabel = multiFilterMode
          ? fmtRange(Math.min(...results.map((result) => result.thresholds.sweetSpotMinSec)), Math.max(...results.map((result) => result.thresholds.sweetSpotMaxSec)))
          : "";
        const workflowDisplay = summarizeWorkflowDisplay(active.input.workflow, results);
        const workflowSummary = workflowDisplay.headline;
        const workflowAdvisory = workflowDisplay.advisory;
        const primaryRecommendationLabel = fmtSeconds(active.headlineRecommendation.anchorSec);
        const primaryRecommendationSub = "Recommended starting point inside the current operating band.";
        const operatingBandTitle = "Operating Band";
        const validationRuns = runValidationSuite();
        const resultsPanel = document.getElementById("resultsPanel");
        const camera = getCamera(appState.cameraId);
        resultsPanel.innerHTML = `
          ${renderMainTabs()}
          ${renderReleaseNotes()}
          <section class="tab-panel ${appState.activeMainTab === "recommendation" ? "active" : ""}" data-panel="recommendation">
            <div class="recommendation-stage">
              <section class="result-banner">
                <div class="result-banner-card primary">
                  <div class="result-banner-k">${multiFilterMode ? workflowMeta.topHeading : workflowMeta.topHeading}</div>
                  <div class="result-banner-v ${multiFilterMode ? "plan" : ""}">${multiFilterMode ? strictPlanLabel : primaryRecommendationLabel}</div>
                  <div class="result-banner-sub">${multiFilterMode ? "Direct computed starts across the active filter set." : primaryRecommendationSub}</div>
                </div>
                <div class="result-banner-card">
                  <div class="result-banner-k">${multiFilterMode ? "Set operating range" : operatingBandTitle}</div>
                  <div class="result-banner-v ${multiFilterMode ? "plan" : ""}">${multiFilterMode ? setSpanLabel : fmtRange(activeDisplayThresholds.sweetSpotMinSec, activeDisplayThresholds.sweetSpotMaxSec)}</div>
                  <div class="result-banner-meta">
                    <div class="result-banner-row">
                      <div class="k">Mode</div>
                      <div class="v">${active.input.calibration.exposureMode === "empirical" ? "Empirical calibration" : "Planning"}</div>
                    </div>
                    <div class="result-banner-row">
                      <div class="k">RN target</div>
                      <div class="v">${contributionTargetLabel(active.thresholds.readNoiseContributionTargetPct)}</div>
                    </div>
                  </div>
                </div>
                <div class="result-banner-card">
                  <div class="result-banner-k">Workflow impact</div>
                  <div class="result-banner-v" style="font-size:1.02rem;line-height:1.15">${workflowSummary}</div>
                  <div class="result-banner-sub">${workflowAdvisory}</div>
                </div>
              </section>
  
              <section class="hero-shell recommendation-hero" id="heroRecommendation">
                ${multiFilterMode ? renderSetPlan(results) : `
                  ${renderExposureZoneBar(active)}
                  <div class="hero-summary-row">
                    <div class="hero-summary-cell"><div class="k">System</div><div class="v">${camera.manufacturer} ${camera.name}</div></div>
                    <div class="hero-summary-cell"><div class="k">Filter</div><div class="v">${active.input.filter.name}</div></div>
                    <div class="hero-summary-cell"><div class="k">Scale</div><div class="v">${fmtNumber(active.derived.imageScaleArcsecPerPx, 2)} arcsec / px</div></div>
                    <div class="hero-summary-cell"><div class="k">Sky</div><div class="v">${fmtNumber(active.derived.skyRateEPerPxPerSec, 3)} e- / px / s</div></div>
                    <div class="hero-summary-cell"><div class="k">Seeing blur</div><div class="v">${fmtNumber(active.derived.seeingPxFwhm, 2)} px FWHM</div></div>
                  </div>
                `}
              </section>
  
              <div class="secondary-stack">
                ${multiFilterMode ? renderSelectedFilterDetail(active) : `
                  <section class="card section section-quiet">
                    <div class="section-label">${workflowMeta.planHeading}</div>
                    ${renderPlanControls([active], { showWeightPreset: false })}
                    <div class="plan-status">${renderPlanStatus([active], contextSummaryLine([active]))}</div>
                  </section>
                  ${renderSelectedFilterDetail(active)}
                `}
              </div>
            </div>
          </section>
          ${renderFaq(active)}
          ${renderAppendix(active)}
          ${appState.validationUnlocked ? renderValidationPanel(validationRuns) : ""}
          <div class="tool-copyright-inline">
            Astro Exposure Explorer © 2026 Patrick A. Cosgrove / Cosgrove’s Cosmos. All rights reserved.
          </div>
        `;
        attachResultEvents();
      }
  
      function syncCameraDependentState() {
        const camera = getCamera(appState.cameraId);
        const availableModes = camera.modes.map((mode) => mode.modeId);
        if (!availableModes.includes(appState.modeId)) {
          appState.modeId = camera.modes[0].modeId;
        }
        const filterSet = isFilterSetCompatibleWithCamera(appState.filterSetId, camera)
          ? DATA.filterSets[appState.filterSetId]
          : resolveFilterSet(defaultFilterSetId(camera), camera);
        appState.filterSetId = filterSet?.id || defaultFilterSetId(camera);
        appState.selectedFilters = normalizeSelectedFilters(camera, appState.selectedFilters);
        if (!appState.selectedFilters.includes(appState.activeFilterId)) {
          appState.activeFilterId = appState.selectedFilters[0];
        }
        if (!appState.selectedFilters.includes(appState.calibrationFilterId)) {
          appState.calibrationFilterId = appState.selectedFilters[0];
        }
        if (!appState.selectedFilters.length && filterSet?.filters?.length) {
          appState.selectedFilters = [...filterSet.filters];
          appState.activeFilterId = filterSet.filters[0];
          appState.calibrationFilterId = filterSet.filters[0];
        }
        if (appState.focusHandling === "refocus_on_degradation") {
          appState.focusHandling = "focus_offsets_monitoring";
        }
        if (!workflowHasFilterSequencing(workflowFamilyForState(appState)) && appState.focusHandling === "refocus_every_change") {
          appState.focusHandling = "focus_offsets_monitoring";
        }
        if (!["low","typical","high","custom"].includes(appState.overheadAssumptionPreset)) {
          appState.overheadAssumptionPreset = "typical";
        }
        if (!["off","every_5","every_3","every_2","every_1"].includes(appState.ditherFrequency)) {
          appState.ditherFrequency = "every_3";
        }
        const derivedWorkflow = deriveWorkflowSettings(appState);
        appState.frameOverheadSec = derivedWorkflow.frameOverheadSec;
        appState.rejectionRiskTolerance = derivedWorkflow.rejectionRiskTolerance;
        appState.subExposureStrategy = derivedWorkflow.subExposureStrategy;
      }
  
      function updateStateFromInputs(changedId) {
        const previousCameraId = appState.cameraId;
        const parseNumber = (id, fallback) => {
          const value = Number(document.getElementById(id)?.value);
          return Number.isFinite(value) ? value : fallback;
        };
        const parseNullableNumber = (id, fallback = null) => {
          const raw = document.getElementById(id)?.value;
          if (raw == null || raw === "") return fallback;
          const value = Number(raw);
          return Number.isFinite(value) ? value : fallback;
        };
        const empiricalFieldIds = new Set([
          "testExposureSec",
          "measuredBackgroundValue",
          "measuredBackgroundUnits",
          "backgroundMeasurementStatus",
          "biasPedestalAdu",
          "trueGainEPerAdu",
          "bitDepthScalingMode",
          "empiricalReadNoiseE",
          "optionalDarkCurrentEPerPxPerSec"
        ]);
        appState.cameraId = document.getElementById("cameraId").value;
        appState.modeId = document.getElementById("modeId")?.value || getCamera(appState.cameraId).modes[0].modeId;
        appState.gain = parseNumber("gain", appState.gain);
        appState.tempC = parseNumber("tempC", appState.tempC);
        appState.apertureMm = parseNumber("apertureMm", appState.apertureMm);
        appState.focalLengthMm = parseNumber("focalLengthMm", appState.focalLengthMm);
        appState.fRatio = parseNumber("fRatio", appState.fRatio);
        if (changedId === "fRatio") {
          appState.focalLengthMm = Math.round(appState.apertureMm * appState.fRatio);
        } else {
          appState.fRatio = Number((appState.focalLengthMm / Math.max(1, appState.apertureMm)).toFixed(2));
        }
        appState.throughputAdvancedOpen = !!document.getElementById("throughputAdvanced")?.open;
        appState.customThroughputOverrideEnabled = !!document.getElementById("customThroughputOverrideEnabled")?.checked;
        const customThroughputRaw = document.getElementById("customThroughputOverridePct")?.value ?? "";
        if (appState.customThroughputOverrideEnabled) {
          const parsedCustomThroughput = Number(customThroughputRaw);
          if (!customThroughputRaw.trim() || !Number.isFinite(parsedCustomThroughput)) {
            appState.throughputOverrideStatus = "Enter a numeric percentage between 30 and 99.";
            appState.throughputOverrideStatusLevel = "error";
          } else if (parsedCustomThroughput < 30 || parsedCustomThroughput > 99) {
            appState.throughputOverrideStatus = "Enter a custom optics + filter throughput between 30% and 99%.";
            appState.throughputOverrideStatusLevel = "error";
          } else {
            appState.customThroughputOverridePct = parsedCustomThroughput;
            appState.throughputOverrideStatus = "";
            appState.throughputOverrideStatusLevel = "neutral";
          }
        } else {
          appState.throughputOverrideStatus = "";
          appState.throughputOverrideStatusLevel = "neutral";
        }
        appState.centralObstructionFrac = clamp(parseNumber("centralObstructionFrac", appState.centralObstructionFrac * 100) / 100, 0, 0.7);
        appState.filterSetId = document.getElementById("filterSetId")?.value || appState.filterSetId;
        if (changedId === "cameraId" && appState.cameraId !== previousCameraId) {
          const nextCamera = getCamera(appState.cameraId);
          appState.modeId = nextCamera.modes[0]?.modeId || appState.modeId;
          appState.gain = recommendedDefaultGain(nextCamera);
          const nextSetId = isFilterSetCompatibleWithCamera(appState.filterSetId, nextCamera)
            ? appState.filterSetId
            : defaultFilterSetId(nextCamera);
          if (nextSetId) appState.filterSetId = nextSetId;
        }
        if (changedId === "filterSetId") {
          const nextSet = resolveFilterSet(appState.filterSetId, getCamera(appState.cameraId));
          appState.selectedFilters = [...(nextSet?.filters || [])];
          appState.activeFilterId = appState.selectedFilters[0] || appState.activeFilterId;
          appState.calibrationFilterId = appState.selectedFilters[0] || appState.calibrationFilterId;
          appState.planName = "";
          appState.planWeightPreset = "equal";
          appState.planWeights = {};
        }
        appState.calibrationFilterId = document.getElementById("calibrationFilterId")?.value || appState.calibrationFilterId;
        appState.skyInputMode = changedId === "skyBrightnessMagPerArcsec2"
          ? "manual"
          : changedId === "sqmMeasurementMagPerArcsec2"
            ? "sqm"
            : changedId === "bortleClass"
              ? "bortle"
              : document.getElementById("skyInputMode").value;
        appState.skyBrightnessMagPerArcsec2 = parseNumber("skyBrightnessMagPerArcsec2", appState.skyBrightnessMagPerArcsec2);
        appState.sqmMeasurementMagPerArcsec2 = parseNumber("sqmMeasurementMagPerArcsec2", appState.sqmMeasurementMagPerArcsec2);
        appState.skySpectralProfileId = normalizeSkyProfileId(document.getElementById("skySpectralProfileId")?.value || appState.skySpectralProfileId);
        appState.locationQuery = document.getElementById("locationQuery")?.value || appState.locationQuery;
        appState.siteLatitudeDeg = parseNumber("siteLatitudeDeg", appState.siteLatitudeDeg);
        appState.siteLongitudeDeg = parseNumber("siteLongitudeDeg", appState.siteLongitudeDeg);
        appState.bortleClass = parseNumber("bortleClass", appState.bortleClass);
        appState.seeingArcsecFwhm = parseNumber("seeingArcsecFwhm", appState.seeingArcsecFwhm);
        appState.planningDateTimeLocal = document.getElementById("planningDateTimeLocal")?.value || appState.planningDateTimeLocal;
        appState.targetRaHours = parseNumber("targetRaHours", appState.targetRaHours);
        appState.targetDecDeg = parseNumber("targetDecDeg", appState.targetDecDeg);
        appState.moonGeometrySource = document.getElementById("moonGeometrySource")?.value || appState.moonGeometrySource;
        appState.targetAltitudeDeg = parseNumber("targetAltitudeDeg", appState.targetAltitudeDeg);
        appState.transparencyFactor = clamp(parseNumber("transparencyFactor", appState.transparencyFactor), 0.4, 1.2);
        appState.fieldPresetId = document.getElementById("fieldPresetId").value;
        appState.moonMode = document.getElementById("moonMode").value;
        appState.moonPreset = document.getElementById("moonPreset").value;
        appState.moonIllumFrac = clamp(parseNumber("moonIllumFrac", appState.moonIllumFrac), 0, 1);
        appState.moonAltitudeDeg = parseNumber("moonAltitudeDeg", appState.moonAltitudeDeg);
        appState.moonSeparationDeg = clamp(parseNumber("moonSeparationDeg", appState.moonSeparationDeg), 0, 180);
        if (appState.moonGeometrySource === "computed" && ["targetAltitudeDeg","moonIllumFrac","moonAltitudeDeg","moonSeparationDeg"].includes(changedId)) {
          appState.computedMoonOverride = true;
        }
        if (["planningDateTimeLocal","siteLatitudeDeg","siteLongitudeDeg","targetRaHours","targetDecDeg","moonGeometrySource"].includes(changedId)) {
          appState.computedMoonOverride = false;
        }
        appState.ditherFrequency = document.getElementById("ditherFrequency")?.value || appState.ditherFrequency;
        const blockPreset = document.getElementById("filterBlockLengthPreset")?.value;
        appState.filterBlockLengthSubs = blockPreset && blockPreset !== "custom"
          ? Number(blockPreset)
          : clamp(parseNumber("filterBlockLengthSubs", appState.filterBlockLengthSubs), 1, 50);
        appState.overheadAssumptionPreset = document.getElementById("overheadAssumptionPreset")?.value || appState.overheadAssumptionPreset || "typical";
        appState.customEventOverheadSec = clamp(parseNumber("customEventOverheadSec", appState.customEventOverheadSec), 0, 120);
        appState.ditherSettleSec = appState.customEventOverheadSec;
        appState.badFrameRiskTolerance = document.getElementById("badFrameRiskTolerance")?.value || appState.badFrameRiskTolerance;
        appState.fileCountPreference = document.getElementById("fileCountPreference")?.value || appState.fileCountPreference;
        appState.customFilterSwitchPenaltySec = parseNullableNumber("customFilterSwitchPenaltySec", null);
        const derivedWorkflow = deriveWorkflowSettings(appState);
        appState.frameOverheadSec = derivedWorkflow.frameOverheadSec;
        appState.rejectionRiskTolerance = derivedWorkflow.rejectionRiskTolerance;
        appState.subExposureStrategy = derivedWorkflow.subExposureStrategy;
        appState.readNoiseContributionTargetPct = parseNumber("readNoiseContributionTargetPct", appState.readNoiseContributionTargetPct);
        appState.testExposureSec = parseNumber("testExposureSec", appState.testExposureSec);
        appState.measuredBackgroundValue = parseNumber("measuredBackgroundValue", appState.measuredBackgroundValue);
        appState.measuredBackgroundUnits = document.getElementById("measuredBackgroundUnits")?.value || appState.measuredBackgroundUnits;
        appState.backgroundMeasurementStatus = document.getElementById("backgroundMeasurementStatus")?.value || appState.backgroundMeasurementStatus;
        appState.biasPedestalAdu = parseNumber("biasPedestalAdu", appState.biasPedestalAdu);
        appState.trueGainEPerAdu = parseNumber("trueGainEPerAdu", appState.trueGainEPerAdu);
        appState.bitDepthScalingMode = document.getElementById("bitDepthScalingMode")?.value || appState.bitDepthScalingMode;
        appState.empiricalReadNoiseE = parseNumber("empiricalReadNoiseE", appState.empiricalReadNoiseE);
        appState.optionalDarkCurrentEPerPxPerSec = parseNullableNumber("optionalDarkCurrentEPerPxPerSec", null);
        if (empiricalFieldIds.has(changedId)) {
          persistActiveFilterCalibration();
        }
        if (changedId) {
          markConfigDirty();
        }
        syncCameraDependentState();
      }
  
      function rerender() {
        syncCameraDependentState();
        syncActiveFilterCalibrationToFlatFields();
        applyComputedGeometryToState(false);
        renderSetupPanel();
        renderResults();
      }
  
      function attachSetupEvents() {
        document.querySelectorAll("[data-setup-toggle]").forEach((button) => {
          button.addEventListener("click", () => {
            const key = button.getAttribute("data-setup-toggle");
            appState[key] = !appState[key];
            rerender();
          });
        });
  
        document.querySelectorAll("#setupPanel input, #setupPanel select").forEach((element) => {
          if (["customThroughputOverrideEnabled", "customThroughputOverridePct"].includes(element.id)) return;
          element.addEventListener("change", () => {
            updateStateFromInputs(element.id);
            rerender();
          });
          if (element.tagName === "INPUT") {
            element.addEventListener("focus", () => {
              if (typeof element.select === "function") element.select();
            });
            element.addEventListener("keydown", (event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                if (element.id === "locationQuery") {
                  updateStateFromInputs("locationQuery");
                  geocodeLocationQuery();
                  return;
                }
                element.blur();
              }
            });
          }
        });
  
        document.querySelectorAll("[data-filter-toggle]").forEach((checkbox) => {
          checkbox.addEventListener("change", (event) => {
            const filterId = event.currentTarget.getAttribute("data-filter-toggle");
            const checked = event.currentTarget.checked;
            if (checked) {
              if (!appState.selectedFilters.includes(filterId)) appState.selectedFilters.push(filterId);
              appState.activeFilterId = filterId;
              if (!appState.calibrationFilterId) appState.calibrationFilterId = filterId;
            } else {
              appState.selectedFilters = appState.selectedFilters.filter((id) => id !== filterId);
              if (!appState.selectedFilters.length) appState.selectedFilters = [filterId];
            }
            markConfigDirty();
            rerender();
          });
        });
  
        document.querySelectorAll("[data-gain-preset]").forEach((button) => {
          button.addEventListener("click", () => {
            appState.gain = Number(button.getAttribute("data-gain-preset"));
            markConfigDirty();
            rerender();
          });
        });
  
        document.querySelectorAll("[data-exposure-mode]").forEach((button) => {
          button.addEventListener("click", () => {
            appState.exposureMode = button.getAttribute("data-exposure-mode");
            markConfigDirty();
            rerender();
          });
        });
  
        document.querySelectorAll("[data-capture-sequencing]").forEach((button) => {
          button.addEventListener("click", () => {
            appState.captureSequencing = button.getAttribute("data-capture-sequencing");
            markConfigDirty();
            rerender();
          });
        });
  
        document.querySelectorAll("[data-focus-handling]").forEach((button) => {
          button.addEventListener("click", () => {
            appState.focusHandling = button.getAttribute("data-focus-handling");
            markConfigDirty();
            rerender();
          });
        });
  
        const lookupButton = document.getElementById("resolveLocation");
        if (lookupButton) lookupButton.addEventListener("click", () => geocodeLocationQuery());
        const locationButton = document.getElementById("useMyLocation");
        if (locationButton) locationButton.addEventListener("click", () => useCurrentLocation());
        const timeButton = document.getElementById("useCurrentDateTime");
        if (timeButton) timeButton.addEventListener("click", () => useCurrentDateTime());
        const throughputAdvanced = document.getElementById("throughputAdvanced");
        if (throughputAdvanced) {
          throughputAdvanced.addEventListener("toggle", () => {
            appState.throughputAdvancedOpen = throughputAdvanced.open;
          });
        }
        const throughputOverrideToggle = document.getElementById("customThroughputOverrideEnabled");
        if (throughputOverrideToggle) {
          throughputOverrideToggle.addEventListener("change", () => {
            appState.customThroughputOverrideEnabled = throughputOverrideToggle.checked;
            appState.throughputAdvancedOpen = true;
            if (throughputOverrideToggle.checked) {
              appState.customThroughputOverridePct = hasValidCustomThroughputPct()
                ? Number(appState.customThroughputOverridePct)
                : Math.round(getCalculatedThroughputFrac() * 100);
            }
            appState.throughputOverrideStatus = "";
            appState.throughputOverrideStatusLevel = "neutral";
            markConfigDirty();
            rerender();
            if (throughputOverrideToggle.checked) {
              requestAnimationFrame(() => {
                const customInput = document.getElementById("customThroughputOverridePct");
                if (customInput) {
                  customInput.focus();
                  if (typeof customInput.select === "function") customInput.select();
                }
              });
            }
          });
        }
        const customThroughputInput = document.getElementById("customThroughputOverridePct");
        if (customThroughputInput) {
          customThroughputInput.addEventListener("input", () => {
            appState.customThroughputOverrideEnabled = true;
            appState.throughputAdvancedOpen = true;
            const raw = customThroughputInput.value.trim();
            if (!raw) {
              appState.throughputOverrideStatus = "Enter a numeric percentage between 30 and 99.";
              appState.throughputOverrideStatusLevel = "error";
            } else {
              const parsed = Number(raw);
              if (!Number.isFinite(parsed)) {
                appState.throughputOverrideStatus = "Enter a numeric percentage between 30 and 99.";
                appState.throughputOverrideStatusLevel = "error";
              } else if (parsed < 30 || parsed > 99) {
                appState.throughputOverrideStatus = "Enter a custom optics + filter throughput between 30% and 99%.";
                appState.throughputOverrideStatusLevel = "error";
              } else {
                appState.customThroughputOverridePct = parsed;
                appState.throughputOverrideStatus = "";
                appState.throughputOverrideStatusLevel = "neutral";
              }
            }
            markConfigDirty();
          });
          customThroughputInput.addEventListener("change", () => {
            updateStateFromInputs("customThroughputOverridePct");
            rerender();
          });
        }
        const resetThroughputButton = document.getElementById("resetThroughputEstimate");
        if (resetThroughputButton) {
          resetThroughputButton.addEventListener("click", () => {
            appState.customThroughputOverrideEnabled = false;
            appState.customThroughputOverridePct = Math.round(getCalculatedThroughputFrac() * 100);
            appState.throughputOverrideStatus = "";
            appState.throughputOverrideStatusLevel = "neutral";
            markConfigDirty();
            rerender();
          });
        }
        const resetComputed = document.getElementById("resetComputedGeometry");
        if (resetComputed) {
          resetComputed.addEventListener("click", () => {
            appState.computedMoonOverride = false;
            applyComputedGeometryToState(true);
            rerender();
          });
        }
  
        document.getElementById("loadMonoExample").addEventListener("click", () => {
          Object.assign(appState, {
            cameraId: "zwo-asi2600mm-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 130,
            focalLengthMm: 910,
            throughputFrac: 0.82,
            customThroughputOverrideEnabled: false,
            customThroughputOverridePct: 82,
            throughputAdvancedOpen: false,
            throughputOverrideStatus: "",
            throughputOverrideStatusLevel: "neutral",
            filterSetId: "narrowband-sho-astronomik-6nm",
            selectedFilters: ["astronomik-ha-6nm", "astronomik-oiii-6nm", "astronomik-sii-6nm"],
            activeFilterId: "astronomik-ha-6nm",
            calibrationFilterId: "astronomik-ha-6nm",
            fRatio: 7,
            skyInputMode: "measured",
            sqmMeasurementMagPerArcsec2: 20.8,
            skyBrightnessMagPerArcsec2: 20.8,
            bortleClass: 4,
            siteLatitudeDeg: 35.3,
            siteLongitudeDeg: -80.7,
            planningDateTimeLocal: new Date().toISOString().slice(0,16),
            targetRaHours: 5.58,
            targetDecDeg: -5.45,
            seeingArcsecFwhm: 2.5,
            targetAltitudeDeg: 70,
            moonMode: "preset",
            moonGeometrySource: "manual",
            moonPreset: "moonless",
            transparencyFactor: 1.0,
            fieldPresetId: "average_field",
            frameOverheadSec: 8,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced",
            exposureMode: "empirical",
            readNoiseContributionTargetPct: 5,
            trueGainEPerAdu: 0.27,
            empiricalReadNoiseE: 0.75,
            optionalDarkCurrentEPerPxPerSec: 0.0008,
            empiricalCalibrationsByFilter: {
              "astronomik-ha-6nm": {
                ...defaultEmpiricalCalibrationRecord(),
                testExposureSec: 120,
                measuredBackgroundValue: 21.6,
                measuredBackgroundUnits: "electrons",
                backgroundMeasurementStatus: "corrected_mean",
                biasPedestalAdu: 0,
                bitDepthScalingMode: "native_1x",
                optionalDarkCurrentEPerPxPerSec: 0.0008,
                captureCameraId: "zwo-asi2600mm-pro",
                captureModeId: "auto",
                captureGain: 100,
                captureTempC: -10,
                captureFilterId: "astronomik-ha-6nm",
                captureFilterName: "Astronomik Ha 6nm"
              }
            }
          });
          syncActiveFilterCalibrationToFlatFields();
          markConfigDirty();
          rerender();
        });
  
        document.getElementById("loadOscExample").addEventListener("click", () => {
          Object.assign(appState, {
            cameraId: "zwo-asi2600mc-pro",
            modeId: "auto",
            gain: 100,
            tempC: -10,
            apertureMm: 80,
            focalLengthMm: 400,
            throughputFrac: 0.84,
            customThroughputOverrideEnabled: false,
            customThroughputOverridePct: 84,
            throughputAdvancedOpen: false,
            throughputOverrideStatus: "",
            throughputOverrideStatusLevel: "neutral",
            filterSetId: "broadband-osc",
            selectedFilters: ["osc-broad"],
            activeFilterId: "osc-broad",
            calibrationFilterId: "osc-broad",
            fRatio: 5,
            skyInputMode: "bortle",
            bortleClass: 5,
            skyBrightnessMagPerArcsec2: 20.4,
            sqmMeasurementMagPerArcsec2: 20.4,
            siteLatitudeDeg: 35.3,
            siteLongitudeDeg: -80.7,
            planningDateTimeLocal: new Date().toISOString().slice(0,16),
            targetRaHours: 5.58,
            targetDecDeg: -5.45,
            seeingArcsecFwhm: 2.8,
            targetAltitudeDeg: 60,
            moonMode: "preset",
            moonGeometrySource: "manual",
            moonPreset: "minor",
            transparencyFactor: 0.95,
            fieldPresetId: "bright_star_field",
            frameOverheadSec: 4,
            rejectionRiskTolerance: "medium",
            saturationTolerance: "medium",
            subExposureStrategy: "balanced",
            exposureMode: "empirical",
            readNoiseContributionTargetPct: 5,
            trueGainEPerAdu: 0.28,
            empiricalReadNoiseE: 1.0,
            optionalDarkCurrentEPerPxPerSec: 0.0008,
            empiricalCalibrationsByFilter: {
              "osc-broad": {
                ...defaultEmpiricalCalibrationRecord(),
                testExposureSec: 90,
                measuredBackgroundValue: 28.5,
                measuredBackgroundUnits: "electrons",
                backgroundMeasurementStatus: "corrected_mean",
                biasPedestalAdu: 0,
                bitDepthScalingMode: "native_1x",
                optionalDarkCurrentEPerPxPerSec: 0.0008,
                captureCameraId: "zwo-asi2600mc-pro",
                captureModeId: "auto",
                captureGain: 100,
                captureTempC: -10,
                captureFilterId: "osc-broad",
                captureFilterName: "OSC Broadband"
              }
            }
          });
          syncActiveFilterCalibrationToFlatFields();
          markConfigDirty();
          rerender();
        });
  
        document.getElementById("resetDefaults").addEventListener("click", () => {
          Object.assign(appState, cloneData(DATA.defaults));
          markConfigDirty();
          rerender();
        });
  
        const saveConfigButton = document.getElementById("saveConfigJson");
        if (saveConfigButton) {
          saveConfigButton.addEventListener("click", () => downloadConfigurationJson());
        }
        const loadConfigButton = document.getElementById("loadConfigJson");
        const configFileInput = document.getElementById("configFileInput");
        if (loadConfigButton && configFileInput) {
          loadConfigButton.addEventListener("click", () => configFileInput.click());
          configFileInput.addEventListener("change", (event) => {
            const file = event.currentTarget.files && event.currentTarget.files[0];
            importConfigurationFile(file);
            event.currentTarget.value = "";
          });
        }
      }
  
      function attachResultEvents() {
        const activeResults = displayResultsForWorkflow(computeAllResults());
        document.querySelectorAll("[data-main-tab]").forEach((button) => {
          button.addEventListener("click", () => {
            appState.activeMainTab = button.getAttribute("data-main-tab");
            renderResults();
          });
        });
        document.querySelectorAll("[data-activate-filter]").forEach((button) => {
          button.addEventListener("click", () => {
            appState.activeFilterId = button.getAttribute("data-activate-filter");
            renderResults();
          });
        });
        const rerun = document.getElementById("rerunValidation");
        if (rerun) {
          rerun.addEventListener("click", () => {
            renderResults();
          });
        }
  
        const planWeightPreset = document.getElementById("planWeightPreset");
        if (planWeightPreset) {
          planWeightPreset.addEventListener("change", () => {
            appState.planWeightPreset = planWeightPreset.value;
            if (appState.planWeightPreset !== "custom") {
              appState.planWeights = {};
            }
            appState.planStatus = `${weightLabelForPreset(appState.planWeightPreset)} applied.`;
            appState.planStatusLevel = "success";
            renderResults();
          });
        }
        const copyPlanButton = document.getElementById("copyPlanSummary");
        if (copyPlanButton) {
          copyPlanButton.addEventListener("click", async () => {
            appState.planName = effectivePlanName(activeResults);
            const summary = buildPlanExportText(activeResults);
            const copied = await copyTextToClipboard(summary);
            if (copied) {
              appState.planStatus = "Plan summary copied to clipboard.";
              appState.planStatusLevel = "success";
            } else {
              appState.planStatus = "Clipboard copy failed. Use Export Plan Summary if this browser blocks copy.";
              appState.planStatusLevel = "error";
            }
            renderResults();
          });
        }
        const exportPlanButton = document.getElementById("exportPlanSummary");
        if (exportPlanButton) {
          exportPlanButton.addEventListener("click", () => {
            appState.planName = effectivePlanName(activeResults);
            const safeName = (appState.planName || "exposure-plan").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
            downloadTextFile(buildPlanExportText(activeResults), `${safeName || "exposure-plan"}.txt`);
            appState.planStatus = "Plan summary exported as a text download.";
            appState.planStatusLevel = "success";
            renderResults();
          });
        }
        const exportPlanJsonButton = document.getElementById("exportPlanJson");
        if (exportPlanJsonButton) {
          exportPlanJsonButton.addEventListener("click", () => {
            appState.planName = effectivePlanName(activeResults);
            const safeName = (appState.planName || "exposure-plan").replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase();
            try {
              downloadTextFile(
                JSON.stringify(buildPlanExportPayload(activeResults), null, 2),
                `${safeName || "exposure-plan"}.json`,
                "application/json"
              );
              appState.planStatus = "Plan summary exported as a JSON download.";
              appState.planStatusLevel = "success";
            } catch (error) {
              appState.planStatus = "Plan JSON export failed.";
              appState.planStatusLevel = "error";
            }
            renderResults();
          });
        }
        const copyHeroButton = document.getElementById("copyHeroGraphic");
        if (copyHeroButton) {
          copyHeroButton.addEventListener("click", async () => {
            try {
              if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
                throw new Error("Image clipboard is unavailable.");
              }
              const blob = await renderHeroGraphicBlob(activeResults);
              await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
              appState.planStatus = "Hero graphic copied to clipboard.";
              appState.planStatusLevel = "success";
            } catch (error) {
              appState.planStatus = "Hero graphic copy is not supported in this browser. Use Export Hero Graphic (PNG).";
              appState.planStatusLevel = "error";
            }
            renderResults();
          });
        }
        const exportHeroButton = document.getElementById("exportHeroGraphic");
        if (exportHeroButton) {
          exportHeroButton.addEventListener("click", async () => {
            try {
              const blob = await renderHeroGraphicBlob(activeResults);
              downloadBlob(blob, buildHeroExportFileName(activeResults));
              appState.planStatus = "Hero graphic exported as a PNG download.";
              appState.planStatusLevel = "success";
            } catch (error) {
              appState.planStatus = "Hero graphic export failed.";
              appState.planStatusLevel = "error";
            }
            renderResults();
          });
        }
        const exportAppendixButton = document.getElementById("exportAppendixPdf");
        if (exportAppendixButton) {
          exportAppendixButton.addEventListener("click", () => {
            exportAppendixPdf();
          });
        }
  
        const logo = document.querySelector(".hero-logo");
        if (logo && !logo.dataset.validationUnlockBound) {
          logo.dataset.validationUnlockBound = "true";
          logo.addEventListener("click", () => {
            if (appState.validationUnlocked) return;
            appState.validationClickCount = (appState.validationClickCount || 0) + 1;
            if (appState.validationClickCount >= 5) {
              appState.validationUnlocked = true;
              appState.planStatus = "Validation unlocked.";
              appState.planStatusLevel = "success";
              renderResults();
            }
          });
        }
      }
  
      globalThis.ExposureTradeoffExplorer = {
        DATA,
        appState,
        buildEngineInput,
        evaluateFilter,
        computeAllResults,
        runValidationSuite,
        rerender
      };
  
      rerender();
  
})();
