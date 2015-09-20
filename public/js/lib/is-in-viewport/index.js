/**
 * Reply if an element is in the page viewport
 *
 * @param  {object} el Element to observe
 * @param  {object} parent  Scrollable scope
 * @param  {number} h  Percentage of height
 * @return {boolean}
 */
module.exports = function isInViewport(el, parent, h) {
    var scrolled = (parent.scrollTop || parent.pageYOffset || (parent.documentElement && parent.documentElement.scrollTop)),
    viewed       = scrolled + (parent.clientHeight || parent.innerHeight),
    elBCR        = el.getBoundingClientRect(),
    elHeight     = elBCR.height,
    elTop        = scrolled + elBCR.top,
    elBottom     = elTop + elHeight;

    // if 0, the element is considered in the viewport as soon as it enters.
    // if 1, the element is considered in the viewport only when it's fully inside
    // value in percentage (1 >= h >= 0)
    h = h || 0;

    return (elTop + elHeight * h) <= viewed && (elBottom) >= scrolled;
};
