(function () {
  "use strict";

  function loadPlotly(callback) {
    if (window.Plotly) {
      callback();
      return;
    }

    var script = document.querySelector("script[data-plotly]");
    if (!script) {
      script = document.createElement("script");
      script.src = "https://cdn.plot.ly/plotly-2.35.2.min.js";
      script.dataset.plotly = "true";
      script.onload = callback;
      document.head.appendChild(script);
      return;
    }

    script.addEventListener("load", callback, { once: true });
  }

  function setupPlot(container) {
    if (container.dataset.initialized === "true") return;
    container.dataset.initialized = "true";

    var canvas = container.querySelector(".plot-canvas");
    var sliders = container.querySelectorAll(".plot-slider");

    function draw() {
      var omega = Number(container.dataset.omega);
      var damping = Number(container.dataset.damping);
      var x = [];
      var y = [];

      for (var i = 0; i <= 240; i++) {
        var time = i / 20;
        x.push(time);
        y.push(
          Math.exp(-damping * time) *
          Math.cos(Math.sqrt(Math.max(0, omega * omega - damping * damping)) * time)
        );
      }

      window.Plotly.react(canvas, [{
        x: x,
        y: y,
        mode: "lines",
        line: { width: 3, color: "#5f8dd3" },
        name: "displacement"
      }], {
        margin: { l: 55, r: 20, t: 20, b: 45 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        font: { color: "#d8dee9" },
        xaxis: {
          title: "Time",
          gridcolor: "#3b4252",
          zerolinecolor: "#4c566a"
        },
        yaxis: {
          title: "Displacement",
          gridcolor: "#3b4252",
          zerolinecolor: "#4c566a"
        }
      }, {
        responsive: true,
        displayModeBar: false
      });
    }

    sliders.forEach(function (slider) {
      slider.addEventListener("input", function () {
        var control = slider.dataset.control;
        container.dataset[control] = slider.value;
        var output = container.querySelector('[data-output="' + control + '"]');
        if (output) output.value = slider.value;
        draw();
      });
    });

    draw();
  }

  function initialize() {
    var plots = document.querySelectorAll(".interactive-plot");
    if (!plots.length) return;

    loadPlotly(function () {
      plots.forEach(setupPlot);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}());
