/* ==========================================================================
   PROFESSOR LIBRARY - MATHEMATICAL ENGINE & ENGINEERING UTILITIES
   File: js/math-engine.js
   ========================================================================== */

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
     * R = sqrt(P^2 + Q^2 + 2 * P * Q * cos(theta))
     * @param {number} p - Magnitude of force P (in N or kN)
     * @param {number} q - Magnitude of force Q (in N or kN)
     * @param {number} angleDegrees - Included angle in degrees
     * @returns {number} Resultant force magnitude
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
     * tan(alpha) = (Q * sin(theta)) / (P + Q * cos(theta))
     * @param {number} p - Magnitude of force P
     * @param {number} q - Magnitude of force Q
     * @param {number} angleDegrees - Angle between P and Q in degrees
     * @returns {number} Direction angle in degrees
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
     * @param {number} force - Applied load in Newtons (N)
     * @param {number} area - Cross-sectional area in m^2
     * @returns {number} Stress in Pascals (Pa)
     */
    calculateStress: function (force, area) {
        if (area === 0) throw new Error("Area cannot be zero.");
        return force / area;
    },

    /**
     * Calculates Strain (epsilon = delta_L / L)
     * @param {number} extension - Change in length (delta_L)
     * @param {number} originalLength - Original length (L)
     * @returns {number} Dimensionless strain value
     */
    calculateStrain: function (extension, originalLength) {
        if (originalLength === 0) throw new Error("Original length cannot be zero.");
        return extension / originalLength;
    }
};

// Initialize engine on DOM load
document.addEventListener("DOMContentLoaded", () => {
    MathEngine.refreshTypesetting();
});
