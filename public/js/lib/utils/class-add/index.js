/* Adds one or many class names to a single Element.
 * @argument el <required> [HTMLElement, NodeList] Element(s) to add the class(es).
 * @argument classNames <required> [String] One or more space-separated classes to be added to the class attribute of each matched element.
 * @usage addClass(document.body, 'a b c');                 // one element, many class names
 * @usage addClass(document.querySelectorAll('a'), 'link'); // many elements, one class name
 */
var _re = new RegExp(/\s/);

module.exports = function addClass(el, classNames) {
    if (el.classList) {
        return classNames.split(_re).forEach(function(className) {
            el.classList.add(className);
        });
    }

    el.className += ' ' + classNames;
};
