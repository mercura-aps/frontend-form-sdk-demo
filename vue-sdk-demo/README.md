# vue-sdk-demo

This is a demo project for the Mercura Frontend SDK.

## Setup

### Install dependencies

#### Using bun:

copy .env.example to .env and fill in the values for `NPM_USER` and `NPM_PASS` with the Verdaccio credentials.

then install the dependencies:

```bash
bun install
```

#### Using npm:

login to verdaccio:

```bash
npm login --registry=https://npm.pkg.mercura.io/
```

fill in the username and password.

then install the dependencies:

```bash
npm install --registry=https://npm.pkg.mercura.io/
```

### Setup proxy

copy .env.example to .env and fill in the values for `VITE_TARGET`

you can use our demo config panel: https://demo.mercura.io/

witch doesn't require any authentication.

If you want authenticate, you can login in https://demo.mercura.io/ and then copy the cookie called `config_session` and paste it in the .env `VITE_COOKIE` field.

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

- @mercura-aps/frontend-form-sdk (the sdk itself)

And the peer dependencies of the sdk:

- @mercura-aps/frontend-schemas (the zod schemas used by the sdk)
- @tanstack/query-core (for data fetching and caching)
- zod (for validation)
- zustand (for state management)

## Flow

### 1. Navigate by categories

The SDK provides two navigation strategies for browsing categories:

#### Breadcrumb Strategy

![breadcrumb](/vue-sdk-demo/readme-assets/breadcrumbs-categories.png)

File: `vue-sdk-demo/src/components/FormSelectionBreadcrumb.vue`

**How it works:**

- The `currentCategory` represents the currently selected category in the navigation path
- Categories can have **recursive subcategories**, forming a tree structure (e.g., Electronics → Computers → Laptops)
- The `shouldShowForms` flag determines what to display:
  - If `true`: the category is a **leaf node** (no subcategories) → displays available forms
  - If `false`: the category has **subcategories** → displays them as navigation buttons
- The breadcrumb shows the full path from root to current category, allowing users to navigate back up the tree

#### Filter Strategy

![filter](/vue-sdk-demo/readme-assets/filter-categories.png)

File: `vue-sdk-demo/src/components/FormSelectionFilter.vue`

**How it works:**

- Displays all subcategory levels horizontally as filters
- Each level shows the available subcategories at that depth
- Clicking a category updates the `categoriesPath` and shows the next level of subcategories
- The "All" option allows resetting to show all categories
- Always show the forms for the current level of the category tree

### 2. Create a new config

![form-card](/vue-sdk-demo/readme-assets/form-card.png)

File: `vue-sdk-demo/src/components/FormCards.vue`

**What happens when you click on a form card:**

1. A new **config** is created with a unique ID
2. The SDK automatically generates:
   - A **form configuration entry** (skeleton with steps, groups, elements structure)
   - A **values entry** (stores user input for each element, and constraints selections)

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

The `useFormByCurrentConfigId` and `useValuesByCurrentConfigId` hooks automatically track the currently active config, so you always work with the right data without manually passing IDs around.

but you need to set manually witch is the current config id, you can do this by using the `useConfigs` hook:

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

### 3. Navigate through the form

![form](/vue-sdk-demo/readme-assets/form.png)

File: `vue-sdk-demo/src/pages/ConfigComponent.vue`

**Parts of the form:**

- The `steps` array contains the steps of the form

steps are groups or first level elements of the form

![config-panel-steps](/vue-sdk-demo/readme-assets/config-panel-steps.png)

- The `currentProgress` is the index of the current step

- The `currentStep` is the current step

- The `stepsAvailability` is an array that indicates if the step is available to be clicked

its a helper to know if the step is available to be clicked, and become the `current step`

- The `setCurrentProgress` function is used to set the current progress

### 4. Submit the form

File: `vue-sdk-demo/src/pages/CheckoutComponent.vue`

#### Contact details

![contact-details](/vue-sdk-demo/readme-assets/contact-details.png)

**How it works:**

- The `requestFields` array contains the request fields of the form
- The `requestFieldsValues` array contains the values of the request fields
- The `requestFieldsErrors` array contains the errors of the request fields
- The `fixedContactDetails` array contains the fixed contact details of the form
- The `setFixedContactDetailsValue` function is used to set the value of the fixed contact details

- The `setSubFieldValue` function is used to set the value of the sub field

#### BoM

![bom](/vue-sdk-demo/readme-assets/bom.png)

**How it works:**

- The `finishedConfigs` array contains the finished configs joining the skeleton with the values, and only contain the selected elements of the form

#### Submit

we provide a submit function that map the data to the right format to be sent to the backend
