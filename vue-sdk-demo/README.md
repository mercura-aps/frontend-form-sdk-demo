# vue-sdk-demo

This is a demo project for the Mercura Frontend SDK.

## Setup

### Install dependencies

#### Using Bun

Copy `.env.example` to `.env` and fill in the values for `NPM_USER` and `NPM_PASS` with your Verdaccio credentials.

Then install the dependencies:

```bash
bun install
```

#### Using npm

Login to Verdaccio:

```bash
npm login --registry=https://npm.pkg.mercura.io/
```

Fill in your username and password.

Then install the dependencies:

```bash
npm install --registry=https://npm.pkg.mercura.io/
```

### Setup proxy

Copy `.env.example` to `.env` and fill in the value for `VITE_TARGET`.

You can use our demo config panel: [https://demo.mercura.io/](https://demo.mercura.io/),
which doesn’t require any authentication.

If you want to authenticate, you can log in to [https://demo.mercura.io/](https://demo.mercura.io/) and then copy the cookie called `config_session`.
Paste it into the `.env` file under the `VITE_COOKIE` field.

![cookie](/vue-sdk-demo/readme-assets/cookie.png)

### Start development server

```bash
bun run dev
```

or

```bash
npm run dev
```

## Dependencies

This project uses the following dependencies:

- `@mercura-aps/frontend-form-sdk` (the SDK itself)

And the SDK’s peer dependencies:

- `@mercura-aps/frontend-schemas` (Zod schemas used by the SDK)
- `@tanstack/query-core` (for data fetching and caching)
- `zod` (for validation)
- `zustand` (for state management)

## Quick start

### 1. Running the demo

To follow this guide, you can execute the development server as explained in the [Start development server](#start-development-server) section.

The following steps will guide you through the different parts of the application and indicate where in the codebase you can find the implementation of each feature being explained.

### 2. Navigate by categories

The SDK provides two navigation strategies for browsing categories:

#### Breadcrumb strategy

![breadcrumb](/vue-sdk-demo/readme-assets/breadcrumbs-categories.png)

File: `vue-sdk-demo/src/components/FormSelectionBreadcrumb.vue`

**How it works:**

- The `currentCategory` represents the currently selected category in the navigation path.
- Categories can have **recursive subcategories**, forming a tree structure (e.g., Electronics → Computers → Laptops).
- The `shouldShowForms` flag determines what to display:
  - If `true`: the category is a **leaf node** (no subcategories) → displays available forms.
  - If `false`: the category has **subcategories** → displays them as navigation buttons.

- The breadcrumb shows the full path from the root to the current category, allowing users to navigate back up the tree.

#### Filter strategy

![filter](/vue-sdk-demo/readme-assets/filter-categories.png)

File: `vue-sdk-demo/src/components/FormSelectionFilter.vue`

**How it works:**

- Displays all subcategory levels horizontally as filters.
- Each level shows the available subcategories at that depth.
- Clicking a category updates the `categoriesPath` and shows the next level of subcategories.
- The "All" option allows resetting to show all categories.
- Always shows the forms for the current level of the category tree.

### 3. Create a new config

![form-card](/vue-sdk-demo/readme-assets/form-card.png)

File: `vue-sdk-demo/src/components/FormCards.vue`

**What happens when you click on a form card:**

1. A new **config** is created with a unique ID.
2. The SDK automatically generates:
   - A **form configuration entry** (skeleton with steps, groups, and element structures)
   - A **values entry** (stores user input for each element and constraint selections)

**Accessing the config data:**

Once a config is created, you can access its data using these SDK hooks:

```ts
// Access form configuration (steps, messages, validation, etc.)
const currentStep = useFormByCurrentConfigId((state) => state.currentStep)
const steps = useFormByCurrentConfigId((state) => state.steps)
const messages = useFormByCurrentConfigId((state) => state.messages)

// Access and modify form values (user input)
const values = useValuesByCurrentConfigId((state) => state.values)
const handleChangeInput = useValuesByCurrentConfigId((state) => state.handleChangeInput)
```

The `useFormByCurrentConfigId` and `useValuesByCurrentConfigId` hooks automatically track the currently active config,
so you always work with the correct data without manually passing IDs around.

However, you need to manually set the current config ID.
You can do this using the `useConfigs` hook:

```ts
const route = useRoute()
const setCurrentConfigId = useConfigs((state) => state.setCurrentConfigId)

watch(
  () => route.params.configId,
  (newConfigId) => {
    if (!newConfigId) {
      setCurrentConfigId.value(-1)
      return
    }
    setCurrentConfigId.value(Number(newConfigId))
  },
  { immediate: true },
)

onUnmounted(() => {
  setCurrentConfigId.value(-1)
})
```

### 4. Navigate through the form

![form](/vue-sdk-demo/readme-assets/form.png)

File: `vue-sdk-demo/src/pages/ConfigComponent.vue`

**Parts of the form:**

- The `steps` array contains the steps of the form.
  Steps are groups or first-level elements of the form.

![config-panel-steps](/vue-sdk-demo/readme-assets/config-panel-steps.png)

- The `currentProgress` is the index of the current step.
- The `currentStep` is the current step.
- The `stepsAvailability` array indicates whether each step can be clicked.
  - It’s a helper to determine if the step can be clicked and become the `currentStep`.

- The `setCurrentProgress` function is used to update the current progress.

### 5. Submit the form

File: `vue-sdk-demo/src/pages/CheckoutComponent.vue`

#### Contact details

![contact-details](/vue-sdk-demo/readme-assets/contact-details.png)

**How it works:**

- The `requestFields` array contains the request fields of the form.
- The `requestFieldsValues` array contains the values of the request fields.
- The `requestFieldsErrors` array contains the errors of the request fields.
- The `fixedContactDetails` array contains the fixed contact details of the form.
- The `setFixedContactDetailsValue` function is used to set the value of a fixed contact detail.
- The `setSubFieldValue` function is used to set the value of a subfield.

#### BoM

![bom](/vue-sdk-demo/readme-assets/bom.png)

**How it works:**

- The `finishedConfigs` array contains the finished configs, combining the skeleton with the values.
  It only includes the selected elements of the form.

#### Submit

We provide a submit function that maps the data to the correct format before sending it to the backend.
