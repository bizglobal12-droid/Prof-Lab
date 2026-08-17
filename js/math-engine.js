/* ==========================================================================
   PROFESSOR LIBRARY - MATHEMATICAL ENGINE & ENGINEERING UTILITIES
   File: js/math-engine.js
   ========================================================================== */

// MathJax Configuration (Configures LaTeX rendering options)
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
  },
  startup: {
    pageReady: () => {
      return MathJax.startup.defaultPageReady().then(() => {
        document.body.classList.add('mathjax-rendered');
      });
    }
  }
};

/**
 * Mechanical Engineering Math Engine Namespace
 */
const MathEngine = {

  /**
   * Re-renders MathJax equations dynamically if new content is loaded
   */
  refreshTypesetting: function () {
    if (window.MathJax && window.MathJax.typesetPromise) {
      window.MathJax.typesetPromise().catch((err) => {
        console.error("MathJax typesetting failed: ", err);
      });
    }
  },

  /**
   * Calculates the Resultant Force (R) of two concurrent forces
   */
  calculateResultantForce: function (p, q, angleDegrees) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const resultant = Math.sqrt(
      Math.pow(p, 2) +
      Math.pow(q, 2) +
      (2 * p * q * Math.cos(angleRadians))
    );
    return parseFloat(resultant.toFixed(2));
  },

  /**
   * Calculates Direction Angle (alpha) of Resultant Force with respect to Force P
   */
  calculateResultantDirection: function (p, q, angleDegrees) {
    const angleRadians = (angleDegrees * Math.PI) / 180;
    const numerator = q * Math.sin(angleRadians);
    const denominator = p + (q * Math.cos(angleRadians));
    const alphaRadians = Math.atan2(numerator, denominator);
    const alphaDegrees = (alphaRadians * 180) / Math.PI;
    return parseFloat(alphaDegrees.toFixed(2));
  },

  /**
   * Calculates Tensile/Compressive Direct Stress (sigma = Force / Area)
   */
  calculateStress: function (force, area) {
    if (area === 0) throw new Error("Area cannot be zero.");
    return force / area;
  },

  /**
   * Calculates Strain (epsilon = delta_L / L)
   */
  calculateStrain: function (extension, originalLength) {
    if (originalLength === 0) throw new Error("Original length cannot be zero.");
    return extension / originalLength;
  }
};
