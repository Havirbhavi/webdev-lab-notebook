### Issue #1: Semantic HTML and Accessibility

The issue, why this is an issue, and the solution:

The website uses anchor elements as buttons for actions like opening more information and loading new cat facts. Anchor tags should normally be used for navigation with an `href` attribute. In this code, the elements do not navigate anywhere. Instead, JavaScript uses them as clickable buttons.

This is an issue because assistive technologies and keyboard users expect links to navigate to another page or section. Since these controls perform an action on the same page, the semantic HTML element should be a `button`.

Initial code:

```html
<a class="more-info-button">More Info</a>

<a class="reload-cat-facts">Load New Cats Facts</a>
```

Updated code:

```html
<button class="more-info-button">More Info</button>

<button class="reload-cat-facts">Load New Cats Facts</button>
```

### Issue #2: Form Labels Are Not Properly Connected to Inputs

The issue, why this is an issue, and the solution:

The form uses `<span>` elements to display labels for the Name, Username, Email, and Phone Number fields. Even though the inputs have `id` attributes, the visible label text is not connected to the input using a real `<label>` element.

This is an issue because screen readers and assistive technologies need proper label-input connections to describe each form field correctly. A real `<label>` with a matching `for` attribute also improves usability because clicking the label focuses the related input field.

Initial code:

```html
<span class="form-label">Name</span>
<input
  aria-label="name"
  class="form-input-box"
  type="text"
  id="name"
  name="name"
/>
```

Updated code:

```html
<label class="form-label" for="name">Name</label>
<input class="form-input-box" type="text" id="name" name="name" />
```

This same fix should also be applied to the Username, Email, and Phone Number fields by replacing their `<span>` labels with proper `<label>` elements that use matching `for` attributes.

### Issue #3: Submit and Reset Buttons Are Outside the Form

The issue, why this is an issue, and the solution:

The form is closed before the submit and reset buttons. This means the buttons are not actually inside the form element, even though they are visually part of the form section.

This is an issue because submit and reset buttons should be associated with the form they control. In the current page, both the submit and reset buttons do not work correctly because they are placed outside the `<form>` element.

Initial code:

```html
</form>
<div
  class="form space-evenly-distributed-row-container form-buttons-container"
>
  <input class="form-button" type="submit" value="submit" />
  <input class="form-button" type="reset" value="reset" />
</div>
```

Updated code:

```html
<div
  class="space-evenly-distributed-row-container form-buttons-container"
>
  <input class="form-button" type="submit" value="submit" />
  <input class="form-button" type="reset" value="reset" />
</div>
</form>
```

The button container should be moved before the closing `</form>` tag so both buttons belong to the form.

### Issue #4: Loading Container Class Is Replaced

The issue, why this is an issue, and the solution:

In the `fetchCatFacts()` function, the code hides the loading container by replacing the entire `class` attribute with `display-none`.

Initial code:

```js
const loading = document.querySelector(".loading-container");
loading.setAttribute("class", "display-none");
```

This is an issue because the original `loading-container` class gets removed. After this happens, future JavaScript code that tries to find `.loading-container` may not find the element anymore. This can break the reload behavior for the cat facts section.

Updated code:

```js
const loading = document.querySelector(".loading-container");
loading.classList.add("display-none");
```

Using `classList.add()` keeps the original `loading-container` class and only adds the `display-none` class.
